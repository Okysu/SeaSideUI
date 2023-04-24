import { App } from "vue"


const ssui = {
    install(app: App<Element>) {
        app.config.globalProperties.$ssui = {
            version: '0.0.1',
        }
    }
}

export default ssui