var LOG = false;
console.log("----- trace ----- run new userCache");

function dumpStorage(cache) {
  console.log(Object.keys(cache));
}

var cache = function() {
  if (!localStorage.getItem('twitCache')) {
    console.log("First time use, no cache in localStorage");
    return new Object();
  } else {
    console.log("Load cache from localStorage");
    st = JSON.parse(localStorage.getItem('twitCache'));

    dumpStorage(st);
    return st;
  }
}();

function saveCache(cache) {
  // console.log("Store the localStorage");
  dumpStorage(cache);
  localStorage.setItem('twitCache', JSON.stringify(cache));
}

window.onbeforeunload = saveCache;

// This is a singleton that operates on the cache
module.exports = {
  isInCache: function(key) {
    if (LOG) {
      console.log("Check if " + key + " is in the cache");
      dumpStorage(cache);
    }

    if (key in cache) {
      // console.log("Yes in cache");
      return true;
    } else {
      // console.log("Not in cache");
      return false;
    }
  },

  getValue: function(key) {
    if (LOG) {
      console.log("Get value of " + key + " from the cache: " + cache[key]);
    }
    return cache[key];
  },

  addToCache: function(key, value) {
    if (LOG) {
      console.log("Add (" + key + ":" + value + ") to the cache");
    }
    cache[key] = value;
    saveCache(cache);
  }

};
