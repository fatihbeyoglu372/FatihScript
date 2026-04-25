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

    // 1. Kontroller
    var wBasili = isKeyDown(KEY_W)
    var sBasili = isKeyDown(KEY_S)

    while (wBasili == 1) {
        var raketY = raketY - 7
        var wBasili = 0 
    }
    while (sBasili == 1) {
        var raketY = raketY + 7
        var sBasili = 0
    }

    // 2. Top Hareketi
    var topX = topX + topHiziX
    var topY = topY + topHiziY

    // 3. Duvar Sekmeleri (Alt ve Üst)
    while (topY > 585) {
        var topHiziY = -5
        var topY = 584 // Sıkışmaması için biraz geri çektik
    }
    while (topY < 5) {
        var topHiziY = 5
        var topY = 6
    }

    // 4. Sağ Duvar (Sektirme)
    while (topX > 785) {
        var topHiziX = -5
        var topX = 784
    }

    // 5. Raket Çarpışma Mantığı (Basitleştirilmiş)
    // Top sol tarafa (raket hizasına) geldi mi?
// 5. Raket Çarpışma Mantığı (FIXED)
    while (topX < 40) {
        var raketAlt = raketY + 90
        
        // Sadece top raketin dikey hizasındaysa sektir
        while (topY > raketY) {
            while (topY < raketAlt) {
                var topHiziX = 5     // Yönü sağa çevir
                var topX = 45        // KRİTİK: Topu raketin dışına fırlat (Sonsuz döngüyü kırar)
                var skor = skor + 1
                log("Vuruldu!")
                
                // Döngüden güvenli çıkış için yardımcı değişkenleri sıfırla
                var raketAlt = -1
                var topY = -1
            }
        }
        // Eğer vuramadıysa ve raketin arkasına geçtiyse, 
        // ana döngüye devam etmesi için topX'i 41 yapalım (Yoksa kilitlenir)
        var topX = 41 
    }

    // 6. Yanma Durumu
    while (topX < 5) {
        log("OYUN BITTI! Skorun:")
        log(skor)
        var topX = 400
        var topY = 300
        var skor = 0
    }

    // 7. Çizimler
    drawRect(20, raketY, 15, 90)
    drawRect(topX, topY, 15, 15)

    endDrawing()
}
