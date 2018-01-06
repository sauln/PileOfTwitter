
var LOG = false;


/// Currently, this is a wrapper around an Object.
/// Eventually we need to throw this in a cookie or something.

module.exports = {
  cache: new Object(), // TODO: Is this `new` done correctly?
  isInCache: function (key) {
    if (LOG) {
      console.log("Check if " + key + " is in the cache");
    }

    // yes, this is redundant. but it is clear. especially when you don't totally understand JS truthy stuff
    if (key in this) {
      return true;
    } else {
      return false;
    }
  },

  getValue: function (key) {
    if (LOG) {
      console.log("Get value of " + key + " from the cache: " + this[key]);
    }
    return this[key];
  },

  addToCache: function (key, value) {
    if (LOG) {
      console.log("Add (" + key + ":" + value + ") to the cache");
    }
    this[key] = value;
  },
  checkKeys: function() {
    console.log(Object.keys(userCache));
  }
};
