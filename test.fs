openWindow(800, 600, "FatihPaint - Cizim Modu")

// 1. ADIM: Ekrani baslangicta bir kez temizle (Dongu disinda!)
startDrawing()
clearCanvas()
endDrawing()

println("Cizim basladi! Sol tika bas ve boya.")

while (1 == 1) {
    // 2. ADIM: Mouse ve Tiklama bilgilerini al
    var x = getMouseX()
    var y = getMouseY()
    var basiliMi = isMouseButtonDown()

    // 3. ADIM: Sadece basiliysa ciz
    if (basiliMi == 1) {
        startDrawing()
        
        // Buraya clearCanvas() EKLEME! Eskiler kalsin.
        drawRect(x, y, 15, 15)
        
        endDrawing()
    }
}
