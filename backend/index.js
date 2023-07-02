import app from "./server.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 8000; // Set the port number

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
