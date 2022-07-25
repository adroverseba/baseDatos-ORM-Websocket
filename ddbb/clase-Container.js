// class Container {
//   constructor(knex, table) {
//     this.knex = knex;
//     this.table = table;
//     this.knex.schema.hasTable(this.table).then((exists) => {
//       if (!exists) {
//         this.knex.schema
//           .createTable(this.table, (table) => {
//             table.increments("id").primary();
//             table.string("title", 30).notNullable();
//             table.float("price");
//             table.string("thumbnail");
//           })
//           .then(() => console.log("Tabla de productos creada"))
//           .catch((err) => {
//             console.log(err);
//             throw err;
//           });
//       }
//     });
//   }

//   async save(objeto) {
//     this.knex(this.table)
//       .insert(objeto)
//       .then((art) => art)
//       .catch((err) => {
//         console.log(err);
//         throw err;
//       });
//   }

//   async getAll() {
//     try {
//       let arrProd = await this.knex(this.table).select("*");
//       console.log(arrProd);
//       return arrProd;
//     } catch (err) {
//       console.log(err);
//       throw err;
//     }
//   }
// }

// module.exports = Container;

const { faker } = require("@faker-js/faker");
class Container {
  constructor() {
    this.products = [];
    this.generate();
  }
  generate() {
    const limit = 5;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.number({ min: 1, max: 10 }),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        thumbnail: `https://picsum.photos/id/${faker.datatype.number({
          min: 1,
          max: 300,
        })}/600`,
      });
    }
  }

  getAll() {
    return this.products;
  }

  save(objeto) {
    const product = {
      id: faker.datatype.number({ min: 1, max: 50 }),
      ...objeto,
    };
    this.products.push(product);
  }
}
module.exports = Container;
