var smear = require('./smear.js');

var LOG = false;

module.exports = {
  smearedTweets: [],

  update: function () {
    // query new tweets and if there are new ones, then smear them

    newAllTweets = this.getListOfPotentialTweets();

    if (newAllTweets.length > this.smearedTweets.length){
      if (LOG) {
        console.log("Run smear campaign on new tweets, was " + this.smearedTweets.length + " and now " + newAllTweets.length);

      }

      newTweets = this.addNewTweets(newAllTweets);
      console.log("There are " + newAllTweets.length + " new tweets");

      this.smear(newTweets);
    } else {
      if (LOG) {
        console.log("Already smeared everyone, carry on");
      }
    }
  },

  getListOfPotentialTweets: function () {
    // query all stuff with the 'account-group' class - these are most of the tweets
    // there are some false positives that get dealt with down the line.

    stream = document.querySelector(".stream");
    allTweeters = stream.querySelectorAll(".account-group");

    if (LOG){
      console.log("Found " + allTweeters.length + " tweets to examine");
    }

    return allTweeters;
  },

  addNewTweets: function (newTweets) {
    // Figure out which ones are new, add them to the list, and return them

    if (LOG) {
      console.log("  previously, "  + this.smearedTweets.length  + " tweets, adding " + (newTweets.length - this.smearedTweets.length) + " new tweets.");
    }

    var extras = [];
    for (i = this.smearedTweets.length; i < newTweets.length; i++) {
      this.smearedTweets.push(newTweets[i]);
      extras.push(newTweets[i]);
    }

    return extras;
  },

  smear: function (allTweeters) {
    console.log("   Compute ShitScore for " + allTweeters.length + " accounts.");
    allTweeters.forEach(smear.checkUser);
  }
};
