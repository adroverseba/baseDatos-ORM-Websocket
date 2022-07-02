//connection string
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

module.exports = { knexProduct };
