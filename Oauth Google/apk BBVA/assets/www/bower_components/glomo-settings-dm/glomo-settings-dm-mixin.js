/**
* @summary Data manager element for Glomo Settings.
* @customElement
* @polymer
* @extends {Polymer.Element}
*/

const GlomoSettingsDmMixin = window.GlomoSettingsDmMixin || {};

GlomoSettingsDmMixin.mixin = Polymer.dedupingMixin(base => {
  return class extends Polymer.mixinBehaviors([
    CellsBehaviors.i18nBehavior,
    CellsBehaviors.CellsCheckNestedKeysBehavior
  ], base) {
    static get properties() {
      return {
        /**
         * List fot buttons settings
         * @type {Array}
         */
        itemsButtons: {
          type: Array,
          value: () => []
        },
        /**
         * Settings menu items
         */
        itemsConfiguration: {
          type: Array,
          notify: true
        },

        /**
         * Country config items
         */
        items: {
          type: Array,
          value: () => []
        },
        /**
        * Filter items
        * @type Boolean
        */
        filterItems: {
          type: Boolean,
          value: false
        },
        /**
         * Status of permission for notifications.
         */
        notificationsState: {
          type: String,
          value: ''
        },
        /**
         * Wearable device name.
         */
        wearableName: {
          type: String,
          value: ''
        },
        /**
        * Array containing App Versions that doesn't have PLIN enabled
        */
        plinUnAvailableVersion: {
          type: Array,
          value: () => ([])
        },
        /**
         * Current App Version
         */
        appVersion: {
          type: String,
          value: ''
        },
        /**
         * Flags to enable/disable buttons
         */
        flags: {
          type: Object,
          value: () => ({})
        },
        /**
         * Mobile Service type obtained from local storage
         */
        mobileServices: {
          type: Object,
          value: () => ({})
        },
        /**
         * Flag to disable notifications in HMS
         */
        disabledNotificationsInHms: {
          type: Boolean
        },
        /**
         * Flag to remove notifications in HMS
         */
        removedNotificationsInHms: {
          type: Boolean
        },
        /**
         * Falg to ignore notificationsState value in component logic
         */
        ignoreNotificationsState: {
          type: Boolean,
          value: false
        },
        /**
         * Params to snackbar
         * @type object
         */
        toastSnackBarParams: {
          type: Object
        }
      };
    }

    static get observers() {
      return [
        '_settingsObserver(notificationsState,wearableName)',
        '_mobileServicesObserver(mobileServices.*)'
      ];
    }

    /**
     * @description updates the items in case the mobileServices property has values
     */
    _mobileServicesObserver(mobileServices) {
      if (mobileServices && Object.entries(mobileServices.value).length) {
        this.getItems();
      }
    }

    /**
     * @description sets array of plin unavailable versions
     */
    setPlinAvailabilityVersion(params) {
      this.plinUnAvailableVersion = params.lukitaAvailableVersion;
    }

    /**
     * @description sets plin availabilty in order to display the access or not to the plin operative
     * @returns {Boolean}
     */
    setDinamycPlinAvailability() {
      return (this.plinUnAvailableVersion || []).includes(this.appVersion);
    }

    _settingsObserver(notificationsState, wearableName) {
      if (notificationsState !== '' || wearableName !== '') {
        this.getItems();
      }
    }
    /**
     * Returns the items to show in settings page
     * @param {String} country
     */
    getItems() {
      const isPlinUnAvailable = this.setDinamycPlinAvailability();
      let notificationsButton = {
        id: 'notificationsSettings',
        icon: 'coronita:alarm',
        titleText: 'glomo-button-list-notifications',
        action: 'navigate',
        page: 'notificationsSettings',
        name: 'notifications'
      };
      if (!this.ignoreNotificationsState) {
        notificationsButton.text = `glomo-notification-state-${this.notificationsState ? 'enabled' : 'disabled'}`;
      }
      const aryButtons =
        [
          notificationsButton,
          ...(isPlinUnAvailable ? [] : [
            {
              id: 'mobileTransferPeerToPeerInfo',
              src: 'images/lukita-icon_blue.svg',
              titleText: 'glomo-button-list-plin-configuration',
              action: 'navigate',
              page: 'mobileTransferPeerToPeerInfo',
              name: 'p2pConfiguration'
            }
          ]),
          {
            id: 'operationalLimits',
            icon: 'coronita:limits',
            titleText: 'glomo-button-list-operation-configuration',
            action: 'navigate',
            page: 'operationalLimits',
            name: 'operations'
          },
          {
            id: 'configureProducts',
            icon: 'coronita:visualize',
            titleText: 'glomo-settings-products-hide',
            action: 'navigate',
            page: 'configureProductsPage',
            name: 'configure'
          },
          {
            id: 'channelSettings',
            icon: 'coronita:channels',
            titleText: 'glomo-settings-products-deactivate-cancel',
            action: 'navigate',
            page: 'channelSettings',
            name: 'channel'
          },
          {
            id: 'securitySettings',
            icon: 'coronita:lock',
            titleText: 'glomo-button-list-security-settings',
            text: '',
            action: 'navigate',
            page: 'securitySettings',
            name: 'security'
          },
          {
            id: 'settingsWearables',
            icon: 'coronita:watch',
            titleText: 'glomo-button-list-settings-wearables',
            text: this.wearableName || '',
            action: 'navigate',
            page: 'settingsWearables',
            name: 'wearables'
          },
          {
            id: 'securitytips',
            icon: 'coronita:communication',
            titleText: 'glomo-button-list-security-tips',
            text: '',
            action: 'navigate',
            page: 'securityTips',
            name: 'tips'
          },
          {
            id: 'appPermissions',
            icon: 'coronita:tasks',
            titleText: 'glomo-button-list-app-permissions',
            text: '',
            action: 'navigate',
            page: 'appPermissions',
            name: 'appPermissions'
          },
          {
            id: 'modoConfiguration',
            src: './images/modo/modo-blue.svg',
            titleText: 'glomo-button-list-modo-configuration',
            action: 'navigate',
            page: 'modoConfiguration',
            name: 'modo'
          },
          {
            id: 'otherBanks',
            icon: 'coronita:bank',
            titleText: 'glomo-button-list-other-banks',
            text: '',
            action: 'navigate',
            page: 'aggregationDashboard',
            name: 'otherBanks'
          },
          {
            id: 'mobilePayment',
            icon: 'coronita:mobilepayment',
            titleText: 'glomo-button-list-mobilepayment-settings',
            text: 'glomo-button-list-mobilepayment-settings-subtext',
            action: 'navigate',
            page: 'mobilePayment',
            name: 'mobilePayment'
          },
          {
            id: 'emergencyZone',
            icon: 'coronita:alert',
            titleText: 'glomo-button-list-emergency-zone',
            action: 'navigate',
            page: 'emergencyZone',
            name: 'emergency'
          },
          {
            id: 'servicesSettings',
            icon: 'coronita:services',
            titleText: 'glomo-button-list-services-settings',
            action: 'navigate',
            page: 'servicesSettings',
            name: 'servicesSettings'
          }
        ];
      if (this.filterItems) {
        this.itemsConfiguration = aryButtons.filter(button => this.items.some(item => {
          if (item.name === button.name) {
            Object.assign(button, item);
            return true;
          }
        }));
      } else {
        this.itemsConfiguration = aryButtons;
      }
      this._checkNotificationsStatus();
      this._checkDisabledOperations(this.itemsConfiguration, this.flags);
    }
    /**
     * Manages the action to take when a setting is clicked
     * @param {Object} setting
     */
    manageSetting(setting) {
      if (setting && setting.action && this[setting.action] instanceof Function) {
        this[setting.action](setting);
      }
    }
    /**
     * hide show-hide option from settings list
     * @param {Boolean} configApp
     */
    settingsConfigOption(configApp) {
      if (!configApp.showConfigPage) {
        this.set('itemsButtons', this.itemsButtons.filter(item => {
          return item.page !== 'configureProductsPage';
        }));
      }
      if (!configApp.featureLimit) {
        this.set('itemsButtons', this.itemsButtons.filter(item => {
          return item.page !== 'operationalLimitsPage';
        }));
      }
      if (!configApp.featureCancel) {
        this.set('itemsButtons', this.itemsButtons.filter(item => {
          return item.page !== 'channelSettings';
        }));
      }
      if (!configApp.featureNotificationsSettings) {
        this.set('itemsButtons', this.itemsButtons.filter(item => {
          return item.page !== 'notificationsSettingsPage';
        }));
      }
      if (!configApp.mobilePaymentSettings) {
        this.set('itemsButtons', this.itemsButtons.filter(item => {
          return item.page !== 'mobilePayment';
        }));
      }
      this._dispatchCustomEvent('set-button-list', this.itemsButtons);
      if (this.get('isMonoAdditionalUser', configApp || {})) {
        this._dispatchCustomEvent('send-is-mono-additional-user-value', configApp.isMonoAdditionalUser);
      }
    }
    /**
     * hide show-hide option from security settings list
     * @param {Array} configApp
     */
    securitySettingsConfigOption(configApp) {
      const itemsButtons = (configApp || []).length > 0
        ? this.itemsButtons.filter(item => configApp.includes(item.name))
        : [];

      this._dispatchCustomEvent('security-set-button-list', itemsButtons);
    }
    /**
     *Manage the send flag action
    * @param {Object} setting
    */
    receiveFlags(receiveflags) {
      if (receiveflags) {
        this.dispatchEvent(new CustomEvent('request-to-params', {
          detail: receiveflags,
          bubbles: true,
          composed: true
        }));
      }
    }

    /**
     * Dispatches event to navigate
     */
    navigate(setting = {}) {
      const pageName = setting.page || 'comingSoon';
      const continueParam = setting.continue || 'settings';
      this._dispatchCustomEvent('navigate-to-setting', { page: pageName, params: { continue: continueParam } });
    }

    /**
     * Dispatches event to call BBVA line number
     */
    callBBVALineNumber() {
      this._dispatchCustomEvent('call-bbva-atention-line-number', this.itemsButtons);
    }

    /**
     * Dispatches event to navigate BBVA line web
     */
    openUrl() {
      this._dispatchCustomEvent('navigation-to-web-bbva', this.itemsButtons);
    }

    /**
     * Dispatches event to open bottom modal
     */
    openBottomModal(detail) {
      if (detail) {
        this._dispatchCustomEvent('open-unregister-modal', detail);
      }
    }

    /**
    * Dispatches a new customEvent with the given name and detail.
    * Bubbles and composed are true by default
    * @param {String} eventName
    * @param {Any} detail event detail
    */
    _dispatchCustomEvent(eventName, detail, bubbles = true, composed = true) {
      this.dispatchEvent(new CustomEvent(eventName, { detail, bubbles, composed }));
    }

    /**
     * Check and set if operation is available or not from external availableOperations
     */
    _checkDisabledOperations(operations, availableOperations = {}) {
      this.itemsConfiguration = operations.map(op => {
        op.disabled = typeof availableOperations[op.id] === 'boolean' ? !availableOperations[op.id] : false;
        return op;
      });
    }
    /**
     * Removes or disables push notifications depending on type of Mobile Services and directive
     */
    _checkNotificationsStatus() {
      const isHmsOnly = this.mobileServices && this.mobileServices.isHmsOnly;
      if (isHmsOnly && this.removedNotificationsInHms) {
        this.itemsConfiguration = this.itemsConfiguration.filter(item => item.id !== 'notificationsSettings');
      }
      if (isHmsOnly && this.disabledNotificationsInHms) {
        this.flags.notificationsSettings = false;
      }
    }

    /**
     *
     * @param {Object} service
     * Set toastSnackBarMessage with serviceName and serviceStatus
     */
    setConfirmationMessage(service) {
      const serviceName = service.serviceName;
      const serviceStatus = service.serviceStatus;
      this._getToastSnackBarChangeStatus(serviceName, serviceStatus);
      this._dispatchCustomEvent('glomo-change-state-settings-message', this.toastSnackBarParams);
    }

    _getToastSnackBarChangeStatus(serviceName, serviceStatus) {
      this.set('toastSnackBarParams.message', this.t('glomo-service-settings-patch-success-message', '', { customizeServiceStatus: serviceStatus, customizeService: serviceName }));
    }

    /**
    * reset the dm
    */
    reset() {
      this.itemsConfiguration = [];
    }

    /**
     *
     * @param {Object} phoneCustomerNumber
     * @event facial-flags-channel
     * @description Fire an event to recover the facial update flag
     */
    customerIdPhone(phoneCustomerNumber = {}) {
      if (phoneCustomerNumber.phoneNumber) {
        this._dispatchCustomEvent('facial-flags-channel', {
          feature: 'enrollmentRefactor',
          module: 'cellsFacialRecognitionRegistration',
          user: phoneCustomerNumber.phoneNumber
        });
      }
    }

    /**
     *
     * @param {Object} payload
     * @description Modify itemsButtons array to redirect to nativo or cells flow
     */
    setFacialFlag(payload) {
      const facialFlagState = payload.isFlagEnable;
      const findPosition = (element) => element.name === 'reactivation';
      const reactivationIndex = this.itemsButtons?.findIndex(findPosition);
      this.itemsButtons[reactivationIndex].page = facialFlagState ? 'securityReactivation' : 'security-reactivation';
    }
  };
});
