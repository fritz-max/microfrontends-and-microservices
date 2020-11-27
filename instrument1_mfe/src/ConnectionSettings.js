const config = require("../config.json");

class ConnectionSettings {
    constructor() {
        this.url = "ws://"+config.router+":8080/ws"
        this.realm = "realm"
        this.subscribeTopics = []
        this.publishTopics = []
        this.rpcTopics = []

        config.subscribeTopics.forEach(topic => {
            this.subscribeTopics.push("com.airvisor/"+topic)
        })

        config.publishTopics.forEach(topic => {
            this.publishTopics.push("com.airvisor/"+topic)
        })

        config.rpcTopics.forEach(topic => {
            this.rpcTopics.push("com.airvisor/"+topic)
        })
    }
}

export default ConnectionSettings