const Conjunction = require('../src/conjunction');
const Comparison = require("../src/comparison");
const chai = require("chai");
const expect = chai.expect;

describe("Rule Set", () => {

  describe(".evaluate", () => {

    context("when the operator is AND", () => {

      context("and every rule evaluates to true", () => {

        it("evaluates as true", () => {
          const conjunction = new Conjunction("AND", [
            new Comparison("key", "=", 1),
            new Comparison("key", "=", 1)
          ]);
          const candidate = { key: 1 };

          expect(conjunction.evaluate(candidate)).to.be.true;
        });

      });

      context("and any rule evaluates to false", () => {

        it("evaluates as false", () => {
          const conjunction = new Conjunction('AND', [
            new Comparison('key', '=', 1),
            new Comparison('key', '=', 2)
          ]);
          const candidate = { key: 1 };
          
          expect(conjunction.evaluate(candidate)).to.be.false;
        });

      });

    });

    context("when the operator is OR", () => {

      context("and every rule evaluates to false", () => {

        it("evaluates as false", () => {
          const conjunction = new Conjunction("OR", [
            new Comparison("key", "=", 1),
            new Comparison("key", "=", 2)
          ]);
          const candidate = { key: 3 };

          expect(conjunction.evaluate(candidate)).to.be.false;
        });

      });

      context("and any rule evaluates to true", () => {

        it("evaluates as true", () => {
          const conjunction = new Conjunction('OR', [
            new Comparison('key', '=', 1),
            new Comparison('key', '=', 2)
          ]);
          const candidate = { key: 1 };
          
          expect(conjunction.evaluate(candidate)).to.be.true;
        });

      });

    });

    it("allows nested rulesets", () => {
      const conjunction = new Conjunction("OR", [
        new Comparison("key", "=", 1),
        new Conjunction("AND", [
          new Comparison("second_key", "=", 2),
          new Comparison("third_key", '=', 3)
        ])
      ]);
      const candidate = { key: 2, second_key: 2, third_key: 3 };

      expect(conjunction.evaluate(candidate)).to.be.true;
    });

  });

});