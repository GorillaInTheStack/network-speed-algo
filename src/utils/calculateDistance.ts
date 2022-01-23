import { DeviceLocation } from "../models/device";
import { NetworkStation } from "../models/networkStation";

/**
 * Calculates the distance between a station and a device
 * @param station The given station
 * @param device The given device
 * @returns Distance number
 */
export function calculDistance(station: NetworkStation, device: DeviceLocation): number{
    let x_axis = (station.x_axis - device.x_axis);
    let y_axis = (station.y_axis - device.y_axis);
    return Math.hypot(x_axis, y_axis);
}