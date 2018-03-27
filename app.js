const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 

app.get('/', function (req, res) {

    getAllRepo('Footbal')
        .then((repoList) => {
            return getEventsForRepo(repoList.items[0].owner.login, repoList.items[0].name)
        })
        .then(result => {
            res.send(result)
        })
        .catch(statusCode => {
            res.sendStatus(statusCode)
        })

});

//  GET /search/repositories?q=:subject
getAllRepo = (subject) => {
    return new Promise((resolve, reject) => {
        var options = {
            url: 'https://api.github.com/search/repositories?q=' + subject,
            headers: {
                'User-Agent': 'request'
            }
        };
            
        request(options, (err, response, body) => {
            if (!err && response.statusCode == 200) {
                console.log(JSON.parse(body))
                resolve(JSON.parse(body))
            } else {
                reject(response.statusCode)
            } 
        })
    })
}


// GET /networks/:owner/:repo/events
getEventsForRepo = (owner, repo) => {
    return new Promise((resolve, reject) => {
        var options = {
            url: 'https://api.github.com/networks/' + owner + '/' + repo + '/events',
            headers: {
                'User-Agent': 'request'
            }
        };

        request(options, (err, response, body) => {
            if (!err && response.statusCode == 200) {
                console.log(JSON.parse(body))
                resolve(JSON.parse(body))
            } else {
                reject(response.statusCode)
            } 
        });
    })
}
 
app.listen(3000)