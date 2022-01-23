import { DeviceLocation } from "./device";
import { NetworkStation } from "./networkStation";

// Structure to store the result for each device
export interface Result{
    device: DeviceLocation;
    station: NetworkStation;
    speed: number
}