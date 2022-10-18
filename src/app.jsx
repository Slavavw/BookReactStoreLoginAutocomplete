//Браузерный сценарий рендеринга компонентов
//!!!он будет выполнятся только на стороне браузера, не сервера
const React = require("react");
const ReactDOM = require("react-dom");
const Autocomplete = require("./autocomplete.jsx");
const { rooms, url } = window.__autocomplete__data || {}; //получаем глобальные данные, которые мы установили при серверном рендере шаблонизатора Handlebars
ReactDOM.render(<Autocomplete options={rooms} url={url} />, document.getElementById("autocomplete"));
