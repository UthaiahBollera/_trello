import store from "../data.js";

export default {
  addCard: function({ boardId, desc }) {
    store.get("cards").push({
      id: Math.ceil(Math.random(100000) * 1000),
      board_id: boardId,
      description: desc,
      labels: []
    });
    store.dispatch("updated");
  },
  moveCard: function({ cardId, boardId }) {
    store.get("cards").forEach(c => {
      if (c.id == cardId) {
        c.board_id = boardId;
        store.dispatch("updated");
      }
    });
  },
  removeCard: function(cardId) {
    if (cardId) {
      var cards = store.get("cards").filter(c => {
        return c.id != cardId;
      });
      //console.log("F cards", cards);
      store.set("cards", cards);
      store.dispatch("updated");
    }
  },
  updateCard: function({ cardId, desc }) {
    desc &&
      store.get("cards").forEach(c => {
        if (c.id == cardId) {
          c.description = desc;
        }
      });
    store.dispatch("updated");
  }
};
