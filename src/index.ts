import { Server } from "./server";

let server = new Server().app;
let port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
