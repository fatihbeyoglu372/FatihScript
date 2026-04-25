```text
# 🚀 FatihScript (v3.0)

![FatihScript Logo](fatihscript-logo.png)

FatihScript, Pardus ve Debian tabanlı sistemler için geliştirilmiş, düşük seviyeli mantık ile yüksek seviyeli yazım kolaylığını birleştiren yerli ve milli bir interpreter dilidir. Raylib motoru üzerine inşa edilmiştir.

---

## ✨ Yenilikler (v3.0)
- ⌨️ Terminal Input: Artık input() komutu ile kullanıcıdan veri alabilirsiniz.
- 🖱️ Mouse Desteği: getMouseX(), getMouseY() ve isMouseButtonDown() eklendi.
- 🛡️ PollInputEvents: İşletim sistemiyle iletişim güçlendirildi, donma sorunları giderildi.
- 📏 PrintLine: Sadece println() standardı getirildi.

---

## 🛠️ Kurulum
FatihScript'i çalıştırmak için Node.js ve gerekli kütüphaneleri kurun:

# Komut:
npm install raylib readline-sync

# Programı Başlatmak İçin:
ts-node interpreter.ts test.fs

---

## 🎮 Örnek Kod (Boyama Uygulaması)

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

## 👨‍💻 GELİŞTİRİCİ:
# Fatihbey (@fatihbeyoglu372)
Pardus üzerinde sistem programlama ve oyun motoru mimarisi tutkunu.
