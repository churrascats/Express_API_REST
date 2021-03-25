const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");

const app = express();
const PORT = process.env.PORT || 5000;

const members = require("./Members");

app.use(logger);
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/members/", (req, res) => res.json(members));

app.get("/api/members/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});



app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
