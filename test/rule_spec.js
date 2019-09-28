const Rule = require('../rule');
const chai = require("chai");
const expect = chai.expect;

describe("Rule", () => {

  const TYPE_ERROR = "Argument must be numeric or string";

  describe(".evaluate", () => {

    context("when the comparison is =", () => {

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

    context("when the comparison is !=", () => {

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

    context("when the comparison is >", () => {

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

    context("when the comparison is >=", () => {

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

    context("when the comparison is <", () => {

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

    context("when the comparison is <=", () => {

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

    context("when the comparison is INCLUDE", () => {

      context("and the candidate is an array", () => {

        context("matching one element", () => {

          it("evaluates true", () => {
            const rule = new Rule("key", "INCLUDE", [1,4]);
            const candidate = { key: [1,2,3] };
            expect(rule.evaluate(candidate)).to.be.true;
          });

        });

        context("matching all elements", () => {

          it("evaluates true", () => {
            const rule = new Rule("key", "INCLUDE", [1,2,3,4]);
            const candidate = { key: [1, 2, 3] };
            expect(rule.evaluate(candidate)).to.be.true;
          });

        });

        context("matching no elements", () => {

          it("evaluates false", () => {
            const rule = new Rule("key", "INCLUDE", [4,5,6]);
            const candidate = { key: [1, 2, 3] };
            expect(rule.evaluate(candidate)).to.be.false;
          });

        });

      });

      context("and the candidate is not an array", () => {

        it("checks for the one value", () => {
          const rule = new Rule("key", "INCLUDE", [1, 4]);
          const candidate = { key: 1 };
          expect(rule.evaluate(candidate)).to.be.true;
        });

      });

    });

    context("when the comparison is REQUIRE", () => {

      context("and the candidate is an array", () => {

        context("matching one element", () => {

          it("evaluates false", () => {
            const rule = new Rule("key", "REQUIRE", [1, 4]);
            const candidate = { key: [1, 2, 3] };
            expect(rule.evaluate(candidate)).to.be.false;
          });

        });

        context("matching all elements", () => {

          it("evaluates true", () => {
            const rule = new Rule("key", "REQUIRE", [1, 2, 3]);
            const candidate = { key: [1, 2, 3, 4] };
            expect(rule.evaluate(candidate)).to.be.true;
          });

        });

        context("matching no elements", () => {

          it("evaluates false", () => {
            const rule = new Rule("key", "REQUIRE", [4, 5, 6]);
            const candidate = { key: [1, 2, 3] };
            expect(rule.evaluate(candidate)).to.be.false;
          });

        });

      });

      context("and the candidate is not an array", () => {

        it("throws an argument error", () => {
          const rule = new Rule("key", "REQUIRE", [4, 5, 6]);
          const candidate = { key: 1 };
          expect(() => {
            rule.evaluate(candidate);
          }).to.throw("REQUIRE filter requires an array datum");
        });

      });

    });

    context("when the comparison is EXCLUDE", () => {

      context("and the candidate is an array", () => {

        context("matching one element", () => {

          it("evaluates false", () => {
            const rule = new Rule("key", "EXCLUDE", [1, 4]);
            const candidate = { key: [1, 2, 3] };
            expect(rule.evaluate(candidate)).to.be.false;
          });

        });

        context("matching all elements", () => {

          it("evaluates false", () => {
            const rule = new Rule("key", "EXCLUDE", [1, 2, 3, 4]);
            const candidate = { key: [1, 2, 3] };
            expect(rule.evaluate(candidate)).to.be.false;
          });

        });

        context("matching no elements", () => {

          it("evaluates true", () => {
            const rule = new Rule("key", "EXCLUDE", [4, 5, 6]);
            const candidate = { key: [1, 2, 3] };
            expect(rule.evaluate(candidate)).to.be.true;
          });

        });

      });

      context("and the candidate is not an array", () => {

        it("checks for the one value", () => {
          const rule = new Rule("key", "EXCLUDE", [1, 4]);
          const candidate = { key: 1 };
          expect(rule.evaluate(candidate)).to.be.false;
        });

      });

    });

  });

});