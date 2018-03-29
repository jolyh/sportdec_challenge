// Format the result as a JSON object and summarize the project repository

function resultFormat() {

    this.resultFormat = (repoArray, tweetsArray) => {
        return new Promise((resolve, reject) => {
            if (repoArray.length < 1)
                reject("Empty repository list")
            var resultArray = []
            repoArray.forEach((repo, i) => {
                resultArray[i] = this.repositorySummary(repo)
                resultArray[i].Last_related_tweets = this.lastStatuses(tweetsArray[i].statuses);
            })
            resolve(resultArray)
        })
    }

    this.repositorySummary = (repo) => {
        var result = {}
        result.Name = repo.name
        result.Owned_by = repo.owner.login
        result.Github_page = repo.html_url
        return result
   }

    this.lastStatuses = (statusesArray) => {
        var result = []
        statusesArray.forEach(status => {
            var tweet = {}
            tweet.Author = status.user.name
            tweet.Created_at = status.created_at
            tweet.Content = status.text
            result.push(tweet)
        });
        return result;
    }
}

module.exports = resultFormat