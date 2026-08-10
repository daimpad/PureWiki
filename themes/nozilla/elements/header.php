<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }}</title>
    <meta name="description" content="{{ description }}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
    <link rel="stylesheet" href="{{ theme_url }}fonts.css">
    <link rel="stylesheet" href="{{ theme_url }}style.css">
    <script src="{{ theme_url }}script.js" defer></script>
    {{ assets_head }}

    <script>
        // Apply the stored theme before first paint — no flash.
        (function () {
            var t = localStorage.getItem('nz-theme');
            if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
        })();
    </script>
</head>
<body>
    <header class="container-fluid pw-header">
        <nav>
            <ul>
                <li>
                    {{ macro:sidebar_toggle }}
                </li>
                {{ if wiki_logo }}
                <li><a href="{{ base_url }}" class="logo"><img src="{{ wiki_logo }}" alt="{{ wiki_name }}"></a></li>
                {{ else }}
                <li><strong><a href="{{ base_url }}" class="contrast nz-wordmark">{{ wiki_name }}</a></strong></li>
                {{ endif }}
            </ul>
            <ul class="pw-header-nav-right">
                {{ nav_links }}
                {{ macro:search }}
                <li class="pw-nav-keep">
                    <button class="pw-theme-toggle" id="pw-theme-toggle" aria-label="Theme wechseln" title="Theme wechseln">
                        <span class="pw-theme-icon pw-theme-icon-auto"  aria-hidden="true">AUTO</span>
                        <span class="pw-theme-icon pw-theme-icon-light" aria-hidden="true">HELL</span>
                        <span class="pw-theme-icon pw-theme-icon-dark"  aria-hidden="true">DUNKEL</span>
                    </button>
                </li>
            </ul>
        </nav>
    </header>

