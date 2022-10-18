const React = require("react");
const { Link } = require("react-router");

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.style = {
      position: "fixed",
      top: "20%", right: "20%", bottom: "20%", left: "20%",
      width: "450", height: "450px", padding: "20",
      boxShadow: "0px 0px 150px 130px rgba(0,0,0,.5)",
      background: "#ffff",
      overflow: "auto"
    }
  }
  render() {
    return (
      <div style={this.style}>
        <p>
          <Link to={this.props.returnTo}>Back</Link>
        </p>
        {this.props.children}
      </div>
    )
  }
}

module.exports = Modal;