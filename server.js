const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectToDatabase = require("./src/database/mongoose.database");
const UserRouter = require("./src/routes/user.routes");
const NotesRouter = require("./src/routes/notes.routes");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

connectToDatabase();

app.use("/", UserRouter);
app.use("/", NotesRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("listening on port 5000"));
