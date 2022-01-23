import { Result } from "../models/result";
import { DeviceLocation } from "../models/device";
import { NetworkStation } from "../models/networkStation";
import { calculDistance } from "./calculateDistance";
import PriorityQueue from 'ts-priority-queue'; 

/**
 * Finds the best network for a given device location.
 * @param stations A list of stations.
 * @param device The device in question.
 * @returns Result { station, device, speed }
 * @complexity O(num_stations * log(num_stations))
 */
export function findBestNetwork(stations: NetworkStation[], device: DeviceLocation): Result{
    
    // Max priority queue to compare the speed of the stations efficiently.
    var maxQueue = new PriorityQueue({ comparator: function(a:Result, b:Result) { return b.speed - a.speed; }});

    // O(stations * log(stations))
    for(var station of stations){
        // O(1)
        let distance = calculDistance(station, device);

        // Stations that are out of reach have speed of -1.
        let speed = -1;
        if(distance < station.reach){
            speed = Math.pow(station.reach - distance, 2);
        }
        let result: Result = {device: device, station: station, speed: speed};

        // O(log(results))
        maxQueue.queue(result);
    }

    let best:Result = maxQueue.dequeue();
    maxQueue.clear()
    return best
} 