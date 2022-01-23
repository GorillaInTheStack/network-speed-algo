import { Router } from 'express';
import { NETWORK_SPEED_ENDPOINT } from '../../constants/endpoint';
import { Result } from '../../models/result';
import { findBestNetwork } from '../../utils/findBestNetworkStation';

export const router: Router = Router();


router.post(NETWORK_SPEED_ENDPOINT+"/", (req, res) => {
  
  let data = req.body;

  //console.log(data);

  if(!data.stations || !data.device){
    res.status(400).send({
      message: "Error: list of stations and device are required."
    })
  }

  // Calculate
  let best:Result = findBestNetwork(data.stations, data.device);

  if(best.speed === -1){
    res.status(200).send({
      returnType: "Error",
      result: "No network station within reach for point (" 
      + best.device.x_axis + " ," + best.device.y_axis + ")" 
    });
  }else{
    res.status(200).send({
      returnType: "Success",
      result: "Best network station for point (" 
      + best.device.x_axis + " ," + best.device.y_axis + ")" 
      + " is (" + best.station.x_axis + " ," + best.station.y_axis + ")"
      + " with speed " + best.speed,
      station: best.station
    });
}

});






