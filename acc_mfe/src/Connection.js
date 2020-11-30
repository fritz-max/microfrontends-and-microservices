import autobahn from 'autobahn-browser';

const config = require("../config.json");

export class ConnectionSettings {
    constructor() {
        this.url = "ws://"+config.router+":8080/ws"
        this.realm = "realm"
        this.subscribeTopics = {}
        this.publishTopics = {}
        this.callerTopics = {}
        this.calleeTopics = {}

        config.topics.subscribeTopics.forEach(topic => {
            this.subscribeTopics[topic] = "com.airvisor/"+topic
        })

        config.topics.publishTopics.forEach(topic => {
            this.publishTopics[topic] = "com.airvisor/"+topic
        })

        config.topics.callerTopics.forEach(topic => {
            this.callerTopics[topic] = "com.airvisor/"+topic
        })
        
        config.topics.calleeTopics.forEach(topic => {
            this.calleeTopics[topic] = "com.airvisor/"+topic
        })
    }
}

export class Wamp {
    constructor() {
        this.connectionSettings = new ConnectionSettings()
        this.connection = new autobahn.Connection({
            url: this.connectionSettings.url,
            realm: this.connectionSettings.realm
        })
    }

    subscribe(topic, subscribeCallback) {
        this.connection.onopen = (session, details) => {
            session.subscribe(topic, subscribeCallback)
        }
    }

    callRPC(topic) {
        var returnVal = "";
        this.connection.session.call(topic)
            .then(rpcReturnVal => {
                returnVal = rpcReturnVal
                this.connection.session.log("Called Function "+topic)
                this.connection.session.log("Return Value: "+rpcReturnVal)
            })
        return returnVal
    }

    openConnection() {
        this.connection.open();
    }

    closeConnection() {
        this.connection.close();
    }

    componentWillUnmount() {
        this.closeConnection();
    }
}
