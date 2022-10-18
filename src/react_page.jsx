const React = require("react");
const {
  Router,
  Route,
  hashHistory,
  IndexRoute } = require("react-router");

const StartPage = require("./startPage.jsx");
const Index = require("./index.jsx");
const ChooseBook = require("./chooseBook.jsx");
const CartReducer = require("./cartReducer.jsx");
const Checkout = require("./checkout.jsx");

const { Provider } = require("react-redux");
const { createStore } = require("redux");


const { combineReducers } = require("redux"); //для объединения нескольких редюсеров, каждый из которых может изменять свои состояния
//можно в последующем создать еще редюсер с какими-то состояниями и потом через combineReducers подключить в хранилище и его
const reactBook = require("./reducer.jsx").reducer;
const combineReducerStore = combineReducers({ reactBook });

module.exports = function AppRouter() {
  return (
    <Provider store={createStore(combineReducerStore)}>
      <Router history={hashHistory}>
        <Route path="/" component={StartPage}>
          <IndexRoute component={Index} />
          <Route path="react/:id" component={ChooseBook}></Route>
        </Route>
        <Route path="/cart" component={CartReducer} />
        <Route path="/checkout" component={Checkout} />
      </Router>
    </Provider>
  )
}

