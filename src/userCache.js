var LOG = false;


module.exports = {
  cache: new Object(),
  isInCache: function (key) {
    if (LOG) {
      console.log("Check if " + key + " is in the cache");
    }

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
