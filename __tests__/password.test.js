const generatePassword = require("../src/js/password.js");
const pattern = /^[0-9,A-Z,a-z\!\@\#\$\%\^\&\*\(\)\_\+\{\}\:\"\<\>\?\\|\[\]\/'\,\.\`\~]{8,16}$/;

describe('метод генерации пароля', () => {
  let password, password2;
  it("проверка генерации пароля", () => {
    password = generatePassword();
    expect(password).toMatch(pattern);
    console.log(password);
  })
  it("проверка генерации разных паролей", () => {
    password2 = generatePassword();
    expect(password2).not.toEqual(password);
  })
})