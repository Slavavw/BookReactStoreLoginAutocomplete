const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = 'development';
if (process.env.NODE_ENV === 'production') mode = 'production';
console.log(mode);

module.exports = {
  mode: mode,
  devtool: mode === 'development' ? "inline-source-map" : "none",
  devtool: "source-map",
  /*entry: {
    index: [
      'babel-polyfill', //Применяет polyfill для полной эмуляции среды ES2015  
      '/src/app.jsx' //Задает точку входа (не обязана быть файлом *.jsx)  
    ]
  },*/
  entry: "/src/app.jsx",
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'app.js'
  },
  target: 'web',
  module: {
    rules: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.jsx$|\.js$/,
        options: {
          presets: ["@babel/preset-react"]
        }
      },
      {
        loader: 'json-loader',
        test: /\.json$/
      },
      /*{
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },*/
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [MiniCssExtractPlugin.loader,
          //для development  стили будут встраиваться в папку head  нашего index.html (отрабатывает style-loader)
          //для production будет создаваться файл стилей отрабатывает лоудер MiniCssExtractPlugin.loader
          'css-loader', // 
          'postcss-loader', //должно добавлять префиксы стилей под разные браузеры         
        ]
      }
    ]
  },
  plugins: [
    //new HTMLWebpackPlugin({ template: "./views/index.hbs", inject: true, title: 'NewPage' }),
    new MiniCssExtractPlugin({ filename: 'style.css' })
  ]
}