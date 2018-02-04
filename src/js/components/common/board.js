import Card from "./card.js";
import Utils from "../../utils/domutils.js";
import State from "../../utils/comp-state.js";
import store from "../../data.js";
import CardAction from "../../actions/card-action.js";
import BoardAction from "../../actions/board-action.js";

export default class TrelloBoard extends HTMLElement {
  constructor(p) {
    super();
    State.call(this, {});
    this.$shadowRoot = this.attachShadow({ mode: "open" });
    this.cardsHTML = "";
    this.render();
    this.subscribeEvents();
    window.$board = this;
  }

  subscribeEvents() {
    //on board close click
    this.$shadowRoot.querySelector(".close").addEventListener("click", e => {
      BoardAction.deleteBoard({ boardId: e.target.getAttribute("board-id") });
    });

    //on board header double click
    this.$shadowRoot
      .querySelector(".board-title")
      .addEventListener("dblclick", e => {
        e.target.contentEditable = true;
        e.target.style.backgroundColor = "#e4e4e4";
        this.$shadowRoot.querySelector(".close").style.display = "none";
        e.target.focus();
      });

    //on board header blur
    this.$shadowRoot
      .querySelector(".board-title")
      .addEventListener("blur", e => {
        e.target.contentEditable = false;
        e.target.style.backgroundColor = "white";
        let boardId = e.target.getAttribute("board-id");
        let header = e.target.innerText;
        this.$shadowRoot.querySelector(".close").style.display = "inline-block";
        BoardAction.updateheader({ boardId, header });
      });

    this.$shadowRoot.querySelector(".board").addEventListener("drop", ev => {
      let cardId = ev.dataTransfer.getData("text");
      let boardId = ev.target.getAttribute("board-id");
      //console.log(ev.target);
      cardId &&
        boardId &&
        CardAction.moveCard({
          cardId: cardId,
          boardId: boardId
        });
      //console.log("Sent data ::", cardId, boardId);
    });

    this.$shadowRoot.querySelector(".board").addEventListener(
      "dragover",
      function(event) {
        // prevent default to allow drop
        event.preventDefault();
      },
      false
    );

    this.$shadowRoot.addEventListener("keyup", event => {
      if (event.target.className === "add-board") {
        if (event.which == 13 || event.keyCode == 13) {
          CardAction.addCard({
            boardId: this.getAttribute("board-id"),
            desc: event.target.value
          });
          event.target.focus();
        }
      }
    });
  }

  renderCards() {
    let boardId = this.getAttribute("board-id");
    if (boardId) {
      let cards = (store.get("cards") || []).filter(b => b.board_id == boardId);
      cards.forEach(c => {
        this.cardsHTML += `<trello-card board-id="${this.getAttribute(
          "board-id"
        )}"  card-id=${c.id} description="${
          c.description
        }"></trello-card><div class='clear10'></div>`;
      });
    }
    return this.cardsHTML;
  }

  render() {
    //console.log("Render card called!!");
    this.$shadowRoot.innerHTML = `<style>    
    .board:hover{
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
      cursor:pointer;
    }
    .board{
      position:relative;
      padding-bottom: 50px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      transition: all 0.3s cubic-bezier(.25,.8,.25,1);
      position:relative;
      border-radius: 5px;
      width: 270px;
      margin: 0 5px;
      min-height: 150px;
      max-height:1800px;      
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      display: inline-block;
      vertical-align: top;
      white-space: nowrap;
      margin-top: 25px;
      background: white;          
    }
    .hidden{
      display:none;
    }    
    .board-title{
      white-space: normal;
      width:220px;      
    }
    .board-header{
      box-sizing:border-box;
      min-height:15px;
      height: auto;
      color:black; 
      padding: 15px 0px 20px 10px;     
      font-weight: 500;
      font-size: 15px;
      font-family: 'Rubik', sans-serif;
    }    
    .board-text{
      display:inline-block;
    }
    textarea{
      background: white;
      border: none;
      border-radius: 3px;
      -webkit-box-shadow: none;
      box-shadow: none;
      font-weight: 700;
      margin: -3px -5px;
      height: 18px;
      min-height: 18px;
      padding: 3px 5px;
      resize: none;
      max-height: 256px;     
      overflow:scroll;       
    }
    textarea:hover{
      cursor:pointer;
    }
    textarea.edit:focus{      
      cursor:auto !imporant;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      border: 1px solid #0079bf;
      -webkit-box-shadow: 0 0 2px 0 #0284c6;
      box-shadow: 0 0 2px 0 #0284c6;      
    }
    .board-footer{
      position: absolute;
      bottom: 0;
      margin: 15px 0 10px 10px;
      width: 95%;      
      background:white;
    }
    .board-footer>input {
      outline:none;
      width: 95%;
      border:none;
      position:absolute;
      bottom:0;      
    }
    .clear10{
      margin-top:15px;
    }
    .close:hover{
      color:#e4e4e4;
    }
    .close{
      right: 0;
      top: 0;
      margin-right: 14px;
      margin-top: 9px;
      font-size: 20px;
      font-weight: 300;
      color:black;
      display:none;
      position:absolute;
    }
    .board:hover .close{
      display:inline-block;
      cursor:pointer;
    }
    </style>
    <div class='board' board-id="${this.getAttribute("board-id")}">
    <span class='close' board-id=${this.getAttribute(
      "board-id"
    )}>×</span>          
      <div class='board-wrapper'>
        <div class='board-header'>
          <div class='board-title' board-id="${this.getAttribute(
            "board-id"
          )}">${this.getAttribute("board-name")}</div>
        </div>
        <div class='board-content'>
          ${this.renderCards()}
        </div>
        <div class='board-footer'>
          <input type='text' placeholder="Add a card ..." class='add-board' />
        </div>
      </div> 
    </div>
    `;
  }
}
customElements.define("trello-board", TrelloBoard);
