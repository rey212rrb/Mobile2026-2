/*eslint-disable */
(function (document) {
  /*eslint-enable */
  'use strict';

  const appConfig = window.AppConfig;
  window.targetGlobalSettings = {
    secureOnly: true
  };

  function loadTargetManager(cb) {
    var script = document.createElement('script');
    script.onload = cb || null;
    script.src = `${appConfig.componentsPath}cells-adobe-target/dist/cells-adobe-target-manager.js`;
    script.async = 1;
    document.head.appendChild(script);
  }

  function initTarget() {
    const targetManager = window.adobeTargetManager({
      projectName: 'glomo',
      platform: 'app',
      triggerMboxOnLoad: false,
      scriptLocation: 'vendor/adobe-target.js',
      channels: {
        loadChannel: 'parse-route',
        pageChannel: 'parse-route',
        loaderChannel: 'template-transition-end',
        mboxChannel: 'template-registered'
      },
      parsers: {
        pageChannel: data => (data.detail || {}).name
      }
    });
    targetManager.init();
    window.adobeTarget = {};
    window.adobeTarget.getPageName = targetManager.getPageName;
  }

  loadTargetManager(initTarget);
})(document);