const express = require('express')
const router = express.Router()

/*  Queries Modules   */
const gitQueries = require('../queries/git-queries')
const twitterQueries = require('../queries/twitter-queries')
var gitQ = new gitQueries()
var twitterQ = new twitterQueries()

/*  Formating Modules   */
const resultFormat = require('../libraries/result-format')
var resultFormater = new resultFormat();

const maxOfRepo = 5;

// default route for the test
router.get('/', function (req, res) {

    var repoArray = []

    gitQ.GetAllRepo('Football')
        .then((repoList) => {
            return repoList.items.slice(0,maxOfRepo)
        })
        .then(chosenRepoArray => {
            repoArray = chosenRepoArray
            return twitterQ.GetAllTweetsFromRepo(chosenRepoArray)
        })
        .then(tweetsArray => {
            return resultFormater.resultFormat(repoArray, tweetsArray)
        })
        .then(result => {
            res.json(result)
        })
        .catch(statusCode => {
            res.sendStatus(statusCode)
        })

});

router.get('/:subject', function (req, res) {

    var repoArray = []

    gitQ.GetAllRepo(req.params.subject)
        .then((repoList) => {
            return repoList.items.slice(0,maxOfRepo)
        })
        .then(chosenRepoArray => {
            repoArray = chosenRepoArray
            return twitterQ.GetAllTweetsFromRepo(chosenRepoArray)
        })
        .then(tweetsArray => {
            return resultFormater.resultFormat(repoArray, tweetsArray)
        })
        .then(result => {
            res.json(result)
        })
        .catch(statusCode => {
            res.sendStatus(statusCode)
        })

});

module.exports = router;