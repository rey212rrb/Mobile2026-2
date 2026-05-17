/*eslint-disable new-cap*/
/*global GlomoDigitalActivationDmMixin*/
/*global BGADPGrantingTickets */
/*global moment*/
/*global ArrayBuffer */
/*global Uint8Array*/
class GlomoDigitalActivationDmMx extends GlomoDigitalActivationDmMixin.mixin(Polymer.mixinBehaviors([
  CellsBehaviors.i18nBehavior,
  CellsBehaviors.StepManagerBehavior,
],
Polymer.Element)) {

  static get is() {
    return 'glomo-digital-activation-dm-mx';
  }

  static get properties() {
    return {
      /**
       * @type {String}
       * @description BusinessDocuments API version
       */
      businessDocumentsApiVersion: {
        type: String,
        value: '0'
      },
      /**
       * @type {Object}
       * @description Notifications API Headers
       */
      acceptLanguage: {
        type: Object,
        value: () => ({
          'Accept-Language': 'es'
        })
      },
      /**
       * @type {String}
       * @description Notifications API version
       */
      notificationApiVersion: {
        type: String,
        value: '0'
      },
      /**
       * @type {String}
       * @description Customers API version
       */
      customersApiVersion: {
        type: String,
        value: '1'
      },
      /**
       * @type {String}
       * @description Accepts base64 string or pdf url
       */
      baseSrc: {
        type: String,
        notify: true
      },
      /**
       * @type {String}
       * @description send the title value to modal
       */
      docTitle: {
        type: String,
        value: '',
        notify: true
      },
      /**
       * @type {String}
       * @description documentTemplateId
       */
      documentTemplateId: {
        type: String,
        value: ''
      },
      /**
       * @type {String}
       * @description templateTypeId
       */
      templateTypeId: {
        type: String,
        value: ''
      },
      /**
       * @type {Boolean}
       * @description digitalActivationFlag
       */
      digitalActivationFlag: {
        type: Boolean,
        value: false
      },
      /**
       *  @type {Number}
       * @description Max tries to Reintentar button for modal interrupted connection
      */
      interrumpedConnectionMaxTry: {
        type: Number,
        value: 3
      },
      /**
       * @type {Number}
       * @description Counter of tries in Reintentar button for modal interrumped connection
       */
      interrumpedConnectionNumberTries: {
        type: Number,
        value: 0
      },
      /**
       * @type {String}
       * @description Code given from page to handle interrumped connection modal
       */
      interrumpedConnectionCode: {
        type: String,
        value: ''
      },
      /**
       * @type {String}
       * @description Event name given from page to handle modal of interrumped connection
       */
      interrumpedConnectionEvent: {
        type: String,
        value: ''
      },
      /**
       * @type {String}
       * @description Code given from page to handle interrumped connection max tries modal
       */
      interrumpedConnectionMaxCode: {
        type: String,
        value: ''
      },
      /**
       * @type {String}
       * @description Event name given from page to handle modal of interrumped connection max
       */
      interrumpedConnectionMaxEvent: {
        type: String,
        value: ''
      },
      /**
       * @type {Number}
       * @description Max tries to Reintentar button for modal iincorrect data
       */
      incorrectDataMaxTry: {
        type: Number,
        value: 3
      },
      /**
       * @type {Number}
       * @description Counter of tries in Reintentar button for modal incorrect data
       */
      incorrectDataNumberTries: {
        type: Number,
        value: 0
      },
      /**
       * @type {String}
       * @description Code given from page to handle incorrect data modal
       */
      incorrectDataCode: {
        type: String,
        value: ''
      },
      /**
       * @type {String}
       * @description Event name given from page to handle modal of incorrect data
       */
      incorrectDataEvent: {
        type: String,
        value: ''
      },
      /**
       * @type {String}
       * @description Code given from page to handle incorect data max tries modal
       */
      incorrectDataMaxCode: {
        type: String,
        value: ''
      },
      /**
       * @type {String}
       * @description Event name given from page to handle modal of incorrect data max tries
       */
      incorrectDataMaxEvent: {
        type: String,
        value: ''
      },
      /**
       * @type {Number}
       * @description Max tries to Reintentar button for modal hiring not done
       */
      hiringNotDoneMaxTry: {
        type: Number,
        value: 3
      },
      /**
       * @type {Number}
       * @description Counter of tries in Reintentar button for modal hiring not done
       */
      hiringNotDoneNumberTries: {
        type: Number,
        value: 0
      },
      /**
       * @type {String}
       * @description Code given from page to handle hiring not done modal
       */
      hiringNotDoneCode: {
        type: String,
        value: ''
      },
      /**
       * @type {String}
       * @description Event name given from page to handle modal of hiring not done
       */
      hiringNotDoneEvent: {
        type: String,
        value: ''
      },
      /**
       * @type {String}
       * @description Code given from page to handle hiring not done max tries modal
       */
      hiringNotDoneMaxCode: {
        type: String,
        value: ''
      },
      /**
       * @type {String}
       * @description Event name given from page to handle modal of hiring not done max tries
       */
      hiringNotDoneMaxEvent: {
        type: String,
        value: ''
      },
      /**
       * @type {String}
       * @description base const
       */
      baseConst: {
        type: String,
        value: '--uuid'
      },
      /**
       * @type {Boolean}
       * @description flag for show birthdate
       */
      showBirthDateFlag: {
        type: Boolean,
        value: false
      },
      /**
       * @type {Boolean}
       * @description flag to reset property and steps when using chat with advisor
       */
      advisorChatFlag: {
        type: Boolean,
        value: false
      },
      /**
       * @type {String}
       * @description description of the secondary icon of the header
       */
      iconSecondary: {
        type: String,
        value: ''
      },
      /**
       * @type {Boolean}
       * @description validate the landingQR flow
       */
      registerQR: {
        type: Boolean,
        value: false
      },
      /**
       * @type {Object}
       * @description landingQr card value
       */
      dataPan: {
        type: Object,
        value: () => ({})
      },
      /**
       * @description property that validates the status of credecials locked
       */
      showModalExitDefinitly: {
        type: Boolean,
        value: false
      },
      /**
       * @type {Boolean}
       * @description property for user not registered
       */
      registerUserData: {
        type: Boolean,
        value: false
      },
      /**
       * @type {String}
       * @description property to identify the type of PDF to display
       */
      productDocumentId: {
        type: String,
        value: ''
      },
      /**
        * @type {String}
        * @description property to title pdf
        */
      titlePDFDigitalContract: {
        type: String,
        value: ''
      },
      /**
       * @type {String}
       * @description Code given from page to handle invalid CURP modal
       */
      invalidCurpCode: {
        type: String,
        value: ''
      },
      /**
       * @type {String}
       * @description Event name given from page to invalid CURP modal
       */
      invalidCurpEvent: {
        type: String,
        value: ''
      },
      /**
       * @type {String}
       * @description Code given from page to handle not available app modal
       */
      notAvailableAppCode: {
        type: String,
        value: ''
      },
      /**
       * @type {String}
       * @description Event name given from page to not available app modal
       */
      notAvailableAppEvent: {
        type: String,
        value: ''
      },
      /**
       * @type {String}
       * @description Code given from page to handle locked token modal
       */
      lockedTokenCode: {
        type: String,
        value: ''
      },
      /**
       * @type {String}
       * @description Event name given from page to locked token modal
       */
      lockedTokenEvent: {
        type: String,
        value: ''
      },
      /**
       * @type {Boolean}
       * @description property to client Adicional
       */
      profileAdicional: {
        type: Boolean,
        value: false
      },
      /**
       * @type {String}
       * @description BBVA url
       */
      urlBbva: {
        type: String,
        value: 'https://www.bbva.mx'
      },
      /**
       * @type {String}
       * @description property for the date received from the service headers
       */
      dateService: {
        type: String,
        value: ''
      },
      /**
       * @type {String}
       * @description property for time zone
       */
      timeZone: {
        type: String,
        value: ''
      },
      /**
       * @type {String}
       * @description property for time zone change
       */
      zoneChange: {
        type: String,
        value: ''
      },
      /**
       * @type {String}
       * @description property for image for modal DigitalActivationModalSuccess
       */
      nameHeroImage: {
        type: String,
        value: './images/success.svg'
      },
      /**
       * @type {Boolean}
       * @description flag to enable step of nip & cvv in additional case
       */
      stepFlag: {
        type: Boolean,
        value: false
      },
      /**
      * @type {String}
      * @description property for hide modal
      */
      hideModalHelpPasword: {
        type: Boolean,
        value: false
      },
      /**
       * @type {String}
       * @description list contact details api version
       */
      contactDetailsApiVersion: {
        type: String,
        value: ''
      },
      /**
       * @type {Object}
       * @description data object for visual chat with advisor
       */
      advisorChatObject: {
        type: Object,
        value: () => ({})
      },
      /**
       * @type {String}
       * @description chat service start time with advisor
       */
      chatStartTime: {
        type: String,
        value: ''
      },
      /**
       * @type {String}
       * @description chat service completion time with advisor
       */
      chatEndTime: {
        type: String,
        value: ''
      },
      /**
      * @type {Boolean}
      * @description check if chat with advisor is enabled
      */
      isActiveChat: {
        type: Boolean,
        value: false
      },
      /**
       * @type {String}
       * @description property for base 64 in signature
       */
      signatureBase64: {
        type: String,
        value: ''
      },
      /**
       * @type {Boolean}
       * @description check if chat with flag Ksjoo is enabled
       */
      callNewKsjo: {
        type: Boolean,
        value: false
      },
      /**
       * @type {Array}
       * @description http status error for GT birthdate
       */
      errorGtBirthdate: {
        type: Array,
        value: () => ([400, 403, 409, 519, 500])
      },
      /**
       * @type {Object}
       * @description structure for contract services(CUD)
       */
      structureContractCud: {
        type: Object,
        value: () => ({})
      },
      /**
       * @type {String}
       * @description type flow for digital activation (normal, alertas, monoproducto)
       */
      typeFlow: {
        type: String,
        value: 'normal'
      },
      /**
       * @type {String},
       * @description property for color OCR
       */
      guideColorOcr: {
        type: String,
        value: ''
      },
      /**
       * @type {Array}
       * @description property for setter body for GT birthdate
       */
      authenticationBirthdate: {
        type: Array,
        notify: true
      },
      /**
       * @type {String}
       * @description User id for GT birthdate
       */
      userIdBirthdate: {
        type: String,
        value: ''
      },
      /**
       * @type {String}
       * @description Authentication type for birthday
       */
      authenticationTypeBirthDate: {
        type: String,
        value: ''
      },
      /**
       * @type {Boolean}
       * @description Flag for alert flow
       */
      activeAlerts: {
        type: Boolean,
        value: false,
        notify: true
      },
      /**
       * Document evidence of the customer
       * @type {Array}
       */
      _documentEvidence: {
        type: Array,
        value: () => []
      },
      /**
       * Document evidence of the customer
       * @type {Array}
       */
      _selfieEvidence: {
        type: Array,
        value: () => []
      },
      /**
       * All photos converted
       * @type {Object}
       */
      _photoConvertedResult: {
        type: Object,
        value: () => ({})
      },
      _isVeridasBoxClosed: {
        type: Boolean,
        value: false
      },
      /**
       * Object that save the document type of the NationalID
       */
      idDocumentTypes: {
        type: Object,
        value: () => ({})
      },
      /**
      * Flag that tells if the put verifications for reverse image is over
      */
      reverseFlag: {
        type: Boolean,
        value: false
      },
      /**
      * Flag that tells if the put verifications for selfie is over
      */
      selfieFlag: {
        type: Boolean,
        value: false
      },
      /**
      * Flag that tells if the put verifications for selfie is over
      */
      selfieAliveFlag: {
        type: Boolean,
        value: false
      },
      /**
      * Flag that tells if the put verifications for front flash is over
      */
      obverseFlashFlag: {
        type: Boolean,
        value: false
      },
      /**
      * Flag that tells if the put verifications for front without flash is over
      */
      obverseFlag: {
        type: Boolean,
        value: false
      },
      /**
       * All photos converted
       * @type {Object}
       */
      _configRequest: {
        type: Object,
        value: () => ({})
      },
      /**
      * @type {Number}
      * Counter for the 3rd cancel qr error modal
      */
      _failedQr: {
        type: Number,
        value: 0
      },
      /**
      * @type {Number}
      * Counter for the 3rd cancel qr error modal
      */
      _failedQrMax: {
        type: Number,
        value: 3
      },
      /**
       * Flag failed enrollment request boolean
       * @type {Boolean}
       */
      _failedEnrollment: {
        type: Boolean,
        value: false
      },
      /**
       * Flag failed activeNotifications request boolean
       * @type {Boolean}
       */
      _failedActive: {
        type: Boolean,
        value: false
      },
      /**
       * Flag failed GT request boolean
       * @type {Boolean}
       */
      _failedGTRequest: {
        type: Boolean,
        value: false
      },
      /**
       * Native flag that indicates the on/off of the alert activation flow
       * @type {Boolean}
       */
      notificationsEnrollmentDA: {
        type: Boolean,
        value: false
      },
      /**
       * property for app type
       * @type {String}
       */
      application: {
        type: String,
        value: ''
      },
      /**
       * @type {String}
       * @description consumerIdDvs
       */
      consumerIdDvs: {
        type: String,
        value: ''
      },
      /**
       * @type {String}
       * @description Authentication type for dvs level up
      */
      authenticationTypeDvs: {
        type: String,
        value: ''
      },
      /**
       * @type {Object}
       * @description Object for userDvs
      */
      userWithCredentials: {
        type: Object
      },
      /**
       * @type {Number}
       * @description resize image percentage
      */
      resizeImagePercentage: {
        type: Number,
        value: 60
      },
      /**
       * @type {Boolean}
       * @description flag for enrollment monoproduct user
       */
      flagMonoProduct: {
        type: Boolean,
        value: false
      },
      /**
       * @type {String}
       * @description unencrypted customerId
       */
      userId: {
        type: String,
        value: ''
      },
      /**
       * @description Properties for form management for monoproduct users
       * @type {Object}
       */
      monoproductPropertiesForm: {
        type: Object,
        value: () => ({})
      },
      /**
       * @description All countries MX
       * @type {Object}
       */
      countries: {
        type: Object,
        value: []
      },
      /**
       * @type {Array}
       * @description code error ORQ1 for invalide credit of users monoproduct
       */
      errorInvalidCredit: {
        type: Array,
        value: () => (['invalidContractParameter', 'errorValidationInput'])
      },
      /**
       * @type {Array}
       * @description code error ORQ1 for invalide phone of users monoproduct
       */
      errorInvalidPhone: {
        type: Array,
        value: () => (['registeredContact', 'phoneInBlacklistNotAllowed', 'customerIsInvalid', 'missingData', 'alreadyRequested'])
      },
      /**
       * @description Values for documents plugin
       * @type {Object}
       */
      identificationConfig: {
        type: Object,
        value: () => ({
          documents: [
            'MX_IDCard_2014',
            'MX_IDCard_2008',
            'MX_IDCard_2019'
          ],
          configuration: {
            'closebutton': 'YES',
            'obverseflash': 'YES',
            'checkdocumenttext': 'GIVEN RESULT'
          },
        })
      },
      /**
       * @description Values for selfie plugin
       * @type {Object}
       */
      selfieConfig: {
        type: Object,
        value: () =>({
          configuration: {
            'closebutton': 'YES',
            'checkdocumenttext': 'GIVEN RESULT',
            'livephoto': 'YES'
          }
        })
      }
    };
  }

  static get observers() {
    return [
      '_persistingData(customerId, mobileNumber, cardNumber)',
      '_hideSpinnerPutVerifications(obverseFlag, obverseFlashFlag, reverseFlag, selfieFlag, selfieAliveFlag)'
    ];
  }

  /**
   * @description Flow to data persists
   * @param {String} customerId
   * @param {String} mobileNumber
   * @param {String} cardNumber
   */
  _persistingData(customerId, mobileNumber, cardNumber) {
    if (mobileNumber) {
      this.set('persistingData', {
        customerId: customerId,
        device: this.device,
        cardNumber: cardNumber,
        mobileNumber: mobileNumber,
        carrier: true
      });
    }
    this.identityValidationProperties();
  }

  /**
   * @description QR plugin success response
   * @param {Object} qrContent
   * @event 'send-qr-card-number'
   */
  qrScannerResponse(qrContent = { content: '' }) {
    this.urlString = qrContent.content;
    const exp = /^(https:\/\/bbva.mx\/qr-cards)/.test(this.urlString);
    this.isQrFlow = true;
    if (exp) {
      const qrCardData = (this.urlString).substr(-4);
      this._fireEvent('send-qr-card-number', qrCardData);
    } else {
      this._failedQr++;
      if (this._failedQr < this._failedQrMax) {
        this._genericQrErrorModal();
      } else {
        this.qrErrorModal();
      }
    }
  }

  /**
     * @description method for public GT
     * @param {String} evt
     */
  postLoginAnonymous(data = { phoneInputValue: '', cardInputValue: ''}) {
    if (this.flagMonoProduct) {
      this.consumerId = this.consumerIdStatus;
      this.userAnonymous = this.userAnonymousConfig;
    } else {
      this.mobileNumber = data.phoneInputValue;
      if (!this.isQrFlow) {
        this.cardNumber = data.cardInputValue;
        this.userAnonymous = this.consumerId;
      } else {
        this.qRFlag = true;
        this._fireEvent('hide-decorated-step', false);
        this._fireEvent('show-step-cvv-nip-qr-flag', true);
      }
    }
  }

  /**
  * @description method for public GT success
  */
  _loginAnonymousSuccess() {
    if (this.flagMonoProduct) {
      this._fireEvent('get-places-mx', true);
    } else {
      this.userAnonymous = '';
      this.postDigitalValidation();
    }
  }

  /**
  * @description method for public GT Error
  */
  _loginAnonymousError() {
    if (this.userAnonymous !== '') {
      this.userAnonymous = '';
      this._interrumpedConnectionModal();
    }
  }

  /**
  * @description method for private GT PIN, CVV Success
  */
  _loginCardCvvSuccess() {
    if (this.activeAlerts) {
      this.typeFlow = 'alertas';
      this.startIdentityValidationProcess();
    } else {
      this.sendEventSteps([ 3 ]);
      this.validateSubscription();
    }
    this._typeFlow();
    this._fireEvent('hide-decorated-step', false);
    this._fireEvent('hide-decorated-step-cvv', this.activeAlerts);
  }

  /**
  * @description method for private GT PIN and CVV Error
  * @param {Object} evt
  */
  _loginCardCvvError(evt) {
    const httpStatus = this.c(evt, 'detail', {})['http-status'];
    const errorCode = this.c(evt, 'detail', {})['error-code'];
    if ([400, 403, 409, 519, 500].includes(httpStatus)) {
      if (httpStatus === 500 && errorCode === '90') {
        this._unidentifiedNotificationsError(this._chatWithAdvisor());
      } else {
        if (httpStatus === 403 && errorCode === '576') {
          this.showModalExitDefinitly = true;
        }
        this._incorrectDataError();
      }
    } else {
      this._interrumpedConnectionModal();
    }
  }

  /**
  * @description method for private granting of a QR ticket with PIN success
  */
  _loginQrSuccess() {
    this._typeFlow();
    this.postDigitalValidation();
  }

  /**
  * @description method for private granting of a QR ticket with PIN error
  * @param {Object} evt
  */
  _loginQrError(evt) {
    const httpStatus = this.c(evt, 'detail', {})['http-status'];
    const errorCode = this.c(evt, 'detail', {})['error-code'];
    if (this.errorGtBirthdate.includes(httpStatus)) {
      if (httpStatus === 500 && errorCode === '90') {
        this._unidentifiedNotificationsError(this._chatWithAdvisor());
      } else {
        if (httpStatus === 403 && errorCode === '576') {
          this.showModalExitDefinitly = true;
        }
        this._incorrectDataError();
      }
    } else {
      this._interrumpedConnectionModal();
    }
  }

  /**
  * @description method for GT birthDate
  * @param {Object} evt
  */
  getGrantingTicketBirthdate({ date }) {
    let phoneNumberMobile = this.mobileNumber;
    let responseDate = date;
    let dateOfBirth = moment(responseDate).format('YYYYMMDD');

    if (this.authenticationTypeBirthDate.length > 0) {
      this._authenticationType = this.authenticationTypeBirthDate;
    }

    let payloadBirthdate = [
      {
        'idAuthenticationData': 'pan',
        'authenticationData': [ this.cardNumber ]
      },
      {
        'idAuthenticationData': 'birthday',
        'authenticationData': [ dateOfBirth ]
      }
    ];

    this.userIdBirthdate = phoneNumberMobile;
    this.authenticationBirthdate = payloadBirthdate;
  }

  /**
  * @description method for granting ticket of birthdate success
  * @param {Object} data
  */
  _gtBirthdateSuccess({ detail }) {
    let dataJsonParse;
    if (detail) {
      try {
        dataJsonParse = JSON.parse(detail);
        if (dataJsonParse.authenticationResponse.authenticationState === 'OK') {
          this._typeFlow();
          this.validateSubscription();
        }
      } catch (e) {
        return {};
      }
    }
  }

  /**
  * @description method for granting ticket of birthdate error
  * @param {Object} data
  */
  _gtBirthdateError({ detail }) {
    const httpStatus = detail.status;
    const errorCode = detail.code;
    if ([400, 403, 409, 519, 500].includes(httpStatus)) {
      if (httpStatus === 500 && errorCode === '90') {
        this._unidentifiedNotificationsError(this._chatWithAdvisor());
      } else {
        if (httpStatus === 403 && errorCode === '576') {
          this.showModalExitDefinitly = true;
        }
        this._incorrectDataError();
      }
    } else {
      this._interrumpedConnectionModal();
    }
  }

  /**
  * @description  method that verifies if a customer has a digital account.
  */
  postDigitalValidation() {
    this._openControlVeil();
    if (this.mobileNumber) {
      this._fireEvent('send-mobile-number-native', this.mobileNumber);
      const payload = {
        cardNumber: this.cardNumber,
        mobileNumber: this.mobileNumber
      };
      this.$.cellsDmGlobalApisCustomersMX.postDigitalValidation(payload);
    }
  }

  /**
    * @description method that retrieves native flag for on/off functionality
    * @param {Object} e
  */
  getNotificationsEnrollmentDAFlag(e) {
    this.notificationsEnrollmentDA = e;
  }

  /**
   * Method get response from global for the flag
  */
  setNotificationsEnrollmentDAFlagGlobal(payload) {
    const flag = payload?.['glomo.qrEnrollment.NotificationsEnrollmentDA'];
    if (flag !== undefined) {
      this.notificationsEnrollmentDA = flag.value;
    }
  }

  /**
  * @description  fire when the api DigitalValidation execution success
  */
  _postDigitalValidationSuccess() {
    this._fireEvent('show-step-birth-date', true);
    this._fireEvent('show-step-input-date', false);
    this.sendEventSteps([ 3 ]);
    this._closeControlVeil();
  }

  /**
    * @description  fire when api DigitalValidation returns error
    * @param {Object} evt
    */
  _postDigitalValidationError(evt) {
    const httpStatus = this.c(evt, 'detail.status', '');
    const errorCode = this.c(evt, 'detail', '')['error-code'];
    const errorMsg = this.c(evt, 'detail', '')['error-message'];
    switch (httpStatus) {
      case 400:
        this._manageErrorDigitalValidation(errorCode, errorMsg);
        break;
      case 409:
        this._manageErrorDigitalValidationFail(errorCode);
        break;
      case 600:
        this._interrumpedConnectionModal();
        break;
      default:
        this._genericError();
        break;
    }
    this._closeControlVeil();
  }


  /**
   * @description Manage type errors for digital validation
   * @param {String} httpStatus
   * @param {String} errorCode
   */
  _manageErrorDigitalValidation(errorCode, errorMsg) {
    switch (errorCode) {
      case 'identificationError':
        this._digitalValidationIdentificationError(errorMsg);
        break;
      case 'invalidCredentialsInternal':
        this._identificationAlerts();
        break;
      case 'invalidParameters':
      case 'notMainCard':
      case 'invalidRequest':
      case 'cardIsNotActive':
      case 'cardNotExist':
        this._digitalActivationInvalidCardError();
        break;
      case 'invalidCategorization':
        this._digitalActivationAdditional();
        break;
      case 'operationRejected':
        this._usePhysicalCardError();
        break;
      default:
        this._genericError();
        break;
    }
  }

  _identificationAlerts() {
    if (this.notificationsEnrollmentDA) {
      this.startHiringAlerts();
    } else {
      this._unidentifiedNotificationsError(this._chatWithAdvisor());
    }
  }

  /**
   * @description Manage for  error-code 409 and 600
   * @param {String} httpStatus
   * @param {String} errorCode
   */
  _manageErrorDigitalValidationFail(errorCode) {
    switch (errorCode) {
      case 'MPE2941':
        this._usePhysicalCardError();
        break;
      case 'KZE1789':
        this._unidentifiedNotificationsError(this._chatWithAdvisor());
        break;
      default:
        this._genericError();
        break;
    }
  }

  /**
   * @description method to handle 'identificationError' from digital validation response
   * @param {String} errorMsg
   */
  _digitalValidationIdentificationError(errorMsg) {
    if (errorMsg.includes(this.t('glomo-digital-activation-dm-identification-error')) || errorMsg === this.t('glomo-digital-activation-dm-more-additional-card') || errorMsg === '{0}') {
      this.profileAdicional = errorMsg === this.t('glomo-digital-activation-dm-more-additional-card') ? true : false;
      this._fireEvent('send-profile-analytics-digital-activation', this.profileAdicional);
      this._additionalFlagValidation();
      if (!this.stepFlag) {
        if (this.qRFlag) {
          this.sendEventSteps([ 3 ]);
          this.validateSubscription();
        } else {
          this._fireEvent('show-step-cvv-nip', true);
        }
        this._fireEvent('hide-decorated-step', false);
        this._fireEvent('hide-decorated-step-cud', false);
      }
    } else if (errorMsg === this.t('glomo-digital-activation-dm-titular-card') || errorMsg === this.t('glomo-digital-activation-dm-additional-card')) {
      this._digitalActivationAdditional();
    } else if (errorMsg === this.t('glomo-digital-activation-dm-more-wallet-card') || errorMsg === this.t('glomo-digital-activation-dm-invalid-status')) {
      this._digitalActivationInvalidCardError();
    } else {
      this._unidentifiedNotificationsError(this._chatWithAdvisor());
    }
  }

  /**
   * @description method for cardNumber reset with QR
   */
  cardNumberQr() {
    this.cardNumber = '';
  }

  /**
  * @description method that performs the validation of user status in channel
  */
  channelStatus() {
    const payload = {
      mobileNumber: this.mobileNumber,
    };
    this.$.cellsDmGlobalApisCustomersMX.getCustomerChannelStatus(payload);
  }

  /**
  * @description  fire when the api getChannelStatus execution success
  * @param {Object} evt
  */
  _channelStatusSuccess(evt) {
    if (evt.detail && evt.detail.status) {
      const statusId = this.c(evt, 'detail.status.id', '');
      if (['CN', 'EC', 'C4'].includes(statusId)) {
        this.contactDetails();
      } else if (statusId === 'B4') {
        this._applicationBlockedError();
      } else {
        this._registeredUsers();
      }
    }
  }

  /**
  * @description  fire when api getChannelStatus returns error
  * @param {Object} evt
  */
  _channelStatusError(evt) {
    const httpStatus = this.c(evt, 'detail.status', '');
    const errorCode = this.c(evt, 'detail', '')['error-code'];
    if (httpStatus === 409 && errorCode === 'CNE0007') {
      this.contactDetails();
    } else {
      this._interrumpedConnectionModal();
    }
  }

  /**
   * @description Method for show birth date
   * @param {Boolean} data
   */
  showBirthdate(data) {
    this.showBirthDateFlag = data;
  }

  /**
  * @description Retrieve the list of contacts associated with a customer. Obfuscated information
  */
  contactDetails() {
    this._openControlVeil();
    const payload = {
      customerId: this.customerId
    };
    this.$.cellsDmGlobalApisCustomersMX.getCustomerDetails(payload);
  }

  /**
  * @description  fire when the api listContactDetails execution success
  * @param {Object} e
  */
  _contactDetailsSuccess(e) {
    let contactDetail = this.c(e, 'detail', '');
    let emailContact = this.c(contactDetail, '1.contact', '');
    if (emailContact.includes('@')) {
      this.email = emailContact;
      this.sendEventSteps([ 4 ]);
      this._fireEvent('active-step', true);
      this._subtractEmail(this.email);
    } else {
      if (!this.showBirthdate) {
        this.sendEventSteps([ 4 ]);
      }
      this._fireEvent('show-step-email', false);
      this._fireEvent('active-step-email', true);
    }
    this._closeControlVeil();
  }

  /**
  * @description  fire when api listContactDetails returns error
  */
  _contactDetailsError() {
    this._interrumpedConnectionModal();
  }

  /**
  * @description method that performs the enrollment of a customer.
  */
  digitalActivation() {
    let payload = {
      customerId: this.customerId,
      device: this.device,
      cardNumber: this.cardNumber,
      mobileNumber: this.mobileNumber,
      signatureId: this.signatureId,
      password: this.password,
      callNewKsjo: this.callNewKsjo
    };
    if (this.digitalActivationFlag) {
      payload.email = this.email;
    }
    if (this.isQrFlow) {
      delete payload.cardNumber;
    }
    this.$.cellsDmGlobalApisCustomersMX.postDigitalActivation(payload);
  }

  /**
  * @description  fire when the api createDigitalActivation execution success
  */
  _digitalActivationSuccess() {
    let dateDevice = moment(this._getDateAndTime(), 'DD MMMM YYYY, HH:mm [h]').format('DD/MM/YYYY');
    this._fireEvent('date-success', { date: dateDevice });
    this._closeControlVeil();
    this._openDigitalActivationModalSuccess();
  }

  /**
  * @description  fire when api createDigitalActivation returns error
  * * @param {Object} evt
  */
  _digitalActivationError(evt) {
    const httpStatus = this.c(evt, 'detail.status', '');
    const errorCode = this.c(evt, 'detail', '')['error-code'];
    const errorMsg = this.c(evt, 'detail', '')['error-message'];
    if (httpStatus === 409 && errorCode === 'CNE0008') {
      this._digitalActivationInvalidCurpError();
    } else if (httpStatus === 409 && errorCode === 'CNE1030' && errorMsg === 'CNE1030  ESTADO INCORRECTO') {
      this._digitalActivationLockedTokenError();
    } else if (httpStatus === 409 && errorCode === 'CNE1030' && errorMsg === 'CNE1030  CLIENTE NO CUENTA CON TOKEN CRONTO') {
      this._digitalActivationNotAvailableAppError();
    } else {
      this._hiringNotDoneError();
    }
    this._closeControlVeil();
  }

  /**
   * @description method that executes telephone calls to the customer and to continue with the activation of the device.
   */
  callUp() {
    this._openControlVeil();
    this.persistingData.carrier = Boolean(Math.round(Math.random()));
    this.$.cellsDmGlobalApisCustomersMX.postCallUp(this.persistingData);
  }

  /**
   * @description modal that reacts to the success event of the postCallUp function
   */
  _onCallUpSuccess() {
    this._checkModal = true;
    this._closeControlVeil();
    const detailModalCall = {
      code: 'DIGITAL-ACTIVATION-CALL-UP',
      selectedConfig: {
        className: 'full-height-info header--white header--white-call-me-back close-button--right button-less margin-zero-bottom',
        heroImage: './images/identified_call.svg',
        openMaximized: true,
        closeIcon: '',
        title: 'digital-activation-call-success-title',
        time: 60000,
        textTimer: 'alert-DIGITAL-ACTIVATION-timer-description',
        textTimerEnable: true,
        info: {
          type: 'info-dark',
          icon: 'coronita:info',
          message: 'digital-activation-call-message',
          class: 'icon-message-container'
        },
        template: {
          type: 'paragraphs',
          values: [
            {
              title: 'digital-activation-call-values-title',
              class: 'simple-title'
            },
            {
              text: 'digital-activation-call-values-text'
            }
          ]
        }
      }
    };
    this._getConfigOpenModal(detailModalCall);
    this._fireEvent('open-modal-call-up-success');
  }

  /**
   * @description method that evaluates the type of error of the postCallUp function
   */
  _onCallUpError(response) {
    this._closeControlVeil();
    let responseStatusCode = response.detail['http-status'];
    if (responseStatusCode === 204) {
      this._onCallUpSuccess();
    } else if (responseStatusCode === 500) {
      this._checkModal = true;
      let config = {
        header: 'digital-activation-call-error-title',
        title: 'digital-activation-call-error-retry-title',
        message: 'digital-activation-call-error-retry-text',
        srcImage: Polymer.ResolveUrl.resolveUrl('./images/flexibleLineCredit/connection_error.svg'),
        className: 'full-height-error header--title-grey credit-bureau--error',
        fullModal: true
      };

      let retryErrorData = {
        errorId: 'DIGITAL-ACTIVATION-CALL-UP-ERROR',
        errorType: 'operative',
        retryConfig: {},
        callConfig: {}
      };

      Object.assign(retryErrorData.retryConfig, config);
      Object.assign(retryErrorData.callConfig, config);
      this._fireEvent('glomo-digital-activation-dm-post-call-up-error', Object.assign({ retryErrorData }));
    } else {
      this._genericErrorCallUp();
    }
  }

  /**
   * @description method that returns directly to login
   */
  exitCallUp() {
    this.reset();
    this._backToLogin();
  }

  /**
   * @description modal that reacts to the generic error event of the postCallUp function
   */
  _genericErrorCallUp() {
    this._checkModal = true;
    const config = {
      header: 'digital-activation-call-error-general-title',
      title: 'digital-activation-call-error-general-title',
      'error-message': 'digital-activation-call-error-general-text',
      className: 'full-height-error header--title-grey credit-bureau--error',
      fullModal: false
    };
    this._fireEvent('glomo-digital-activation-dm-call-up-error', config);
  }

  /**
   * @description modal that reacts to the generic error event
   */
  _genericError() {
    this._checkModal = true;
    const config = {
      header: 'glomo-digital-activation-dm-error-modal-header-title',
      title: 'digital-activation-call-error-title',
      'error-message': 'glomo-standard-error-handler-operation-not-done-retry-later-error-message',
      className: 'full-height-error header--title-grey credit-bureau--error',
      fullModal: false
    };
    this._getConfigOpenModal(config);
  }

  /**
  * @description method that validates if the client is subscribed to the notifications.
  */
  validateSubscription() {
    const payload = {
      mobileNumber: this.mobileNumber,
      cardNumber: this.cardNumber
    };
    this.$.cellsDmGlobalApisNotificationsMX.validateSubscription(payload);
  }

  /**
  * @description  fire when the api validateSubscription execution success
  * @param {Object} evt
  */
  _validateSubscriptionSuccess(evt) {
    let validateData = this.c(evt, 'detail', '');
    if (validateData && validateData.customerId) {
      this.customerId = this.c(evt, 'detail.customerId', '');
      this.channelStatus();
    }
  }

  /**
  * @description  fire when api createCall returns error
  */
  _validateSubscriptionError() {
    this._interrumpedConnectionModal();
  }

  /**
  * @description ethod that obtains the list of template identifiers related to a product.
  */
  listBusinessDocument() {
    const params = {
      'product.id': this.productDocumentId
    };
    this.$.cellsDmGlobalApisBusinessDocumentsMX.getBusinessDocuments(params);
  }

  /**
  * @description  fire when the api listBusinessDocument execution success
  * @param {Object} evt
  */
  _listBusinessDocumentSuccess(evt) {
    if (evt.detail) {
      this.templateTypeId = this.c(evt, 'detail.0.id', '');
      this.documentTemplateId = evt.detail[0].documentTemplate.templateType.id;
    }
    if (this.templateTypeId && this.documentTemplateId) {
      this.generateBusinessDocument();
    }
  }

  /**
  * @description method to generate documents for viewing.
  */
  generateBusinessDocument() {
    const payload = {
      documentTemplate: {
        id: this.templateTypeId,
        templateType: {
          id: this.documentTemplateId
        }
      }
    };
    this.$.cellsDmGlobalApisBusinessDocumentsMX.postBusinessDocuments(payload);
  }

  /**
  * @description  fire when the api generateBusinessDocument execution start
  */
  _generateBusinessDocumentStarted() {
    this._openControlVeil();
  }

  /**
  * @description  fire when the api generateBusinessDocument execution success
  * @param {Object} evt
  */
  _generateBusinessDocumentSuccess(evt) {
    this._checkModal = true;
    this.baseSrc = this._cleanResponse(this._parseMultipartMixed(evt.detail).file, this.baseConst);
    this._fireEvent('set-title-pdf-single-digital-contract', this.titlePDFDigitalContract);
    this._fireEvent('set-scr-pdf-single-digital-contract', this.baseSrc);
    this._fireEvent('open-modal-pdf-single-digital-contract');
    this.getTermsAndConditions(this.baseSrc);
    this._closeControlVeil();
  }

  /**
  * @description  fire when api generateBusinessDocument returns error
  */
  _generateBusinessDocumentError() {
    this._closeControlVeil();
    this.informationNotAvailableErrorModal();
  }

  /**
   * @description Public method to handle regex config on password step
   */
  setRegexConfig() {
    const literal1 = /^[á-ü]/gm;
    const literal2 = /(.)\1{3}/gm;
    const literal3 = /bbva/gm;
    const literal4 = /^[0-9]{8,10}$/gm;
    const literal5 = /^[a-zA-Z]{8,10}$/gm;
    const passwordMatchValidation = [literal1, literal2, literal3, literal4, literal5];
    this._fireEvent('set-regex-match-validation', passwordMatchValidation);
  }

  /**
  * @description Modal of Success View
  */
  _openDigitalActivationModalSuccess() {
    this._checkModal = true;
    const result = {
      code: 'DIGITAL-ACTIVATION-SUCCESS',
      selectedConfig: {
        className: 'full-height-info dark-background',
        heroImage: this.nameHeroImage,
        openMaximized: true,
        title: 'digital-activation-header-text',
        acceptBtLabel: 'digital-activation-button-text',
        template: {
          type: 'paragraphs',
          values: [{
            title: 'digital-activation-success-main-title-key',
            class: 'spacing'
          },
          {
            text: this._getDateAndTime(),
            class: 'spacing simple-phone italic-text'
          },
          {
            icon: 'coronita:info',
            message: 'digital-activation-success-top-info-icon-message',
            type: 'info-dark'
          },
          {
            text: 'digital-activation-success-top-info-key-email',
            class: 'normal italic-text'
          },
          {
            text: this.maskedEmail.toLowerCase(),
            class: 'medium'
          }]
        }
      }
    };
    this._getConfigOpenModal(result);
    this._fireEvent('digital-activation-call-analytics-profile', this.profileAdicional);
    this._fireEvent('digital-activation-call', this.persistingData);
    this._fireEvent('digital-activation-device-info-call', this.device);
    this._fireEvent('digital-activation-click-success', true);
    if (this.registerQR) {
      this.persistStatusQR();
    }
    this.resetPage();
    this.resetData();
  }

  /**
   * @description the landingQr value persists
   */
  persistStatusQR() {
    this._fireEvent('persist-status-qr', this.registerQR);
  }

  /**
  * @description Show modal when wrong information is entered
  */
  _incorrectDataError() {
    this._checkModal = true;
    let eventName = this.incorrectDataEvent;
    const detail = {
      code: this.incorrectDataCode,
      selectedConfig: {
        className: 'info header--white close-button--right',
        openMaximized: true,
        iconOnlyFullHeight: true,
        title: 'glomo-digital-activation-dm-error-modal-header-title',
        heroImage: './images/Error.svg',
        template: {
          type: 'paragraphs',
          values: [
            { title: 'glomo-digital-activation-dm-paragraph-incorrect-data-title' },
            { text: 'glomo-digital-activation-dm-paragraph-incorrect-data-text', class: 'spacing normal' }
          ]
        }
      }
    };
    if (this.incorrectDataNumberTries < this.incorrectDataMaxTry && !this.showModalExitDefinitly) {
      this.incorrectDataNumberTries += 1;
      detail.selectedConfig.acceptBtLabel = 'glomo-digital-activation-dm-understood-accept-label';
      detail.selectedConfig.template.values.push(this._chatWithAdvisor());
    } else {
      this.incorrectDataNumberTries = 0;
      eventName = this.incorrectDataMaxEvent;
      detail.code = this.incorrectDataMaxCode;
      detail.selectedConfig.acceptBtLabel = 'glomo-digital-activation-dm-call-accept-label';
      detail.selectedConfig.cancelBtLabel = 'glomo-digital-activation-dm-exit-cancel-label';
      detail.selectedConfig.template.values.pop();
      detail.selectedConfig.template.values.push({ text: 'glomo-digital-activation-dm-paragraph-incorrect-data-try-limit-first-text', class: 'spacing normal' });
      detail.selectedConfig.template.values.push(
        {
          linkIcon: 'coronita:place',
          iconClass: 'icon-size-20',
          link: 'glomo-digital-activation-dm-branch-offices',
          eventName: 'digital-activation-show-branch-offices'
        });
    }
    this._fireEvent(eventName, detail);
  }

  /**
  * @description Show modal when the hiring not done
  */
  _hiringNotDoneError() {
    this._checkModal = true;
    let eventName = this.hiringNotDoneEvent;
    const detail = {
      code: this.hiringNotDoneCode,
      selectedConfig: {
        className: 'info header--white close-button--right',
        openMaximized: true,
        iconOnlyFullHeight: true,
        title: 'glomo-digital-activation-dm-error-modal-header-title',
        heroImage: './images/Error.svg',
        template: {
          type: 'paragraphs',
          values: [
            { title: 'glomo-digital-activation-dm-paragraph-hiring-not-done-title' },
            { text: 'glomo-digital-activation-dm-paragraph-hiring-not-done-text', class: 'spacing normal' }
          ]
        }
      }
    };
    this.hiringNotDoneNumberTries += 1;
    if (this.hiringNotDoneNumberTries < this.hiringNotDoneMaxTry) {
      detail.selectedConfig.acceptBtLabel = 'glomo-digital-activation-dm-retry-accept-label';
    } else {
      this.hiringNotDoneNumberTries = 0;
      eventName = this.hiringNotDoneMaxEvent;
      detail.code = this.hiringNotDoneMaxCode;
      detail.selectedConfig.acceptBtLabel = 'glomo-digital-activation-dm-call-accept-label';
      detail.selectedConfig.cancelBtLabel = 'glomo-digital-activation-dm-exit-cancel-label';
      detail.selectedConfig.template.values.pop();
      detail.selectedConfig.template.values.push({ text: 'glomo-digital-activation-dm-paragraph-hiring-not-done-second-text', class: 'spacing normal' });
      detail.selectedConfig.template.values.push(
        {
          linkIcon: 'coronita:place',
          iconClass: 'icon-size-20',
          link: 'glomo-digital-activation-dm-branch-offices',
          eventName: 'digital-activation-show-branch-offices'
        });
    }

    this._fireEvent(eventName, detail);
  }

  /**
  * @description Show modal when the connection is interrupted
  */
  _interrumpedConnectionModal() {
    this._checkModal = true;
    let eventName = this.interrumpedConnectionEvent;
    const detail = {
      code: this.interrumpedConnectionCode,
      selectedConfig: {
        className: 'custom error close-button--right',
        openMaximized: false,
        iconOnlyFullHeight: true,
        title: 'glomo-digital-activation-dm-error-modal-header-title',
        template: {
          type: 'paragraphs',
          values: [
            { icon: 'coronita:alert' },
            { title: 'glomo-digital-activation-dm-paragraph-interrumped-connection-title' },
            { text: 'glomo-digital-activation-dm-paragraph-interrumped-connection-text', class: 'spacing--xs' }
          ]
        }
      }
    };
    this.interrumpedConnectionNumberTries += 1;
    if (this.interrumpedConnectionNumberTries < this.interrumpedConnectionMaxTry) {
      detail.selectedConfig.acceptBtLabel = 'glomo-digital-activation-dm-retry-accept-label';
    } else {
      this.interrumpedConnectionNumberTries = 0;
      eventName = this.interrumpedConnectionMaxEvent;
      detail.code = this.interrumpedConnectionMaxCode;
      detail.selectedConfig.acceptBtLabel = 'glomo-digital-activation-dm-exit-cancel-label';
      detail.selectedConfig.template.values.pop();
      detail.selectedConfig.template.values.push({ text: 'glomo-digital-activation-dm-paragraph-interrumped-connection-try-limit-text' });
    }
    this._fireEvent(eventName, detail);
  }

  /**
   * @description method that saves flag to reset when entering the chat with advisor
   */
  resetWithAdvisorChat() {
    this.advisorChatFlag = true;
    this.reset();
  }

  /**
   * @description native response method to hide or show secondary icon in header for advisor chat
   * @param {*} detail
   */
  hideButtonHeaderChat(detail = {}) {
    if (Object.keys(detail).length !== 0) {
      this.iconSecondary = !detail.hide ? 'coronita:support' : '';
    }
    this._fireEvent('icon-secundary-header', this.iconSecondary);
  }

  /**
  * @description Show modal when use diferent card
  */
  _digitalActivationAdditional() {
    this._checkModal = true;
    const detail = {
      code: 'DIGITAL-ACTIVATION-ADDITIONAL',
      selectedConfig: {
        className: 'info header--white close-button--right',
        openMaximized: true,
        iconOnlyFullHeight: true,
        title: 'glomo-digital-activation-dm-error-modal-header-title',
        acceptBtLabel: 'glomo-digital-activation-dm-understood-accept-label',
        heroImage: './images/Error.svg',
        template: {
          type: 'paragraphs',
          values: [
            { title: 'glomo-digital-activation-dm-additional-title' },
            { text: 'glomo-digital-activation-dm-additional-text' }
          ]
        }
      }
    };
    this._getConfigOpenModal(detail);
    this._fireEvent('digital-activation-show-modal-additional');
  }

  /**
  * @description Show modal when invalid card error happens
  */
  _digitalActivationInvalidCardError() {
    this._checkModal = true;
    const detail = {
      code: 'DIGITAL-ACTIVATION-INVALID-CARD-ERROR',
      selectedConfig: {
        className: 'error close-button--right',
        openMaximized: true,
        iconOnlyFullHeight: true,
        title: 'glomo-digital-activation-dm-error-modal-header-title',
        acceptBtLabel: 'glomo-digital-activation-dm-understood-accept-label',
        heroImage: './images/Error.svg',
        template: {
          type: 'paragraphs',
          values: [
            { title: 'glomo-digital-activation-dm-invalid-card-error-title' },
            { text: 'glomo-digital-activation-dm-invalid-card-error-text', class: 'spacing--xs' },
            {
              linkIcon: 'coronita:telephone',
              iconClass: 'icon-size-20',
              link: 'glomo-digital-activation-dm-call-label',
              eventName: 'digital-activation-show-call-bbva-line'
            }
          ]
        }
      }
    };
    this._getConfigOpenModal(detail);
  }

  /**
  * @description Show modal when user has invalid CURP
  */
  _digitalActivationInvalidCurpError() {
    this._checkModal = true;
    let eventName = this.invalidCurpEvent;
    const detail = {
      code: this.invalidCurpCode,
      selectedConfig: {
        className: 'info header--white close-button--right',
        openMaximized: true,
        iconOnlyFullHeight: true,
        title: 'glomo-digital-activation-dm-error-modal-header-title',
        acceptBtLabel: 'glomo-digital-activation-dm-understood-accept-label',
        heroImage: './images/Error.svg',
        template: {
          type: 'paragraphs',
          values: [
            { title: 'glomo-digital-activation-dm-paragraph-invalid-curp-title' },
            { text: 'glomo-digital-activation-dm-paragraph-invalid-curp-text' }
          ]
        }
      }
    };
    this._fireEvent(eventName, detail);
  }
  /**
   * @description returns the value of the card that comes from the landingQr
   * @param {String} registerQR
   * @param {Object} dataPan
   *
   */
  reviewStatus() {
    if (this.registerQR && this.dataPan) {
      this.urlString = this.dataPan.urlQrLanding;
      let cardValue = this.dataPan.qrString;
      this.isQrFlow = true;
      this._fireEvent('send-encrypted-card-number', cardValue);
    }
  }
  /**
   * @description Send configuration to OCR plugin
   * @event 'build-payload-card-data'
   */
  buildOCRPayload() {
    const args = {
      guideColor: this.guideColorOcr,
      suppressConfirmation: true
    };
    this._fireEvent('build-payload-card-data', args);
  }

  /**
   * @description Receive card number from ocr plugin
   * @event 'send-ocr-card-number'
   */
  ocrCard({ cardNumber }) {
    if (cardNumber !== '') {
      this._fireEvent('send-ocr-card-number', cardNumber);
    }
  }

  /**
  * @description Show modal when app is not available for pfae user
  */
  _digitalActivationNotAvailableAppError() {
    this._checkModal = true;
    let eventName = this.notAvailableAppEvent;
    const detail = {
      code: this.notAvailableAppCode,
      selectedConfig: {
        className: 'info header--white close-button--right',
        openMaximized: true,
        iconOnlyFullHeight: true,
        title: 'glomo-digital-activation-dm-error-modal-header-title',
        acceptBtLabel: 'glomo-digital-activation-dm-exit-cancel-label',
        heroImage: './images/Error.svg',
        template: {
          type: 'paragraphs',
          values: [
            { title: 'glomo-digital-activation-dm-paragraph-not-available-app-title' },
            { text: 'glomo-digital-activation-dm-paragraph-not-available-app-text' }
          ]
        },
        hasMultipleRedirectLink: {
          values: [
            { linkIcon: 'coronita:globe', iconClass: 'icon-size-20', link: 'glomo-digital-activation-dm-go-to-web-site-label', eventName: 'digital-activation-show-bbva-link' },
            { linkIcon: 'coronita:telephone', iconClass: 'icon-size-20', link: 'glomo-digital-activation-dm-call-label', eventName: 'digital-activation-show-call-bbva-line' },
          ]
        }
      }
    };
    this._fireEvent(eventName, detail);
  }

  /**
  * @description Show modal when token is locked for pfae user
  */
  _digitalActivationLockedTokenError() {
    this._checkModal = true;
    let eventName = this.lockedTokenEvent;
    const detail = {
      code: this.lockedTokenCode,
      selectedConfig: {
        className: 'info header--white close-button--right',
        openMaximized: true,
        iconOnlyFullHeight: true,
        title: 'glomo-digital-activation-dm-error-modal-header-title',
        acceptBtLabel: 'glomo-digital-activation-dm-exit-cancel-label',
        heroImage: './images/Error.svg',
        template: {
          type: 'paragraphs',
          values: [
            { title: 'glomo-digital-activation-dm-paragraph-locked-token-title' },
            { text: 'glomo-digital-activation-dm-paragraph-locked-token-text' }
          ]
        },
        hasMultipleRedirectLink: {
          values: [
            { linkIcon: 'coronita:globe', iconClass: 'icon-size-20', link: 'glomo-digital-activation-dm-go-to-web-site-label', eventName: 'digital-activation-show-bbva-link' },
            { linkIcon: 'coronita:telephone', iconClass: 'icon-size-20', link: 'glomo-digital-activation-dm-call-label', eventName: 'digital-activation-show-call-bbva-line' },
          ]
        }
      }
    };
    this._fireEvent(eventName, detail);
  }

  /**
   * @description Send link to navigate outside the app
   */
  openBbvaLink() {
    this._fireEvent('digital-activation-open-bbva-link', {
      link: this.urlBbva
    });
  }

  /**
   * @description method that receives and sets property the time sent from the service
   * @param {*} date
   */
  _dataHeaders(date) {
    this.zoneChange = moment.tz(date.detail, this.timeZone).format('HH:mm:ss');
    this.dateService = this.zoneChange;
  }

  /**
   * @description method to validate that the additional flag is active
   */
  _additionalFlagValidation() {
    if (this.profileAdicional) {
      let numberSubstring = this.mobileNumber.substr(-2);
      let rangeValidation = numberSubstring >= '00' && numberSubstring <= this.device.additionalFlag;
      if (Object.keys(this.device.additionalFlag).length !== 0) {
        if (!rangeValidation) {
          this._modalGeneralErrorAdditional();
          this.stepFlag = true;
        }
      } else {
        this._modalGeneralErrorAdditional();
        this.stepFlag = true;
      }
    }
  }

  /**
   * @description method that shows the error modal when the additional flag is off
   */
  _modalGeneralErrorAdditional() {
    this._checkModal = true;
    let detail = {
      code: 'ERROR-MODAL-ADDITIONAL',
      selectedConfig: {
        className: 'custom error close-button--right',
        openMaximized: false,
        iconOnlyFullHeight: true,
        title: 'digital-activation-call-error-general-title',
        acceptBtLabel: 'digital-activation-call-error-exit-button-label',
        template: {
          type: 'paragraphs',
          values: [
            { icon: 'coronita:alert' },
            { title: 'digital-activation-call-error-general-title' },
            { text: 'digital-activation-call-error-general-text-additional', class: 'spacing--xs' }
          ]
        }
      }
    };
    this._getConfigOpenModal(detail);
  }

  /**
   * Method to handle close on left icon action, will be validated by page
   */
  handleCloseButton() {
    this._checkModal = true;
    const alertCloseButton = {
      code: 'DIGITAL-ACTIVATION-CLOSE-PAGE',
      selectedConfig: {
        className: 'info',
        openMaximized: false,
        iconOnlyFullHeight: true,
        acceptBtLabel: 'digital-activation-dm-exit-modal-accept-label',
        cancelBtLabel: 'digital-activation-dm-exit-modal-cancel-label',
        closeOnSecondaryButton: true,
        cancelFromHeaderEvent: undefined,
        template: {
          type: 'paragraphs',
          values: [
            { icon: 'coronita:help', class: 'info spacing' },
            { text: 'digital-activation-dm-paragraph-exit-text' },
          ]
        }
      }
    };
    this._getConfigOpenModal(alertCloseButton);
  }

  /**
  * @param {Object} icon
  * @description Send detail for modal help passwrod
  */
  modalHelpPassword(icon) {
    this._checkModal = true;
    if (!this.hideModalHelpPasword || icon.password) {
      this.setRegexConfig();
      this.hideModalHelpPasword = true;
      const passwordHelpModal = {
        code: 'help-password-modal',
        primaryButtonClass: 'primary',
        selectedConfig: {
          className: 'info header--white access-key-recovery-pass-modal close-button--right credit-bureau--tooltip',
          heroImage: icon.password === true ? '' : './images/lock_with_buttons.svg',
          openMaximized: true,
          iconOnlyFullHeight: undefined,
          title: 'cells-step-recovery-password-confirm-title',
          acceptBtLabel: 'glomo-key-recovery-dm-continue-button',
          template: this._bodyTemplateModal(icon)
        }
      };
      this._fireEvent('show-modal-help-password-data');
      this._getConfigOpenModal(passwordHelpModal);
    }
  }

  /**
  * @description Body for modal help passwrod
  * @param {Object} icon
  * @returns data
  */
  _bodyTemplateModal(iconImg) {
    let iconInfo = iconImg.password === true ?
      {
        icon: 'coronita:help',
        iconClass: 'icon-size-24 dark-core-blue'
      } : {};
    let data = {
      type: 'paragraphs',
      values: [
        iconInfo, {
          text: 'cells-step-recovery-password-confirm-template-text'
        },
        {
          list: [
            'cells-step-recovery-password-confirm-template-list-first-value',
            'cells-step-recovery-password-confirm-template-list-second-value',
            'cells-step-recovery-password-confirm-template-list-third-value',
            'cells-step-recovery-password-confirm-template-list-fourth-value'],
          class: 'text-align-left'
        },
        {
          icon: 'coronita:info',
          class: 'middle-space',
          heading: 'cells-step-recovery-password-confirm-template-heading',
          message: 'cells-step-recovery-password-confirm-template-message',
          type: 'info-dark'
        }
      ]
    };
    return data;
  }

  /**
   * @description method that returns directly to login after additional case
   */
  exitAdditional() {
    this.stepFlag = false;
    this.reset();
  }

  /**
  * @description  reset properties
  */
  resetData() {
    this.mobileNumber = '';
    this.cardNumber = '';
    this.email = '';
    this.customerId = '';
    this.signatureId = '';
    this.password = '';
    this.documentTemplateId = '';
    this.templateTypeId = '';
    this.digitalActivationFlag = false;
    this.isQrFlow = false;
    this.urlString = false;
    this.interrumpedConnectionNumberTries = 0;
    this.hiringNotDoneNumberTries = 0;
    this.qRFlag = false;
    this.showModalExitDefinitly = false;
    this.set('stepInformation', {});
    this.advisorChatFlag = false;
    this.iconSecondary = '';
    this.set('dataPan', {});
    this.showBirthDateFlag = false;
    this.dateService = '';
    this.flagGrantingticketQr = false;
    this.qrToken = '';
    this.hideModalHelpPasword = false;
    this._authenticationType = '';
    this._checkModal = false;
    this.callNewKsjo = false;
    this._failedQr = 0;
    this.activeAlerts = false;
  }

  /**
  * @description  reset page
  */
  resetPage() {
    this._fireEvent('hide-step-birth-date', false);
    this._fireEvent('hide-step-cvv-nip', false);
    this._fireEvent('hide-step-email', false);
    this._fireEvent('reset-steps');
    this._fireEvent('reset-steps-email', true);
  }

  /**
  * @description  reset all
  */
  reset() {
    this.resetData();
    this.resetPage();
    if (this.registerQR) {
      this._fireEvent('reset-qr-reader-activation');
      this.registerQR = false;
    }
    if (this.registerUserData) {
      this._openControlVeil();
      this._fireEvent('reset-flow-navigation-back', this.registerUserData);
      this.registerUserData = false;
    }
    if (!this.advisorChatFlag) {
      this.set('device', {});
      this._backToLogin();
    }
  }

  /**
  * @description validate back navigation
  */
  handleBackButton() {
    if (!this._checkModal) {
      this.handleCloseButton();
    } else {
      this._checkModal = false;
      this._fireEvent('close-modal');
    }
  }

  /**
  * @description  Advice modal opened yet for handleBackButton / data are received from close modal alert event
  */
  openModal(data) {
    if (!data) {
      this._checkModal = false;
    }
  }

  /**
   * @description method to display Chat with advisor icon with a schedule of service
   * @returns advisorChatObject
   */
  _chatWithAdvisor() {
    if (this.isActiveChat) {
      if (this.dateService < this.chatStartTime || this.dateService > this.chatEndTime || !this.dateService) {
        this.set('advisorChatObject', {});
      } else {
        this.set('advisorChatObject', {
          linkIcon: 'coronita:support',
          iconClass: 'icon-size-20',
          link: 'glomo-digital-activation-dm-branch-chat-advisor',
          eventName: 'digital-activation-show-branch-chat-advisor'
        });
      }
    } else {
      this.set('advisorChatObject', {});
    }
    return this.advisorChatObject;
  }

  /**
   * @description Get service for terms and conditions and send native
   * @param {*} param
   */
  getTermsAndConditions(param) {
    const params = {
      value: param,
      ...this.structureContractCud
    };
    this._fireEvent('native-download-receipt', params);
  }

  /**
   * @description Started signature pad plugin
   */
  signaturePad() {
    this._fireEvent('native-signature');
  }

  /**
   * @description Get capture signature
   * @param {Object} e
   */
  signatureCaptureSuccess(e) {
    this.signatureBase64 = e;
    this._fireEvent('step-service-contract-active-button', true);
  }

  /**
   * @description Get signature id
   * @param {Object} e
   */
  signatureSendSuccess(e) {
    if (this.c(e, 'signatureId')) {
      this.signatureId = e.signatureId;
    }
  }

  /**
     * @description  fire event to native with customerId
     */
  sendSignatureCustomerId() {
    this._openControlVeil();
    let signatureData = {
      customerId: this.persistingData.customerId || ''
    };
    this._fireEvent('send-signature-data-native', signatureData);
  }

  /**
   * @description Success for detail signature id
   * @param {Object} e
   */
  _signaturesSuccess(e) {
    this.signatureId = e.detail.id;
  }

  /**
   * @description Execution of petition for signature
   */
  sendSignature() {
    this._openControlVeil();
    this.native = false;
    let binary = this.fixBinary(window.atob(this.signatureBase64));
    let theFile = new Blob([ binary ], { type: 'image/png' });
    let imagenFirma = new File([ theFile ], 'imagen_firma.png', { type: 'image/png' });
    const payload = {
      customerId: this.customerId,
      file: imagenFirma
    };
    this.$.cellsDmGlobalApisCustomersMX.postSignatures(payload);
  }

  fixBinary(bin) {
    var lengthBin = bin.length;
    var buf = new ArrayBuffer(lengthBin);
    var arr = new Uint8Array(buf);
    for (var i = 0; i < lengthBin; i++) {
      arr[i] = bin.charCodeAt(i);
    }
    return buf;
  }

  /**
   * @description Method for type flow (Normal, alertas, monoproducto)
   */
  _typeFlow() {
    this._fireEvent('send-data-type-flow', this.typeFlow);
  }

  /**
   * Navigates to ATM Locator page
   */
  navigateToAtm() {
    this._navigateTo({ page: 'atmLocator' });
  }

  /**
   * Navigate to Digital Activation Call page
   */
  navigateToCall() {
    this._navigateTo({ page: 'digitalActivationCall' });
  }

  /**
   * Navigate to Digital Activation Mobile Services page
   */
  _navigateToMobilesServices() {
    this._navigateTo({ page: 'digitalActivationMobileServices' });
  }

  /**
   * Navigates to the given page with the given parameters
   * @param {Object} data
   */
  _navigateTo({ page }) {
    this._fireEvent('digital-activation-navigate-to-page', { page });
  }

  setNewKsjoFlag(payload) {
    if (payload && payload !== {}) {
      this.callNewKsjo = this.get('isFlagEnable', payload);
    }
  }

  /**
  * @description open modal privacy
  */
  privacyModal() {
    const detail = {
      code: 'privacy-modal',
      primaryButtonClass: 'primary',
      selectedConfig: {
        className: 'header--white credit-bureau--tooltip',
        openMaximized: true,
        buttonsNotFixed: true,
        title: 'digital-activation-modal-header-privacy-header',
        acceptBtLabel: 'digital-activation-modal-btn-understood-privacy-advice',
        template: {
          type: 'paragraphs',
          values: [{
            title: 'digital-activation-modal-privacy-advice-title',
            class: 'spacing below-paragraph title-left text-align-left'
          },
          {
            text: 'digital-activation-modal-privacy-advice-description',
            class: 'ul-li--text-left'
          }]
        }
      }
    };
    this._getConfigOpenModal(detail);
  }

  /**
  * @description set component properties cells-step-identity-validation
  */
  identityValidationProperties() {
    const dataIdentification = {
      stepTitle: 'digital-activation-identity-validation-step-title',
      className: 'cells-background-blue',
      decorated: false,
      hiddenDivider: true,
      disableChange: true,
      dataIdentification: [
        {
          description: {
            value: 'cells-step-identity-validation-step-description',
            class: 'text-description'
          },
          verticalStep: {
            steps: [
              {
                title: 'cells-step-identity-validation-vertical-step-title-one',
              },
              {
                title: 'cells-step-identity-validation-vertical-step-title-two',
              },
            ]
          },
          iconMessage: {
            iconSize: '18',
            type: 'info',
            icon: 'coronita:info',
            message: 'cells-step-identity-validation-icon-message-message'
          },
          textDescriptionPrivacy: 'cells-step-identity-validation-icon-message-privacy',
          checkboxLabel: 'cells-step-identity-validation-check-box-message',
          visibleBtnLoading: {
            textButton: 'cells-step-identity-validation-text-button',
          },
          descriptionValidation: {
            text: 'cells-step-identity-validation-description-validation'
          }
        }
      ],
      filledMessageDescription: [
        {
          texts: {
            document: 'cells-step-identity-validation-filled-text-document',
            selfie: 'cells-step-identity-validation-filled-text-selfie',
            personalData: 'cells-step-identity-validation-filled-text-personal-date'
          }
        }
      ]
    };
    this._fireEvent('show-step-identity-validation', dataIdentification);
  }

  /**
  * @description start alert flow
  */
  startHiringAlerts() {
    this.activeAlerts = true;
    if (this.qRFlag) {
      this.typeFlow = 'alertas';
      this.startIdentityValidationProcess();
    }
    this._typeFlow();
    this._fireEvent('hidden-step-identity-validation', true);
    this._fireEvent('show-step-cvv-nip', true);
    this._fireEvent('hide-decorated-step', !this.qRFlag);
    this._fireEvent('hide-decorated-step-cud', true);
  }

  /**
  * @description start identity validation
  */
  startIdentityValidationProcess() {
    this.processModal();
    this._fireEvent('active-step-identity-validation', true);
  }

  /**
  * @description create verification id
  */
  openVeridasBox() {
    const configBox = {
      body: {
        validationType: 'WITH_FLASH',
        origin: {
          id: this.flagMonoProduct ? 'digital-activation-monoproducto' : 'digital-activation-alertas'
        }
      }
    };
    this._fireEvent('open-veridas-box', configBox);
  }

  /**
  * @description create verification id success
  */
  openVeridasBoxSuccess(payload) {
    const idVeridasBox = payload?.id;
    if (idVeridasBox !== undefined) {
      this.set('veridasOpenBoxId', idVeridasBox);
      this.set('_isVeridasBoxClosed', false);
      this.documentModal();
    }
  }

  /**
   *
   * @param {*} response
   * @description Handle erros in identity validation proccess
   */
  errorIdentityValidationProcess(response) {
    this.hideSpinnerWithText();
    const httpStatus = response.detail?.status ? response.detail?.status : response.status;
    const detail = response.detail ? response.detail : response;
    if (httpStatus !== undefined) {
      if (this.flagMonoProduct && httpStatus === 400) {
        this._validationStatusUserMonoProduct(detail);
      } else {
        return httpStatus === 500
          ? this._interrumpedConnectionModal()
          : this.communicationIneErrorModal();
      }
    } else {
      this._interrumpedConnectionModal();
    }
  }

  /**
   *
   * @description Validation of controlled errors for monoproduct users
   *
   */
  _validationStatusUserMonoProduct(detail) {
    const errorCode = detail?.messages[0].code;
    if (errorCode === 'cardStatusNotAllowed') {
      this.userWithCard();
    } else if (errorCode === 'invalidChannelOperation') {
      this.userRegistered();
    } else if (this.errorInvalidCredit.includes(errorCode)) {
      this.userErrorCredit();
    } else if (this.errorInvalidPhone.includes(errorCode)) {
      this._fireEvent(errorCode === 'alreadyRequested' ? 'user-monoproduct-with-alerts' : 'user-monoproduct-invalid-phone');
      this.errorNumberPhone();
    } else {
      this.communicationIneErrorModal();
    }
  }

  /**
  * @description open modal indicating start of identity verification
  */
  processModal() {
    const detail = {
      code: 'process-identity',
      primaryButtonClass: 'primary',
      selectedConfig: {
        className: 'full-height-info header--white close-button--right',
        openMaximized: true,
        title: 'digital-activation-modal-header-process',
        heroImage: './images/digitalActivation/lean-mobile.svg',
        acceptBtLabel: 'digital-activation-button-text',
        template: {
          type: 'paragraphs',
          values: [{
            title: 'digital-activation-modal-first-title',
            class: 'spacing'
          },
          {
            list: [
              'digital-activation-modal-list-verify-id',
              'digital-activation-modal-sign-contract',
              'digital-activation-modal-app'
            ],
            class: 'cells-lists-with-text-left'
          },
          {
            type: 'info-dark',
            icon: 'coronita:info',
            message: 'digital-activation-modal-text-box'
          }]
        }
      }
    };
    this._getConfigOpenModal(detail);
    this._fireEvent('show-process-modal');
  }

  /**
  * @description Method init process identity validation
  */
  initIdentityValidation() {
    this.set('_isVeridasBoxClosed', true);
    this._documentEvidence = [];
    this._selfieEvidence = [];
    this._photoConvertedResult = [];
    this._isVeridasBoxClosed = false;
    this.idDocumentTypes = [];
    this.reverseFlag = false;
    this.selfieFlag = false;
    this.selfieAliveFlag = false;
    this.obverseFlashFlag = false;
    this.obverseFlag = false;
    this._configRequest = [];
    this.openVeridasBox();
  }

  /**
  * @description open modal ine instructions
  */
  documentModal() {
    const detailIne = {
      code: 'take-ine-document',
      primaryButtonClass: 'primary',
      selectedConfig: {
        className: 'paragraphs__list header--white',
        openMaximized: true,
        title: 'digital-activation-modal-ine-header-title',
        acceptBtLabel: 'digital-activation-modal-ine-btn-accept',
        template: {
          type: 'paragraphs',
          values: [
            {
              icon: 'coronita:idcard',
              iconClass: 'icon-size-24',
              iconSize: '24',
              class: 'text-center margin-top-none rounded'
            },
            {
              title: 'digital-activation-modal-ine-description-title',
              class: 'simple-title text-center confirm-description margin-bottom-s'
            },
            {
              text: 'digital-activation-modal-ine-description-text',
              class: 'spacing text-center'
            }]
        }
      }
    };
    this._getConfigOpenModal(detailIne);
    this._fireEvent('show-document-modal');
  }

  /**
   * Checks camera state plugin permission
   * @event request-dvs-camera-permissions
   */
  checkCameraState() {
    this._fireEvent('check-dvs-camera-state', 'camera');
  }

  /**
   * Requests camera permissions
   * @event request-dvs-camera-permissions
   */
  requestPermission() {
    this._fireEvent('request-dvs-camera-permissions', 'camera');
  }

  /**
   * Handle permissions errors from mobile plugin permissions
   */
  handlePermissionErrors(response) {
    if (response.code === 2 || response.code === 4) {
      if (this.flagMonoProduct) {
        this._fireEvent('show-error-permissions-camera-modal');
      }
      this.allowAccessCamErrorModal();
    } else {
      this._interrumpedConnectionModal();
    }
  }

  /**
   * Triggers document flow possibilities
   * @param {Object} detail
   * @event start-document-capture-step
  */
  startDocumentCaptureFlow(detail = {}) {
    if (detail.state === 'granted') {
      this._fireEvent('start-document-capture', this.identificationConfig);
    } else {
      this.requestPermission();
    }
  }

  /**
   * Prepare photos to make put document calls
   * @param {Array} elements taken photos
  */
  documentCaptureSuccess(response = []) {
    this._documentEvidence = response;
    this._extractDocumentId(this._documentEvidence);
    this.photoConverter.getImageFile({ url: this._documentEvidence[0].url, imageName: `IMG${this.photoName}0`, eventName: 'document-without-flash' });
    this.selfieModal();
  }

  /**
   * Method to trigger on capture plugin error or on close camera
  */
  handlePluginError() {
    this._interrumpedConnectionModal();
  }

  /**
   * @description open modal with selfie instructions
  */
  selfieModal() {
    const detailSelfie = {
      code: 'take-selfie-alive',
      primaryButtonClass: 'primary',
      selectedConfig: {
        className: 'paragraphs__list full-height-info header--white close-button--right',
        openMaximized: true,
        title: 'digital-activation-modal-selfie-header-title',
        acceptBtLabel: 'digital-activation-modal-selfie-btn-accept',
        template: {
          type: 'paragraphs',
          values: [
            {
              icon: 'coronita:photologin',
              iconClass: 'icon-size-24 dark-core-blue',
              iconSize: '24',
              class: 'text-center margin-top-none rounded spacing'
            },
            {
              title: 'digital-activation-modal-selfie-description-title',
              class: 'simple-title text-center margin-bottom-s spacing confirm-description'
            },
            {
              text: 'digital-activation-modal-selfie-description-text',
            }]
        }
      }
    };
    this._getConfigOpenModal(detailSelfie);
    this._fireEvent('show-selfie-modal');
  }

  /**
   * Triggers selfie flow possibilities
   * @event start-capture-with-config-selfie
   */
  startSelfieCaptureFlow() {
    if (this.application === 'mx') {
      this._fireEvent('start-capture-with-config-selfie', this.selfieConfig);
    } else {
      this._fireEvent('launch-selfie-native-process', {});
    }
  }

  /**
   * @description processing selfie images
   * @param {*} e
   */
  processingSelfieCapture(e = []) {
    this._selfieEvidence = e;
    this.photoConverter.getImageFile({ url: this._selfieEvidence[0].url, imageName: `IMG${this.photoName}3`, eventName: 'document-selfie' });
    this.showSpinnerWithText();
    this._savePhotoInVeridas(this._configRequest.documentWithoutFlash);
  }
  /**
  * @description open spinner with text
  */
  showSpinnerWithText() {
    this._fireEvent('show-identity-validation-spinner', true);
  }

  /**
  * @description close spinner with text
  */
  hideSpinnerWithText() {
    this._fireEvent('hide-identity-validation-spinner', true);
  }

  /**
  * @description get converter node
  */
  get photoConverter() {
    return this.shadowRoot.getElementById('converter');
  }

  /**
  * @description Get the base of the photos name
  */
  get photoName() {
    return moment().format('DMYYYY');
  }

  /**
  * @param {*} documentEdivence
  */
  _extractDocumentId(documentEdivence) {
    const firstObject = documentEdivence[0];
    const secondObject = documentEdivence[1];
    const thirdObject = documentEdivence[2];

    this._setTypeId(firstObject);
    this._setTypeId(secondObject);
    this._setTypeId(thirdObject);
  }

  /**
   * Set the documentId for the idDocumentTypes propertie
   */
  _setTypeId(object = {}) {
    if (object.face === 'front' && !object.flash) {
      this.set('idDocumentTypes.frontWithoutFlash', object.documentIds[0]);
    }

    if (object.face === 'front' && object.flash) {
      this.set('idDocumentTypes.frontFlash', object.documentIds[0]);
    }

    if (object.face === 'back') {
      this.set('idDocumentTypes.back', object.documentIds[0]);
    }
  }

  /**
  * @description open success identity validation modal
  */
  successValidationModal() {
    const detail = {
      code: 'success-validation-identification',
      selectedConfig: {
        className: 'full-height-info dark-background',
        heroImage: './images/digitalActivation/access_biometric.svg',
        openMaximized: true,
        title: 'digital-activation-identity-verification-header',
        acceptBtLabel: 'digital-activation-button-text',
        template: {
          type: 'paragraphs',
          values: [{
            title: 'digital-activation-identity-verification',
            class: 'spacing'
          },
          {
            title: this._getDateAndTime(),
            class: 'spacing'
          },
          {
            icon: 'coronita:info',
            message: 'digital-activation-identity-verification-message-box',
            type: 'info-dark'
          }]
        }
      }
    };
    this._getConfigOpenModal(detail);
    this._fireEvent('show-success-validation-modal');
  }

  /**
  * @description collapsed step identity validation and start GT level up
  * @event 'decorated-collapsed-step-identity-validation'
  * @event 'fixed-step-identification-form'
  */
  successValidationIdentity() {
    const decoratedIdentityValidation = {
      collapsed: true,
      decorated: true
    };
    const fixedDecorated = {
      disableChange: true,
      decorated: false
    };

    this._fireEvent('decorated-collapsed-step-identity-validation', decoratedIdentityValidation);
    this._fireEvent('fixed-step-identification-form', fixedDecorated);
    this.getGrantingTicketDvs();
  }

  /**
   * Success document without flash converted
   * @param {Object} detail
   */
  _successDocumentWithoutConverted({ detail }) {
    let configRequest = {
      imageFile: detail?.file,
      verificationId: this.veridasOpenBoxId,
      attachement: 'obverse-image',
      documentType: this.idDocumentTypes.frontWithoutFlash
    };
    this.set('_photoConvertedResult.documentWithoutFlash', detail);
    this.set('_configRequest.documentWithoutFlash', configRequest);
    this.photoConverter.getImageFile({ url: this._documentEvidence[1].url, imageName: `IMG${this.photoName}1`, eventName: 'document-with-flash' });
  }

  /**
   * Success document with flash converted
   * @param {Object} detail
   */
  _successDocumentWithConverted({ detail }) {
    let configRequest = {
      imageFile: detail?.file,
      verificationId: this.veridasOpenBoxId,
      attachement: 'obverse-flash-image',
      documentType: this.idDocumentTypes.frontFlash
    };
    this.set('_photoConvertedResult.documentWithFlash', detail);
    this.set('_configRequest.documentWithFlash', configRequest);
    this.photoConverter.getImageFile({ url: this._documentEvidence[2].url, imageName: `IMG${this.photoName}2`, eventName: 'document-reverse' });

  }

  /**
   * Success document reverse converted
   * @param {Object} detail
   */
  _successDocumentReverseConverted({ detail }) {
    let configRequest = {
      imageFile: detail?.file,
      verificationId: this.veridasOpenBoxId,
      attachement: 'reverse-image',
      documentType: this.idDocumentTypes.back
    };
    this.set('_photoConvertedResult.documentReverse', detail);
    this.set('_configRequest.documentReverse', configRequest);
  }

  /**
  * @description document selfie converted success
  */
  _successDocumentSelfieConverted({ detail }) {
    let configRequest = {
      imageFile: detail?.file,
      verificationId: this.veridasOpenBoxId,
      attachement: 'selfie-image',
      documentType: 'MX'
    };
    this.set('_photoConvertedResult.documentSelfie', detail);
    this.set('_configRequest.documentSelfie', configRequest);
    this.photoConverter.getImageFile({ url: this._selfieEvidence[2].url, imageName: `IMG${this.photoName}4`, eventName: 'document-selfie-alive' });
  }

  /**
   * Success selfie alive converted
   * @param {Object} detail
   */
  _successDocumentSelfieAliveConverted({ detail }) {
    let configRequest = {
      imageFile: detail?.file,
      verificationId: this.veridasOpenBoxId,
      attachement: 'selfie-alive-image',
      documentType: 'MX'
    };
    this.set('_photoConvertedResult.documentSelfieAlive', detail);
    this.set('_configRequest.documentSelfieAlive', configRequest);
  }

  /**
     * Send even to to save the photo in veridas
     * @param {Object} configRequest
     * @event 'update-national-id-put-documents-verification'
     */
  _savePhotoInVeridas(configRequest) {
    this._fireEvent('put-documents-verification', configRequest);
  }

  /**
   * Document without flash saved success
   */
  successPutDocumentWithoutFlash() {
    this.set('obverseFlag', true);
    this._savePhotoInVeridas(this._configRequest.documentWithFlash);
  }

  /**
   * Document with flash saved success
   */
  successPutDocumentWithFlash() {
    this.set('obverseFlashFlag', true);
    this._savePhotoInVeridas(this._configRequest.documentReverse);
  }

  /**
   * Document reverse saved success
   */
  successPutDocumentReverse() {
    this.set('reverseFlag', true);
    this._savePhotoInVeridas(this._configRequest.documentSelfie);
  }

  /**
  * Document selfie saved success
  */
  successPutSelfie() {
    this.set('selfieFlag', true);
    this._savePhotoInVeridas(this._configRequest.documentSelfieAlive);
  }

  /**
  * @description set selfieAliveFlag property
  */
  successPutSelfieAlive() {
    this.set('selfieAliveFlag', true);
  }

  /**
  * @description hide spinner for identity validation process
  */
  _hideSpinnerPutVerifications(obverseFlag, obverseFlashFlag, reverseFlag, selfieFlag, selfieAliveFlag) {
    if (obverseFlag === true && obverseFlashFlag === true && reverseFlag === true && selfieFlag === true && selfieAliveFlag === true) {
      this._fireEvent('verify-veridas-box-status', this.veridasOpenBoxId);
      this._closeVeridasBox();
    }
  }

  /**
  * Close veridas box when the post customers terms is ok
  * @event 'close-veridas-box'
  */
  _closeVeridasBox() {
    this._fireEvent('close-veridas-box', this.veridasOpenBoxId);
  }

  /**
  * @description close veridas box success
  */
  successCloseVeridasBox() {
    this._fireEvent('verify-veridas-box-status', this.veridasOpenBoxId);
  }

  /**
  * @description get veridas box status success
  */
  getVeridasBoxStatusSucess(payload) {
    const httpStatus = payload?.status;
    if (httpStatus.id === 'DONE') {
      this.postDocumentsVerifications();
    } else if (httpStatus.id === 'PROCESSING') {
      setTimeout(() => this.successCloseVeridasBox(), 3500);
    }
  }

  /**
  * @description method that returns directly to login
  */
  exitDVS() {
    this.reset();
    this._backToLogin();
  }

  /**
  * @description Method to verification of a customer document using Veridas Verification System
  */
  postDocumentsVerifications() {
    this.native = false;
    let payload = {
      verificationId: this.veridasOpenBoxId,
      contactId: this.cardNumber,
      contractNumber: this.cardNumber,
      contractType: this.flagMonoProduct ? 'LOAN' : 'CARD',
      contactDetailType: 'MOBILE',
      mobileNumber: this.mobileNumber,
      selfie: this._configRequest.documentSelfie
    };
    this.$.cellsDmGlobalApisCustomerDocuments.postDocumentsVerifications(payload);
  }

  /**
  * @description Method for documents verifications success
  * @param {*} response
  */
  _successPostDocumentsVerifications(response) {
    const retryValidation = (response.detail.status.description).includes('The verification has been processed successfully|SI|');
    this.hideSpinnerWithText();
    if (retryValidation) {
      if (this.flagMonoProduct) {
        const idCustomer = response?.detail?.customer?.id.split('|');
        this.customerId = idCustomer[0];
        this.userId = idCustomer[1];
      }
      this.successValidationModal();
    } else {
      if (this.flagMonoProduct) {
        this._fireEvent('show-error-veridas-validation-modal');
      }
      this.communicationIneErrorModal();
    }
  }

  /**
  * @description Method for level up GT
  */
  getGrantingTicketDvs() {
    this.consumerIdDvs = this.consumerIdStatus;
    if (this.authenticationTypeDvs.length > 0) {
      this._authenticationType = this.authenticationTypeDvs;
    }
    this.set('userWithCredentials', {
      consumerId: this.consumerIdDvs,
      userId: this.flagMonoProduct ? this.userId : this.cardNumber,
      authenticationData: [
        {
          idAuthenticationData: 'verificationId',
          authenticationData: [ this.veridasOpenBoxId ]
        }
      ]
    });
  }

  /**
  * @description Method for level up GT success
  */
  _loginWithDvsSuccess() {
    this.enrollmentRequest();

  }

  /**
  * @description Method for level up GT error
  */
  _loginWithDvsError(response) {
    const httpStatus = response.detail?.['http-status'];
    if (httpStatus !== undefined) {
      if (httpStatus === 500) {
        this._interrumpedConnectionModal();
      } else {
        this._failedGTRequest = true;
        this.operationNotAvailableErrorModal();
      }
    } else {
      this._interrumpedConnectionModal();
    }
  }

  /**
  * @description method that enrollment request
  */
  enrollmentRequest() {
    const payload = {
      contact: this.mobileNumber,
      contract: this.flagMonoProduct ? this.userId : this.cardNumber
    };
    this._fireEvent('post-enrollment-request', payload);
  }

  /**
   * @description Method for enrollment request success
   * @param {*} response
   */
  successPostEnrollmentRequest(response) {
    this.activeNotificationRequest();
  }

  /**
   * @description Method for enrollment request error
   * @param {*} response
   */
  errorPostEnrollmentRequest(response) {
    const errorCode = response?.messages ? response.messages[0].code : '';
    if (errorCode !== undefined && errorCode === 'orderAlreadyExists') {
      if (this.flagMonoProduct) {
        this.activeNotificationRequest();
      } else {
        this._failedEnrollment = true;
        this.operationNotAvailableErrorModal();
      }
    } else {
      this._interrumpedConnectionModal();
    }
  }

  /**
  * @description request to active notification service
  */
  activeNotificationRequest() {
    const payload = {
      contact: this.mobileNumber,
      contract: this.flagMonoProduct ? this.userId : this.cardNumber
    };
    this._fireEvent('post-active-notification-request', payload);
    this._fireEvent('send-mobile-number', this.mobileNumber);
  }

  /**
  * @description active notification request sucess
  */
  activeNotificationsSuccess() {
    this._fireEvent('hide-decorated-step-cvv', false);
    if (this.flagMonoProduct) {
      this.contactDetails();
    } else {
      this.validateSubscription();
    }
  }

  /**
  * @description active notification request error
  */
  activeNotificationsError(response) {
    const errorCode = response?.messages ? response.messages[0].code : '';
    if (errorCode !== undefined && errorCode === 'functionalError') {
      this._failedActive = true;
      this.operationNotAvailableErrorModal();
    } else {
      this._interrumpedConnectionModal();
    }
  }

  /**
  * @description method for managment retry active notifications or enrollment request
  */
  failedServices() {
    if (this._failedActive) {
      this._failedActive = false;
      this.activeNotificationRequest();
    } else if (this._failedEnrollment) {
      this._failedEnrollment = false;
      this.enrollmentRequest();
    } else if (this._failedGTRequest) {
      this._failedGTRequest = false;
      this.getGrantingTicketDvs();
    }
  }

  /**
  * @description open qr error modal
  */
  qrErrorModal() {
    const detail = {
      code: 'qr-max-attempts',
      selectedConfig: {
        className: 'info header--white close-button--right',
        openMaximized: true,
        iconOnlyFullHeight: true,
        title: 'glomo-digital-activation-dm-error-modal-header-title',
        heroImage: './images/Error.svg',
        acceptBtLabel: 'glomo-digital-activation-dm-go-back-accept-label',
        template: {
          type: 'paragraphs',
          values: [
            { title: 'glomo-digital-activation-dm-invalid-qr-title' },
            { text: 'glomo-digital-activation-dm-invalid-qr-text', class: 'spacing normal' },
            {
              list: [
                'glomo-digital-activation-dm-invalid-qr-list-card-number',
                'glomo-digital-activation-dm-invalid-qr-list-go-branch'
              ],
              class: 'cells-lists-with-text-left'
            }
          ]
        }
      }
    };
    this._getConfigOpenModal(detail);
  }

  /**
   * @description open information not available error modal
   */
  informationNotAvailableErrorModal() {
    const detail = {
      code: 'information-not-available',
      className: 'full-height-error',
      hideCloseIcon: false,
      openMaximized: true,
      title: 'glomo-digital-activation-dm-error-modal-header-title',
      heroImage: './images/Error.svg',
      acceptBtLabel: 'glomo-digital-activation-dm-retry-accept-label',
      cancelBtLabel: 'glomo-digital-activation-dm-close-button-modal',
      template: {
        type: 'paragraphs',
        values: [
          { title: 'glomo-digital-activation-dm-information-not-available-title', class: 'font-size-xl margin-bottom-s' },
          { text: 'glomo-digital-activation-dm-information-not-available-text', class: 'spacing--xs' }
        ]
      }
    };
    const detailInfomration = {
      code: 'information-not-max-available',
      className: 'full-height-error',
      hideCloseIcon: false,
      openMaximized: true,
      title: 'glomo-digital-activation-dm-error-modal-header-title',
      heroImage: './images/Error.svg',
      acceptBtLabel: 'glomo-digital-activation-dm-retry-close-label',
      template: {
        type: 'paragraphs',
        values: [
          { title: 'glomo-digital-activation-dm-information-not-available-title', class: 'font-size-xl margin-bottom-s' },
          { text: 'glomo-digital-activation-dm-information-not-available-text', class: 'spacing--xs' }
        ]
      }
    };
    const retryErrorData = {
      errorId: 'INFORMATION-NOT-AVAILABLE',
      errorType: 'operative',
      retryConfig: detail,
      callConfig: detailInfomration
    };

    this._fireEvent('retry-error', Object.assign({ retryErrorData }));
  }

  /**
  * @description open operation not available half error modal
  * @event 'show-error-not-realized-operation-modal'
  * @event 'show-error-ine-comunication-modal'
  */
  operationNotAvailableErrorModal() {
    const detail = {
      code: 'operation-not-available',
      className: 'custom error close-button--right',
      openMaximized: false,
      iconOnlyFullHeight: true,
      title: 'glomo-digital-activation-dm-operation-error-modal-title',
      cancelBtLabel: 'glomo-digital-activation-dm-exit-cancel-label',
      template: {
        type: 'paragraphs',
        values: [
          { icon: 'coronita:alert' },
          { title: 'glomo-digital-activation-dm-operation-error-modal-title' },
          { text: 'glomo-digital-activation-dm-operation-error-modal-text', class: 'spacing--xs' }
        ]
      }
    };

    const detailErrorine = {
      code: 'error-verify-info',
      className: 'info header--white close-button--right',
      openMaximized: true,
      iconOnlyFullHeight: true,
      title: 'glomo-digital-activation-dm-error-modal-header-title',
      heroImage: './images/Error.svg',
      acceptBtLabel: 'glomo-digital-activation-dm-understood-accept-label',
      cancelBtLabel: '',
      template: {
        type: 'paragraphs',
        values: [
          { title: 'glomo-digital-activation-dm-verify-info-error-modal-title' },
          { text: 'glomo-digital-activation-dm-verify-info-error-modal-text', class: 'spacing normal' },
          {
            list: [
              'glomo-digital-activation-dm-verify-info-error-modal-id',
              'glomo-digital-activation-dm-verify-info-error-modal-card'
            ],
            class: 'cells-lists-with-text-left'
          }
        ]
      }
    };

    const detailErrorUserMonoProduct = {
      code: 'operation-not-available',
      className: 'custom error close-button--right',
      openMaximized: false,
      iconOnlyFullHeight: true,
      title: 'glomo-digital-activation-dm-operation-error-modal-title',
      acceptBtLabel: 'glomo-digital-activation-dm-exit-cancel-label',
      cancelBtLabel: '',
      template: {
        type: 'paragraphs',
        values: [
          { icon: 'coronita:alert' },
          { title: 'glomo-digital-activation-dm-operation-error-modal-title' },
          { text: 'glomo-digital-activation-dm-operation-error-modal-text', class: 'spacing--xs' }
        ]
      }
    };

    const retryErrorData = {
      errorId: 'SERVICES_ERROR',
      errorType: 'operative',
      retryConfig: detail,
      callConfig: this.flagMonoProduct ? detailErrorUserMonoProduct : detailErrorine
    };

    if (this.flagMonoProduct) {
      this._fireEvent('show-error-not-realized-operation-modal');
      this._fireEvent('show-error-ine-comunication-modal');
    }

    this._fireEvent('retry-error', Object.assign({ retryErrorData }));
  }

  /**
  * @description open modal to allow access cam
  */
  allowAccessCamErrorModal() {
    const detail = {
      code: 'allow-access-to-cam',
      selectedConfig: {
        className: 'custom error close-button--right',
        openMaximized: false,
        iconOnlyFullHeight: true,
        acceptBtLabel: 'glomo-digital-activation-dm-retry-accept-label',
        cancelBtLabel: 'glomo-digital-activation-dm-exit-cancel-label',
        template: {
          type: 'paragraphs',
          values: [
            { icon: 'coronita:alert' },
            { text: 'glomo-digital-activation-dm-access-to-cam-modal-text', class: 'spacing--xs' }
          ]
        }
      }
    };
    this._getConfigOpenModal(detail);
  }

  /**
  * @description comunication ine error modal
  */
  communicationIneErrorModal() {
    const detail = {
      code: 'communication-error-ine',
      className: 'custom error close-button--right',
      openMaximized: false,
      iconOnlyFullHeight: true,
      title: 'glomo-digital-activation-dm-interrumpt-comunication-error-modal-title',
      acceptBtLabel: 'glomo-digital-activation-dm-retry-accept-label',
      cancelBtLabel: 'glomo-digital-activation-dm-exit-cancel-label',
      template: {
        type: 'paragraphs',
        values: [
          { icon: 'coronita:alert' },
          { title: 'glomo-digital-activation-dm-interrumpt-comunication-error-modal-title' },
          { text: 'glomo-digital-activation-dm-id-error-modal-text', class: 'spacing--xs' }
        ]
      }
    };

    const detailErrorine = {
      code: 'error-verify-info',
      className: 'info header--white close-button--right',
      openMaximized: true,
      iconOnlyFullHeight: true,
      title: 'glomo-digital-activation-dm-error-modal-header-title',
      heroImage: './images/Error.svg',
      acceptBtLabel: 'glomo-digital-activation-dm-understood-accept-label',
      cancelBtLabel: '',
      template: {
        type: 'paragraphs',
        values: [
          { title: 'glomo-digital-activation-dm-verify-info-error-modal-title' },
          { text: 'glomo-digital-activation-dm-verify-info-error-modal-text', class: 'spacing normal' },
          {
            list: [
              'glomo-digital-activation-dm-verify-info-error-modal-id',
              'glomo-digital-activation-dm-verify-info-error-modal-card'
            ],
            class: 'cells-lists-with-text-left'
          }
        ]
      }
    };

    const detailErrorUserMonoProduct = {
      code: 'communication-error-ine',
      className: 'custom error close-button--right',
      openMaximized: false,
      iconOnlyFullHeight: true,
      title: 'glomo-digital-activation-dm-interrumpt-comunication-error-modal-title',
      acceptBtLabel: 'glomo-digital-activation-dm-exit-cancel-label',
      cancelBtLabel: '',
      template: {
        type: 'paragraphs',
        values: [
          { icon: 'coronita:alert' },
          { title: 'glomo-digital-activation-dm-interrumpt-comunication-error-modal-title' },
          { text: 'glomo-digital-activation-dm-id-error-modal-text', class: 'spacing--xs' }
        ]
      }
    };

    const retryErrorData = {
      errorId: 'INE_ERROR',
      errorType: 'operative',
      retryConfig: detail,
      callConfig: this.flagMonoProduct ? detailErrorUserMonoProduct : detailErrorine
    };

    if (this.flagMonoProduct) {
      this._fireEvent('show-error-veridas-comunication-modal');
    }

    this._fireEvent('retry-error', Object.assign({ retryErrorData }));
  }

  /**
  * @description open error verification documents modal
  */
  infoVerificationErrorModal() {
    const detail = {
      code: 'error-verify-info',
      selectedConfig: {
        className: 'info header--white close-button--right',
        openMaximized: true,
        iconOnlyFullHeight: true,
        title: 'glomo-digital-activation-dm-error-modal-header-title',
        heroImage: './images/Error.svg',
        acceptBtLabel: 'glomo-digital-activation-dm-understood-accept-label',
        template: {
          type: 'paragraphs',
          values: [
            { title: 'glomo-digital-activation-dm-verify-info-error-modal-title' },
            { text: 'glomo-digital-activation-dm-verify-info-error-modal-text', class: 'spacing normal' },
            {
              list: [
                'glomo-digital-activation-dm-verify-info-error-modal-id',
                'glomo-digital-activation-dm-verify-info-error-modal-card'
              ],
              class: 'cells-lists-with-text-left'
            }
          ]
        }
      }
    };
    this._getConfigOpenModal(detail);
  }

  /**
  * @description open modal when user exit otp
  */
  otpCancelled() {
    this._fireEvent('reset-identity-validation-step', true);
    this.infoVerificationErrorModal();
  }
  /**
   * @description hide decorated step cud
   */
  hideDecorated() {
    this._fireEvent('hide-decorated-step-cud', this.activeAlerts);
  }

  /**
   * @description Obtaining mono-product flag
   */
  getOpenFlag() {
    this._fireEvent('monoproduct-enrollment-flag');
  }
  /**
   * @description access to enrollment for monoproduct users
   */
  initEntryPointMonoProduct() {
    this._openControlVeil();
    this.flagMonoProduct = true;
    this.typeFlow = 'monoproduct';
    this._fireEvent('send-data-type-flow', this.typeFlow);
    this.postLoginAnonymous();
  }

  /**
   * @description Method to clean the response obtained from the States of Mexico
   */
  getCountriesMx(payload) {
    if (this.countries.length === 0 && payload.length !== 0) {
      for (let position = 0; position < payload.length; position++) {
        let state = (payload[position].descriptions[0].value).replace(/ {2}.*/, '');
        const stateCode = payload[position].id;
        if (stateCode !== 'X1') {
          state = this.stateWithAccent(state);
          const splitState = state.split(' ');
          let newState = '';
          state = '';
          for (let i = 0; i < splitState.length; i++) {
            newState = splitState[i].charAt(0).toUpperCase() + '' + splitState[i].substring(1).toLowerCase();
            if (i !== (splitState.length - 1)) {
              state = state + newState + ' ';
            } else {
              state = state + newState;
            }
          }
          this.countries.push({ name: state, id: stateCode });
        }
      }
    }

    this.showMonoprductForm();
  }

  /**
   * @description method to assign tilde (accent) to the States of Mexico that require it
   */
  stateWithAccent(state) {
    const stateWhitAccentMark = {
      'DISTRITO FEDERAL': 'Ciudad de México',
      'MEXICO': 'Estado de México',
      'MICHOACAN': 'Michoacán',
      'NUEVO LEON': 'Nuevo León',
      'QUINTANA ROO': 'Querétaro',
      'SAN LUIS POTOSI': 'San Luis Potosí',
      'YUCATAN': 'Yucatán'
    };

    return stateWhitAccentMark[state] ?? state;
  }

  /**
   * @description method for obtained from the States of Mexico Error
   */
  getCountriesMxError() {
    this._closeControlVeil();
    this._interrumpedConnectionModal();
  }
  /**
   * @description method to show the form for monoproduct users
   */
  showMonoprductForm() {
    this.monoproductPropertiesForm.placeOfBirtValue.items = this.countries;
    this._fireEvent('monoproduct-user-data-properties', this.monoproductPropertiesForm);
    this._closeControlVeil();
  }

  /**
  * @description start Mono-product flow
  */
  startHiringMonoProduct(data = { userPhoneInput: '', productNumber: ''}) {
    if (data.userPhoneInput && data.productNumber) {
      this.persistingData = data;
      this.mobileNumber = data.userPhoneInput;
      this.cardNumber = data.productNumber;
      this.sendEventSteps([ 2 ]);
      this._fireEvent('hidden-step-identity-validation', true);
      this._fireEvent('show-step-indentity-validation', true);
      this.identityValidationProperties();
      this.startIdentityValidationProcess();
    }
  }

  /**
   *
   * @param {date}
   * @description Obtaining date of birth and shipping with format mm/dd/yyyy
   */
  formatDate(date) {
    const dateWithFormat = moment(date).format('MM/DD/YYYY');
    this._fireEvent('send-date-with-format', dateWithFormat);
  }

  /**
  * @description open data necessary for enrollment modal
  */
  registerModal() {
    const detail = {
      code: 'register-info',
      selectedConfig: {
        className: 'register-info-modal header--white',
        heroImage: './images/identified_call.svg',
        openMaximized: true,
        title: 'glomo-digital-activation-dm-regitrer-modal-title',
        acceptBtLabel: 'glomo-digital-activation-dm-regitrer-modal-accept-label',
        template: {
          type: 'paragraphs',
          values: [
            {
              title: 'glomo-digital-activation-dm-regitrer-modal-values-title',
              class: 'spacing'
            },
            {
              text: 'glomo-digital-activation-dm-regitrer-modal-values-text',
              class: 'text-center'
            },
            {
              list: [
                'glomo-digital-activation-dm-regitrer-modal-values-list-one',
                'glomo-digital-activation-dm-regitrer-modal-values-list-two',
              ],
              class: 'cells-lists-with-text-left'
            }
          ]
        }
      }
    };
    this._fireEvent('show-register-modal');
    this._getConfigOpenModal(detail);
  }

  /**
  * @description open registered user error modal
  */
  userRegistered() {
    const detail = {
      code: 'user-registered',
      selectedConfig: {
        className: 'full-height-info header--white image--mid',
        primaryButtonClass: 'primary',
        heroImage: './images/alerts/caution.svg',
        openMaximized: true,
        title: 'glomo-digital-activation-dm-user-registred-modal-title',
        acceptBtLabel: 'glomo-digital-activation-dm-user-registred-modal-accept-label',
        template: {
          type: 'paragraphs',
          values: [
            {
              title: 'glomo-digital-activation-dm-user-registred-modal-values-title',
              class: 'text-center'
            },
            {
              text: 'glomo-digital-activation-dm-user-registred-modal-values-text',
              class: 'text-center margin-bottom-s'
            },
          ]
        }
      }
    };
    this._fireEvent('show-user-registered-modal');
    this._getConfigOpenModal(detail);
  }

  /**
  * @description open error already existing telephone modal
  */
  errorNumberPhone() {
    const detail = {
      code: 'error-phone-number',
      selectedConfig: {
        className: 'full-height-info header--white image--std',
        primaryButtonClass: 'primary',
        heroImage: './images/alerts/caution.svg',
        openMaximized: true,
        title: 'glomo-digital-activation-dm-number-phone-modal-title',
        acceptBtLabel: 'glomo-digital-activation-dm-number-phone-modal-accept-label',
        template: {
          type: 'paragraphs',
          values: [
            {
              title: 'glomo-digital-activation-dm-number-phone-modal-values-title',
              class: 'text-center'
            },
            {
              text: 'glomo-digital-activation-dm-number-phone-modal-values-text',
              class: 'text-center margin-bottom-s'
            },
          ]
        }
      }
    };
    this._getConfigOpenModal(detail);
  }

  /**
  * @description open error user by card modal
  */
  userWithCard() {
    const detail = {
      code: 'user-with-card',
      selectedConfig: {
        className: 'full-height-info header--white image--mid',
        primaryButtonClass: 'primary',
        heroImage: './images/monoproduct/credit_card.svg',
        openMaximized: true,
        title: 'glomo-digital-activation-dm-user-with-card-modal-title',
        acceptBtLabel: 'glomo-digital-activation-dm-user-with-card-modal-accept-label',
        template: {
          type: 'paragraphs',
          values: [
            {
              title: 'glomo-digital-activation-dm-user-with-card-modal-values-title',
            },
            {
              text: 'glomo-digital-activation-dm-user-with-card-modal-values-text',
              class: 'text-center margin-bottom-s'
            },
          ]
        }
      }
    };
    this._fireEvent('show-user-with-card-modal');
    this._getConfigOpenModal(detail);
  }

  /**
  * @description open error bad credit modal
  */
  userErrorCredit() {
    const detail = {
      code: 'error-credit',
      selectedConfig: {
        className: 'full-height-info header--white image--std',
        primaryButtonClass: 'primary',
        heroImage: './images/alerts/caution.svg',
        openMaximized: true,
        title: 'glomo-digital-activation-dm-error-credit-modal-title',
        acceptBtLabel: 'glomo-digital-activation-dm-error-credit-modal-accept-label',
        template: {
          type: 'paragraphs',
          values: [
            {
              title: 'glomo-digital-activation-dm-error-credit-modal-values-title',
              class: 'text-center'
            },
            {
              text: 'glomo-digital-activation-dm-error-credit-modal-values-text',
              class: 'text-center margin-bottom-s'
            },
          ]
        }
      }
    };
    this._fireEvent('show-error-credit-modal');
    this._getConfigOpenModal(detail);
  }
}
customElements.define(GlomoDigitalActivationDmMx.is, GlomoDigitalActivationDmMx);
