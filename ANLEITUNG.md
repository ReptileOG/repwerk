# Repwerk – so kommt die App auf dein Handy

Repwerk ist eine **Web-App zum Installieren** (PWA). Nach der Installation hat sie ein eigenes Icon
auf dem Startbildschirm, öffnet sich ohne Browserleiste, funktioniert **offline** und speichert alle
Daten **nur auf deinem Handy**. Es gibt kein Konto, keine Cloud und keine Abhängigkeit von Claude.

## Inhalt des Ordners

| Datei | Zweck |
|---|---|
| `index.html` | Die App |
| `app.js`, `app.css` | Programmlogik und Design |
| `manifest.webmanifest` | Name, Icon und Farben für den Startbildschirm |
| `sw.js` | Service Worker: macht die App offline-fähig |
| `icons/` | App-Icons |
| `tools/make_icons.py` | Erzeugt die Icons neu (optional) |

## Schritt 1: Die App online stellen (einmalig, kostenlos)

Damit ein Handy die App installieren kann, muss der Ordner einmal unter einer **https-Adresse**
liegen. Zwei einfache Wege:

**A) Netlify Drop (am schnellsten, ca. 2 Minuten)**
1. Öffne <https://app.netlify.com/drop> am PC und melde dich kostenlos an.
2. Zieh den kompletten Ordner `repwerk` auf die Seite.
3. Du bekommst eine Adresse wie `https://irgendwas.netlify.app`. Unter *Site settings* kannst du
   sie z. B. in `repwerk-deinname.netlify.app` umbenennen.

**B) GitHub Pages**
1. Leg auf GitHub ein neues Repository an und lade den Inhalt des Ordners `repwerk` hoch.
2. *Settings → Pages → Branch: main / root → Save*.
3. Nach etwa 1 Minute läuft die App unter `https://DEINNAME.github.io/REPO/`.

## Schritt 2: Auf dem Handy installieren

**Android (Chrome)**
1. Öffne die Adresse in Chrome.
2. Tippe auf **„App installieren“**. Das steht entweder im Banner unten, im Menü ⋮ oder in der
   App unter *Mehr*.
3. Repwerk liegt jetzt im App-Drawer und auf dem Startbildschirm.

**iPhone (Safari)**
1. Öffne die Adresse in **Safari**.
2. Tippe auf **Teilen** (Quadrat mit Pfeil) → **„Zum Home-Bildschirm“** → **Hinzufügen**.

Danach brauchst du die Webseite nicht mehr. Die App startet vom Icon und läuft auch offline.

## Deine Daten

- Alles wird im Speicher der App auf dem Gerät abgelegt.
- **Backup:** *Profil → Backup speichern* erzeugt eine `.json`-Datei. Mit
  *Backup laden* spielst du sie auf einem anderen Handy wieder ein.
- Achtung: Wenn du die App deinstallierst oder die Website-Daten im Browser löschst, sind die
  Einträge weg. Mach deshalb ab und zu ein Backup.

## Updates

Wenn du etwas an den Dateien änderst:
1. In `sw.js` die Zeile `const VERSION = "repwerk-v7";` hochzählen (v8, v9 …).
2. Den Ordner neu hochladen (Netlify: erneut draufziehen; GitHub: Dateien ersetzen).
3. Auf dem Handy erscheint beim nächsten Öffnen **„Neue Version verfügbar“**. Die Daten bleiben
   dabei erhalten.

## Optional: In den Play Store / App Store

Wenn Repwerk online ist, kannst du mit <https://www.pwabuilder.com> daraus ein Android-Paket für
den Google Play Store (einmalig 25 $ Entwicklergebühr) oder ein Xcode-Projekt für den App Store
(Apple-Entwicklerkonto, 99 $/Jahr, Mac nötig) erzeugen. Für die eigene Nutzung reicht die
Installation aus Schritt 2 völlig.

## Lokal am PC testen

```powershell
python -m http.server 8765 --directory repwerk
```
Dann im Browser `http://localhost:8765` öffnen.
