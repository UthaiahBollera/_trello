import TrelloBoard from "./common/board.js";
import store from "../data.js";
import BoardAction from '../actions/board-action.js';

export default class TrelloCanvas extends HTMLElement {
  constructor() {
    super();
    this.$boardsHTML = "<span></span>";
    this.$shadowRoot = this.attachShadow({ mode: "open" });
    this.render();
    this.subscribeEvents();
  }
  subscribeEvents() {
    this.$shadowRoot
      .querySelector("#add-board")
      .addEventListener("keydown", event => {
        if (event.which == 13 || event.keyCode == 13) {          
          var header = event.target.value;
          BoardAction.addBoard({header});
        }
      });
  }
  attributeChangedCallback() {
    alert("something changed in TrelloCanvas");
  }
  renderBoards() {
    let boards = store.get("boards") || [];
    boards.forEach((board, i) => {
      this.$boardsHTML += `
      <trello-board board-id="${board.id}" board-name="${
        board.header
      }" index=${i}></trello-board>`;
    });
    return this.$boardsHTML;
  }

  render() {
    console.log("Trello canvas render called!");
    this.$shadowRoot.innerHTML = `
    <style>
    .add-board{
      width: 100%;
      background: white;
      height: 50px;
      padding: 10px 10px 3px 0;
      box-sizing: border-box;
      position:relative;
      border-bottom: solid 2px #e4e4e4;
    }
    input{
      position: absolute;
      outline: none;
      height: 35px;
      font-size:20px;
      width: 320px;
      bottom: 0;
      padding-left:10px;

      border: 0;
      margin-bottom: 5px;
  }
    }
    </style>
    <div class='add-board'>
        <input type="text" placeholder="Add a board..." id='add-board'/>
    </div>
    <div class='board-list'>        
        ${this.renderBoards()}        
    </div>`;
  }
}
customElements.define("trello-canvas", TrelloCanvas);
