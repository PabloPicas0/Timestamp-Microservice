const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

// Default root path
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:unix", (req, res) => {
  const { unix } = req.params;
  const unixTimestamp = Number(unix);
  const regex = /^\d{13}/g;

  // Check if user inserted date
  if (regex.test(unixTimestamp)) {
    const date = new Date(unixTimestamp).toUTCString();
    res.json({ unix: unixTimestamp, utc: date });
  }
});

app.get("/api/", (req, res) => {
  const date = new Date()
  const timestamp = date.getTime()
  res.json({unix: timestamp, utc: date.toUTCString()})
});

// Request listener
const port = process.env.PORT || 3000;
const listener = app.listen(port, () => {
  console.log(`Your app is listening to path localhost:${listener.address().port}`);
  console.log("Press ctrl + c to stop");
});
