import TrelloApp from "./components/trello-app.js";
import store from "./data.js";
import cards from "./mocks/cards.js";
import boards from "./mocks/boards.js";

store.set("cards", cards.cards);
store.set("boards", boards.boards);
customElements.define("trello-app", TrelloApp);
