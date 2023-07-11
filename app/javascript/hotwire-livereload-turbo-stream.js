import received from "./lib/hotwire-livereload-received"

(() => {
  if(window.HotwireLivereload){ return; }

  var lastScrollTopPosition = null;

  window.HotwireLivereload = function({ target }) {
    const element = target.querySelector('template')?.content.getElementById('hotwire-livereload')

    if (element) {
      lastScrollTopPosition = document.documentElement.scrollTop;

      received({ force_reload: element.dataset.forceReload })
    }
  };

  document.addEventListener('turbo:before-stream-render', window.HotwireLivereload);
  document.addEventListener('turbo:visit', function() {
    if (lastScrollTopPosition) {
      document.documentElement.scrollTo(0, lastScrollTopPosition)
      lastScrollTopPosition = null
    }
  });
})();

