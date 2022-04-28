#!/usr/bin/env node --trace-warnings

const mockupGenerator = require('./index');

const [_, __, command, inputFile, outputFile] = process.argv;

switch (command) {
    case "browser":
        return mockupGenerator.browser(inputFile, outputFile);

    case "app":
        return mockupGenerator.application(inputFile, outputFile);

    case "monitor":
        return mockupGenerator.monitor(inputFile, outputFile);

    default:
        console.error("Usage: browser|app|monitor inputFile outputFile")
        console.error(process.argv)
}
