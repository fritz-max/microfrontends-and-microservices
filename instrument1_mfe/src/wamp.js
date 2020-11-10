import React from "react";
import autobahn from 'autobahn-browser';

const config = require("../configfile.json");

class Connection extends React.Component {
    constructor() {
        super()
        this.connection = new autobahn.Connection({
            url: config.wampRouter.url,
            realm: config.wampRouter.realm
        })
    }

    subscribe(topic, subscribeCallback) {
        this.connection.onopen = (session, details) => {
            session.subscribe(topic, subscribeCallback)
        }
        this.connection.open();
    }

    componentWillUnmount() {
        this.autobahnConnection.close();
    }
}

export default Connection