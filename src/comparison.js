const at = require('lodash.at');
const isEqual = require("lodash.isEqual");

/**
 * This class evaluates a single comparison
 */
class Comparison {

  /**
   * 
   * @param {String} path The path of the data to dig out of the object
   * @param {String} operator The comparison to run
   * @param {Any} target_value The target value to compare to
   */
  constructor(path, operator, target_value) {
    this.path = path;
    this.operator = operator;
    this.target_value = target_value;
  }

  /**
   * Evaluates the given object against the Comparison
   * @param {Object} candidate 
   * @returns {Boolean}
   */
  evaluate(candidate) {

    const datum = this.getDatum(candidate);

    switch(this.operator) {
      
      /* Arithmetic operators */

      case '>':
      case 'gt':
        if( ['string', 'number'].includes(typeof datum) ) {
          return datum > this.target_value;
        } else {
          throw Error("Argument must be numeric or string");
        }

      case '>=':
      case 'gte':
        if( ['string', 'number'].includes(typeof datum) ) {
          return datum >= this.target_value;
        } else {
          throw Error("Argument must be numeric or string");
        }

      case '<':
      case 'lt':
        if( ['string', 'number'].includes(typeof datum) ) {
          return datum < this.target_value;
        } else {
          throw Error("Argument must be numeric or string");
        }

      case '<=':
      case 'lte':
        if( ['string', 'number'].includes(typeof datum) ) {
          return datum <= this.target_value;
        } else {
          throw Error("Argument must be numeric or string");
        }

      case '!=':
      case 'ne':
        if (typeof this.target_value == 'object') {
          return !isEqual(datum, this.target_value);
        } else {
          return datum !== this.target_value;
        }
        
      
      case '=':
      case 'eq':
        if (typeof this.target_value == 'object') {
          return isEqual(datum, this.target_value);
        } else {
          return datum === this.target_value;
        }

      /* Array operators */

      case 'INCLUDE':
      case 'INCLUDE_ANY':
        if (Array.isArray(datum)) {
          // Find any one that matches
          const matching_element = this.target_value.find(element => datum.includes(element));
          return !!matching_element;
        } else {
          // Check if datum is any of the expected
          return this.target_value.includes(datum);
        }

      case 'REQUIRE':
      case 'REQUIRE_ALL':
        if (Array.isArray(datum)) {
          // Make sure none are missing
          const missing_element = this.target_value.find(element => !datum.includes(element));
          return !missing_element;
        } else {
          throw Error("REQUIRE filter requires an array datum");
        }

      case 'EXCLUDE':
      case 'EXCLUDE_ANY':
        if (Array.isArray(datum)) {
          // Reject if any element matches
          const matching_element = this.target_value.find(element => datum.includes(element));
          return !matching_element;
        } else {
          // Reject if the datum matches
          return !this.target_value.includes(datum);
        }

      default:
        return false;
          
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

module.exports = Comparison;