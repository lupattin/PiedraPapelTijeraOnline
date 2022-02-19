import { Router } from "@vaadin/router";
import { state } from "../../state";
class Roompage extends HTMLElement {
    constructor() {
      super(); 
      this.listenroom()
      
    }
    connectedCallback(){
        state.subscribe(()=>{
            this.render()
        })
    }
    render(){
        
        const shadow = this.attachShadow({mode: 'open'});
        /* Agrego elementos */
        shadow.innerHTML=`
        <div class="container">
                <header-comp></header-comp>
            
                <text-comp variant = "paragraph">Compartí el codigo ${state.getState().rooms.id } con tu contrincante.</text-comp>
                <text-comp variant = "paragraph">Y esperalo para comenzar ...</text-comp>
                
        
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
        console.log(state.getState())
    }
    listenroom(){
        const roomid = state.getState().rooms.id
        
        state.listeningRoom(roomid)
        
    }
  }
customElements.define("roompage-comp", Roompage);  