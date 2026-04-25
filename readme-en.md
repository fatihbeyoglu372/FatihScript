# FatihScript v2.0 🚀

![FatihScript Logo](fatihscript-logo.png)

A lightweight, high-performance programming language interpreter built with TypeScript. Developed on Pardus Linux with a focus on low-level logic and graphics.

## 🛠️ Global Features
- **Graphics Engine:** Built-in support for windows and shapes via Raylib.
- **Input System:** Real-time keyboard support with `isKeyDown`.
- **Dynamic Memory:** Flexible variable management with `var`.
- **Loop Control:** Robust `while` loop implementation.
- **Pardus Native:** Optimized for Linux environments.

## 📜 Syntax Guide
```text
openWindow(800, 600, "FatihScript Demo")
var raketY = 250
// Control a paddle with W/S keys
var wPressed = isKeyDown(KEY_W)
drawRect(20, raketY, 15, 90)
```

## 🎮 Demo Project: Pong
To play the first official game created with FatihScript:
1. Install dependencies: `npm install`
2. Run the game: `ts-node interpreter.ts pong.fs`

## 🚀 Getting Started
```bash
# Install global requirements
sudo npm install -g ts-node typescript
npm install

# Run your script
ts-node interpreter.ts your_file.fs
```

## 🗺️ Roadmap
- [x] Raylib Graphics Integration
- [x] Real-time Keyboard Input
- [ ] User-defined Functions (func)
- [ ] Native Compilation (Binary Output)

---
*Created by Fatihbey - Developed on Pardus Linux*
