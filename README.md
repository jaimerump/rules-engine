# rules-engine
This repository contains logic for checking JSON objects against extremely custom rules that can be expressed in JSON.

## Usage
There are two ways to use these tools. One way is to import the `Rule` and `RuleSet` classes and to construct the rules manually.
```
const { RuleSet, Rule } = require("rules-engine");
const rule_set = new RuleSet("AND", [
  new Rule("key", "=", 1),
  new Rule("other_key", "!=", 1)
]);
const candidate = { "key": 1, "other_key": 2 };
rule_set.evaluate(candidate); // = true
```
The other way (not yet implemented) is to construct the desired rules in JSON, then pass that JSON into the rules parser.
```
const { RulesParser } = require("rules-engine");
const rules_json = {
  "type": "rule_set",
  "operator": "AND",
  "rules": [
    {
      "type": "rule",
      "path": "key",
      "comparison": "=",
      "target_value": 1
    },
    {
      "type": "rule",
      "path": "other_key",
      "comparison": "!=",
      "target_value": 1
    }
  ]
};
const rule_set = RulesParser.parse(rules_json);
const candidate = { "key": 1, "other_key": 2 };
rule_set.evaluate(candidate); // = true
```

The two core components are Rules and Rule Sets. Rules check a property of the candidate object (specified by the `path` parameter) against a desired target value (specified by the `target_value` parameter). The logic of the comparison is represented by the `comparison` and the valid values are:
* = or eq: Checks that the data at `path` is deeply equal to `target_value`
* != or ne: Checks that the data at `path` is not deeply equal to `target_value`
* > or gt: Checks that the data at `path` is greater than (or later in alphabetical order) than `target_value`
* >= or gte: Checks that the data at `path` is greater than or equal (or later in alphabetical order) than `target_value`
* < or lt: Checks that the data at `path` is less than (or earlier in alphabetical order) than `target_value`
* <= or lte: Checks that the data at `path` is less than or equal (or later in alphabetical order) than `target_value`
* INCLUDE: `target_value` must be an array. The rule evaluates true if any of the target values match the data at `path`
* REQUIRE: `target_value` and the data at `path` must both be arrays. The rule evaluates true only if all of the target values are in the array at `path`
* EXCLUDE: `target_value` must be an array. The rule evaluates false if any of the target values match the data at `path`

Rule Sets join multiple rules together with either an AND (all of the child Rules must evaluate true) or an OR (only one must evaluate true). Rule Sets can also contain other Rule Sets, allowing complex boolean logic trees to be constructed from them.


## Todo
The basic rules are implemented and tested, but I still need to implement a parser to parse JSON rules into rule objects that can be evaluated. I also need to implement validation to make sure that rules aren't created with invalid target values.

## Caveats
These tools require all of the data needed for the checks to be present in a single data structure. It also cannot express dynamic target values, such as "two days ago". The way to implement a dynamic threshold would be to add a key to the data structure such as `days_ago`, then add a rule like `new Rule("days_ago", ">=", 2)`.
