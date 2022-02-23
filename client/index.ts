/* importo componentes y pages para que parcel los buildee */

import "./components/button"
import "./components/text-comp"
import "./components/jugada"
import "./components/header"
import "./components/timer"
import "./router"
import "./db"
import "./pages/home-page"
import "./pages/new-user"
import "./pages/sala-code"
import "./pages/room-page"
import "./pages/instructions"
import "./pages/game-page"
import "./pages/wainting-page"





import { Router } from "@vaadin/router"


function main(){
    Router.go("/home-page")
}

main()