// Creates a random string of 4 letters/numbers to create a unique ID for each saved note

module.exports = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
