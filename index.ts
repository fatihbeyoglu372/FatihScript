import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline-sync';

enum TokenType {
    NAME, NUMBER, STRING, ASSIGN, PRINTLN, PRINT, INPUT,
    LPAREN, RPAREN, LBRACE, RBRACE, 
    PLUS, MINUS, MULTIPLY, DIVIDE,
    GT, LT, EQ, IF, ELSE, WHILE, EOF
}

interface Token { type: TokenType; value: string; }

class Lexer {
    private pos = 0;
    private char: string | null = null;
    constructor(private input: string) { this.char = this.input[0] ?? null; }
    private advance() { this.pos++; this.char = this.input[this.pos] ?? null; }

    nextToken(): Token {
        while (this.char !== null) {
            if (/\s/.test(this.char)) { this.advance(); continue; }

            // --- Yorum Satırı (TS Hataları Giderildi) ---
            if (this.char === '/' && this.input[this.pos + 1] === '/') {
                while (this.pos < this.input.length) {
                    const c = this.input[this.pos];
                    if (c === '\n' || c === '\r') break;
                    this.advance();
                }
                continue;
            }

            // --- Metin (String) ---
            if (this.char === '"') {
                this.advance();
                let res = "";
                while (this.char !== '"' && this.char !== null) { 
                    res += this.char; 
                    this.advance(); 
                }
                this.advance();
                return { type: TokenType.STRING, value: res };
            }

            if (/[0-9]/.test(this.char)) {
                let res = "";
                while (this.char !== null && /[0-9]/.test(this.char)) { res += this.char; this.advance(); }
                return { type: TokenType.NUMBER, value: res };
            }

            if (/[a-zA-Z]/.test(this.char)) {
                let res = "";
                while (this.char !== null && /[a-zA-Z0-9_]/.test(this.char)) { res += this.char; this.advance(); }
                if (res === "println") return { type: TokenType.PRINTLN, value: res };
                if (res === "print") return { type: TokenType.PRINT, value: res };
                if (res === "input") return { type: TokenType.INPUT, value: res };
                if (res === "if") return { type: TokenType.IF, value: res };
                if (res === "else") return { type: TokenType.ELSE, value: res };
                if (res === "while") return { type: TokenType.WHILE, value: res };
                return { type: TokenType.NAME, value: res };
            }

            if (this.char === "=") {
                this.advance();
                if (this.char === "=") { this.advance(); return { type: TokenType.EQ, value: "==" }; }
                return { type: TokenType.ASSIGN, value: "=" };
            }

            if (this.char === ">") { this.advance(); return { type: TokenType.GT, value: ">" }; }
            if (this.char === "<") { this.advance(); return { type: TokenType.LT, value: "<" }; }
            if (this.char === "+") { this.advance(); return { type: TokenType.PLUS, value: "+" }; }
            if (this.char === "-") { this.advance(); return { type: TokenType.MINUS, value: "-" }; }
            if (this.char === "*") { this.advance(); return { type: TokenType.MULTIPLY, value: "*" }; }
            if (this.char === "/") { this.advance(); return { type: TokenType.DIVIDE, value: "/" }; }
            if (this.char === "(") { this.advance(); return { type: TokenType.LPAREN, value: "(" }; }
            if (this.char === ")") { this.advance(); return { type: TokenType.RPAREN, value: ")" }; }
            if (this.char === "{") { this.advance(); return { type: TokenType.LBRACE, value: "{" }; }
            if (this.char === "}") { this.advance(); return { type: TokenType.RBRACE, value: "}" }; }
            throw new Error(`Karakter Tanınamadı: ${this.char}`);
        }
        return { type: TokenType.EOF, value: "" };
    }
}

class Interpreter {
    private variables = new Map<string, any>();

