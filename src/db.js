require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { RDS_HOSTNAME, RDS_PORT, RDS_DB_NAME, RDS_USERNAME, RDS_PASSWORD } =
  process.env;

const sequelize = new Sequelize(RDS_DB_NAME, RDS_USERNAME, RDS_PASSWORD, {
  host: RDS_HOSTNAME,
  port: RDS_PORT,
  dialect: "postgres",
  logging: false,
  native: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Para evitar errores con certificados autofirmados
    },
  },
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Country, Activity } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Country.belongsToMany(Activity, {
  through: "CountryActivity",
  timestamps: false,
});
Activity.belongsToMany(Country, {
  through: "CountryActivity",
  timestamps: false,
});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importar la conexión { conn } = require('./db.js');
};
