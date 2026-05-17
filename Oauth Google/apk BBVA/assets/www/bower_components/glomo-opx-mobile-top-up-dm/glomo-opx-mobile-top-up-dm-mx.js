/* global GlomoOpxMobileTopUpDm */
/* global moment */
/*eslint new-cap: [2, {"capIsNewExceptions": ["GlomoOpxMobileTopUpDm", "GlomoFeedbackBehavior"]}]*/
class GlomoOpxMobileTopUpDmMx extends
  Polymer.mixinBehaviors([
    CellsBehaviors.i18nBehavior,
    CellsBehaviors.StepManagerBehavior,
    CellsBehaviors.GlobalProductsListsBehavior,
    CellsBehaviors.CellsCheckNestedKeysBehavior,
  ], GlomoOpxMobileTopUpDm) {

  static get is() {
    return 'glomo-opx-mobile-top-up-dm-mx';
  }

  static get properties() {
    return {
      /**
       * Accounts data parsed
       */
      parsedAccounts: {
        type: Array,
        value: () => []
      },
      /**
      * Customer phone number from global channel
      */
      _customerNumber: {
        type: String,
        value: ''
      },
      /**
      * Account to topup
      */
      selectedAccount: {
        type: Object,
        value: () => ({})
      },
      /**
      * Body formed to save a contact
      */
      _formBody: {
        type: Object,
        value: () => ({})
      },
      /**
      * Provider id
      */
      _provider: {
        type: String,
        value: ''
      },
      /**
       * Contact already exists
       */
      _existingContact: {
        type: Object,
        value: () => ({})
      },
      /**
      * Properties to step2 "Recipient"
      */
      _configRecipientModal: {
        type: Object,
        value: () => ({})
      },
      /**
      * Phone number
      */
      _phoneNumber: {
        type: String,
        value: ''
      },
      /**
      * Contacts from contacts agenda
      */
      _contactsMobile: {
        type: Object,
        value: () => ({}),
      },
      /**
      * The email linked to the account is saved
      */
      accountEmail: {
        type: String,
        value: ''
      },
      /**
       * Customer info contains customer id and customer name
       * @type {Object}
       */
      customerInfo: {
        type: Object,
        value: () => ({})
      },
      /**
       * Show spinner
       */
      showSpinner: {
        type: Boolean,
        value: false
      },
      /**
       * Flag for changes on steps
       */
      _stepChanged: {
        type: Boolean,
        value: false
      },
      /**
       * Amount to top up
       */
      _selectedAmount: {
        type: Number,
        value: 0
      },
      /**
       * Default amounts for enter amount step
       */
      defaultAmounts: {
        type: Array,
        value: () => []
      },
      /**
       * Indicates if contact added with success to setup recipient with message
       */
      _addContactSuccess: {
        type: Boolean,
        value: false
      }
    };
  }

  /**
   * Reset method
   * @event reset-product-selector
   * @event reset-recipient-selector
   * @event reset-provider-id
   * @event reset-enter-amount
   * @event hide-discount-info-message
   * @event on-reset
   */
  reset() {
    this.canExecute = false;
    this._selectedAmount = 0;
    this._stepChanged = false;
    this._addContactSuccess = false;
    this.resetWithDefaultSettings();
    this.set('_formBody', {});
    this.hideAmountInfomessage();
    this._dispatchCustomEvent('reset-product-selector');
    this._dispatchCustomEvent('reset-recipient-selector');
    this._dispatchCustomEvent('reset-provider-id', '');
    this._dispatchCustomEvent('reset-enter-amount');
    this._dispatchCustomEvent('on-reset');
  }


  /* -------------------------------------------------------------------------- */
  /*                                Initialize                                  */
  /* -------------------------------------------------------------------------- */

  /**
   * Method that is executed initially
   */
  init() {
    this._setAccount();
    this._spinner(this.showSpinner);
    this._getCustomerEmail();
    this._setDefaultAmounts();
  }

  /* -------------------------------------------------------------------------- */
  /*                                Set steps                                   */
  /* -------------------------------------------------------------------------- */

  /**
   * Set accounts for products step
   * Validates if client has just 1 account and if the account does not have money
   * @event set-properties
   * @event only-one-selected
   * @event set-accounts
   */
  _setAccount() {
    let availableNotAccount = true;
    this.parsedAccounts.forEach((element) => {
      if (this.c(element, 'primaryAmount.amount') < 1) {
        element.disabled = true;
        element.errorMessage = 'mobile-top-up-insufficient-balance-for-this-operation';
      } else {
        availableNotAccount = false;
      }
    });
    if (availableNotAccount) {
      const properties = {
        showErrorTextMessage: true,
        showErrorProductsItem: true,
        frequentOperation: true,
        products: this.parsedAccounts
      };
      this._dispatchCustomEvent('set-properties-insufficient-balance-accounts', properties);
    } else {
      this._dispatchCustomEvent('set-accounts', this.parsedAccounts);
      if (this.parsedAccounts.length === 1) {
        this._dispatchCustomEvent('only-one-selected', this.get('0', this.parsedAccounts));
        this._dispatchCustomEvent('set-properties', { collapsed: true, selected: this.get('0', this.parsedAccounts), fixed: true });
      }
    }
  }

  /**
   * Set default amounts when operation starts
   * @event set-default-amounts
   */
  _setDefaultAmounts() {
    this._dispatchCustomEvent('set-default-amounts', this.defaultAmounts);
  }

  /**
   * Set users phone number
   * @param {Object} detail
   */
  setCustomerPhoneNumber(detail) {
    if (typeof detail === 'string' && detail.length === 10) {
      this._customerNumber = detail;
    } else {
      this._customerNumber = this.get('userId', detail);
    }
  }

  /**
   * Dispatch event to get customer email
   */
  _getCustomerEmail() {
    if (this.accountEmail === '') {
      this._dispatchCustomEvent('get-customer-email');
    }
  }

  /**
   * Parse phone number for grouping and displaying it
   * @param {String} number
   * @returns {String}
   */
  _parsePhoneNumber(number) {
    const regexPhone = /(\d{2})(\d{4})(\d{4})/g;
    return number.replace(regexPhone, '$1 $2 $3');
  }

  /**
   * Function that sets top up info in 2nd step
   * @event set-selected-properties
   * @event recipient-completed
   */
  setRecipientSelected() {
    const company = this.c(this._formBody, 'company.ariaLabel', '').toLowerCase().replace(/^./, (match) => match.toUpperCase());
    const number = this._parsePhoneNumber(this._formBody?.number);
    const recipient = {
      recipientSelected: {
        avatar: true,
        name: this._formBody?.name,
        phoneNumber: number,
        productType: {
          id: 'PHONE'
        },
        listItems: [
          { description: this._formBody?.aliasName },
          { description: number, class: 'descriptionColor' },
          { description: company }
        ],
        saving: this._addContactSuccess
      },
      registeredOperationShown: this._addContactSuccess
    };
    this._dispatchCustomEvent('set-selected-properties', recipient);
    this._dispatchCustomEvent('recipient-completed');
  }

  /**
   * Method to dispatch event with detail to show registered contact message to step 2
   */
  showRegisteredMessageRecipient()                                                                                                                                                        {
    this._dispatchCustomEvent('show-registered-contact-message', this._addContactSuccess);
  }

  /**
   * Set the formBody and send it in event detail
   * @param {*} formBody
   * @event set-provider-id
   */
  setFormBody(formBody) {
    this.set('_formBody', formBody);
    this.setRecipientSelected();
    this._provider = this.c(this._formBody, 'company.id');
    this._dispatchCustomEvent('set-provider-id', this._provider);
    if (this._stepChanged) {
      this._dispatchCustomEvent('change-amount');
      this._stepChanged = false;
    }
  }

  /**
   * Reset formBody mobile top up recipient
   * @event is-existing-contact
   * @event change-alias-form-body
   */
  resetExistingContact() {
    this.set('_existingContact', {});
    this._dispatchCustomEvent('is-existing-contact', this._existingContact);
    this._dispatchCustomEvent('change-alias-form-body', {});
  }

  /**
   * Set elements for 2nd step modal for myNumber
   * @event header-title
   * @event set-properties-for-modal
   * @event open-modal
   */
  setMyNumberConfigModal() {
    const myNumber = {
      isVisibleAvatar: true,
      isVisibleSelectModal: true,
      companyInputRequired: true,
      isVisibleButton: true,
      isFormButtonDisabled: false,
      titleSelectModal: 'mobile-top-up-company-label',
      className: '',
      isVisibleDescription: true,
      infoToggle: true,
      infoLowerMessage: 'mobile-top-up-info-lower-message',
      infoTypeLowerMessage: 'info-dark',
      infoIconLowerMessage: 'coronita:info',
      formDescription: 'mobile-top-up-form-description',
      descriptionInfoCheckbox: 'mobile-top-up-save-contact-checkbox',
      contactInfoCheckbox: 'mobile-top-up-info-checkbox',
      labelForMe: 'mobile-top-up-my-number',
      phoneNumber: this._parsePhoneNumber(this._customerNumber),
      recipientName: this.t('mobile-top-up-my-number'),
      phoneNumberClass: 'light-grey'
    };
    this.set('_configRecipientModal', {myNumber});
    this._dispatchCustomEvent('set-properties-for-modal-my-number', myNumber);
    this._dispatchCustomEvent('header-title', 'mobile-top-up-company-label');
    this._dispatchCustomEvent('open-modal', true);
  }

  /**
   * Check if the contacts list has been already filled
   * @event request-saved-contacts
   */
  verifyContacts(recievedPhoneNumber) {
    this._phoneNumber = recievedPhoneNumber;
    if (Object.keys(this._contactsMobile).length === 0) {
      this._spinner(true);
      this._dispatchCustomEvent('request-saved-contacts');
    } else {
      this.setContacts(this.get('_contactsMobile'));
    }
  }

  /**
   * Set contacts from service response
   * @param {Array} response
   */
  setContacts(response) {
    this.set('_contactsMobile', response);
    if (this._phoneNumber === null) {
      this._setPropertiesContactsAgenda();
    } else {
      this._lookNumberInContacts();
    }
  }

  /**
   * This method set properties to show contacts agenda
   * @event send-contacts-request
   * @event header-title-contacts
   */
  _setPropertiesContactsAgenda() {
    this._dispatchCustomEvent('send-contacts-request', this._contactsMobile);
    this._dispatchCustomEvent('header-title-contacts', 'mobile-top-up-recipient-saved');
  }

  /**
   * Filters number from contacts book response
   * If is an existing contact then show modal
   * @event open-alert-manager-modal
   */
  _lookNumberInContacts() {
    const contactList = this._contactsMobile;
    for (const contact of Object.values(contactList)) {
      if (Object.prototype.hasOwnProperty.call(contact, 'contactsInformation')) {
        let index = contact.contactsInformation.findIndex((element) => element.value === this._phoneNumber);
        if (index !== -1) {
          this.set('_existingContact', contact);
          this.set('_existingContact.contactsInformation', contact.contactsInformation.filter((element) => element.value === this._phoneNumber));
          let infoTextWithHeadingMobile = {
            code: 'FOUND-NUMBER-MODAL-MOBILE-TOP-UP',
            primaryButtonClass: 'primary',
            textWithIcon: 'text-with-no-icon',
            selectedConfig: {
              className: 'avatarItemClass mobile-top-up',
              openMaximized: true,
              title: 'mobile-top-up-phone-number',
              acceptBtLabel: 'mobile-top-up-continue',
              cancelBtLabel: 'mobile-top-up-look-another',
              showAvatar: true,
              showAvatarIcon: true,
              template: {
                type: 'paragraphs',
                values: [
                  {
                    iconClass: 'icon-size-24',
                    class: 'full',
                    icon: 'coronita:correct',
                    message: 'mobile-top-up-recipient-already-saved',
                    heading: '',
                    type: 'success'
                  }
                ]
              },
              avatarMain: this.c(this._existingContact, 'alias'),
              avatarItemList: [
                { values: 'blue-title-avatar' },
                { title: this.c(this._existingContact, 'person.firstName'), class: 'light-grey' },
                { title: this._parsePhoneNumber(this.get('contactsInformation.0.value', this._existingContact)) },
                { title: this.c(this._existingContact, 'contactsInformation.0.contactType.mobileCompany.name') }
              ]
            }
          };
          this._dispatchCustomEvent('open-alert-manager-modal', infoTextWithHeadingMobile);
          break;
        }
      }
    }
  }

  /**
   * Set elements for 2nd step modal for newNumber
   * @event header-title'
   * @event set-properties-for-modal'
   * @event open-modal'
   */
  setNewContactConfigModal() {
    const newContact = {
      id: 'complex',
      icon: 'coronita:myprofile',
      isVisibleDescription: true,
      formDescription: 'mobile-top-up-new-contact-title',
      isVisibleInputNumber: true,
      isVisibleSelectModal: true,
      isVisibleButton: true,
      isFormButtonDisabled: false,
      isVisibleInputName: true,
      isVisibleInputAlias: true,
      isVisibleCheckbox: true,
      titleSelectModal: 'mobile-top-up-company-label',
      numberInputRequired: true,
      nameInputRequired: true,
      companyInputRequired: true,
      descriptionInfoCheckbox: 'mobile-top-up-save-contact-checkbox',
      contactInfoCheckbox: 'mobile-top-up-info-checkbox'
    };
    this.set('_configRecipientModal', {newContact});
    this._dispatchCustomEvent('set-properties-for-modal-new-contact', newContact);
    this._dispatchCustomEvent('header-title', 'mobile-top-up-alias-in-use-title');
    this._dispatchCustomEvent('open-modal', true);
  }

  /**
   * Get phone number from mobile agenda
   * @param {Array} contact
   * @event set-input-contact
   */
  getNumberFromAgenda(contact) {
    if (contact) {
      const { phoneNumber } = contact;
      this._dispatchCustomEvent('set-input-contact', { id: '#phoneNumberInput', value: this._parsePhoneNumber(phoneNumber) });
    }
  }

  /**
   * Verify if alias already exists in contacts list
   * @param {Object} formBody
   * @event is-existing-contact
   * @event set-form-body-add-number
   * @event clean-inputs-contact
   */
  verifyAlias(formBody) {
    this.set('_formBody', formBody);
    const contactList = this._contactsMobile;
    const alias = this.get('aliasName', this._formBody).trim();
    if (Array.isArray(contactList)) {
      for (const contact of contactList) {
        if (contact.alias === alias) {
          this.set('_existingContact', contact);
          this._dispatchCustomEvent('is-existing-contact', this._existingContact);
          break;
        }
      }
    }
    if (Object.entries(this._existingContact).length !== 0) {
      this._openAlertModalAliasInUse();
      this._dispatchCustomEvent('set-form-body-add-number', formBody);
    } else {
      this._addContacts(this._formBody);
      this._dispatchCustomEvent('clean-inputs-contact');
    }
  }

  /**
   * Set contact information in an object
   * @param {Object} params
   * @event add-new-contact
   * @event new-number-add-contact-selected
   */
  _addContacts(params) {
    const company = this.c(params, 'company');
    const name = this.c(params, 'name');
    const number = this.c(params, 'number');
    const alias = this.c(params, 'aliasName');

    const contactInfo = {
      alias,
      person: {
        firstName: name
      },
      favourite: false,
      contactsInformation: [
        {
          contactType: {
            id: 'MOBILE_NUMBER',
            name: this.t('mobile-top-up-phone-number'),
            mobileCompany: {
              id: this.c(company, 'id'),
              name: this.c(company, 'name')
            }
          },
          value: number,
          additionalInformation: this.t('mobile-top-up-additional-information'),
          operatives: [
            {
              id: 'MOBILE_TOP_UP',
              isActive: true
            }
          ],
          favourite: false
        }
      ]
    };
    this._dispatchCustomEvent('new-number-add-contact-selected', params);
    this._dispatchCustomEvent('add-new-contact', contactInfo);
  }

  /**
   * Function manage send email confirmation saved contact and show message on contact saved successful
   * @param {Boolean} success
   */
  addContactSuccess(success) {
    this._addContactSuccess = success;
    if (this._addContactSuccess) {
      const body = {
        customerName: this.customerInfo?.customerName || '',
        bank: {
          name: this._formBody.company?.name,
          id: this._provider
        },
        displayNumber: this._phoneNumber
      };
      this._emailConfirmationSavedContact(body);
    }
  }

  /**
   * Set message event when saving a contact
   * @param {String} showText
   * @event set-show-message
   * @event set-show-message-icon
   * @event show-message
   */
  setAndShowMessageSavingContact(showText) {
    const messageProperties = {
      message: showText,
      icon: 'coronita:correct',
      iconSize: 22
    };
    this._dispatchCustomEvent('set-show-message', messageProperties);
    this._dispatchCustomEvent('show-message');
  }

  /**
   * Set email confirmation when adding a contact
   * @param {Object} contactDetail
   * @event request-operation-registries
   */
  _emailConfirmationSavedContact(contactDetail) {
    let sendNotificationBody = {};
    const nameLength = this.c(contactDetail, 'customerName');
    const name = nameLength + Array(62 - nameLength.length + 1).join(' ');

    const destinationLength = this.c(contactDetail, 'bank.name');
    const destination = destinationLength + Array(35 - destinationLength.length + 1).join(' ');

    const numberLength = this.c(contactDetail, 'displayNumber');
    const number = numberLength + Array(35 - numberLength.length + 1).join(' ');

    const date = moment().format('YYYY-MM-DD');
    const localhour = moment();
    const hour = localhour.hour() + '' + localhour.minutes() + '' + localhour.seconds();

    const messageBody1 = 'MBANKS10Registro de operación                             #$CUSTOMER$#';
    const messageBody2 = 'TRIZ                                                              ';
    const messageBody3 = '****MXP 00000000000000000                    107                 #$FOLIOR$#';
    const messageBody4 = '0';
    const messageBody5 = 'BANMOVIL';
    const messageList = [name, destination, messageBody2, number, messageBody3, date, messageBody4, hour, messageBody5];
    const message =  messageBody1.concat(...messageList);

    sendNotificationBody = {
      eventCode: '0000000140',
      customExternalReference: this.c(this.customerInfo, 'customerId', ''),
      destinationType: {
        id: 'REGISTERED',
        name: 'REGISTERED'
      },
      destinationMail: this.accountEmail,
      templateCode: 'KZCA0101',
      messageBody: message
    };
    this._dispatchCustomEvent('request-operation-registries', sendNotificationBody);
  }

  /**
   * Function to show message and close spinner on operations registry response
   */
  closeOperationRegistries() {
    this.setAndShowMessageSavingContact('mobile-top-up-save-contact');
    this._spinner(false);
  }

  /**
   * Set elements for save contact modal
   * @param {Object} contact
   * @event reset-mobile-top-up-recipient
   * @event header-title
   * @event set-properties-for-modal
   * @event open-modal
   */
  setSaveContactConfigModal(contact) {
    if (!contact.itemSelected.name) {
      const contactFound = {
        phoneNumber: '',
        isVisibleInputNumber: false,
        isVisibleInputName: false,
        isVisibleInputAlias: false,
        isVisibleButton: true,
        isVisibleAvatar: true,
        isVisibleSelectModal: true,
        infoToggle: true,
        infoLowerMessage: 'mobile-top-up-info-lower-message',
        infoTypeLowerMessage: 'info',
        infoIconLowerMessage: 'coronita:info',
        titleSelectModal: 'mobile-top-up-company-label',
        isVisibleDescription: true,
        numberInputRequired: false,
        nameInputRequired: false,
        companyInputRequired: true,
        formDescription: 'mobile-top-up-form-description',
        isVisibleCheckbox: false,
        contactInfoCheckbox: '',
        completedInfo: [ { 'title': contact.contactName, class: 'light-grey', 'description': contact.inputValue } ]
      };
      this.set('_configRecipientModal', {contactFound});
      contact.contactSubtitle = this.c(this._configRecipientModal, 'contactFound.completedInfo');
      this._dispatchCustomEvent('reset-mobile-top-up-recipient');
      this._dispatchCustomEvent('header-title', 'mobile-top-up-company-label');
      this._dispatchCustomEvent('set-properties-for-modal-save-contact', contactFound);
      this._dispatchCustomEvent('open-modal', true);
    }
  }

  /**
   * Set permissions
   * @event set-permission-type
   */
  setPermissionType() {
    this._dispatchCustomEvent('set-permission-type', 'read-contacts');
  }

  /**
   * Function to verify if the contact found has already company saved
   * @event new-number-already-in-contacts-with-company-selected
   */
  verifyContactFound() {
    if (this.c(this._existingContact, 'contactsInformation.0.contactType.mobileCompany') !== undefined) {
      let nameCompany = this.c(this._existingContact, 'contactsInformation.0.contactType.mobileCompany.name').toLowerCase();
      nameCompany = nameCompany.replace(/^./, nameCompany[0].toUpperCase());
      const formBody = {
        aliasName: this.c(this._existingContact, 'alias'),
        name: this.c(this._existingContact, 'person.firstName'),
        number: this.c(this._existingContact, 'contactsInformation.0.value'),
        company: {
          id: this.c(this._existingContact, 'contactsInformation.0.contactType.mobileCompany.id'),
          name: nameCompany,
          ariaLabel: this.c(this._existingContact, 'contactsInformation.0.contactType.mobileCompany.name')
        }
      };
      this._dispatchCustomEvent('new-number-already-in-contacts-with-company-selected', formBody);
    } else {
      this.setContactFoundConfigModal();
    }
  }

  /**
   * Set elements for contact found modal
   * @param {Object} contact
   * @event reset-mobile-top-up-recipient
   * @event header-title
   * @event set-properties-for-modal
   * @event open-modal
   */
  setContactFoundConfigModal() {
    const contactFound = {
      phoneNumber: this._parsePhoneNumber(this.get('contactsInformation.0.value', this._existingContact)),
      isVisibleInputNumber: false,
      isVisibleInputName: false,
      isVisibleInputAlias: false,
      isVisibleButton: true,
      isFormButtonDisabled: false,
      isVisibleAvatar: true,
      isVisibleSelectModal: true,
      infoToggle: true,
      infoLowerMessage: 'mobile-top-up-info-lower-message',
      infoTypeLowerMessage: 'info-dark',
      infoIconLowerMessage: 'coronita:info',
      titleSelectModal: 'mobile-top-up-company-label',
      className: '',
      isVisibleDescription: true,
      numberInputRequired: false,
      nameInputRequired: false,
      companyInputRequired: true,
      formDescription: 'mobile-top-up-form-description',
      isVisibleCheckbox: false,
      contactInfoCheckbox: '',
      recipientName: this.c(this._existingContact, 'person.firstName'),
      aliasName: this._existingContact.person?.firstName,
      avatarName: this._existingContact?.alias,
      phoneNumberClass: ''
    };
    this.set('_configRecipientModal', {contactFound});
    this._dispatchCustomEvent('reset-mobile-top-up-recipient');
    this._dispatchCustomEvent('header-title', 'mobile-top-up-company-label');
    this._dispatchCustomEvent('set-properties-for-modal-contact-found', contactFound);
  }

  /**
   * Set companies for 2nd step
   * @param {Array} companies
   * @event set-modal-companies
   */
  setCompanies(companies) {
    this._spinner(false);
    this._dispatchCustomEvent('set-modal-companies', companies);
  }

  /**
   * Dispatch prevent close on company selected
   * @event prevent-close-company-selected
   */
  preventCloseOnCompanySelected() {
    this._dispatchCustomEvent('prevent-close-company-selected', true);
  }

  /**
   * Set amounts dinamically given the provider
   * @param {Array} amounts
   * @event set-properties-amount
   */
  setAmountCompanySelected(amounts) {
    const showMessageCompany = this.c(this._formBody, 'company.id') === '01';
    let properties = {};
    if (showMessageCompany) {
      properties = {
        amounts: amounts,
        maxProduct: this.c(this.selectedAccount, 'primaryAmount.amount'),
        discountInfoMessage: this.t('mobile-top-up-enter-message-description-telcel'),
        showClassIconMessage: 'same-padding message-icon above-input-icon-message collapsed-info-box-icon-message',
        showButtonTextIconMessage: this.t('mobile-top-up-enter-message-button-telcel'),
      };
    } else {
      properties = {
        amounts: amounts,
        maxProduct: this.c(this.selectedAccount, 'primaryAmount.amount'),
      };
    }
    this._dispatchCustomEvent('set-properties-amount', properties);
  }

  /**
   * Set the selected operation
   * @param {*} amountProvider
   * @event set-operation-amount
   * @event set-product
   */
  setOperation(amountProvider) {
    this._selectedAmount = amountProvider;
    let operation = {
      amount: {
        amount: amountProvider,
        currency: 'MXN'
      }
    };
    this._dispatchCustomEvent('set-operation-amount', amountProvider);
    this._dispatchCustomEvent('set-product', operation);
  }

  /* -------------------------------------------------------------------------- */
  /*                                Steps management                            */
  /* -------------------------------------------------------------------------- */

  /**
   * Go to next step
   * @param {Number} step
   */
  goToStep(step) {
    const stepToNavigate = this._steps[step.currentStep];
    if (stepToNavigate) {
      stepToNavigate.collapsed =
      stepToNavigate.productsListTitle === 'cells-step-recipient-selector-account-list-title' && stepToNavigate.collapsed;
      this.toggleCollapsedView(stepToNavigate);
      this._activateSteps(stepToNavigate);
    }
  }

  /**
   * Method to manage change on steps
   * @param {*} step
   * @event set-properties-enter-amount
   */
  changedStep(step) {
    const stepTagName = step.tagName;
    if (stepTagName !== 'CELLS-STEP-PRODUCT-SELECTOR') {
      this._stepChanged = true;
      this._selectedAmount = 0;
      const properties = {
        enableAmountGroupButton: false,
        valueSelected: undefined,
        collapsed: false,
        active: stepTagName === 'CELLS-STEP-ENTER-AMOUNT',
        showClassIconMessage: 'same-padding message-icon above-input-icon-message collapsed-info-box-icon-message'
      };
      this._dispatchCustomEvent('set-properties-enter-amount', properties);
    }
    this._manageStateSteps(step);
    this.canExecute = false;
  }

  /**
   * Dispatch close button event
   * @event close-btn
   */
  setBackButton() {
    this._dispatchCustomEvent('close-btn', false);
  }

  /* -------------------------------------------------------------------------- */
  /*                                Steps modal                                 */
  /* -------------------------------------------------------------------------- */

  /**
  * Handles a step back request on the opx process.
  * This function throws a show-close-confirm event in order to show an alert exit message.
  */
  manageBackButton() {
    const detail = {
      code: 'EXIT-CANCEL-OPERATION-MOBILE',
      selectedConfig: {
        className: 'error exit',
        openMaximized: false,
        iconOnlyFullHeight: true,
        acceptBtLabel: 'alert-EXIT-INSURANCE-CANCELLATION-accept',
        cancelBtLabel: 'alert-EXIT-INSURANCE-CANCELLATION-cancel',
        template: {
          type: 'paragraphs',
          values: [
            {
              icon: 'coronita:alert',
              class: 'spacing'
            },
            {
              text: 'alert-EXIT-INSURANCE-CANCELLATION-message'
            }
          ]
        }
      }
    };
    this._dispatchCustomEvent('open-alert-manager-modal', detail);
  }

  /**
  * Alert manager: Special case with one provider COMPANY
  * @event open-alert-manager-modal
  */
  alertManagerMoreInfoCompany() {
    const moreInfoCompanySelected = {
      code: 'code',
      selectedConfig: {
        className: 'full-height-error header--white',
        hideCloseIcon: false,
        openMaximized: true,
        title: this.t('mobile-top-up-enter-message-alert-manager-head'),
        heroImage: './images/fundsHiring/info.svg',
        message: this.t('mobile-top-up-enter-message-alert-manager-bbva-telcel'),
        acceptBtLabel: this.t('mobile-top-up-enter-message-alert-manager-button'),
        showAvatar: true,
        template: {
          type: 'paragraphs',
          values: [
            { text: this.t('mobile-top-up-enter-message-alert-manager-content'),
              class: 'spacing--xl'},
            { text: this.t('mobile-top-up-enter-message-alert-manager-content-down')}
          ]
        }
      }
    };
    this._dispatchCustomEvent('open-alert-manager-modal', moreInfoCompanySelected);
  }


  /**
   * Modal Alert to ask change contact
   * @event open-document-error
   **/
  openAlertModalChangeContact() {
    this._dispatchCustomEvent('open-alert-manager-modal', {
      code: 'CHANGE-CONTACT-MODAL-MOBILE-TOP-UP',
      selectedConfig: {
        className: 'error exit',
        openMaximized: false,
        iconOnlyFullHeight: true,
        acceptBtLabel: 'mobile-top-up-change-contact-confirm',
        cancelBtLabel: 'alert-LEAVE-OPERATIVE-cancel',
        template: {
          type: 'paragraphs',
          values: [
            {
              icon: 'coronita:alert',
              class: 'spacing'
            },
            {
              text: 'mobile-top-up-change-contact-message'
            }
          ]
        }
      }
    });
  }

  /**
   * Clear recipient mobile top up recipient
   */
  clearRecipient() {
    const cleanRecipientModal = {
      isVisibleAvatar: false,
      isVisibleInputNumber: false,
      isVisibleInputName: false,
      isVisibleInputAlias: false,
      isVisibleCheckbox: false,
      isVisibleButton: false,
      isVisibleSelectModal: false,
      isVisibleDescription: false,
      isFocused: false,
      isFocusButtonDisabled: false,
      numberInputRequired: false,
      nameInputRequired: false,
      companyInputRequired: false,
      phoneNumber: '',
      aliasName: '',
      avatarName: 'glomo-top-up-recipient-for-me',
      recipientName: '',
      company: {},
      checkboxValue: false,
      phoneNumberClass: 'light-grey',
      infoToggle: false
    };
    this.set('_contactsMobile', {});
    this._phoneNumber = '';
    this.set('_configRecipientModal', {cleanRecipientModal});
    this._dispatchCustomEvent('clear-mobile-top-up-recipient', cleanRecipientModal);
    this._dispatchCustomEvent('clean-inputs-mobile-top-up-recipient');
    this._dispatchCustomEvent('reset-modal-selector');
    this._dispatchCustomEvent('prevent-close-company-selected', true);
  }

  /**
   * Modal Alias in use
   * @event open-document-error
   **/
  _openAlertModalAliasInUse() {
    this._dispatchCustomEvent('open-alert-manager-modal', {
      code: 'ALIAS-IN-USE-MOBILE-TOP-UP',
      selectedConfig: {
        className: 'full-height-error header--white',
        hideCloseIcon: false,
        openMaximized: true,
        title: 'mobile-top-up-alias-in-use-title',
        heroImage: Polymer.ResolveUrl.resolveUrl('images/errors/error.svg'),
        message: 'mobile-top-up-alias-in-use-message',
        acceptBtLabel: 'mobile-top-up-alias-in-use-accept',
        cancelBtLabel: 'mobile-top-up-alias-in-use-cancel',
        showAvatar: true,
        showAvatarIcon: false,
        template: {
          type: 'paragraphs',
          values: [
            { text: 'mobile-top-up-alias-in-use-text' }
          ]
        },
        avatarItemList: [
          { title: 'Contacto:' },
          { title: this.c(this._existingContact, 'alias'), class: 'titleBold' },
          { description: this.c(this._existingContact, 'person.firstName') },
          { description: this._parsePhoneNumber(this.get('number', this._formBody)) },
          { description: this.c(this._formBody, 'company.name') }
        ]
      }
    });
  }

  /**
   * Manage close success review page
   * @event exit-mobile-top-up-review
   * @event set-card-advice-modal
   */
  manageExitReview() {
    const detailExit = {
      'exit-review-and-reset': { exit: true}
    };
    this._dispatchCustomEvent('exit-mobile-top-up-review', detailExit);
    this._dispatchCustomEvent('set-card-advice-modal');
  }


  /**
  * Method to show rating app
  * @event rating-mobile-top-up-review
  */
  manageViewRatingApp() {
    this._dispatchCustomEvent('rating-mobile-top-up-review', {
      view: 'mobileTopUp',
      value: true
    });
  }

  /**
   * Method to hide info message on amount step
   * @event hide-discount-info-message
   */
  hideAmountInfomessage() {
    this._dispatchCustomEvent('hide-discount-info-message', '');
  }

  /* -------------------------------------------------------------------------- */
  /*                                Common functions                            */
  /* -------------------------------------------------------------------------- */

  /**
   * Function to manage spinner
   * @param {Boolean} show
   * @event show-spinner
   * @event hide-spinner
   */
  _spinner(show) {
    let eventSpinner = show ? 'show-spinner' : 'hide-spinner';
    this._dispatchCustomEvent(eventSpinner, show);
  }

}
customElements.define(GlomoOpxMobileTopUpDmMx.is, GlomoOpxMobileTopUpDmMx);