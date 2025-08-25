import app from "./app.js"
import errorHandler from "./middlewares/errorHandler.js";
import connectDB from "./utils/db.js";
const PORT = 3000;

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Server is up and running on http://localhost:${PORT}`)
  )
  
  app.use(errorHandler);
});
