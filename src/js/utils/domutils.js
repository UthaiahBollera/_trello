export default {
  createElement: function(eleName) {
    var div = document.createElement(eleName || "div");
    return div;
  },
  hop: function(key) {
    return this.hasOwnProperty(key);
  },
  addClass: function(className) {},
  getHTML: function(str) {
    var ele = this.createEle();
    ele.innerHTML = str;
    return ele.firstChild;
  }
};
