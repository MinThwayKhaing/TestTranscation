const request = require("supertest");
const store = require("../constant");
const app = require("../app");
const Inventory = require("../models/inventory");

describe("Inventory API Endpoints", () => {
  beforeEach(async () => {
    await Inventory.destroy({ where: {}, truncate: true });
  });

  test("POST /inventory/inventories - Create a new inventory", async () => {
    const inventoryData = {
      price: "15",
      productName: "Product B",
      userId: 1,
      quantity: 15,
    };

    const response = await request(app)
      .post("/inventory/inventories")
      .send(inventoryData);

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
  });

  test("GET /inventory/getinventory - Get inventory", async () => {
    const response = await request(app).get(`/inventory/getinventory/1`).send();

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  afterAll((done) => {
    store.server.close(() => {
      console.log("Server closed");
      done();
    });
  });
});
