describe("Rule Set", () => {

  describe(".evaluate", () => {

    context("when the operator is AND", () => {

      context("and every rule evaluates to true", () => {

        it("evaluates as true");

      });

      context("and any rule evaluates to false", () => {

        it("evaluates as false");

      });

    });

    context("when the operator is OR", () => {

      context("and every rule evaluates to false", () => {

        it("evaluates as false");

      });

      context("and any rule evaluates to true", () => {

        it("evaluates as true");

      });

    });

  });

});