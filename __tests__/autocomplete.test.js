const rooms = [
  { "_id": "5622eb1f105807ceb6ad868b", "name": "node" },
  { "_id": "5622eb1f105807ceb6ad868c", "name": "react" },
  { "_id": "5622eb1f105807ceb6ad868d", "name": "backbone" },
  { "_id": "5622eb1f105807ceb6ad868e", "name": "angular" }
]

const TestUtils = require("react-dom/test-utils");
const React = require("react");
const Autocomplete = require("../src/autocomplete.jsx");
const findNode = require("react-dom").findDOMNode;
const ReactDOM = require("react-dom");

const autocomplete = TestUtils.renderIntoDocument(
  React.createElement(Autocomplete, { options: rooms, url: "test" })
);

//Получим поле ввода по классу option-name
const optionName = TestUtils.findRenderedDOMComponentWithClass(autocomplete, "option-name");
describe('проверка компонента Autocomplete', () => {
  it('список состоит из 4 элементов', () => {
    var options = TestUtils.scryRenderedDOMComponentsWithClass(
      autocomplete,
      'option-list-item'
    )
    expect(options.length).toBe(4)
  })

  /*Следующий тест изменяет значение поля ввода, после чего проверяет это значение
и количество предлагаемых вариантов автозаполнения. В данном случае совпадение
должно быть только одно, а именно react:*/
  it('проверка ввода символов и поиск подобия  списке', () => {
    expect(findNode(optionName).value).toBe('');
    findNode(optionName).value = 'r';
    TestUtils.Simulate.change(findNode(optionName));
    expect(findNode(optionName).value).toBe('r');
    options = TestUtils.scryRenderedDOMComponentsWithClass(autocomplete, 'option-list-item');
    expect(options.length).toBe(1);
    expect(findNode(options[0]).textContent).toBe("#react")
  })

  /*В последнем тесте название комнаты заменяется на ember. Совпадений быть не
должно, только кнопка Add*/
  it('offer to save option when there are no matched', () => {
    findNode(optionName).value = 'ember';
    TestUtils.Simulate.change(findNode(optionName));
    options = TestUtils.scryRenderedDOMComponentsWithClass(autocomplete, 'option-list-item');
    expect(options.length).toBe(0);
    var optionAdd = TestUtils.findRenderedDOMComponentWithClass(autocomplete, 'option-add')
    expect(findNode(optionAdd).textContent).toBe("Add #ember")
  })
})