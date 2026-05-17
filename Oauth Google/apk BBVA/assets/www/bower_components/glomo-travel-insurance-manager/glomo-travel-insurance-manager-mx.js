/*eslint new-cap: [2, {'capIsNewExceptions': [
  'GlomoDiyModalMixin',
  'AmountBehavior',
  'CellsFinancialOverviewBehavior',
  'WithPdfViewerBehavior']}]*/
/* global moment */
class GlomoTravelInsuranceManagerMx extends Polymer.mixinBehaviors([CellsBehaviors.i18nBehavior, CellsBehaviors.CellsCheckNestedKeysBehavior],
  CellsBehaviors.AmountBehavior(
    CellsBehaviors.GlomoDiyModalMixin(
      CellsBehaviors.CellsFinancialOverviewBehavior(
        CellsBehaviors.WithPdfViewerBehavior(Polymer.Element))))) {

  static get is() {
    return 'glomo-travel-insurance-manager-mx';
  }

  static get properties() {
    return {
      /**
       * @desc short descriptions for coverages
       * @type {Object}
       */
      descriptionsOfCoverages: {
        type: Object
      },
      /**
       * @desc global server config retrieved from native
       * @type {Object}
       */
      globalServerConfig: {
        type: Object
      },
      /**
       * @desc Chosen domain to make requests.
       * @type {String}
       */
      host: {
        type: String,
        value: ''
      },
      /**
       * headers for api
       * @type {Object}
       */
      headers: {
        type: Object,
        value: () => ({})
      },
      /**
       * @desc API version for /insurances-products
       * @type {String}
       */
      travelInsurancesProductsVersion: {
        type: String,
        value: '0'
      },
      /**
       * @desc requiredToken, 'jwt' or 'tsec' or empty
       * @type {String}
       */
      requiredToken: String,
      /**
       * @desc Native requests
       * @type {Boolean}
       */
      native: {
        type: Boolean,
        value: false
      },
      /** @desc tsec for pdf request @type {Object} */
      tsec: {
        type: Object,
        value: () => ({}),
        notify: true
      },
      /** @desc device id for pdf request @type {Object} */
      deviceId: {
        type: Object,
        value: () => ({}),
        notify: true
      },
      /** @desc Accepts base64 string or pdf url @type {string} */
      baseSrc: {
        type: String,
        notify: true
      },
      /**
       * @desc cards to be displayed
       * @type {Object}
       */
      products: {
        type: Object,
        notify: true
      },
      /**
       * @desc  API version for /customers/v0/customers/{customer-id}/addresses
       * @type {String}
       */
      customerVersion: {
        type: String,
        value: '0'
      },
      /**
       * @desc Selected travelers.
       * @type {Object}
       */
      numberOfTravelersSelected: {
        type: Object,
        resettable: true,
        observer: '__numberOfTravelersSelectedChanged'
      },
      /**
       * Name referring to otpid
       * @type {String}
       */
      otpId: {
        type: String,
        value: 'travelInsurancePage'
      },
      /**
       * @desc Data to fill the component cells-summary-view
       * @type {Object}
       */
      offerStickyData: {
        type: Object,
        resettable: true,
        value: () => ({
          id: 'travel-insurance-offer-page-sticky',
          isSummaryView: true,
          summaryClass: 'one-skeleton-row nomargin pb-16',
          summarySkeletonRows: 2,
          summaryViewTitle: 'travel-insurance-summary-view-title',
          hideCustomFeesMessage: false,
          hidePrimaryButton: true,
          operationAmountClass: 'amount-huge-decimals',
          buttonLabel: 'cells-step-card-offer-page-want-button-text',
          iconMessage: null
        })
      },
      /**
       * @desc Body for simulation request
       * @type {Object}
       */
      simulationBody: {
        type: Object,
        observer: '_simulationBodyChanged'
      },
      /**
       * @desc Data to fill the component cells-st-button
       * @type {Object}
       */
      offerButtonData: {
        type: Object,
        resettable: true,
        value: () => ({
          id: 'i-want-it-button',
          dataSelect: 'ti-offer-continue-button',
          button: {
            text: 'travel-insurance-manager-offer-page-button',
            class: 'tertiary tertiary-offer-page-color'
          },
          forceVisibility: true,
          disabled: true,
          event: 'continue-pressed',
        })
      },
      /**
       * @desc Config for offer page
       * @type {Object}
       */
      offerPageConfigState: {
        type: Object,
        notify: true,
        resettable: true
      },
      /**
      * @desc Price to Hire
      * @type {Object}
      */
      priceToHire: {
        type: Object,
        value: () => ({}),
        resettable: true
      },
      /**
      * @desc Saved Price to Hire
      * @type {Object}
      */
      savedPriceToHire: {
        type: Object,
        value: () => ({}),
        resettable: true
      },
      /**
       * @desc Check if customer has payment method.
       * @type {Boolean}
       */
      hasPaymentMethod: {
        type: Boolean,
        computed: '__computedHasPaymentMethod(priceToHire)'
      },
      /**
       * @desc customer info
       * @type {Object}
       */
      customer: {
        type: Object,
        value: []
      },
      /**
       * @desc Travelers to be insured
       * @type {Array}
       */
      travelers: {
        type: Array,
        resettable: true,
        value: () => []
      },
      /**
       * @desc Response from get.travelInsurancesProducts
       * @type {Object}
       */
      travelInsurancesProducts: {
        type: Object
      },
      /**
       * @desc Title of product
       * @type {String}
       */
      travelInsuranceTitleHeader: {
        type: String,
        notify: true,
        computed: '__getTravelInsuranceTitleHeader(travelInsurancesProducts)'
      },
      /**
       * @desc Result to parse Response POST /insurances/v1/insurances
       * @type {Object}
       */
      travelInsuranceReceipt: {
        type: Object,
        notify: true
      },
      /**
       * @desc List all Insurance Coverages
       * @type {Object}
       */
      allInsuranceCoverages: {
        type: Object,
        notify: true,
        computed: '__formatAllInsuranceCoverages(travelInsurancesProducts)'
      },
      /**
       * @desc Coverages of travel
       * @type {Array}
       */
      travelInsuranceCoverages: {
        type: Array,
        computed: '__formatTravelInsuranceCoverages(travelInsurancesProducts)'
      },
      /**
       * @desc src for coverages microilustrations
       * @type Array
       */
      srcCoverages: {
        type: Array,
        value: [
          './images/travelInsurance/gastos-medicos.svg',
          './images/travelInsurance/interrupcion-viaje.svg',
          './images/travelInsurance/gastos-funerarios.svg'
        ]
      },
      /**
       * @desc Number of main coverages
       * @type Number
       */
      coveragesToShowInOffer: {
        type: Number,
        value: 3
      },
      /**
       * @desc User account selected
       * @type {Object}
       */
      accountSelected: {
        type: Object,
        observer: '_accountSelectedChanged',
        resettable: true
      },
      /**
       * @desc Response of travel-insurances/v1/quotations
       * @type {Object}
       */
      quotationsResponse: {
        type: Object,
        resettable: true
      },
      /**
       * @desc Response saved of travel-insurances/v1/quotations after press the continue button
       * @type {Object}
       */
      savedQuotationsResponse: {
        type: Object,
        value: [],
        resettable: true
      },
      /**
       * @desc global cache Storage
       * @type {Object}
       */
      globalCacheStorage: {
        type: Object
      },
      /**
       * @desc global user data
       * @type {Object}
       */
      globalUser: {
        type: Object
      },
      /**
       * @desc Detail user address
       * @type {Object}
       */
      detailUserAddress: {
        type: Object,
      },
      /**
        * @desc phone number
        * @type {String}
        */
      phoneNumberTravelInsurance: String,
      /**
        * @desc insurance products id
        * @type {Object}
        */
      insuranceProductsId: {
        type: Object,
        value: { 'product.id': '4035', 'plans.id': '006' }
      },
      /**
        * @desc Valid there are cached data
        * @type {Object}
        */
      dataSaved: {
        type: Boolean,
        value: false
      },
      /**
      * @desc Biggest amount of money in your accounts
      * @type {Number}
      */
      biggestAmount: {
        type: Number
      },
      /**
       * @desc Number of maximum attempts to resolve the quotations call
       * @type {Number}
       */
      maxRetries: {
        type: Number,
        value: 3,
        resettable: true
      },
      /**
       * @desc customer is Traveler validation
       * @type {Boolean}
       */
      customerIsTraveler: {
        type: Boolean,
        value: false
      },
      /**
       * @desc Catalog for modal items
       * @type {Object}
       */
      modalConfigItems: {
        type: Object
      },
      /**
       * @desc User email
       * @type {String}
       */
      userEmail: {
        type: String
      },
      /**
       *
       * @type {String}
      */
      insurancesVersion: {
        type: String,
        value: '1'
      },
      /**
       * @desc native global accounts channel
       * @type {Array}
       **/
      globalAccounts: {
        type: Array
      },
      /**
       * @desc native global accounts parsed
       * @type {Array}
       **/
      globalAccountsParsed: {
        type: Array,
        computed: '_parseGlobalAccounts(globalAccounts)'
      },
      /**
       * @desc native global cards channel
       * @type {Array}
       **/
      globalCards: {
        type: Array
      },
      /**
       * @desc native global cards parsed
       * @type {Array}
       **/
      globalCardsParsed: {
        type: Array,
        computed: '_parseGlobalCards(globalCards)'
      },
      /**
       * @desc Document identificator
       * @type {String}
       **/
      pdfDocTitle: {
        type: String,
      },
      /**
      * @desc Offer identificator
      * @type {String}
      */
      offerId: {
        type: String
      },
      /**
      * @desc global campaigns
      * @type {Array}
      */
      globalCampaigns: {
        type: Array
      },
      /**
      * @desc Boolean for know if is native iOS
      * @type {Array}
      */
      isNativeIos: {
        type: Boolean,
        value: false
      },
      /**
      * @desc global campaigns parsed
      * @type {Array}
      */
      globalCampaignsParsed: {
        type: Array,
        computed: '_parseGlobalCampaigns(globalCampaigns)'
      },
      /**
      * @desc product name insurance identificator
      * @type {String}
      */
      productNameInsurance: {
        type: String
      },
      /**
      * @desc coupon code insurance
      * @type {String}
      */
      couponCode: {
        type: String
      },
      /**
      * @desc Receipt icon url
      * @type {String}
      */
      receiptIcon: {
        type: String,
        value: './images/clarifications/clip.svg'
      }
    };
  }

  static get observers() {
    return [
      '__buildingOfferPageConfig(travelInsurancesProducts.*, travelInsuranceCoveragesOfferConfig.*, travelInsurancesTravelElderConfig.* ,numberOfTravelersSelected.*)',
    ];
  }

  /**
   * @desc Initializes manager functionalities
   * @param {Object}
   * @event 'user-selector-buttons-config'
   * @event 'handle-mail-contract-step'
   * @return {Object}
   */
  init() {
    this._dispatch('page-loaded');
    this.getInsurancesProducts();
    this._getAddresses();
    this._getEmail();
    this._checkListContractProperties();
    let parsedAccounts = this.c(this.globalCacheStorage, 'dashboard.accounts') || this.globalAccountsParsed;
    this._getAccounts(parsedAccounts);
    let parsedCards = this.c(this.globalCacheStorage, 'dashboard.cards') || this.globalCardsParsed;
    this._getCards(parsedCards);
    let campaigns = this.globalCacheStorage ? this.globalCampaigns : this.globalCampaignsParsed;
    this._parseOfferId(campaigns);
    this._getBiggestAmount(this.products);
    this.updateOfferState();
    this._dispatch('handle-mail-contract-step', '');
  }
  /**
   * @desc Set coverages description
   * @event 'coverages-description'
  */
  setInsuranceCoveragesDescription() {
    this._dispatch('coverages-description', [ {
      subtitle: 'Puedes consultar más información sobre las coberturas y las exclusiones en las Condiciones generales del seguro.',
    } ]);
  }
  /**
   * @private Do Get request to /customers/v1
   */
  _getAddresses() {
    let customerId = this.globalCacheStorage ? this.get('customer.customerId', this.globalCacheStorage) : this.get('customerId', this.globalUser);
    this.customerId = customerId;
    this.$['global-apis-customers'].getCustomerAddresses();
  }
  /**
   * @private Do Get request to /customers/v1
   */
  _getEmail() {
    this.$['global-apis-customers'].getCustomerDetail();
  }
  /**
   * Handle disabled date input
   * @event 'to-enable-calendar-form-user-list'
   */
  handleDisableDateInput() {
    this._dispatch('to-enable-calendar-form-user-list', { disabledDateInput: true });
    setTimeout(() => {
      this._dispatch('to-enable-calendar-form-user-list', { disabledDateInput: false });
    }, 1500);
  }
  /**
   * @desc Handler request error /customer/v0
   * @event 'open-diy-info-modal'
   */
  functionRequestError() {
    this.closeSpinner();
    this.showInfoModal({ id: 'glomo-travel-insurance-functional-error' });
  }

  /**
   * @private Initializes manager functionalities
   * @param {Object} address
   * @event 'user-selector-buttons-config'
   * @return {Object}
   */
  _setAddress(address) {
    this.set('detailUserAddress', `•${this.get('detail.0.location.state.id', address)}${','} ${this.get('detail.0.location.country.name', address)}`);
    this.updateOfferState();
  }

  /**
   * @private Initializes manager functionalities
   * @param {Object} userDetail
   */
  _setEmail(userDetail) {
    let formattedEmail = `•${((userDetail.detail.contactDetails[1].contact || '').replaceAll('*', ''))}`;
    this.set('userEmail', formattedEmail.toLowerCase());
    let customerDetail = this.globalCacheStorage ? this.get('customer', this.globalCacheStorage) : this.globalUser;
    this._getCustomerDetail(customerDetail);
    this.closeSpinner();
  }

  /**
   * @private Get customer detail
   * @param {Object} detail
   */
  _getCustomerDetail(detail) {
    Object.assign(this.customer, {
      firstName: detail.firstName + (detail.middleName ? ` ${detail.middleName} ` : ''),
      lastName: detail.lastName,
      secondLastName: detail.secondLastName,
      birthData: detail.birthData,
      gender: detail.gender,
      email: this.userEmail
    });
    this._parseUserSelectorButtons(this.customer);
  }

  /**
   * @private Parse Global Accounts
   * @desc Parse accounts from global
   * @type {Array}
   * @param {Object} globalAccounts
   */
  _parseGlobalAccounts(globalAccounts) {
    let parsedAccounts = [];
    globalAccounts[0]?.products.forEach(account => {
      const accountOrder = {
        alias: account.name,
        accountId: account.id,
        number: account.description.value,
        availableBalance: {
          currentBalances: [ {
            amount: account.primaryAmount.amount,
            currency: account.primaryAmount.currency
          } ]
        },
        level: account.level
      };
      parsedAccounts.push(accountOrder);
    }, {});
    return parsedAccounts;
  }
  /**
   * @private Parse Global Cards
   * @desc Parse cards from global
   * @type {Array}
   * @param {Object} globalCards
   */
  _parseGlobalCards(globalCards) {
    let parsedCards = [];
    globalCards[0]?.products.forEach(card => {
      const cardOrder = {
        activations: [
          {
            activationId: card.detail.activations.id,
            endDate: card.detail.expirationDate,
            isActive: card.detail.activations.isActive,
            name: card.detail.activations.name,
            startDate: ''
          }
        ],
        alias: card.name,
        availableBalance: {
          currentBalances: [
            {
              amount: this.get('detail.specificAmounts.2.amounts.0.amount', card),
              currency: this.get('detail.specificAmounts.2.amounts.0.currency', card)
            }
          ]
        },
        cardId: card.id,
        cardType: card.originalProduct.cardType,
        disposedBalance: {
          currentBalances: [
            {
              amount: card.detail.specificAmounts[0].amounts.amount,
              currency: card.detail.specificAmounts[0].amounts.currency
            }
          ]
        },
        expirationDate: card.detail.expirationDate,
        images: card.detail.images,
        indicators: card.detail.indicators,
        isDetailLoaded: false,
        isMoreInfoLoaded: false,
        number: card.originalProduct.number,
        physicalSupport: card.detail.physicalSupport,
        relatedContracts: [
          {
            bank: {
              hasBankId: false
            },
            contractId: card.originalProduct.relatedContracts.id,
            contractType: {},
            number: card.originalProduct.relatedContracts.contractId,
            numberType: {}
          }
        ],
        rewards: card.detail.rewards,
        status: card.originalProduct.status,
        title: card.product
      };
      parsedCards.push(cardOrder);
    }, {});
    return parsedCards;
  }
  /**
   * @desc Get Accounts from local Storage
   * @param {Object} accounts
   */
  _getAccounts(accounts) {
    let textMessage = false;
    let disabledAccount = false;
    let mappedAccounts = (accounts && accounts.length) ? accounts
      .filter(complete => (complete.alias || complete.title) && complete.accountId && complete.number && complete.availableBalance && this.c(complete, 'availableBalance.currentBalances.0.currency', '') === this.localCurrency)
      .map(item => {
        if (this.priceToHire && this.priceToHire.amount > this.c(item, 'availableBalance.currentBalances.0.amount', '')) {
          textMessage = true;
          disabledAccount = true;
        } else {
          textMessage = false;
          disabledAccount = false;
        }
        return {
          id: this.c(item, 'number', ''),
          name: item.alias ? item.alias : this.c(item, 'title.name', ''),
          description: { value: this.c(item, 'number', ''), masked: true },
          primaryAmount: {
            amount: this.c(item, 'availableBalance.currentBalances.0.amount', ''),
            currency: this.c(item, 'availableBalance.currentBalances.0.currency', ''),
            label: 'account-label-available_current_balances'
          },
          primaryAmountClass: 'amount-large',
          hasTextMessage: textMessage,
          disabled: disabledAccount,
          image: item.image,
          productType: 'ACCOUNT'
        };

      }) : [];
    this.set('products', mappedAccounts);
  }

  /**
   * @desc Get Accounts from local Storage
   * @param {Object} cards
   */
  _getCards(cards) {
    let textMessage = false;
    let disabledCards = false;
    const mappedCards = (cards && cards.length) ? cards
      .filter(complete => (complete.alias || complete.title) && complete.cardId && complete.number && complete.availableBalance && this.c(complete, 'cardType.id', '') !== 'DEBIT_CARD' && this.c(complete, 'physicalSupport.name', '') !== 'DIGITAL' && this.c(complete, 'status.id', '') !== 'INOPERATIVE')
      .map(item => {
        if (this.priceToHire && this.priceToHire.amount > this.c(item, 'availableBalance.currentBalances.0.amount', '')) {
          textMessage = true;
          disabledCards = true;
        } else {
          textMessage = false;
          disabledCards = false;
        }
        return {
          id: item.number,
          name: item.title.name,
          description: { value: item.number, masked: true },
          primaryAmount: {
            amount: this.c(item, 'availableBalance.currentBalances.0.amount', ''),
            currency: this.c(item, 'availableBalance.currentBalances.0.currency', ''),
            label: 'account-label-available_current_balances'
          },
          primaryAmountClass: 'amount-large',
          hasTextMessage: textMessage,
          disabled: disabledCards,
          imgSrc: this.c(item, 'images.0.url', ''),
          productType: 'CARDS',
          keyErrorMessage: 'device-insurance-cells-step-product-selector-error-message',
          nameTopToImage: true,
          nameRightToImage: false,
          class: 'product-spacing'
        };
      }) : [];
    let accountsAndCards = this.products.concat(mappedCards);
    this.products = accountsAndCards;

  }

  /**
   * @desc Get biggest amount from accounts
   * @param {Object} costumerAccounts
   */
  _getBiggestAmount(costumerAccounts) {
    let amounts = costumerAccounts
      .map(item => {
        let listAmount = {};
        listAmount = item.primaryAmount.amount;
        return listAmount;
      });
    this.set('biggestAmount', Math.max.apply(null, amounts));
  }

  /**
   * @desc Computed the coverages in travelInsuranceProducts
   * @param {*} travelInsurancesProducts
   * @returns {Array}
   */
  __formatAllInsuranceCoverages(travelInsurancesProducts) {
    const plansRaw = this.get('plans', travelInsurancesProducts);
    const rawCoverages = this.get('coverages', [ ...plansRaw ][0]);
    return rawCoverages.map(this.__generateCoverage.bind(this));
  }

  /**
   * @desc Generate object with a coverage config
   * @param {Object} rawCoverage
   * @returns {Object}
   */
  __generateCoverage(rawCoverage) {
    let id = this.get('id', rawCoverage);
    let rawAmount = this.get('amount.1.amount', rawCoverage);
    let isCoverage = this.get('amount.1.amount', rawCoverage) > 0 ? true : false;
    return isCoverage ? (
      {
        name: this.get('name', rawCoverage),
        notBoxShadow: true,
        key: 'travel-insurance-offer-preposition-coverage',
        description: this.get('description', rawCoverage),
        subtitle: this.get('subtitle', rawCoverage),
        amount: {
          amount: Number(rawAmount.toFixed(2)),
          currencyCode: '$',
          isMajor: this.get('amount.1.isMajor', rawCoverage),
          class: 'currency-xxxxl'
        }
      }) : ({
      name: this.get('name', rawCoverage),
      notBoxShadow: true,
      description: this.get('description', rawCoverage),
    }
    );
  }

  /**
   * @desc Gives structure to coverage
   * @param {Object} products
   * @return {Object}
   */
  __formatTravelInsuranceCoverages(products) {
    return this.get('plans.0.coverages', products).slice(0, this.coveragesToShowInOffer).map((el, i) => {
      const data = Object.assign({}, el);
      let rawAmount = data.amount[1].amount;
      data.key = 'travel-insurance-offer-preposition-coverage';
      data.amount = {
        amount: Number(rawAmount.toFixed(2)),
        currencyCode: '$',
        localCurrency: data.amount[1].currency,
        isMajor: data.amount[1].isMajor,
        language: this.language,
        class: 'currency-xxxxl'
      };
      data.image = this.srcCoverages[i];
      return data;
    });
  }

  /**
   * @desc Get title header of travelInsurancesProducts.
   * @param {String} travelInsurancesProducts
   * @returns {String}
   */
  __getTravelInsuranceTitleHeader(travelInsurancesProducts) {
    return this.get('plans.0.name', travelInsurancesProducts);
  }

  /**
   * @desc Force rebuild for offer config
   */
  updateOfferState() {
    this.__buildingOfferPageConfig();
  }

  /**
   * @desc Do Get request to /travel-insurance-products/
   */
  getInsurancesProducts() {
    this.openSpinner();
    this.$['global-apis-travel-insurances-products'].getInsurancesProducts(this.insuranceProductsId);
  }

  /**
   * @desc Dispatch event to open spinner
   * @event open-control-veil
   */
  openSpinner() {
    this._dispatch('open-control-veil');
  }

  /**
   * @desc Dispatch event to close spinner
   * @event close-control-veil
   */
  closeSpinner() {
    this._dispatch('close-control-veil', true);
  }

  /**
   * @desc Dispatch event to set check list contract properties
   * @event 'set-properties'
   */
  _checkListContractProperties() {
    this._dispatch('reset-steps-after-user-selector', 3);
    this._dispatch('handle-mail-contract-step', '');
    this._dispatch('set-properties', {
      checkboxList: [
        { valid: false, active: true, buttonText: 'travel-insurance-terms-checkbox-list-terms-and-conditions' },
        { valid: false, active: true, buttonText: 'travel-insurance-list-terms-and-conditions-grant-consent' },
        {
          valid: false, active: true,
          buttonText: `${this.t('travel-insurance-accept-terms-part-1')} ${this.__getDollarAmount()} ${this.t('travel-insurance-accept-terms-part-2')} ${this.__getEquivalentAmount()}
                       ${this.t('travel-insurance-accept-terms-part-3')} ${this.accountSelected ? `${String(this.accountSelected.name)} •${String(this.accountSelected.id).slice(-5)}` : ''}`
        },
        {
          valid: false, active: true, buttonText: `${this.t('travel-insurance-accept-terms-email-part')} ${this.userEmail}`
        }
      ],
      inlineEmail: false
    });
  }
  /**
   * @desc mail to step contract delivery handler
   * @param {Object} detail
   * @event 'handle-mail-contract-step'
   */
  handleMailContract(detail) {
    this._dispatch('handle-mail-contract-step', Object.keys(detail).length ? '' : this.userEmail);
  }
  /**
   * @desc Validates if the new number selected is less than the current travelers to reset the steps
   * @event 'reset-steps-after-user-selector'
   */
  validatedNumberTravelers() {
    if (this.travelers.length && (this.get('selectedValue', this.numberOfTravelersSelected) < this.travelers.length)) {
      this._dispatch('reset-steps-after-user-selector', 2);
      let parsedAccounts = this.c(this.globalCacheStorage, 'dashboard.accounts') || this.globalAccountsParsed;
      this._getAccounts(parsedAccounts);
      let parsedCards = this.c(this.globalCacheStorage, 'dashboard.cards') || this.globalCardsParsed;
      this._getCards(parsedCards);
      this.resetTravelers();
    }
  }
  /**
   * @desc formats the dollar amount
   * @returns {Object}
   */
  __getDollarAmount() {
    let amount = this.offerPageConfigState ? this.get('sticky.0.operation.amount.amount', this.offerPageConfigState) : 0;
    this._dispatch('build-amount-to-accept-insurance-mx', amount);
    let currency = this.offerPageConfigState ? this.get('sticky.0.operation.amount.currency', this.offerPageConfigState) : 'USD ';
    return this.getFormattedAmount(amount, currency, this.localCurrency, this.language, true, true, true);
  }

  /**
   * @desc formats the dollar equivalent amount
   * @returns {Object}
   */
  __getEquivalentAmount() {
    let amount = this.offerPageConfigState ? this.get('sticky.0.operation.fees.0.feeAmount.amount', this.offerPageConfigState) : 0;
    /* this._dispatch('build-amount-to-accept-insurance-mx', amount); */
    let currency = this.offerPageConfigState ? this.get('sticky.0.operation.fees.0.feeAmount.currency', this.offerPageConfigState) : 'MXN ';
    return this.getFormattedAmount(amount, currency, this.localCurrency, this.language, true, true, true);
  }

  /**
   * @desc Prepare data for sending to the offer component
   * @param {Object} travelInsurancesProducts
   * @param {Object} travelInsuranceCoveragesOfferConfig
   * @param {Object} numberOfTravelersSelected
   * @returns {Object}
   */
  __buildingOfferPageConfig() {
    this.set('offerPageConfigState', {
      header: [
        {
          dataSelect: 'ti-offer-header',
          headerImageSrc: 'images/travelInsurance/travel-insurance.svg',
          productSummaryText: 'travel-insurance-manager-header-product-summary',
          class: 'core-blue spacing-md-bottom',
        }
      ],
      main: [
        { // SIMULACIÓN
          dataSelect: 'ti-offer-sub-header',
          subheader: this.t('travel-insurance-manager-simulation-title'),
          description: this.t('travel-insurance-manager-simulation-description'),
          className: 'heading-black font-s spacing-md-bottom',
          classSubHeader: 'medium'
        },
        { //DESTINO
          dataSelect: 'ti-offer-destination',
          subheader: this.t('travel-insurance-manager-simulation-destination'),
          radioType: 'cells-radio-button',
          class: 'vertical-align',
          simulationId: 'radio-button-destination-selected',
          className: 'custom-radio-group spacing-zero-top spacing-lg-bottom icon-left',
          hideContinueBtn: true,
          selectedValue: null,
          selected: this.get('main.1.selected', this.offerPageConfigState),
          iconSubheader: {
            id: 'glomo-travel-insurance-data-help-info-date-travel',
            value: 'coronita:help',
            dataTooltip: 'dateFilter',
            class: 'info-icon icon-size-24 spacing-xsm-left',
            event: 'open-modal-info-destination-travel'
          },
          options: [
            {
              id: 'traveler-destination-national',
              radioType: 'cells-radio-button',
              text: this.t('travel-insurance-manager-simulation-destination-national'),
              value: '001'
            },
            {
              id: 'traveler-destination-international',
              radioType: 'cells-radio-button',
              text: this.t('travel-insurance-manager-simulation-destination-international'),
              value: '002',
              class: 'no-padding spacing-zero-bottom',
              radioInfo: {
                class: 'align-right not-margin-top not-margin-bottom',
                iconMessageClass: 'help no-padding medium-dark',
                type: 'info-light-blue',
                iconType: 'coronita:info',
                message: this.t('travel-insurance-manager-simulation-destination-international-info'),
                hasMultipleData: true,
                showChangeData: true
              }
            }
          ]
        },
        { //FECHA DEL VIAJE
          dataSelect: 'ti-offer-calendar-header',
          subheader: this.t('travel-insurance-manager-simulation-calendar-subheader'),
          description: this.t('travel-insurance-manager-simulation-calendar-description'),
          className: 'font-s spacing-sm-bottom spacing-md-top',
          classDescription: 'font-s spacing-zero-bottom spacing-zero-top'
        },
        {// CALENDARIO
          dataSelect: 'ti-offer-calendar',
          isDateFilter: true,
          simulationId: 'glomo-my-trips-date-selector',
          startText: 'glomo-my-trips-date-selector-start-date',
          endText: 'glomo-my-trips-date-selector-end-date',
          format: 'DD/MM/YYYY',
          startTitleText: 'glomo-my-trips-date-selector-select-start-date',
          endTitleText: 'glomo-my-trips-date-selector-select-end-date',
          denyPastDates: true,
          allowLaterDates: true,
          /* eslint-disable-next-line */
          defaultMaxDay: moment().add(30, 'days').format('YYYY-MM-DD'),
          defaultMinDay: this.get('main.3.startDate', this.offerPageConfigState),
          /* eslint-disable-next-line */
          defaultStartDate: moment().add(1, 'days').format('YYYY-MM-DD'),
          limitStartDate: 29,
          limitEndDate: 89,
          hideDates: true,
          numberDaysRequired: 1,
          endDate: this.get('main.3.endDate', this.offerPageConfigState),
          startDate: this.get('main.3.startDate', this.offerPageConfigState),
          readOnly: this.isNativeIos ? true : false,
          inputType: this.isNativeIos ? 'text' : 'date',
          class: 'spacing-zero-top'
        },
        {
          dataSelect: 'ti-offer-info-message-max-days',
          iconType: 'coronita:info',
          type: 'info-light-blue',
          message: this.t('travel-insurance-manager-simulation-info-message-max-days'),
          iconMessageClass: 'help no-padding medium-dark',
          subClass: 'not-margin-top not-margin-bottom'
        },
        { // VIAJEROS ASEGURADOS TÍTULO
          dataSelect: 'ti-offer-travelers-title',
          subheader: this.t('travel-insurance-manager-simulation-offer-travelers-title'),
          description: this.t('travel-insurance-manager-simulation-offer-travelers-description'),
          className: 'font-s spacing-sm-bottom spacing-lg-top',
        },
        { // input número de viajeros
          dataSelect: 'ti-offer-travelers-number',
          simulationId: 'number-of-travelers-sid',
          isMoleculeInput: true,
          label: this.t('travel-insurance-manager-traveler-count-label'),
          hideContinueBtn: true,
          iconSize: '24',
          event: 'open-modal-number-of-travelers',
          readonly: true,
          icon: 'coronita:unfold',
          iconVisibility: 'always',
          selectedValue: this.get('selectedValue', this.numberOfTravelersSelected),
          class: 'spacing-xsm-bottom'
        },
        { // box informativo
          dataSelect: 'ti-offer-info-message-insured-people',
          subClass: 'spacing-sm-top',
          iconType: 'coronita:info',
          type: 'info-light-blue',
          message: this.t('travel-insurance-manager-offer-info-message-insured-people'),
          iconMessageClass: 'help no-padding not-margin-top not-margin-bottom medium-dark'
        },
        { // beneficios
          dataSelect: 'ti-offer-benefits',
          description: this.t('travel-insurance-manager-offer-benefits-subheader'),
          className: 'heading-black spacing-md-bottom spacing-md-top benefitsSectionList medium',
          subClass: 'spacing-md-bottom heading-black',
          isList: true,
          numberedList: false,
          iconList: 'icon-list',
          list: [
            'travel-insurance-manager-benefits-list-item0',
            'travel-insurance-manager-benefits-list-item1',
            'travel-insurance-manager-benefits-list-item2'
          ]
        },
        {
          dataSelect: 'ti-offer-coverage-header',
          description: this.t('travel-insurance-manager-coverage-title'),
          className: 'heading-black medium spacing-sm-bottom spacing-sm-top',
          icon: {
            id: 'glomo-travel-insurance-data-help-info-date-travel',
            value: 'coronita:help',
            dataTooltip: 'dateFilter',
            class: 'info-icon icon-size-24 spacing-sm-left',
            event: 'open-modal-info-date-travel'
          }
        },
        { // coberturas descripción
          dataSelect: 'ti-offer-insurance-coverage-description',
          description: this.t('travel-insurance-manager-coverage-description'),
          iconType: 'coronita:info',
          type: 'info-light-blue',
          message: this.t('travel-insurance-manager-offer-info-message-money'),
          iconMessageClass: 'help no-padding not-margin-top not-margin-bottom light-blue',
          subClass: 'not-all-padding'
        },
        {
          dataSelect: 'ti-offer-coverages-contend',
          isAccordionList: true,
          iconRight: 'coronita:expand',
          iconRightCollapse: 'coronita:collapse',
          class: 'basic',
          items: this.travelInsuranceCoverages
        },
        {
          dataSelect: 'ti-offer-info-coverages-info',
          iconType: 'coronita:info',
          message: this.t('travel-insurance-manager-coverages-info-message'),
          subClass: 'spacing-sm-bottom spacing-sm-top',
          type: 'info-light-blue',
          iconMessageClass: 'custom-info-light',
          changeDataText: this.t('travel-insurance-manager-coverages-info-link'),
          showChangeData: true,
          hasMultipleData: true
        },
        { // consideraciones
          dataSelect: 'ti-offer-considerations',
          description: 'CONSIDERACIONES',
          className: 'heading-black font-s spacing-lg-top spacing-md-bottom medium',
          isList: true,
          numberedList: false,
          iconList: 'icon-list',
          list: [
            'travel-insurance-manager-info-description-exchange-rate',
            'travel-insurance-manager-info-description-user-data-info'
          ]
        },
        {
          dataSelect: 'ti-offer-info-description-residence-title',
          className: 'spacing-zero-bottom spacing-zero-top',
          description: 'Domicilio'
        },
        {
          dataSelect: 'ti-offer-info-description-residence-detail',
          className: 'spacing-sm-bottom spacing-zero-top medium',
          description: this.detailUserAddress
        },
        {
          dataSelect: 'ti-offer-info-description-email-title',
          className: 'spacing-zero-bottom spacing-zero-top',
          description: 'Correo'
        },
        {
          dataSelect: 'ti-offer-info-description-email-detail',
          className: 'spacing-zero-bottom spacing-zero-top medium',
          description: this.userEmail
        },
        {
          dataSelect: 'ti-offer-info-description-change-info',
          className: 'center-align spacing-zero-bottom',
          description: this.t('travel-insurance-manager-info-description-change-info')
        },
        {
          dataSelect: 'ti-offer-info-description-restrictions-exclusions-phone-service',
          className: 'center-align medium spacing-dm-bottom spacing-zero-top medium',
          description: this.phoneNumberTravelInsurance
        },
        {
          dataSelect: 'ti-offer-info-divider',
          isDivider: true,
          small: true,
          centered: true
        },
        {
          dataSelect: 'ti-offer-info-description-restrictions-exclusions',
          className: 'center-align heading-gray',
          description: this.t('travel-insurance-manager-info-description-restrictions-exclusions')
        },
        {
          dataSelect: 'ti-offer-info-description-copyright',
          className: 'center-align spacing-lg-bottom heading-gray',
          description: this.t('travel-insurance-manager-info-description-copyright')
        }
      ],
      sticky: [
        this.offerStickyData
      ],
      footer: this.__buildingOfferFooterConfig(this.hasPaymentMethod),
      filled: [
        {
          dataSelect: 'ti-offer-filled-title',
          text: this.t('travel-insurance-offer-page-filled-title'),
          class: 'title',
        },
        {
          dataSelect: 'ti-offer-filled-title-amount',
          cellsKey: 'travel-insurance-offer-page-filled-title-amount',
          subClass: 'inline',
          class: 'spacing-sm-bottom'
        },
        {
          id: 'travel-insurance-offer-page-filled-amount',
          dataSelect: 'ti-offer-filled-amount',
          value: {
            language: this.language,
            amount: this.get('sticky.0.operation.amount.amount', this.offerPageConfigState),
            currencyCode: this.get('sticky.0.operation.amount.currency', this.offerPageConfigState),
            class: 'currency-xxxxl'
          },
          class: 'spacing-sm-bottom big-amount'
        },
        {
          dataSelect: 'ti-offer-filled-title-amount',
          cellsKey: `${this.t('travel-insurance-offer-page-title-amount')}  ${this.__getEquivalentAmount()}`,
          subClass: 'key-italic inline',
          class: 'spacing-sm-bottom'
        },
        {
          key: '<hr class="amount-separator">'
        },
        {
          dataSelect: 'ti-offer-filled-destination',
          cellsKey: 'travel-insurance-filled-destination',
          cellsValue: this.get('main.1.selected', this.offerPageConfigState) === 0 ? 'Nacional' : 'Internacional',
          subClass: 'inline'
        },
        {
          dataSelect: 'ti-offer-filled-date-start',
          cellsKey: 'travel-insurance-offer-page-filled-date-start',
          cellsValue: this._formatDate(this.get('main.3.startDate', this.offerPageConfigState)),
          subClass: 'inline'
        },
        {
          dataSelect: 'ti-offer-filled-date-end',
          cellsKey: 'travel-insurance-offer-page-filled-date-end',
          cellsValue: this._formatDate(this.get('main.3.endDate', this.offerPageConfigState)),
          subClass: 'inline'
        },
        {
          dataSelect: 'ti-offer-filled-travelers',
          cellsKey: 'travel-insurance-offer-page-filled-travelers',
          cellsValue: this.get('selectedValue', this.numberOfTravelersSelected),
          subClass: 'inline spacing-md-bottom'
        }
      ]
    });
  }

  /**
   * @desc offer button disabled when date is invalid
   */
  invalidateDate() {
    this.offerButtonData.disabled = true;
    this.updateOfferState();
  }

  /**
   * @desc Change format date to locale date format
   * @param {String} date
   * @param {Object} options
   * @return {String}
   */
  _formatDate(date, options = { day: '2-digit', month: '2-digit', year: 'numeric' }) {
    const formatDate = new Date(date);
    formatDate.setDate(formatDate.getDate() + 1);
    return formatDate.toLocaleDateString(this.language, options);
  }

  /**
   * @desc Where changed numberOfTravelersSelected, set numberOfElderTravelersSelected
   * @param {Object} numberOfTravelersSelected
   */
  __numberOfTravelersSelectedChanged(numberOfTravelersSelected) {
    const numberOfTravelers = this.get('selectedValue', numberOfTravelersSelected);
    if (+numberOfTravelers === 1) {
      this._dispatch('disable-offer-sticky', false);
      this.set('priceToHire', {});
    }
  }

  /**
   * @private Dispatch event to show spinner in summary
   */
  _loadingQuotationsRequest(buttonDisabled) {
    if (buttonDisabled) {
      this.offerStickyData.isSummaryView = true;
      this.offerStickyData.showSummarySkeleton = true;
    } else {
      this.offerStickyData.showSummarySpinner = true;
      this.offerButtonData.forceVisibility = false;
    }
    this.updateOfferState();
  }
  /**
   * @private Dispatch event for update summary sticky
   * @param {Object} response
   * @event recalculate-offer-sticky-container
   */
  _showUpdatedSummaryInfo(response) {
    this.set('quotationsResponse', response);
    this.set('priceToHire', this.get('product.plans.0.installmentsPlan.0', response));
    this._setOfferButtonDisabled(true);
    Object.assign(this.offerStickyData, {
      hidePrimaryButton: true,
      showSummarySkeleton: false,
      showSummarySpinner: false,
      operationAmountClass: 'amount-huge-decimals currency-xxxxl',
      feesMessage: 'travel-insurance-exchange-rate',
      localCurrency: 'MXN',
      operation: {
        amount: {
          amount: this.get('product.plans.0.installmentsPlan.1.amount', response),
          currency: 'USD '
        },
        fees: [
          {
            feeAmount: {
              amount: this.get('product.plans.0.installmentsPlan.0.amount', response),
              currency: `${this.get('product.plans.0.installmentsPlan.0.currency', response)} `,
              localCurrency: 'MXN ',
              withoutCurrencySymbol: true
            }
          }
        ],
        additionalText: {
          key: `1 USD = ${this._showTwoDecimals(this.get('exchangeRate.value', response))} ${this.get('exchangeRate.description', response)}`,
          class: 'cells-summary-view--commission'
        }
      },
      iconMessage: null
    });

    this.updateOfferState();
    this._dispatch('recalculate-offer-sticky-container');
  }

  /**
   * @private The amount is recovered to show only 2 decimals
   * @param {Number} value
   */
  _showTwoDecimals(value) {
    const number = String(value).substring(0, 5);
    return Number(number);
  }

  /**
   * @private simulation body changed observer
   * @param {Object} newValue
   */
  _simulationBodyChanged(newValue, oldValue) {
    this.set('dataSaved', true);
    this.set('priceToHire', {});
    this._loadingQuotationsRequest(this.get('offerButtonData.disabled'));
    this._callQuotationsPostRequest(newValue);
  }

  /**
   * @desc Do the PATCH request to /travel-insurances/v1/quotations when changes are made in offer in single fields
   * @param {Object} simulationBody
   */
  _callQuotationsPatchRequest(simulationBody) {
    this.$['global-apis-travel-insurance'].patchQuotations(this._parseQuotationsBodyRequest(simulationBody, this.quotationId, this.travelers));
  }

  /**
   * @private Do the POST request to /travel-insurances/v1/quotations
   * @param {Object} simulationBody
   */
  _callQuotationsPostRequest(simulationBody) {
    return this.$['global-apis-travel-insurance'].postQuotations(this._parseQuotationsBodyRequest(simulationBody));
  }

  /**
   * @private Parse body for request /travel-insurances/v1/quotations
   * @param {Object} simulationBody
   * @returns {Object}
   */
  _parseQuotationsBodyRequest(simulationBody, quotationId, users) {
    return Object.assign({
      body: {
        product: {
          id: this.get('id', this.travelInsurancesProducts),
          plan: {
            id: this.get('plans.0.id', this.travelInsurancesProducts),
            planType: { id: this.get('plans.0.planType.id', this.travelInsurancesProducts) }
          }
        },
        participants: users ? this._parsePutQuotations(users) : [],
        startDate: this.get('glomo-my-trips-date-selector.start', simulationBody),
        endDate: this.get('glomo-my-trips-date-selector.end', simulationBody),
        travelerCount: this.get('number-of-travelers-sid.value', simulationBody),
        customerIsTraveler: true,
        coveredGeographies: [ { id: this.get('radio-button-destination-selected.value', simulationBody) } ]
      }
    },
    quotationId ? { quotationId } : {}
    );
  }


  /**
   * @desc Success response from POST /travel-insurances/v1/quotations
   * @param {Object} param0 Event with the API response
   */
  onQuotationsPostRequestSuccess({ detail }) {
    this.set('maxRetries', 3);
    this.quotationId = this.get('id', detail);
    this._showUpdatedSummaryInfo(detail);
  }

  /**
   * @desc Success response from PATCH /travel-insurances/v1/quotations/{quotationId}
   * @param {Object} param0 Event with the API response
   */
  onQuotationsPatchRequestSuccess({ detail }) {
    this.set('maxRetries', 3);
    this._showUpdatedSummaryInfo(detail);
  }

  /**
   * @desc Error response from POST /travel-insurances/v1/quotations
   * @event 'recalculate-offer-sticky-container
   * @event 'open-diy-info-modal'
   */
  onQuotationsPostRequestError() {
    --this.maxRetries;
    this._setOfferButtonDisabled(false);
    Object.assign(this.offerStickyData, {
      hidePrimaryButton: false,
      showSummarySpinner: false,
      showSummarySkeleton: false,
      operation: null,
      summaryButtonLabel: 'travel-insurance-offer-error-button',
      primaryButtonEvent: 'summary-closed',
      iconMessage: {
        class: 'no-padding no-background-color',
        icon: 'coronita:alert',
        message: 'travel-insurance-summary-view-icon-message',
        type: 'error'
      }
    });
    this.updateOfferState();
    this._dispatch('recalculate-offer-sticky-container');

    if (this.maxRetries < 0) {
      this.showInfoModal({ id: 'glomo-travel-insurance-request-error' });
    }
  }

  /**
   * @desc Call to the last quotations request again after it returns an error
   */
  retryQuotationsCall() {
    --this.maxRetries;
    this.set('priceToHire', {});
    this._loadingQuotationsRequest(false);
    this._callQuotationsPostRequest(this.simulationBody);
  }

  /**
   * @private Generate config for footer when customer has not accounts available.
   * @param {Array} financialOverview
   * @param {Object} priceToHire
   * @return {Boolean}
   */
  __computedHasPaymentMethod(priceToHire) {
    return this.get('amount', priceToHire) > this.biggestAmount ? false : true;
  }

  /**
   * @private Generate config for footer offer page.
   * @param {Boolean} hasPaymentMethod Boolean that check if has payment method
   * @returns {Array}
   */
  __buildingOfferFooterConfig(hasPaymentMethod) {
    const hasNotPaymentMethod = [{
      id: 'i-want-it-button',
      dataSelect: 'ti-offer-continue-button',
      button: {
        text: 'travel-insurance-manager-offer-page-button',
        class: 'tertiary tertiary-offer-page-color'
      },
      forceVisibility: true,
      disabled: true
    },
    {
      type: 'error',
      iconSize: '24',
      message: 'travel-insurance-error-paymentmethod-not-available',
      iconType: 'coronita:alert',
      iconMessageClass: 'no-background-color'
    }];

    return hasPaymentMethod ? [ this.offerButtonData ] : hasNotPaymentMethod;
  }

  /**
   * @private Parse data of customer and dispatch data.
   * @param {Object} customer
   * @event 'user-selector-buttons-config'
   * @return {Object}
   */
  _parseUserSelectorButtons(customer) {
    const buttonsConfig = [
      {
        title: 'travel-insurance-customer-traveler',
        texts: [ { text: `${customer.firstName}  ${customer.lastName} ${customer.secondLastName}` } ],
        icon: 'coronita:forward',
        eventName: 'customer-traveler'
      },
      {
        title: 'travel-insurance-customer-not-traveler-title',
        texts: [ { text: 'travel-insurance-customer-not-traveler-subtitle' } ],
        icon: 'coronita:forward',
        eventName: 'customer-not-traveler'
      }
    ];
    this._dispatch('user-selector-buttons-config', buttonsConfig);

    return buttonsConfig;
  }

  /**
   * @private Dispatches a custom event with name and detail
   * @param {String} name
   * @param {any} detail
   */
  _dispatch(name, detail) {
    this.dispatchEvent(new CustomEvent(name, {
      bubbles: true,
      composed: true,
      detail: detail
    }));
  }
  /**
   * @private Enable or Disabled offer Button
   * @param {Boolean} visibility
   */
  _setOfferButtonDisabled(visibility) {
    Object.assign(this.offerButtonData, {
      disabled: !visibility,
      forceVisibility: visibility
    });
  }

  /**
   * @desc customer is insured
   * @event 'only-customer-is-traveler'
   * @event 'travelers-changed'
   */
  customerInsured() {
    this.customerIsTraveler = true;
    const numberOfTravelersSelected = +this.numberOfTravelersSelected.selectedValue;
    let travelers = [];
    if (this.travelers.length === 0) {
      if (numberOfTravelersSelected === 1) {
        travelers.push(this._includeCustomerData());
        this.parseUsers(travelers);
        this._dispatch('only-customer-is-traveler');
      } else {
        const additionalTravelers = numberOfTravelersSelected - 1;
        travelers = this._buildTravelers(additionalTravelers, true);
        travelers.unshift(this._includeCustomerData());
        this._generateModalDescription(numberOfTravelersSelected, true);
        this._dispatch('travelers-changed', travelers);
      }
    } else if (this.travelers.every(t => t.editable)) {
      this.showInfoModal({ id: 'not-save-information-traveler' });
    } else {
      if (numberOfTravelersSelected === 1) {
        travelers.push(this._includeCustomerData());
        this.parseUsers(travelers);
        this._dispatch('only-customer-is-traveler');
      } else {
        const additionalTravelers = numberOfTravelersSelected - 1;
        this.travelers.shift();
        travelers = this._buildTravelers(additionalTravelers, true, this.travelers);
        travelers.unshift(this._includeCustomerData());
        this._generateModalDescription(numberOfTravelersSelected, true);
        this._dispatch('travelers-changed', travelers);
      }
    }
  }

  /**
   * Reset properties and send events for reset other components after user selector
   * @event user-selector-selected-travelers
   * @event reset-steps-after-payment-methods
   */
  resetAfterUserSelector() {
    this.set('travelers', []);
    this._dispatch('user-selector-selected-travelers', []);
    this.customerInsured();
    this._dispatch('reset-steps-after-payment-methods', 3);
    this._dispatch('handle-mail-contract-step', '');
  }

  /**
   * @private Build input from user data modal
   * @param {Boolean} hasMarried
   * @return {Object}
   */
  _buildInputs(hasMarried) {
    /* eslint-disable-next-line */
    const minDate = moment().subtract(65, 'years').format('YYYY-MM-DD');
    /* eslint-disable-next-line */
    const maxDate = moment().format('YYYY-MM-DD');
    /* eslint-disable-next-line */
    return {
      name: {
        value: '',
      },
      surname: {
        value: '',
      },
      secondSurname: {
        value: '',
      },
      birthday: {
        value: maxDate,
        max: maxDate,
        min: minDate,
        disabled: false
      },
      identityDocument: {
        value: '00000000',
        display: 'hide'
      },
      optionsRelationship: {
        title: 'travel-insurance-relationship-title',
        optionSelected: null,
        radioOne: 'travel-insurance-relationship-option0',
        radioTwo: 'travel-insurance-relationship-option1',
        disabledRadioOne: false,
        disabledRadioTwo: false,
        marriageDisable: hasMarried
      },
      optionGender: {
        title: 'travel-insurance-gender-options-title',
        optionSelected: null,
        radioOne: 'travel-insurance-gender-option0',
        radioTwo: 'travel-insurance-gender-option1'
      },
      minorAuthorization: {
        title: 'travel-insurance-minor-authorization',
        iconMessageText: 'travel-insurance-minor-authorization-icon-message',
        checked: false,
        isMinor: false,
        isValid: true
      }
    };
  }

  /**
  * @private Gets customer data and sets a customerTraveler into array of travelers
  * @returns {Object}
  */
  _includeCustomerData() {
    const customer = this.customer;
    const formattedBirthday = this._formatDate(customer.birthData.birthDate);
    return {
      id: 'traveler-0',
      inputs: {
        name: {
          value: customer.firstName,
        },
        surname: {
          value: customer.lastName,
        },
        secondSurname: {
          value: customer.secondLastName,
        },
        birthday: {
          formatted: formattedBirthday,
          value: formattedBirthday,
        },
        identityDocument: {
          value: '',
          display: 'hide'
        },
        gender: {
          value: customer.gender.name,
        }
      },
      editable: false
    };
  }

  /**
   * @desc Parse array of travelers selected and dispath event.
   * @param {Array} selectedUsers
   * @event 'user-selector-selected-travelers'
   */
  parseUsers(selectedUsers) {
    if (selectedUsers) {
      this.travelers = selectedUsers;
      const users = selectedUsers.map(item => {
        return [
          {
            key: this.t('travel-insurance-parse-users-name'),
            value: (`${item.inputs.name.value} ${item.inputs.surname.value} ${item.inputs.secondSurname.value || ''}`).trim(),
            class: 'dl-light'
          },
          {
            key: this.t('travel-insurance-parse-users-birthday'),
            value: item.inputs.birthday.formatted || this._formatDate(item.inputs.birthday.value),
            class: 'dl-light'
          }
        ];
      });
      this._dispatch('user-selector-selected-travelers', users);
    }
  }

  /**
   * @desc customer is not insured
   * @event 'travelers-changed'
   * @event 'index-travel-has-married-form'
   */
  customerNotInsured() {
    this.customerIsTraveler = false;
    let numberOfTravelersSelected = +this.numberOfTravelersSelected.selectedValue;
    let travelers;

    if (this.travelers.length === 0) {
      travelers = this._buildTravelers(numberOfTravelersSelected, false);
      this.set('travelers', travelers);
    } else {
      travelers = JSON.parse(JSON.stringify(this.travelers));

      if (!this.get('0.editable', travelers)) {
        travelers = travelers.splice(1);
        travelers.push({});
        travelers = this._buildTravelers(numberOfTravelersSelected, false, travelers);
        if (this.validHasMarried(travelers)) {
          this._dispatch('index-travel-has-married-form', travelers.findIndex(travel => travel.inputs.optionsRelationship.optionSelected === 1));
        }
      } else {
        travelers = this._buildTravelers(numberOfTravelersSelected, false, this.travelers);
      }
    }

    this._generateModalDescription(numberOfTravelersSelected, false);
    this._dispatch('travelers-changed', travelers);
  }
  /**
   * @desc Reset number of travelers
   */
  resetTravelers() {
    this.travelers = [];
    this._dispatch('clean-users', []);
  }
  /**
   * @private Build travelers
   * @param {Number} length
   * @param {Boolean} isCustomerInsured
   * @returns {Object}
   */
  _buildTravelers(length, isCustomerInsured, travelers = []) {
    let hasMarried = this.validHasMarried(travelers);
    return Array.from({ length }, (modifiedTraveler, index) => ({
      id: `traveler-${index + (isCustomerInsured ? 1 : 0)}`,
      inputs: this.c(travelers, `${index}.inputs`) || this._buildInputs(hasMarried),
      editable: true,
      additionalInformation: true,
      errorText: {
        olderSonErrorText: 'travel-insurance-manager-older-son-error-text',
        youngerParterErrorText: 'travel-insurance-manager-younger-partner-error-text'
      },
      errorMessage: {
        message: 'travel-insurance-offer-date-input-error-message',
        icon: 'coronita:alert',
        iconSize: {
          width: 16,
          height: 16
        }
      }
    }));
  }

  /**
   * @desc validat if has married
   */
  validHasMarried(travelers) {
    return (travelers.length > 0 && travelers.some(traveler => Object.keys(traveler).length && traveler.inputs.optionsRelationship?.optionSelected === 1));
  }

  /**
   * @private Set correct description for different scenarios
   * @event travelers-description
   * @param {Number} numberOfTravelersSelected
   * @param {Boolean} isCustomerInsured
   */
  _generateModalDescription(numberOfTravelersSelected, isCustomerInsured) {
    let mainDescription;
    if (!isCustomerInsured) {
      mainDescription = `${numberOfTravelersSelected > 1 ? 'plural' : 'singular'}-customer-is-not`;
    } else {
      mainDescription = `${numberOfTravelersSelected > 2 ? 'plural' : 'singular'}-customer-is`;
    }

    this._dispatch('travelers-description', [ {
      subtitle: this.t('travel-insurance-user-data-modal-title'),
      mainDescription: this.t(`travel-insurance-user-data-modal-description-${mainDescription}-insured`),
    } ]);
    this._dispatch('travelers-privacy-description', [ {
      mainDescription: this.t('travel-insurance-user-data-modal-privacy-description')
    } ]);
  }
  /**
   * @desc Set modal config for user data privacy modal.
   * @event user-data-privacy-modal-settings
   * @paeam {Object} ev
   */
  userDataModalPrivacyButtonClicked(ev) {
    this._dispatch('user-data-privacy-modal-settings', ev.model);
  }
  /**
   * @private Refresh checklist contract properties
   */
  _accountSelectedChanged(account, oldAccount) {
    if (oldAccount && account.id !== oldAccount.id) {
      this._dispatch('reset-steps-after-user-selector', 3);
      this._dispatch('handle-mail-contract-step', '');
    }
    this._checkListContractProperties();
    this._dispatch('go-to-next-step');
  }
  /**
   * @desc Do GET /business-documents/v0/business-documents
   * @event set-business-properties
   * @param {Object} pdfDetail
   */
  requestPdf(e) {
    this.openSpinner();
    let params = {'product.id': 'SEGUROS', 'subproduct.id': 'PBSEGVSI01'};
    let businessProperties = {'tsec': this.tsec.token, 'deviceId': this.deviceId.value};
    this._dispatch('title-pdf-text', e.text === 'travel-insurance-terms-pdf-terms-and-conditions' ? 'travel-insurance-terms-pdf-terms-and-conditions' : 'travel-insurance-terms-pdf-terms-and-conditions-general-conditions');
    this._dispatch('set-business-properties', businessProperties);
    this._dispatch('request-pdf-contract', params);
  }
  /**
   *@desc  that sends the parameters to get the base64
   *@param {Array} response
   */
  successResponsePDF(response) {
    this.set('maxRetries', 3);
    response.map((data) => {
      if (data.id && data.documentTemplate.id === this.pdfDocTitle) {
        let requestTermns = { documentTemplate: { id: data.id, templateType: { id: 'PDF' } } };
        let businessProperties = {'tsec': this.tsec.token, 'deviceId': this.deviceId.value};
        this._dispatch('set-business-properties', businessProperties);
        this._dispatch('request-post-document', requestTermns);
      }
    });
  }
  /**
   *@desc  get the base64 of the answer
   *@param {String} responseBase
   */
  successBasePdf(responseBase) {
    let base64;
    if (this.isNativeIos) {
      base64 = this.validateBasePdf(this.get('data.parts.0.content', responseBase));
    } else {
      let data = this.validateBasePdf(responseBase);
      let startBase64 = data.indexOf('>') + 3;
      let endBase64 = data.indexOf('=')  + 3;
      if (endBase64 <= 2) {
        let foie = data.substring(startBase64);
        endBase64 = foie.indexOf('-');
      }
      base64 = data.substring(startBase64, endBase64);
    }
    this.set('baseSrc', base64);
    this._dispatch('show-document-event');
    this.closeSpinner();
  }
  /**
   *@Desc Validate content Base64
   * @param {String} responseBase
   */
  validateBasePdf(responseBase) {
    let uri = responseBase;
    try {
      let response;
      if (uri !== window.atob(uri)) {
        response = window.atob(uri);
      }
      return response;
    } catch (e) {
      return uri;
    }
  }
  /**
   * @desc Open modal data travel
   * @event open-diy-info-modal
   */
  openModalDataTravel() {
    this.showInfoModal({ id: 'modal-data-travel' });
  }
  /**
   * @desc Open modal destination travel
   * @event open-diy-info-modal
   */
  openModalDestinationTravel() {
    this.showInfoModal({ id: 'modal-destination-travel' });
  }

  /**
   * @desc Open modal contractual documentation
   * @event open-diy-info-modal
   */
  openContractualDocumentation() {
    this.showInfoModal({ id: 'travel-insurance-contractual-documentation' });
  }

  /**
   * @desc Request PUT /travel-insurances/v1/quotations/{quotation-id}
   */
  doInsurancesRequest() {
    this.openSpinner();
    this.$['global-apis-travel-insurance'].putQuotations(this._parsePutQuotationsBodyRequest(this.travelers, this.quotationId));
  }

  /**
   * @private Parse body for request /travel-insurances/v1/quotations
   * @param {Object} simulationBody
   * @param {String} quotationId
   * @returns {Object}
   */
  _parsePutQuotationsBodyRequest(users, quotationId) {
    const numberOfTravelers = this.get('selectedValue', this.numberOfTravelersSelected);
    let participants = this._parsePutQuotations(users);
    if (this.customerIsTraveler) {
      participants.shift();
    }

    return {
      body: {
        product: {
          id: this.get('id', this.travelInsurancesProducts),
          plan: {
            id: this.get('plans.0.id', this.travelInsurancesProducts),
            planType: { id: this.get('plans.0.planType.id', this.travelInsurancesProducts) }
          }
        },
        startDate: this.get('main.3.startDate', this.offerPageConfigState),
        endDate: this.get('main.3.endDate', this.offerPageConfigState),
        travelerCount: +numberOfTravelers,
        customerIsTraveler: this.customerIsTraveler,
        participants: participants,
        coveredGeographies: [ {
          id: this.offerPageConfigState.main[1].options[this.get('main.1.selected', this.offerPageConfigState)].value
        } ],
        deliveryMethods: [ {
          id: '002',
          documentType: 'VIRTUAL',
          contactDetails: [ { id: '001' } ]
        } ],
        status: 'SELECT_REQUEST'
      },
      quotationId: quotationId
    };
  }

  /**
   * @private parse put quotations response
   * @param {Object} params
   * @returns {Object}
   */
  _parsePutQuotations(params) {
    let participants = params.map(participant => {
      let name = this.c(participant, 'inputs.name.value').trim();
      let nameSplit = name.split(' ');
      return {
        birthDate: this.c(participant, 'inputs.birthday.value'),
        firstName: nameSplit[0],
        middleName: this.c(nameSplit, '1', ''),
        gender: this._setGender(participant.inputs),
        lastName: this.c(participant, 'inputs.surname.value').trim(),
        participantType: 'TRAVELER',
        relationType: {
          id: this._setRelationType(participant.inputs)
        },
        secondLastName: this.c(participant, 'inputs.secondSurname.value').trim(),
      };
    });
    return participants;
  }


  /**
   * @private Set gender from participant
   * @param {Object} inputs
   * @returns {Object}
   */
  _setGender(inputs) {
    let gender;
    if (this.get('optionGender', inputs)) {
      gender = this.get('optionGender.optionSelected', inputs) === 1 ? 'MALE' : 'FEMALE';
    } else {
      gender = inputs.gender.value === 'MASCULINO' ? 'MALE' : 'FEMALE';
    }
    return gender;
  }

  /**
   * @private Set realtion type from participant
   * @param {Object} participant
   * @returns {Object}
   */
  _setRelationType(participant) {
    let relationType = this.get('gender.value', participant) === 'Hombre' ? '001' : '002';
    if (this.get('optionsRelationship', participant)) {
      relationType = (this.get('optionsRelationship.optionSelected', participant) === 0) ? '004' : '003';
    }
    return relationType;
  }

  /**
   * @desc Success response from PUT /travel-insurances/v1/quotations/{quotationId}
   */
  onQuotationsPutRequestSuccess(data) {
    this.set('maxRetries', 3);
    this._dispatch('request-post-insurance', this._parseQuotationsPostBodyRequest(this.accountSelected, this.quotationId));
  }

  /**
   * @private Parse quotation post body request
   * @param {Number} accountSelected
   * @param {Number} quotationId
   * @returns {Object}
   */
  _parseQuotationsPostBodyRequest(accountSelected, quotationId) {
    let keyRelatedContracts = 'contractId';
    let productType = 'ACCOUNT';
    if (accountSelected.productType === 'CARDS') {
      keyRelatedContracts = 'number';
      productType = 'CARD';
    }
    return {
      body: {
        quotationId: quotationId,
        paymentMethod: {
          paymentType: 'DIRECT_DEBIT',
          installmentFrequency: 'ANNUAL',
          relatedContracts: [ {
            [keyRelatedContracts]: this.get('id', accountSelected),
            product: {
              id: productType
            }
          } ]
        },
        offerId: this.offerId
      }
    };
  }
  /**
   * @desc Show modal from retry error
   * @event open-diy-info-modal
   */
  onInsuranceRequestError(error) {
    this.closeSpinner();
    --this.maxRetries;
    let nameModal = this.maxRetries < 0 ? 'glomo-travel-insurance-request-error' : 'glomo-travel-insurance-post-retry-error';
    this.showInfoModal({ id: nameModal });
  }

  /**
   * @desc Check if the offer changes and execute the required reset
   * @event user-selector-selected-travelers
   * @event reset-steps-after-user-selector
   * @event go-to-next-step
   */
  checkOfferChanges() {
    const savedTravelerCount = +this.get('savedQuotationsResponse.travelerCount');
    const travelerCount = +this.quotationsResponse.travelerCount;
    const feeAmount = this.get('sticky.0.operation.fees.0.feeAmount.amount', this.offerPageConfigState);
    let resettedPaymentMethods;
    let parsedAccounts = this.c(this.globalCacheStorage, 'dashboard.accounts') || this.globalAccountsParsed;
    this._getAccounts(parsedAccounts);
    let parsedCards = this.c(this.globalCacheStorage, 'dashboard.cards') || this.globalCardsParsed;
    this._getCards(parsedCards);

    if (feeAmount && this.savedPriceToHire.amount !== feeAmount) {
      this._checkListContractProperties();
    }

    if (this.accountSelected && this.accountSelected.primaryAmount.amount < this.priceToHire.amount) {
      resettedPaymentMethods = true;
      this._dispatch('reset-steps-after-user-selector', 2);
      parsedAccounts = this.c(this.globalCacheStorage, 'dashboard.accounts') || this.globalAccountsParsed;
      this._getAccounts(parsedAccounts);
      parsedCards = this.c(this.globalCacheStorage, 'dashboard.cards') || this.globalCardsParsed;
      this._getCards(parsedCards);
    }
    if (savedTravelerCount && travelerCount !== savedTravelerCount) {
      this._dispatch('user-selector-selected-travelers', []);
      this._partialReset(resettedPaymentMethods);
    } else {
      this._dispatch('go-to-next-step');
    }
    this.savedQuotationsResponse = this.quotationsResponse;
    this.savedPriceToHire = this.priceToHire;
  }

  /**
   * @private Send events for reset other components and add new travelers
   * @event reset-steps-after-payment-methods
   * @event reset-user-selector-step-and-go
   */
  _partialReset(resettedPaymentMethods) {
    if (!resettedPaymentMethods) {
      this._dispatch('go-to-next-step');
    }
    this._dispatch('reset-user-selector-step-and-go', { currentStep: 2 });
    this._dispatch('handle-mail-contract-step', '');
  }

  /**
   * @private Generate config object date for receipt
   * @param {String} date
   * @param {String} clases
   * @param {String} format
   * @returns {Object}
   */
  _dateFormated(date, clases, format) {
    return {
      text: date,
      formatDate: format,
      class: clases
    };
  }

  /**
   * @private parse response of insurances/v1/insurances for receipt
   * @param {Object} signResponse
   * @event travel-insurance-otp-success
   * @event navigation-to-review
   * @returns {Object}
   */
  parseSignToReceipt(signResponse) {
    let exchangeRate = this.get('exchangeRate.value', this.quotationsResponse).toString();
    this.closeSpinner();
    const result = {
      title: this.t('travel-insurance-receipt-success-title'),
      date: moment(),
      dateClass: 'bold-date',
      amountLabel: 'travel-insurance-receipt-management-number',
      folioNumber: this.get('policyNumber', signResponse),
      destination: {
        avatar: {
          src: this.receiptIcon
        }
      },
      headerAdditionalListInfo: [
        {
          key: 'travel-insurance-receipt-amount',
          value: this.__getDollarAmount()
        },
        {
          key: 'travel-insurance-exchange-rate-title',
          value: `${this.t('travel-insurance-exchange-rate-subtitle')} ${exchangeRate.substring(0, exchangeRate.length - 2)}`
        },
        {
          key: 'travel-insurance-exchange-rate-national',
          value: this.__getEquivalentAmount()
        },
      ],
      additionalInfo: [
        {
          class: 'key-bold',
          key: this.get('accountSelected.name'),
        },
        {
          class: 'spacing',
          musk: {
            value: this.get('accountSelected.description.value').replace(/\*/g, '').slice(-4),
            simbol: '•'
          }
        },
        {
          key: 'travel-insurance-receipt-destination-title',
          value: this.get('main.1.selected', this.offerPageConfigState) === 0 ? 'Nacional' : 'Internacional',
          class: 'bold spacing'
        },
        {
          key: 'travel-insurance-start-date-text',
          class: 'spacing bold',
          date: {
            value: this.get('main.3.startDate', this.offerPageConfigState),
            format: 'D MMMM YYYY',
            class: 'bold',
          }
        },
        {
          key: 'travel-insurance-end-date-text',
          class: 'spacing bold',
          date: {
            value: this.get('main.3.endDate', this.offerPageConfigState),
            format: 'D MMMM YYYY',
            class: 'bold',
          }
        },
        {
          key: 'travel-insurance-people-name',
          htmlValue: this._parseParticipantsToReceipt(this.travelers),
          class: 'bold spacing'
        },
        {
          key: 'Folio',
          value: this.get('operationNumber', signResponse),
          class: 'bold'
        },
        {
          key: '',
          value: 'BBVA',
          class: 'bold spacing'
        },
        {
          message: {
            type: 'info-light-blue',
            icon: 'coronita:info',
            class: 'custom-info-light',
            text: 'travel-insurance-info-message',
          },
          class: 'spacing',
          id: 'message-primary'
        },
        {
          key: 'travel-insurance-receipt-email-title',
          value: this.customer.email,
          class: 'bold medium spacing-sm-top'
        }
      ],
      buttons: {
        primary: {
          text: 'Salir',
          action: 'exit-to-contract-product-page'
        },
        secondary: {
          hidden: true
        }
      }
    };
    this.set('travelInsuranceReceipt', result);
    this.openSpinner();
    this._dispatch('travel-insurance-receipt', { page: 'travel-insurance-success' });
  }
  /**
   * @private Parse participants object and return object for recipt
   * @param {Array} participants
   * @returns Array
   */
  _parseParticipantsToReceipt(participants = []) {
    let participantsArray = participants.map(participant => (
      `${participant.inputs.name.value} ${participant.inputs.surname.value} ${participant.inputs.secondSurname.value}`
    ));
    return participantsArray.join('<br>');
  }
  /**
   * @desc Show the modal correct when the exit user
   * @event 'open-diy-info-modal'
   * @event 'exit-to-travel-insurance'
   */
  backNavigation() {
    if (this.dataSaved) {
      let nameModal = this.dataSaved !== true ? 'exit-not-save-information-user-data-modal' : 'exit-not-save-information-modal';
      this.showInfoModal({ id: nameModal });
    } else {
      this._dispatch('exit-to-travel-insurance');
      this.resetData();
    }
  }
  /**
   * @desc check if the user entered data to the form
   * @param {Object} response
   */
  dataChanged(response) {
    const result = response.filter(input => input.editable);
    const isDataChanged = (dataInput) => (dataInput.inputs.name.value === '' && dataInput.inputs.surname.value === '' && dataInput.inputs.secondSurname.value === '' && dataInput.inputs.optionGender.optionSelected === null && dataInput.inputs.optionsRelationship.optionSelected === null);
    this.dataSaved = !result.every(isDataChanged) ? result : false;
  }
  /**
   * @desc Reset data when back to navigation
   * @event 'clean-users'
   * @event 'remove-class-header'
   * @event 'reset-modal'
   * @event 'reset-steps-back-navigation'
   */
  resetData() {
    this.set('numberOfTravelersSelected', {});
    this.set('priceToHire', {});
    this.set('savedPriceToHire', {});
    this.set('dataSaved', false);
    this.set('savedQuotationsResponse', {});
    this.set('quotationId', false);
    this.set('customerIsTraveler', false);
    this.set('offerPageConfigState', {});
    this.set('offerStickyData', {
      id: 'travel-insurance-offer-page-sticky',
      isSummaryView: false,
      summaryClass: 'one-skeleton-row nomargin pb-16',
      summarySkeletonRows: 2,
      summaryViewTitle: 'travel-insurance-summary-view-title',
      hideCustomFeesMessage: false,
      hidePrimaryButton: true,
      operationAmountClass: 'amount-huge-decimals',
      buttonLabel: 'cells-step-card-offer-page-want-button-text',
      iconMessage: null
    });
    this.set('offerButtonData', {
      id: 'i-want-it-button',
      dataSelect: 'ti-offer-continue-button',
      button: {
        text: 'travel-insurance-manager-offer-page-button',
        class: 'tertiary tertiary-offer-page-color'
      },
      forceVisibility: true,
      disabled: true,
      event: 'continue-pressed'
    });
    this.set('travelers', []);
    this._dispatch('clean-users', []);
    this._dispatch('remove-class-header');
    this._dispatch('reset-modal');
    this._dispatch('reset-steps-back-navigation');
    this._dispatch('disable-offer-sticky', false);
    this._dispatch('invalidate-simulation-event', {
      'glomo-my-trips-date-selector': null,
      'number-of-travelers-sid': null,
      'radio-button-destination-selected': null
    });
  }

  /**
   * @desc success response handler travel insurance
   * @param {Object} response
   */
  successResponseHandlerInsurance(response) {
    this.$.dmInsurance.successResponseHandler(response);
  }

  /**
   * @desc error response handler travel insurance
   * @param {Object} response
   */
  errorResponseHandlerInsurance(response) {
    this.$.dmInsurance.errorResponseHandler(response);
  }

  /**
   * @desc error response on GET/POST business documents
   * @param {Object} response
   */
  errorHandlerOnBusinessDocs(response) {
    this.closeSpinner();
    --this.maxRetries;
    let nameModal = this.maxRetries < 0 ? 'glomo-travel-insurance-communication-error' : 'glomo-travel-insurance-communication-retry-error';
    this.showInfoModal({ id: nameModal });
  }
  /**
   * @desc error response on GET/POST business documents on coverages page
   * @param {Object} response
   */
  errorHandlerOnBusinessDocsCoverages(response) {
    this.closeSpinner();
    --this.maxRetries;
    let nameModal = this.maxRetries < 0 ? 'glomo-travel-insurance-coverages-communication-error' : 'glomo-travel-insurance-coverages-communication-retry-error';
    this.showInfoModal({ id: nameModal });
  }
  /**
   * @desc set identificator product name
   * @param {String} detail
   */
  setProductName(detail) {
    this.closeSpinner();
    this.set('productNameInsurance', detail);
  }
  /**
   * @desc checks the length of the input value
   * @param {Object} inputDetail
   * @event insurance-coupon-enable-confirm-button
   */
  validateInputCoupon(inputDetail) {
    if (inputDetail.value) {
      this.set('couponCode', inputDetail.value);
      this._dispatch('insurance-coupon-enable-confirm-button', !(inputDetail.value.length >= 7 && inputDetail.value.length <= 13));
    }
    if (inputDetail === 'clear') {
      this._dispatch('insurance-coupon-enable-confirm-button', true);
    }
  }
  /**
   * @desc reset properties by code coupon
   * @event insurance-coupon-erase-value-input
   * @event insurance-coupon-enable-confirm-button
   * @event insurance-coupon-cancel-back-page
   */
  resetCouponPage() {
    this.set('productNameInsurance', '');
    this.set('couponCode', '');
    this._dispatch('insurance-coupon-validation-input-error-message', false);
    this._dispatch('insurance-coupon-erase-value-input', null);
    this._dispatch('insurance-coupon-enable-confirm-button', true);
    this._dispatch('insurance-coupon-cancel-back-page');
  }
  /**
   * @desc send the value to product page
   * @event insurance-coupon-page-go-to-
   */
  sendCouponProduct() {
    this._dispatch(`insurance-coupon-page-go-to-${this.productNameInsurance}`, this.couponCode.toUpperCase());
    this.resetCouponPage();
  }
  /**
   * @desc parsed global campaigns
   * @param {Object} globalCampaigns
   */
  _parseGlobalCampaigns(globalCampaigns) {
    let campaigsParsed = globalCampaigns.map(campaign => ({
      name: campaign.name,
      id: campaign.offerId
    }));
  }

  /**
   * @desc parsed offerId for insuranceRequest
   * @param {Object} campaigns
   */
  _parseOfferId(campaigns = []) {
    let filteredOffer = campaigns.filter(offer => {
      return offer.name === 'SEGURO DE VIAJE';
    });
    this.offerId = filteredOffer.length ? filteredOffer[0].id : 'q-SBp_47JsOc-m4cm9Eg4zBOdzCPRaVC';
  }
  /**
   * @desc fix show or hide offer sticky
   * @param {Object} response
   */
  templateContentScroll(data) {
    let offerSticky = data.target.scrollTop > 2300 ? false : true;
    return this.offerStickyData.operation ? this._dispatch('disable-offer-sticky', offerSticky) : '';
  }

}

customElements.define(GlomoTravelInsuranceManagerMx.is, GlomoTravelInsuranceManagerMx);