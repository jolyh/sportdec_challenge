const express = require('express')
const bodyParser = require('body-parser')

const rp = require('request-promise')

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
var options = {
    uri: 'https://api.github.com/',
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true
}

// default route for the test
app.get('/', function (req, res) {

    var repoArray = []

    GetAllRepo('Footbal')
        .then((repoList) => {
            return repoList.items.slice(0,3)
        })
        .then(tenFirstRepo => {
            repoArray = tenFirstRepo
            return repoArray[0]
            //return FillEventsArray(tenFirstRepo)
        })
        .then(result => {
            res.send(result)
        })
        .catch(statusCode => {
            res.sendStatus(statusCode)
        })

});

//  GET /search/repositories?q=:subject
const GetAllRepo = (subject) => {
    return new Promise((resolve, reject) => {
        options.uri = 'https://api.github.com/search/repositories?q=' + subject

        rp.get(options)
            .then(response => {
                //console.log(response)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
};

// GET /networks/:owner/:repo/events
const GetEventsFromRepo = (owner, repo) => {
    return new Promise((resolve, reject) => {
        options.uri = 'https://api.github.com/networks/' + owner + '/' + repo + '/events'

        rp.get(options)
        .then(response => {
            //console.log(response)
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })
    })
};

const FillEventsArray = (repoArray) => {
    return new Promise((resolve, reject) => {
        var promises = []
        var eventsAssociated = []
        repoArray.forEach(repo => {
            console.log('array : ' + repo.owner.login + '/' + repo.name)
            promises.push(
                GetEventsFromRepo(repo.owner.login, repo.name)
                    .then(event => {
                        eventsAssociated.push(event)
                    })
                    .catch(error => {
                        throw error
                    })
            )
        })

        Promise.all(promises)
            .then(() => {
                resolve(eventsAssociated)
            })
            .catch(error => {
                reject(error)
            })
    })
};
 
app.listen(3000)