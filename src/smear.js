var sentiment = require('sentiment');
var utils = require('./utils.js');

var THRESHOLD = 1;


// Store (user-id: ShitScore).
// eventually put in longer term memory somewhere.
var userCache = new Object();

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

  console.log("The average score for all the tweets is: " + score);
  return score;
};

var smearUser = function(userPage, tweetScore) {

  // This threshold is very dependent on the method of scoring
  // TODO: Make the threshold user tunable.
  if (tweetScore <= THRESHOLD) {

    username = userPage.querySelector(".fullname");
    console.log("Smear user " + username.innerHTML);
    // console.dir(username);
    addPoo(username);
    // console.log("The username is after: " + username.innerHTML);
  }

};

exports.checkUser = function(userInfo) {
  // Access user tweets, compute a sentiment score, and then smear
  // user if score is low enough.
  // Input: <a class="account-group"> html content


  // need to do something different for quote tweets and promotional tweets:
  if (userInfo.classList.contains("QuoteTweet-innerContainer")) {
    // Href is handled differently if its a quote tweet. We should skip them for now.

    console.log("This is a quote tweet.  Handle it differently:" + userInfo);

  } else if (userInfo.hasOwnProperty("data-impression-cookie") ){

    console.log("Is this a promotional tweet? " + userInfo)

  } else {


    var user = userInfo.getAttribute("href");
    var href = userInfo.href;

    // Get user key -- use data-user-id
    var userID = userInfo.getAttribute("data-user-id");

    // Check cache
    if (userID in userCache) {
      // If we have the score, we will user it

      console.log("Found user score for " + user + "cached: " + userCache[userID]);

      utils.getHTML(href, function(userPage) {
        smearUser(userInfo, userCache[userID]);
      });

    } else {
      // otherwise, generate the score

      console.log("Compute user score for " + user);

      utils.getHTML(href, function(userPage) {

        console.log("Generate score for: " + userPage.URL);
        var tweetScore = generateScore(userPage);

        // console.log("Cache score and try smearing");
        userCache[userID] = tweetScore;
        smearUser(userInfo, tweetScore);
      });
    }

  }

};
