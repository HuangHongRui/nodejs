// eslint-disable-next-line import/no-extraneous-dependencies
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: `${__dirname}/config.env` });
const port = process.env.PORT || 3000;
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB, {}).then((con) => {
  // console.log(con.connections);
  console.log("Connect is successful.");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
