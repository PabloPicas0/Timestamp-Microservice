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
  const unixRegex = /^\d{13}/g;

  // Check if user inserted unix date
  // If yes show unix date
  if (unixRegex.test(unix)) {
    const unixTimestamp = Number(unix);
    const date = new Date(unixTimestamp).toUTCString();
    return res.json({ unix: unixTimestamp, utc: date });
  }

  const dateParam = new Date(unix);

  // Check if user inserted valid date
  // If not thorw error
  if (dateParam.toString() === "Invalid Date") {
    return res.json({ error: dateParam.toString() });
  }

  return res.json({ unix: dateParam.getTime(), utc: dateParam.toUTCString() });
});

app.get("/api/", (req, res) => {
  const date = new Date();
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// Request listener
const port = process.env.PORT || 3000;
const listener = app.listen(port, () => {
  console.log(`Your app is listening to path localhost:${listener.address().port}`);
  console.log("Press ctrl + c to stop");
});
