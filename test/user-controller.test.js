// userController.test.js
const request = require("supertest");
const store = require("../constant");
const app = require("../app");
const userModel = require("../models/user-model");

describe("User API Endpoints", () => {
  beforeEach(async () => {
    // Clear the user table before each test to ensure a clean state
    await userModel.destroy({ where: {}, truncate: true });
  });

  test("POST /user/users - Create a new user", async () => {
    const userData = {
      walletBalance: 100,
      status: 1,
    };

    // Make a POST request to create a new user
    const response = await request(app).post("/user/users").send(userData);

    // Assert that the response status code is 201 (Created)
    expect(response.statusCode).toBe(201);

    // Assert that the response body contains the created user data
    expect(response.body.success).toBe(true);
    expect(response.body.data.walletBalance).toBe(userData.walletBalance);
    expect(response.body.data.status).toBe(userData.status);
  });

  // Define a hook to close the server after all tests have run
  afterAll((done) => {
    // Close the server instance
    store.server.close(() => {
      console.log("Server closed");
      done();
    });
  });
});
