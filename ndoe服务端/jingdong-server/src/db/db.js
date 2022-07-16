/**
 * @description mongoose 连接数据库
 * @author huangjiahan
 */
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017"; //本地默认的mongodb服务地址
const dbName = "jingdong"; //数据库名称

//开始连接
mongoose.connect(`${url}/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//连接对象
const db = mongoose.connection;
db.on("error", (err) => {
  console.error("mongoose connect error", err);
});
// db.once("open", () => {
//   console.log("mongoose连接成功");
// });
module.exports = mongoose;
