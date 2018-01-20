var tracker = require("./tweetTracker.js");

tracker.update();

// Watch for page mutations, compute smear on these new tweets
var obs = new MutationObserver(function(mutations, observer) {
  // console.log("mutation trigger - update ----- ");
  tracker.update();
});

obs.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: false,
  characterData: false
});
