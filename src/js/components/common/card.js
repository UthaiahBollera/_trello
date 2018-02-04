import CardAction from "../../actions/card-action.js";
export default class Card extends HTMLElement {
  constructor(p) {
    super();
    this.$shadowRoot = this.attachShadow({ mode: "open" });
    this.render();    
    this.subscribeEvents();
  }
  dragged(e) {
    //console.log(e);
  }
  render() {
    this.$shadowRoot.innerHTML = `
    <style>
    .card{   
      position:relative;   
      width:250px;      
      box-sizing:border-box;
      background:#f4f5f7;
      padding:5px;
      border-radius:3px;
      margin-top:10px;
      color:black;
      cursor:pointer;
      margin:auto;
      min-height: 15px;
      max-height:500px;
    }

    .textarea{         
      word-wrap: break-word;      
      min-height: 15px;
      max-height:500px;
      width: 228px;
      margin: auto;
      padding: 5px;
      line-height: 1.3em;          
      cursor: pointer;
      white-space: normal;
      font-family: 'Roboto', sans-serif;
      font-size:14px;
      font-weight:300;
    }
    textarea{
      resize: vertical;
      -webkit-transition: background 85ms ease-in,border-color 85ms ease-in;
      transition: background 85ms ease-in,border-color 85ms ease-in;
      width: 100%;
      background: #fff;
      border: 0;
      height: 90px;
      padding: 0;
      overflow: hidden;
      word-wrap: break-word;
      resize: none;
      height: 90px;
    }
    .card:hover{
      background:#dddfe2;
    }
    .text-container{
      position:relative;
      min-height: 15px;
      max-height:500px;
    }
    .hidden{
      display:none;
    }
    .close{
      position: absolute;
      top: 0;
      right: 0;
      margin-right: 5px;
      margin-top: 3px;
      display:none;
    }
    .card:hover .close{
      display:inline-block;
    }
    .close:hover{
      color: #aba4a4;
      cursor:pointer;
    }
    </style>
    <div class='card' draggable="true" board-id="${this.getAttribute(
      "board-id"
    )}"  card-id=${this.getAttribute("card-id")} >
      <div class='text-container'>
        <div class='textarea' card-id=${this.getAttribute(
          "card-id"
        )}>${this.getAttribute("description").trim()}</div>
        <textarea class='editable hidden'>${this.getAttribute(
          "description"
        ).trim()}</textarea>                
      </div>  
      <span class='close' card-id=${this.getAttribute(
        "card-id"
      )}>×</span>          
    </div>          
    </div>`;
  }

  subscribeEvents() {
    this.$shadowRoot
      .querySelector(".card")
      .addEventListener("dragstart", ev => {
        ev.dataTransfer.setData(
          "text/plain",
          ev.target.getAttribute("card-id")
        );
      });
    this.$shadowRoot.querySelector(".close").addEventListener("click", e => {
      var cardId = e.target.getAttribute("card-id");
      CardAction.removeCard(cardId);
    });
    this.$shadowRoot
      .querySelector(".textarea")
      .addEventListener("dblclick", e => {
        e.target.contentEditable = true;
        e.target.style.border = "solid 1px #e4e4e4";
        e.target.style.backgroundColor = "white";
        this.$shadowRoot.querySelector(".close").style.display = "none";
        e.target.focus();
      });

    this.$shadowRoot.querySelector(".textarea").addEventListener("blur", e => {
      var cardId = e.target.getAttribute("card-id");
      var desc = e.target.innerText;
      document.querySelector("#overlay").style.display = "none";
      e.target.contentEditable = false;
      e.target.style.border = "";
      e.target.style.backgroundColor = "";
      this.$shadowRoot.querySelector(".close").style.display = "inline-block";
      CardAction.updateCard({ cardId, desc });
    });
  }
}

customElements.define("trello-card", Card);
