import { Router } from "@vaadin/router";
import { state } from "../../state";
class Logging extends HTMLElement {
    shadow: ShadowRoot
    constructor() {
      super(); 
      this.shadow = this.attachShadow({mode: 'open'});
      this.render()
    }
    
    render(){
       

        const div = document.createElement("div")
        div.innerHTML=`
        <div class="container">
                
            
                <text-comp variant = "paragraph"> Entrando a la Sala...
                Por favor, aguarde... </text-comp>
                
                
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
            padding: 70px 0 0 0;
        }
        `
        this.shadow.appendChild(div)
        this.shadow.appendChild(style)

        /* Logica del boton */
       
        setTimeout(() => {
            Router.go("instructions")
        }, 3000)
    }
    
  }
customElements.define("logging-comp", Logging);  