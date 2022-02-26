import { Router } from "@vaadin/router";
import { stat } from "fs";
import { state } from "../../state";
class SalaCode extends HTMLElement {
    constructor() {
      super(); 
      this.render()
    }
    
    
    render(){
        /* Agrego elementos */
        const shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML=`
        <div class="container">
            <text-comp variant = "title">Piedra, Papel o Tijera.</text-comp>
            <button-el type="doble-label-button" label="Ingresa tu codigo" label-dos="Ingresa tu nombre" button="Empezar" id="button"></button-el>
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
        shadow.appendChild(style)

        /* Logica del boton */
        const buttonEl = shadow.getElementById("button")
        const formShadowEL =buttonEl.shadowRoot.getElementById("form")
        const inputRoomShadowEL = <HTMLInputElement>buttonEl.shadowRoot.querySelector(".input")
        const inputNameShadowEL=<HTMLInputElement> buttonEl.shadowRoot.querySelector(".inputdos")
        formShadowEL.addEventListener("submit",(e)=>{
            e.preventDefault()
            state.listeningRoom(inputRoomShadowEL.value)
            state.setUser(inputNameShadowEL.value).then(()=>{
                state.connectToRoom(inputRoomShadowEL.value, inputNameShadowEL.value).then((r)=>{
                   if(r == "ok"){
                       Router.go("instructions")
                   }
                })
            })
        })
        
    }
    
  }
customElements.define("salacode-comp", SalaCode);  