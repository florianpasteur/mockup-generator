#!/usr/bin/env node --trace-warnings

const mockupGenerator = require('./index');
const fs = require('fs');
const path = require('path');

function getArguments() {
    const [_, __, command, inputFile, outputFileArg] = process.argv;
    if (!fs.existsSync(inputFile)) {
        throw new Error('Input file does not exist');
    }
    const outputFile = outputFileArg || `${path.basename(inputFile, path.extname(inputFile))}.${command}.${path.extname(inputFile)}`
    if (fs.existsSync(outputFile)) {
        throw new Error('Output file already exists');
    }
    return [command, inputFile, outputFile];
}

const [command, inputFile, outputFile] = getArguments();

switch (command) {
    case "browser":
        return mockupGenerator.browser(inputFile, outputFile);

    case "app":
        return mockupGenerator.application(inputFile, outputFile);

    case "monitor":
        return mockupGenerator.monitor(inputFile, outputFile);

    default:
        console.error("Usage: browser|app|monitor inputFile [outputFile]")
        console.error(process.argv)
}
