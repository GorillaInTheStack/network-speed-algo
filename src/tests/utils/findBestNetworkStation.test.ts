import { DeviceLocation } from "../../models/device";
import { NetworkStation } from "../../models/networkStation";
import { Result } from "../../models/result";
import { findBestNetwork } from "../../utils/findBestNetworkStation";

describe('Testing findBestNetworkStation that should give back the best network station for a given device', () => {
    
    it('When no network is within reach, the function returns a result struct with speed equal to -1',  () => {
        let stations:Array<NetworkStation> = new Array<NetworkStation>();
        stations.push({x_axis: 0,y_axis: 0, reach: 9});

        let device:DeviceLocation = {x_axis: 100, y_axis: 100};

        let result:Result = findBestNetwork(stations, device);

        expect(result.speed).toEqual(-1);
        
    })

    it('When a device is on the same point as a station, that station should be the best returned.',  () => {
        
        let stations:Array<NetworkStation> = new Array<NetworkStation>();
        stations.push({x_axis: 1,y_axis: 0, reach: 4});
        stations.push({x_axis: 0,y_axis: 0, reach: 9});
        stations.push({x_axis: 0,y_axis: 10, reach: 19});

        let device:DeviceLocation = {x_axis: 0, y_axis: 0};

        let result:Result = findBestNetwork(stations, device);

        expect(result.speed).toEqual(81);
        
    })

    it('Normal case.',  () => {
        
        let stations:Array<NetworkStation> = new Array<NetworkStation>();
        stations.push({x_axis: 1,y_axis: 0, reach: 4});
        stations.push({x_axis: 0,y_axis: 0, reach: 9});
        stations.push({x_axis: 0,y_axis: 10, reach: 19});

        let device:DeviceLocation = {x_axis: 0, y_axis: 1};

        let result:Result = findBestNetwork(stations, device);

        // The best is chosen based on the speed which is dependant on reach
        // High reach = better speed
        expect(result.station.reach).toEqual(19);
        
    })

})