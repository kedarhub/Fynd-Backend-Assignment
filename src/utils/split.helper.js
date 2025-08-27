function equalSplit(amount, users) {
  const share = amount / users.length;
  return users.reduce((acc, u) => ({ ...acc, [u]: share }), {});
}

function exactSplit(amounts) {
  return amounts; // already provided
}

function percentageSplit(amount, percentages) {
  let result = {};
  for (const user in percentages) {
    result[user] = (amount * percentages[user]) / 100;
  }
  return result;
}

module.exports = { equalSplit, exactSplit, percentageSplit };
