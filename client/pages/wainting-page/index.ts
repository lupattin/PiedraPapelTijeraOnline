import { Router } from "@vaadin/router";
import { state } from "../../state";
class Waiting extends HTMLElement {
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
            
                <text-comp variant = "paragraph">Esperando a que ${state.getState().onlineRoom.invited} haga su jugada.</text-comp>
                
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
    }
    
  }
customElements.define("waiting-comp", Waiting);  