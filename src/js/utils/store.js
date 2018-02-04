import Observer from "./observer.js";
import Utils from "./domutils.js";
export default class Store extends Observer {
  constructor(props) {
    super();
    var that = this;
    this.$data = props || null;    
    var $hop = Utils.hop;
  }
  init(props) {
    this.$data = props;
  }
  clear() {
    this.$data = {};
    this.dispatch("updated");
  }
  get(str) {
    if (str === undefined) {
      return this.$data;
    }
    if (typeof str !== "string" || !str.length) {
      throw "Keys to be string";
    }
    var returnedObj;
    var keys = str.split(".");
    function dfs(_key, data) {
      returnedObj = data[_key];
      if (returnedObj === undefined) {
        return;
        // throw _key + " not found :(";
      }
      if (keys.length === 0) {
        return returnedObj;
      }
      return dfs(...keys.splice(0, 1), returnedObj);
    }
    return dfs(...keys.splice(0, 1), this.$data);
  }

  set(keys, value) {
    var that = this;
    if (keys && (keys.constructor === Object || keys.constructor === Array)) {
      this.$data = keys;
      this.dispatch("updated", value);
      return;
    }
    if (typeof keys !== "string" || !keys.length) {
      console.error("Keys to be string");
      return;
    }
    keys = keys.split(".");
    function dfs(_key, data) {
      if (data[_key] === undefined) {
        data[_key] = {};
      }
      if (keys.length === 0) {
        data[_key] = value;
        that.dispatch("updated", value);
        return data[_key];
      }
      dfs(...keys.splice(0, 1), data[_key]);
    }
    return dfs(...keys.splice(0, 1), this.$data);
  }
  on(event, callback) {
    callback = callback || function() {};
    if (!event) {
      throw "Event cannot be empty";
    }
    this.subscribe(event, callback);
  }
}
