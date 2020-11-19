import React from "react";
import autobahn from 'autobahn-browser';

import ConnectionSettings from "./ConnectionSettings";

class Connection {
    constructor() {
        // super()
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

export default Connection