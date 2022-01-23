import express, { Express } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import config from '../config.json';
import { getFilesWithKeyword } from './utils/getFilesWithKeyword';
import { NetworkStation } from './models/networkStation';
import { DeviceLocation } from './models/device';
import { Result } from './models/result';
import { findBestNetwork } from './utils/findBestNetworkStation';

const app: Express = express();

/************************************************************************************
 *                              Basic Express Middlewares
 ***********************************************************************************/

app.set('json spaces', 4);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle logs in console during development
if (process.env.NODE_ENV === 'development' || config.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  app.use(cors());
}

// Handle security and origin in production
if (process.env.NODE_ENV === 'production' || config.NODE_ENV === 'production') {
  app.use(helmet());
}

/************************************************************************************
 *                               Register all routes
 ***********************************************************************************/

getFilesWithKeyword('router', __dirname + '/app').forEach((file: string) => {
  const { router } = require(file);
  app.use('/', router);
})
/************************************************************************************
 *                               Express Error Handling
 ***********************************************************************************/

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  return res.status(500).json({
    errorName: err.name,
    message: err.message,
    stack: err.stack || 'no stack defined'
  });
});

/************************************************************************************
 *                               Hardcoded assignment answer
 ***********************************************************************************/
// Given stations
let stations:Array<NetworkStation> = new Array<NetworkStation>();
stations.push({x_axis: 0,y_axis: 0, reach: 9});
stations.push({x_axis: 20,y_axis: 20, reach: 6});
stations.push({x_axis: 10,y_axis: 0, reach: 12});
stations.push({x_axis: 5,y_axis: 5, reach: 13});
stations.push({x_axis: 99,y_axis: 25, reach: 2});

// Given devices
let devices:Array<DeviceLocation> = new Array<DeviceLocation>();
devices.push({x_axis: 0, y_axis: 0});
devices.push({x_axis: 100, y_axis: 100});
devices.push({x_axis: 15, y_axis: 10});
devices.push({x_axis: 18, y_axis: 18});
devices.push({x_axis: 13, y_axis: 13});
devices.push({x_axis: 25, y_axis: 99});

console.log("\n ### Answers to the given values in the document ### \n")
// Answer the assignment
for(var device of devices){
  
  let best:Result = findBestNetwork(stations, device);
  
  if(best.speed === -1){
  
    console.error("No network station within reach for point (" + best.device.x_axis + " ," + best.device.y_axis + ")");
  
  }else{
  
    console.log("Best network station for point (" + best.device.x_axis + " ," + best.device.y_axis 
    + ")" +
     " is (" + best.station.x_axis + " ," + best.station.y_axis + ") with speed " + best.speed );
  
  }
}
console.log("\n ### check out the endpoint at /api/network to post your own values ### \n")





export default app;