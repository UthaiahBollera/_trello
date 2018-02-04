import TrelloHeader from "./trello-header.js";
import TrelloCanvas from "./trello-canvas.js";
import State from "../utils/comp-state.js";
import store from "../data.js";

export default class TrelloApp extends HTMLElement {
  constructor() {
    super();
    State.call(this, {}); //suport for set state ($state maintains component state)
    this.$shadowRoot = this.attachShadow({ mode: "open" });
    this.render();
    this.subscribeEvents();
  }

  subscribeEvents() {
    //when something changes in store re render the app
    store.on("updated", () => {
      console.log("store updated");
      this.render();
    });
  }

  render() {
    this.$shadowRoot.innerHTML = ` 
    <style>
    .app-wrapper{
        overflow:scroll;
        max-width:1000%;
        min-width:100%;
    }    
    .app-content{
        background:#f4f5f7;
        height:700px;
    }
    </style>
    <div class='app-wrapper'>
        <div class='app-header'>
            <trello-header></trello-header>
        </div>
        <div class='app-content'>            
            <trello-canvas ></trello-canvas >
        </div>
    </div>`;
  }
}
