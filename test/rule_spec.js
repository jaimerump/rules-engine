describe("Rule", () => {

  describe(".evaluate", () => {

    context("when the operator is =", () => {

      it("also accepts eq");

      context("and the values are equal primitives", () => {

        it("evaluates true");

      });

      context("and the values are non-equal primitives", () => {

        it("evaluates false");

      });

      context("and the values are deeply equal objects", () => {

        it("evaluates true");

      });

      context("and the values are non-equal objects", () => {

        it("evaluates false");

      });

    });

    context("when the operator is !=", () => {

      it("also accepts ne");

      context("and the values are equal primitives", () => {

        it("evaluates false");

      });

      context("and the values are non-equal primitives", () => {

        it("evaluates true");

      });

      context("and the values are deeply equal objects", () => {

        it("evaluates false");

      });

      context("and the values are non-equal objects", () => {

        it("evaluates true");

      });

    });

    context("when the operator is >", () => {

      it("also accepts gt");

      context("when the candidate is a string", () => {

        context("and it is after the target in alphabetical order", () => {

          it("evaluates true");

        });

        context("and it is before the target in alphabetical order", () => {

          it("evaluates false");

        });

        context("and it equals the target", () => {

          it("evaluates false");

        });

      });

      context("when the candidate is numeric", () => {

        context("and it is greater than the target", () => {

          it("evaluates true");

        });

        context("and it is less than the target", () => {

          it("evaluates false");

        });

        context("and it equals the target", () => {

          it("evaluates false");

        });

      });

      context("when the candidate is not string or numeric", () => {

        it("throws a type error");

      });

    });

    context("when the operator is >=", () => {

      it("also accepts gte");

      context("when the candidate is a string", () => {

        context("and it is after the target in alphabetical order", () => {

          it("evaluates true");

        });

        context("and it is before the target in alphabetical order", () => {

          it("evaluates false");

        });

        context("and it equals the target", () => {

          it("evaluates true");

        });

      });

      context("when the candidate is numeric", () => {

        context("and it is greater than the target", () => {

          it("evaluates true");

        });

        context("and it is less than the target", () => {

          it("evaluates false");

        });

        context("and it equals the target", () => {

          it("evaluates true");

        });

      });

      context("when the candidate is not string or numeric", () => {

        it("throws a type error");

      });

    });

    context("when the operator is <", () => {

      it("also accepts lt");

      context("when the candidate is a string", () => {

        context("and it is after the target in alphabetical order", () => {

          it("evaluates false");

        });

        context("and it is before the target in alphabetical order", () => {

          it("evaluates true");

        });

        context("and it equals the target", () => {

          it("evaluates false");

        });

      });

      context("when the candidate is numeric", () => {

        context("and it is greater than the target", () => {

          it("evaluates false");

        });

        context("and it is less than the target", () => {

          it("evaluates true");

        });

        context("and it equals the target", () => {

          it("evaluates false");

        });

      });

      context("when the candidate is not string or numeric", () => {

        it("throws a type error");

      });

    });

    context("when the operator is <=", () => {

      it("also accepts lte");

      context("when the candidate is a string", () => {

        context("and it is after the target in alphabetical order", () => {

          it("evaluates false");

        });

        context("and it is before the target in alphabetical order", () => {

          it("evaluates true");

        });

        context("and it equals the target", () => {

          it("evaluates true");

        });

      });

      context("when the candidate is numeric", () => {

        context("and it is greater than the target", () => {

          it("evaluates false");

        });

        context("and it is less than the target", () => {

          it("evaluates true");

        });

        context("and it equals the target", () => {

          it("evaluates true");

        });

      });

      context("when the candidate is not string or numeric", () => {

        it("throws a type error");

      });

    });

  });

});