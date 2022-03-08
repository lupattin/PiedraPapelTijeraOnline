import { Router } from "@vaadin/router";
import { state } from "../../state";
class Result extends HTMLElement {
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
          <imagen-el class="invited-choice" computer type=${state.getState().onlineRoom.invitedplay}></imagen-el>
          <div class="nombre-jugador">${state.getState().onlineRoom.invited}</div>
          <div class="nombre-jugador">${state.getState().onlineRoom.owner}</div>
          <imagen-el class="my-choice" myplay type=${state.getState().onlineRoom.ownerplay} ></imagen-el>
        </div>
    `;
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
        .nombre-jugador{
          font-family: 'Lora', serif;
          font-size: 60px;
          margin: 34px 34px;
          color: #009048;
          font-weight: 700;
          text-align: center;
        }
        `
        this.shadow.appendChild(div)
        this.shadow.appendChild(style)

        /* Cronometro de 3 seg para ir al resultado */
        
        const invitedPlay = div.querySelector(".invited-choice").getAttribute("type")
        
        const myPlay = this.shadow.querySelector(".my-choice").getAttribute("type")

     
        setTimeout(() => {
          const results = state.whoWins(invitedPlay, myPlay);
          if (results == 2) {
            const roomid = state.getState().rooms.id
            state.eliminitePlayerPlays(roomid).then(()=>{

              Router.go("tied-page");
            })
        
          } else if (results == 1) {
            const roomid = state.getState().rooms.id
            state.eliminitePlayerPlays(roomid).then(()=>{

              Router.go("win-page");
            })
          } else {
            const roomid = state.getState().rooms.id
            state.eliminitePlayerPlays(roomid).then(()=>{

              Router.go("loss-page");
            })
          }
        }, 3000);
    }
    
  }
customElements.define("result-comp", Result);