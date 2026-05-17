class CreditCardHolderOffer extends Polymer.mixinBehaviors([
  CellsBehaviors.i18nBehavior,
  CellsBehaviors.CellsCheckNestedKeysBehavior,
  CellsBehaviors.CellsGlomoStepBehavior,
  CellsBehaviors.CellsGlomoMainStepBehavior
], Polymer.Element) {
  static get is() {
    return 'credit-card-holder-offer';
  }
  static get properties() {
    return {
      /**
       * @desc show promotion code
       * @type {Boolean}
       */
      benefitCoupon: {
        type: Boolean,
        value: false
      },
      /**
       * @desc show coupon title
       * @type {String}
       */
      codeTitle: {
        type: String,
        value: 'titulo'
      },
      /**
       * @desc show coupon description
       * @type {String}
       */
      codeDescription: String,
      /**
       * @desc Value set to incorporate flag
       * @type {Boolean}
       */
      showPromotionCode: {
        type: Boolean,
        value: false
      },
      /**
       * @desc offer id
       * @type {string}
       */
      offerId: {
        type: String,
        value: ''
      },
      /**
       * @desc offer data fetched from DM
       * @type {Object}
       */
      offerData: {
        type: Object,
        notify: true,
        value: {}
      },
      /**
       * @desc end date of the offer
       * @type {String}
       */
      periodOfferEndDate: String,
      /**
       * @desc selected payment method
       * @type {String}
       */
      paymentMethod: {
        type: String,
        value: ''
      },
      /**
       * @desc is the card offer an INFINITE card
       * @type {Boolean}
       */
      isInfinite: {
        type: Boolean,
        value: false,
        computed: '_isInfinite(offerData.details.product)',
        readOnly: true
      },
      /**
       * @desc card offer's rewards rate
       * @type {Object}
       */
      rewardsRate: {
        type: Object,
        value: {},
        computed: '_getRewardsRate(offerData.rates.itemizeRates)',
        readOnly: true
      },
      /**
       * @desc card offer's CAT rate
       * @type {Object}
       */
      catRate: {
        type: Object,
        value: {},
        computed: '_getCATRate(offerData.rates.itemizeRates)',
        readOnly: true
      },
      /**
       * @desc card offer's anual rate
       * @type {Object}
       */
      annualRate: {
        type: Object,
        value: {},
        computed: '_getAnnualRate(offerData.rates.itemizeRates)',
        readOnly: true
      },
      /**
       * @desc card offer's anual fee
       * @type {Object}
       */
      annualFee: {
        type: Object,
        value: {},
        computed: '_getAnnualFee(offerData.fees.itemizeFees)',
        readOnly: true
      },
      /**
       * @desc name of the card
       * @type {String}
       */
      cardName: {
        type: String,
        value: '',
        computed: '_getCardName(offerData.details)',
        readOnly: true
      },
      /**
       * @desc Address type selected
       * @type {String}
       */
      typology: {
        type: String
      },
      /**
       * @desc constant for branch office address
       * @type {String}
       */
      OFFICE_CONSTANT: {
        type: String,
        value: 'sucursal'
      },
      /**
       * @desc constant for alternate address
       * @type {String}
       */
      ALTERNATE_ADDRESS_CONSTANT: {
        type: String,
        value: 'otro domicilio'
      },
      /**
       * @desc constant for home address
       * @type {String}
       */
      HOME_CONSTANT: {
        type: String,
        value: 'domicilio'
      },
      /**
       * @desc is submit button disable
       * @type {Boolean}
       */
      submitButtonDisabled: {
        type: Boolean,
        value: false
      },
      /**
       * @desc language
       * @type {String}
       */
      lang: {
        type: String,
        value: document.documentElement.lang || 'en',
        readOnly: true
      },
      /**
       * @desc variable that determines if show or hide user address
       * @type {Boolean}
       */
      showHideUserAddress: Boolean,
      /**
       * @desc variable that determines if show or hide user alternate address
       * @type {Boolean}
       */
      showHideUserAlternateAddress: Boolean,
      /**
       * @desc variable that determines if show or hide button 'Solicitar'
       * @type {Boolean}
       */
      showButtonRequest: {
        type: Boolean,
        notify: true
      },
      /**
       * @desc shipping address selected for the user
       * @type {Object}
       */
      shippingAddress: {
        type: Object,
        value: {},
        observer: '_shippingAddressChanged'
      },
      /**
       * @desc validate if the user do whatever modification
       * @type {Boolean}
       */
      userModifications: {
        type: Boolean,
        value: false
      },
      /**
       * @desc validate credit bureau text
       * @type {Boolean}
       */
      creditBureauText: {
        type: Boolean,
        notify: true
      },
      /**
       * @desc address collapsed status
       * @type {Object}
       */
      addressCollapsed: Boolean,
      /**
       * @desc terms and conditions collapsed status
       * @type {Object}
       */
      termsCollapsed: Boolean,
      /**
       * @desc terms and conditions active status
       * @type {Object}
       */
      termsActive: Boolean,
      /**
       *
       * @desc local currency, value declared from composerMock
       */
      localCurrency: String,
      /**
       * @desc noma of document for terms and conditions
       * @type {String}
       */
      pdfTermsConditionsdName: String,
      /**
       * @desc offerDataInfo property,
       * set offer data from channel
       * @type {Object}
       */
      offerDataInfo: {
        type: Object
      },
      /**
       * @desc constant for credit card holder offer type
       * @type {String}
       */
      OFFER_TYPE_CCH: String,
      /**
       * @desc constant for infinite card id
       * @type {String}
       */
      INFINITE_CARD_ID: String,
      /**
       * @desc constant for rewards rate id
       * @type {String}
       */
      REWARDS_RATE_ID: String,
      /**
       * @desc constant for cat rate id
       * @type {String}
       */
      CAT_RATE_ID: String,
      /**
       * @desc constant for annual rate id
       * @type {String}
       */
      ANNUAL_RATE_ID: String,
      /**
       * @desc constant for annua _fee id
       * @type {String}
       */
      ANNUAL_FEE_ID: String,
      /**
       * @desc constant for error 'rechazo por buro'
       * @type {String}
       */
      BURO_ERROR_CODE: String,
      /**
       * @desc constant for error 'en espera de buro'
       * @type {String}
       */
      BURO_WAIT_ERROR_CODE: String,
      /**
       * @desc constant for error 'solicitud con datos faltantes'
       * @type {String}
       */
      INFORMATION_CLIENT_ERROR_CODE: String,
      /**
       * @desc constant for branch officce
       * @type {String}
       */
      BRANCH_OFFICE_CONSTANT: String,
      /**
       * @desc constant for monthly period
       * @type {String}
       */
      MONTHLY_PERIOD_CONSTANT: String,
      /**
       * @desc constant for home
       * @type {String}
       */
      ADDRESS_HOME_CONSTANT: String,
      /**
       * @desc constant for physical support
       * @type {String}
       */
      PHYSICAL_SUPPORT_CONSTANT: {
        type: String,
        value: 'NORMAL_PLASTIC'
      },
      /**
       * @desc constant CRM offer
       * @type {String}
       */
      DATA_ORIGIN_CRM_CONSTANT: {
        type: String,
        value: 'CRM'
      },
      /**
      * @desc constant ALT offer
      * @type {String}
      */
      DATA_ORIGIN_ALT_CONSTANT: {
        type: String,
        value: 'ALT'
      },
      /**
      * @desc constant for Crea card
      * @type {String}
      */
      CREA_CARD_CONSTANT: {
        type: String,
        value: 'AG'
      },
      /**
      * @desc constant for minimum amount payment
      * @type {String}
      */
      MINIMUM_AMOUNT_PAYMENT_CONSTANT: {
        type: String,
        value: 'MINIMUM_AMOUNT_PAYMENT'
      },
      /**
      * @desc constant for minimum amount
      * @type {String}
      */
      MINIMUM_AMOUNT_CONSTANT: {
        type: String,
        value: 'credit-card-holder-minimum-amount'
      },
      /**
      * @desc constant for minimum amount
      * @type {String}
      */
      MANUAL_PAYMENT_CONSTANT: {
        type: String,
        value: 'credit-card-holder-offer-manual-payment-leyend'
      },
      /**
      * @desc constant for minimum payment leyend
      * @type {String}
      */
      MINIMUM_PAYMENT_CONSTANT: {
        type: String,
        value: 'credit-card-holder-offer-minimum-payment-leyend'
      },
      /**
      * @desc constant for no domiciliation constant
      * @type {String}
      */
      NO_DOMICILIATION_PAYMENT_CONSTANT: {
        type: String,
        value: 'NO_DOMICILIATION_PAYMENT'
      },
      /**
      * @desc constant for no domiciliation constant payload
      * @type {String}
      */
      NO_DOMICILIATION_PAYMENT_CONSTANT_PAYLOAD: {
        type: String,
        value: 'N'
      },
      /**
      * @desc constant for minimum amount payment to avoid interest
      * @type {String}
      */
      MINIMUM_AMOUNT_TO_AVOID_INTEREST_PAYMENT_CONSTANT: {
        type: String,
        value: 'MINIMUM_AMOUNT_TO_AVOID_INTEREST_PAYMENT'
      },
      /**
      * @desc constant for status.id payload
      * @type {String}
      */
      STATUS_ID_CONSTANT: {
        type: String,
        value: 'INOPERATIVE'
      },
      /**
      * @desc constant for relatedContracts.numberType.id
      * @type {String}
      */
      NUMBER_TYPE_CONSTANT: {
        type: String,
        value: 'CCC'
      },
      /**
      * @desc constant for relatedContracts.product.id
      * @type {String}
      */
      PRODUCT_CONTRACT_CONSTANT: {
        type: String,
        value: 'ACCOUNTS'
      },
      /**
      * @desc constant for deliveries.serviceType.id
      * @type {String}
      */
      SERVICE_TYPE_CONSTANT: {
        type: String,
        value: 'BOTH_OPTIONS'
      },
      /**
      * @desc constant for relatedContracts.relationType.id
      * @type {String}
      */
      RELATION_TYPE_CONSTANT: {
        type: String,
        value: 'LINKED_WITH'
      },
      /**
      * @desc constant for offerRecalculationType.id
      * @type {String}
      */
      RECALCULATION_TYPE_CONSTANT: {
        type: String,
        value: 'ROF'
      },
      /**
      * @desc constant for participants.legalPersonType.id
      * @type {String}
      */
      LEGAL_PERSON_TYPE_CONSTANT: {
        type: String,
        value: 'SRI'
      },
      /**
      * @desc constant for activations.id
      * @type {String}
      */
      ACTIVATIONS_CONSTANT: {
        type: String,
        value: 'ON_OFF'
      },
      /**
      * @desc constant for staticFeatures[0].id
      * @type {String}
      */
      SFEATURES_CONSTANT: {
        type: String,
        value: 'EXTERNAL_SCORES'
      },
      /**
      * @desc constant for staticFeatures[1].id
      * @type {String}
      */
      STATIC_FEATURES_CONSTANT: {
        type: String,
        value: 'PRE_AUTHORIZED'
      },
      /**
      * @desc constant for hiringOrigin.id
      * @type {String}
      */
      ORIGIN_CONSTANT: {
        type: String,
        value: 'N'
      },
      /**
      * @desc constant for deliveries.contact.contactType
      * @type {String}
      */
      CONTACT_TYPE_CONSTANT: {
        type: String,
        value: 'SPECIFIC'
      },
      /**
      * @desc enable button to next step
      * @type {Boolean}
      */
      domiciliationCheck: {
        type: Boolean,
        notify: true,
        value: false
      },
      /**
      * @desc object for send to cells-product-item
      * @type {String}
      */
      nameAccount: {
        type: String,
        value: ''
      },
      /**
      * @desc object for send to cells-product-item
      * @type {Object}
      */
      localAmount: {
        type: Object,
        value: {
          label: 'Saldo disponible',
          amount: 0,
          currency: ''
        },
        notify: true
      },
      /**
      * @desc object for send to cells-product-item
      * @type {Object}
      */
      localDescription: {
        type: Object,
        value: {
          'value': '',
          'masked': true
        },
        notify: true
      },
      /**
      * @desc cells-step additional message
      * @type String
      */
      stepAdditionalMessage: {
        type: String,
        value: ''
      },
      /**
       * @desc domiciliation alert type
       * @type String
       */
      domiciliationAlertType: {
        type: String,
        value: 'info'
      },
      /**
       * @desc domiciliation alert icon
       * @type String
       */
      domiciliationAlertIcon: {
        type: String,
        value: 'coronita:info'
      },
      /**
       * @desc cardId property, required to call-me-back request
       * @type {String}
       */
      cardId: {
        type: String,
        value: ''
      },
      /**
       * @desc save the user origin id to
       * callMeBack gets by offerData.origin
       * @type {String}
       */
      userOrigin: {
        type: String,
        value: '',
        computed: '_userOriginComputed(offerData.origin)',
        readOnly: true
      },
      /**
       * @desc CUSTOMER_TYPE_CONTANT property,
       * required to call-me-back request
       */
      CUSTOMER_TYPE_CONSTANT: {
        type: String,
        value: 'CSP',
        readOnly: true
      },
      /**
       * @desc Flag to know if the product
       * corresponds to not pre-approved
       * @type {Boolean}
       */
      isNpa: {
        type: Boolean,
        value: false
      },
      /**
       * @desc Flag to know if the product is the CREA card
       * @type {Boolean}
       */
      isCrea: {
        type: Boolean,
        value: false
      },
      /**
       * @desc Title of step
       * @type {String}
       */
      stepTitle: {
        type: String,
      },
      /**
      * @desc constant for product id of not pre-approved
      * @type {String}
      */
      PRODUCT_ID_NPA: {
        type: String,
        value: '0SKY'
      },
      /**
      * @desc flag to relaunch request
      * @type {Boolean}
      */
      initialized: {
        type: Boolean,
        value: false
      },
      /**
      * @desc icon show coupon information
      * @type {String}
      */
      iconCouponInformation: {
        type: String,
        value: 'coronita:help'
      },
      /**
      * @desc previously entered value in the amount input
      * @type {String}
      */
      prevAmount: String,
      /**
      * @desc text for statement radio button description
      * @type {String}
      */
      classOffer: {
        type: String,
        value: 'content-header-text'
      },
      /**
       * @desc Return boolean condition if is offer card to triple play
       * @type {Boolean}
       */
      isTriplePlayOffer: {
        type: Boolean,
        value: false
      },
      /**
       * @desc Contains type of triple play offer
       * @type {String}
       */
      triplePlayOfferType: {
        type: String,
        value: ''
      },
      /**
       * @desc Contains text info to triple play offer
       * @type {Array}
       */
      containBenefitsList: {
        type: Array,
        value: []
      },
      /**
       * @desc constant for dispatchEvent 'hide-spinner'
       * @type {String}
       */
      HIDE_SPINNER_CONSTANT: {
        type: String,
        value: 'hide-spinner'
      },
      /**
       * @desc constant for dispatchEvent 'show-spinner'
       * @type {String}
       */
      SHOW_SPINNER_CONSTANT: {
        type: String,
        value: 'show-spinner'
      },
      /**
       * @desc constant for changue color of header
       * @type {String}
       */
      CREDIT_CARD_HOLDER_CONSTANT: {
        type: String,
        value: 'header--grey'
      },
      /**
       * @desc constant to assign text to the secondary button of the modal
       * @type {String}
       */
      CREDIT_CARD_HOLDER_ERROR_GENERIC_CONSTANT: {
        type: String,
        value: 'credit-card-holder-error-generic-secondary-button'
      },
      /**
       * @desc constant to assign text to address
       * @type {String}
       */
      ADDRES_TEXT_CONSTANT: {
        type: String,
        value: 'credit-card-holder-address-text'
      },
      /**
       * @desc interest type text
       * @type {String}
       */
      interestTypeText: {
        type: String,
        value: 'credit-card-holder-offer-small-print-1'
      },
      /**
       * @desc class to card usser box
       * @type {String}
       */
      cardUserClass: {
        type: String,
        value: 'card-user-message'
      },
      /**
       * @desc object sent every time an analytic event is fired
       * @type {Object}
       */
      creditCardAnalytics: {
        type: Object,
        value: {
          process: '',
          productName: '',
          step: '',
          offer: '',
          customField: '',
          typology: '',
          operationNumber: '',
          amount: ''
        }
      },
      /**
       * @desc Flag to know if any of any trigger for app-started was fired
       * @type {Boolean}
       */
      appStartedFired: {
        type: Boolean,
        value: false
      },
      /**
       * @desc Object that have every constant used in fired analytics
       * @type {Object}
       */
      ANALYTICS_CONSTANTS: {
        type: Object,
        value: {
          PROMOTION_CODE_INFO: 'info codigo promocion',
          DOMICILIATION_ON: 'domiciliacion on',
          DOMICILIATION_OFF: 'domiciliacion off',
          INSERT_CODE: 'insertar codigo',
          CREDIT_LINE: 'linea credito',
          MINIMUM_PAYMENT: 'pago minimo',
          PAYMENT_WITHOUT_INTEREST: 'pago sin intereses',
          MINIMUM_PAYMENT_INFO: 'info pago minimo',
          PAYMENT_WITHOUT_INTEREST_INFO: 'info pago sin intereses',
          I_WANT_IT: 'lo quiero',
          MINIMUM_PAYMENT_STEPS: 'pago minimo',
          PAYMENT_WITHOUT_INTEREST_STEPS: 'pago no generar intereses',
        },
        readOnly: true
      },
      /**
       * @desc class from primary button
       * @type {String}
       */
      buttonPrimaryClass: {
        type: String,
        value: 'button-primary-aqua'
      },
      /**
       * @desc terms and conditions collapsed status
       * @type {Boolean}
       */
      paymentSelectorCollapsed: Boolean,
      /**
       * @desc text for change the text to triple play offer
       * @type {String}
       */
      changeLabel: {
        type: String
      },
      /**
       * @desc content name of class offer for appsFlyer
       * @type {String}
       */
      offerName: {
        type: String,
        value: ''
      },
      /**
       * @desc Object that have every constant used in appsFlyer tags
       * @type {Object}
       */
      APPSFLYER_CONSTANTS: {
        type: Object,
        value: {
          PREAPPROVED_PROCESS: 'flujo preaprobado',
          NO_PREAPPROVED_PROCESS: 'flujo no preaprobado',
          TRIPLE_PLAY_WITH_PAYROLL: 'flujo triple play preaprobado con cambio de nomina',
          TRIPLE_PLAY_ONLY_CARD: 'flujo triple play preaprobado sin cambio de nomina'
        }
      },
      /**
       * @description Error constant when the user canceled the signing operation in the contract
       * @type {String}
       */
      OPERATION_CANCELED_ERROR_CONSTANT: {
        type: String,
        value: 'operation cancelled by user'
      },
      /**
       * @desc constant for status when operation canceled by the user
       * @type {Number}
       */
      STATUS_OPERATION_CANCELED_BY_THE_USER: {
        type: Number,
        value: 499
      },
      /**
       * @description Assistance Availability flag
       * @type {Boolean}
       */
      assistanceAvailability: {
        type: Boolean,
        value: false
      },
      /**
       * @description Phone number contact
       * @type {String}
       */
      phoneNumberAdvisor: {
        type: String
      },
      /**
       * @description Flag for apiVersion
       * @type {Boolean}
       */
      customerAddressMigrationOfferTDC: {
        type: Boolean,
        value: false
      },
      /**
       * @description apiversion to selector address
       * @type {String}
       */
      apiVersionAddress: {
        type: String,
        value: 'v0'
      },
      /**
       * @desc alternate address flag
       * @type {Boolean}
       */
      alternateAddressFlag: {
        type: Boolean,
        value: false
      },
      /**
       * @desc contain address data
       * @type {Object}
       */
      userAddress: {
        type: Object,
        value: () => ({})
      },
      /**
       * @desc contain alternate address data
       * @type {Object}
       */
      userAlternateAddress: {
        type: Object,
        value: () => ({})
      },
      /**
       * @description flag to handle the number of requests to credit card
       * @type {Number}
       */
      numberCreditCardRequests: {
        type: Number,
        value: 0
      },
      /**
       * @description flag to handle the maximum number of requests to credit card
       * @type {Number}
       */
      maximumNumberCreditCardRequests: {
        type: Number,
        value: 3
      },
      /**
       * @desc flag from modal
       * @type {Boolean}
       */
      flagActiveModal: {
        type: Boolean,
        value: false
      },
      /**
       * @desc current page name
       * @type {String}
       */
      namePage: {
        type: String,
        value: 'CreditCardHolderPage'
      },
      /**
       * @description OpenWeb flag to show or hide digital card checkbox in the branch destination
       * @type {Boolean}
       */
      showDigitalCardCheck: {
        type: Boolean,
        value: false
      },
      /**
       * @description contains text to assign and do validations when branch is selected
       * @type {Boolean}
       */
      textBranchSelected: {
        type: String,
        value: 'credit-card-holder-sucursal-text'
      },
      responseSuccessCreditCard: {
        type: Object,
        value: () => ({})
      },
      /**
       * @desc user form collapsed status
       * @type {Object}
       */
      userFormCollapsed: {
        type: Boolean,
        value: false,
      },
      /**
       * @desc global cache Storage
       * @type {Object}
       */
      globalCacheStorage: {
        type: Object,
        value: () => ({})
      },
      /**
       * @desc customer id
       * @type {String}
       */
      customerId: {
        type: String,
        value: ''
      },
      /**
       * @desc customer documents
       * @type {Object}
       */
      identityDocuments: {
        type: Array,
        value: () => []
      },
      /**
       * @desc update rfc flag
       * @type {Boolean}
       */
      updateRfcFlag: {
        type: Boolean,
        value: false,
      },
      /**
       * @desc update ine flag
       * @type {Boolean}
       */
      updateIneFlag: {
        type: Boolean,
        value: false,
      },
      /**
       * @desc customer nationality flag for RFC
       * @type {Boolean}
       */
      customerNationalityFlagRfc: {
        type: Boolean,
        value: false,
      },
      /**
       * @desc customer nationality flag for INE
       * @type {Boolean}
       */
      customerNationalityFlagIne: {
        type: Boolean,
        value: false,
      },
      /**
       * @desc customer monoproducto flag for INE
       * @type {Boolean}
       */
      customerIsMonoProducto: {
        type: Boolean,
        value: false,
      },
      /**
       * @desc user has INE or has just updated it flag
       * @type {Boolean}
       */
      userHasIne: {
        type: Boolean,
        value: false,
      },
      /**
       * @desc user has RFC or has just updated it flag
       * @type {Boolean}
       */
      userHasRfc: {
        type: Boolean,
        value: false,
      },
      /**
       * @desc message to show for updated INE and RFC
       * @type {String}
       */
      messageBox: {
        type: String,
        value: '',
        computed: '_updateMessageBox(customerNationalityFlagRfc, customerNationalityFlagIne, userHasIne, userHasRfc)',
      },
      /**
       * @desc data entered by user when update
       * @type {Object}
       */
      dataUserForm: {
        type: Object,
        value: () => ({})
      },
      /**
       * @desc civil status
       * @type {Array}
       */
      civilStatusValues: {
        type: Array,
        value: () => ([])
      },
      /**
       * @desc attempts to get marital status
       * @type {Number}
       */
      attempsGetMaritalStatus: {
        type: Number,
        value: 0
      },
      /**
       * @desc attempts to get customer contacts
       * @type {Number}
       */
      attempsGetCustomerContacts: {
        type: Number,
        value: 0
      },
      /**
       * @desc attempts to update RFC
       * @type {Number}
       */
      attempsUpdateRfc: {
        type: Number,
        value: 0
      },
      /**
       * @desc max attempts to update RFC
       * @type {Number}
       */
      maxAttempsUpdateRfc: {
        type: Number,
        value: 0
      },
      /**
       * @desc previously entered value in the amount input when is able to update INE
       *  @type {String}
       */
      savePrevAmount: {
        type: String,
        value: '',
      },
      /**
       * @desc user email for INE
       *  @type {String}
       */
      customerEmail: {
        type: String,
        value: ''
      },
      /**
       * @desc when user comes from update INE succesfully flag
       *  @type {Boolean}
       */
      collapsedFromIne: {
        type: Boolean,
        value: false,
      },
      /**
       * @desc URL of the image to be used has icon
       *  @type {String}
       */
      heroImage: {
        type: String,
        value: '',
      },
      /**
       * @desc Add property to add class to cells-atom-amount
       * @type {String}
       */
      classAtomAmount: {
        type: String,
        value: 'amount-huge'
      },
      /**
      * @desc Changes the decimals to a huge size
      * @type {Boolean}
      */
      showHugeDecimals: {
        type: Boolean,
        value: false
      },
      /**
      * @desc Format the numbers and place the decimals
      * @type {Boolean}
      */
      autoFormat: {
        type: Boolean,
        value: false
      },
      /**
      * @desc Boolean to hide/show cents
      * @type {Boolean}
      */
      hideCents: {
        type: Boolean,
        value: false
      },
      /**
      * @desc stop user to enter decimal in input
      * @type {Boolean}
      */
      disableDecimal: {
        type: Boolean,
        value: false
      },
      /**
       * @desc class to label strong
       * @type {String}
       */
      labelStrong: {
        type: String,
        value: ''
      },
      /**
       * @desc Property to change the template
       * @type Boolean
       */
      isTdcBasic: {
        type: Boolean,
        value: false
      },
      /**
       * @desc Percentage of points
       */
      pointsPercentage: {
        type: Number,
        value: 0
      },
    };
  }
  static get observers() {
    return [ 'relaunchRequestOfferData(offerDataInfo, initialized)' ];
  }
  ready() {
    super.ready();
    this.addEventListener('amount-input-changed', this._validateAmount.bind(this));
    this.addEventListener('valid-amount-input-focus-out', this._onUpdateAmount.bind(this));
    this.addEventListener('change-pressed', this.changePressedFirstStep.bind(this));
  }
  /**
   * Method that executes modal to provide information
   */
  _iconClicked() {
    this.flagActiveModal = true;
    this._fireAppStartedAnalytics(this.ANALYTICS_CONSTANTS.PROMOTION_CODE_INFO);
    this.dispatchEvent(new CustomEvent('alert-modal-coupon-info', {
      detail: {
        opened: true,
        title: 'credit-card-holder-offer-coupon-info-subtitle',
        fullHeight: true,
        iconPositionConfig: {
          type: 'info',
          icon: this.iconCouponInformation
        },
        subtitle: [ [ this.t('credit-card-holder-offer-coupon-info-subtitle') ] ],
        message: [ [ this.t('credit-card-holder-offer-coupon-info-description') ] ],
        acceptButton: [ [ this.t('credit-card-holder-payments-help-button-text') ] ],
        closeOnPrimaryButton: true
      },
      bubbles: true,
      composed: true
    }
    ));
    this.dispatchEvent(new CustomEvent('action-advanced-footprint-info-promotion-code'));
  }
  /**
   * Method to enter promotion code
   */
  _openModalInfo() {
    this._fireAppStartedAnalytics(this.ANALYTICS_CONSTANTS.INSERT_CODE);
    this.dispatchEvent(new CustomEvent('modal-event', {
      detail: {
        opened: true,
        title: this.t('credit-card-holder-offer-coupon-modal-title'),
        subtitle: this.t('credit-card-holder-offer-coupon-modal-subtitle'),
        labelInput: this.t('credit-card-holder-offer-coupon-modal-input-label'),
        fullHeight: true,
        inputLength: 8,
        inputType: 'text',
        allowedChars: '[0-9a-zA-Z]',
        allowedValue: '[0-9a-zA-Z]',
        inputMessage: this.t('credit-card-holder-offer-coupon-modal-input-message'),
        cancelButton: true,
        cancelButtonLabel: this.t(this.CREDIT_CARD_HOLDER_ERROR_GENERIC_CONSTANT),
        enableInput: true,
        buttonDisableLabel: this.t('credit-card-holder-offer-coupon-modal-button')
      },
      bubbles: true,
      composed: true
    }
    ));
    this.dispatchEvent(new CustomEvent('action-advanced-footprint-add-promotion-code', {
      bubbles: true,
      composed: true
    }));
  }
  /**
   * Method that resets property values
   */
  _reset() {
    this.benefitCoupon = false;
    this.codeTitle = 'titulo';
    this.codeDescription = '';
    this.collapsedFromIne = false;
  }
  /**
   * @desc setting up the properties on pageActive, else reset them all
   * @param {Object} pageActive
   */
  _boot(pageActive) {
    this.dispatchEvent(new CustomEvent('page-loaded'));
    this.set('initialized', true);
    this.set('paymentMethodSelected', this.MINIMUM_AMOUNT_PAYMENT_CONSTANT);
    this.set('domiciliationChoiceText', this.MINIMUM_AMOUNT_CONSTANT);
    this.set('stepAdditionalMessage', `${this.t('cells-step-product-selector-additional-message')} ${this.t(this.domiciliationChoiceText)}.`);

    if (pageActive.value) {
      this.set('headerTitleText', this.t('credit-card-holder-title'));
      this.set('footerButtonText', this.t('credit-card-holder-footer-button-text'));
      this.set('showButtonRequest', true);
      this.requestChangeDenomitationFlag();
      this.requestCustomerLoginsRfcFlag();
      this.getAlternateAddressFlag();
    } else {
      this.set('headerTitleText', '');
      this.set('footerButtonText', '');
      this.set('initialized', false);
      this.set('prevAmount', '');
      this.set('numberCreditCardRequests', 0);
      this.set('showDigitalCardCheck', false);
      this.set('attempsUpdateRfc', 0);
      this.set('attempsGetMaritalStatus', 0);
      this.set('attempsGetCustomerContacts', 0);
      this.set('messageBox', '');
      this.set('dataUserForm', {});
      this.set('customerNationalityFlagRfc', false);
      this.set('customerNationalityFlagIne', false);
      this.set('collapsedFromIne', false);
      this.set('userFormCollapsed', false);
      this.set('customerIsMonoProducto', false);
      this.set('identityDocuments', []);
    }
  }
  /**
   * This computed function gets user origin id
   * @param {Object} originData
   * @returns String
   */
  _userOriginComputed(originData) {
    return originData ? originData.id : this.CUSTOMER_TYPE_CONSTANT;
  }
  /**
   * This function by cells-st-button event
   * to request to callMeBack
   */
  getCallMeBack() {
    if (this.assistanceAvailability) {
      this.dispatchEvent(new CustomEvent('call-personal-advisor-number', {
        detail: {
          phoneNumberAdvisor: this.phoneNumberAdvisor
        }
      }));
    } else {
      this.dispatchEvent(new CustomEvent('call-me-back-start', {
        detail: {
          offerId: this.offerId,
          customerType: this.userOrigin,
          number: this.cardId
        }
      }));
    }
  }
  /**
   * @desc Address radio button selected value changed
   * @param {Number}
   */
  _radioAddressChanged(value) {
    let typology = value === 1 ? this.OFFICE_CONSTANT : value === 2 && this.alternateAddressFlag ? this.ALTERNATE_ADDRESS_CONSTANT : this.HOME_CONSTANT;
    this.set('typology', typology);
  }
  /**
   * @desc setting up the properties on pageActive, else reset them all
   * @param {Object}
   */
  listenAppContextChannel(data) {
    let currentPage = data.value.currentPage;
    let fromPage = data.value.fromPage;
    this.set('userFormCollapsed', false);
    if ([ 'creditCardHolderPage' ].includes(currentPage) && !(['updateNationalId', 'updateNationalIdSuccess'].includes(fromPage))) {
      this.set('savePrevAmount', '');
    }
    if (currentPage === 'creditCardHolderPage' && fromPage !== 'helpInfoPage' && fromPage !== 'termsAndConditionsPage') {
      if ((this.offerDataInfo || {}).isTriplePlayCreditCard && this.offerDataInfo.isTriplePlayCreditCard !== '') {
        this.isTriplePlayOffer = true;
        this.triplePlayOfferType = this.offerDataInfo.isTriplePlayCreditCard;
        this.cardUserClass = 'card-user-message-black';
      } else {
        this.isTriplePlayOffer = false;
      }
      this.collapsed = false;
      this.changeHeaderColor(this.CREDIT_CARD_HOLDER_CONSTANT);
      this.initialize();
      this.set('shippingAddress', {value: 0});
      this.dispatchEvent(new CustomEvent('activate-steps', { detail: { value: true } }));

      if ([ 'updateNationalIdSuccess' ].includes(fromPage)) {
        this.set('collapsedFromIne', true);
      }
      this._getUpdateRfcIneFlag();
      this._getCustomerIsMonoProductoIne();
      this._validateCustomer();
      this._updateIneRfc();
    }
  }

  getPointPercentage(offerData) {
    if (offerData) {
      this.set('pointsPercentage', offerData.rates.itemizeRates[2].itemizeRatesUnit.percentage);
      return this.pointsPercentage;
    }
    return null;
  }

  getBenefistList() {
    let list = {};
    if (this.isTriplePlayOffer) {
      list = [
        {
          text: `${this.t('credit-card-holder-offer-triple-play-refund-benefist')}`,
        },
        {
          text: `${this.t('credit-card-holder-offer-no-interests-benefist')}`,
        },
        {
          text: `${this.t('credit-card-holder-offer-triple-play-points-benefist')}`,
        }];
    } else if (this.isCrea) {
      list = [
        {
          text: `${this.t('credit-card-holder-offer-crea-points-benefist-part1')} <strong>${this.t('credit-card-holder-offer-crea-points-benefist-part2')}</strong> ${this.t('credit-card-holder-offer-crea-points-benefist-part3')}`,
        },
        {
          text: `${this.t('credit-card-holder-offer-purchases-benefist')}`,
        },
        {
          text: `${this.t('credit-card-holder-offer-benefist-months')}`,
        }
      ];
    } else {
      this.isTdcBasic = true;
      list = [
        {
          text: `${this.t('credit-card-holder-offer-interest-free-and-cash-part1')}`,
          text2: `${this.t('credit-card-holder-offer-interest-free-and-cash-part2')}`,
        },
        {
          text: `${this.getPointPercentage(this.offerData)}${this.t('credit-card-holder-offer-points-benefist-part1')}`,
          text2: `${this.t('credit-card-holder-offer-points-benefist-part2')}`,
        },
        {
          text: `${this.t('credit-card-holder-offer-pay-card-part1')}`,
          text2: `${this.t('credit-card-holder-offer-pay-card-part2')}`,
        }];
    }
    return list;
  }

  /**
   * @override
   * @desc validates the step component
   * @return {Boolean} The validity of the step component
   */
  isValid() {
    return !this.submitButtonDisabled;
  }
  /**
   * @desc relaunch request to offer data when page is initialized
   * @param {Object} offer
   * @param {Boolean} init
   */
  relaunchRequestOfferData(offer, init) {
    let idIdentifyNonPreapproved = ((offer || {}).identifyNonPreapproved || {}) === true ? offer.identifyNonPreapproved : false;

    if (offer && init && !idIdentifyNonPreapproved) {
      this.requestOfferData(offer);
    } else if (idIdentifyNonPreapproved) {
      this.offerDataLoad(offer);
    }
  }
  /**
   * @desc fires 'request-offer-data' event to get the offer data from DM
   * @param {Object} offer
   */
  requestOfferData(offer) {
    this.dispatchEvent(new CustomEvent(this.SHOW_SPINNER_CONSTANT));
    let showPromotion = (offer || {}).isTriplePlayCreditCard && offer.isTriplePlayCreditCard !== '';
    if (offer && offer.offerId && typeof(offer.offerId) !== 'boolean') {
      this.set('loading', true);
      this.set('offerId', offer.offerId);
      this.set('cardId', offer.cardId);
      this.set('showPromotionCode', showPromotion ? false : this.get('isCpAvailable', offer));
      if (offer.period) {
        this.set('periodOfferEndDate', offer.period.endDate);
      }
      this.dispatchEvent(new CustomEvent('request-offer-data', { detail: offer.offerId }));
    } else {
      this.offerDataLoadError();
    }
  }

  /**
   * @desc getting offer data from dm
   * @param {Object} data
   */
  offerDataLoad(data) {
    if (this.savePrevAmount && data) {
      data.details.suggestedAmount.amount =  this.savePrevAmount;
    }
    this.set('offerData', data);
    this.set('headerTitleText', this.cardName);
    this.set('offerData.isTriplePlayOffer', this.isTriplePlayOffer);
    this.set('userModifications', true);
    this._validateNpa(data);
    this._validateCrea(data);
    if (data && data.details) {
      this.set('prevAmount', data.details.suggestedAmount && data.details.suggestedAmount.amount);
      if (data.details.product) {
        this.set('offerData.cardId', data.details.product.id);
      } else {
        this.set('offerData.cardId', data.details.product && data.details.product.id);
      }
    }
    this.set('loading', false);
    this._termAndConditionList();
    this.requestDataAccount();
    this.offerName = this.setOfferName(this.isNpa, this.triplePlayOfferType);
    if (this.isInfinite) {
      this.dispatchEvent(new CustomEvent('hide-address', {
        detail: true
      }));
    }
    this._fireAppVisitAnalytics();
    this.dispatchEvent(new CustomEvent(this.HIDE_SPINNER_CONSTANT));
    if (this.isNpa) {
      this._firstStep();
    }
    if (this.collapsedFromIne) {
      this._firstStep();
    }
  }

  /**
   * @desc fires 'request-account-info' or 'request-account-info-to-offer' event to get account info from DM
   */
  requestDataAccount() {
    if (this.isTriplePlayOffer) {
      this.dispatchEvent(new CustomEvent('request-account-info-to-offer', {
        detail: {
          number: this.offerDataInfo.accountNumber
        }
      }));
    } else {
      this.dispatchEvent(new CustomEvent('request-account-info', {
        detail: {
          number: this.offerDataInfo.accountNumber
        }
      }));
    }
  }

  /**
  * @desc isNPA method for validation on workflow steps
  * @param {String} data
  */
  _validateNpa(data) {
    if ((this.c(data, 'details.product.id') && this.c(this.offerDataInfo, 'typeOffer') === this.PRODUCT_ID_NPA) || this.c(data, 'isNpa') === this.PRODUCT_ID_NPA) {
      this.isNpa = true;
      this.set('stepTitle', 'credit-card-holder-offer-npa-title-step');
      this.dispatchEvent(new CustomEvent('header-title-text-changed', {
        detail: this.cardName
      }));
    } else {
      this.isNpa = false;
      this.set('stepTitle', 'credit-card-holder-offer-title');
    }
  }

  /**
   * @desc IsCrea method to show the Benefits
   * @param {Object} data
   */
  _validateCrea(data) {
    if (data.details.product.id === this.CREA_CARD_CONSTANT) {
      this.isCrea = true;
    } else {
      this.isCrea = false;
    }
  }
  /**
   * @desc Fire analytics for all steps
   * @param {String} stepNumber
   */
  fireAppStepsAnalytics(stepNumber) {
    let stepNumberInteger;
    switch (stepNumber) {
      case 'address-selector':
        stepNumberInteger = 4;
        break;
      case 'app-step-2':
        stepNumberInteger = 2;
        break;
      case 'last':
        stepNumberInteger = 6;
        break;
      default:
        stepNumberInteger = stepNumber ? parseInt(stepNumber) : 3;
    }
    if (stepNumberInteger >= 3) {
      this.creditCardAnalytics.offer = this.benefitCoupon ? this.codeTitle : '';
      this.creditCardAnalytics.amount = this.offerData.details.suggestedAmount.amount;
    }
    if (stepNumberInteger >= 4) {
      let paymentMethodSelected = '';
      if (this.paymentMethodSelected === this.MINIMUM_AMOUNT_PAYMENT_CONSTANT) {
        paymentMethodSelected = this.ANALYTICS_CONSTANTS.MINIMUM_PAYMENT_STEPS;
      } else if (this.paymentMethodSelected === this.MINIMUM_AMOUNT_TO_AVOID_INTEREST_PAYMENT_CONSTANT) {
        paymentMethodSelected = this.ANALYTICS_CONSTANTS.PAYMENT_WITHOUT_INTEREST_STEPS;
      }
      this.creditCardAnalytics.customField = paymentMethodSelected;
    }
    if (stepNumberInteger >= 5) {
      this.creditCardAnalytics.typology = this.typology;
    }
    this.dispatchEvent(new CustomEvent(`app-step-${stepNumberInteger}`, {
      detail: this.creditCardAnalytics
    }));
  }
  /**
   * @desc getting offer data from dm in error case
   * @param {Object} data
   */
  offerDataLoadError(data) {
    this._showGenericError('offer');
  }
  /**
   * @desc fires 'simulate-request' event to get the offer data from DM
   * @param {Object} offer
   */
  requestSimulation() {
    const amount = this.get('offerData.details.suggestedAmount');
    this.dispatchEvent(new CustomEvent(this.SHOW_SPINNER_CONSTANT));
    let requestData = {
      offerId: this.get('offerId'),
      requestPayload: {
        details: {
          offerType: this.get('OFFER_TYPE_CCH'),
          limitAmount: amount,
          product: {
            id: this.offerDataInfo.typeOffer,
            subproduct: {
              id: this.offerData.details.product.subproduct ? this.offerData.details.product.subproduct.id : this.offerData.details.product.id
            }
          }
        }
      }
    };
    this.dispatchEvent(new CustomEvent('request-simulation', {
      detail: requestData
    }));
  }
  /**
   * @desc getting offer data simulated from dm
   * @param {Object} data
   */
  offerSimulated(data) {
    this.dispatchEvent(new CustomEvent(this.HIDE_SPINNER_CONSTANT));
    this.set('offerData.details.offerType', data.details.offerType);
    this.set('offerData.details.product.name', this.offerData.details.product.name);
    this.set('offerData.details.image', this.offerData.image);
    this.set('offerData.details.product', data.details.product);
  }
  /**
   * @desc getting offer data simulated from dm in error case
   */
  offerSimulatedError() {
    this._showGenericError('offer');
  }
  /**
   * @desc watch for the amount changes
   */
  _onUpdateAmount({ detail = '' }) {
    if (detail !== this.prevAmount && detail !== '') {
      this.requestSimulation();
      this.set('prevAmount', detail);
    }
    if (!this.userHasIne && this.customerNationalityFlagIne) {
      this.set('savePrevAmount', this.prevAmount);
    }
  }
  /**
   * @desc update selected payment method when 'cells-radio-group-selected-changed' event is fired
   * @param {Object} event
   * @param {Object} payload
   */
  updateSelectedPaymentMethod(payload) {
    if (payload && payload.paymentMethodDetail && payload.paymentMethodSelected) {
      let paymentValue = payload.paymentMethodDetail.value;
      let paymentDomiciliationChoice = payload.paymentMethodSelected;
      this.set('paymentMethodSelected', paymentValue === 0 ? this.MINIMUM_AMOUNT_PAYMENT_CONSTANT : this.MINIMUM_AMOUNT_TO_AVOID_INTEREST_PAYMENT_CONSTANT);
      this.set('domiciliationChoiceText', paymentDomiciliationChoice);
    }
    this._termAndConditionList();
  }
  /**
   * @desc fires 'go-next-step' event when the primary button is clicked or tapped
   */
  _firstStep() {
    this._fireAppStartedAnalytics(this.ANALYTICS_CONSTANTS.I_WANT_IT);
    this.dispatchEvent(new CustomEvent('app-started'));
    this.dispatchEvent(new CustomEvent('toggle-step', {
      detail: true
    }));
    if (!this.userHasIne && this.customerNationalityFlagIne) {
      this._sendDataIne();
      return;
    }
    this.changeHeaderColor('header--core');
    if (this.isInfinite) {
      this.dispatchEvent(new CustomEvent('skip-step'));
    }
    if (this.customerNationalityFlagRfc && !this.userFormCollapsed) {
      this._dispatchEvents('toggle-user-form-step', true);
    } else {
      this.dispatchEvent(new CustomEvent('toggle-payment-selector-step', {
        detail: true
      }));
    }
    if (this.termsActive && this.termsCollapsed && this.paymentSelectorCollapsed && this.addressCollapsed) {
      this.dispatchEvent(new CustomEvent('show-terms-and-conditions-step', {
        detail: false
      }));
    }
    this._nextStep();
    this.creditCardOfferAppsFlyer();
  }
  /**
   * @desc verify if the user do whatever change and in this case launch confirmation exit modal
   */
  confirmDeparture() {
    if (this.userModifications) {
      this.dispatchEvent(new CustomEvent('show-confirm-exit-modal'));
    } else if (this.isTriplePlayOffer) {
      let infoModal = {
        code: 'triple-play-offer',
        selectedConfig: {
          acceptBtLabel: 'credit-card-holder-offer-offer-modal-button-text-one',
          cancelBtLabel: 'credit-card-holder-offer-offer-modal-button-text-two',
          className: 'full-height-error credit-card-holder-notice',
          openMaximized: true,
          title: this.cardName,
          heroImage: './images/triplePlay/starYellow.png',
          template: {
            type: 'paragraphs',
            values: [{
              title: 'credit-card-holder-offer-offer-modal-title',
              class: 'title-center spacing'
            },
            {
              text: `<strong>${this.t('credit-card-holder-offer-offer-modal-text-one')}</strong>`,
              class: 'spacing '
            },
            {
              text: 'credit-card-holder-offer-offer-modal-text-two'
            }]
          }
        }
      };
      this.dispatchEvent(new CustomEvent('show-confirm-exit-offer', {
        detail: infoModal,
        bubbles: true,
        composed: true
      }));
    }
  }
  /**
   * @desc update 'submitButtonDisabled' when 'amount-input-changed' event is fired
   * @param {Object} evt
   * @param {Object} payload
   */
  _validateAmount(evt) {
    const amount = evt.detail;
    let isValid = false;
    if (
      amount && amount >= this.get('offerData.details.minimumAmount.amount') && amount <= this.get('offerData.details.maximumAmount.amount')
    ) {
      isValid = true;
    }
    this.set('submitButtonDisabled', !isValid);
  }

  /**
   * @desc is the card offer an INFINITE card
   * @return {Boolean}
   */
  _isInfinite(cardTitle) {
    return cardTitle ? cardTitle.id === this.INFINITE_CARD_ID : false;
  }

  /**
   * @desc find specific rate in array based on an ID
   * @param 'items' rates array
   * @param 'itemId' rate id
   * @return {Object}
   */
  _findRate(items, itemId) {
    let item = null;
    if (items && items.length) {
      item = items.find(function(currentItem) {
        return currentItem.rateType === itemId.toUpperCase();
      });
    }
    return item;
  }
  /**
   * @desc find specific fee in array based on an ID
   * @param 'items' fees array
   * @param 'itemId' fee id
   * @return {Object}
   */
  _findFee(items, itemId) {
    let item = null;
    if (items && items.length) {
      item = items.find(function(currentItem) {
        return currentItem.feeType === itemId;
      });
    }
    return item;
  }
  /**
   * @desc get card offer's rewards rate
   * @param 'rates' rates array
   * @type {Object}
   */
  _getRewardsRate(rates) {
    return this._findRate(rates, this.REWARDS_RATE_ID);
  }
  /**
   * @desc get card offer's CAT rate
   * @param 'rates' rates array
   * @type {Object}
   */
  _getCATRate(rates) {
    return this._findRate(rates, this.CAT_RATE_ID);
  }
  /**
   * @desc get card offer's anual rate
   * @param 'rates' rates array
   * @type {Object}
   */
  _getAnnualRate(rates) {
    return this._findRate(rates, this.ANNUAL_RATE_ID);
  }
  /**
   * @desc get card offer's anual fee
   * @param 'fees' fees array
   * @return {Object}
   */
  _getAnnualFee(fees) {
    return this._findFee(fees, this.ANNUAL_FEE_ID);
  }
  /**
   * @desc get card name
   * @param {object} details of the offer
   * @return {String} card name
   */
  _getCardName(details) {
    return details && details.product.name ? `TARJETA ${details.product.name.toUpperCase().replace('TARJETA', '').trimStart()}` : '';
  }
  /**
   * @desc set the shipping address in terms and conditions list
   * @param {object} shipping addres selected in the radio button
   */
  _shippingAddressChanged(shippingAddress) {
    let sendTargetUserText = shippingAddress.value === 1 ? this.textBranchSelected : shippingAddress.value === 2 && this.alternateAddressFlag ? 'credit-card-holder-alternate-address-text' : this.ADDRES_TEXT_CONSTANT;
    this.set('sendTargetUserText', sendTargetUserText);
    this._termAndConditionList();
  }

  /**
   * Method that make the request from native for the flag
   */
  requestChangeDenomitationFlag() {
    const denominationFlag = {
      module: 'offers',
      feature: 'changeDenominationFlag'
    };
    this.dispatchEvent(new CustomEvent('request-change-denomination-flag', { detail: denominationFlag, bubbles: true, composed: true }));
  }
  /**
   * Method get response from native for the flag
   */
  setDenominationFlag(payload) {
    if (payload.module === 'offers' && payload.feature === 'changeDenominationFlag') {
      this.creditCardFlag = payload.isFlagEnable;
      this.set('creditBureauText', this.creditCardFlag ? this.t('credit-card-holder-credit-bureau-modal-text-bbva') : this.t('credit-card-holder-credit-bureau-modal-text'));
    }
  }

  /**
   * Method that make the request from  native for the flag
   */
  setCustomerRfcFlagStatus(payload) {
    this.set('creditBureauText', this.t('credit-card-holder-credit-bureau-modal-text-bbva'));
    if (payload.module === 'dashboard' && payload.feature === 'customerLoginsRfc' && payload.isFlagEnable) {
      this._requestCustomer();
    }
  }

  /**
   *  Throws event to request open web flag
   *  @event request-change-customer-rfc-open-web-flag
   */
  requestCustomerLoginsRfcFlag() {
    const customerLoginsRfcFlag = {
      module: 'dashboard',
      feature: 'customerLoginsRfc'
    };
    this.dispatchEvent(new CustomEvent('request-change-customer-rfc-open-web-flag', { detail: customerLoginsRfcFlag, bubbles: true, composed: true }));
  }

  /**
   * @desc term and condition list
   */
  _termAndConditionList() {
    let termsAndConditionsList = [];
    let positionList1 = 0;
    let positionList2 = 0;
    let positionList3 = 0;
    if (this.isNpa) {
      termsAndConditionsList = [
        {
          checked: true,
          label: `${this.t('credit-card-holder-terms-and-conditions-terms-accept-cch')} <strong>${this.cardName}.</strong>`,
          labelClickEventName: 'terms-clicked'
        }
      ];
      positionList1 = 1;
      positionList2 = 2;
      positionList3 = 3;
    } else {
      termsAndConditionsList = [
        {
          checked: true,
          label: this.t('credit-card-holder-terms-and-conditions-bureau-consent'),
          labelClickEventName: 'bureau-clicked'
        },
        {
          checked: true,
          label: `${this.t('credit-card-holder-terms-and-conditions-terms-accept-cch')} <strong>${this.cardName}.</strong>`,
          labelClickEventName: 'terms-clicked'
        }
      ];
      positionList1 = 2;
      positionList2 = 3;
      positionList3 = 4;
    }

    if (this.domiciliationCheck) {
      termsAndConditionsList = this.listWithDomiciliation(termsAndConditionsList, positionList1, positionList2, positionList3);
    } else {
      termsAndConditionsList = this.listWithoutDomiciliation(termsAndConditionsList, positionList1, positionList2);
    }

    this.dispatchEvent(new CustomEvent('credit-card-holder-termcondition', {
      detail: termsAndConditionsList
    }));
  }

  /**
   * @desc return terms and conditions list whit domiciliation
   */
  listWithDomiciliation(list, positionList1, positionList2, positionList3) {
    let termsAndConditionsList = list;
    const labelClickEventActivation = 'activation-clicked';
    const paymentActivationText = 'credit-card-holder-terms-and-conditions-payment-activation';
    const digitalCardText = `<strong>${this.t('credit-card-holder-digital-card')}</strong>`;
    const activationDetailText = 'credit-card-holder-terms-and-conditions-payment-activation-detail';

    termsAndConditionsList[positionList1] = {
      checked: true,
      label: `${this.t('credit-card-holder-terms-and-conditions-payment-accept')} <strong>${this.t(this.domiciliationChoiceText)}</strong>.`,
      labelClickEventName: 'payment-clicked',
      note: 'credit-card-holder-terms-and-conditions-payment-note'
    };
    if (!this.isInfinite) {
      termsAndConditionsList[positionList2] = {
        checked: true,
        label: `${this.t('credit-card-holder-terms-and-conditions-shipping-concent')} ${this.t(this.sendTargetUserText)}`,
        labelClickEventName: 'shipping-clicked'
      };
      if (this.sendTargetUserText === this.textBranchSelected && this.showDigitalCardCheck || this.sendTargetUserText !== this.textBranchSelected) {
        termsAndConditionsList[positionList3] = {
          checked: true,
          label: `${this.t(paymentActivationText)} ${this.t(digitalCardText)} ${this.t(activationDetailText)}`,
          labelClickEventName: labelClickEventActivation
        };
      }
    } else {
      termsAndConditionsList[positionList2] = {
        checked: true,
        label: `${this.t(paymentActivationText)} ${this.t(digitalCardText)} ${this.t(activationDetailText)}`,
        labelClickEventName: labelClickEventActivation
      };
    }

    return termsAndConditionsList;
  }

  /**
   * @desc return terms and conditions list without domiciliation
   */
  listWithoutDomiciliation(list, positionList1, positionList2) {
    let termsAndConditionsList = list;
    const labelClickEventActivation = 'activation-clicked';
    const paymentActivationText = 'credit-card-holder-terms-and-conditions-payment-activation';
    const digitalCardText = `<strong>${this.t('credit-card-holder-digital-card')}</strong>`;
    const activationDetailText = 'credit-card-holder-terms-and-conditions-payment-activation-detail';

    if (!this.isInfinite) {
      termsAndConditionsList[positionList1] = {
        checked: true,
        label: `${this.t('credit-card-holder-terms-and-conditions-shipping-concent')} ${this.t(this.sendTargetUserText)}`,
        labelClickEventName: 'shipping-clicked'
      };
      if (this.sendTargetUserText === this.textBranchSelected && this.showDigitalCardCheck || this.sendTargetUserText !== this.textBranchSelected) {
        termsAndConditionsList[positionList2] = {
          checked: true,
          label: `${this.t(paymentActivationText)} ${this.t(digitalCardText)} ${this.t(activationDetailText)}`,
          labelClickEventName: labelClickEventActivation
        };
      }
    } else {
      if (this.sendTargetUserText === this.ADDRES_TEXT_CONSTANT) {
        termsAndConditionsList[positionList1] = {
          checked: true,
          label: `${this.t(paymentActivationText)} ${this.t(digitalCardText)} ${this.t(activationDetailText)}`,
          labelClickEventName: labelClickEventActivation
        };
      }
    }

    return termsAndConditionsList;
  }
  /**
   * @desc Handle the number of times the user can retry the contract
   */
  handleNumberOfCreditCardRequests() {
    this.numberCreditCardRequests++;
    this._requestCreditCard();
  }
  /**
   * @desc launch the event
   * @param {event} custom event credit-card-holder-send-request for make the credit request
   */
  _requestCreditCard(e) {
    let destinationID = '';
    let product = this.offerData.details.product;
    let originID = this.offerData.origin.id;
    if (this.isTriplePlayOffer) {
      destinationID = this.ADDRESS_HOME_CONSTANT;
    } else {
      destinationID = this.shippingAddress.value === 1 ? this.BRANCH_OFFICE_CONSTANT : this.ADDRESS_HOME_CONSTANT;
    }

    let payload = this.loadInfoRequestCreditCard(destinationID);
    if (payload && product && originID === this.DATA_ORIGIN_ALT_CONSTANT) {
      delete payload.hiringOrigin;
      if (product.subproduct && product.subproduct.id) {
        payload.product = {
          id: this.offerData.details.product.subproduct.id,
          subproduct: {
            id: this.offerDataInfo.typeOffer
          }
        };
      } else {
        payload.product = {
          id: this.offerData.details.product.id,
          subproduct: {
            id: this.offerDataInfo.typeOffer
          }
        };
      }

    }
    this.dispatchEvent(new CustomEvent('credit-card-holder-send-request-cards', {
      detail: payload
    }));
    this.set('showButtonRequest', true);
    this.fireAppStepsAnalytics(7);
    this.dispatchEvent(new CustomEvent(this.SHOW_SPINNER_CONSTANT));
  }

  /**
   * @desc launch the event
   * @param {event} custom event request-post-create-delivery-event for make the credit card delivery request
   */
  requestCardCreateDelivery(cardId) {
    let colony = this.c(this.userAlternateAddress, 'location.address.colony', '').substring(0, 30);
    let payload = {
      apiVersion: '1',
      params: { 'card-id': cardId },
      body: {
        serviceType: { id: 'D' },
        address: {
          addressType: 'SPECIFIC',
          location: {
            additionalInformation: this.userAlternateAddress.location.references,
            addressComponents: [
              {
                componentTypes: [ 'STREET' ],
                name: this.userAlternateAddress.location.address.street
              },
              {
                componentTypes: [ 'EXTERIOR_NUMBER' ],
                name: this.userAlternateAddress.location.address.streetNumberExt
              },
              {
                componentTypes: [ 'INTERIOR_NUMBER' ],
                name: this.userAlternateAddress.location.address.streetNumberInt
              },
              {
                componentTypes: [ 'COLONY' ],
                name: colony
              },
              {
                componentTypes: [ 'BETWEEN_STREET1' ],
                name: ''
              },
              {
                componentTypes: [ 'BETWEEN_STREET2' ],
                name: ''
              },
              {
                componentTypes: [ 'COUNTRY' ],
                name: this.userAlternateAddress.location.country.id
              },
              {
                componentTypes: [ 'ADMINISTRATIVE_AREA_LEVEL_1' ],
                name: this.userAlternateAddress.location.state.id
              },
              {
                componentTypes: [ 'POSTAL_CODE' ],
                name: this.userAlternateAddress.location.zipCode
              },
              {
                componentTypes: [ 'DELEGATION' ],
                name: this.userAlternateAddress.location.address.municipality
              }
            ]
          }
        },
        destination: { id: 'CUSTOM' }
      }
    };
    this.dispatchEvent(new CustomEvent('request-post-create-delivery-event', {
      detail: payload,
      bubbles: true,
      composed: true
    }));
  }
  /**
   * @desc launch the event and hide spinner
   * @param {event} custom event show-successful-contracting
   */
  showSuccessfulContracting() {
    this._handleEventError('show-successful-contracting', this.responseSuccessCreditCard);
    this.dispatchEvent(new CustomEvent(this.HIDE_SPINNER_CONSTANT, {
      bubbles: true,
      composed: true
    }));
  }
  /**
   * @desc launch the event
   * @param {event} custom event to show success screen show-successful-contracting
   */
  successPostCardDeliveryHandler() {
    this.showSuccessfulContracting();
  }

  /**
   * @desc launch the event
   * @param {event} custom event to show success screen show-successful-contracting with message error for delic¡very card
   */
  errorPostCardDeliveryHandler() {
    this.responseSuccessCreditCard.errorCardDelivery = true;
    this.showSuccessfulContracting();
  }

  /**
   * @desc return the information to send it to an event _requestCreditCard
   */
  loadInfoRequestCreditCard(data) {
    let payload = '';
    let destinationID = data;
    let cardTypeID = this.offerData && this.offerData.cardType && this.offerData.cardType.id;
    let titleID = this.offerData.cardId;
    let suggestedAmount = this.offerData && this.offerData.details && this.offerData.details.suggestedAmount;
    payload = {
      offerId: this.offerId,
      cardAgreement: '',
      cardType: {
        id: cardTypeID
      },
      product: {
        id: titleID,
        subproduct: {
          id: this.offerDataInfo.typeOffer,
        },
      },
      physicalSupport: {
        id: this.PHYSICAL_SUPPORT_CONSTANT
      },
      currencies: [
        {
          currency: this.localCurrency,
          isMajor: true
        }
      ],
      grantedCredits: [
        {
          amount: suggestedAmount && suggestedAmount.amount,
          currency: this.localCurrency
        }
      ],
      status: {
        id: this.STATUS_ID_CONSTANT
      },
      deliveries: [
        {
          serviceType: {
            id: this.SERVICE_TYPE_CONSTANT
          },
          destination: {
            id: destinationID
          }
        }
      ],
      paymentMethod: {
        id: this.paymentMethodSelected === this.NO_DOMICILIATION_PAYMENT_CONSTANT ? this.NO_DOMICILIATION_PAYMENT_CONSTANT_PAYLOAD : this.paymentMethodSelected,
        frecuency: {
          id: this.MONTHLY_PERIOD_CONSTANT
        }
      },
      relatedContracts: [
        {
          contractId: null,
          numberType: {
            id: this.NUMBER_TYPE_CONSTANT
          },
          product: {
            id: this.PRODUCT_CONTRACT_CONSTANT
          },
          relationType: {
            id: this.RELATION_TYPE_CONSTANT
          }
        }
      ],
      offerRecalculationType: {
        id: this.RECALCULATION_TYPE_CONSTANT
      },
      participants: [
        {
          legalPersonType: {
            id: this.LEGAL_PERSON_TYPE_CONSTANT
          }
        }
      ],
      activations: [
        {
          id: this.ACTIVATIONS_CONSTANT,
          isActive: true
        }
      ],
      staticFeatures: [
        {
          id: this.SFEATURES_CONSTANT
        },
        {
          id: this.STATIC_FEATURES_CONSTANT
        }
      ],
      hiringOrigin: {
        id: this.ORIGIN_CONSTANT
      }
    };

    return payload;
  }
  /**
   * @desc get the user address from api
   * @param {Object} address
   */
  _responseUserAddress(response) {
    response.forEach(function(addressObj) {
      if (addressObj.addressType.id === this.ADDRESS_HOME_CONSTANT) {
        this.set('userAddress', addressObj);
      }
    }, this);
  }
  /**
   * @desc get the user address from api
   * @param {Object} address
   */
  responseUserAlternateAddress(response) {
    this.set('userAlternateAddress', response);
    this.showHideUserAlternateAddress = true;
  }
  /**
   * @desc get data and launch event to show success screen
   * @param {Object} response
   */
  _creditCardHolderResponseSuccess(response) {
    let suggestedAmount = this.offerData && this.offerData.details && this.offerData.details.suggestedAmount;
    let objResponse = {
      amount: {
        amount: suggestedAmount.amount,
        currency: suggestedAmount.currency
      },
      cardId: response.cardId || response.id,
      openingDate: response.openingDate,
      number: response.number || null,
      operationDate: response.operationDate,
      operationNumber: response.operationNumber,
      maskAddres: this.typology === this.HOME_CONSTANT ? this.showHideUserAddress : this.showHideUserAlternateAddress,
      title: this.cardName,
      image: this.offerData.image,
      paymentMethod: this.paymentMethodSelected,
      typology: this.typology,
      userAddress: this.typology === this.HOME_CONSTANT ? this.userAddress : this.userAlternateAddress,
      subproductId: this.offerData.cardId,
      cardName: this.cardName,
      offerName: this.offerName
    };

    if (this.paymentMethodSelected !== this.NO_DOMICILIATION_PAYMENT_CONSTANT) {
      objResponse.accountNumber = this.offerDataInfo.accountNumber;
    }

    if (this.isTriplePlayOffer) {
      objResponse.triplePlayOfferType = this.triplePlayOfferType;
      objResponse.accountAlias = this.nameAccount;
      objResponse.accountId = this.account.accountId;
      objResponse.accountNumber = this.account.number;
    }

    if (this.typology === this.ALTERNATE_ADDRESS_CONSTANT && this.alternateAddressFlag) {
      this.validLocationStateId();
      this.set('responseSuccessCreditCard', objResponse);
    } else {
      this._handleEventError('show-successful-contracting', objResponse);
      this.dispatchEvent(new CustomEvent(this.HIDE_SPINNER_CONSTANT, {
        bubbles: true,
        composed: true
      }));
    }

    this._fireAppCompletedAnalytics('app-completed-successful-contracting', response.operationNumber);
  }
  /**
   * @desc valid if location state id is empty and dispatch event places service
   */
  validLocationStateId() {
    let stateId = this.c(this.userAlternateAddress, 'location.state.id', '');
    let zipCode = this.c(this.userAlternateAddress, 'location.zipCode', '');
    if (stateId === '') {
      this.dispatchEvent(new CustomEvent('get-list-places-service', { bubbles: true, composed: true, detail: zipCode }));
    } else {
      this.requestGetFinanctialOverview();
    }
  }
  /**
   * @desc set success response list places and request finantial overview
   * @param {Object} response
   */
  setResponseListPlaces(response) {
    this.userAlternateAddress.location.state.id = response && Object.keys(response).length !== 0 ? response[0].state.id : '';
    this.requestGetFinanctialOverview();
  }
  /**
   * @desc set error response list places and request finantial overview
   */
  setErrorResponseListPlaces() {
    this.userAlternateAddress.location.state.id = '';
    this.requestGetFinanctialOverview();
  }
  /**
   * @desc request cards finantial overview
   */
  requestGetFinanctialOverview() {
    this.dispatchEvent(new CustomEvent('request-get-financtial-overview-event', {
      detail: {
        contracts: {
          productType: 'CARDS'
        }
      },
      bubbles: true,
      composed: true
    }));
  }
  /**
   * @desc get data cards of financial overview and call request card create delivery
   */
  successGetFinancialOverviewHandler(response) {
    const contracts = this.c(response, 'data.contracts');
    const number = this.c(this.responseSuccessCreditCard, 'number', '');
    if (contracts) {
      let card = contracts.find(cards => cards.number === number);
      if (card) {
        this.requestCardCreateDelivery(card.id);
      } else {
        this.responseSuccessCreditCard.errorCardDelivery = true;
        this.showSuccessfulContracting();
      }
    } else {
      this.responseSuccessCreditCard.errorCardDelivery = true;
      this.showSuccessfulContracting();
    }
  }
  /**
   * @desc launch the event
   * @param {event} custom event to show success screen show-successful-contracting with message error for delic¡very card
   */
  errorGetFinancialOverviewHandler() {
    this.responseSuccessCreditCard.errorCardDelivery = true;
    this.showSuccessfulContracting();
  }
  /**
   * @desc map to errors response and launch the event in the different cases
   * @param {Object} response
   */
  creditCardHolderResponseError(response) {
    if (response && response.errorCode) {
      let payload = {
        amount: {
          amount: this.offerData.details.suggestedAmount.amount,
          currency: this.offerData.details.suggestedAmount.currency
        },
        title: this.offerData.details.product,
        image: this.offerData.image,
        operationNumber: response.operationNumber,
        typology: this.typology
      };
      switch (response.errorCode) {
        case this.BURO_ERROR_CODE:
          this._fireAppCompletedAnalytics('app-completed-incomplete-information', response.operationNumber);
          this._handleEventError('show-error-rejection-buro', payload);
          break;
        case this.BURO_WAIT_ERROR_CODE:
          this._fireAppCompletedAnalytics('app-completed-pending-approval', response.operationNumber);
          this._handleEventError('show-error-wait-buro', payload);
          break;
        case this.INFORMATION_CLIENT_ERROR_CODE:
          this._fireAppCompletedAnalytics('app-completed-incomplete-information', response.operationNumber);
          this._handleEventError('show-error-user-information', payload);
          break;
        default:
          this._showGenericError('generic');
          break;
      }
    } else {
      this._showDinamicModalError('show-generic-error', true, response);
    }
    this.dispatchEvent(new CustomEvent(this.HIDE_SPINNER_CONSTANT));
  }
  /**
   * @desc launch the event for show a 400 error
   * @param {String} eventName
   * @param {Boolean} it is a blocking error
   */
  _showDinamicModalError(eventName, isBlocking = false, errorResponse = {}) {
    let txtPrimary = '';
    let txtSecondary = '';
    if (errorResponse.status === this.STATUS_OPERATION_CANCELED_BY_THE_USER) {
      txtPrimary = this.t('credit-card-holder-offer-operation-canceled-error');
    } else {
      txtPrimary = 'name' in ((errorResponse.response_body.messages[0].parameters || [])[0] || {})
        ? errorResponse.response_body.messages[0].parameters[0].name
        : errorResponse.response_body.messages[0].code;

      txtSecondary = 'name' in ((errorResponse.response_body.messages[0].parameters || [])[1] || {})
        ? errorResponse.response_body.messages[0].parameters[1].name
        : errorResponse.response_body.messages[0].message;
    }
    this._handleEventError(eventName, {
      icon: 'glomo:general-error',
      title: this.t('credit-card-holder-error-generic-title-text'),
      failureText: `${txtPrimary} ${txtSecondary}`,
      isBlockingError: isBlocking,
      primaryButtonText: this.t('credit-card-holder-error-generic-primary-button'),
      secondaryButtonText: this.t(this.CREDIT_CARD_HOLDER_ERROR_GENERIC_CONSTANT),
      headerTitleText: this.t('credit-card-holder-error-generic-title-header')
    });
  }
  /**
   * @desc launch the event for show the generic error
   * @param {String} typeError
   */
  _showGenericError(typeError = '') {
    const titleError = typeError === 'offer' ? 'credit-card-holder-error-modal-offer-title' : '';
    const codeModal = [ 'maritalStatus' ].includes(typeError) ? 'credit-card-holder-error-generic-marital-status' :  [ 'customerContacts' ].includes(typeError) ? 'credit-card-holder-error-generic-customer-contacts' : 'credit-card-holder-error-generic';
    const errorModal = {
      code: codeModal,
      primaryButtonClass: 'primary',
      selectedConfig: {
        className: 'full-height-error info',
        heroImage: this.heroImage,
        openMaximized: true,
        title: this.cardName || 'credit-card-holder-error-modal-header-title',
        acceptBtLabel: 'credit-card-holder-error-generic-primary-button',
        cancelBtLabel: 'credit-card-holder-error-generic-secondary-button',
        cancelFromHeaderEvent: 'cancel',
        cancelEventsLinked: false,
        template: {
          type: 'paragraphs',
          values: [
            { title: titleError || 'credit-card-holder-error-generic-title-text', class: 'simple-title' },
            { text: 'credit-card-holder-error-generic-body-text' }
          ]
        }
      }
    };

    if (this.numberCreditCardRequests >= this.maximumNumberCreditCardRequests || this.attempsGetMaritalStatus >= this.maxAttempsUpdateRfc || this.attempsGetCustomerContacts >= this.maxAttempsUpdateRfc  || titleError) {
      errorModal.code = 'CCHP-maximum-attempts';
      errorModal.selectedConfig.acceptBtLabel = 'credit-card-holder-error-generic-secondary-button-maximum-requests';
      errorModal.selectedConfig.cancelBtLabel = '';
      errorModal.selectedConfig.cancelFromHeaderEvent = 'accept';
      errorModal.selectedConfig.cancelEventsLinked = true;
      errorModal.selectedConfig.template.values[1].text = 'credit-card-holder-error-generic-body-text-maximum-requests';
      Object.assign(errorModal.selectedConfig, {
        onAcceptEvent: () => {
          this._handleEventError('alert-CCHP-maximum-attempts-accept', '');
        },
        onCancelEvent: () => {
          this._handleEventError('alert-CCHP-maximum-attempts-accept', '');
        },
      });
    }

    this._handleEventError('credit-card-holder-generic-error-modal', errorModal);
  }
  /**
   * @desc launch the event
   * @param {String} eventName
   * @param {Object} errorPayload
   */
  _handleEventError(eventName, errorPayload = {}) {
    this.dispatchEvent(new CustomEvent(eventName, {
      detail: errorPayload
    }));
  }
  /**
   * @desc launch the event for change header color
   * @param {Object} event
   */
  changePressedFirstStep(e) {
    this._fireAppVisitAnalytics();
    this._reset();
    this.changeHeaderColor(this.CREDIT_CARD_HOLDER_CONSTANT);
    if (!this.userFormCollapsed) {
      this._dispatchEvents('toggle-user-form-step', false);
    }
    if (!this.addressCollapsed) {
      this.dispatchEvent(new CustomEvent('toggle-address-step', {
        bubbles: true,
        composed: true,
        detail: false
      }));
    }
    if (!this.termsCollapsed) {
      this.dispatchEvent(new CustomEvent('toggle-terms-step', {
        bubbles: true,
        composed: true,
        detail: false
      }));
    }
    if (!this.paymentSelectorCollapsed) {
      this.dispatchEvent(new CustomEvent('toggle-payment-selector-step', {
        bubbles: true,
        composed: true,
        detail: false
      }));
    }
  }
  /**
   * @desc deactivates terms and conditions if the second or first step is full
   */
  changeTermsAndConditions(e) {
    this.fireAppStepsAnalytics(5);
    if (!this.addressCollapsed || !this.collapsed) {
      this.dispatchEvent(new CustomEvent('toggle-terms-step', {
        detail: false
      }));
    }
  }
  /**
   * @desc dispatch an event for change header color throw a class name of cells-component-app-header-shared-styles
   */
  changeHeaderColor(className) {
    if (this.isTriplePlayOffer && className === this.CREDIT_CARD_HOLDER_CONSTANT) {
      className = 'header--grey';
    }
    this.dispatchEvent(new CustomEvent('change-header-color', { detail: className }));
  }
  /**
   * @desc launches the event to link termsAndConditions Page
   */
  pdfOpenTerms(e) {
    this.dispatchEvent(new CustomEvent('send-pdf-terms-and-conditions-data', {
      detail: {
        title: this.t('credit-card-holder-terms-and-conditions-title'),
        productId: 'TDC',
        subProductId: this.offerData.cardId,
        documentName: this.pdfTermsConditionsdName
      }
    }));
  }
  /**
  * @desc Validate if offer is ALT/ CRM
  */
  _validateOfferTypeAlt(offer) {
    this.changeLabel = offer === this.DATA_ORIGIN_CRM_CONSTANT ? this.t('credit-card-holder-terms-and-conditions-subtitle') :
      this.t('credit-card-holder-terms-and-conditions-change');
    return offer === this.DATA_ORIGIN_ALT_CONSTANT;
  }
  /**
   * @desc set data account from dm account
   * @param {Object} account
   */
  setDataAccount(account) {
    this.set('containBenefitsList', this.getBenefistList());
    if (account && account.accountDetails &&
      account.accountDetails.availableBalance && account.accountDetails.availableBalance.currentBalances[0]) {
      this.account = account;
      this.set('nameAccount', account.accountDetails.alias);
      this.set('localAmount.amount', account.accountDetails.availableBalance.currentBalances[0].amount);
      this.set('localAmount.currency', account.accountDetails.availableBalance.currentBalances[0].currency);
      this.set('localDescription.value', account.accountDetails.number);
      this.set('localCurrency', account.accountDetails.availableBalance.currentBalances[0].currency);
    } else if (this.isTriplePlayOffer && account && account.availableBalance && account.availableBalance.currentBalances[0]) {
      this.account = account;
      this.set('nameAccount', account.alias);
      this.set('localAmount.amount', account.availableBalance.currentBalances[0].amount);
      this.set('localAmount.currency', account.availableBalance.currentBalances[0].currency);
      this.set('localDescription.value', account.number);
      this.set('localCurrency', account.availableBalance.currentBalances[0].currency);
    }
    let chargueAccount = {
      amount: this.localAmount,
      description: this.localDescription,
      currency: this.localCurrency,
      nameAccount: this.nameAccount
    };
    this.dispatchEvent(new CustomEvent('set-chargue-account', { detail: chargueAccount }));
  }
  /**
   * @desc watch for domiciliation choice
   * @param e cells-switch-changed
   */
  domiciliationChoice(e) {
    this.set('domiciliationCheck', e);
    if (e) {
      this.set('paymentMethodSelected', this.MINIMUM_AMOUNT_PAYMENT_CONSTANT);
    } else {
      this.set('paymentMethodSelected', this.NO_DOMICILIATION_PAYMENT_CONSTANT);
    }
    this._termAndConditionList();
  }
  /**
   * @desc Fire 'app-page-visit' event to send analytics
   */
  _fireAppVisitAnalytics() {
    this.set('appStartedFired', false);
    let process;
    if (this.isNpa) {
      if (this.isTriplePlayOffer) {
        process = `${this.t('credit-card-holder-non-preapproved-double-play-process')}`;
      } else {
        process = `${this.t('credit-card-holder-non-preapproved-process')}`;
      }
    } else {
      if (this.isTriplePlayOffer) {
        process = `${this.t('credit-card-holder-preapproved-double-play-process')}`;
      } else {
        process = `${this.t('credit-card-holder-preapproved-process')}`;
      }
    }
    this.creditCardAnalytics.productName = `${this.cardName.toLowerCase().replace(' bbva', '')}`;
    this.creditCardAnalytics.process = process;
    this.dispatchEvent(new CustomEvent('app-page-visit', {
      detail: this.creditCardAnalytics
    }));
  }
  /**
   * @desc Fire 'app-started' event to send analytics
   * @param {String} step
   */
  _fireAppStartedAnalytics(step = '') {
    if (!this.appStartedFired) {
      this.creditCardAnalytics.step = step;
      this.dispatchEvent(new CustomEvent('app-started', {
        detail: this.creditCardAnalytics
      }));
      this.set('appStartedFired', true);
    }
  }
  /**
   * @desc get data and launch event to show success screen
   * @param {Object} response
   */
  _fireAppCompletedAnalytics(eventName, operationNumber) {
    this.creditCardAnalytics.operationNumber = operationNumber;
    this.dispatchEvent(new CustomEvent(eventName, {
      detail: this.creditCardAnalytics
    }));
  }
  /**
   * @desc Function that handle 'on-amount-input event'
   */
  onCreditLineInputFocus() {
    this._fireAppStartedAnalytics(this.ANALYTICS_CONSTANTS.CREDIT_LINE);
  }

  /**
   * @desc Validate type offer for appsFlyer
   */
  setOfferName(isNpa, triplePlayOffer) {
    let offerName;
    if (isNpa) {
      offerName = this.APPSFLYER_CONSTANTS.NO_PREAPPROVED_PROCESS;
    } else {
      switch (triplePlayOffer) {
        case 'creditCardWithPayroll':
          offerName = this.APPSFLYER_CONSTANTS.TRIPLE_PLAY_WITH_PAYROLL;
          break;
        case 'onlyCreditCard':
          offerName = this.APPSFLYER_CONSTANTS.TRIPLE_PLAY_ONLY_CARD;
          break;
        default:
          offerName = this.APPSFLYER_CONSTANTS.PREAPPROVED_PROCESS;
      }
    }
    return offerName;
  }

  /**
   * @description Method for send event a AppsFlyers
   */
  creditCardOfferAppsFlyer() {
    this._sendAppsFlyerCreditCard('detalle_oferta_tdc', {});
  }

  /**
   * @description Method for send event a AppsFlyers
   */
  paymentSelectorAppsFlyer() {
    let value = {
      af_price: this.prevAmount,
      af_content_type: this.cardName,
      af_class: this.offerName
    };
    this._sendAppsFlyerCreditCard('tipo_pago_tdc', value);
  }

  /**
   * @description Method for send event a AppsFlyers
   */
  addressSelectorAppsFlyer() {
    let value = {
      af_price: this.prevAmount,
      af_content_type: this.cardName,
      af_class: this.offerName
    };
    this._sendAppsFlyerCreditCard('tipo_entrega_tdc', value);
  }

  /**
   * @description Method for send event a AppsFlyers
   */
  termsConditionsAppsFlyer() {
    let value = {
      af_price: this.prevAmount,
      af_content_type: this.cardName,
      af_class: this.offerName
    };
    this._sendAppsFlyerCreditCard('tyc_tdc', value);
  }

  /**
   * Event for AppsFlyer for Payroll Portability
   * @param {String} eventName
   * @param {Object} eventValue
   */
  _sendAppsFlyerCreditCard(eventName, eventValue) {
    this.dispatchEvent(new CustomEvent('apps-flyer-credit-card', {
      detail: {
        eventName,
        eventValue
      },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * @desc get alternate address flag
   */
  getAlternateAddressFlag() {
    if (this.get('alternateAddressCreditCardHolder', this.offerDataInfo || {})) {
      this.alternateAddressFlag = this.offerDataInfo.alternateAddressCreditCardHolder;
      this.dispatchEvent(new CustomEvent('send-alternate-address-flag', {
        detail: this.alternateAddressFlag,
        bubbles: true,
        composed: true
      }));
    }
  }

  /**
   * @desc Change the status of the flag modal to true
   */
  openModalOffer() {
    this.flagActiveModal = true;
  }

  /**
   * @desc Change the status of the flag modal to false
   */
  closeModalOffer() {
    this.flagActiveModal = false;
  }

  /**
 * @desc manage navigation when native button is pressed
 * @param {Object} navigation
 */
  manageBackButton(navigation) {
    let currentPage = ((((navigation || {}).value || {}).cancelledNavigation || {}).currentPage) || '';
    if (this.flagActiveModal) {
      this.set('flagActiveModal', false);
      this.dispatchEvent(new CustomEvent('close-modal-card-holder', {
        detail: false,
        bubbles: true,
        composed: true
      }));
    } else if (currentPage === this.namePage) {
      this.confirmDeparture();
    }
  }

  /**
   * @desc message yo show if user is able to update INE and RFC
   */
  _updateMessageBox(customerNationalityFlagRfc, customerNationalityFlagIne, userHasIne, userHasRfc) {
    const messageUpdateIneRfc = !userHasRfc && customerNationalityFlagRfc && !userHasIne && customerNationalityFlagIne;
    const messageUpdateRfc = !userHasRfc && customerNationalityFlagRfc;
    const messageUpdateIne = !userHasIne && customerNationalityFlagIne;
    return messageUpdateIneRfc ? 'credit-card-holder-offer-icon-message-data3' : messageUpdateRfc ? 'credit-card-holder-offer-icon-message-data2' : messageUpdateIne ? 'credit-card-holder-offer-icon-message-data1' : '';
  }

  /**
   * @desc get update INE and RFC flag
   */
  _getUpdateRfcIneFlag() {
    if (this.get('updateINECreditCardHolderOC', this.offerDataInfo || {})) {
      this.updateIneFlag = this.offerDataInfo.updateINECreditCardHolderOC;
    }
    if (this.get('updateRFCCreditCardHolderOC', this.offerDataInfo || {})) {
      this.updateRfcFlag = this.offerDataInfo.updateRFCCreditCardHolderOC;
    }
  }

  /**
   * @desc validate if customer is able to update RFC and INE
   */
  _validateCustomer() {
    if (!this.isNpa && (this.updateIneFlag || this.updateRfcFlag)) {
      this._validateCustomerNationality();
    }
  }

  /**
   * @desc validate if customer nationality is MEX
   */
  _validateCustomerNationality() {
    if (this.get('nationalities', this.globalCacheStorage.customer)) {
      const customerNationalities = this.get('globalCacheStorage.customer.nationalities');
      const nationality = customerNationalities.find(customerNationality => customerNationality.id === 'MEX');
      this.customerNationalityFlagRfc = this.updateRfcFlag &&  Boolean(nationality);
      this.customerNationalityFlagIne = this.customerIsMonoProducto &&  Boolean(nationality);
    }
  }

  /**
   * @desc get is monoproducto for INE flag
   */
  _getCustomerIsMonoProductoIne() {
    if (this.get('isMonoProducto', this.offerDataInfo) && this.updateIneFlag) {
      this.customerIsMonoProducto = this.offerDataInfo.isMonoProducto;
    }
  }

  /**
   * @desc show step to update RFC and use INE´s process
   */
  _updateIneRfc() {
    this._getCustomerDocuments();
    if (!this.userHasRfc && this.customerNationalityFlagRfc) {
      this._readDocRfc();
    } else {
      this._hideUserFormStep();
    }
    if (!this.userHasIne && this.customerNationalityFlagIne) {
      this._readDocIne();
    }
  }

  /**
   * @desc function to get customer documents
   */
  _getCustomerDocuments() {
    if (this.c(this.globalCacheStorage, 'customer')) {
      this.set('customerId', this.c(this.globalCacheStorage, 'customer.customerId'));
      this.set('identityDocuments', this.c(this.globalCacheStorage, 'customer.identityDocuments'));
    }
  }

  /**
   * @desc Dispatch an event for getCustomer request
   * @event 'get-customer-request'
   */
  _requestCustomer() {
    this._dispatchEvents('get-customer-request', this.customerId);
  }

  /**
   * handle get customer response
   * @param {*} data
   */
  handleGetCustomer(data) {
    let identityFromService = data.identityDocuments?.filter(doc => doc?.documentType);
    this.set('globalCacheStorage.customer.identityDocuments', identityFromService);
    this._updateIneRfc();
  }

  /**
   * @desc validate if user already has RFC if not show user-form step
   * request marital status
   */
  _readDocRfc() {
    this.userHasRfc = Boolean(this.identityDocuments.find(docType =>  docType.documentType.id === 'RFC' && docType.documentNumber.length === 13));
    if (!this.userHasRfc) {
      this._dispatchEvents('get-marital-status');
      const inputFieldsRfc = [
        {
          id: 'rfc',
          type: 'text',
          label: 'credit-card-holder-offer-user-form-label-rfc',
          maxLength: 12,
          required: true,
          allowedChars: '[a-zA-Z0-9]',
          allowedValue: '^[a-zA-Z0-9]{10}$',
          inputIconVisibility: 'focused-content',
          doFieldValidations: true,
          infoMessage: {
            type: 'info-dark',
            message: 'credit-card-holder-offer-user-form-message-rfc',
            icon: 'coronita:info',
            sizes: 16,
          },
          errorMessage: {
            message: 'credit-card-holder-offer-user-form-error-message-rfc',
            icon: 'coronita:alert',
            sizes: 16
          },
        },
        {
          id: 'homoclave',
          type: 'text',
          label: 'credit-card-holder-offer-user-form-label-homoclave',
          maxLength: 12,
          required: true,
          allowedChars: '[a-zA-Z0-9]',
          allowedValue: '^[a-zA-Z0-9]{3}$',
          doFieldValidations: true,
          infoMessage: {
            type: 'info-dark',
            message: 'credit-card-holder-offer-user-form-message-homoclave',
            icon: 'coronita:info',
            sizes: 16
          },
          errorMessage: {
            message: 'credit-card-holder-offer-user-form-error-message-homoclave',
            icon: 'coronita:alert',
            sizes: 16
          },
        },
        {
          id: 'maritalStatusDropdown',
          type: 'dropdown',
          label: 'credit-card-holder-offer-user-form-label-marital-status',
          readOnly: false,
          required: true,
        },
        {
          id: 'validateCheckBox',
          type: 'checkbox',
          classList: 'gap-bottom-l',
          label: 'credit-card-holder-offer-user-form-label-checkbox',
          value: false,
          required: true,
        },
        {
          id: 'contactsMessage',
          infoMessage: {
            message: 'credit-card-holder-offer-user-form-info-message',
            classList: 'icon-message margin-top-xxxxl',
            icon: 'coronita:info',
          }
        },
        {
          id: 'submitButton',
          type: 'button',
          classList: 'primary gap-bottom-l',
          label: 'credit-card-holder-offer-user-form-button',
          validate: true
        }
      ];
      this._dispatchEvents('set-customer-id', this.customerId);
      this._resetPropUserForm(inputFieldsRfc);
    } else {
      this._hideUserFormStep();
    }
  }

  /**
   * @desc hide user-form step
   */
  _hideUserFormStep() {
    this.set('userFormCollapsed', true);
    this._dispatchEvents('hide-user-form-step', true);
  }

  /**
   * @desc event for input fiels user-form step
   */
  _resetPropUserForm(data) {
    this._dispatchEvents('reset-modal-selector');
    this._dispatchEvents('set-cells-step-user-form-items', {
      formFields: data,
      extraDescriptionText: `${this.t('credit-card-holder-user-form-step-description-text-1')}<br>${this.t('credit-card-holder-user-form-step-description-text-2')}`
    });
  }

  /**
   * @desc validate if user already has INE or document  if not can update INE
   * request customer contacts
   */
  _readDocIne() {
    this.userHasIne = Boolean(this.identityDocuments.find(docType => (['INE', 'PASSPORT', 'MILITARY'].includes(this.c(docType, 'documentType.id'))) && docType.documentNumber));
    if (!this.userHasIne) {
      this._dispatchEvents('set-customer-id', this.customerId);
      this._dispatchEvents('get-customer-contacts');
    }
  }

  /**
   * @desc get user email for INE's process - customer contacts
   */
  getUserEmail(payload) {
    const email = payload.find(item => [ 'EMAIL' ].includes(this.c(item, 'contactType.id')));
    this.set('customerEmail', this.c(email, 'contact'));
  }

  /**
   * @desc get user email error - customer contacts
   */
  onCustomerContactsError() {
    this._showGenericError('customerContacts');
  }

  /**
   * @desc Handle the number of times the user can retry getting customer contacts
   */
  handleNumberOfCustomerContactsRequests() {
    this.attempsGetCustomerContacts++;
    this._dispatchEvents('get-customer-contacts');
  }

  /**
   * @desc open Edit ine route with params
   */
  _sendDataIne() {
    this._dispatchEvents('glomo-profile-manager-routes-go-ine', {
      customerId: this.customerId,
      email: this.customerEmail,
      flagIneTdc: true,
    });
  }

  /**
   * @desc set variable when user updates INE from profilePage or creditCardHolderPage
   */
  collapsedStepIne() {
    this.set('userHasIne', true);
  }

  /**
   * @desc set value from marital status selected
   */
  setMaritalStatusDropdownSelection(e) {
    const dropdownData = {
      id: 'maritalStatusDropdown',
      value: this.get('name', e)
    };
    this._fireSetValueUserDataFormValue(dropdownData);
  }

  /**
   * @desc send value selected
   */
  _fireSetValueUserDataFormValue(data) {
    this._dispatchEvents('set-step-user-data-form-value', data);
  }

  /**
   * Calls the service modifyCustomer
   */
  patchModifyCustomerRequest(payload) {
    if (this.c(payload, 'fullRfc')) {
      this.set('userFormCollapsed', true);
      return;
    } else {
      const {rfc, homoclave, maritalStatusDropdown} = payload;
      const fullRfc = rfc + homoclave;
      const maritalStatusSelected = this.civilStatusValues.find(value => [ maritalStatusDropdown ].includes(this.c(value, 'name')));
      this.set('dataUserForm.fullRfc', fullRfc);
      this.set('dataUserForm.idMaritalStatus', this.c(maritalStatusSelected, 'name'));
      const data = {
        maritalStatus: {
          id: this.c(maritalStatusSelected, 'id')
        },
        identityDocuments: [
          {
            documentNumber: fullRfc,
            documentType: {
              id: 'RFC',
            },
          },
        ],
      };
      this._dispatchEvents('request-customer-patch', data);
    }
  }

  /**
   * modifyCustomer success, events to show successful view
   */
  onPatchModifyCustomerSuccess() {
    this.set('userHasRfc', true);
    const fields = [
      {
        id: 'fullRfc',
        type: 'text',
        classList: 'gap-bottom-l',
        label: 'credit-card-holder-offer-user-form-label-full-rfc',
        value: this.c(this.dataUserForm, 'fullRfc'),
        hidden: false,
        readOnly: true
      },
      {
        id: 'maritalStatus',
        type: 'text',
        classList: 'gap-bottom-l',
        label: 'credit-card-holder-offer-user-form-label-marital-status',
        value: this.c(this.dataUserForm, 'idMaritalStatus'),
        hidden: false,
        readOnly: true
      },
      {
        id: 'continueButton',
        type: 'button',
        classList: 'primary gap-bottom-l',
        label: 'credit-card-holder-offer-user-form-continue-button',
        validate: true
      }];
    this._dispatchEvents('patch-customer-response-success', {
      descriptionText: '',
      extraDescriptionText: '',
      descriptionInfoMessage: {
        message: 'credit-card-holder-offer-user-form-success-rfc-message',
        type: 'success-dark',
        classList: 'description-info-message gap-bottom-l',
        icon: 'coronita:correct'
      },
      formFields: fields
    });
  }

  /**
   * @desc get marital status success
   */
  onMaritalStatusSuccess(data) {
    const maritalArray = [];
    for (let idM = 0; idM < data.length; idM++) {
      const obj = this.c(data, `${idM}`);
      const maritalId = this.c(data, `${idM}.id`);
      const maritalValue = this._getObjectDesciption(obj);
      maritalArray.push({ value: maritalValue, id: maritalId });
    }
    this.civilStatusValues = this._getCivilStatusValues(maritalArray);
    const statusSave = this.civilStatusValues;
    this._dispatchEvents('set-items-selector', statusSave);
  }

  _getCivilStatusValues(maritalArray) {
    const maritalIds = [
      { id: 'B', value: 'MARRIED_WITH_SEPARATED_PROPERTY' },
      { id: 'C', value: 'MARRIED_WITHOUT_SEPARATED_PROPERTY' },
      { id: 'D', value: 'DIVORCED' },
      { id: 'S', value: 'SINGLE' },
      { id: 'U', value: 'COHABITANT' },
      { id: 'V', value: 'WIDOWED' },
      { id: 'X', value: 'SEPARATED' },
    ];
    return maritalArray.map(item => ({
      id: maritalIds.find(marital => this.c(item, 'id') === this.c(marital, 'id')).value,
      name: this.c(item, 'value')
    }));
  }

  /**
  * Returns the object description for SPA language
  * @param {Object} object
  * @returns
  */
  _getObjectDesciption(object) {
    return object.descriptions.find(description => [ 'SPA' ].includes(this.c(description, 'language'))).value;
  }

  /**
   * @desc get marital status error
   */
  onMaritalStatusError() {
    this._showGenericError('maritalStatus');
  }

  /**
   * @desc Handle the number of times the user can retry getting marital status
   */
  handleNumberOfMaritalStatusRequests() {
    this.attempsGetMaritalStatus++;
    this._dispatchEvents('get-marital-status');
  }

  /**
   * @desc modifyCustomer error
   */
  onPatchModifyCustomerError() {
    this.attempsUpdateRfc++;
    if (this.attempsUpdateRfc >= this.maxAttempsUpdateRfc) {
      this._errorExit();
    } else {
      this._errorRetry();
    }
  }

  /**
   * @desc error after three attempts
   */
  _errorExit() {
    const errorExit = {
      className: 'full-height-error common-error-modal header--white',
      hideCloseIcon: false,
      openMaximized: true,
      heroImage: this.heroImage,
      header: this.cardName,
      acceptBtLabel: 'credit-card-holder-error-generic-secondary-button-maximum-requests',
      cancelBtLabel: '',
      template: {
        type: 'paragraphs',
        values: [
          { title: 'credit-card-holder-offer-update-rfc-error-title-maximum-requests', class: 'simple-title' },
          { text: 'credit-card-holder-offer-update-rfc-error-text-maximum-requests'}
        ]
      }
    };
    const retryErrorData = {
      errorId: 'EXIT',
      errorType: 'operative',
      retryConfig: errorExit,
    };
    this._dispatchEvents('retry-error', Object.assign({ retryErrorData }));
  }

  /**
   * @desc error before three attempts
   */
  _errorRetry() {
    const settings = {
      code: 'modify-customer-error-exit',
      selectedConfig: {
        className: 'full-height-error header--white',
        hideCloseIcon: false,
        openMaximized: true,
        title: this.cardName,
        heroImage: this.heroImage,
        acceptBtLabel: 'credit-card-holder-offer-update-rfc-error-retry',
        cancelBtLabel: 'credit-card-holder-error-generic-secondary-button-maximum-requests',
        template: {
          type: 'paragraphs',
          values: [
            { title: 'credit-card-holder-offer-update-rfc-error-title', class: 'simple-title' },
            { text: 'credit-card-holder-offer-update-rfc-error-text'}
          ]
        }
      }
    };
    this._dispatchEvents('patch-modify-customer-error', settings);
  }

  forceExitPage() {
    this._dispatchEvents('exit-operative');
  }

  /**
   *  Method for dispatch diferents events
   * @param {String} eventName
   * @param {Object} detail
   */
  _dispatchEvents(eventName, detail = {}) {
    this.dispatchEvent(new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      detail: detail
    }));
  }

}

window.customElements.define(CreditCardHolderOffer.is, CreditCardHolderOffer);
