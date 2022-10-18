module.exports = {
  upperCase: {
    "rule": "Must have at least one upper-case character",
    "pattern": /([A-Z]+)/
  },
  lowerCase: {
    "rule": "Must have at least one lower-case character",
    "pattern": /([a-z]+)/
  },
  special: {
    "rule": "Must have at least one special character",
    "pattern": /([\!\@\#\$\%\^\&\*\(\)\_\+\{\}\:\<\>\?\\|\[\]\/'\,\.\`\~]+)/
  },
  number: {
    "rule": "Must have at least one number",
    "pattern": /([0-9]+)/
  },
  over6: {
    "rule": "Must be more then 6 characters",
    "pattern": /(.{6,})/
  }
}