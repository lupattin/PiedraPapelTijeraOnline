  class Button extends HTMLElement {
      constructor() {
        super();
        this.render();
      }
      render(){

        /* Este custom EL puede ser solo un boton o un boton con input y label. Genero if para segun el type que tenga genere uno o el otro */  
        const shadow = this.attachShadow({ mode: "open"});
        
        if (this.getAttribute("type")== "button") {
            const button = document.createElement("button")
            button.textContent = this.getAttribute("button")
            button.classList.add("button")

            shadow.appendChild(button)
        } else if(this.getAttribute("type")== "full-button"){
           const form = document.createElement("form")
           const button = document.createElement("button")
           const input = document.createElement("input")
           const label = document.createElement("label")

           form.classList.add("form")
           form.setAttribute("id","form")
           button.classList.add("button")
           button.textContent = this.getAttribute("button")
           input.classList.add("input")
           label.classList.add("label")
           label.textContent = this.getAttribute("label")
           
           shadow.appendChild(form)
           form.appendChild(label)
           form.appendChild(input)
           form.appendChild(button)
        } else if(this.getAttribute("type")=="doble-label-button") {
          const form = document.createElement("form")
           const button = document.createElement("button")
           const input = document.createElement("input")
           const input2 = document.createElement("input")
           const label = document.createElement("label")
           const label2 = document.createElement("label")

           form.classList.add("form")
           form.setAttribute("id","form")
           button.classList.add("button")
           button.textContent = this.getAttribute("button")
           input.classList.add("input")
           input2.classList.add("inputdos")
           label.classList.add("label")
           label2.classList.add("label")
           label.textContent = this.getAttribute("label")
           label2.textContent = this.getAttribute("label-dos")
           
           shadow.appendChild(form)
           form.appendChild(label)
           form.appendChild(input)
           form.appendChild(label2)
           form.appendChild(input2)
           form.appendChild(button)
        }
        const style = document.createElement("style")
        style.textContent = `

          .form{
              display: flex;
              justify-content: space-between;
              align-items: center;
              flex-direction: column;
          }
          .button{
            font-family: 'Odibee Sans', cursive;
            font-size: 20px;
            height: 70px;
            width: 200px;
            border: 10px solid #001997;
            background-color: #006CFC;
            color: white;
          }
          .input{
            font-family: 'Odibee Sans', cursive;
            font-size: 20px;
            height: 30px;
            margin: 10px 0px;
            width: 180px;
          }
          .inputdos{
            font-family: 'Odibee Sans', cursive;
            font-size: 20px;
            height: 30px;
            margin: 10px 0px; 
            width: 180px;
          }
          .label{
            font-family: 'Odibee Sans', cursive;
            font-size: 20px;
          }
        `
          shadow.appendChild(style)
      }
    }
  customElements.define("button-el", Button);  


