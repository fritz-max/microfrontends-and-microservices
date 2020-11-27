import json

class MicroService:
    def __init__(self, path):
        file = open(path)
        model = json.load(file)
        file.close()

        self.router_url = "ws://crossbar_router:8080/ws"
        self.router_realm = "realm"

        subs, pubs, caller, callee = {}, {}, {}, {}

        for topic in model['subscribe-topics']:
            subs[topic] = f"com.airvisor/{topic}"

        for topic in model['publish-topics']:
            pubs[topic] = f"com.airvisor/{topic}"

        for topic in model['caller-topics']:
            caller[topic] = f"com.airvisor/{topic}"

        for topic in model['callee-topics']:
            callee[topic] = f"com.airvisor/{topic}"

        self.subscribe_topics = subs
        self.publish_topics = pubs
        self.caller_topics = caller
        self.callee_topics = callee

def load_ms_model(path='model.json'):
    return MicroService(path)
