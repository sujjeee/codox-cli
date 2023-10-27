#!/usr/bin/env node

import { Command } from "commander";
import { createSpinner } from 'nanospinner';
import Clone from "git-clone";
import fs from "fs";

const program = new Command();
const spinner = createSpinner('Cloning the repository...');

program
    .argument('[dir]', 'your directory name', 'codox')
    .description('Clone CoDox')
    .action(async (dir) => {

        spinner.start();

        const repoUrl = 'https://github.com/sujjeee/codox.git';

        // Define the callback function
        function cb(error: Error | undefined) {
            if (error) {
                // Handle the error
                spinner.error({ text: 'Something went wrong!' })
                console.log("If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏");
            } else {
                // Handle the success
                spinner.success({ text: "Repository cloned successfully" });

                // Remove the .git directory
                fs.rmdir(`${dir}/.git`, { recursive: true }, (err) => {
                    if (err) {
                        console.error("Error removing .git directory:", err);
                        console.log("If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏");
                    } else {
                        console.log(`run cd ${dir} && pnpm install && pnpm dev`);
                        console.log("Happy Coding! 💻");
                    }
                });
            }
        }
        Clone(repoUrl, dir, cb);
    });
program.parse(process.argv);