const chai = require("chai");
const expect = chai.expect;

const RulesParser = require("../src/rules_parser");
const Conjunction = require("../src/conjunction");
const Comparison = require("../src/comparison");
const seed_data = require("./seed/rules");

describe("RulesParser", () => {

  describe("#parse", () => {

    context("when given a single comparison", () => {
      it("returns a single comparison", () => {
        const result = RulesParser.parse(seed_data.SINGLE_COMPARISON);

        expect(result).to.be.instanceOf(Comparison);
        expect(result.evaluate({ key: 1 })).to.be.true;
        expect(result.evaluate({ key: 0 })).to.be.false;
        expect(result.evaluate({ key: 2 })).to.be.false;
      });
    });

    context("when given a conjunction", () => {
      it("returns the conjunction and its children", () => {
        const result = RulesParser.parse(seed_data.SINGLE_CONJUNCTION);

        expect(result).to.be.instanceOf(Conjunction);
        result.evaluatables.forEach((child) => {
          expect(child).to.be.instanceOf(Comparison);
        });
        expect(result.evaluate({ key1: 1, key2: 2 })).to.be.true;
        expect(result.evaluate({ key1: 0, key2: 2 })).to.be.false;
        expect(result.evaluate({ key1: 1, key2: 0 })).to.be.false;
      });
    });

  });

});