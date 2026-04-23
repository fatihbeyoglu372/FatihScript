# 🚀 FatihScript

![FatihScript Logo](./fatihscript-logo.png)

```text
============================================================
                  FATİHSCRIPT DİLİ (v1.0)
                KULLANIM VE KOD KLAVUZU
============================================================

[PROJE TANIMI]
FatihScript, TypeScript tabanlı, hızlı ve modern bir dildir.
Kendi ekosistemini .fs dosyaları üzerinden kurar.

[KURULUM]
$ npm install -g ts-node typescript

[KULLANIM]
$ ts-node index.ts test.fs

------------------------------------------------------------
[FATİHSCRIPT KOD KLAVUZU]

1. Değişken Tanımlama:
   Değişkenlerinizi "değişken" anahtar kelimesiyle tanımlayın:
   Örnek: değişken sayı = 10;

2. Ekrana Yazdırma:
   Ekrana çıktı vermek için "printIn" komutunu kullanın:
   Örnek: printIn("Merhaba Dünya");

3. Karar Yapıları (if/else):
   Şartlı durumlar için if ve else bloklarını kullanın:
   Örnek:
   if (sayı > 5) {
       printIn("Sayı 5'ten büyüktür");
   } else {
       printIn("Sayı küçüktür");
   }

4. Dosya Yapısı:
   Kodlarınızı mutlaka '.fs' uzantılı dosyalarda saklayın.

5. VS Code Ayarı:
   Settings -> Files: Associations -> "*.fs": "fsharp"
------------------------------------------------------------

[PROJE YAPISI]
- index.ts             : Dilin ana çekirdek motoru.
- test.fs              : Örnek kod dosyası.
- fatihscript-logo.png : Resmi logo.
- package.json         : Sistem bağımlılıkları.

[GELİŞTİRİCİ]
Geliştiren: Fatihbey (@fatihbeyoglu372)
Konum: Konya, Türkiye 🇹🇷
============================================================
