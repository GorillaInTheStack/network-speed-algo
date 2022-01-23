# Tech assignment - Network speed
This is my solution to the Tech assignment given by NordCloud in Jan 2022.
The description is available in the pdf file.

## Installation
Use the package manager [NPM](https://www.npmjs.com/) to install the backend dependencies.

```bash
npm install
```

## Usage
Run server in dev mode.
```bash
npm run dev
```
This will immediately output the solution for the given values to the console.
It will also start a server at 8080 with endpoint `/api/network`.

## Tests
Tests can be run by running either
```bash
npm t
```
or 
```bash
npm run test
```

## Using The API Endpoint
The API endpoint expects POST requests to `/api/network` with a JSON payload looking like
```JSON
{
    "stations" : [{
        "x_axis":0,
        "y_axis":0,
        "reach":9}
    ],
    "device" : {"x_axis":0,"y_axis":0}
}
```
A list of stations and a device.
The API assumes the data given is given in good format. The three possible responses are as follows
```JSON
{
    "returnType": "Success",
    "result": "Best network station for point (0 ,0) is (0 ,0) with speed 81",
    "station": {
        "x_axis": 0,
        "y_axis": 0,
        "reach": 9
    }
}
```
When a station has been found successfully
```JSON
{
    "returnType": "Error",
    "Description": "No network station within reach for point (0,0)"
}
```
When no suitable station can be returned
```JSON
{
    "message": "Error: list of stations and device are required."
}
```
When the POST request is missing the device or the list of stations

## Possible Cloud Deployments
One way to deploy this app is to use the function through the Functions as a Service (FaaS) model.
The function in question here is the `findBestNetworkStation` in `utils`. This function can be set up using one of the providers such as AWS Lambda, Microsoft Azure Functions, or Google Cloud Functions. The trigger for the function would be event-based, specifically when a POST request is made to the endpoint. The pros of this approach are obvious efficiency, low cost, and the benefit of offloading the infrastructure to the provider. There are possible downsides and tradeoffs to this approach such as the [Cold Start issue](https://builtin.com/software-engineering-perspectives/cold-starts-challenge-serverless-architecture) and the fact that the function will have to be stateless so logging on a file wouldn't be an option among other things.

## License
[MIT](https://choosealicense.com/licenses/mit/)