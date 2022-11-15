import app from "./server";
import config from "./config";

console.log("here");
app.listen(config.port, () => {
  console.log(`hello on http://localhost:${config.port}`);
});
