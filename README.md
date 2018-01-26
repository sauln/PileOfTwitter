# 💩 Pile of Twitter 💩

This is a browser extension (only tested on Firefox) that will let you quickly tell who on twitter is a dick or not.

Our advanced AI based blockchain technology will annotate twitter users' names with poo emojis (💩) if their PooScore™ is deemed too low. Our algorithms are based off the cutting edge of artificial intelligence, natural language processing, and machine learning algorithms (or whatever open source libraries are available in Javascript).

# Setup

Follow these instructions to setup the browser plugin on your own Firefox browser:

## Prepare source

First, you'll need browserify to build everything

```
npm install browserify -g
```

and you'll need to grab the sentiment analysis library we are currently using:

```
npm install sentiment
```

Then you can run the build script:

```
chomd a+x build.sh
./build.sh
```

# Plug in the plugin 
Finally, add the extension temporarily to your browser. 

1. In firefox, navigate to `about:debugging`, 
2. Click `Load Temporary Add-on` and 
3. Select the manifest.json file in the repo. 

Then navigate to any twitter page and behold, it will be clear which people you follow are bad.

# TODO

- [ ] Convert to using twitter API instead of parsing HTML. (I believe this can only work for certain pieces)
- [X] Store cache in persistent storage. Use localStorage.
- [ ] Get options page working so user can set their own threshold.
- [X] Come up with new name and clean out poo related profanity
- [ ] Remove uses of 'innerHTML' <- do this
- [ ] Handle user page (only tested on timeline right now).
- [ ] Properly handle quote tweets
- [ ] Properly handle promotional tweets.
- [ ] Properly handle retweets and likes (currently doesn't poo-annotate)
- [ ] Invalidate cache after certain time
- [ ] **Write unit tests** (mocha?).
- [ ] **Setup on other browsers** (firefox only so far)
  - [ ] Chrome
  - [ ] Safari
- [ ] What is the proper setup for node stuff? Is there a requirements.txt equivalent? Should I include the node_modules in the zip? 

# LICENSE

Please ask me for the license.
