var sentiment = require('sentiment');

console.log("We start now");

var getHTML = function ( url, callback ) {

    // Feature detection
    if ( !window.XMLHttpRequest ) return;

    // Create new request
    var xhr = new XMLHttpRequest();

    // Setup callback
    xhr.onload = function() {
        if ( callback && typeof( callback ) === 'function' ) {
            callback( this.responseXML );
        }
    }

    // Get the HTML
    xhr.open( 'GET', url );
    xhr.responseType = 'document';
    xhr.send();

};

var smear = function (fullnameSpan) {
  // Add poop emoji to the twitter user

  pooBadge = '<span class="Emoji Emoji--forLinks" style="background-image:url(\'https://abs.twimg.com/emoji/v2/72x72/1f4a9.png\')" title="Pile of poo" aria-label="Emoji: Pile of poo">&nbsp;</span><span class="visuallyhidden" aria-hidden="true">💩</span>';

  fullnameSpan.innerHTML = pooBadge + fullnameSpan.innerHTML + pooBadge;
};

var tweetToText = function (tweet) {
  console.log("Score tweet: " + tweet.innerText);
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

var smearUser = function (fullUser) {
  // Access user tweets, compute a sentiment score, and then smear
  // user if score is low enough.

  href = fullUser.href;

  var parseContent = function (userPage) {
    var tweetScore = generateScore(userPage);

    if (tweetScore <= 0) {
      username = stream.querySelector(".fullname");
      smear(username);
      console.log("New name for the user is: " + username.innerHTML);
    }
  };

  getHTML(href, parseContent);
}

stream = document.querySelector(".stream");

fullUser = stream.querySelector(".account-group");

smearUser(fullUser);
