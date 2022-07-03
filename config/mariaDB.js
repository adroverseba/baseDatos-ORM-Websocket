//connection string + knex
const knexProduct = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    port: 4306,
    user: "root",
    password: "",
    database: "ecommerce",
  },
  pool: { min: 0, max: 7 },
});

const knexMessage = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./ddbb/messages.sqlite",
  },
  useNullAsDefault: true,
});

module.exports = { knexProduct, knexMessage };
