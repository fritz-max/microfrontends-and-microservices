import numpy as np
import h5py

class IMU_Instrument:
    def __init__(self):
        self.ID = f'IMU{np.random.randint(1e6)}'
        self.heartbeat = True
        
        self._i = 0
        imu_file = h5py.File("/app/data/coil_imu.h5", "r")
        
        self.coil_data = imu_file["IMU"] 
        self.N = self.coil_data.shape[0]

    def get_measurement(self):
        x = self._i
        y = list(self.coil_data[self._i%self.N])[1:4]
        self._i += 200
        return (x, y)