import app from "./server.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 8000; // Set the port number

mongoose
  .connect(process.env.FLICKRAPP_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(`${error} did not connect`))
  .then(() => {
    app.listen(port, () => console.log(`Server Port: ${port}`));
  });
