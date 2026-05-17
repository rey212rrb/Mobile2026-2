{
  const {
    html,
  } = Polymer;
  /**
    `<glomo-transfer-points-cards-list-manager>` Description.

    Example:

    ```html
    <glomo-transfer-points-cards-list-manager></glomo-transfer-points-cards-list-manager>
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
    | --glomo-transfer-points-cards-list-manager | :host    | {} |

    * @customElement glomo-transfer-points-cards-list-manager
    * @polymer
    * @extends {Polymer.Element}
    * @demo demo/index.html
  class GlomoTransferPointsCardsListManager extends Polymer.mixinBehaviors(
    [ CellsBehaviors.i18nBehavior ],
    CellsBehaviors.PropertyResetBehavior(Polymer.Element)) {*/
  /*eslint new-cap: 0*/
  /*eslint no-unused-expressions: ["error", { "allowTernary": true }]*/
  /*eslint new-cap: [2, {"capIsNewExceptions": ["AmountBehavior"]}]*/
  class GlomoTransferPointsCardsListManager extends Polymer.mixinBehaviors([
    CellsBehaviors.i18nBehavior,
    CellsBehaviors.CellsCheckNestedKeysBehavior
  ],
  CellsBehaviors.AmountBehavior(Polymer.Element)) {

    static get is() {
      return 'glomo-transfer-points-cards-list-manager';
    }

    static get properties() {
      return {
        /**
         * Flag to detect when the operative is points rafle
         * @type {Boolean}
         */
        titleNameRafle: {
          type: Boolean,
          value: false,
        },
        /**
       * Flag to detect when the operative is points transfer
       * @type {Boolean}
       */
        titleNameTransfer: {
          type: Boolean,
          value: false,
        },
        /**
       * Title name when the operative is points transfer
       * @type {String}
       */
        nameTransfer: {
          type: String,
          value: 'glomo-transfer-points-cards-list-name-transfer',
        },
        /**
       * Title name when the operative is points rafle
       * @type {String}
       */
        nameRafle: {
          type: String,
          value: 'glomo-transfer-points-cards-list-name-rafle',
        },
        /**
       * Title name of header when page reset productsList
       * @type {String}
       */
        titleName: {
          type: String,
          value: '',
        },
        /**
       * List of cards
       * @type {Array}
       */
        allCards: {
          type: Array,
          value: () => ([])
        },
        /**
       * Lists of cards with points
       */
        creditCards: {
          type: Array,
          value: () => ([])
        },
        /**
        * Flag to check if a modal is opened
        * @type {Boolean}
        */
        modalOpened: {
          type: Boolean,
          value: false
        },

        /**
         * Current selected card
         * @type {Object}
         */
        selectedCard: {
          type: Object,
          value: () => ({})
        },
        /**
         * @desc Redemption simulate request body
         * @type {Object}
         */
        redemptionSimulateBody: {
          type: Object,
          value: () => ({}),
        },
        /**
         * @desc Raffle simulate response from de request
         * @type {Object}
         */
        raffleSimulateResponse: {
          type: Object,
          value: () => ({}),
          notify: true
        },
        /**
         * Current customer
         * @type {String}
         */
        currentCustomer: {
          type: String,
          value: ''
        },

        /**
         * @desc Counter to post redemption simulate retry connecting services
         * @type {Number}
         */
        postRedemptionSimulateRetriesNumber: {
          type: Number,
          value: 0
        },
        /**
         * Possible card status
         */
        statusCard: {
          type: Object,
          value: () => ({
            'OPERATIVE': (nameStatus) => (nameStatus === 'PDT.ENTREG') ? 'activate' : 'operative',
            'BLOCKED': (nameStatus) => {
              const nameBlocked = {
                'SOBREGIRO': 'exceeded',
                'PAG.VENC': 'exceeded',
                'SOB.PAG.VE': 'exceeded',
                'PAG.VENCIDOS': 'exceeded',
                'SOB.PAG.VENCIDO': 'exceeded',
                default: nameStatus === 'VENCIDA' ? 'expired' : 'locked',
              };
              return nameBlocked[nameStatus] || nameBlocked.default;
            },
            'INOPERATIVE': (nameStatus) => (nameStatus === 'VENCIDA') ? 'expired' : 'activate',
            'PENDING_DELIVERY': () => 'activate',
            'CANCELED': (nameStatus) => (nameStatus === 'PDT.ENTREG') ? 'activate' : 'off',
            'PENDING_EMBOSSING': (nameStatus) => {
              if (nameStatus === 'PDT.ENTREG') {
                return 'activate';
              } else if (nameStatus !== 'PDT.REMESA') {
                return 'locked';
              }
            },
            'OFF': () => 'off'
          })
        },
        /**
         * Text to send for error panel info config
         * @type {String}
         */
        errorPanelConfig: {
          type: String,
          value: 'glomo-profit-points-error-inactive-raffle-modal-text-one'
        },
        /**
         * Text to send for error panel info config
         * @type {String}
         */
        errorPanelFinalConfig: {
          type: String,
          value: 'glomo-profit-points-error-inactive-raffle-modal-text-one-final'
        },
        /**
         * Type of lamguage of page
         * @type {String}
         */
        language: {
          type: String
        }
      };
    }

    static get template() {
      return html``;
    }

    /**
     *Initialize the construction of the page
     */
    init() {
      this.sendTitleName();
      this.setAllCards();
    }

    /**
     * Reset the list items
     */
    reset() {
      this.titleNameRaffle = false;
      this.titleNameTransfer = false;
      this.titleName = '';
      this.postRedemptionSimulateRetriesNumber = 0;
      this.modalOpened = false;
      this._dispatchEvent('glomo-transfer-points-cards-list-title-name', this.titleName);
    }

    /**
     * Send text to be used in the header
     */
    sendTitleName() {
      this.titleNameTransfer ? this.set('titleName', this.nameTransfer) : this.set('titleName', this.nameRafle);
      this._dispatchEvent('glomo-transfer-points-cards-list-title-name', this.titleName);
      this.sendTitleAnalytics();
    }

    /**
     * Send text to be used in the level analytics
     */
    sendTitleAnalytics() {
      let title;
      if (this.titleNameTransfer) {
        title = 'transferir puntos';
      } else {
        title = 'sorteo';
      }
      this._dispatchEvent('glomo-transfer-points-cards-list-title-name-analytics', title);
    }

    /**
     * @desc Receive all disapatch events
     * @param {String} eventName
     * @param {Object} detail
     */
    _dispatchEvent(eventName, detail = {}) {
      this.dispatchEvent(new CustomEvent(eventName, {
        bubbles: true,
        composed: true,
        detail: detail
      }));
    }

    /**
     * @desc Send all cards with parsed
     * @param {String} eventName
     * @param {Object} detail
     */
    setAllCards() {
      const cards = [ ...this.allCards ];
      this.parsedCreditCards(cards);
      this.configCloseButton();
      const productsList = [ {
        headerTitle: this.t('glomo-transfer-points-cards-list-manager-origin-card', 'TARJETA DE ORIGEN').toUpperCase(),
        products: this.creditCards
      } ];
      this._dispatchEvent('glomo-transfer-points-cards-list-products-list', productsList);
    }

    /**
     * Credit card parsing as required for list of cards
     * @param {Array} data
     */
    parsedCreditCards(data) {
      let mapCreditCards = data.map(item => {
        return {
          id: this.c(item, 'id'),
          name: this.c(item, 'product.name'),
          primaryAmount: {
            amount: this.c(item, 'detail.rewards.0.nonMonetaryValue', 0),
            currency: '',
            label: this.t('glomo-transfer-points-cards-list-manager-available-points', 'Puntos disponibles'),
            decimalsHidden: true
          },
          imgSrc: this.c(item, 'detail.images.0.url'),
          status: this._getStatusCard(item),
          description: {
            masked: true,
            value: this.c(item, 'number')
          },
          linkedIds: [],
          detail: this.c(item, 'detail'),
          product: this.c(item, 'product')
        };
      });
      this.set('creditCards', mapCreditCards);

      this._dispatchEvent('credit-cards-mapped', this.creditCards);
    }

    /**
     * Return the status contract.
     * @param {Object} contract
     */
    _getStatusCard(contract) {
      const getStatus = this.statusCard[this._getStatusID(contract)];
      return getStatus && getStatus(this._getStatusName(contract)) || this.defaultStatusCard;
    }

    /**
     * Returns the status id
     * @param {Object} contract
     */
    _getStatusID(contract) {
      const statusId = this.get('status.id', contract);
      const cardStatus = statusId === 'OPERATIVE' && this._isCardOff(contract) ? 'OFF' : statusId;
      return cardStatus && cardStatus.toUpperCase();
    }

    /**
     * Returns the status name
     * @param {Object} contract
     */
    _getStatusName(contract) {
      const nameStatus = this.get('status.name', contract);
      return nameStatus && nameStatus.toUpperCase();
    }

    /**
     * Returns if card is off status
     * @param {Object} contract
     */
    _isCardOff(contract) {
      const activations = contract.detail?.activations;
      if (activations.length) {
        const activation = this._getActivationOnOff(activations);
        return activation && !activation.isActive;
      }
    }

    /**
     * Gets activation with activationId equal to 'ON_OFF'
     * @param {Array} activations
     */
    _getActivationOnOff(activations) {
      return (activations).find(activation => activation.id === 'ON_OFF');
    }

    /**
     * Decide from where the lottery will be executed depending on whether it is mono or multi product
     * @param {Object} card
     */
    decideWhichFunctionalityToGo(card) {
      if (this.c(card, 'product')) {
        this.set('selectedCard', { ...card && card.product });
        this._dispatchEvent('glomo-transfer-points-selected-card', this.selectedCard);
        this.titleNameTransfer ? this.navigateToPointsTransfer() : this.makeFlowPointsRaffle();
      }
    }

    /**
     *Configuration of modals in case of error when selecting the card
     */
    navigateToPointsTransfer() {
      if (this.c(this.selectedCard, 'status') !== 'operative') {
        if (this.c(this.selectedCard, 'status') === 'off') {
          this._dispatchEvent('open-profit-points-modal-off-card', {
            code: 'POINTS-TRANSFER-OFF',
            selectedConfig: {
              className: 'error ',
              openMaximized: false,
              iconOnlyFullHeight: true,
              acceptBtLabel: 'info-UNDERSTAND-accept',
              template: {
                type: 'paragraphs',
                values: [{
                  icon: 'coronita:alert',
                  iconClass: 'icon-size-24'
                },
                { title: 'alert-POINTS-TRANSFER-OFF-title', class: 'ul-li--text-center' },
                { text: 'alert-POINTS-TRANSFER-OFF-text'}
                ]
              }
            }
          });
          this.set('modalOpened', true);
        } else {
          this._dispatchEvent('open-profit-points-modal-inactive', {
            code: 'POINTS-TRANSFER-INACTIVE',
            selectedConfig: {
              className: 'error',
              openMaximized: false,
              iconOnlyFullHeight: true,
              acceptBtLabel: 'info-UNDERSTAND-accept',
              template: {
                type: 'paragraphs',
                values: [{
                  icon: 'coronita:alert',
                  iconClass: 'icon-size-24'
                },
                { title: 'alert-POINTS-TRANSFER-INACTIVE-title', class: 'ul-li--text-center' },
                { text: 'alert-POINTS-TRANSFER-INACTIVE-text' }
                ]
              }
            }
          });
        }
        this.set('modalOpened', true);
      } else if (this.c(this.selectedCard, 'detail.rewards.0.nonMonetaryValue') === 0) {
        this._dispatchEvent('open-profit-points-detail-modal-help', {
          code: 'POINTS-TRANSFER-DISCLAIMER',
          selectedConfig: {
            className: 'info',
            openMaximized: false,
            iconOnlyFullHeight: true,
            acceptBtLabel: 'info-UNDERSTAND-accept',
            template: {
              type: 'paragraphs',
              values: [{
                icon: 'coronita:info',
                iconClass: 'icon-size-24'
              },
              { title: 'alert-POINTS-TRANSFER-DISCLAIMER-title', class: 'ul-li--text-center' },
              { text: 'alert-POINTS-TRANSFER-DISCLAIMER-text' }
              ]
            }
          }
        });
        this.set('modalOpened', true);
      } else {
        this._dispatchEvent('glomo-transfer-points-send-selected-card', this.selectedCard);
        this._dispatchEvent('navigate-to-points-transfer', {
          page: 'pointsTransfer'
        });
      }
    }

    /**
     * Take flow for points raffle
     */
    makeFlowPointsRaffle() {
      this.requestNavigationRewardToPointsRaffle();
    }

    /**
     * Get current customer
     * @param {Object} customer
     */
    getCurrentCustomer(customer) {
      this.set('currentCustomer', this.c(customer, '0.firstName'));
    }

    /**
     * Request post redemption simulate service.
     */
    requestNavigationRewardToPointsRaffle() {
      const cardId = this.c(this.selectedCard, 'id');
      this._dispatchEvent('send-product-id', cardId);
      this.redemptionSimulateBody = {
        contract: {
          id: cardId
        },
        points: this.c(this.selectedCard, 'detail.rewards.0.nonMonetaryValue'),
        redemptionType: 'RAFFLE'
      };
      this._requestPostRedemptionSimulate();
    }

    /**
    * Function that opens and closes spinner
    * @param {Boolean} open
    */
    _openSpinner(open) {
      const event = open ? 'open-control-veil' : 'close-control-veil';
      this.dispatchEvent(new CustomEvent(event, {
        bubbles: true,
        composed: true
      }));
    }

    /**
     * Open control veil and request post redemption simulate service.
     * Increment post Redemption Simulate Retries Number
     * @event 'post_redemption_simulate_request'
     */
    _requestPostRedemptionSimulate() {
      this.postRedemptionSimulateRetriesNumber++;
      if (this.postRedemptionSimulateRetriesNumber === 3) {
        this.postRedemptionSimulateRetriesNumber = 0;
      } else {
        this._dispatchEvent('post-redemption-simulate-request', this.redemptionSimulateBody);
      }
    }

    /**
     * Parser and navigation to raffle points detail
     * @event 'close-control-veil'
     * @event 'navigation-reward-to-points-raffle-detail'
     * @event 'reward-to-points-raffle-detail'
     */
    postPointsRaffleResponse(detail) {
      if (detail && this.c(detail, 'raffle.ticket.maximumTicketsQuantity') !== 0) {
        let pointsRaffleDetailResponse = {
          titleTextCardAdvice: `${this.t('glomo-transfer-points-cards-list-manager-can-win-to', 'Puedes ganar hasta')} ${(this.c(detail, 'raffle.award')).toLowerCase()}`,
          textCardAdvice: `${this.currentCustomer}, ${this.t('glomo-transfer-points-cards-list-manager-imagine', 'imagínate ganar una o más transferencias electrónicas.')}`,
          mainDescriptionText: `${this.t('glomo-transfer-points-cards-list-manager-change-points', 'Usa tus Puntos BBVA para participar. Cada')} ${this.__commafy(this.c(detail, 'raffle.ticketValue').toString(), this.language)} ${this.t('glomo-transfer-points-cards-list-manager-change-points-end', 'puntos equivale a 1 participación.')}`,
          messageInfo: `${this.t('glomo-transfer-points-cards-list-manager-change-no-out', 'No te quedes fuera del')} ${this.c(detail, 'raffle.description')}. ${this.t('glomo-transfer-points-cards-list-manager-change-no-out-middle', 'Participa del')} ${this.c(detail, 'raffle.period.startDate')} ${this.t('glomo-transfer-points-cards-list-manager-change-no-out-end', 'al')} ${this.c(detail, 'raffle.period.endDate')}`,
          primaryAmountProductItem: { label: this.t('glomo-transfer-points-cards-list-manager-available-points', 'Puntos disponibles'), amount: this.c(this.selectedCard, 'detail.rewards.0.nonMonetaryValue') },
          firstKeyValuesKey: this.t('glomo-transfer-points-cards-list-manager-can-obtain', 'Puedes obtener hasta'),
          secondKeyValuesKey: this.t('glomo-transfer-points-cards-list-manager-participations-points', 'participaciones con tus Puntos BBVA'),
          firstKeyValuesValue: [ { amount: this.c(detail, 'raffle.ticket.maximumTicketsQuantity'), class: 'amount-huge', decimalsHidden: true } ],
          linkText: `${this.t('glomo-transfer-points-cards-list-manager-awards-and-bases', 'Premios y bases del sorteo')}`,
          nameProductItem: this.c(this.selectedCard, 'product.description') || this.c(this.selectedCard, 'alias') || this.c(this.selectedCard, 'name'),
          descriptionProductItem: { value: this.c(this.selectedCard, 'description.value'), masked: true }
        };
        this.postRedemptionSimulateRetriesNumber = 0;
        this.set('raffleSimulateResponse', this.c(detail, 'raffle'));
        this._dispatchEvent('close-control-veil');
        this._dispatchEvent('reward-to-points-raffle-detail', pointsRaffleDetailResponse);
        this._dispatchEvent('navigation-reward-to-points-raffe', { page: 'pointsRaffle' });
      } else {
        this._dispatchEvent('close-control-veil');
        this.postRedemptionSimulateRetriesNumber = 0;
        this._showInsufficientPointsRaffleErrorModal();
      }

    }

    /**
     * Show post redemtion simulate insufficient modal
     */
    _showInsufficientPointsRaffleErrorModal() {
      this._dispatchEvent('redemption-simulate-error', this._getInsufficientOrZeroModalConfig());
    }

    /**
     * Returns insufficient or zero modal configuration
     */
    _getInsufficientOrZeroModalConfig() {
      let points = this.c(this.redemptionSimulateBody, 'points');
      this._dispatchEvent(`analytics-redemption-simulate-error-${points > 0 ? 'points-insufficient' : 'points-zero'}`);
      return {
        code: 'REDEMPTION-SIMULATE-INSUFFICIENT-MODAL-OPERATIVE',
        selectedConfig: {
          className: 'info',
          openMaximized: false,
          iconOnlyFullHeight: true,
          acceptBtLabel: 'glomo-profit-points-insufficient-modal-ok',
          cancelFromHeaderEvent: 'cancel_from_Header',
          template: {
            type: 'paragraphs',
            values: [
              {
                icon: 'coronita:info',
                class: 'spacing',
                type: 'info'
              },
              { title: points > 0 ? 'glomo-profit-points-insufficient-modal-title' : 'glomo-profit-points-zero-modal-title' },
              { text: points > 0 ? 'glomo-profit-points-insufficient-modal-text' : 'glomo-profit-points-zero-modal-text' }
            ]
          }
        }
      };
    }

    /**
     * Button configuration for card list page
     */
    configCloseButton() {
      this._dispatchEvent('reward-origin-card-page-config-close-button', {
        buttons: {
          primary: {
            class: 'primary',
            text: 'rewards-origin-card-page-close-button',
            action: 'cells-confirm-button-click-primary-reward'
          }
        }
      });
    }

    /**
     * Close control veil, check retry request number and show error modal
     */
    postPointsRaffleError() {
      this._showPointsRaffleErrorModal(this.postRedemptionSimulateRetriesNumber < 2);
    }

    /**
     * Show post redemtion simulate error modal
     */
    _showPointsRaffleErrorModal(allowRetries) {
      if (!allowRetries) {
        this._openSpinner(false);
        this._dispatchEvent('bbva-loyalty-transaction-hidden-link', '');
        this._dispatchEvent('bbva-loyalty-transaction-send-button-name', 'Volver');
        const closeButton = ['footer-button', 'header-left-primary', 'footer-link'];
        this._dispatchEvent('bbva-loyalty-transaction-button-close', closeButton);
      } else {
        this._dispatchEvent('bbva-loyalty-transaction-send-button-name', 'Reintentar');
        this._dispatchEvent('bbva-loyalty-transaction-hidden-link', 'Volver');
      }
      this._dispatchEvent('raffle-open-modal-error');
      this.sendTexPanelInfo(allowRetries);
    }

    /**
    * Send text to be used in info panel
    */
    sendTexPanelInfo(allowRetries) {
      const text = allowRetries ? this.errorPanelConfig : this.errorPanelFinalConfig;
      this._dispatchEvent('redemption-simulate-error-text-panel-info', text);
    }

    /**
    * Try again to query the service
    */
    retryRequestPostRedemptionSimulateService() {
      if (this.postRedemptionSimulateRetriesNumber === 1) {
        this._openSpinner(true);
      }
      this._requestPostRedemptionSimulate();
    }

    /**
    * Reset number of attempts
    */
    setRetrieNumber() {
      this.postRedemptionSimulateRetriesNumber = 0;
    }

  }

  customElements.define(GlomoTransferPointsCardsListManager.is, GlomoTransferPointsCardsListManager);
}