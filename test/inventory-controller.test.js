const request = require("supertest");
const store = require("../constant");
const app = require("../app");

describe("Inventory API Endpoints", () => {
  let userId = 1;
  let id = 0;

  test("POST /inventory/inventories - Create a new inventory", async () => {
    const inventoryData = {
      price: "15",
      productName: "Product B",
      userId: userId,
      quantity: 15,
    };

    const response = await request(app)
      .post("/inventory/inventories")
      .send(inventoryData);

    id = response.body.data.productId;

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
  });

  test("GET /inventory/getinventories - Get inventories", async () => {
    const response = await request(app).get(`/inventory/getinventories`).send();

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("GET /inventory/getinventory - Get inventory", async () => {
    const response = await request(app)
      .get(`/inventory/getinventory/${id}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("DELETE /inventory/deleteInventory - Delete inventory", async () => {
    const response = await request(app)
      .delete(`/inventory/deleteInventory/${id}`)
      .send();

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
