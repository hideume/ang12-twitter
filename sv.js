const express = require("express");
const app  = express();
const port = 443;

// POSTのクエリーを良い感じに処理する
app.use(express.static('./dist/tw2'));

// ルーティングの設定
/*
app.get("/", (req, res) =>{
  const name = req.body.name;
  res.send(`君の名は ${name}`);
  console.log("/ へアクセスがありました");
});
*/

// HTTPサーバを起動する
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
