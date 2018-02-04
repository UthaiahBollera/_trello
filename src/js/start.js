import TrelloApp from "./components/trello-app.js";
import store from "./data.js";
import cards from "./mocks/cards.js";
import boards from "./mocks/boards.js";

// if (!localStorage.getItem("cards")) {
//   localStorage.setItem("cards", JSON.stringify(cards));
//   store.set(cards);
// }

// if (!localStorage.getItem("boards")) {
//   localStorage.setItem("boards", JSON.stringify(boards));
//   store.set(boards);
// }

// store.set(JSON.parse(localStorage.getItem("boards")));
// store.set(JSON.parse(localStorage.getItem("cards")));
console.log("cards", cards.cards);
console.log("boards", boards.boards);
store.set("cards", cards.cards);
store.set("boards", boards.boards);
customElements.define("trello-app", TrelloApp);
window.store = store; //for testing purpose only
