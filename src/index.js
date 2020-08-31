import React from "react"
import ReactDOM from "react-dom"
import "./styles/index.styl"
import Routes from "./routes"
import { AppStore } from "./stores"
import { Provider } from "mobx-react"

const root = document.getElementById("root")
const appStore = new AppStore()

ReactDOM.render(
  <Provider appStore={appStore}>
    <Routes />
  </Provider>,
  root
)
