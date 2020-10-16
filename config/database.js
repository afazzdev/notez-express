if (process.env.NODE_ENV === 'development') {
  require("dotenv").config({
    path: __dirname + "/../.env",
  });
}

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE_NAME,
    "dialect": "postgres",
  },
  "production": {
    use_env_variable: "DATABASE_URL",
  },
};
