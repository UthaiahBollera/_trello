"use strict";
export default function State(initialState) {
  var _state = initialState || null;
  var that = this;
  return Object.defineProperty(this, "$state", {
    get: y => {
      //console.log("Getting from state", y);
      return _state || null;
    },
    set: y => {
      //console.log("Setting to state", y);
      _state = y;
      that.render && that.render.constructor === Function && that.render(); //render only if render method exists
      return y;
    }
  });
}
