var smear = require('./smear.js');

console.log("BEGIN SMEARING");

stream = document.querySelector(".stream");

allTweeters = stream.querySelectorAll(".account-group");
console.log("   Compute ShitScore for " + allTweeters.length + " accounts.");

allTweeters.forEach(smear.checkUser);

console.log("FINISH SMEARING");
