const React = require("react");
const { connect } = require("react-redux");
const { Link } = require("react-router");
const { addBookToStore } = require("./reducer.jsx");

class ChooseBook extends React.Component {
  render() {
    const book = this.props.book;
    return (
      <div>
        <img src={book.src}
          style={{ height: '80%' }} />
        <p>{book.title}</p>
        <Link
          to="/cart"
          onClick={() => this.props.addBookToStore(book.id)}
          className="btn btn-primary">
          Buy
        </Link>
      </div>
    )
  }
}

module.exports = connect(
  ({ reactBook }) => ({ book: reactBook.book }),
  { addBookToStore: addBookToStore }
)(ChooseBook);