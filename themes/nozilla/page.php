<?php
/**
 * PureWiki Theme — Nozilla
 *
 * Paper-and-ink layout following the nozilla.net CI:
 * Papier-Gelb background, Tinte-Schwarz strokes, Signal-Grün for actions only.
 *
 * @package   PureWiki
 * @license   GNU AGPLv3
 */

defined('PUREWIKI') || die('Direct access denied.');

echo file_get_contents(__DIR__ . '/elements/header.php');
echo '<main class="container pw-main-container">';
echo '{{ if show_left_sidebar }}';
echo '<aside class="pw-virtual-sidebar pw-sidebar-left" id="pw-sidebar-left">';
echo '<div class="pw-sidebar-desktop-only">{{ virtual:left_sidebar }}</div>';
echo '<div class="pw-sidebar-mobile-only">{{ virtual:mobile_sidebar }}</div>';
echo '</aside>';
echo '{{ endif }}';
echo '<div class="pw-main-content">';
echo '{{ macro:breadcrumbs }}';
echo file_get_contents(__DIR__ . '/elements/content.php');
echo '{{ macro:prevnext }}';
echo '</div>';
echo '{{ if show_right_sidebar }}';
echo '<aside class="pw-virtual-sidebar pw-sidebar-right">';
echo '{{ virtual:right_sidebar }}';
echo '</aside>';
echo '{{ endif }}';
echo '<div class="pw-sidebar-backdrop" id="pw-sidebar-backdrop"></div>';
echo '</main>';
echo '<div class="container pw-lang-switcher-container">{{ macro:lang_switcher }}</div>';
echo '{{ virtual:_footer }}';
echo file_get_contents(__DIR__ . '/elements/footer.php');
