const Rule = require('../rule');
const chai = require("chai");
const expect = chai.expect;

describe("Rule", () => {

  const TYPE_ERROR = "Argument must be numeric or string";

  describe(".evaluate", () => {

    context("when the operator is =", () => {

      it("also accepts eq", () => {
        const rule = new Rule("key", "eq", 1);
        const candidate = { key: 1 };
        expect(rule.evaluate(candidate)).to.be.true;
      });

      context("and the values are equal primitives", () => {

        it("evaluates true", () => {
          const rule = new Rule('key', '=', 1);
          const candidate = { key: 1 };
          expect(rule.evaluate(candidate)).to.be.true;
        });

      });

      context("and the values are non-equal primitives", () => {

        it("evaluates false", () => {
          const rule = new Rule("key", "=", 1);
          const candidate = { key: 2 };
          expect(rule.evaluate(candidate)).to.be.false;
        });

      });

      context("and the values are deeply equal objects", () => {

        it("evaluates true", () => {
          const rule = new Rule("key", "=", { test: '1' });
          const candidate = { key: { test: '1' } };
          expect(rule.evaluate(candidate)).to.be.true;
        });

      });

      context("and the values are non-equal objects", () => {

        it("evaluates false", () => {
          const rule = new Rule("key", "=", { test: "1" });
          const candidate = { key: { test: "2" } };
          expect(rule.evaluate(candidate)).to.be.false;
        });

      });

    });

    context("when the operator is !=", () => {

      it("also accepts ne", () => {
        const rule = new Rule("key", "ne", 1);
        const candidate = { key: 2 };
        expect(rule.evaluate(candidate)).to.be.true;
      });

      context("and the values are equal primitives", () => {

        it("evaluates false", () => {
          const rule = new Rule("key", "!=", 1);
          const candidate = { key: 1 };
          expect(rule.evaluate(candidate)).to.be.false;
        });

      });

      context("and the values are non-equal primitives", () => {

        it("evaluates true", () => {
          const rule = new Rule("key", "!=", 1);
          const candidate = { key: 2 };
          expect(rule.evaluate(candidate)).to.be.true;
        });

      });

      context("and the values are deeply equal objects", () => {

        it("evaluates false", () => {
          const rule = new Rule("key", "!=", { test: "1" });
          const candidate = { key: { test: "1" } };
          expect(rule.evaluate(candidate)).to.be.false;
        });

      });

      context("and the values are non-equal objects", () => {

        it("evaluates true", () => {
          const rule = new Rule("key", "!=", { test: "1" });
          const candidate = { key: { test: "2" } };
          expect(rule.evaluate(candidate)).to.be.true;
        });

      });

    });

    context("when the operator is >", () => {

      it("also accepts gt", () => {
        const rule = new Rule("key", "gt", 1);
        const candidate = { key: 2 };
        expect(rule.evaluate(candidate)).to.be.true;
      });

      context("when the candidate is a string", () => {

        context("and it is after the target in alphabetical order", () => {

          it("evaluates true", () => {
            const rule = new Rule("key", ">", "a");
            const candidate = { key: "b" };
            expect(rule.evaluate(candidate)).to.be.true;
          });

        });

        context("and it is before the target in alphabetical order", () => {

          it("evaluates false", () => {
            const rule = new Rule("key", ">", "b");
            const candidate = { key: "a" };
            expect(rule.evaluate(candidate)).to.be.false;
          });

        });

        context("and it equals the target", () => {

          it("evaluates false", () => {
            const rule = new Rule("key", ">", "a");
            const candidate = { key: "a" };
            expect(rule.evaluate(candidate)).to.be.false;
          });

        });

      });

      context("when the candidate is numeric", () => {

        context("and it is greater than the target", () => {

          it("evaluates true", () => {
            const rule = new Rule("key", ">", 1);
            const candidate = { key: 2 };
            expect(rule.evaluate(candidate)).to.be.true;
          });

        });

        context("and it is less than the target", () => {

          it("evaluates false", () => {
            const rule = new Rule("key", ">", 1);
            const candidate = { key: 0 };
            expect(rule.evaluate(candidate)).to.be.false;
          });

        });

        context("and it equals the target", () => {

          it("evaluates false", () => {
            const rule = new Rule("key", ">", 1);
            const candidate = { key: 1 };
            expect(rule.evaluate(candidate)).to.be.false;
          });

        });

      });

      context("when the candidate is not string or numeric", () => {

        it("throws a type error", () => {
          const rule = new Rule("key", ">", 1);
          const candidate = { key: [2] };
          expect(() => {
            rule.evaluate(candidate);
          }).to.throw(TYPE_ERROR);
        });

      });

    });

    context("when the operator is >=", () => {

      it("also accepts gte", () => {
        const rule = new Rule("key", "gte", 1);
        const candidate = { key: 2 };
        expect(rule.evaluate(candidate)).to.be.true;
      });

      context("when the candidate is a string", () => {

        context("and it is after the target in alphabetical order", () => {

          it("evaluates true", () => {
            const rule = new Rule("key", ">=", "a");
            const candidate = { key: "b" };
            expect(rule.evaluate(candidate)).to.be.true;
          });

        });

        context("and it is before the target in alphabetical order", () => {

          it("evaluates false", () => {
            const rule = new Rule("key", ">=", "b");
            const candidate = { key: "a" };
            expect(rule.evaluate(candidate)).to.be.false;
          });

        });

        context("and it equals the target", () => {

          it("evaluates true", () => {
            const rule = new Rule("key", ">=", "a");
            const candidate = { key: "a" };
            expect(rule.evaluate(candidate)).to.be.true;
          });

        });

      });

      context("when the candidate is numeric", () => {

        context("and it is greater than the target", () => {

          it("evaluates true", () => {
            const rule = new Rule("key", ">=", 1);
            const candidate = { key: 2 };
            expect(rule.evaluate(candidate)).to.be.true;
          });

        });

        context("and it is less than the target", () => {

          it("evaluates false", () => {
            const rule = new Rule("key", ">=", 1);
            const candidate = { key: 0 };
            expect(rule.evaluate(candidate)).to.be.false;
          });

        });

        context("and it equals the target", () => {

          it("evaluates true", () => {
            const rule = new Rule("key", ">=", 1);
            const candidate = { key: 1 };
            expect(rule.evaluate(candidate)).to.be.true;
          });

        });

      });

      context("when the candidate is not string or numeric", () => {

        it("throws a type error", () => {
          const rule = new Rule("key", ">=", 1);
          const candidate = { key: [2] };
          expect(() => {
            rule.evaluate(candidate);
          }).to.throw(TYPE_ERROR);
        });

      });

    });

    context("when the operator is <", () => {

      it("also accepts lt", () => {
        const rule = new Rule("key", "lt", 1);
        const candidate = { key: 0 };
        expect(rule.evaluate(candidate)).to.be.true;
      });

      context("when the candidate is a string", () => {

        context("and it is after the target in alphabetical order", () => {

          it("evaluates false", () => {
            const rule = new Rule("key", "<", "a");
            const candidate = { key: "b" };
            expect(rule.evaluate(candidate)).to.be.false;
          });

        });

        context("and it is before the target in alphabetical order", () => {

          it("evaluates true", () => {
            const rule = new Rule("key", "<", "b");
            const candidate = { key: "a" };
            expect(rule.evaluate(candidate)).to.be.true;
          });

        });

        context("and it equals the target", () => {

          it("evaluates false", () => {
            const rule = new Rule("key", "<", "a");
            const candidate = { key: "a" };
            expect(rule.evaluate(candidate)).to.be.false;
          });

        });

      });

      context("when the candidate is numeric", () => {

        context("and it is greater than the target", () => {

          it("evaluates false", () => {
            const rule = new Rule("key", "<", 1);
            const candidate = { key: 2 };
            expect(rule.evaluate(candidate)).to.be.false;
          });

        });

        context("and it is less than the target", () => {

          it("evaluates true", () => {
            const rule = new Rule("key", "<", 1);
            const candidate = { key: 0 };
            expect(rule.evaluate(candidate)).to.be.true;
          });

        });

        context("and it equals the target", () => {

          it("evaluates false", () => {
            const rule = new Rule("key", "<", 1);
            const candidate = { key: 1 };
            expect(rule.evaluate(candidate)).to.be.false;
          });

        });

      });

      context("when the candidate is not string or numeric", () => {

        it("throws a type error", () => {
          const rule = new Rule("key", "<", 1);
          const candidate = { key: [2] };
          expect(() => {
            rule.evaluate(candidate);
          }).to.throw(TYPE_ERROR);
        });

      });

    });

    context("when the operator is <=", () => {

      it("also accepts lte", () => {
        const rule = new Rule("key", "lte", 1);
        const candidate = { key: 0 };
        expect(rule.evaluate(candidate)).to.be.true;
      });

      context("when the candidate is a string", () => {

        context("and it is after the target in alphabetical order", () => {

          it("evaluates false", () => {
            const rule = new Rule("key", "<=", "a");
            const candidate = { key: "b" };
            expect(rule.evaluate(candidate)).to.be.false;
          });

        });

        context("and it is before the target in alphabetical order", () => {

          it("evaluates true", () => {
            const rule = new Rule("key", "<=", "b");
            const candidate = { key: "a" };
            expect(rule.evaluate(candidate)).to.be.true;
          });

        });

        context("and it equals the target", () => {

          it("evaluates true", () => {
            const rule = new Rule("key", "<=", "a");
            const candidate = { key: "a" };
            expect(rule.evaluate(candidate)).to.be.true;
          });

        });

      });

      context("when the candidate is numeric", () => {

        context("and it is greater than the target", () => {

          it("evaluates false", () => {
            const rule = new Rule("key", "<=", 1);
            const candidate = { key: 2 };
            expect(rule.evaluate(candidate)).to.be.false;
          });

        });

        context("and it is less than the target", () => {

          it("evaluates true", () => {
            const rule = new Rule("key", "<=", 1);
            const candidate = { key: 0 };
            expect(rule.evaluate(candidate)).to.be.true;
          });

        });

        context("and it equals the target", () => {

          it("evaluates true", () => {
            const rule = new Rule("key", "<=", 1);
            const candidate = { key: 1 };
            expect(rule.evaluate(candidate)).to.be.true;
          });

        });

      });

      context("when the candidate is not string or numeric", () => {

        it("throws a type error", () => {
          const rule = new Rule("key", "<=", 1);
          const candidate = { key: [2] };
          expect(() => {
            rule.evaluate(candidate);
          }).to.throw(TYPE_ERROR);
        });

      });

    });

  });

});