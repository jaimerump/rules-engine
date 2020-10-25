const SINGLE_COMPARISON = {
  "type": "comparison",
  "path": "key",
  "operator": "=",
  "target_value": 1
};

const SINGLE_CONJUNCTION = {
  "type": "conjunction",
  "operator": "AND",
  "evaluatables": [{
    "type": "comparison",
    "path": "key1",
    "operator": "=",
    "target_value": 1 
  }, {
    "type": "comparison",
    "path": "key2", 
    "operator": "=",
    "target_value": 2
  }]
};

module.exports = {
  SINGLE_COMPARISON,
  SINGLE_CONJUNCTION
};