export default class TrelloHeader extends HTMLElement {
  constructor() {
    super();
    this.$shadowRoot = this.attachShadow({ mode: "open" });
    this.render();
    this.subscribeEvents();
  }
  render() {
    this.$shadowRoot.innerHTML = `
    <style>
        .header{
            background:#0166a3;
            height:50px;
            width:100%;
            margin:0;
        }
        .header img{                
            width: 75px;
            margin: auto;
            display: block;
            padding-top: 12px;
            cursor:pointer;
            position:relative;
        }
        input{
            position: absolute;
            right: 0;
            height: 25px;
            top: 0;
            width: 300px;
            margin-top: 10px;
            margin-right: 15px;
            font-size: 15px;
            outline:0;
        }
    </style>
    <div class='header'>
        <div class='logo'>
            <img src='https://a.trellocdn.com/dist/images/header-logo-2x.01ef898811a879595cea.png'/>                
        </div>        
    </div>
`;
  }
}
customElements.define("trello-header", TrelloHeader);
