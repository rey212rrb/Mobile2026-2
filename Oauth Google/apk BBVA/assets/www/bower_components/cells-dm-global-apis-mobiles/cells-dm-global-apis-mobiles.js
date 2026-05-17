/**
* @summary Mobiles DataManager.
* @customElement
* @polymer
* @extends {Polymer.Element}
*/
/* global BGADPMobiles */
/*eslint new-cap: 0*/
class CellsDmGlobalApisMobiles extends Polymer.mixinBehaviors([
  CellsBehaviors.i18nBehavior,
  CellsBehaviors.StepManagerBehavior,
  CellsBehaviors.CellsGlobalApisHandleRequest,
  CellsBehaviors.CellsGlobalApisHandleRequestSign,
  CellsBehaviors.CellsGlobalApisHandleRequestError,
  CellsBehaviors.CellsGlobalApisServiceGetter
], Polymer.Element) {

  static get is() {
    return 'cells-dm-global-apis-mobiles';
  }

  static get properties() {
    return {
      properties: {
        /**
         * Chosen host to make requests to
         * @type {String}
         */
        host: {
          type: String
        },

        /**
        * Mobiles API version
        * @type {String}
        */
        mobilesApiVersion: {
          type: String,
          value: '0'
        },

        providers: {
          type: Object,
          notify: true
        },

        providerAmounts: {
          type: Object,
          notify: true
        },
        /**
         * Local currency
         * @type {String}
         */
        localCurrency: String,
        /**
        * Native request
        */
        native: {
          type: Boolean,
          value: false
        },
        /**
         * Type of token
         */
        requiredToken: {
          type: String,
          value: 'tsec'
        },
        /**
        * Token used when the operation required second token authentication
        */
        secondFactorToken: {
          type: String
        }
      }
    };
  }

  /**
  * Dispatches a new customEvent with the given name and detail.
  * Bubbles and composed are true by default
  * @param {String} eventName
  * @param {Any} detail event detail
  */
  _dispatchCustomEvent(eventName, detail, bubbles = true, composed = true) {
    this.dispatchEvent(new CustomEvent(eventName, {detail, bubbles, composed}));
  }

  /**
   * Constructs the body to send to mobiles/v0/top-ups
   * @param {Object} source
   * @param {Object} destination
   * @param {Object} amount
   * @param {Object} frequentOperationId
   * @param {Object} simulatedOperationNumber
   * @param {Object} exchangeRateAdvanceCode
   */
  _getTopUpBody(source, destination, amount, frequentOperationId, simulatedOperationNumber, exchangeRateAdvanceCode) {
    return {
      sender: this._getSender(source),
      receiver: this._getReceiver(destination),
      sentMoney: this._getSentMoney(amount),
      frequentOperationId: frequentOperationId,
      simulatedOperationNumber: simulatedOperationNumber,
      exchangeRate: exchangeRateAdvanceCode
    };
  }

  /**
   * Constructs the origin product info's for mobiles/v0/top-ups
   * @param {Object} source
   */
  _getSender(source) {
    return {
      contractId: source,
      product: {
        id: 'ACCOUNTS',
        name: 'Cuenta'
      }
    };
  }

  /**
   * Constructs the mobile's info for mobiles/v0/top-ups
   * @param {Object} destination
   */
  _getReceiver(destination) {
    let receiver = {
      mobile: this.get('number', destination),
      serviceProvider: {
        id: this.get('serviceProviderId', destination)
      }
    };
    if (Object.prototype.hasOwnProperty.call(destination, 'serviceProviderName') && Object.prototype.hasOwnProperty.call(destination, 'serviceProviderType')) {
      const additionalData = {
        name: this.get('serviceProviderName', destination),
        serviceType: this.get('serviceProviderType', destination)
      };
      Object.assign(receiver.serviceProvider, additionalData);
    }
    return receiver;
  }

  /**
   * Constructs the top-up amount info object for
   * mobiles/v0/top-ups
   * @param {Number} amount
   */
  _getSentMoney(amount) {
    return {
      amount,
      currency: this.localCurrency
    };
  }

  /**
   * Post new mobile top up
   * @param {Object} source
   * @param {Object} destination
   * @param {Object} amount
   * @param {Object} frequentOperationId
   * @param {Object} simulatedOperationNumber
   * @param {Object} exchangeRateAdvanceCode
   */
  createMobileTopUp(source, destination, amount, frequentOperationId, simulatedOperationNumber, exchangeRateAdvanceCode) {
    const service = this._mobileTopUpPostService({
      requiredToken: this.requiredToken,
      body: this._getTopUpBody(source, destination, amount, frequentOperationId, simulatedOperationNumber, exchangeRateAdvanceCode)
    });

    if (this.secondFactorToken) {
      service.headers = service.headers || {};
      service.headers.Authorization = this.secondFactorToken;
    }

    service.generateRequest()
      .then(() => {
        const response = service.getLastResponse();
        this._dispatchCustomEvent('mobile-top-up-created', response && response.data);
      }, this._generateErrorFireEventHandler('error-on-create-mobile-top-up'));
  }

  /**
   * Post new mobile top up with NPM
   * @param {Object} source
   * @param {Object} destination
   * @param {Object} amount
   */
  createMobileTopUpWithNpm(source, destination, amount) {
    const service = this._getNpmService('Mobiles', this.mobilesApiVersion, 'MobilesTopUpsPost', {
      host: this.host,
      body: this._getTopUpBody(source, destination, amount),
      version: this.mobilesApiVersion,
      requiredToken: this.requiredToken,
      native: this.native
    });
    service.generateRequest()
      .then(() => {
        const response = service.getLastResponse();
        this._dispatchCustomEvent('mobile-top-up-created', response && response.data);
      }, this._generateErrorFireEventHandler('error-on-create-mobile-top-up'));
  }

  /**
   * Simulate a top up with the given parameters
   * @param {Object} source
   * @param {Object} destination
   * @param {Object} amount
   */
  simulateMobileTopUp(source, destination, amount) {
    const service = this._mobileTopUpPostService({
      requiredToken: this.requiredToken,
      body: this._getTopUpBody(source, destination, amount),
      params: { simulated: true }
    });

    service.generateRequest()
      .then(() => {
        const response = service.getLastResponse();
        this._dispatchCustomEvent('mobile-top-up-simulated', response && response.data);
      }, this._generateErrorFireEventHandler('error-on-mobile-top-up-simulation'));
  }

  /**
   * Get mobile top up id
   */
  getTopUp(params) {
    const service = this._mobileTopUpGetTopUpService({
      params: {
        'top-up-id': params?.id,
        'operationDate': params?.date
      }
    });
    service.generateRequest().then(
      () => {
        const response = service.getLastResponse();
        this._dispatchCustomEvent('get-top-up-success', response && response.data);
      }, this._generateErrorFireEventHandler('error-on-get-top-up'));
  }

  /**
   * Simulate a top up with the given parameters using /mobiles/v0/top-ups/simulate
   * @param {Object} source
   * @param {Object} destination
   * @param {Object} amount
   */
  doMobileTopUpSimulation(source, destination, amount) {
    const service = this._mobileTopUpPostSimulateService({
      requiredToken: this.requiredToken,
      body: this._getTopUpBody(source, destination, amount)
    });

    service.generateRequest()
      .then(() => {
        const response = service.getLastResponse();
        this._dispatchCustomEvent('mobile-top-up-simulated', response && response.data);
      }, this._generateErrorFireEventHandler('error-on-mobile-top-up-simulation'));
  }

  /**
   * Get mobile providers
   */
  getProviders(params) {
    const service = this._mobileProvidersService({params});
    service.generateRequest().then(
      () => {
        this.set('providers', this._parseResponseProv(service.getLastResponse()));
        this._dispatchCustomEvent('set-providers', this._parseResponseProv(service.getLastResponse()));
      }, this._generateErrorFireEventHandler('error-on-get-providers'));
  }

  /**
   * Service - Get mobile provider amount
   */
  getProviderAmounts(params) {
    const service = this._mobileProviderAmountService({
      params: { 'service-provider-id': params.id }
    });

    service.generateRequest().then(
      () => {
        this.set('providerAmounts', this._parseResponseProv(service.getLastResponse()));
        this._dispatchCustomEvent('set-provider-amounts', this._parseResponseProv(service.getLastResponse()));
      }, this._generateErrorFireEventHandler('error-on-get-provider-amount'));
  }

  /**
 * Service - Get mobile provider is migrated
 */
  getProviderIsMigrated(params) {
    const service = this._mobileProviderIsMigratedService({
      params: { 'service-provider-id': params?.id }
    });

    service.generateRequest().then(
      () => {
        const response = service.getLastResponse();
        this._dispatchCustomEvent('set-provider-is-migrated', this._parseResponseProv(response));
      }, this._generateErrorFireEventHandler('error-on-get-provider-is-migrated'));
  }

  /**
   * Parse response
   */
  _parseResponseProv(response) {
    return response && response.data;
  }

  /**
   * Returns the default mobile service parameters to BGADP
   */
  _getDefaultMobilesServiceParams() {
    return {
      host: this.host,
      version: this.mobilesApiVersion,
      requiredToken: this.requiredToken,
      native: this.native
    };
  }

  /**
   * Service - Get mobile providers
   * /mobiles/v0/service-providers
   * @method {GET}
   */
  _mobileProvidersService(params) {
    params = Object.assign(this._getDefaultMobilesServiceParams(), params);
    /* istanbul ignore next */
    const service = this._getNpmService('Mobiles', this.mobilesApiVersion, 'MobilesServiceProvidersGet', params);
    return service;
  }

  /**
   * Service - Get mobile provider possible amounts
   * /mobiles/v0/service-providers/{service-provider-id}
   * @method {GET}
   */
  _mobileProviderAmountService(params) {
    params = Object.assign(this._getDefaultMobilesServiceParams(), params);
    /* istanbul ignore next */
    const service = this._getNpmService('Mobiles', this.mobilesApiVersion, 'MobilesServiceProvidersServiceProviderGet', params);
    return service;
  }

  /**
  * Service - Get mobile provider is migrated
  * /mobiles/v0/service-providers/{service-provider-id}/migrated
  * @method {GET}
  */
  _mobileProviderIsMigratedService(params) {
    params = Object.assign(this._getDefaultMobilesServiceParams(), params);
    const service = this._getNpmService('Mobiles', this.mobilesApiVersion, 'MobilesServiceProvidersServiceProviderMigratedGet', params);
    return service;
  }

  /**
   * Service - Post mobile top up
   * /mobiles/v0/top-ups
   * @method {POST}
   */
  _mobileTopUpPostService(params) {
    params = Object.assign(this._getDefaultMobilesServiceParams(), params);
    /* istanbul ignore next */
    const service = this._getNpmService('Mobiles', this.mobilesApiVersion, 'MobilesTopUpsPost', params);
    return service;
  }

  /**
   * Service - Post mobile top up
   * /mobiles/v0/top-ups/simulate
   * @method {POST}
   */
  _mobileTopUpPostSimulateService(params) {
    params = Object.assign(this._getDefaultMobilesServiceParams(), params);
    /* istanbul ignore next */
    const service = this._getNpmService('Mobiles', this.mobilesApiVersion, 'MobilesTopUpsSimulatePost', params);
    return service;
  }

  /**
   * Service - Get mobile top up
   * /mobiles/v0/top-ups/{top-up-id}
   * @method {GET}
   */
  _mobileTopUpGetTopUpService(params) {
    params = Object.assign(this._getDefaultMobilesServiceParams(), params);
    const service = this._getNpmService('Mobiles', this.mobilesApiVersion, 'MobilesTopUpsTopUpGet', params);
    return service;
  }
}

customElements.define(CellsDmGlobalApisMobiles.is, CellsDmGlobalApisMobiles);
