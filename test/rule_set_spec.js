const RuleSet = require('../rule_set');
const Rule = require("../rule");
const chai = require("chai");
const expect = chai.expect;

describe("Rule Set", () => {

  describe(".evaluate", () => {

    context("when the operator is AND", () => {

      context("and every rule evaluates to true", () => {

        it("evaluates as true", () => {
          const rule_set = new RuleSet("AND", [
            new Rule("key", "=", 1),
            new Rule("key", "=", 1)
          ]);
          const candidate = { key: 1 };

          expect(rule_set.evaluate(candidate)).to.be.true;
        });

      });

      context("and any rule evaluates to false", () => {

        it("evaluates as false", () => {
          const rule_set = new RuleSet('AND', [
            new Rule('key', '=', 1),
            new Rule('key', '=', 2)
          ]);
          const candidate = { key: 1 };
          
          expect(rule_set.evaluate(candidate)).to.be.false;
        });

      });

    });

    context("when the operator is OR", () => {

      context("and every rule evaluates to false", () => {

        it("evaluates as false", () => {
          const rule_set = new RuleSet("OR", [
            new Rule("key", "=", 1),
            new Rule("key", "=", 2)
          ]);
          const candidate = { key: 3 };

          expect(rule_set.evaluate(candidate)).to.be.false;
        });

      });

      context("and any rule evaluates to true", () => {

        it("evaluates as true", () => {
          const rule_set = new RuleSet('OR', [
            new Rule('key', '=', 1),
            new Rule('key', '=', 2)
          ]);
          const candidate = { key: 1 };
          
          expect(rule_set.evaluate(candidate)).to.be.true;
        });

      });

    });

    it("allows nested rulesets", () => {
      const rule_set = new RuleSet("OR", [
        new Rule("key", "=", 1),
        new RuleSet("AND", [
          new Rule("second_key", "=", 2),
          new Rule("third_key", '=', 3)
        ])
      ]);
      const candidate = { key: 2, second_key: 2, third_key: 3 };

      expect(rule_set.evaluate(candidate)).to.be.true;
    });

  });

});