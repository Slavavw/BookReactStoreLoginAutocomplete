const React = require("react");
const { Link } = require("react-router");
const { connect } = require("react-redux");

class Checkout extends React.Component {
  render() {
    let { count = 0, books, selectedBook } = this.props;
    return <div>
      <h1>Invoice</h1>
      <table className="table table-bordered">
        <tbody>
          {Object.keys(selectedBook).map(item => {
            count += selectedBook[item];
            return <tr key={item}>
              <td>{books[item].title}</td>
              <td>{selectedBook[item]}</td>
            </tr>
          })}
        </tbody>
      </table>
      <p>Total: {count}</p>
    </div>
  }
}

module.exports = connect(
  ({ reactBook }) => (
    { books: reactBook.books, selectedBook: reactBook.selectedBook }
  ), {}
)(Checkout);