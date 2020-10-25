/**
 * A common interface to allow mixed-depth trees
 */

class Evaluatable {
  
  constructor(){}

  /**
   * Evaluates the given object against the Comparison
   * @param {Object} candidate
   * @returns {Boolean}
   */
  evaluate(candidate) {
    return false;
  }
}

module.exports = Evaluatable;