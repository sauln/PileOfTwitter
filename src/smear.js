var sentiment = require('sentiment');
var utils = require('./utils.js');
var userCache = require('./userCache.js');

var THRESHOLD = 1;
var LOG = false;

// TODO: I want to wrap all these functions into an object, but they can't call
// each other.. `this` is window. How do you do this properly?

function badScore(score) {
  // This threshold is very dependent on the method of scoring
  // TODO: Make the threshold user tunable.
  return score <= THRESHOLD;
}
function alreadySmeared(userPage) {
  // Check if the user has already been smeared (dont want new poos every refresh)
  return userPage.classList.contains("smeared")
}

function computeAverage(list, operation){
  // Convert the average value of list given the operation on each element

  if (! Array.isArray(list)){
    list = Array.from(list);
  }

  var sum = list.reduce(function(total, item) {
    var score = operation(item);
    return total + score;
  }, 0);

  var score = sum / list.length;

  return score;
}

var addPoo = function(fullnameSpan) {
  // Add poop emoji to the twitter user

  pooBadge = '<span class="Emoji Emoji--forLinks" style="background-image:url(\'https://abs.twimg.com/emoji/v2/72x72/1f4a9.png\')" title="Pile of poo" aria-label="Emoji: Pile of poo">&nbsp;</span><span class="visuallyhidden" aria-hidden="true">💩</span>';

  fullnameSpan.innerHTML = pooBadge + fullnameSpan.innerHTML + pooBadge;
}

var tweetToText = function(tweet) {
  if (LOG) {
    console.log(" -----> ------> convert tweet to text");
  }
  // I reserve the right to do something more complex this
  return tweet.innerText.toString();
}

var generateScore = function(userContent) {
  // Process raw tweets and generate an average score

  if (LOG) {
    console.log(" ---->  compute score for " + userContent);
  }
  tweets = userContent.querySelectorAll(".tweet-text");

  function computeScore(tweet) {
    return sentiment(tweetToText(tweet))["score"];
  }

  var score = computeAverage(tweets, computeScore);

  if (LOG) {
    console.log("    score found: " + score);
  }
  return score;
};

var smearUser = function(userPage, tweetScore) {

  if (badScore(tweetScore) && !alreadySmeared(userPage)) {

    username = userPage.querySelector(".fullname");

    if (LOG) {
      console.log(" -- Scored " + tweetScore + " - smear user " + username.innerHTML);
    }

    userPage.classList.add("smeared");
    addPoo(username);

  }
};

exports.checkUser = function(userInfo) {
  // Access user tweets, compute a sentiment score, and then smear
  // user if score is low enough.
  // Input: <a class="account-group"> html content

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
    if (LOG) {
      console.log("User cached score of " + userCache.getValue(userID) + " for " + user);
    }

    smearUser(userInfo, userCache.getValue(userID));
  } else {

    function processPage(userPage) {
      /// WARNING: there are lots of values closed into this function.

      if (userCache.isInCache(userID)) {
        // we should check cache again right here in case we've done this before
        // fetching page takes long enough that we might have caught up.
        // Don't want to go through the trouble of computing the score too many times.
        smearUser(userInfo, userCache.getValue(userID));
      } else {

        var tweetScore = generateScore(userPage);

        if (LOG) {
          console.log(" ---- generated score: " + tweetScore);
        }

        userCache.addToCache(userID, tweetScore);
        smearUser(userInfo, tweetScore);
      }
    }

    // otherwise, generate the score
    utils.getHTML(href, processPage);
  }
}
