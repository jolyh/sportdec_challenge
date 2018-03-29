const rp = require('request-promise')
const twitter = require('twitter')

const twitterConfig = require('../config/twitter-config')
const twitterC = new twitterConfig()

var twitterClient = new twitter({
    consumer_key: twitterC.consumer_key,
    consumer_secret: twitterC.consumer_secret,
    access_token_key: twitterC.access_token_key,
    access_token_secret: twitterC.access_token_secret
})

function twitterQueries(){

    this.GetAllTweets = (subject) => {
        return new Promise((resolve, reject) => {
            twitterClient.get('search/tweets', {q: subject})
                .then(tweets => {
                    resolve(tweets)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    this.GetAllTweetsFromRepo = (repoArray) => {
        return new Promise((resolve, reject) => {
            var promises = []
            var TweetsArray = []
            repoArray.forEach(repo => {
                promises.push(
                    this.GetAllTweets(repo.name)
                        .then(event => {
                            TweetsArray.push(event)
                        })
                        .catch(error => {
                            throw error
                        })
                )
            })

            Promise.all(promises)
                .then(() => {
                    resolve(TweetsArray)
                })
                .catch(error => {
                    reject(error)
                })
        })
    };
    
};

module.exports = twitterQueries