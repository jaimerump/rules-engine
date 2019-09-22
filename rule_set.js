/**
 * This class evaluates a set of rules
 */
class RuleSet {

  /**
   * 
   * @param {String} operator "OR" or "AND"
   * @param {Array<Rule>} rules 
   */
  constructor(operator, rules) {
    this.operator = operator;
    this.rules = rules;
  }

  /**
   * Evaluates the given object against the rule set
   * @param {Object} candidate 
   * @returns {Boolean}
   */
  evaluate(candidate) {

  }

}

module.exports = RuleSet;