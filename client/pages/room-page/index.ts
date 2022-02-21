import { Router } from "@vaadin/router";
import { state } from "../../state";
class Roompage extends HTMLElement {
    shadow: ShadowRoot
    nombreInvitado: string
    constructor() {
      super(); 
      this.listenroom()
      this.shadow = this.attachShadow({mode: 'open'});
    }
    connectedCallback(){
        state.subscribe(()=>{
            this.render()
        })
    }
    render(){
        /* Agrego elementos */
        
        const div = document.createElement("div")
        div.innerHTML=`
        <div class="container">
                <header-comp>Contrincante</header-comp>
            
                <text-comp  asd="asd" variant = "paragraph">Compartí el codigo ${state.getState().rooms.id } con tu contrincante.</text-comp>
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
        this.shadow.appendChild(div)
        this.shadow.appendChild(style)

        /* Logica Para cuando ingresa el invitado cambie de pagina */

        if(state.getState().onlineRoom.invited){
            Router.go("/home-page")
        }
    }
    listenroom(){
        const roomid = state.getState().rooms.id
        
        state.listeningRoom(roomid)
        
    }
  }
customElements.define("roompage-comp", Roompage);  