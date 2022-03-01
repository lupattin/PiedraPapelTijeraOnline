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
        <imagen-el class="invited-choice" computer type=${
          state.getState().onlineRoom.invitedplay}></imagen-el>
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
        `
        this.shadow.appendChild(div)
        this.shadow.appendChild(style)

        /* Cronometro de 3 seg para ir al resultado */
        
        const invitedPlay = div.querySelector(".invited-choice").getAttribute("type")
        
        const myPlay = this.shadow.querySelector(".my-choice").getAttribute("type")

     
        setTimeout(() => {
          const results = state.whoWins(invitedPlay, myPlay);
          if (results == 2) {
              Router.go("tied-page");
          } else if (results == 1) {
              Router.go("win-page");
          } else {
              Router.go("loss-page");
          }
        }, 3000);
    }
    
  }
customElements.define("result-comp", Result);