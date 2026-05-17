/*eslint new-cap: [2, {"capIsNewExceptions": ["GlomoAnalyticsManagerMixin", "GlomoAnalyticsManagerMixinStep"]}]*/
class GlomoAnalyticsCardDetailManager extends CellsBehaviors.GlomoAnalyticsManagerMixin(
  CellsBehaviors.GlomoAnalyticsManagerMixinStep(Polymer.mixinBehaviors([
    CellsBehaviors.CellsCheckNestedKeysBehavior,
    CellsBehaviors.CellsTextFormatterBehavior,
    CellsBehaviors.i18nBehavior], Polymer.Element))) {

  static get is() {
    return 'glomo-analytics-card-detail-manager';
  }

  static get properties() {
    return {

      cardType: {
        type: String
      },

      helpModalOpened: {
        type: String
      },

      additionalCardButtonLabel: {
        type: String
      },

      /**
       * Flag used to detect debit cards
       * @type {Boolean}
       */
      _isDebitCard: {
        type: Boolean,
        value: false
      },

      /**
       * Label for authorized cards
       * @type {String}
       */
      _authorizedLabel: {
        type: String,
        value: ''
      },

      /**
       * Request card button enabled
       * @type {Boolean}
       */
      requestCardEnabled: {
        type: Boolean,
        value: false
      },

      /**
       * Card participant type
       * @type {String}
       */
      cardParticipantType: {
        type: String,
        value: ''
      },

      /**
       * Flag for virtual cards
       * @type {Boolean}
       */
      _isVirtualCard: {
        type: Boolean,
        value: false
      },

      /**
       * Flag for business cards
       * @type {Boolean}
       */
      _isBusinessCard: {
        type: Boolean,
        value: false
      }
    };
  }

  /**
   * Gets needed params from card datas
   * @param {Object} cardData
   */
  getProductData(cardData) {
    const { cardParticipantType, ...card } = cardData;
    this.cardParticipantType = cardParticipantType || this.cardParticipantType;
    this._isDebitCard = this.c(card, 'cardType.id', '') === 'DEBIT_CARD' || card.analyticsCode === 'debit-card';
    this._authorizedLabel = {'GRANTING': '-granting', 'GRANTED': '-granted'}?.[this.cardParticipantType] ?? '';
    this._isVirtualCard = this.c(card, 'physicalSupport.id', '') === 'VIRTUAL';
    this._isBusinessCard = cardData?.isBusiness;
    this.persistData({
      level2: this._isDebitCard ? 'debito' : 'credito',
      interactionLevel: this._getActivationOnOff(card) ? 'apagar tarjeta' : 'encender tarjeta'
    });
  }

  /**
   * Fire page view event
   * @event fire-page-view
   * @event fire-page-view-debit
   * @event fire-page-view-granting
   * @event fire-page-view-granted
   */
  firePageView() {
    this._dispatchEventByCardType('fire-page-view', this.data);
  }

  /**
   * Dispatch on/off link event
   * @event fire-on-off-link
   * @event fire-on-off-link-debit
   * @event fire-on-off-link-granting
   * @event fire-on-off-link-granted
   */
  fireOnOffLink() {
    this._dispatchEventByCardType('fire-on-off-link', this.data);
  }

  /**
   * Dispatch on/off modal link event
   * @event fire-on-off-modal-link
   * @event fire-on-off-modal-link-debit
   * @event fire-on-off-modal-link-granting
   * @event fire-on-off-modal-link-granted
   */
  fireOnOffModalLink() {
    this._dispatchEventByCardType('fire-on-off-info-modal-link', this.data);
  }

  /**
   * Dispatch OTP modal event
   * @event fire-otp-modal-event
   * @event fire-otp-modal-event-debit
   * @event fire-otp-modal-event-granting
   * @event fire-otp-modal-event-granted
   * @event fire-otp-modal-event-debit-granting
   * @event fire-otp-modal-event-debit-granted
   */
  fireOtpAnalyticsEvent() {
    this._dispatchEventByCardType('fire-otp-modal-event', this.data);
  }

  /**
   * Dispatch on/off info modal event
   * @event fire-on-off-info-modal
   * @event fire-on-off-info-modal-debit
   * @event fire-on-off-info-modal-granting
   * @event fire-on-off-info-modal-granted
   */
  fireOnOffInfoModal() {
    this._dispatchEventByCardType('fire-on-off-info-modal', this.data);
  }

  /**
   * Dispatch more info view
   * @event fire-more-info-view
   * @event fire-more-info-view-debit
   * @event fire-more-info-view-granting
   * @event fire-more-info-view-granted
   */
  fireMoreInfoView() {
    this._dispatchEventByCardType('fire-more-info-view', this.data);
  }

  /**
   * Dispatch banner view
   * @event fire-banner-view
   * @event fire-banner-view-debit
   * @event fire-banner-view-granted
   * @event fire-banner-view-granting
   */
  fireBannerView() {
    this._dispatchEventByCardType('fire-banner-view', this.data);
  }

  /**
   * Dispatch request card view
   * @event fire-request-card-view
   * @event fire-request-card-view-debit
   * @event fire-request-card-view-granted
   * @event fire-request-card-view-granting
   */
  fireRequestCardView() {
    if (this.requestCardEnabled) {
      this._dispatchEventByCardType('fire-request-card-view', this.data);
    }
  }

  /**
   * Dispatch app on click start for request card operative
   * @event fire-request-card-app-on-click-start
   * @event fire-request-card-app-on-click-start-debit
   * @event fire-request-card-app-on-click-start-granted
   * @event fire-request-card-app-on-click-start-granting
   */
  fireRequestCardAppOnClickStart() {
    this._dispatchEventByCardType('fire-request-card-app-on-click-start', this.data);
  }

  /**
   * Dispatch app on click start for ilc operative
   * @event fire-ilc-app-on-click-start
   * @event fire-ilc-app-on-click-start-debit
   * @event fire-ilc-app-on-click-start-granted
   * @event fire-ilc-app-on-click-start-granting
   */
  fireIlcAppOnClickStart() {
    this._dispatchEventByCardType('fire-ilc-app-on-click-start', this.data);
  }

  /**
   * Dispatch app on click start for card-activation operative
   * @event fire-card-activation-app-on-click-start
   */
  fireCardActivationAppOnClickStart() {
    this.resetData();
    this.persistData({
      productSubtype: `tarjetas ${this._isDebitCard ? 'debito' : 'credito'}`
    });
    this._dispatch('fire-card-activation-app-on-click-start', this.data);
  }

  /**
   * Dispatch app on click start for see dynamic cvv operative
   * @event fire-see-dynamic-cvv-app-on-click-start
   */
  fireSeeDynamicCvvAppOnClickStart() {
    this._dispatch('fire-see-dynamic-cvv-app-on-click-start', this.data);
  }

  /**
   * Fire page error event with provided payload by operative manager
   * @event fire-page-error
   * @event fire-page-error-debit
   * @event fire-page-error-granted
   * @event fire-page-error-granting
   */
  firePageError({ analyticsCode = '' } = {}) {
    this._isDebitCard = analyticsCode.includes('debit-card');
    this._authorizedLabel = {'GRANTING': '-granting', 'GRANTED': '-granted'}?.[this.cardParticipantType] ?? '';
    this.persistData({ level2: this._isDebitCard ? 'debito' : 'credito' });
    this._dispatchEventByCardType('fire-page-error', this.data);
  }

  /**
   * Get activation with activationId equal to 'ON_OFF'
   * If activation not exists, we consider that the card is ON
   * @param {Object} card
   * @returns {Boolean}
   */
  _getActivationOnOff(card) {
    const cardActivations = this.c(card, 'detail.activations', this.c(card, 'activations', []));
    return this.c(cardActivations.find(act => act.id === 'ON_OFF' || act.activationId === 'ON_OFF'), 'isActive', true);
  }

  /**
   * Compute event name depending on card type
   * @param {String} evtName
   * @param {Object} payload
   */
  _dispatchEventByCardType(evtName, payload) {
    const debitLabel = this._isDebitCard ? '-debit' : '';
    const virtualCardLabel = this._isVirtualCard ? '-virtual' : '';
    const businessCardLabel = this._isBusinessCard ? '-business' : '';
    this._dispatch(`${evtName}${debitLabel}${this._authorizedLabel}${virtualCardLabel}${businessCardLabel}`, payload);
  }

  /**
   * Fire advanced fingerprint card detail event
   * @event analytics-advanced-fingerprint
   * @param {Object} detail
   */
  fireAdvancedFingerprintCardDetail(detail = {}) {
    const productTypeCode = this.c(detail, 'analyticsCode', '');
    this.cardType = productTypeCode;
    this._dispatch(`analytics-advanced-fingerprint-card-detail-${productTypeCode}`, {...detail, ...this.data});
  }

  /**
   * Fire advanced fingerprint card detail event
   * @event analytics-advanced-fingerprint-error
   * @param {Object} detail
   */
  fireAdvancedFingerprintCardDetailError(detail = {}) {
    const productTypeCode = this.c(detail, 'analyticsCode', '');
    this.cardType = productTypeCode;
    this._dispatch(`analytics-advanced-fingerprint-card-detail-${productTypeCode}-error`, {...detail, ...this.data});
  }

  /**
   * Fire financing debit on click start based on card-detail-manager entry point
   */
  fireFinancingDebitAppOneClickStart() {
    this._dispatch('analytics-financing-debit-card-detail', {});
  }

  /**
   * Fire advanced fingerprint card-activation-help-on/off event
   * @event analytics-advanced-fingerprint-code
   * @param {Object} detail
   */
  fireAdvancedFingerprintCardDetailOnOffModal(detail = {}) {

    const code = this.c(detail, 'code', '');

    this._dispatch(`analytics-advanced-fingerprint-${code}`, {...detail, ...this.data});
  }

  /**
   * Fire advanced fingerprint card-activation-help-on/off event
   * @event analytics-advanced-fingerprint-code
   * @param {Object} detail
   */
  fireAdvancedFingerprintCardDetailOnOff(detail = {}) {
    const modalSubfix = this.helpModalOpened ? `-${this.helpModalOpened}` : '';
    const code = this.c(detail, '0.isActive', '') ? 'card-on' : 'card-off';
    this._dispatch(`analytics-advanced-fingerprint-${code}${modalSubfix}`, {...detail, ...this.data});
    this.helpModalOpened = undefined;
  }

  fireAdvancedFingerprintCardDetailMoreInfo(detail = {}) {
    const productTypeCode = this.c(detail, 'analyticsCode', this.cardType);
    this._dispatch(`analytics-advanced-fingerprint-view-more-info-${productTypeCode}`, {...detail, ...this.data});
  }

  /**
   * Fire advanced fingerprint apply for additional card event
   * @param {Object} detail
   */
  fireAdvancedFingerprintCardDetailApplyForAdditionalCard() {
    const buttonLabel = this.t(this.additionalCardButtonLabel, 'solicitar tarjeta adicional').toLowerCase();

    this._dispatch('analytics-advanced-fingerprint-apply-additional-card', {buttonLabel: buttonLabel, ...this.data});
  }
  /**
   * Fire advanced fingerprint on interest simulator onboarding start
   */
  fireAdvancedFingerprintInterestSimulatorOnboarding() {
    this._dispatch('analytics-advanced-fingerprint-interest-simulator-onboarding', {});
  }

  /**
   * Sets requestCardEnabled to true
   * if method is called
   */
  enableRequestCard() {
    this.requestCardEnabled = true;
  }

  /**
   * Dispatch internal link for applePay manager
   * @event analytics-apple-pay-manager-internal-link
   */
  fireApplePayManagerInternalLink() {
    this._dispatch('analytics-apple-pay-manager-internal-link', this.data);
  }

  /**
   * Dispatch externalLink for call bank
   * @event external-link-call-bank
   */
  externalLinkCallBank() {
    this._dispatch('external-link-call-bank', { value: this._isDebitCard ? 'debito' : 'credito' });
  }

  /**
   * Fire advanced fingerprint on rewards points widget
   * @event analytics-advanced-fingerprint-use-your-points
   */
  fireAdvancedFingerprintCardDetailUseYourPoints() {
    this._dispatch('analytics-advanced-fingerprint-use-your-points');
  }
}

customElements.define(GlomoAnalyticsCardDetailManager.is, GlomoAnalyticsCardDetailManager);
