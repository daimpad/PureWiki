<!DOCTYPE html>
<html lang="de" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }}</title>
    <meta name="description" content="{{ description }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Space+Mono:wght@700&family=Zilla+Slab:wght@700&display=swap">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
    <link rel="stylesheet" href="{{ theme_url }}style.min.css">
    <script src="{{ theme_url }}script.min.js" defer></script>
    {{ assets_head }}
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
            </ul>
        </nav>
    </header>

