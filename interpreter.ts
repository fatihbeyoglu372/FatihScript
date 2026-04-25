import * as fs from 'fs';
const r = require('raylib'); 
const inputReader = require('readline-sync'); // Kullanıcı girişi için

const memory: { [key: string]: any } = {};

function execute(lines: string[]) {
    let i = 0;
    while (i < lines.length) {
        let line = lines[i].trim();
        if (!line || line.startsWith("//")) { i++; continue; }

        // --- GRAPHICS (GRAFİK) ---
        if (line.startsWith("openWindow(")) {
            const match = line.match(/\((.*),(.*),(.*)\)/);
            if (match) {
                r.InitWindow(parseInt(match[1]), parseInt(match[2]), match[3].replace(/"/g, ''));
                r.SetTargetFPS(60);
            }
        }
        else if (line === "startDrawing()") r.BeginDrawing();
        else if (line === "endDrawing()") r.EndDrawing();
        else if (line === "clearCanvas()") r.ClearBackground(r.BLACK);
        else if (line.startsWith("drawRect(")) {
            const match = line.match(/\((.*),(.*),(.*),(.*)\)/);
            if (match) {
                const x = eval(match[1].replace(/([a-zA-Zçğışöü]+)/g, (m) => memory[m] ?? m));
                const y = eval(match[2].replace(/([a-zA-Zçğışöü]+)/g, (m) => memory[m] ?? m));
                r.DrawRectangle(x, y, parseInt(match[3]), parseInt(match[4]), r.WHITE);
            }
        }

        // --- INPUTS (KLAVYE, FARE, TERMİNAL) ---
        else if (line.startsWith("var ") && line.includes("input(")) {
            const parts = line.replace("var ", "").split("=");
            const name = parts[0].trim();
            const promptMatch = line.match(/input\("(.*)"\)/);
            const promptText = promptMatch ? promptMatch[1] : "";
            memory[name] = inputReader.question(promptText + " ");
        }
        else if (line.startsWith("var ") && line.includes("isKeyDown(")) {
            const name = line.replace("var ", "").split("=")[0].trim();
            const keyMatch = line.match(/isKeyDown\((.*)\)/);
            if (keyMatch) memory[name] = r.IsKeyDown(r[keyMatch[1].trim()]) ? 1 : 0;
        }
        else if (line.startsWith("var ") && line.includes("getMouseX()")) {
            memory[line.split("=")[0].replace("var ", "").trim()] = r.GetMouseX();
        }
        else if (line.startsWith("var ") && line.includes("getMouseY()")) {
            memory[line.split("=")[0].replace("var ", "").trim()] = r.GetMouseY();
        }
        else if (line.startsWith("var ") && line.includes("isMouseButtonDown()")) {
            memory[line.split("=")[0].replace("var ", "").trim()] = r.IsMouseButtonDown(0) ? 1 : 0;
        }

        // --- LOGIC (IF & WHILE) ---
        else if (line.startsWith("if") || line.startsWith("while")) {
            const isWhile = line.startsWith("while");
            const condition = line.match(/\((.*)\)/)?.[1];
            let blockStart = i + 1, blockEnd = -1, bc = 0;
            for (let j = i; j < lines.length; j++) {
                if (lines[j].includes("{")) bc++;
                if (lines[j].includes("}")) { bc--; if (bc === 0) { blockEnd = j; break; } }
            }
            if (blockEnd !== -1 && condition) {
                const run = () => {
                    const proc = condition.replace(/([a-zA-Zçğışöü]+)/g, (m) => memory[m] !== undefined ? memory[m] : m);
                    return eval(proc);
                };
                if (isWhile) {
                    while (run() && !r.WindowShouldClose()) {
                        r.PollInputEvents(); // Donmayı engeller
                        execute(lines.slice(blockStart, blockEnd));
                    }
                } else if (run()) {
                    execute(lines.slice(blockStart, blockEnd));
                }
                i = blockEnd;
            }
        }

        // --- OUTPUT & VARIABLES (YAZDIRMA VE DEĞİŞKEN) ---
        else if (line.startsWith("println(")) {
            const match = line.match(/\((.*)\)/);
            if (match && match[1]) {
                const content = match[1].trim();
                console.log(memory[content] !== undefined ? memory[content] : content.replace(/"/g, ''));
            }
        }
        else if (line.startsWith("var ")) {
            const parts = line.replace("var ", "").split("=");
            if (parts.length === 2) {
                const name = parts[0].trim();
                memory[name] = eval(parts[1].replace(/([a-zA-Zçğışöü]+)/g, (m) => memory[m] ?? m));
            }
        }
        i++;
    }
}

const filename = process.argv[2];
if (filename && fs.existsSync(filename)) {
    execute(fs.readFileSync(filename, 'utf-8').split('\n'));
} else {
    console.log("Error: .fs file missing! (Usage: ts-node interpreter.ts test.fs)");
}
