import { Router } from "@vaadin/router";
import { state } from "../../state";
class Winpage extends HTMLElement {
    shadow: ShadowRoot
    constructor() {
      super(); 
      this.shadow = this.attachShadow({mode: 'open'});
      this.render()
    }
    render(){
        /* Agrego elementos */
        
        const ganasteResultURL = require("url:../../images/Star1.png");
        const div = document.createElement("div")
        div.innerHTML=`
        <div class="container">
            
            <img width="255px" src="${ganasteResultURL}">
            <div class="match-results__image-text"></div>
            
            <score-comp></score-comp>
            <button-el type="button" button="Volver a Jugar" id="button-volver-a-jugar"></button-el>
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
        const buttonNuevaPartidaEl = this.shadow.getElementById("button-volver-a-jugar")
        buttonNuevaPartidaEl.addEventListener("click", ()=>{
            
                const array = state.listeners
                
                array.splice(0, array.length)
                
                Router.go("instructions")
            
            })
   }
  }
customElements.define("win-comp", Winpage);  