export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });
}

(function() {
  function addFooterSocial() {
    try {
      // Locate the grid container holding the 4 columns
      var grid = document.querySelector('.footersection .columns.block.columns-4-cols > div');
      if (!grid) return;

      // Get the 4th column (index 3)
      var cols = grid.children;
      if (!cols || cols.length < 4) return;
      var col4 = cols[3];

      // Avoid duplicates if script runs more than once
      if (col4.querySelector('.social')) return;

      // Create social container
      var social = document.createElement('div');
      social.className = 'social';
      social.setAttribute('aria-label', 'Social media');

      // Utility to build a link button
      function makeIcon(href, cls, label) {
        var a = document.createElement('a');
        a.className = 'icon ' + cls;
        a.href = href;
        a.target = '_blank';
        a.rel = 'noopener';
        a.setAttribute('aria-label', label);
        a.title = label;
        return a;
      }

      // TODO: replace with your real profile URLs
      var links = [
        { href: 'https://facebook.com/yourpage',  cls: 'fb', label: 'Facebook' },
        { href: 'https://x.com/yourprofile',      cls: 'x',  label: 'X (Twitter)' },
        { href: 'https://instagram.com/yourprofile', cls: 'ig', label: 'Instagram' },
        { href: 'https://linkedin.com/company/yourcompany', cls: 'li', label: 'LinkedIn' },
        { href: 'https://youtube.com/@yourchannel', cls: 'yt', label: 'YouTube' }
      ];

      links.forEach(function(l) { social.appendChild(makeIcon(l.href, l.cls, l.label)); });

      // Append to the end of column 4
      col4.appendChild(social);
    } catch (e) {
      // Silently fail to avoid console noise in production; log if you want
      // console.warn('Footer social injection failed:', e);
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addFooterSocial);
  } else {
    addFooterSocial();
  }

  // Optional: If your CMS lazy-loads the footer later, observe and retry
  var obsTarget = document.querySelector('.footersection');
  if (window.MutationObserver && obsTarget) {
    var once = false;
    var mo = new MutationObserver(function() {
      if (!once) { addFooterSocial(); once = true; }
    });
    mo.observe(obsTarget, { childList: true, subtree: true });
    // Disconnect after a short delay to prevent overhead
    setTimeout(function(){ try { mo.disconnect(); } catch(e){} }, 5000);
  }
})();