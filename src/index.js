var tracker = require("./tweetTracker.js");

console.log("BEGIN SMEARING");

tracker.update();


// Watch for page mutations, compute smear on these new tweets
var obs = new MutationObserver(function (mutations, observer) {
  console.log("mutation trigger - update ----- ");
  tracker.update();
  // smeared.update();
  // newTweeters = getListOfPotentialTweets();
  // console.log("Found " + newTweeters.length + " tweets after a mutation");

  // if (newTweeters.length > smearedTweets.length){
  //   console.log("New ones");
  //   smearedTweets.append(newTweeters);
  // }

  // smearTweeters(allTweeters);
});

obs.observe(document.body, { childList: true, subtree: true, attributes: false, characterData: false });


console.log("FINISH SMEARING");
