import app from "../../server";
const request = require("supertest");

describe("Testing POST /api/network", () => {
  
    it("POST valid data", async () => {
    const result = await request(app)
    .post("/api/network")
    .send({
        "stations" : [{
            "x_axis":0,
            "y_axis":0,
            "reach":9}
            ,{
            "x_axis":20,
            "y_axis":20,
            "reach":6
            }
        ],
        "device" : {"x_axis":0,"y_axis":0}
    });
    expect(result.body.returnType).toEqual("Success");
    expect(result.statusCode).toEqual(200);
  });

  it("POST no best station available", async () => {
    const result = await request(app)
    .post("/api/network")
    .send({
        "stations" : [{
            "x_axis":20,
            "y_axis":20,
            "reach":6
            }
        ],
        "device" : {"x_axis":0,"y_axis":0}
    });
    expect(result.body.returnType).toEqual("Error");
    expect(result.statusCode).toEqual(200);
  });

  it("POST No station given", async () => {
    const result = await request(app)
    .post("/api/network")
    .send({
        "device" : {"x_axis":0,"y_axis":0}
    });
    expect(result.statusCode).toEqual(400);
  });

  it("POST No device given", async () => {
    const result = await request(app)
    .post("/api/network")
    .send({
        "stations" : [{
            "x_axis":20,
            "y_axis":20,
            "reach":6
            }
        ]
    });
    expect(result.statusCode).toEqual(400);
  });

});
