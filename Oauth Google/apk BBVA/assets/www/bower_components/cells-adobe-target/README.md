# &lt;cells-adobe-target&gt;

Allows A/B testing through Adobe Target tool in predefined pages

# !!! IMPORTANT !!!
**PLEASE IGNORE THE ROOT `cells-adobe-target.js` and `cells-adobe-target.html`.**
**The main code for the manager is the `cells-adobe-target-manager.js` inside the `dist` folder**
Until we implement the new version in all mobile apps/websites we will keep the "component" version of the manager but it will be remove as soon as is safe to do so.

Example of initialization inside a cells-app:
```
(function(document) {
  'use strict';

  const appConfig = window.AppConfig;

  // We don't initialize the manager if an specific flag exits.
  // Use to avoid the library to interfere with e2e testing
  if (appConfig.adobeTargetDisabled) {
    return;
  }
  // Force the request to Adobe to be https
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
      scriptLocation: 'scripts/vendor/adobe-target.js',
      projectName: 'glomo',
      platform: 'mobile',
      channels: {
        loadChannel: 'nav-request',
        pageChannel: 'nav-request',
        loaderChannel: 'template-transition-end',
        mboxChannel: 'template-registered'
      },
      parsers: {
        pageChannel: (data) => (data.detail || {}).detail.page
      }
    });
    targetManager.init();
    window.adobeTarget = {};
    window.adobeTarget.getPageName = targetManager.getPageName;
  }

  loadTargetManager(initTarget);
}(document));
```

## Setup & Requirements
  - The manager expects that `window.adobe` exists to load the Adobe Target Library and then before trying to pull an offer/experiment it checks if `window.adobe.target` is defined and that `window.adobe.target.triggerView` is a `function`.

  - `scriptLocation` property determines the location of the adobe-target library to be loaded when needed. By default is `scripts/vendor/adobe-target.js`

  - `projectName` string to help distinguish the mboxes on the Adobe Target backend. Ex: glomo, gema, pet-insurance.

  - `platform` property determines the type of platform to help distinguish the mboxes on the Adobe Target backend. Ex: web, mobile.

  - `channels` property determines the type of platform to help distinguish the mboxes on the Adobe Target backend. Ex: web, mobile.

  - `parsers` property determines the type of platform to help distinguish the mboxes on the Adobe Target backend. Ex: web, mobile.


  - `window.targetExperimentsLocation`  has to be an array like this:
  ```
  window.targetExperiencesLocation = [
    {
      name: 'about'
    },
    {
      name: 'fundsList',
      channel: 'funds-loaded',
      forceAntiFlickering: true,
      delay: 5000
    },
    {
      name: "whatsNew",
      channel: [
        "template-registered",
        "send-data"
      ]
    }
  ]
  ```
  - `name`(required) determines the page tha has an offer/experiment

  - `channel`(optional) determines the event or events to bind the experiment. Ex: by default `template-registered` will be use to check if the current page has an experiment and communicate with  Adobe Target. Accepts strings and arrays with string or objects. A channel config accepts: 
    - `keepListening`(optional) determines if we want to continue listening to an event
    - `forceAntiFlickering`(optional) determines if we want to apply the anti flickering mechanisim every time that test is fired
    - `delay`(optional) by default 3000. It determines the amount of time to wait to set back the document opacity to 1 after settings the document opacity to 0 when fetching the experiment

    Some examples:

  ```
  window.targetExperiencesLocation = [
    {
      name: 'fundsList',
      channel: {
        name: 'funds-loaded',
        keepListening: true
        forceAntiFlickering: true,
        delay: 500
      }
    },
     {
      name: 'otherPage',
      channel: [
        {
          name: 'funds-loaded',
        },
        'another-string-event'
      ]
    },
     {
      name: 'lastPage',
      channel: 'another-string-event'
    }
  ]
  ```


  - `forceAntiFlickering`(optional) determines if we want to apply the anti flickering mechanisim every time, by default once the experiment is applied, it won't apply antiflickering on that  page during the session

  - `delay`(optional) by default 3000. It determines the amount of time to wait to set back the document opacity to 1 after settings the document opacity to 0 when fetching the experiment

  This array is set up on the Adobe backend tool to let the cells-app know what pages have experiments to run to allow adobe target library to be loaded dynamically and the communication to get and set offers.

