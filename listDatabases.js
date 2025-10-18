import { MongoClient } from "mongodb";

async function listDatabasesAndCollections() {
  const uri = "mongodb://localhost:27018";
  const client = new MongoClient(uri);

  try {
    await client.connect();

    // Listar bases de datos
    const databasesList = await client.db().admin().listDatabases();

    console.log("Bases de datos y sus colecciones:");

    // Por cada base, listar colecciones
    for (const dbInfo of databasesList.databases) {
      const db = client.db(dbInfo.name);
      const collections = await db.listCollections().toArray();

      console.log(`\nBase: ${dbInfo.name}`);
      if (collections.length === 0) {
        console.log("  (sin colecciones)");
      } else {
        collections.forEach((col) => {
          console.log(`  - ${col.name}`);
        });
      }
    }
  } catch (err) {
    console.error("Error listando bases o colecciones:", err);
  } finally {
    await client.close();
  }
}

listDatabasesAndCollections();

//https://www.mongodb.com/try/download/community
//Descargá y descomprimí el ZIP en una carpeta de tu elección, por ejemplo:
//C:\MongoDB\
//En la carpeta donde descomprimiste MongoDB, creá estas subcarpetas manualmente:
//C:\MongoDB\bin
//C:\MongoDB\data\db
//C:\MongoDB\logs

//iniciar-mongo.bat
/*Iniciando servidor MongoDB...
{"t":{"$date":"2025-10-17T16:24:39.729-03:00"},"s":"I",  "c":"CONTROL",  "id":20697,   "ctx":"thread1","msg":"Renamed existing log file","attr":{"oldLogPath":"C:\\Users\\jgrandia\\Desktop\\mongodb-win32-x86_64-windows-8.2.1\\logs\\mongod.log","newLogPath":"C:\\Users\\jgrandia\\Desktop\\mongodb-win32-x86_64-windows-8.2.1\\logs\\mongod.log.2025-10-17T19-24-39"}}
*/
