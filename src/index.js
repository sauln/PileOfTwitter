var smear = require('./smear.js');

console.log("Begin Smearing");

stream = document.querySelector(".stream");

allTweeters = stream.querySelectorAll(".account-group");
console.log("Compute ShitScore for " + allTweeters.length + " accounts.");

allTweeters.forEach(smear.checkUser);

console.log("Finish Smearing");
