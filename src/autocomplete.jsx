const React = require("react");
const axios = require("axios").default;
const ReactDOM = require("react-dom");
const ReactBooksPage = require("./react_page.jsx");
const { Login } = require("./login.jsx");

const rules = require("./password_rules.jsx");

class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.filter = this.filter.bind(this);
    this.addOption = this.addOption.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      options: this.props.options,
      filteredOptions: this.props.options,
      currentOption: ""
    }
    this.fetchReact = this.fetchReact.bind(this);
  }
  componentDidMount() {
    if (this.props.url === 'test') return true; //если отрабатывает тест jest рендерится компонент в тестере и чтобы не обращаться с запросом к серверу
    console.log("client");
    axios.get(this.props.url || 'http://127.0.0.1:5500/rooms')
      .then(response => response.data)
      .then(data => {
        if (!data) console.error('Faild to load')
        else {
          this.setState({
            options: data,
            filteredOptions: data,
            currentOption: ""
          }, () => {
            window.__autocomplete__data = {
              rooms: data,
              url: 'http://127.0.0.1:5500/rooms'
            }
          })
        }
      }).
      catch(console.error)
  }
  filter(event) {
    this.setState({
      currentOption: event.target.value,
      filteredOptions: this.state.options.filter((option, index, list) => {
        return (event.target.value === option.name.substr(0, event.target.value.length))
      })
    })
  }
  addOption(event) {
    let currentOption = this.state.currentOption
    // Send a POST request
    axios.post(this.props.url || 'http://127.0.0.1:5500/rooms', { name: currentOption })
      .then(response => response.data)
      .then(body => {
        if (!body) return console.error('Faild to save');
        this.setState(
          {
            options: [...body]
          },
          () => {
            this.filter({ target: { value: currentOption } })
          }
        )
      }).
      catch(error => console.error('Faild to save'))
  }
  fetchReact() {
    ReactDOM.render(<ReactBooksPage />, document.querySelector(".container-fluid"))
  }
  login() {
    ReactDOM.render(<Login rules={rules} />, document.querySelector(".container-fluid"))
  }
  render() {
    if (!this.state.options) return null;
    return (
      <div className="form-group" style={{
        "display": "flex", "justifyContent": "center",
        "flexFlow": "column", "gap": "10"
      }}>
        <div className="wrapper-flex">
          <input type="text"
            onKeyUp={(event) => (event.keyCode == 13) ? this.addOption() : ''}
            className="form-control option-name"
            onChange={this.filter}
            value={this.currentOption}
            placeholder="React.js"
          />
          <a className="btn btn-info option-add"
            onClick={this.login}>
            login
          </a>
        </div>
        <div className="wrapper-flex">
          {this.state.filteredOptions.map((option, index) => (
            <div key={index}>
              <a className="btn btn-default option-list-item"
                href={`/#/${option.name}`}
                onClick={
                  (event) => {
                    console.log(event);
                    if (!index) this.fetchReact()
                  }
                }
              >
                #{option.name}
              </a>
            </div>)
          )}
        </div>
        {
          (!this.state.filteredOptions.length && this.state.currentOption !== "") ?
            (
              <a className="btn btn-info option-add"
                onClick={this.addOption}>
                Add #{this.state.currentOption}
              </a>
            ) :
            null
        }
      </div>
    )
  }
}

module.exports = Autocomplete;