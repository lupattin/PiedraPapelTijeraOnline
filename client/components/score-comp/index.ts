import { state } from "../../state";

class Score extends HTMLElement{
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const style = document.createElement("style");
    style.innerHTML = `
    h1, h2{
      margin: 0;
      font-weight: 300;
    }
    
    .score-board {
      border: solid 10px black;
      border-radius: 10px;
      width: 259px;
      height: 217px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      background-color: white;
      margin: auto;
      font-family: "Odibee sans";
      font-size: 45px;
      font-weight: 400;
    }
    .score-results{
      width: 94%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      font-size: 30px;
      margin-bottom: 10px;
    }
    
    .button {
      margin: 0;
    }  
    `;

    this.shadow.appendChild(style);
    this.render();
  }
  render() {
    const games = state.getState().history.previousGames;
    const div = document.createElement("div");
    
    div.innerHTML = `
    
    <div class="results__container"> 
      <div class="score-board">
        <h1>Score</h1>
        <div class="score-results">
          <h2>${state.getState().onlineRoom.invited}: ${games.won.length}</h2>
          <h2>${state.getState().onlineRoom.owner}: ${games.lost.length} </h2>
        </div>
      </div>
    </div>
    `;

    this.shadow.appendChild(div);
  }
}

customElements.define("score-comp", Score);  