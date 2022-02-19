import { Router } from "@vaadin/router";
class Homepage extends HTMLElement {
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
            
            <button-el type="button" button="Nueva partida" id="button-nueva-partida"></button-el>
            <button-el type="button" button="Ingresar a una sala" id="button">Ingresar a una sala</button-el>
            
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

        /* Logica de los botones */
        const buttonNuevaPartidaEl = shadow.getElementById("button-nueva-partida")
        buttonNuevaPartidaEl.addEventListener("click", ()=>{
            Router.go("new-game")
        })
        const buttonEl = shadow.getElementById("button")
        buttonEl.addEventListener("click", ()=>{
            Router.go("sala-code")
    })
    }
    
  }
customElements.define("homepage-comp", Homepage);  
