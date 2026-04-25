openWindow(800, 600, "FatihScript Pro Pong")

// Değişkenler
var raketY = 250
var topX = 400
var topY = 300
var topHiziX = 5
var topHiziY = 5
var skor = 0

while (1 == 1) {
    startDrawing()
    clearCanvas()

    // 1. Kontroller (Artık if kullanıyoruz!)
    var wBasili = isKeyDown(KEY_W)
    var sBasili = isKeyDown(KEY_S)

    if (wBasili == 1) {
        var raketY = raketY - 7
    }
    if (sBasili == 1) {
        var raketY = raketY + 7
    }

    // 2. Top Hareketi
    var topX = topX + topHiziX
    var topY = topY + topHiziY

    // 3. Duvar Sekmeleri
    if (topY > 585) {
        var topHiziY = -5
        var topY = 584
    }
    if (topY < 5) {
        var topHiziY = 5
        var topY = 6
    }

    // 4. Sağ Duvar
    if (topX > 785) {
        var topHiziX = -5
        var topX = 784
    }

    // 5. Raket Çarpışma Mantığı (if ile daha temiz)
    if (topX < 40) {
        var raketAlt = raketY + 90
        
        if (topY > raketY) {
            if (topY < raketAlt) {
                var topHiziX = 5
                var topX = 45
                var skor = skor + 1
                println("Vuruldu! Skor:")
                println(skor)
            }
        }
    }

    // 6. Yanma Durumu
    if (topX < 0) {
        println("OYUN BITTI! Skorun:")
        println(skor)
        var topX = 400
        var topY = 300
        var skor = 0
    }

    // 7. Çizimler
    drawRect(20, raketY, 15, 90)
    drawRect(topX, topY, 15, 15)

    endDrawing()
}
