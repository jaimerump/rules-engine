const { at } = require('lodash.at');

/**
 * This class evaluates a single rule
 */
class Rule {

  /**
   * 
   * @param {String} path The path of the data to dig out of the object
   * @param {String} comparison The comparison to run
   * @param {Any} target_value The target value to compare to
   */
  constructor(path, comparison, target_value) {
    this.path = path;
    this.comparison = comparison;
    this.target_value = target_value;
  }

  /**
   * Evaluates the given object against the rule
   * @param {Object} candidate 
   * @returns {Boolean}
   */
  evaluate(candidate) {

    switch(this.operator) {
      case '>':
      case 'gt':
        break;

      case '>=':
      case 'gte':
        break;

      case '<':
      case 'lt':
        break;

      case '<=':
      case 'lte':
        break;
      
      case '=':
      case 'eq':
      default:
        break;
    }

  }

}

module.exports = Rule;