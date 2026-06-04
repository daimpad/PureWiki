<?php
/**
 * PureWiki Theme — Nozilla Home Layout
 *
 * Full-page landing with dashboard/login tiles.
 * Set a page's Layout to "home" to activate this template.
 *
 * @package   PureWiki
 * @license   GNU AGPLv3
 */

defined('PUREWIKI') || die('Direct access denied.');

echo file_get_contents(__DIR__ . '/elements/header.php');
?>
<main class="nz-home">

    <section class="nz-home-hero container">
        <p class="nz-home-eyebrow">wiki.nozilla.net</p>
        <h1 class="nz-home-headline">Gute digitale Dienste.</h1>
    </section>

    <section class="nz-home-tiles container">
        <a href="<?php echo BASE_PATH; ?>/dashboard" class="nz-tile nz-tile--primary">
            <div class="nz-tile-icon">
                <iconify-icon icon="mdi:view-dashboard-outline" width="40" height="40"></iconify-icon>
            </div>
            <div class="nz-tile-body">
                <span class="nz-tile-label">Verwaltung</span>
                <strong class="nz-tile-title">Dashboard</strong>
                <span class="nz-tile-desc">Seiten bearbeiten, Einstellungen verwalten.</span>
            </div>
            <iconify-icon class="nz-tile-arrow" icon="mdi:arrow-right" width="24" height="24"></iconify-icon>
        </a>

        <a href="<?php echo BASE_PATH; ?>/dashboard/login" class="nz-tile">
            <div class="nz-tile-icon">
                <iconify-icon icon="mdi:login" width="40" height="40"></iconify-icon>
            </div>
            <div class="nz-tile-body">
                <span class="nz-tile-label">Zugang</span>
                <strong class="nz-tile-title">Anmelden</strong>
                <span class="nz-tile-desc">Mit deinem Konto einloggen.</span>
            </div>
            <iconify-icon class="nz-tile-arrow" icon="mdi:arrow-right" width="24" height="24"></iconify-icon>
        </a>
    </section>

    <div class="container pw-lang-switcher-container">{{ macro:lang_switcher }}</div>
    {{ virtual:_footer }}

</main>
<?php echo file_get_contents(__DIR__ . '/elements/footer.php'); ?>
