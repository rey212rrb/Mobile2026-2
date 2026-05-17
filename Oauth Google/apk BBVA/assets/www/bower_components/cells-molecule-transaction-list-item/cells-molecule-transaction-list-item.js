/**
 *
 * # cells-molecule-transaction-list-item
 *
 * ![Certificated](https://img.shields.io/badge/certificated-yes-brightgreen.svg) ![Polymer 2.x](https://img.shields.io/badge/Polymer-2.x-green.svg)
 *
 * [Demo of component in Cells Catalog](https://catalogs.platform.bbva.com/cells)
 *
 * Shows an item from a list with a transaction detail.
 *
 * Example:
 * ```html
 * <cells-molecule-transaction-list-item></cells-molecule-transaction-list-item>
 * ```
 *
 * __data object__:
 * ```json
 *
 * {
 *   "id": "500A1114",
 *   "localAmount": {
 *     "amount": -80000,
 *     "currency": "CLP"
 *   },
 *   "originAmount": {
 *     "amount": -80000,
 *     "currency": "CLP"
 *   },
 *   "moneyFlow": {
 *     "id": "EXPENSE",
 *     "name": "Expense"
 *   },
 *   "concept": "Retirada en cajero",
 *   "transactionType": {
 *     "id": "PURCHASE",
 *     "name": "Compra"
 *   },
 *   "operationDate": "2016-07-16T13:33:00Z",
 *   "accountedDate": "2016-07-16T13:33:00Z",
 *   "financingType": {
 *     "id": "NON_FINANCING",
 *     "name": "Non financing"
 *   },
 *   "status": {
 *     "id": "SETTLED",
 *     "name": "Settled"
 *   },
 *   "contract": {
 *     "id": "2001",
 *     "number": "050400010100001603",
 *     "numberType": {
 *       "id": "LIC",
 *       "name": "Local Identification Code"
 *     },
 *     "product": {
 *       "id": "ACCOUNTS",
 *       "name": "Cuentas"
 *     },
 *     "alias": "Cuenta corriente lcred"
 *   },
 *   "tags": [
 *     "Banca"
 *   ],
 *   "additionalInformation": [
 *     {
 *       "key": "cells-molecule-transaction-list-item-card",
 *       "value": "050400010100001603",
 *       "type": "musked"
 *     },
 *     {
 *       "key": "cells-molecule-transaction-list-item-date",
 *       "value": "2016-07-16T13:33:00Z",
 *       "type": "date"
 *     },
 *     {
 *       "type": "text",
 *       "value": "Compra"
 *     },
 *     {
 *       "type": "icon-text",
 *       "value": {
 *         "icon": {
 *           "name": "coronita:shopping",
 *           "color": "var(--bbva-medium-blue)"
 *         },
 *         "text": "Clothes and Beauty"
 *       }
 *     }
 *   ]
 * }
 * ```
 *
 * ## Styling
 *
 * The following custom properties and mixins are available for styling:
 *
 * ### Custom Properties
 * | Custom Property                                                           | Selector                                                          | CSS Property     | Value                                                                           |
 * | ------------------------------------------------------------------------- | ----------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------- |
 * | --cells-fontDefault                                                       | :host                                                             | font-family      | sans-serif                                                                      |
 * | --cells-molecule-transaction-list-item-bg-color                           | :host                                                             | background-color | --bbva-white                                                                    |
 * | --cells-molecule-transaction-list-item-padding-top                        | :host                                                             | padding-top      | 1rem                                                                            |
 * | --cells-molecule-transaction-list-item-padding-bottom                     | :host                                                             | padding-bottom   | 1rem                                                                            |
 * | --cells-molecule-transaction-list-item-padding-left                       | :host                                                             | padding-left     | 1rem                                                                            |
 * | --cells-molecule-transaction-list-item-padding-right                      | :host                                                             | padding-right    | 1rem                                                                            |
 * | --cells-molecule-transaction-list-item-item-active-background-color       | :host(:active)                                                    | background-color | --bbva-100                                                                      |
 * | --cells-molecule-transaction-list-item-xl                                 | .default-status .additional-info__item .text.additional-space     | padding-top      | 1.5rem                                                                          |
 * | --bbva-600                                                                | .default-status .additional-info__item .text.text--default-medium | color            | ![#121212](https://placehold.it/15/121212/000000?text=+) #121212                |
 * | --bbva-core-blue                                                          | .unread-status::before                                            | border-left      | 0.25rem solid  ![#004481](https://placehold.it/15/004481/000000?text=+) #004481 |
 * | --multiline-ellipsis-line-height                                          | .text-ellipsis-1                                                  | line-height      | `No fallback value`                                                             |
 * | --multiline-ellipsis-line-height                                          | .text-ellipsis-1                                                  | max-height       | `No fallback value`                                                             |
 * | --multiline-ellipsis-line-height                                          | .text-ellipsis-2                                                  | line-height      | `No fallback value`                                                             |
 * | --multiline-ellipsis-line-height                                          | .text-ellipsis-2                                                  | max-height       | calc( * 2)                                                                      |
 * | --multiline-ellipsis-line-height                                          | .text-ellipsis-3                                                  | line-height      | `No fallback value`                                                             |
 * | --multiline-ellipsis-line-height                                          | .text-ellipsis-3                                                  | max-height       | calc( * 3)                                                                      |
 * | --cells-molecule-transaction-list-item-info-padding-right                 | .transaction-info                                                 | padding-right    | 1.25rem                                                                         |
 * | --cells-molecule-transaction-list-item-name-color                         | .transaction-name                                                 | color            | --bbva-600                                                                      |
 * | --cells-text-size-l                                                       | .transaction-name                                                 | font-size        | 1rem                                                                            |
 * | --cells-molecule-transaction-list-item-name-color                         | .transaction-name-disabled                                        | color            | ![#121212](https://placehold.it/15/121212/000000?text=+) #121212)               |
 * | --cells-text-size-l                                                       | .transaction-name-disabled                                        | font-size        | 1rem                                                                            |
 * | --cells-molecule-transaction-transaction-financeable-color                | .transaction-financeable                                          | color            | --bbva-light-blue                                                               |
 * | --cells-text-size-l                                                       | .transaction-financeable                                          | font-size        | 0.875rem                                                                        |
 * | --cells-molecule-transaction-transaction-status-color                     | .transaction-status                                               | color            | --bbva-darker-orange                                                            |
 * | --cells-molecule-transaction-transaction-status-color                     | .transaction-status.financed                                      | color            | --bbva-dark-medium-blue                                                         |
 * | --bbva-dark-medium-blue                                                   | .transaction-status.financing-status                              | background-color | ![#1973b8](https://placehold.it/15/1973b8/000000?text=+) #1973b8                |
 * | --bbva-white                                                              | .transaction-status.financing-status                              | color            | ![#fff](https://placehold.it/15/fff/000000?text=+) #fff                         |
 * | --bbva-darker-green                                                       | .transaction-status.financing-status-success                      | background-color | ![#277a3e](https://placehold.it/15/277a3e/000000?text=+) #277a3e                |
 * | --bbva-white                                                              | .transaction-status.financing-status-success                      | color            | ![#fff](https://placehold.it/15/fff/000000?text=+) #fff                         |
 * | --cells-margin-right                                                      | .transaction-status.financing-status-success                      | margin-right     | 1rem                                                                            |
 * | --cells-molecule-transaction-transaction-fulfillment-status-success-color | .transaction-status.fulfillment-status.success                    | color            | --bbva-darker-green                                                             |
 * | --cells-molecule-transaction-transaction-fulfillment-status-error-color   | .transaction-status.fulfillment-status.error                      | color            | --bbva-dark-red                                                                 |
 * | --cells-molecule-transaction-transaction-fulfillment-status-info-color    | .transaction-status.fulfillment-status.info                       | color            | --bbva-core-blue                                                                |
 * | --cells-molecule-transaction-transaction-fulfillment-status-warning-color | .transaction-status.fulfillment-status.warning                    | color            | --bbva-dark-yellow                                                              |
 * | --cells-molecule-transaction-transaction-fulfillment-status-expired-color | .transaction-status.fulfillment-status.expired                    | color            | --bbva-500                                                                      |
 * | --cells-text-size-xs                                                      | .balance .installments                                            | font-size        | 0.75rem                                                                         |
 * | --bbva-500                                                                | .balance .installments                                            | color            | ![#666](https://placehold.it/15/666/000000?text=+) #666                         |
 * | --cells-molecule-transaction-list-item-additional-info-color              | .additional-info__item                                            | color            | --bbva-500                                                                      |
 * | --cells-text-size-s                                                       | .additional-info__item                                            | font-size        | 0.8125rem                                                                       |
 * | --cells-molecule-transaction-list-item-additional-info-color              | .additional-info cells-atom-date                                  | color            | --bbva-500                                                                      |
 * | --cells-text-size-s                                                       | .additional-info cells-atom-date                                  | font-size        | 0.8125rem                                                                       |
 * | --cells-text-size-s                                                       | .additional-info__item--icon-text cells-atom-icon                 | font-size        | 0.8125rem                                                                       |
 * | --cells-text-size-s                                                       | .additional-info cells-atom-date--icon-text cells-atom-icon       | font-size        | 0.8125rem                                                                       |
 * | --cells-text-size-ml                                                      | :host .historical .additional-info__item                          | font-size        | 0.9375rem                                                                       |
 * | --cells-text-size-ml                                                      | :host .historical .transaction-status.fulfillment-status          | font-size        | 0.9375rem                                                                       |
 * | --bbva-300                                                                | :host(.wrapper-list-item:not(:last-of-type))                      | border-bottom    | 1px solid  ![#d3d3d3](https://placehold.it/15/d3d3d3/000000?text=+) #d3d3d3     |
 * | --cells-text-size-ml                                                      | :host(.wrapper-list-item) .default-status .additional-info__item  | font-size        | 0.9375rem                                                                       |
 * ### @apply
 * | Mixins                                                                                      | Selector                                                                             | Value |
 * | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ----- |
 * | --cells-molecule-transaction-list-item                                                      | :host                                                                                | {}    |
 * | --cells-molecule-transaction-list-item--focus                                               | :host(:focus)                                                                        | {}    |
 * | --cells-molecule-transaction-list-item-item-active                                          | :host(:active)                                                                       | {}    |
 * | --cells-molecule-transaction-list-item-default-status                                       | .default-status                                                                      | {}    |
 * | --cells-molecule-transaction-list-item-default-status-transaction-info                      | .default-status .transaction-info                                                    | {}    |
 * | --cells-molecule-transaction-list-item-default-status-transaction-name                      | .default-status .transaction-name                                                    | {}    |
 * | --cells-molecule-transaction-list-item-default-status-additional-info-item                  | .default-status .additional-info__item                                               | {}    |
 * | --cells-molecule-transaction-list-item-default-status-additional-info-item-text             | .default-status .additional-info__item .text                                         | {}    |
 * | --cells-molecule-transaction-list-item-default-status-additional-info-text-additional-space | .default-status .additional-info__item .text.additional-space                        | {}    |
 * | --cells-fontDefaultMedium                                                                   | .default-status .additional-info__item .text.text--default-medium                    | {}    |
 * | --cells-fontDefault-ml                                                                      | .default-status .additional-info__item .text.text--default-medium                    | {}    |
 * | --cells-molecule-transaction-list-item-default-status-additional-info-text-text--normal     | .default-status .additional-info__item .text.text--default-medium                    | {}    |
 * | --cells-molecule-transaction-list-item-default-status-additional-info-item-amount           | .default-status .additional-info__item .amount                                       | {}    |
 * | --cells-molecule-transaction-list-item-text-ellipsis-1                                      | .text-ellipsis-1                                                                     | {}    |
 * | --cells-molecule-transaction-list-item-text-ellipsis-2                                      | .text-ellipsis-2                                                                     | {}    |
 * | --cells-molecule-transaction-list-item-text-ellipsis-3                                      | .text-ellipsis-3                                                                     | {}    |
 * | --cells-molecule-transaction-list-item-info                                                 | .transaction-info                                                                    | {}    |
 * | --cells-molecule-transaction-list-item-info-divided                                         | .transaction-info--divided                                                           | {}    |
 * | --cells-molecule-transaction-list-item-info-divided-item-amount-minus-right                 | .transaction-info--divided .additional-info__item > --cells-atom-amount-minus-right: | {}    |
 * | --cells-molecule-transaction-list-item-info-divided-item                                    | .transaction-info--divided .additional-info__item                                    | {}    |
 * | --cells-molecule-transaction-list-item-info-divided-balance                                 | .transaction-info--divided + .balance                                                | {}    |
 * | --cells-molecule-transaction-list-item-name                                                 | .transaction-name                                                                    | {}    |
 * | --cells-molecule-transaction-list-item-name                                                 | .transaction-name-disabled                                                           | {}    |
 * | --cells-fontDefaultLight                                                                    | .transaction-financeable                                                             | {}    |
 * | --cells-molecule-transaction-transaction-financeable                                        | .transaction-financeable                                                             | {}    |
 * | --cells-fontDefaultNormalItalic                                                             | .transaction-status                                                                  | {}    |
 * | --cells-font-smoothing                                                                      | .transaction-status                                                                  | {}    |
 * | --cells-molecule-transaction-transaction-status                                             | .transaction-status                                                                  | {}    |
 * | --cells-molecule-transaction-transaction-financing-status                                   | .transaction-status.financing-status                                                 | {}    |
 * | --cells-molecule-transaction-transaction-financing-status-succes                            | .transaction-status.financing-status-success                                         | {}    |
 * | --cells-molecule-transaction-transaction-fulfillment-status                                 | .transaction-status.fulfillment-status                                               | {}    |
 * | --cells-molecule-transaction-list-item-balance                                              | .balance                                                                             | {}    |
 * | --cells-molecule-transaction-list-item-balance-amount                                       | .balance .balance__amount                                                            | {}    |
 * | --cells-molecule-transaction-list-item-updated-balance-amount                               | .balance .updated-balance__amount                                                    | {}    |
 * | --cells-molecule-transaction-list-item-updated-balance-amount-negative                      | .balance .updated-balance__amount.negative                                           | {}    |
 * | --cells-molecule-transaction-list-item-installments                                         | .balance .installments                                                               | {}    |
 * | --cells-molecule-transaction-list-item-balance-additional-info-item                         | .balance .additional-info__item                                                      | {}    |
 * | --cells-molecule-transaction-list-item-additional-info                                      | .additional-info                                                                     | {}    |
 * | --cells-molecule-transaction-list-item-additional-info-item                                 | .additional-info__item                                                               | {}    |
 * | --cells-molecule-transaction-list-item-additional-info-item                                 | .additional-info cells-atom-date                                                     | {}    |
 * | --cells-fontDefaultLight                                                                    | .additional-info__item--label                                                        | {}    |
 * | --cells-molecule-transaction-list-item-additional-info-label                                | .additional-info__item--label                                                        | {}    |
 * | --cells-fontDefaultLight                                                                    | .additional-info cells-atom-date--label                                              | {}    |
 * | --cells-molecule-transaction-list-item-additional-info-label                                | .additional-info cells-atom-date--label                                              | {}    |
 * | --cells-molecule-transaction-list-item-additional-info-label-empty                          | .additional-info__item--label.empty                                                  | {}    |
 * | --cells-molecule-transaction-list-item-additional-info-label-empty                          | .additional-info cells-atom-date--label.empty                                        | {}    |
 * | --cells-molecule-transaction-list-item-additional-info-icon-text                            | .additional-info__item--icon-text                                                    | {}    |
 * | --cells-molecule-transaction-list-item-additional-info-icon-text                            | .additional-info cells-atom-date--icon-text                                          | {}    |
 * | --cells-molecule-transaction-list-item-additional-info-icon                                 | .additional-info__item--icon-text cells-atom-icon                                    | {}    |
 * | --cells-molecule-transaction-list-item-additional-info-icon                                 | .additional-info cells-atom-date--icon-text cells-atom-icon                          | {}    |
 * | --cells-molecule-transaction-list-item-additional-info-text                                 | .additional-info__item--icon-text span                                               | {}    |
 * | --cells-molecule-transaction-list-item-additional-info-text                                 | .additional-info cells-atom-date--icon-text span                                     | {}    |
 * | --cells-molecule-transaction-list-item-additional-info-icon-message                         | .additional-info__item--icon-message                                                 | {}    |
 * | --cells-molecule-transaction-list-item-additional-info-icon-message                         | .additional-info cells-atom-date--icon-message                                       | {}    |
 * | --cells-molecule-transaction-list-item-additional-info-icon-message-margin                  | .additional-info__item--icon-message.margin-top                                      | {}    |
 * | --cells-molecule-transaction-list-item-additional-info-icon-message-margin                  | .additional-info cells-atom-date--icon-message.margin-top                            | {}    |
 * | --cells-molecule-transaction-list-item-only-additional-info-item                            | .additional-info__item                                                               | {}    |
 * | --cells-molecule-transaction-list-item-is-block                                             | :host([is-block])                                                                    | {}    |
 * | --cells-molecule-transaction-list-item-is-block-balance                                     | :host([is-block]) .balance                                                           | {}    |
 * | --cells-molecule-transaction-list-item-wrapper-list-item-not-last-of-type                   | :host(.wrapper-list-item:not(:last-of-type))                                         | {}    |
 * | --cells-molecule-transaction-list-item-wrapper-list-item-default-status                     | :host(.wrapper-list-item) .default-status                                            | {}    |
 * | --cells-fontDefaultLight                                                                    | :host(.wrapper-list-item) .default-status .amount-large                              | {}    |
 * | --cells-molecule-transaction-list-item-wrapper-list-item-amount-large                       | :host(.wrapper-list-item) .default-status .amount-large                              | {}    |
 * | --cells-fontDefaultMedium                                                                   | :host(.wrapper-list-item) .default-status .transaction-name                          | {}    |
 * | --cells-molecule-transaction-list-item-wrapper-list-item-transaction-name                   | :host(.wrapper-list-item) .default-status .transaction-name                          | {}    |
 * | --cells-fontDefaultLight                                                                    | :host(.wrapper-list-item) .default-status .additional-info__item                     | {}    |
 * | --cells-molecule-transaction-list-item-wrapper-list-item-additional-info-item               | :host(.wrapper-list-item) .default-status .additional-info__item                     | {}    |
 *
 * @polymer
 * @customElement
 * @summary shows an item from a list with a transaction detail
 * @extends {Polymer.Element}
 * @demo demo/index.html
 * @hero cells-molecule-transaction-list-item.png
 */
