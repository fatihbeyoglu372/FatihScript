import * as fs from 'fs';
// Raylib integration for graphics engine
const r = require('raylib'); 

// Global memory to store variables
const memory: { [key: string]: any } = {};

function execute(lines: string[]) {
    let i = 0;
    while (i < lines.length) {
        let line = lines[i].trim();

        // Skip comments and empty lines
        if (!line || line.startsWith("//")) {
            i++;
            continue;
        }

        // --- GRAPHICS COMMANDS ---
        if (line.startsWith("openWindow(")) {
            const match = line.match(/\((.*),(.*),(.*)\)/);
            if (match) {
                const w = parseInt(match[1].trim());
                const h = parseInt(match[2].trim());
                const title = match[3].trim().replace(/"/g, '');
                r.InitWindow(w, h, title);
                r.SetTargetFPS(60);
            }
        }
        else if (line === "startDrawing()") r.BeginDrawing();
        else if (line === "endDrawing()") r.EndDrawing();
        else if (line === "clearCanvas()") r.ClearBackground(r.BLACK);

        else if (line.startsWith("drawRect(")) {
            const match = line.match(/\((.*),(.*),(.*),(.*)\)/);
            if (match) {
                const x = eval(match[1].trim().replace(/([a-zA-Zçğışöü]+)/g, (m) => memory[m] ?? m));
                const y = eval(match[2].trim().replace(/([a-zA-Zçğışöü]+)/g, (m) => memory[m] ?? m));
                const w = parseInt(match[3].trim());
                const h = parseInt(match[4].trim());
                r.DrawRectangle(x, y, w, h, r.WHITE);
            }
        }

        // --- KEYBOARD INPUT ---
        else if (line.startsWith("var ") && line.includes("isKeyDown(")) {
            const name = line.replace("var ", "").split("=")[0].trim();
            const keyMatch = line.match(/isKeyDown\((.*)\)/);
            if (keyMatch) {
                const keyName = keyMatch[1].trim();
                const isPressed = r.IsKeyDown(r[keyName]) ? 1 : 0;
                memory[name] = isPressed;
            }
        }

        // --- CONDITIONAL STATEMENTS (IF) ---
        else if (line.startsWith("if")) {
            const match = line.match(/\((.*)\)/);
            const condition = match ? match[1] : null;

            if (condition) {
                let blockStart = i + 1;
                let blockEnd = -1;
                let braceCount = 0;

                for (let j = i; j < lines.length; j++) {
                    if (lines[j].includes("{")) braceCount++;
                    if (lines[j].includes("}")) {
                        braceCount--;
                        if (braceCount === 0) {
                            blockEnd = j;
                            break;
                        }
                    }
                }

                if (blockEnd !== -1) {
                    const processedCondition = condition.replace(/([a-zA-Zçğışöü]+)/g, (m) => {
                        return memory[m] !== undefined ? memory[m] : m;
                    });

                    if (eval(processedCondition)) {
                        const ifLines = lines.slice(blockStart, blockEnd);
                        execute(ifLines); 
                    }
                    i = blockEnd; 
                }
            }
        }

        // --- LOOPS (WHILE) ---
        else if (line.startsWith("while")) {
            const match = line.match(/\((.*)\)/);
            const condition = match ? match[1] : null;

            if (condition) {
                let blockStart = i + 1;
                let blockEnd = -1;
                let braceCount = 0;

                for (let j = i; j < lines.length; j++) {
                    if (lines[j].includes("{")) braceCount++;
                    if (lines[j].includes("}")) {
                        braceCount--;
                        if (braceCount === 0) {
                            blockEnd = j;
                            break;
                        }
                    }
                }

                if (blockEnd !== -1) {
                    const loopLines = lines.slice(blockStart, blockEnd);
                    const checkCondition = () => {
                        const processedCondition = condition.replace(/([a-zA-Zçğışöü]+)/g, (m) => {
                            return memory[m] !== undefined ? memory[m] : m;
                        });
                        return eval(processedCondition);
                    };

                    while (checkCondition() && !r.WindowShouldClose()) {
                        execute(loopLines);
                    }
                    i = blockEnd; 
                }
            }
        }

        // --- OUTPUT (println ONLY) ---
        else if (line.startsWith("println(")) {
            const match = line.match(/\((.*)\)/);
            if (match && match[1]) {
                const content = match[1].trim();
                const output = memory[content] !== undefined ? memory[content] : content.replace(/"/g, '');
                console.log(output);
            }
        }

        // --- VARIABLE DECLARATION & ASSIGNMENT ---
        else if (line.startsWith("var ")) {
            const parts = line.replace("var ", "").split("=");
            if (parts.length === 2) {
                const name = parts[0].trim();
                const rawValue = parts[1].replace(";", "").trim();
                const calculatedValue = eval(rawValue.replace(/([a-zA-Zçğışöü]+)/g, (m) => {
                    return memory[m] !== undefined ? memory[m] : m;
                }));
                memory[name] = calculatedValue;
            }
        }
        i++;
    }
}

// CLI Execution
const filename = process.argv[2];
if (filename && fs.existsSync(filename)) {
    const code = fs.readFileSync(filename, 'utf-8');
    execute(code.split('\n'));
} else {
    console.log("Error: Please provide an .fs file. (Usage: ts-node interpreter.ts script.fs)");
}
