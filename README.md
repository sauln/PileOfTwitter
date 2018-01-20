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

- [ ] Convert to using twitter API instead of parsing HTML. I believe this can only work for certain pieces.
- [X] Store cache in persistent storage. Use localStorage.
- [ ] Get options page working so user can set their own threshold.
- [ ] Come up with new name and clean out the word "Shit"
- [ ] Remove sses of 'innerHTML'.
- [ ] Handle user page (only tested on timeline right now).
- [ ] Properly handle quote tweets
- [ ] Properly handle promotional tweets.
- [ ] Properly handle retweets and likes (currently doesn't poo-annotate)
- [ ] Invalidate cache after certain time
- [ ] **Write unit tests** (mocha?).
- [ ] **Test on other browsers** (firefox only so far)
- [ ] Proper setup for node stuff? Is there a requirements.txt equivalent? Should I include the node_modules in the zip?

# LICENSE

We have a very large legal team and if you try to steal anything then we'll get all up on ya. So back off. Unless you ask first.
