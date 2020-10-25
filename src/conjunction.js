const Evaluatable = require("./evaluatable");

/**
 * This class evaluates a set of evaluatable objects
 */
class Conjunction extends Evaluatable {

  /**
   * 
   * @param {String} operator "OR" or "AND"
   * @param {Array<Evaluatable>} evaluatables 
   */
  constructor(operator, evaluatables) {
    super();
    this.operator = operator;
    this.evaluatables = evaluatables;
  }

  /**
   * Evaluates the given object against the rule set
   * @param {Object} candidate 
   * @returns {Boolean}
   */
  evaluate(candidate) {

    if( this.operator === 'AND' ) {
      // All must be true, so look for the first failing one
      let failing_rule = this.evaluatables.find(rule => !rule.evaluate(candidate));
      return failing_rule ? false : true;
    } else if( this.operator === 'OR' ) {
      // Only one must be true, so look for first passing one
      let passing_rule = this.evaluatables.find(rule => rule.evaluate(candidate));
      return passing_rule ? true : false;
    }

  }

}

module.exports = Conjunction;