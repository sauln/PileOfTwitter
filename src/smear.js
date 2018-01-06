var sentiment = require('sentiment');
var utils = require('./utils.js');
var userCache = require('./userCache.js');

var THRESHOLD = 0.5;
var LOG = false;


var addPoo =  function(fullnameSpan) {
  // Add poop emoji to the twitter user

  pooBadge = '<span class="Emoji Emoji--forLinks" style="background-image:url(\'https://abs.twimg.com/emoji/v2/72x72/1f4a9.png\')" title="Pile of poo" aria-label="Emoji: Pile of poo">&nbsp;</span><span class="visuallyhidden" aria-hidden="true">💩</span>';

  fullnameSpan.innerHTML = pooBadge + fullnameSpan.innerHTML + pooBadge;
}

var tweetToText =  function(tweet) {
  if (LOG) {
    console.log(" -----> ------> convert tweet to text");
  }
  // I reserve the right to do something more complex this
  return tweet.innerText.toString();
}

var generateScore =  function(userContent) {
  // Process raw tweets and generate an average score

  if (LOG) {
    console.log(" ---->  compute score for " + userContent);
  }
  tweets = userContent.querySelectorAll(".tweet-text");

  // Compute average score
  var sum = [].reduce.call(tweets, function(total, tweet) {
    // console.log(" a " + this + " and " + tweetToText);
    var score = sentiment(tweetToText(tweet))["score"];
    return total + score;
  }, 0);

  var score = sum / tweets.length;

  if (LOG) {
    console.log("    score found: " + score);
  }
  return score;
}

var smearUser = function(userPage, tweetScore) {

  // This threshold is very dependent on the method of scoring
  // TODO: Make the threshold user tunable.
  if (tweetScore <= THRESHOLD) {

    username = userPage.querySelector(".fullname");

    if (LOG) {
      console.log("Score " + tweetScore + " - smear user " + username.innerHTML);
    }

    if (!userPage.classList.contains("smeared")) {
      userPage.classList.add("smeared");
      addPoo(username);
    }
  }
}


exports.checkUser = function(userInfo) {
  // Access user tweets, compute a sentiment score, and then smear
  // user if score is low enough.
  // Input: <a class="account-group"> html content

  // need to do something different for quote tweets and promotional tweets:
  if (userInfo.classList.contains("QuoteTweet-innerContainer") || userInfo.classList.contains("QuoteTweet-originalAuthor")) {
    // Href is handled differently if its a quote tweet. We should skip them for now.
    if (LOG) {
      console.log("        tweet is quote tweet - ignore")
    }

  } else if (userInfo.hasOwnProperty("data-impression-cookie")) {
    // Href is handled differently if it is a promoted tweet.
    if (LOG) {
      console.log("  <--- tweet is advertisement - ignore")
    }
  } else {

    var user = userInfo.getAttribute("href");
    var href = userInfo.href;

    if (LOG) {
      console.log("  <--- smear user " + user);
    }

    // Get user key -- use data-user-id
    var userID = userInfo.getAttribute("data-user-id");

    // Check cache
    if (userCache.isInCache(userID)) {
      // first pass through, nothing is in the cache because the getHTML is too slow, every user check beats it
      // If we have the score, we will user it

      smearUser(userInfo, userCache.getValue(userID));
    } else {
      // otherwise, generate the score
      utils.getHTML(href, function(userPage) {

        if (LOG) {

        }

        // we should check cache again right here in case we've done this before
        if (userCache.isInCache(userID)) {
          smearUser(userInfo, userCache.getValue(userID));
        } else {
          var tweetScore = generateScore(userPage);

          if (LOG) {
            console.log(" ---- generate score: ");
            console.log("  --------- " + tweetScore);
          }

          userCache.addToCache(userID, tweetScore);
          smearUser(userInfo, tweetScore);
        }
      });
    }
  }

}
