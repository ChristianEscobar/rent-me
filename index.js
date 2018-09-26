const app = require("./server");

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});