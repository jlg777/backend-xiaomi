import { MongoClient } from "mongodb";

async function listDatabases() {
  const uri = "mongodb://localhost:27018"; 
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const databasesList = await client.db().admin().listDatabases();

    console.log("Bases de datos:");
    databasesList.databases.forEach((db) => {
      console.log(` - ${db.name}`);
    });
  } catch (err) {
    console.error("Error listando bases:", err);
  } finally {
    await client.close();
  }
}

listDatabases();
