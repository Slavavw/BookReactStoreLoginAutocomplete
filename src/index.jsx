const React = require("react");
const { connect } = require("react-redux");
const { Link } = require("react-router");
const axios = require('axios').default;
const { fetchReactBooks, fetchReactBook } = require("./reducer.jsx");

const Copy = () => {
  return <p>Please click on a book to view details in a modal. You can
    copy/paste the link of the modal. The link will open the book on a
    separate page.</p>
}

class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log("получение книг реакт");
    axios.get(this.props.url).
      then(response => response.data)
      .then(this.props.fetchReactBooks)
      .catch(console.error);
  }
  render() {
    let books = this.props.books || [];
    return (
      <div>
        <Copy />
        <p><Link to="/cart" className="btn btn-danger">Cart</Link></p>
        <div>
          {books.map(book => (
            <Link key={book.id}
              to={{
                pathname: `/react/${book.id}`,
                state: { isModal: true, returnTo: this.props.location.pathname }
              }}
              onClick={(event) => { this.props.fetchReactBook(book.id) }}
            >
              <img src={book.src} height="100" style={{ margin: 0 }} />
            </Link>
          ))}
        </div>
      </div>
    )
  }
}

module.exports = connect(
  ({ reactBook }) => ({ books: reactBook.books, url: reactBook.url })
  ,
  {
    fetchReactBooks: fetchReactBooks,
    fetchReactBook: fetchReactBook
  }
)(Index);