class CellsMoleculeTransactionListItem extends Polymer.mixinBehaviors([ CellsBehaviors.i18nBehavior ], Polymer.Element) {
  static get is() {
    return 'cells-molecule-transaction-list-item';
  }

  static get properties() {
    return {

      /**
       * Transaction information
       */
      transaction: {
        type: Object,
        observer: '_transactionObserver'
      },

      /**
       * ISO 4217 code for the location
       */
      localCurrency: String,

      /**
       * Format date of additional Info
       */
      formatDate: {
        type: String,
        value: 'DD/MM/YY'
      },

      /**
       * Default tag key
       * @type {String}
       */
      defaultTagKey: {
        type: String,
        value: ''
      },

      /**
       * Locale for date, additional Info
       */
      localeDate: String,

      /**
       * Transaction financiable
       */
      _transactionFinanceable: {
        type: String,
        computed: '_getTransactionFinanceable(transaction, defaultTagKey)'
      },

      /**
       * Updated balance
       */
      updatedBalance: {
        type: Object
      },

      /**
       * Hide transaction financing status
       */
      hideFinancingStatus: {
        type: Boolean,
        value: false
      },

      /**
       * Show transaction fulfillment status
       */
      showFulfillmentStatus: {
        type: Boolean,
        value: false
      },

      /**
       * Transaction fulfillment status visibility
       */
      _fulfillmentStatusVisible: {
        type: Boolean,
        computed: '_getFulfillmentStatusVisible(showFulfillmentStatus, _transactionStatus)'
      },

      /**
       * Transaction status
       */
      _transactionStatus: {
        type: String,
        computed: '_getTransactionStatus(transaction)'
      },

      /**
       * Transaction status for unread
       */
      _transactionUnreadStatus: {
        type: String,
        computed: '_getTransactionUnreadStatus(transaction)'
      },

      /**
       * Transaction status type
       */
      _transactionStatusType: {
        type: String,
        computed: '_getTransactionStatusType(transaction)'
      },

      /**
       * Transaction display type
       */
      _transactionDisplayType: {
        type: String,
        computed: '_getTransactionDisplayType(transaction)'
      },

      /*
       * Primary amount class: medium, large, huge, etc. Use the one you like as long it
       * is defined in a style sheet as amount-xxx where xxx is the type
       */
      primaryAmountClass: {
        type: String,
        value: 'amount-large'
      },

      /*
       * Secondary amount class
       */
      secondaryAmountClass: {
        type: String,
        value: 'amount-large'
      },

      /*
       * Max lines shown in description
       */
      descriptionMaxLines: {
        type: Number,
        value: 1
      },

      /**
       * Product type
       */
      productType: {
        type: String
      },

      /**
       * Product currency
       */
      currency: {
        type: String
      },

      /**
       * Transaction amount
       */
      transactionAmount: {
        type: Number,
        computed: '_computeTransactionAmount(productType, currency, transaction)'
      },

      /**
       * Transaction currency
       */
      transactionCurrency: {
        type: String,
        computed: '_computeTransactionCurrency(productType, currency, transaction)'
      },

      hiddenSeparator: {
        type: Boolean,
        value: false
      },

      /**
       * Transaction tap class
       */
      disableTapClass: {
        type: String,
        computed: '_getTransactionDisableTapClass(transaction)'
      },

      /**
       * Financing label class
       */
      financingLabelClass: {
        type: String,
        computed: '_getFinancingLabelClass(transaction)'
      },
      /**
       * Transaction list item block mode
       */
      isBlock: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      /**
      * Show the number of chars for mask the amount
      */
      maskedAmountNumberChars: {
        type: Number,
        value: 5,
        reflectToAttribute: true
      },
      /**
      * If true, then amount is masked
      */
      maskedAmount: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      /**
      * Option to hide balance
      */
      hideBalance: {
        type: Boolean,
        value: false,
      },
      /**
      * Custom Class for checkedType
      */
      checkedTypeText: {
        type: String
      },
      /**
      * Unread status
      */
      unreadStatus: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      /**
      * Flag to activate class
      */
      hidePobPromotion: {
        type: Boolean
      },
      /**
      * Returns class for visual component
      */
      pobPromotionLabelClass: {
        type: String,
        computed: '_setPobPromotionClass(hidePobPromotion)'
      },
      /**
      * Config additional benefits
      */
      pobPromotionLabelConfig: {
        type: Object,
        value: () => ({})
      }
    };
  }

