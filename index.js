var smear = require('./smear.js');

console.log("Begin Smearing");

stream = document.querySelector(".stream");

allTweeters = stream.querySelectorAll(".account-group");

allTweeters.forEach(smear.smearUser);

// smear.smearUser(fullUser);

console.log("Finish Smearing");
