var smear = require('./smear.js');

var LOG = true;

function clearBadUsers(tweeter) {
  // We currently don't handle any of these special varieties of tweets that show up in our
  //  initial query:
  //      quoted tweets
  //      promotional tweets
  //      WhoToFollow suggestions

  function isQuoteTweet(tweeter) {
    return tweeter.classList.contains("QuoteTweet-innerContainer") ||
           tweeter.classList.contains("QuoteTweet-originalAuthor") ;
  }
  function isPromotion(tweeter) {
    return tweeter.hasOwnProperty("data-impression-cookie");
  }
  function isWhoToFollow(tweeter) {
    return tweeter.classList.contains("ProfileNameTruncated");
  }

  return !isQuoteTweet(tweeter) && !isPromotion(tweeter) && !isWhoToFollow(tweeter);
}





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

      this.smear(newTweets);
    } else {
      if (LOG) {
        console.log("--- All " + newAllTweets.length + " tweets processed.");
      }
    }
  },

  getListOfPotentialTweets: function () {
    // query all stuff with the 'account-group' class - these are most of the tweets
    // there are some false positives that get dealt with down the line.

    stream = document.querySelector(".stream");
    allTweeters = stream.querySelectorAll(".account-group");

    var usableTweeters = Array.from(allTweeters).filter(clearBadUsers);

    return usableTweeters;
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
    console.log("--- Update: Compute ShitScore for " + allTweeters.length + " accounts ---");
    allTweeters.forEach(smear.checkUser);
  }
};