  /**
   * Compute _setPobPromotionClass property
   */
  _setPobPromotionClass(hidePobPromotion) {
    return !hidePobPromotion ? 'flex-additional-benefits' : '';
  }

  /**
   * HTML helper method
   */
  _checkedType(type, value) {
    return type === value;
  }

  /**
   * HTML helper method
   */
  _checkedKey(key) {
    return key ? '' : 'empty';
  }

  /**
   * Compute _getTransactionDisableTapClass property
   */
  _getTransactionDisableTapClass(transaction) {
    let disableCanTap = !!(this.get('disableCanTap', transaction));
    return disableCanTap ? '-disabled' : '';
  }

  /**
   * Compute aria label property for concept
   */
  _computeAriaLabelConcept(item) {
    if (item) {
      return item?.concept?.toLowerCase();
    }
  }

  /**
   * Compute financingLabelClass property
   */
  _getFinancingLabelClass(transaction) {
    let financingType = this.get('financingType.id', transaction);
    if (financingType === 'FINANCED_AMOUNT_WITH_INTEREST' || financingType === 'PROMOTIONS_APPLIED' || financingType === 'PROMOTION_APPLIED') {
      return 'financing-status-success';
    } else {
      return this.get('financingType.id', transaction) === 'FINANCED_AMOUNT' ? 'financed' : 'financing-status';
    }
  }

