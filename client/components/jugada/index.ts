const imagenPiedra = require("url:../../images/piedra.png")
const imagentijera = require("url:../../images/tijeras.png")
const imagenPapel = require("url:../../images/papel.png")

class Imagen extends HTMLElement {
        constructor() {
          
          super();
            this.render()
        }
        render(){
            /* Agrego imagenes a cada componente */
            const shadow = this.attachShadow({mode: 'open'});
            const div = document.createElement("img")
            div.classList.add("type")
            const type = this.getAttribute("type")
            
            if (type == "piedra") {
                div.src = imagenPiedra
            } else if (type == "tijera") {
                div.src = imagentijera
            } else if (type == "papel") {
                div.src = imagenPapel
            }

            shadow.appendChild(div)

            /* Agrego opacidad para la page "jugada" */
            
            const attribute = this.hasAttribute("class")
            const style = document.createElement("style");

            if (attribute == true) {
                style.innerHTML = `
                
                .type{
                  opacity: 0.8;
                }
                
                .type:hover{
                  opacity: 1;
                  width: 100px;
                }
                
                `
              }
              shadow.appendChild(style)

              const computerAtt = this.hasAttribute("computer")
              if (computerAtt == true) {
                style.innerHTML = `
                  .type{
                    width: 150px;
                    height: 260px;
                    transform: rotate(180deg);
                  }
                `
              }
              const myplayAtt = this.hasAttribute("myplay")
              if (myplayAtt == true) {
                style.innerHTML = `
                  .type{
                    width: 150px;
                    height: 260px;
                    
                  }
                `
              }
        }
      }
      customElements.define('imagen-el', Imagen);
