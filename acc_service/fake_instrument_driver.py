import numpy as np
import h5py

class ACC_Instrument:
    def __init__(self):
        self.ID = f'ACC{np.random.randint(1e6)}'
        self.heartbeat = True

        self._i = 0
        imu_file = h5py.File("/app/data/coil_imu.h5", "r")
        
        self.coil_data = imu_file["IMU"] 
        self.N = self.coil_data.shape[0]

    def get_measurement(self, publish_interval=0.1):
        x = self._i
        y = list(self.coil_data[self._i%self.N])[4:7]
        self._i += int(2000*publish_interval)
        return (x, y)