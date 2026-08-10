# Brand fonts

Die neun `.ttf`-Dateien liegen **nicht** in diesem Repo. Sie gehören
kanonisch nach [daimpad/nozilla-ci](https://github.com/daimpad/nozilla-ci)
(`project/fonts/`) und werden beim Deploy hierher kopiert — statt sie zu
duplizieren und in zwei Repos auseinanderlaufen zu lassen.

`fonts.css` (eine Ebene höher) erwartet sie genau hier.

## Holen

```bash
git clone --depth 1 https://github.com/daimpad/nozilla-ci /tmp/nz
cp /tmp/nz/project/fonts/*.ttf themes/nozilla/fonts/
```

Ohne FTP-Zugang zum Server: dieselben Dateien per Dateimanager nach
`themes/nozilla/fonts/` hochladen.

## Erwartete Dateien

```
Inter-Regular.ttf        Inter-Medium.ttf
Inter-SemiBold.ttf       Inter-Bold.ttf
ZillaSlab-Medium.ttf     ZillaSlab-SemiBold.ttf
ZillaSlab-Bold.ttf
SpaceMono-Regular.ttf    SpaceMono-Bold.ttf
```

## Fehlen sie?

Dann greifen die Fallbacks aus `style.css`:

| Rolle | Marke | Fallback |
|---|---|---|
| Display | Zilla Slab | Georgia · Times New Roman · serif |
| Body | Inter | system-ui · -apple-system · Segoe UI · Roboto |
| Mono | Space Mono | ui-monospace · SFMono-Regular · Menlo |

Farben, Formensprache, Abstände und Layout bleiben davon unberührt —
nur die Schrift ist dann nicht die der Marke.

## Lizenz

Alle drei Familien stehen unter der SIL Open Font License 1.1, siehe
`OFL.txt`. Die Lizenz erlaubt das Bündeln und Weitergeben mit Software,
solange die Fonts nicht für sich allein verkauft werden.
