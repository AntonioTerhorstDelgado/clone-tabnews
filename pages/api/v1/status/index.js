import database from "infra/database.js";
import { version } from "react";

async function status(request, response) {
  const updadedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResunlt = await database.query(
    "Show max_connections;",
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResunlt.rows[0].max_conncections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenConnectioResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const databaseOpenConnectioValue =
    await databaseOpenConnectioResult.rows[0].count;

  response.status(200).json({
    updaded_at: updadedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_conncections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseOpenConnectioValue,
      },
    },
  });
}

export default status;
