const mongoose = require("mongoose");
const app = require("./app");

const DB_HOST =
  "mongodb+srv://Mar4ella:ktybyuhflcrfz40@cluster0.g1mqafu.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(3000))
  .catch((err) => {
    console.log(err.message);
  });
