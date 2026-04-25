# FatihScript v2.0 🚀

![FatihScript Logo](fatihscript-logo.png)

TypeScript ile geliştirilmiş, hafif ve güçlü bir programlama dili yorumlayıcısı. Pardus Linux üzerinde, düşük seviyeli sistem mantığıyla inşa edilmiştir.

## 🛠️ Global Özellikler
- **Grafik Motoru:** Raylib entegrasyonu ile pencere ve şekil desteği.
- **Klavye Kontrolü:** `isKeyDown` ile gerçek zamanlı oyun mekanikleri.
- **Dinamik Bellek:** `var` ile esnek değişken yönetimi.
- **Döngüler:** Tam `while` döngüsü desteği.
- **Pardus Native:** Yerli Linux dağıtımında tam performans.

## 📜 Sözdizimi (Syntax) Örneği
```text
openWindow(800, 600, "FatihScript Test")
var x = 100
while (x < 400) {
    startDrawing()
    clearCanvas()
    drawRect(x, 200, 50, 50)
    endDrawing()
    var x = x + 1
}
```

## 🎮 İlk Proje: Pong
FatihScript ile yazılmış ilk gerçek oyun olan **Pong**'u çalıştırmak için:
1. Gerekli kütüphaneleri kur: `npm install`
2. Oyunu başlat: `ts-node interpreter.ts pong.fs`

## 🚀 Kurulum ve Çalıştırma
```bash
# Bağımlılıkları kurun
sudo npm install -g ts-node typescript
npm install

# Kendi kodunuzu çalıştırın
ts-node interpreter.ts dosya_adin.fs
```

## 🗺️ Yol Haritası
- [x] Raylib Grafik Desteği
- [x] Klavye Kontrolleri
- [ ] Fonksiyon Tanımlama (func)
- [ ] Native Compiler (Binary Çıktısı)

---
*Fatihbey tarafından geliştirildi - Pardus Linux üzerinde kodlandı*
