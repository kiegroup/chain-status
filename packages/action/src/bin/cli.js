#!/usr/bin/env node
const { main } = require("./main");
const { getArgumentsObject } = require("./arguments");
const args = getArgumentsObject();
main({ ...args, createdBy: "local execution" });
