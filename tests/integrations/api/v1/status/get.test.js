test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responsedBody = await response.json();

  const parsedUpdateAt = new Date(responsedBody.updaded_at).toISOString();
  expect(responsedBody.updaded_at).toEqual(parsedUpdateAt);

  expect(responsedBody.dependecies.database.version).toEqual("16.0");
  expect(responsedBody.dependecies.database.max_connections).toEqual(100);
  expect(responsedBody.dependecies.database.opened_connection).toEqual(1);
});
