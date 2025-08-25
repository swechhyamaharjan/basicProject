import fs from 'fs'

const logger = (req, res, next)=> {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const hour = today.getHours();
  const mins = today.getMinutes();
  const sec = today.getSeconds();
  let start = Date.now(); //To take out time in ms = end - start

  res.on("finish", () => { //This is for res.statusCode
    let end = Date.now();
    let logEvent =  `${year}-${month}-${date}T${hour}:${mins}:${sec} ${req.method} ${req.originalUrl} ${res.statusCode} ${end - start}ms`
    console.log(logEvent);

    fs.appendFile("app.log", logEvent + "\n", (err) => {
      if (err) {
        console.error("Error writing to log file", err.message);
      }
    });
});
  next();
}
export default logger;