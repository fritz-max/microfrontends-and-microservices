###############################################################################
#
# The MIT License (MIT)
#
# Copyright (c) Crossbar.io Technologies GmbH
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#
###############################################################################

from autobahn.twisted.component import Component, run
from autobahn.twisted.util import sleep
from twisted.internet.defer import inlineCallbacks
import os
import numpy as np
import h5py

import json
with open("/app/mock_component/config.json", "r") as file:
    config = json.load(file)   

url = config["connection"]["router"]["url"]
realmv = config["connection"]["router"]["realm"]
topic = config["connection"]["topic"]

component = Component(transports=url, realm=realmv)

class MockInstrument:
    def __init__(self):
        self._i = 0
        self.paused = False
        imu_file = h5py.File("/app/mock_component/coil_imu.h5", "r")
        self.coil_data = imu_file["IMU"] 
        self.N = self.coil_data.shape[0]

    def get_measurement(self):
        x = self._i
        y = list(self.coil_data[self._i%self.N])[1:4]
        self._i += 400
        return (x, y)

    def pause(self):
        self.paused = not self.paused 
        return self.paused

@component.on_join
@inlineCallbacks
def joined(session, details):
    instrument = MockInstrument()

    def rpc_pause():
        print("rpc_pause called")
        return instrument.pause()

    print(topic+"/pause")

    try:
        yield session.register(rpc_pause, topic+"/pause")
        print("procedure registered")
    except Exception as e:
        print("could not register procedure: {0}".format(e))

    while True:
        # publish() only returns a Deferred if we asked for an acknowledgement
        if not instrument.paused:
            # print("publish")
            (x, y) = instrument.get_measurement()
            session.publish(topic , x, y)
        yield sleep(0.2)


if __name__ == "__main__":
    run([component])        



