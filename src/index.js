module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const exceptions = [];
  const bracketsData = bracketsConfig.reduce((acc, item) =>{
    const [openedBracket, closedBracket] = item;
    if (openedBracket === closedBracket) {
      exceptions.push(openedBracket);
      return acc;
    }
    acc[closedBracket] = openedBracket;
    return acc;
  }, {});
  const openedBrackets = Object.values(bracketsData);
  const closedBrackets = Object.keys(bracketsData);
  for (let symbol of str.split('')) {
    if (openedBrackets.includes(symbol)) {
      stack.push(symbol);
    }
    if (closedBrackets.includes(symbol)) {
      if (stack[stack.length - 1] === bracketsData[symbol]) {
        stack.pop();
      } else {
        return false;
      }
    }
    if (exceptions.includes(symbol)) {
      if (stack[stack.length - 1] === symbol) {
        stack.pop();
      } else {
        stack.push(symbol);
      }
    }
  }
  if (stack.length !== 0) {
    return false;
  }
  return true;
}
