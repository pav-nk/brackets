module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const bracketsData = bracketsConfig.reduce((acc, item) =>{
    const [openedBracket, closedBracket] = item;
    acc[closedBracket] = openedBracket;
    return acc;
  }, {});
  const openedBrackets = bracketsConfig.map((brackets) => brackets[0]);
  const closedBrackets = bracketsConfig.map((brackets) => brackets[1]);
  for (let bracket of str.split('')) {
    if (openedBrackets.includes(bracket)) {
      stack.push(bracket);
    }
    if (closedBrackets.includes(bracket)) {
      if (stack[stack.length - 1] === bracketsData[bracket]) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  if (stack.length !== 0) {
    return false;
  }
  return true;
}