  /**
   * Compute _transactionFinanceable property
   */
  _getTransactionFinanceable(transaction, defaultTagKey) {
    if (defaultTagKey) {
      return defaultTagKey;
    } else {
      let financingType = this.get('financingType.id', transaction);

      if (financingType === 'FINANCING_AVAILABLE') {
        return 'cells-molecule-transaction-list-item-financeable';
      }
      if (financingType === 'FINANCED_AMOUNT') {
        return 'cells-molecule-transaction-list-item-financed';
      }
      if (financingType === 'FINANCED_AMOUNT_WITH_INTEREST') {
        this.hideFinancingStatus = false;
        return 'cells-molecule-transaction-list-item-financed-with-interest';
      }
      if (financingType === 'PROMOTIONS_APPLIED') {
        this.hideFinancingStatus = false;
        return 'cells-molecule-transaction-list-item-financed-promotion-applied';
      }
      if (financingType === 'PROMOTION_APPLIED') {
        this.hideFinancingStatus = false;
        return 'cells-molecule-transaction-list-item-financed-promotions-applied';
      }
    }
    return '';
  }

  /**
   * Compute _transactionStatus property
   */
  _getTransactionStatus(transaction) {

    /*eslint no-shadow: "error"*/
    const { status } = transaction;
    if (status) {
      const types = {
        PENDING: 'cells-molecule-transaction-list-item-pending'
      };
      return status.description || types[ status.id ] || '';
    }
    return '';

  }

