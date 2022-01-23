import { DeviceLocation } from "../../models/device";
import { NetworkStation } from "../../models/networkStation";
import { calculDistance } from "../../utils/calculateDistance"

describe('Testing calculDistance that should give the distance between two points.', () => {
    
    it('Distance between the same point should be zero',  () => {

        let station:NetworkStation = {x_axis:0, y_axis:0, reach: 0};
        let device:DeviceLocation = {x_axis:0, y_axis:0};

        let distance = calculDistance(station, device);
        
        expect(distance).toEqual(0);
    })

    it('Distance should never be negative',  () => {

        let station:NetworkStation = {x_axis:-1, y_axis:0, reach: 0};
        let device:DeviceLocation = {x_axis:0, y_axis:-1};

        let distance = calculDistance(station, device);
        
        expect(distance).toBeGreaterThanOrEqual(0);
    })

})