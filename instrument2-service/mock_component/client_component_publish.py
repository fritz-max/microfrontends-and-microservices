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

url = os.environ.get('CBURL', 'ws://localhost:8080/ws')
realmv = os.environ.get('CBREALM', 'realm1')
topic = os.environ.get('CBTOPIC', 'com.myapp.hello/instrument2')
component = Component(transports=url, realm=realmv)

class MockInstrument:
    def __init__(self):
        self.N = 100
        self._i = 0
        self.signal = - (np.linspace(1, 100+1, 100)**3)[::-1]

    def get_measurement(self):
        self._i += 1
        x = self._i
        y = self.signal[self._i%self.N]+np.random.randint(1000)
        return (x, y)


@component.on_join
@inlineCallbacks
def joined(session, details):
    instrument = MockInstrument()
    while True:
        # publish() only returns a Deferred if we asked for an acknowledgement
        (x, y) = instrument.get_measurement()
        session.publish(topic , x, y)
        yield sleep(0.1)



if __name__ == "__main__":
    run([component])        



