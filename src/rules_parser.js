/**
 * This file parses the json representation of rules into rule objects
 */

const Conjunction = require("./conjunction");
const Comparison = require("./comparison");

class RulesParser {

  static parse(json) {
    if(json.type.toLowerCase() == "conjunction") {
      return new Conjunction(
        json.operator,
        json.evaluatables.map(RulesParser.parse)
      );
    } else {
      return new Comparison(
        json.path,
        json.operator,
        json.target_value
      );
    }
  }

};

module.exports = RulesParser;