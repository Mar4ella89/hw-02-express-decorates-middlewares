// console.log("Welcome");
const http = require("http");

const PORT = 8081;

const requestHandler = (request, response) => {
  if (request.url.indexOf("/home") >= 0) {
    response.writeHead(200, { "Content-type": "text/html" });
    return response.end("<h1>Welcome</h1>");
  }
  response.writeHead(200, { "Content-type": "text/html" });
  return response.end("<h1>GodBye</h1>");
};

const server = http.createServer(requestHandler);
server.listen(PORT, (err) => {
  if (err) {
    console.error("Error at server launch", err);
  }
  console.log(`Server works at port ${PORT}`);
});
