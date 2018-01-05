var sentiment = require('sentiment');
var utils = require('./utils.js');

var addPoo = function (fullnameSpan) {
  // Add poop emoji to the twitter user

  pooBadge = '<span class="Emoji Emoji--forLinks" style="background-image:url(\'https://abs.twimg.com/emoji/v2/72x72/1f4a9.png\')" title="Pile of poo" aria-label="Emoji: Pile of poo">&nbsp;</span><span class="visuallyhidden" aria-hidden="true">💩</span>';

  fullnameSpan.innerHTML = pooBadge + fullnameSpan.innerHTML + pooBadge;
};

var tweetToText = function (tweet) {
  return tweet.innerText.toString();
}

var generateScore = function (userContent) {
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

exports.smearUser = function (fullUser) {
  // Access user tweets, compute a sentiment score, and then smear
  // user if score is low enough.

  var href = fullUser.href;

  var parseContent = function (userPage) {
    var tweetScore = generateScore(userPage);

    if (tweetScore <= 0) {
      username = userPage.querySelector(".fullname");
      addPoo(username);
    }
  };

  utils.getHTML(href, parseContent);
};
