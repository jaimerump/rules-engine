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

    if( this.operator === 'AND' ) {
      // All must be true, so look for the first failing one
      let failing_rule = this.rules.find(rule => !rule.evaluate(candidate));
      return failing_rule ? false : true;
    } else if( this.operator === 'OR' ) {
      // Only one must be true, so look for first passing one
      let passing_rule = this.rules.find(rule => rule.evaluate(candidate));
      return passing_rule ? true : false;
    }

  }

}

module.exports = RuleSet;