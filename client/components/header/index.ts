import { state } from "../../state";
class Headercomp extends HTMLElement {
        constructor() {
          super();
          this.render()
        }
       
        render(){
            const shadow = this.attachShadow({ mode: "open"});
            const div = document.createElement("div")
            const style = document.createElement("style")
            const currentState = state.getState()
            const userName = this.getAttribute("owner-name")
            const roomId = currentState.rooms.id
           
            
            div.innerHTML = `
            <div class="contenedor-header">
                <div class="contenedor-nombres">
                    <p class="jugador-owner">${userName}</p>
                    <p class="jugador-invitado"></p>
                </div>
                <div class="contenedor-sala">
                    <p class="sala">Sala</p>
                    <p class="sala-codigo">${roomId}</p>
                </div>
            </div>
            `
            const pEl = div.querySelector(".jugador-invitado")
            pEl.textContent = this.textContent
            

            
 
            style.innerHTML = `
            .contenedor-header{
                display: flex;
                width: 80vw;
                justify-content: space-between;
                
            }
            .contenedor-nombres{
                display: flex;
                flex-direction: column;
                font-family: 'Lora', serif;
                font-size: 13px;
                font-weight: 700;
                
            }
            .jugador-owner{
                color: black;
            }
            .jugador-invitado{
                color: blue;
            }
            .sala{
                font-size: 17px;
                margin-bottom: 0px;
                margin-top: 13px;
            }
            .sala-codigo{
                color: blue;
            }
            .contenedor-sala{
                display: flex;
                flex-direction: column;
                font-family: 'Lora', serif;
                font-size: 17px;
                font-weight: 700;
            }
            `
         
         shadow.appendChild(div)  
         shadow.appendChild(style) 
         
        }
        
    }
    customElements.define("header-comp", Headercomp);  
