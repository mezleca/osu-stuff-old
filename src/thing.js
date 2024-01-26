import fs from "fs";
import path from "path";
import PromptSync from "prompt-sync";

import { missing_initialize } from "./functions/missing_maps.js";
import { download_initialize } from "./functions/download_maps.js";

const prompt = PromptSync();

const menu_options = [
    {
        name: "get missing beatmaps from collections",
        func: missing_initialize
    },
    {
        name: "download maps from a json",
        func: download_initialize
    }
];

const select_option = () => {

    for (let i = 0; i < menu_options.length; i++) {
        console.log(`[${i}] - ${menu_options[i].name}\n`);
    }

    return prompt("select a option: ");
};

let current_option = null;

const main = async () => {
    
    while (true) {

        console.log("osu-thing v0.1 ( type exit to... exit? )\n");
        
        if (current_option == null) {
            current_option = select_option();
        }

        if (current_option == "exit") {
            break;
        }

        current_option = Number(current_option);

        if (current_option > menu_options.length || isNaN(current_option)) {
            console.log("invalid option");
            current_option = null;
            return;
        }

        await menu_options[current_option].func();
        current_option = null;

        // timeout
        await new Promise((re, rej) => {
            const interval = setInterval(() => { clearInterval(interval); re() }, 1000);
        });
    }
};

main();