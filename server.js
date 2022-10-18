require("@babel/register");
/*require("@babel/core").transformSync("code", {
  presets: ["@babel/preset-es2015"]
});*/
//!подключаем компиляцию на ходу из JSX в JS React
//!для импортирования JSX после установки babel-register и babel-preset-react из npm:
const path = require("path");

const fs = require("fs");
const html_path = path.join(__dirname, "public", "index.html");

const express = require('express');
const app = express();
const { engine } = require('express-handlebars');

const bodyParser = require("body-parser");
const ReactDOMServer = require("react-dom/server");
const React = require("react");
const PORT = 5500;
const hostname = "127.0.0.1";
const http = require("http");
const mime = require("mime");

const Autocomplete = React.createFactory(require("./src/autocomplete.jsx"));
//**************************************************************************/
//TODO Блок 2!!
//Определение REST-совместимых API. GET- и POST-маршруты для /rooms.
//**************************************************************************/
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())//!Обеспечивает разбор входных данных в формате JSON

app.use(express.static(path.join(__dirname, '/public')));//!На стороне сервера мы открываем доступ к статическим файлам, которые находятся в папке public
//!таким образом мы загружаем статически файлы внутри этой папки. в ней находятся файлы вебпака бандлы и стилевые css, т.е. при начальной загрузке страницы у пользователя, сервера ему быстро вернет страницу с подгруженными данными файлами

app.set('view engine', 'hbs'); //!применяем шаблонизатор Handlebars (.hbs) 

app.use((req, res, next) => {
  req.rooms = require("./rooms.json");
  return next();
})

//todo: Блок 3 рендеринг на стороне севера
app.get("/", (req, res, next) => {
  let mime_type = mime.getType(req.url);
  let url = `http://${hostname}:${PORT}/rooms`;
  console.log("app.get(/", req.rooms);
  console.log("app.get(/", url);
  res.render("index", {
    autocomplete: ReactDOMServer.renderToString(Autocomplete({
      options: req.rooms,
      url: url
    })),
    data: `<script type ="text/javascript">
      window.__autocomplete__data={
        rooms:${JSON.stringify(req.rooms, null, 2)},
        url:"${url}"
      }
      </script> `
  },
    (err, html_text) => {
      if (err) console.error(err);
      console.log(mime_type);
      res.writeHead(200, { "content-type": mime_type });
      console.log(Buffer.from(html_text).toString());
      res.write(Buffer.from(html_text));
      res.end();
    })
});

//todo Блок2! REST запросы обработка оветов get post
app.get("/rooms", (req, res, next) => {
  return res.json(req.rooms);
})
app.post("/rooms", (req, res, next) => {
  console.log("***************************************");
  console.log("body", req.body);
  console.log("***************************************");
  req.rooms.push(req.body);
  console.log("rooms:", req.rooms);
  console.log("***************************************");
  return res.json(req.rooms);
})

app.get("/react", (req, res, next) => {
  console.log("============react===================");
  var url = `http://${hostname}:${PORT}/react`;
  const book_store = require("./book_store.json");
  console.log(book_store);
  return res.json(book_store);
})
//**************************************************************************/
app.listen(PORT, hostname, () => { console.log(`Server started at http://${hostname}:${PORT}`) });

/*const server = http.createServer(app);
server.listen(PORT, hostname, () => console.log(`Сервер запущен по адреcу: http://${hostname}:${PORT}`));*/

/*







  let template = {
    autocomplete: ReactDOMServer.renderToString(Autocomplete({
      options: req.rooms,
      url: url
    })),
    data: `<script type ="text/javascript">
    window.__autocomplete__data={
      rooms:${JSON.stringify(req.rooms, null, 2)},
      url:"${url}"
    }
    </script> `
  };
  console.log("mime_type:", mime_type);
  const streamRead = fs.createReadStream(html_path);
  var dataBuffer = [];
  streamRead.on("data", chunk => {
    dataBuffer = dataBuffer.concat(...chunk);
  });
  streamRead.on("error", err => {
    if (err.code === "ENOENT") {
      res.writeHead(404, {
        "content-type": "text/html; chatset=utf-8"
      });
      res.end("Not Found");
    }
    else {
      res.statusCode = 500;
      res.end("Internet Server Error");
    }
    console.log(err);
  });
  streamRead.on("end", () => {
    console.log(dataBuffer.toLocaleString());
    dataBuffer = dataBuffer.toLocaleString().replace(/{{{data}}}/, template.data).replace(/{{{autocomplete}}}/, template.autocomplete);
    console.log(dataBuffer);
    res.writeHead(200, { "content-type": mime_type });
    //console.log(Buffer.from(dataBuffer).toString());
    res.write(Buffer.from(dataBuffer));
    res.end();
  });
*/