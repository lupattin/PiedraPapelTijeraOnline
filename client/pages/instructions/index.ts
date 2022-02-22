import { Router } from "@vaadin/router";
import { state } from "../../state";
class Instructions extends HTMLElement {
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
                <header-comp>${state.getState().onlineRoom.invited}</header-comp>
            
                <text-comp variant = "paragraph">Presioná jugar
                y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</text-comp>
                <button-el type="button" button="¡Jugar!" id="button-jugar"></button-el>
                
                <div class="container-images">
                    <imagen-el type = "piedra"></imagen-el>
                    <imagen-el type = "papel"></imagen-el>
                    <imagen-el type = "tijera"></imagen-el>
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

        /* Logica del boton */

        const buttonNuevaPartidaEl = this.shadow.getElementById("button-jugar")
        buttonNuevaPartidaEl.addEventListener("click", ()=>{
            Router.go("game-page")
        })
    }
    
  }
customElements.define("instructions-comp", Instructions);  