const server = require("./src/app");
const PORT =  process.env.PORT

server.listen(PORT , () => {
  console.log(
    `your application runing! check here 🔥  => http://localhost:${PORT}`
  );
});
