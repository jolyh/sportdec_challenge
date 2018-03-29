# sportdec_challenge

## By Arnaud Joly - 27/03/2018 & 28/03/2018

After being started by **npm start**, this simple Node.js application can be used either by using **curl** or directly by **url** on your browser, at *http://localhost:3000*. If this port is already occupied, you can modify the listenin port in the **App.js** file. 

This application simply ask the github API for all the repository related to a subject ("Football" by default), then ask the Twitter API for every related tweets. The results are summarize, each repository associated with its tweets, and sent back in **JSON format**.

There is 2 command implemented : 
* "/" -> eg: http://localhost:3000/ - this is the default route, the subject is "Football"
* "/[subject]" -> eg: http://localhost:3000/repository - this is a custom route where you can ask for a different subject

### Important : the file config/twitter-config.js must be modified with your credentials in order to use the twitter API
