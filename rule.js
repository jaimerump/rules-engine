const at = require('lodash.at');
const isEqual = require("lodash.isEqual");

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

    switch(this.comparison) {
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

      case '!=':
      case 'ne':
        if (typeof this.target_value == 'object') {
          return !isEqual(this.getDatum(candidate), this.target_value);
        } else {
          return this.getDatum(candidate) !== this.target_value;
        }
        
      
      case '=':
      case 'eq':
      default:
        if (typeof this.target_value == 'object') {
          return isEqual(this.getDatum(candidate), this.target_value);
        } else {
          return this.getDatum(candidate) === this.target_value;
        }
          
    }

  }

  /**
   * Gets the datum to be compared from this.path in the candidate
   * @param {Object} candidate
   * @returns {Any} 
   */
  getDatum(candidate) {
    return candidate[ this.path ];
    // At returns array, we want single value
    // return at(candidate, [this.path])[0];
  }

}

module.exports = Rule;