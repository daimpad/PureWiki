/**
 * PureWiki Theme — nozilla Frontend Logic
 *
 * Theme toggle follows the CI convention: localStorage key "nz-theme",
 * data-theme on <html>, explicit choice overrides prefers-color-scheme.
 *
 * @package   PureWiki
 * @license   GNU AGPLv3
 */

document.addEventListener('DOMContentLoaded', () => {

    // Sticky header — a rule appears on scroll. No blur: the CI forbids glass.
    const header = document.querySelector('.pw-header');
    if (header) {
        const updateHeader = () => header.classList.toggle('pw-header-scrolled', window.scrollY > 20);
        window.addEventListener('scroll', updateHeader, { passive: true });
        updateHeader();
    }

    // Theme toggle: auto → light → dark → auto
    const themeBtn = document.getElementById('pw-theme-toggle');
    if (themeBtn) {
        const MODES = ['auto', 'light', 'dark'];

        const applyTheme = (mode) => {
            if (mode === 'auto') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.removeItem('nz-theme');
            } else {
                document.documentElement.setAttribute('data-theme', mode);
                localStorage.setItem('nz-theme', mode);
            }
        };

        themeBtn.addEventListener('click', () => {
            const current = localStorage.getItem('nz-theme') || 'auto';
            applyTheme(MODES[(MODES.indexOf(current) + 1) % MODES.length]);
        });
    }

    // Sidebar toggle
    const sidebarmenu = document.getElementById('pw-sidebarmenu');
    const sidebar     = document.getElementById('pw-sidebar-left');
    const backdrop    = document.getElementById('pw-sidebar-backdrop');

    if (sidebarmenu && sidebar && backdrop) {
        const toggleSidebar = (open) => {
            sidebar.classList.toggle('pw-sidebar-open', open);
            backdrop.classList.toggle('pw-sidebar-open', open);
            sidebarmenu.classList.toggle('pw-sidebarmenu-active', open);
            document.body.classList.toggle('pw-sidebar-noscroll', open);
        };

        sidebarmenu.addEventListener('click', () => toggleSidebar(!sidebar.classList.contains('pw-sidebar-open')));
        backdrop.addEventListener('click', () => toggleSidebar(false));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar.classList.contains('pw-sidebar-open')) toggleSidebar(false);
        });
    }

    // TOC scroll spy
    const tocLinks = document.querySelectorAll('.pw-toc-container a[href^="#"]');
    if (tocLinks.length > 0) {
        const headingIds = [];
        tocLinks.forEach(link => { const id = link.getAttribute('href').slice(1); if (id) headingIds.push(id); });

        const setActiveToc = (id) => {
            tocLinks.forEach(link => { const li = link.closest('li'); if (li) li.classList.remove('pw-toc-active'); });
            document.querySelectorAll('.pw-toc-container a[href="#' + id + '"]').forEach(a => {
                const li = a.closest('li'); if (li) li.classList.add('pw-toc-active');
            });
        };

        const observer = new IntersectionObserver(() => {
            let bestId = null, minTop = Infinity;
            headingIds.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top >= 105 && rect.top < window.innerHeight * 0.4 && rect.top < minTop) {
                        minTop = rect.top; bestId = id;
                    }
                }
            });
            if (bestId) setActiveToc(bestId);
        }, { rootMargin: '-100px 0px -50% 0px', threshold: 0 });

        headingIds.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    }

    // Pagelist toggle
    document.querySelectorAll('.pw-pagelist .pw-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault(); e.stopPropagation();
            const li = toggle.closest('li');
            if (!li) return;
            if (li.classList.contains('active') || li.classList.contains('open')) {
                li.classList.toggle('js-collapsed');
            } else {
                li.classList.toggle('js-expanded');
            }
        });
    });

    // Code copy — the icon swap is driven by the .success class in CSS
    document.querySelectorAll('.pw-code-copy').forEach(btn => {
        btn.addEventListener('click', async () => {
            const wrapper = btn.closest('.pw-code-wrapper');
            const code = wrapper && wrapper.querySelector('pre code');
            if (!code) return;
            try {
                await navigator.clipboard.writeText(code.innerText);
                btn.classList.add('success');
                setTimeout(() => btn.classList.remove('success'), 2000);
            } catch (err) {
                console.error('Kopieren fehlgeschlagen:', err);
            }
        });
    });

    // To-top button
    const toTopBtn = document.getElementById('pw-to-top');
    if (toTopBtn) {
        window.addEventListener('scroll', () => toTopBtn.classList.toggle('pw-visible', window.scrollY > 300), { passive: true });
        toTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Search
    const searchToggle   = document.getElementById('pw-search-toggle');
    const searchDropdown = document.getElementById('pw-search-dropdown');
    const searchInput    = document.getElementById('pw-search-input');
    const searchResults  = document.getElementById('pw-search-results');

    if (searchToggle && searchDropdown && searchInput && searchResults) {
        let searchTimer = null;

        const toggleSearch = (open) => {
            searchDropdown.classList.toggle('pw-open', open);
            if (open) {
                setTimeout(() => searchInput.focus(), 50);
            } else {
                searchInput.value = '';
                searchResults.innerHTML = '';
            }
        };

        searchToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSearch(!searchDropdown.classList.contains('pw-open'));
        });

        document.addEventListener('click', (e) => {
            if (!searchDropdown.contains(e.target) && e.target !== searchToggle) toggleSearch(false);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchDropdown.classList.contains('pw-open')) toggleSearch(false);
        });

        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimer);
            const q = searchInput.value.trim();
            if (!q) { searchResults.innerHTML = ''; return; }
            searchTimer = setTimeout(() => performSearch(q), 300);
        });

        const escapeHtml = (str) => {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        };

        async function performSearch(query) {
            try {
                const lang = window.PW_CURRENT_LANG || '';
                const res = await fetch((window.PW_BASE_PATH || '') + '/purewiki/api.php?action=search&q='
                    + encodeURIComponent(query) + '&lang=' + encodeURIComponent(lang));
                const data = await res.json();
                if (data.success && data.results) {
                    searchResults.innerHTML = data.results.length === 0
                        ? '<div class="pw-search-empty">Keine Ergebnisse.</div>'
                        : data.results.map(r =>
                            `<a href="${r.path}" class="pw-search-result-item">
                                <span class="pw-search-result-title">${escapeHtml(r.title)}</span>
                                <span class="pw-search-result-excerpt">${r.excerpt}</span>
                            </a>`).join('');
                }
            } catch (e) {
                searchResults.innerHTML = '<div class="pw-search-empty">Suche fehlgeschlagen.</div>';
            }
        }
    }
});
