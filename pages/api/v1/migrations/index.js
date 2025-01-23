import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";
import { error } from "node:console";

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method)) {
    return response.status(405).json({
      error: `Method:"${request.method}"not allowed`,
    });
  }

  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const defaulMigrationOptions = {
      dbClient: dbClient,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };
    if (request.method == "GET") {
      const pendingMigrations = await migrationRunner(defaulMigrationOptions);

      return response.status(200).json(pendingMigrations);
    }

    if (request.method == "POST") {
      const migratedMigrations = await migrationRunner({
        ...defaulMigrationOptions,
        dryRun: false,
      });

      if (migratedMigrations.length > 0) {
        return response.status(200).json(migratedMigrations);
      }
      return response.status(200).json(migratedMigrations);
    }
  } catch (error) {
    throw error;
  } finally {
    await dbClient.end();
  }
}
