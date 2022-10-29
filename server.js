const mongoose = require("mongoose");
const app = require("./app");
require("colors");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then((db) =>
    console.log(
      `MongoDb is connected on host ${db.connection.host}, on port ${db.connection.port}, db name ${db.connection.name}`
        .red.bold
    )
  )
  .then(() => app.listen(PORT))
  .catch((error) => {
    console.log(error.message.cyan);
    process.exit(1);
  });
