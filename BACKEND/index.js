const express = require("express");
const app = express();
const { sequelize } = require("./models/index");
const { rootRouter } = require("./router/index");
const cors = require("cors");

//cho phép các nguồn khác truy cập vào tài nguyên server
app.use(cors());

//parse data receiver from json to object
app.use(express.json());

app.use("/api/v1", rootRouter);

//cài static file
app.use(express.static("media")); //từ đây ta có thể trỏ vào các folder hoặc file trong media
//cấu hình url để lấy file image mình muốn
app.use("/product", express.static("product"));

app.listen(3000, async () => {
  console.log(`listening http://localhost:3000`);
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
