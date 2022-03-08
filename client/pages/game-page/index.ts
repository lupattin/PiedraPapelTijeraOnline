import { Router } from "@vaadin/router";
import { state } from "../../state";
class Gamepage extends HTMLElement {
    shadow: ShadowRoot
    constructor() {
      super(); 
      this.shadow = this.attachShadow({mode: 'open'});
      this.render()
    }
    
    render(){
        /* Agrego elementos */
        
        const div = document.createElement("div")
        div.innerHTML=`
        <div class="container">
            <timer-comp></timer-comp>
            <div class="container-images">
                <imagen-el type = "piedra" class="play"></imagen-el>
                <imagen-el type = "papel" class="play"></imagen-el>
                <imagen-el type = "tijera" class="play"></imagen-el>
            </div>
        </div>
        `
        /* Agrego CCS */
        const style = document.createElement("style")
        style.textContent=
        `
        .container{
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
            height: 782px;
            
        }
        `
        this.shadow.appendChild(div)
        this.shadow.appendChild(style)

        /* Logica de la eleccion de la jugada */
       
        const username = state.getState().users.nombre
        const roomid = state.getState().rooms.id
        const imagenEls = this.shadow.querySelectorAll(".play");
        imagenEls.forEach((ev) => {
        ev.addEventListener("click", (e) => {
        e.stopPropagation;
        const move = ev.getAttribute("type");
        if (move == "piedra") {
             state.setMove("piedra",username, roomid).then(()=>{
                
                 Router.go("waiting-page")
             })
        } else if (move == "papel") {
             state.setMove("papel",username, roomid).then(()=>{
                
                Router.go("waiting-page")
            });;
        } else {
             state.setMove("tijera",username, roomid).then(()=>{
                
                Router.go("waiting-page")
            });;
        }

            
         });
        })
    }
  }
customElements.define("game-comp", Gamepage);  