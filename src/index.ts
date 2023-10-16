#!/usr/bin/env node

import { Command } from "commander";
import { createSpinner } from 'nanospinner';
import Clone from "git-clone";

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
            } else {
                // Handle the success
                spinner.success({ text: "Repository cloned successfully" });
                console.log(`run cd ${dir} && pnpm install && pnpm dev`)
                console.log("Happy Coding! 💻")
            }
        }

        Clone(repoUrl, dir, cb);

    });
program.parse(process.argv);
