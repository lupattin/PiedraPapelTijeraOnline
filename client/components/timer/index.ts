class Timer extends HTMLElement {
      shadow: ShadowRoot;
      
      constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
      }
      connectedCallback() {
        const style = document.createElement("style");
        style.innerHTML = `
        .circular{
          height: 400px;
          width:400px;
          position: absolute;
          transform: translate(-50%, 0%);
          border-radius: 8px;
          display: grid;
          place-items: center;
          font-family: "Odibee sans";
        }
        .progress-bar{
          position: relative;
          height: 250px;
          width: 250px;
          background-color: #cadcff ;
          border-radius: 50%;
          display: grid;
          place-items: center;
        }
        .progress-bar:before{
          content: '';
          position: absolute;
          background-color: white;
          height: 84%;
          width: 84%;
          border-radius: 50%;
        }
        .value-container{
          position: relative;
          font-size: 50px;
        }
        `;

        this.shadow.appendChild(style);
        this.render();
      }
      render() {
        const div = document.createElement("div");
        div.className = "circular";

        div.innerHTML = `
          <div class="progress-bar">
            <div class="value-container">0</div>
          </div>
          
        `;

        let progressBar: any = div.querySelector(".progress-bar");
        let valueContainer = div.querySelector(".value-container");

        let counter = 0;
        let maxLimit = 3;
        

        var variable = setInterval(() => {
          counter++;
          valueContainer.textContent = `${counter}`;
          progressBar.style.background = `
          conic-gradient(
            #4d5bf9 ${counter * 120}deg,
            #cadcff ${counter * 120}deg
          )`;
          if (counter >= maxLimit) {
                       
              clearInterval(variable);
          
            }
          
        }, 1000);

        this.shadow.appendChild(div);
      }
    }
customElements.define("timer-comp", Timer);  