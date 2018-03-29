const rp = require('request-promise')

function gitQueries(){

    var options = {
        uri: 'https://api.github.com/',
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    }

    //  GET /search/repositories?q=:subject
    this.GetAllRepo = (subject) => {
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
    this.GetEventsFromRepo = (owner, repo) => {
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

    this.FillEventsArray = (repoArray) => {
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
}

module.exports = gitQueries