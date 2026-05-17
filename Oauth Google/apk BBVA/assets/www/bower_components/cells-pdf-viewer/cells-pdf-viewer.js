function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

{
  var _Polymer = Polymer,
      html = _Polymer.html;
  /**
    `<cells-pdf-viewer>` Description.
     Example:
     ```html
    <cells-pdf-viewer></cells-pdf-viewer>
    ```
     ## Styling
    The following custom properties and mixins are available for styling:
     ### Custom Properties
    | Custom Property     | Selector | CSS Property | Value       |
    | ------------------- | -------- | ------------ | ----------- |
    | --cells-fontDefault | :host    | font-family  |  sans-serif |
    ### @apply
    | Mixins    | Selector | Value |
    | --------- | -------- | ----- |
    | --cells-pdf-viewer | :host    | {} |
     * @customElement
    * @polymer
    * @extends {Polymer.Element}
    * @demo demo/index.html
  */

  var CellsPdfViewer = /*#__PURE__*/function (_Polymer$mixinBehavio) {
    babelHelpers.inherits(CellsPdfViewer, _Polymer$mixinBehavio);

    var _super = _createSuper(CellsPdfViewer);

    function CellsPdfViewer() {
      babelHelpers.classCallCheck(this, CellsPdfViewer);
      return _super.apply(this, arguments);
    }

    babelHelpers.createClass(CellsPdfViewer, [{
      key: "_srcChanged",
      value:
      /**
       * Observer called on src change
       * @param {String} newVal
       * @param {String} oldVal
       */
      function _srcChanged(newVal, oldVal) {
        if (newVal && typeof newVal === 'string') {
          var bytes = this.createBytesArray(newVal);
          var url = this.createBlobUrl(bytes);
          this.setViewerPath(url);
        }
      }
      /**
       * converts base64 to bytes arry from it's binary data
       * @param {String} base64
       * @return {Array} bytes array from pdf binary data
       */

    }, {
      key: "createBytesArray",
      value: function createBytesArray(base64) {
        var binaryFromBase64 = atob(base64);
        var bytes = new Uint8Array(binaryFromBase64.length);
        bytes.forEach(function (byte, index) {
          return bytes[index] = binaryFromBase64.charCodeAt(index);
        });
        return bytes;
      }
      /**
       * creates blob url from bytes array
       * @param {Array} bytes
       * @return {String} url from Object Url
       */

    }, {
      key: "createBlobUrl",
      value: function createBlobUrl(bytes) {
        var blob = new Blob([bytes], {
          type: ''
        });
        return URL.createObjectURL(blob);
      }
      /**
       * Sets PDF viewer path with blob url
       * @param {String} url
       */

    }, {
      key: "setViewerPath",
      value: function setViewerPath(url) {
        this.path = this.resolveUrl(this.viewerPath) + encodeURIComponent(url);
      }
    }], [{
      key: "is",
      get: function get() {
        return 'cells-pdf-viewer';
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          /**
           * takes base64 as a src for rendering PDF
           * @type {String}
           */
          src: {
            type: String,
            notify: true,
            observer: '_srcChanged'
          },

          /**
           * relative path to iframe to embed PDFJS viewer
           * @type {String}
           */
          path: {
            type: String
          },

          /**
           * pdf viewer path resolves to pdfjs/web/viewer.html
           * @type {String}
           */
          viewerPath: {
            type: String,
            notify: true
          }
        };
      }
    }]);
    return CellsPdfViewer;
  }(Polymer.mixinBehaviors([CellsBehaviors.i18nBehavior], Polymer.Element));

  customElements.define(CellsPdfViewer.is, CellsPdfViewer);
}