import fs from "fs";

import { config } from "./config.js";
import PromptSync from "prompt-sync";

const prompt = PromptSync();

const missing_config = [];

console.clear();

export const check_config = () => {
    config.forEach((v, k) => {
        if (v == "") {
            console.log("Config for ", k, "not found!");
            missing_config.push({
                k
            });
        }
    });
    
    if (missing_config.length > 0) {
    
        for (let i = 0; i < missing_config.length; i++) {
            console.log("\n");
            const value = prompt("Insert the " + missing_config[i].k + " Value: ");
            config.set(missing_config[i].k, value.replace(/\\/g, '\\\\'));
        }
    
        // damn... 
        const text = 
`
import { check_config } from "./utils.js";
export const config = new Map();

// Update the config files HEREE!!!!!!!!!!!!!!!::::
${Array.from(config).map(([k, v]) => `config.set("${k}", "${v}");`).join('\n')}

check_config();
`
    
        // update the config.js file
        fs.writeFileSync("./src/config.js", text);
    }
}