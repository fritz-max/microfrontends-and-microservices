# autobahn + twisted(event handling lib in python)
from autobahn.twisted.component import Component, run
from autobahn.twisted.util import sleep
from twisted.internet.defer import inlineCallbacks

# from dir
from fake_instrument_driver import IMU_Instrument
from ms_model import load_ms_model

service = load_ms_model()

component = Component(transports=service.router_url,
                      realm=service.router_realm)


@component.on_join
@inlineCallbacks
def joined(session, details):
    instrument = IMU_Instrument()

    def callee_control_measurement():
        instrument.heartbeat = not instrument.heartbeat
        return instrument.heartbeat

    try:
        yield session.register(callee_control_measurement, service.callee_topics["IMU/control_measurement"])
        print("procedure registered")
    except Exception as e:
        print("could not register procedure: {0}".format(e))

    publish_interval = 0.1
    while True: 
        if instrument.heartbeat:
            measurement = instrument.get_measurement(publish_interval=publish_interval)
            session.publish(service.publish_topics["IMU"], *measurement)
            session.publish(service.publish_topics["heartbeat"], instrument.ID)
        yield sleep(publish_interval)


if __name__ == '__main__':
    run([component])
