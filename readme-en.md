```text
# 🚀 FatihScript (v3.0)

![FatihScript Logo](fatihscript-logo.png)

FatihScript is a native and powerful interpreter language developed for Pardus and Debian-based systems. It combines low-level logic with high-level syntax simplicity, built on top of the Raylib engine.

---

## ✨ What's New (v3.0)
- ⌨️ Terminal Input: You can now get user data using the input() command.
- 🖱️ Mouse Support: Added getMouseX(), getMouseY(), and isMouseButtonDown().
- 🛡️ PollInputEvents: Strengthened OS communication, fixing "Not Responding" issues.
- 📏 PrintLine: Standardized output with the println() function.

---

## 🛠️ Installation
To run FatihScript, install Node.js and the required libraries:

# Install Dependencies:
npm install raylib readline-sync

# Start the Program:
ts-node interpreter.ts test.fs

---

## 🎮 Sample Code (Painting Application)

openWindow(800, 600, "FatihPaint")
startDrawing()
clearCanvas()
endDrawing()

while (1 == 1) {
    startDrawing()
    var mx = getMouseX()
    var my = getMouseY()
    if (isMouseButtonDown() == 1) {
        drawRect(mx, my, 10, 10)
    }
    endDrawing()
}

---

## 👨‍💻 DEVELOPER:
# Fatihbey (@fatihbeyoglu372)
System programming and game engine architecture enthusiast on Pardus Linux.
