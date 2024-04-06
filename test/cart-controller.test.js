const request = require("supertest");
const store = require("../constant");
const app = require("../app");
const Cart = require("../models/cart");

describe("Cart API Endpoints", () => {
  beforeEach(async () => {
    await Cart.destroy({ where: {}, truncate: true });
  });

  let userId = 1;
  let cartId = 1;

  test("POST /cart/carts - Create a new cart", async () => {
    const cartData = {
      customerID: 1,
      productID: 1,
      quantity: 1,
    };

    const response = await request(app).post("/cart/carts").send(cartData);

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
  });

  test("GET /cart/carts - Get carts", async () => {
    const response = await request(app).get(`/cart/getcart/${userId}`).send();

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("DELETE /cart/deleteCart - Delete carts", async () => {
    const response = await request(app)
      .delete(`/cart/deleteCart/${cartId}`)
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