  /**
   * Compute _transactionUnreadStatus property
   */
  _getTransactionUnreadStatus(transaction) {
    const { readStatus } = transaction;
    this.unreadStatus = readStatus;
    return readStatus ? 'unread-status' : 'default-status';
  }

  /**
   * Compute _transactionStatusType property
   */
  _getTransactionStatusType(transaction) {
    let financingType = this.get('financingType.id', transaction);
    let statusId = (transaction.status || {}).id || '';
    if (financingType === 'FINANCED_AMOUNT_WITH_INTEREST' || financingType === 'PROMOTIONS_APPLIED' || financingType === 'PROMOTION_APPLIED' || statusId === 'PENDING') {
      return 'financed';
    } else {
      const statusType = (transaction.status || {}).type || '';
      return statusType;
    }
  }

  /**
  * Compute _transactionDisplayType property
  */
  _getTransactionDisplayType(transaction) {
    return transaction.displayType || '';
  }

  /**
   * Observer method for transaction property
   */
  _transactionObserver() {
    let updatedBalance;
    if (this.transaction.additionalInformation) {
      updatedBalance = (this.transaction.additionalInformation.find((a) => a.type === 'updatedBalance') || {}).value;
    }
    this.set('updatedBalance', updatedBalance);
  }

  /**
   * Compute _fulfillmentStatusVisible property
   */

  _getFulfillmentStatusVisible() {
    return this.showFulfillmentStatus && this._transactionStatus;
  }

  /**
   * Compute transaction amount
   */
  _computeTransactionAmount(productType, currency, transaction = {}) {
    const originAmount = transaction.originAmount;

    if (productType === 'fund' && originAmount && currency !== this.localCurrency) {
      return originAmount;
    }
    if (productType === 'vouchers') {
      return this.get('localAmount.amount', transaction) ? this.get('localAmount', transaction) : {};
    }
    return transaction.localAmount || {};
  }

  /**
  * Compute transaction currency
  */
  _computeTransactionCurrency(productType, currency, transaction = {}) {
    if (productType === 'vouchers') {
      if (this.get('localAmount.amount', transaction)) {
        this.set('hiddenSeparator', false);
        return this.get('localAmount.currency', transaction) || currency;
      } else {
        this.set('hiddenSeparator', true);
        return null;
      }
    }
    return this.get('localAmount.currency', transaction) || currency;
  }
}
customElements.define(CellsMoleculeTransactionListItem.is, CellsMoleculeTransactionListItem);
