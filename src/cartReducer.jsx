const React = require("react");
const { Link } = require("react-router");
const { connect } = require("react-redux");

class Cart extends React.Component {
  render() {
    let selectedBook = this.props.selectedBook;
    let books = this.props.books;
    return (
      <div>
        {(Object.keys(selectedBook).length == 0) ?
          <p>Your cart is empty</p> : ''
        }
        <ul>
          {Object.keys(selectedBook).map(item => {
            return <li key={item}>
              {books[item].title} - {selectedBook[item]}
            </li>
          })}
        </ul>
        <Link to="/checkout" className="btn btn-primary">Checkout</Link>
        <Link to="/" className="btn btn-info">Home</Link>
      </div>
    )
  }
}

module.exports = connect(
  ({ reactBook }) => (
    {
      books: reactBook.books,
      selectedBook: reactBook.selectedBook
    }
  ))(Cart);