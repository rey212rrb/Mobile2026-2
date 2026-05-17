(function () {
  /**
   * INTERFAZ COMUNICACIÓN PLUGIN -> NATIVO
   */
  var EmailComposer = {
    isAvailable: function (success, fail) {
      window.CellsNativePlugins.pluginManager.execute(success, fail, 'EmailComposer', 'isAvailable');
    },
    open: function (options, success, fail) {
      window.CellsNativePlugins.pluginManager.execute(success, fail, 'EmailComposer', 'open', options);
    }
  };
  var AdobeAnalyticsData = {
    getNativeMcid(success, fail) {
      window.CellsNativePlugins.pluginManager.execute(success, fail, 'AdobeAnalyticsData', 'getmarketingcloudid');
    }

  };
  var MediaCapture = {
    getPicture: function (params, success, fail) {
      window.CellsNativePlugins.pluginManager.execute(success, fail, 'MediaCapture', 'getPicture', params);
    },
    getVideo: function (success, fail) {
      window.CellsNativePlugins.pluginManager.execute(success, fail, 'MediaCapture', 'getVideo');
    },
    startRecordingAudio: function (success, fail) {
      window.CellsNativePlugins.pluginManager.execute(success, fail, 'MediaCapture', 'startRecordingAudio');
    },
    stopRecordingAudio: function (success, fail) {
      window.CellsNativePlugins.pluginManager.execute(success, fail, 'MediaCapture', 'stopRecordingAudio');
    },
    getAudio: function (success, fail) {
      window.CellsNativePlugins.pluginManager.execute(success, fail, 'MediaCapture', 'getAudio');
    }
  };
  window.CellsNativePlugins = window.CellsNativePlugins || {};
  window.CellsNativePlugins.AdobeAnalyticsData = AdobeAnalyticsData;
  window.CellsNativePlugins.EmailComposer = EmailComposer;
  window.CellsNativePlugins.MediaCapture = MediaCapture;
})();
/*
window.CellsNativePlugins.EmailComposer.isAvailable(
  function(response) {
    console.log('success');
    console.log('response', response);
  },

  function(response) {
    console.log('error');
    console.log('response', response);
  });
 */