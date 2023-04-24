import component from "./ss-button.vue"
import { App } from "vue"

component.install = (app: App<Element>) => {
    app.component(component.name, component)
}

export default component