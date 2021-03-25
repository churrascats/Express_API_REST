const express = require("express");
const path = require("path");
const PORT = require("./config/port")
const logger = require("./middleware/logger");

const app = express();

app.use(logger);
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/members", require("./routes/api/member"))

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
