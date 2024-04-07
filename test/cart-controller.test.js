const request = require("supertest");
const store = require("../constant");
const app = require("../app");

describe("Cart API Endpoints", () => {
  let userId = 1;
  let productID = 24;
  let id = 0;

  test("POST /cart/carts - Create a new cart", async () => {
    const cartData = {
      customerID: userId,
      productID: productID,
      quantity: 1,
    };

    const response = await request(app).post("/cart/carts").send(cartData);

    id = response.body.data.id;

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
  });

  test("GET /cart/carts - Get carts", async () => {
    const response = await request(app).get(`/cart/getcart/${userId}`).send();

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("DELETE /cart/deleteCart - Delete carts", async () => {
    const response = await request(app).delete(`/cart/deleteCart/${id}`).send();

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
