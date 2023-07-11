import received from "./lib/hotwire-livereload-received"

(() => {
  if(window.HotwireLivereload){ return; }

  window.HotwireLiveReloadLastScrollTopPosition = null;
  window.HotwireLivereload = function({ target }) {
    const element = target.querySelector('template')?.content.getElementById('hotwire-livereload')

    if (element) {
      window.HotwireLiveReloadLastScrollTopPosition = document.documentElement.scrollTop;
      received({ force_reload: element.dataset.forceReload })
    }
  };

  document.addEventListener('turbo:before-stream-render', window.HotwireLivereload);
  document.addEventListener('turbo:load', function() {
    document.documentElement.scrollTo(0, window.HotwireLiveReloadLastScrollTopPosition)
  });
})();
