class Textcomp extends HTMLElement {
        constructor() {
          super();
          this.render();
        }
        render(){
            const shadow = this.attachShadow({ mode: "open"});
            const div = document.createElement("p")
            const style = document.createElement("style")
            const variant = this.getAttribute("variant")
            div.innerHTML = this.textContent
    
            style.innerHTML = `
            .title{
                font-family: 'Lora', serif;
                font-size: 60px;
                margin: 34px 34px;
                color: #009048;
                font-weight: 700;
                text-align: center;
            }
            .paragraph{
                font-size: 30px;
                font-family: 'Lora', serif;
                margin: 0px 34px 0px 34px;
                font-weight: 700;
            }
            `
         div.className = variant 
         shadow.appendChild(div)  
         shadow.appendChild(style) 
         
        }
      }
    customElements.define("text-comp", Textcomp);  