    run(tokens: Token[]) {
        let i = 0;
        while (i < tokens.length && tokens[i].type !== TokenType.EOF) {
            const current = tokens[i];

            // --- INPUT SİSTEMİ ---
            if (current.type === TokenType.NAME && tokens[i+1]?.type === TokenType.ASSIGN && tokens[i+2]?.type === TokenType.INPUT) {
                const varName = current.value;
                const prompt = tokens[i+4].value;
                const userInput = readline.question(prompt + " ");
                this.variables.set(varName, isNaN(Number(userInput)) ? userInput : Number(userInput));
                i += 6; continue; 
            }

            // --- PRINT (Yan Yana) ---
            if (current.type === TokenType.PRINT) {
                const res = this.getComplexVal(tokens, i + 2);
                process.stdout.write(String(res.value));
                i = res.nextIndex + 1; continue;
            }

            // --- PRINTLN (Alt Satıra) ---
            if (current.type === TokenType.PRINTLN) {
                const res = this.getComplexVal(tokens, i + 2);
                console.log(res.value);
                i = res.nextIndex + 1; continue;
            }

            if (current.type === TokenType.WHILE) {
                const condStart = i + 2; 
                let braceStart = i;
                while(tokens[braceStart].type !== TokenType.LBRACE) braceStart++;
                const blockEnd = this.getClosingBrace(tokens, braceStart + 1);
                while (this.evalCondition(tokens, condStart)) {
                    this.runInternal(tokens.slice(braceStart + 1, blockEnd - 1));
                }
                i = blockEnd; continue;
            }

            if (current.type === TokenType.IF) {
                const condStart = i + 2;
                let braceStart = i;
                while(tokens[braceStart].type !== TokenType.LBRACE) braceStart++;
                const blockEnd = this.getClosingBrace(tokens, braceStart + 1);
                if (this.evalCondition(tokens, condStart)) {
                    this.runInternal(tokens.slice(braceStart + 1, blockEnd - 1));
                    i = blockEnd;
                    if (tokens[i]?.type === TokenType.ELSE) i = this.getClosingBrace(tokens, i + 2);
                } else {
                    i = blockEnd;
                    if (tokens[i]?.type === TokenType.ELSE) {
                        const elseStart = i + 1;
                        const elseEnd = this.getClosingBrace(tokens, elseStart + 1);
                        this.runInternal(tokens.slice(elseStart + 1, elseEnd - 1));
                        i = elseEnd;
                    }
                }
                continue;
            }

            // --- ATAMA VE MATEMATİK / STRING BİRLEŞTİRME ---
            if (current.type === TokenType.NAME && tokens[i+1]?.type === TokenType.ASSIGN) {
                const varName = current.value;
                const result = this.getComplexVal(tokens, i + 2);
                this.variables.set(varName, result.value);
                i = result.nextIndex; continue;
            }
            i++;
        }
    }

    private getComplexVal(tokens: Token[], index: number): { value: any, nextIndex: number } {
        let val = this.getVal(tokens[index]);
        let j = index;
        while (tokens[j+1] && [TokenType.PLUS, TokenType.MINUS, TokenType.MULTIPLY, TokenType.DIVIDE].includes(tokens[j+1].type)) {
            const op = tokens[j+1];
            const rightVal = this.getVal(tokens[j+2]);
            if (op.type === TokenType.PLUS) val += rightVal;
            if (op.type === TokenType.MINUS) val -= rightVal;
            if (op.type === TokenType.MULTIPLY) val *= rightVal;
            if (op.type === TokenType.DIVIDE) val /= rightVal;
            j += 2;
        }
        return { value: val, nextIndex: j + 1 };
    }

    private evalCondition(tokens: Token[], start: number): boolean {
        const left = this.getVal(tokens[start]);
        const op = tokens[start + 1];
        const right = this.getVal(tokens[start + 2]);
        if (op.type === TokenType.GT) return left > right;
        if (op.type === TokenType.LT) return left < right;
        if (op.type === TokenType.EQ) return left === right;
        return false;
    }

    private getClosingBrace(tokens: Token[], index: number): number {
        let count = 1; let j = index;
        while (j < tokens.length && count > 0) {
            if (tokens[j].type === TokenType.LBRACE) count++;
            if (tokens[j].type === TokenType.RBRACE) count--;
            j++;
        }
        return j;
    }

    private runInternal(tokens: Token[]) {
        this.run([...tokens, { type: TokenType.EOF, value: "" }]);
    }

    private getVal(token: Token): any {
        if (token.type === TokenType.NUMBER) return parseInt(token.value);
        if (token.type === TokenType.STRING) return token.value;
        if (token.type === TokenType.NAME) return this.variables.get(token.value);
        return null;
    }
}

const args = process.argv.slice(2);
if (args[0]) {
    try {
        const code = fs.readFileSync(path.resolve(args[0]), 'utf-8');
        const tokens: Token[] = [];
        const lexer = new Lexer(code);
        let t = lexer.nextToken();
        while(t.type !== TokenType.EOF) { tokens.push(t); t = lexer.nextToken(); }
        tokens.push(t);
        new Interpreter().run(tokens);
    } catch (err) {
        console.error("Hata:", err);
    }
}