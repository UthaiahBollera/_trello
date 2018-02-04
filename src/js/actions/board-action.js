import store from "../data.js";

export default {
  addBoard: function({ header }) {
    header &&
      store.get("boards").push({
        id: Math.ceil(Math.random(100000) * 1000),
        header: header,
        creationTime: ""
      });
    store.dispatch("updated");
  },
  updateheader: function({ boardId, header }) {
    header &&
      store.get("boards").forEach(b => {
        if (b.id == boardId) {
          b.header = header;
        }
      });
    store.dispatch("updated");
  },
  deleteBoard: function({ boardId }) {
    if (boardId) {
      var boards = store.get("boards").filter(b => {
        return b.id != boardId;
      });
      store.set("boards", boards);
      store.dispatch("updated");
    }
  }
};
