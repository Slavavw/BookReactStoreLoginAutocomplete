import React from "react";
import generatePassword from "./password.jsx";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      strength: {},
      password: "",
      visible: false,
      ok: false
    }
    this.generatePassword = this.generatePassword.bind(this);
    this.checkStrength = this.checkStrength.bind(this);
    this.visiblePassword = this.visiblePassword.bind(this);
  }
  checkStrength(event) {
    let password = event.target.value;
    let { rules } = this.props;
    let strength = {};
    Object.keys(rules).forEach(key => {
      let { pattern } = rules[key];
      if (pattern.test(password)) strength[key] = true;
    })
    this.setState({ password, strength }, () => {
      this.setState({
        ok: (Object.keys(strength).length === Object.keys(rules).length)
      })
    });
  }
  visiblePassword() {
    this.setState({ visible: !this.state.visible })
  }
  generatePassword() {
    this.setState({ password: generatePassword() }, () => {
      this.checkStrength({ target: { value: this.state.password } });
    })
  }
  render() {
    let { rules } = this.props;
    let passwordRules = Object.keys(rules).map(key => {
      return {
        key: key,
        rule: rules[key].rule,
        isCompleted: this.state.strength[key] || false
      }
    })
    return (
      <div className="well form-group col-md-6">
        <label>Password</label>
        <PasswordInput
          onChange={this.checkStrength}
          value={this.state.password}
          visible={this.state.visible}
          name="password"
        />
        <PasswordVisibility
          checked={this.state.visible}
          onChange={this.visiblePassword}
        />
        <PasswordInfo
          rules={passwordRules}
        />
        <PasswordGenerate onClick={this.generatePassword}>Generate password</PasswordGenerate>
        <button className={`btn btn-primary (this.state.ok?"",disabled`}>Save</button>
      </div>
    )
  }
}

function PasswordInput({ onChange, value, visible, name }) {
  return (
    <input className="form-control"
      type={(visible ? "text" : "password")}
      value={value}
      onChange={onChange}
      name={name}
    />
  )
}

function PasswordVisibility({ checked, onChange = f => f }) {
  return <label className="form-control">
    <input className="" type={"checkbox"} checked={checked} onChange={onChange} />  Show password
  </label>
}

function PasswordInfo({ rules }) {
  return <div>
    <h4>Password strength</h4>
    <ul>
      {rules.map((rule, index) => (
        <li key={rule.key}>
          {rule.isCompleted ? <del>{rule.rule}</del> : rule.rule}
        </li>)
      )}
    </ul>
  </div>
}

function PasswordGenerate(props) {
  return (
    <button className="btn generate-btn" onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export { Login }