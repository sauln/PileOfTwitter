var sentiment = require('sentiment');
var utils = require('./utils.js');

var THRESHOLD = 1;


// Store (user-id: ShitScore).
// eventually put in longer term memory somewhere.
var userCache = new Object();

function isInCache(key) {
  console.log("Check if " + key + " is in the cache");
  if (key in userCache) {
    return true;
  } else {
    return false;
  }
}

function getValue(key){
  console.log("Get value of " + key + " from the cache");
  return userCache[key];
}

function addToCache(key, value) {
  console.log("Add (" + key + ":" + value + ") to the cache");
  userCache[key] = value;
}

function checkKeys() {
  console.log(Object.keys(userCache));
}


var addPoo = function(fullnameSpan) {
  // Add poop emoji to the twitter user

  pooBadge = '<span class="Emoji Emoji--forLinks" style="background-image:url(\'https://abs.twimg.com/emoji/v2/72x72/1f4a9.png\')" title="Pile of poo" aria-label="Emoji: Pile of poo">&nbsp;</span><span class="visuallyhidden" aria-hidden="true">💩</span>';

  fullnameSpan.innerHTML = pooBadge + fullnameSpan.innerHTML + pooBadge;
};

var tweetToText = function(tweet) {
  // I reserve the right to do something more complex this
  return tweet.innerText.toString();
}

var generateScore = function(userContent) {
  // Process raw tweets and generate an average score

  tweets = userContent.querySelectorAll(".tweet-text");

  var sum = [].reduce.call(tweets, function(total, tweet) {
    var score = sentiment(tweetToText(tweet))["score"];
    return total + score;
  }, 0);

  var score = sum / tweets.length;

  // console.log("The average score for all the tweets is: " + score);
  return score;
};

var smearUser = function(userPage, tweetScore) {

  // This threshold is very dependent on the method of scoring
  // TODO: Make the threshold user tunable.
  if (tweetScore <= THRESHOLD) {

    username = userPage.querySelector(".fullname");
    console.log("Score " + tweetScore + " - smear user " + username.innerHTML);

    if (!userPage.classList.contains("smeared")){
      userPage.classList.add("smeared");
      addPoo(username);
    }
  }

};

exports.checkUser = function(userInfo) {
  // Access user tweets, compute a sentiment score, and then smear
  // user if score is low enough.
  // Input: <a class="account-group"> html content


  // need to do something different for quote tweets and promotional tweets:
  if (userInfo.classList.contains("QuoteTweet-innerContainer") ||
      userInfo.classList.contains("QuoteTweet-originalAuthor")) {
    // Href is handled differently if its a quote tweet. We should skip them for now.

    // console.log("This is a quote tweet.  Handle it differently:" + userInfo);

  } else if (userInfo.hasOwnProperty("data-impression-cookie") ){

    // console.log("Is this a promotional tweet? " + userInfo);

  } else {
    // console.log("There is a normal user tweet? " + userInfo);

    var user = userInfo.getAttribute("href");
    var href = userInfo.href;

    // Get user key -- use data-user-id
    var userID = userInfo.getAttribute("data-user-id");

    // Check cache
    if (isInCache(userID)) {
      // first pass through, nothing is in the cache because the getHTML is too slow, every user check beats it
      // If we have the score, we will user it

      // console.log("Found user score for " + user + "cached: " + userCache[userID]);
      smearUser(userInfo, getValue(userID));

      // utils.getHTML(href, function(userPage) {
      //   smearUser(userInfo, getValue(userID));
      // });

    } else {
      // otherwise, generate the score

      // console.log("Compute user score for " + user);

      utils.getHTML(href, function(userPage) {

        // we should check cache again right here in case we've done this before
        if (isInCache(userID)) {
          smearUser(userInfo, getValue(userID));
        }

        // console.log("Generate score for: " + userPage.URL);
        var tweetScore = generateScore(userPage);

        // console.log("Cache score and try smearing");
        addToCache(userID, tweetScore);
        smearUser(userInfo, tweetScore);
      });
    }

  }

};
