# 💩 TWIT

This is a browser extension (only tested on Firefox) that will let you quickly tell who on twitter is a dick or not.

Our advanced AI based blockchain technology will annotate twitter users' names with poo emojis (💩) if their ShitScore™ is deemed shitty. Our algorithms are based off the cutting edge of artificial intelligence, natural language processing, and machine learning algorithms.

# Setup

You'll need browserify to build everything
```
npm install browserify -g
```

and you'll need the sentiment library
```
npm install sentiment
```

Then you can run the build script:
```
chomd a+x build.sh
./build.sh
```

Finally, add the extension temporarily to your browser. For firefox, go to `about:debugging`, click `Load Temporary Add-on` and select the manifest.json file. Then navigate to any twitter page and behold.




# TODO

Scope:
-----

- [ ] Play around with more complex scoring algorithms (duh sentiment analysis 101).
- [ ] Properly handle quote tweets
- [ ] Properly handle promotional tweets.
- [ ] Properly handle retweets and likes (currently doesnt poo-annotate)
- [ ] Properly work when viewing user page (only tested on timeline right now).
- [ ] Allow user to set ShitScore™ threshold.

Quality:
------

- [ ] Better Cache
  - [ ] Store cache in cookie (or something, idk) so its persistent for the user
  - [ ] Invalidate cache after certain time
- [ ] **Write unit tests** (mocha, wtf, idk).
- [ ] **Test on other browsers** (firefox only so far)
- [ ] Proper setup for node stuff?

# LICENSE

We have a very large legal team and if you try to steal anything then we'll get all Montezuma on ya so back off.
