#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const nanospinner_1 = require("nanospinner");
const git_clone_1 = __importDefault(require("git-clone"));
const program = new commander_1.Command();
const spinner = (0, nanospinner_1.createSpinner)('Cloning the repository...');
program
    .argument('[dir]', 'your directory name', 'codox')
    .description('Clone CoDox')
    .action(async (dir) => {
    spinner.start();
    const repoUrl = 'https://github.com/sujjeee/codox.git';
    // Define the callback function
    function cb(error) {
        if (error) {
            // Handle the error
            spinner.error({ text: 'Something went wrong!' });
        }
        else {
            // Handle the success
            spinner.success({ text: "Repository cloned successfully" });
            console.log(`run cd ${dir} && pnpm install && pnpm dev`);
            console.log("Happy Coding! 💻");
        }
    }
    (0, git_clone_1.default)(repoUrl, dir, cb);
});
program.parse(process.argv);
