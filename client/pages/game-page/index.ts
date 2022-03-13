import { Router } from "@vaadin/router";
import { state } from "../../state";
class Gamepage extends HTMLElement {
  shadow: ShadowRoot;
  username: string
  roomid: any
  timer: any
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.username = state.getState().users.nombre;
    this.roomid = state.getState().rooms.id;
    this.render();
    this.timer = setTimeout(() => {
      const number = this.getRandomNumber(1, 3)
      console.log("soy settime")
      if(number == 1 ){
          state.setMove("piedra",this.username, this.roomid).then(()=>{
          
              Router.go("waiting-play")
          })
      }else if(number == 2){
          state.setMove("papel",this.username, this.roomid).then(()=>{
          
              Router.go("waiting-play")
          });;
      }else if(number == 3){
          state.setMove("tijera",this.username, this.roomid).then(()=>{
          
              Router.go("waiting-play")
          });;
      }
   }
    , 3500);
  }
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  render() {
    /* Agrego elementos */

    const div = document.createElement("div");
    div.innerHTML = `
        <div class="container">
            <timer-comp></timer-comp>
            <div class="container-images">
                <imagen-el type = "piedra" class="play"></imagen-el>
                <imagen-el type = "papel" class="play"></imagen-el>
                <imagen-el type = "tijera" class="play"></imagen-el>
            </div>
        </div>
        `;
    /* Agrego CCS */
    const style = document.createElement("style");
    style.textContent = `
        .container{
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
            height: 782px;
            
        }
        `;
    this.shadow.appendChild(div);
    this.shadow.appendChild(style);

    /* Logica de la eleccion de la jugada */

    
    const imagenEls = this.shadow.querySelectorAll(".play");
    imagenEls.forEach((ev) => {
      ev.addEventListener("click", (e) => {
        e.stopPropagation;
        const move = ev.getAttribute("type");
        if (move == "piedra") {
          clearTimeout(this.timer)
          state.setMove("piedra", this.username, this.roomid).then(() => {
            Router.go("waiting-play");
          });
        } else if (move == "papel") {
          clearTimeout(this.timer)
          state.setMove("papel", this.username, this.roomid).then(() => {
            Router.go("waiting-play");
          });
        } else {
          clearTimeout(this.timer)
          state.setMove("tijera", this.username, this.roomid).then(() => {
            Router.go("waiting-play");
          });
        }
      });
    });
  }
  randomPlay(){
      this.timer
  }
}
customElements.define("game-comp", Gamepage);
