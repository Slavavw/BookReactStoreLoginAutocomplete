const React = require("react");
const { connect } = require("react-redux");
const Modal = require("./modalWnd.jsx");

const Header = () => { return (<h1>React book's</h1>) }

class StartPage extends React.Component {
  componentWillUpdate(newProps) {
    this.isModal = newProps.location.state && newProps.location.state.isModal;
    if (this.isModal &&
      this.props.location.key !== newProps.location.key
    ) this.previsualChildren = this.props.children
  }
  render() {
    return (
      <div className="well">
        <Header />
        <div>
          {this.isModal ? this.previsualChildren : this.props.children}
          {this.isModal ?
            <Modal isOpen={true} returnTo={this.props.location.state.returnTo}>
              {this.props.children}
            </Modal> :
            null
          }
        </div>
      </div>
    )
  }
}

module.exports = connect()(StartPage);

