const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Request listener
const port = process.env.PORT || 3000;
const listener = app.listen(port, () => {
  console.log(`Your app is listening to path localhost:${listener.address().port}`);
  console.log("Press ctrl + c to stop")
});
