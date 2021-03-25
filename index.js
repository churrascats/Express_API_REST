const express = require("express");
const path = require("path");
const PORT = require("./config/port");
const logger = require("./middleware/logger");
const exphbs = require("./middleware/handlebars")
const members = require("./Members")

const app = express();

app.engine("handlebars", exphbs({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.get("/", (req, res) => res.render("index", {title: "Members", members}))
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);
app.use("/api/members", require("./routes/api/member"));

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
