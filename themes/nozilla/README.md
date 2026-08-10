# nozilla — PureWiki Theme

Setzt die nozilla Corporate Identity für wiki.nozilla.net um.

**Quelle der Wahrheit:** [daimpad/nozilla-ci](https://github.com/daimpad/nozilla-ci)
· `design-system.css` (Tokens + Komponenten) · `README.md` (Regeln)

## Aktivieren

Admin → Einstellungen → Design → Theme → **nozilla**

Für die Startseite: Seiteneinstellungen → Layout → `home`

## Was hier drin ist

| Datei | Zweck |
|---|---|
| `style.css` | Frontend — Tokens, Pico-Bridge, alle `.pw-*` Komponenten |
| `script.js` | Theme-Toggle, Sidebar, TOC-Spy, Suche, Copy |
| `page.php` | Standard-Layout |
| `home.php` | Startseite mit Kacheln |
| `elements/` | header · footer · content |
| `admin-dashboard.css` | Dashboard-Override (eingebunden via `purewiki/admin/layout_head.php`) |
| `fonts.css` + `fonts/` | Zilla Slab · Inter · Space Mono, selbst gehostet (SIL OFL) |
| `icons/` | 13 nozilla-SVGs, je als Light/Dark-Paar |

## Token-Architektur

Drei Ebenen, wie im Design-System:

1. **Primitives** — `--nz-c-green`, `--nz-c-paper`, `--nz-c-ink-900` …
2. **Semantic** — `--nz-bg`, `--nz-surface`, `--nz-text`, `--nz-line`, `--nz-signal`
3. **Pico-Bridge** — mappt `--pico-*` auf die semantischen Tokens

Ein Theme-Wechsel tauscht die Map, nicht die Komponenten.

## Theming

Light ist Default. Dark greift über `prefers-color-scheme` oder explizit
per `data-theme` (überschreibt das OS). Persistenz: `localStorage['nz-theme']`
— dieselbe Konvention wie im CI-Repo.

Dark ist **warm**: Near-Black `#0C0C0A`, Text wird Papier `#FFFEE5`, harte
Schatten werden papierfarben. Signal-Grün bleibt in beiden Themes konstant.

## Icons

Die 13 benötigten Icons stammen aus dem 462er-Set des CI-Repos (Dialekt A:
4px Kontur, square caps, miter joins, grüner Signaturpunkt unten rechts).

Jedes Icon liegt zweimal vor: `nz-<name>.svg` (Tinte-Kontur) und
`nz-<name>-dark.svg` (Papier-Kontur). Der grüne Signaturpunkt bleibt in
beiden gleich — er ist die Marke des Sets, keine Themefarbe.

Ein CSS-Layer ersetzt die Iconify-`mdi:`-Glyphen der PureWiki-Macros
(Suche, Prev/Next, Callouts, Copy) über `::before` — ohne eine Core-Datei
anzufassen.

## Bewusste Abweichungen vom CI

| Punkt | CI-Regel | Hier | Grund |
|---|---|---|---|
| Dashboard-Hintergrund | Papier-Gelb `#FFFEE5` | Weiß `#FFFFFF` | Neutrale Arbeitsfläche, ausdrücklich so entschieden. Das Frontend nutzt Papier. |
| Footer-Symbol | „Keine Emoji. Nie." | `❤` im Brand-Link | Ausdrücklich so bestellt. |
| Dashboard-Icons | Keine fremden Icon-Sets | Iconify `mdi:` | Die Admin-Oberfläche streut Iconify quer über viele Core-PHP-Dateien. Ein Austausch würde die update-sichere Trennung brechen. Das Frontend ist vollständig auf nozilla-Icons umgestellt. |
| PicoCSS | — | Weiter per CDN | PureWikis Markup setzt Pico voraus; alle sichtbaren Werte sind überschrieben. |

## Fonts nachlegen

Die neun `.ttf`-Dateien sind bewusst **nicht** im Repo — sie liegen
kanonisch in [nozilla-ci](https://github.com/daimpad/nozilla-ci)
(`project/fonts/`) und werden beim Deploy hierher kopiert, statt ~1,9 MB
über zwei Repos zu duplizieren.

```bash
git clone --depth 1 https://github.com/daimpad/nozilla-ci /tmp/nz
cp /tmp/nz/project/fonts/*.ttf themes/nozilla/fonts/
```

Fehlen sie, greifen die Fallbacks (Georgia · system-ui · Menlo) — Farben,
Formensprache und Layout bleiben korrekt, nur die Schrift ist nicht die
der Marke. Details in [`fonts/README.md`](./fonts/README.md).

## Update-Hinweis

`purewiki/admin/layout_head.php` trägt **eine** Zeile, die
`admin-dashboard.css` nachlädt. Nach einem PureWiki-Update muss sie wieder
rein:

```php
<link rel="stylesheet" href="<?php echo BASE_PATH; ?>/themes/nozilla/admin-dashboard.css">
```

Alles andere in diesem Ordner ist update-sicher.
