const request = require("supertest");

const server = require("./server.js");

describe("server.js", function() {
  describe("environment", function() {
    it("should set environment to testing", function() {
      expect(process.env.DB_ENV).toBe("testing");
    });
  });

  describe("GET /", function() {
    it("should return a 200 OK", function() {
      // spin up the server
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
        });
      // make GET request to /
      // look at the http status code for the response
    });

    it("should return a JSON", function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });

    it("should return {status: 'It's alive!'}", function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.body.status).toBe("It's alive!");
        });
    });

  });
});
