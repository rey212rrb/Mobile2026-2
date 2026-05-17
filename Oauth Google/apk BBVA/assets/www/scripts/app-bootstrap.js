(function (document) {
  'use strict';

  if (typeof Object.assign !== 'function') {
    // .length of function is 2
    Object.assign = function (target, varArgs) {
      if (target === null) {
        // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index]; // Skip over if undefined or null

        if (nextSource !== null) {
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }

      return to;
    };
  } // Array.prototype.find ES6 polyfill for ES5 versions


  Array.prototype.find = Array.prototype.find || function (callback) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    } else if (typeof callback !== 'function') {
      throw new TypeError('callback must be a function');
    }

    var list = Object(this); // Makes sures is always has an positive integer as length.

    var length = list.length >>> 0;
    var thisArg = arguments[1];

    for (var i = 0; i < length; i++) {
      var element = list[i];

      if (callback.call(thisArg, element, i, list)) {
        return element;
      }
    }
  };

  window.AppConfig = {
    "__comment": "Prod environment",
    "countryId": "mx",
    "deployEndpoint": "",
    "lang": "es-MX",
    "i18nPath": "./locales/",
    "componentsPath": "./bower_components/",
    "composerEndpoint": "./composerMocks/",
    "operatives": "../scripts/app-settings/v0/operations/mx/operations.json",
    "appId": "",
    "debug": true,
    "mocks": true,
    "coreCache": true,
    "routerLog": false,
    "prplLevel": 1,
    "initialBundle": ["login.js"],
    "feedback": {
      "urls": {
        "global": "https://www.opinator.com/opi/glomo-app-mexico/",
        "investmentsFollowUp": "https://www.opinator.com/opi/BBVA_GM_FollowUp_SUCCESS"
      }
    },
    "mapUtils": {
      "apiKey": "AIzaSyBAGs7_Vk8gIE-ayRejTn4Caa7gsKAX5n8",
      "apiKeyIos": "AIzaSyCA3scKZk3FkwZRSKyNnXgacBv_98MlTo8",
      "apiKeyAndroid": "AIzaSyD6W95F8GRNuOSlddsqoAarOAa9-RtfHbM",
      "timeoutLocation": 5000,
      "defaultLocation": {
        "latitude": 19.423000356338946,
        "longitude": -99.174907504417
      }
    },
    "globalServices": {
      "authenticationTypeQrNumber": "153",
      "idBank": [],
      "publicKeyCodicel": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsNjxMwMv8f4YZ1fysvqIktm3rSAFnw7P4HU90PH2+O+qPgw7ZZOGGPuU6M3ljnoRK5XV2cFa4pL61yHGbroCJ4YSLSIXsdrQrC+FEw+IXDCmGU4CMP2ziD3SceHiU6ECgvmvQI38ti0xcdfkIYMh557hfTqs630vMfCUgC83uqLw1yqo5ESh87n7TuHyjVpQ6tvYFLlufGP4as3/BMVRg63nn8/v23gXQezkHi49BFvhejVxDXkfSnFt97Nc1ZcBEFzxiEUWekyEs3YHuMzdWxt2YkfUdgv3eOi27d44ytoG1CHmpCOiSdvUB7tajdFpdiyu8DgUYTMz9DydKKmnoQIDAQAB",
      "requiredToken": "tsec",
      "loginProvider": "bbva-auth",
      "backendUserRequest": true,
      "showGrantedCredit": true,
      "consumerId": "",
      "consumerIdAnonymous": "10000088",
      "consumerIdPublic": "10000085",
      "consumerIdStatusQr": "10000173",
      "countriesId": "06320074E",
      "hasCvv": false,
      "relatedDebitCards": true,
      "host": "https://glomo.bancomermovil.com/SRVS_A02",
      "qHost": "https://glomo.bancomermovil.com/QSRV_A02",
      "aemHost": "https://assets.caasbbva.com",
      "aemHostSos": "https://assets.caasbbva.com",
      "ieNamespace": "mx.mgmx.app-id-31840.pro",
      "apSetHost": "https://cgs.bbva.com",
      "apiKeyAp": "IrBcaceGliLWItQMnkwJaZmGoLBep7G4AWCjOHZg",
      "versions": {
        "appSettings": "0",
        "accounts": "0",
        "accountsV1": "1",
        "apiAggregator": "0",
        "apiAggregatorV1": "1",
        "businessDocuments": "0",
        "businessDocumentsV1": "1",
        "branches": "1",
        "campaigns": "1",
        "cardPayments": "1",
        "certificateSign": "0",
        "hubPayments": "0",
        "card": "0",
        "cards": "0",
        "cardsV1": "1",
        "cards-mgt": "v1",
        "catalogs": "0",
        "claims": "0",
        "consumerDossiers": "0",
        "contactsBook": "0",
        "contracts": "0",
        "contractDocuments": "0",
        "conversations": "0",
        "customers": "0",
        "customersAddresses": "0",
        "customersV1": "1",
        "customerServices": "0",
        "deposits": "1",
        "digital-appointments": "0",
        "documentProcesses": "0",
        "documentsVerifications": "0",
        "documentsVerificationsV1": "1",
        "evidencesApiVersion": "0",
        "financial-investments": "1",
        "financial-overview": "0",
        "geographicplaces": "0",
        "grantingTicket": "0",
        "insurancesContracts": "0",
        "insurancesContractsV1": "1",
        "interbankTransfers": "0",
        "investmentFunds": "0",
        "limitsV1": "1",
        "loans": "0",
        "loansV1": "1",
        "loansV2": "2",
        "lossesReport": "1",
        "lossesReportV1": "1",
        "mobile": "0",
        "moneyLaundering": "0",
        "offers": "0",
        "ownTransfers": "0",
        "patrimonialContracts": "0",
        "payments": "0",
        "pfm": "1",
        "pois": "0",
        "pockets": "1",
        "private-banking-portfolios": "0",
        "receivers": "1",
        "savingGoals": "0",
        "selfDriven": "2",
        "storedServices": "0",
        "structuredProducts": "0",
        "sustainability": "1",
        "transactions": "0",
        "transfer": "0",
        "transfersManagement": "0",
        "travelInsurancesProducts": "0",
        "notifications": "0",
        "damageInsurance": "0",
        "vehicleInsuranseV1": "1",
        "verificationV1": "1"
      },
      "vmInteractiveId": "xPUCFptPyOo",
      "vmInteractiveContentsId": "hbWGin2L908",
      "vmInteractiveContentsValue": "Y9XSGqdstKw"
    },
    "sessionTimeout": {
      "foreground": 3,
      "background": 5
    },
    "customerService": {
      "phoneNo": ""
    },
    "localCurrency": "MXN",
    "pdfViewerPath": "../../bower_components/pdfjs/web/viewer.html?file=",
    "extraDependencies": ["cells-analytics-collector", "cells-adobe-target"],
    "transpile": true,
    "bbvaLine": "8002262663",
    "phoneNumberCall": {
      "value": "8002262663"
    },
    "conversationHistoryParam": "RRUaFMTU5MA",
    "localStorageKeys": ["app_settings", "atm_visited", "cardless_withdrawal_data", "dashboard", "follow_up_show_onboarding", "isFirstExit", "mobile_services", "my_conversation_onboarding", "sustainabilityFeature-collectiveAchievementsViewed", "sustainabilityFeature-equivalencesViewed", "sustainabilityFeature-onboardingCompleted", "sustainabilityFeature-suggestionsViewed", "finance_transaction_visited", "reward_income_counter", "card_detail_visited", "losses_report_request_id", "monoproduct"],
    "appModules": ["@bbva-web-components-widgets", "@bbva-global-apis-dm", "@glomo-web-components"],
    "transpileExclude": ["cells-rxjs", "webcomponentsjs", "rxjs", "moment", "d3", "bgadp*", "pdfjs/build/pdf.js", "pdfjs/build/pdf.worker.js", "pdfjs/web/pdf.viewer.js", "pdfjs/web/viewer.html", "pdfjs/web/viewer.css", "bbva-manager-oc-car-loan"],
    "bundleExclude": ["bower_components/cells-pdf-viewer/cells-pdf-viewer.js", "bower_components/cells-pdf-viewer/cells-pdf-viewer.html", "bower_components/cells-pdf-viewer/cells-pdf-viewer-styles.html", "bower_components/pdfjs/build/pdf.js", "bower_components/pdfjs/build/pdf.worker.js", "bower_components/pdfjs/web/pdf.viewer.js", "bower_components/pdfjs/web/viewer.html", "bower_components/pdfjs/web/viewer.css", "bower_components/bodymovin/build/player/lottie.min.js"],
    "minifyExclude": ["bower_components/cells-pdf-viewer/cells-pdf-viewer.js", "bower_components/cells-pdf-viewer/cells-pdf-viewer.html", "bower_components/cells-pdf-viewer/cells-pdf-viewer-styles.html", "bower_components/pdfjs/build/pdf.js", "bower_components/pdfjs/build/pdf.worker.js", "bower_components/pdfjs/web/pdf.viewer.js", "bower_components/pdfjs/web/viewer.html", "bower_components/pdfjs/web/viewer.css", "bower_components/bodymovin/build/player/lottie.min.js"],
    "mainNode": "app__content",
    "dtmLibrary": "<script src=\"https://assets.adobedtm.com/95c3e405673d/c6291666d88d/launch-fa256db25d06.min.js\" async></script>",
    "environment": "pro",
    "swiftCode": "",
    "bbvaPhoneNumber": "942210850",
    "bbvaInsurancePhonesClaimsNumbers": {
      "segmentA": {
        "phoneNumber": "5511026132",
        "extension": ""
      },
      "default": {
        "phoneNumber": "5552262685",
        "extension": "#0006"
      }
    },
    "bbvaPhonesClaimsNumbers": {
      "segmentA": {
        "phoneNumber": "5588521495",
        "extension": "#0103"
      },
      "segmentB": {
        "phoneNumber": "5552262685",
        "extension": "#0403"
      },
      "segmentC": {
        "phoneNumber": "5552262685",
        "extension": "#0303"
      },
      "segmentD": {
        "phoneNumber": "5552262685",
        "extension": "#0203"
      },
      "default": {
        "phoneNumber": "5552262685",
        "extension": "#0403"
      }
    },
    "bbvaPhonesSos": {
      "reportAtm": "5552262685#990003",
      "rejectedCard": "5552262685#990401"
    },
    "bbvaPhoneMixCreditCardAndLoan": "+525552268969",
    "locales": {
      "languages": ["es-MX", "es-ES", "en-EN", "es", "en"],
      "intlInputFileNames": ["locales"],
      "intlFileName": "locales"
    },
    "bbvaBanksListId": "0012",
    "pageInstanceID": "pro",
    "phoneNumberContact": "018002262663",
    "bbvaLineInsuranceVehicle": "8009021300",
    "bbvaLineAssistanceVehicle": "8008743683",
    "bbvaClaimNumber": "8008743683",
    "bbvaSACNumber": "5511020000",
    "elitePhone": "8001121113",
    "saPhoneNumber": "5552262663",
    "eucaPhoneNumber": "18003969665",
    "otherPhoneNumber": "3039671098",
    "saCountryCode": "+52",
    "saBankURL": "http://www.banxico.org.mx/cep/",
    "saDebug": false,
    "enableLitElement": true,
    "onlyLitElements": false,
    "preRenderPages": {
      "about": ["login", "dashboard"],
      "account": ["dashboard", "codicelPeerToPeerSend", "codicelAgreeAndRemoveConsent", "transfer", "accountMoreInfo", "accountTransactions"],
      "accountMoreInfo": ["account"],
      "accountTransactionDetail": ["accountTransactions"],
      "accountTransactions": ["accountTransactionsSearcher"],
      "accountTransactionsSearcher": ["accountTransactions"],
      "card": ["dashboard", "cardMoreInfo", "cardTransactions", "cardCreditCardPayment", "filteredPoints", "reward", "pointsRedeemPurchases"],
      "cardCreditCardPayment": ["creditCardPaymentReview"],
      "cardGenerate": ["cardGenerateTerms"],
      "cardGenerateTerms": ["cardGenerateSuccess", "cardGenerateError"],
      "cardMoreInfo": ["card"],
      "cardTransactions": ["card"],
      "dashboard": ["aboutPage", "applicationFeedback", "helpSectionPage", "profilePage", "operationals"],
      "appFeedback": ["login", "dashboard"],
      "help": ["login", "dashboard"],
      "login": ["about", "appFeedback", "help", "atmLocator", "dashboard"],
      "mixCreditCardAndLoan": ["branchLocator", "mixCreditCardAndLoanReview"],
      "pointsTransfer": ["pointsTransferReview"],
      "pointsRedeemPurchases": ["pointsRedeemPurchasesReview"],
      "poisDetail": ["atmLocator"],
      "profile": ["dashboard"],
      "reward": ["rewardFaqDetail", "pointsTransfer"],
      "transfer": ["transferReview", "account", "transferAbandonFeedback"],
      "transferAbandonFeedback": ["account", "card"],
      "transferSuccessFeedback": ["account", "card", "transferReview"],
      "transferReview": ["account", "transferSuccessFeedback"],
      "atmLocator": ["searchPlace", "poisDetail"],
      "welcome": ["login"]
    },
    "investmentsFollowUpOtherContractId": "oFabv8pKlxnEf4GZOX38iym7MdVYjfzUSNvb6RJUn9QoKswS2Tl1bDmKNYrQ-YzH",
    "rewards": {
      "landing": {
        "faqs": {
          "url": "content/caas/mexico/glomo/faqs/rewards-landing-faqs.model.json"
        }
      },
      "pointsRedeemPurchaseOptions": {
        "faqs": {
          "url": "content/caas/mexico/glomo/faqs/points-redeem-purchase-options.model.json"
        }
      },
      "promotionPdf": "https://www.bbva.mx/content/dam/public-web/mexico/documents/2-oct/personas/tarjetas/promociones-tdc/anexo_de_beneficios_bbva_mx.pdf"
    },
    "emergencyVehicleReportNumbers": {
      "phoneNumberBbvaLine": "5552262663",
      "phoneNumberBbvaLineVehicle": "8008743683",
      "apiKey": "AIzaSyCKYuHcCgvM90xMrdqbm4kpRBSpgKcafFg"
    },
    "bbvaPhoneNumberAssistantPayrollPortability": "+525552268973",
    "bbvaPhoneNumberAssistantOcLoanRelocation": "+525552268972",
    "authenticationTypeNumber": "84",
    "authenticationTypeBirthDate": "83",
    "authenticationTypeDvs": "222",
    "bbvaPhoneNumberAssistantDepositsHirings": "+525552268971",
    "routes": {
      "aboutInfo": "/about-info",
      "aboutPage": "/about-page",
      "accessKeyDateSelector": "/access-key-date-selector",
      "accessKeyDemo": "/access-key-demo",
      "accessKeyPinCvvPage": "/access-key-pin-cvv",
      "accessKeyQrPage": "/access-key-qr-page",
      "accessKeyQrSelector": "/access-key-qr-selector",
      "accessKeyQrSuccessPage": "/access-key-qr-success-page",
      "accessKeyRecoveryPage": "/access-key-recovery",
      "accessKeyResetPage": "/access-key-reset",
      "accountEditAlias": "/account-edit-alias",
      "accountStatementsPage": "/account-statements",
      "accountStatementsPdfPage": "/accounts-statements-pdf",
      "accountTransactionDetail": "/account/:productId/transaction/:transactionId",
      "accountsEditAlias": "/accounts/:productId/edit-alias",
      "addFundToContract": "/add-fund-to-contract",
      "addFundToContractReview": "/add-fund-to-contract-review",
      "addVideoSelfie": "/add-video-selfie",
      "additionalCardDetail": "/additional-card-detail/:additionalProductId",
      "additionalCreditCardMainPage": "/additional-credit-card",
      "additionalCreditCardSuccessPage": "/additional-credit-card-success",
      "appPermissionsInfoPage": "/app-permissions-info",
      "appPermissionsPage": "/app-permissions",
      "applicationFeedback": "/app-feedback",
      "appsSectionPage": "/apps-section",
      "assistanceManagerBenefitsPage": "/assistance-manager-benefits",
      "assistanceManagerInfoPage": "/assistance-manager",
      "assistanceSection": "/assistance-section",
      "assistanceSectionInfo": "/assistance-section-info",
      "atmLocator": "/atm-locator",
      "bbvaAbout": "/bbva-about",
      "billPaymentsDashboard": "/bill-payments-dashboard",
      "billPaymentsPage": "/bill-payments",
      "billPaymentsSuccess": "/bill-payments-success",
      "blackhawkAnswer": "/blackhawk-answer",
      "blackhawkAnswerDetail": "/blackhawk-answer-detail",
      "blackhawkInformation": "/blackhawk-information",
      "blackhawkPurchase": "/blackhawk-purchase",
      "blackhawkPurchaseDetail": "/blackhawk-purchase-detail",
      "blackhawkPurchaseReview": "/blackhawk-purchase-review",
      "blackhawkWelcome": "/blackhawk-welcome",
      "blockAndReplacementPage": "/block-and-replacement",
      "blockAndReplacementSuccessPage": "/block-and-replacement-success",
      "branchLocator": "/branch-locator",
      "budget": "/budgets/:productId",
      "budgetsList": "/budgets",
      "businessAccountInfo": "/business-account-info",
      "callMeBackAssistanceManager": "/call-me-back-assistance-manager",
      "callMeBackAssistanceManagerSuccess": "/call-me-back-assistance-manager-success",
      "callMeBackPage": "/call-me-back",
      "carLoanPage": "/loan-car",
      "carLoanPaymentPage": "/car-loan-payment",
      "carLoanPaymentSuccessPage": "/car-loan-payment-success",
      "carLoanSuccessPage": "/car-loan-success",
      "cardCreditCardPayment": "/card-credit-card-payment",
      "cardDetail": "/card-detail/:productId",
      "cardDynamicCvv": "/card/:digitalProductId/dynamic-cvv",
      "cardEditAlias": "/card/:productId/edit-alias",
      "cardGenerate": "/card/generate",
      "cardGenerateError": "/card/generate/error",
      "cardGenerateSuccess": "/card/generate/success",
      "cardGenerateTerms": "/card/generate/terms",
      "cardMoreInfo": "/cardMoreInfo",
      "cardOnOffHelpPage": "/card-on-off-help",
      "cardTransactionDetail": "/card/:productId/transaction/:transactionId",
      "cardTransactions": "/card/:productId/transactions",
      "cardlessWithdrawal": "/cardless-withdrawal/",
      "cardlessWithdrawalOperation": "/cardless-withdrawal-operation",
      "cardlessWithdrawalReview": "/cardless-withdrawal/review",
      "cardsListPage": "/cards-list",
      "channelSettings": "/channel-settings",
      "checkUpHealthPage": "/financial-health-check-up-status",
      "checkUpOfferDetailPage": "/checkup-offer-detail",
      "checkUpPage": "/financial-health-check-up",
      "checksDeposits": "/checks-deposits",
      "checksDepositsCheckAggregator": "/checks-deposits/check-aggregator",
      "checksDepositsDetail": "/checks-deposits/list/:checkId",
      "checksDepositsList": "/checks-deposits/list",
      "checksDepositsListSearcher": "/checks-deposits/list-searcher",
      "checksDepositsPhotos": "/checks-deposits/check-aggregator/photos",
      "checksDepositsReview": "/checks-deposits/review",
      "checksManagement": "/checks-management",
      "checksManagementAddCheck": "/checks-management/add-check",
      "checksManagementCancelReview": "/checks-management/cancel/review",
      "checksManagementDetail": "/checks-management/detail",
      "checksManagementFeedback": "/checks-management/feedback",
      "checksManagementList": "/checks-management/list",
      "checksManagementListSearcher": "/checks-management/list-searcher",
      "checksManagementReview": "/checks-management/review",
      "checksManagementServiceTerms": "/checks-management/service-terms",
      "checksManagementServiceTermsReview": "/checks-management/service-terms/review",
      "checksSection": "/checks-section",
      "clarificationsListCare": "/clarifications-list-care",
      "clarificationsListPage": "/clarifications-list",
      "clarificationsManagementCarePage": "/clarifications-management-care",
      "clarificationsManagementCareSuccessPage": "/clarifications-management-care-success",
      "clarificationsManagementClarificationSuccessPage": "/clarifications-management-clarification-success",
      "clarificationsManagementPage": "/clarifications-management",
      "clarificationsManagementSuccessPage": "/clarifications-management-success",
      "clarificationsTrackingCare": "/clarifications-tracking-care",
      "cleanCardOperations": "/clean-card-operations",
      "cleanCardQrFaqs": "/clean-card-qr-faqs",
      "codiAccountValidationPage": "/codi-account-validation",
      "codiEnrollPage": "/codi-enrollment",
      "codiRegisterAccountsPage": "/codi-register-accounts",
      "codiSmsInfoPage": "/codi-sms-info",
      "codiWelcomePage": "/codi-welcome",
      "codicelAgreeAndRemoveConsent": "/codicel-agree-and-remove-conscent",
      "codicelPeerToPeerSend": "/codicel-peer-to-peer-send",
      "codicelPeerToPeerTransferReview": "/codicel-peer-to-peer-transfer-review",
      "configureProductsPage": "/configure-products",
      "confirmationConsumptionPage": "/confirmation-consumption",
      "contactsAgenda": "/contacts-agenda",
      "contractPaymentExistingPage": "/contract-payment-existing",
      "contractProductsPage": "/contract-products",
      "creditBureau": "/creditBureau",
      "creditBureauReceipt": "/creditBureauReceipt",
      "creditCardHolderErrorPage": "/credit-card-holder-error-page",
      "creditCardHolderIncompleteInfoPage": "/credit-card-holder-incomplete-info-page",
      "creditCardHolderNoticePage": "/credit-card-holder-notice-page",
      "creditCardHolderPage": "/credit-card-holder",
      "creditCardHolderRejectionBuroPage": "/credit-card-holder-rejection-buro-page",
      "creditCardHolderSuccessPage": "/credit-card-holder-success-page",
      "creditCardPaymentReview": "/credit-card-payment/review",
      "creditCardTracking": "/credit-card-tracking",
      "creditCardUpgradePage": "/credit-card-upgrade",
      "creditCardUpgradeSuccessPage": "/credit-card-upgrade-success",
      "curpPage": "/curp-page",
      "curpSuccessPage": "/curp-success-page",
      "customerContractsHelpPage": "/customer-contracts-help",
      "customerContractsListPage": "/customer-contracts-list",
      "dashboard": "/dashboard",
      "dashboardUnavailableFooterOperationsPage": "/dashboard-unavailable-footer-operations",
      "debitCardTracking": "/debit-card-tracking",
      "debitCardTrackingDetail": "/debit-card-tracking-detail",
      "debitTransactionDetail": "/debit/:productId/transaction/:transactionId",
      "debitTransactions": "/debit/:productId/transactions",
      "decrement": "/decrement",
      "decrementReview": "/decrement-review",
      "deferredSignature": "/generic-deferred",
      "deferredSignatureEquityContract": "/deferred-equity-contract",
      "deferredSignatureEquityContractReview": "/deferred-equity-contract-review",
      "deferredSignatureStructuredProducts": "/deferred-structured-products",
      "deferredSignatureStructuredProductsReview": "/deferred-structured-products-review",
      "demoFeedback": "/demo/feedback",
      "deposit": "/deposit/:productId",
      "depositEditAlias": "/deposit-edit-alias",
      "depositHiring": "/deposit-hiring",
      "depositHiringSuccess": "/deposit-hiring-success",
      "depositImpositionUpdate": "/deposit-imposition-update",
      "depositImpositionUpdateSuccess": "/deposit-imposition-update-success",
      "depositMoreInfo": "/deposit/:productId/more-info",
      "depositSale": "/deposit-sale",
      "depositSaleSuccess": "/deposit-sale-success",
      "depositTransactionDetail": "/deposit/:deposit-id/transactions/:transaction-id",
      "depositsPurchaseSale": "/deposits-purchase-sale",
      "depositsPurchaseSaleSuccess": "/deposits-purchase-sale-success",
      "deviceInsurance": "/device-insurance",
      "deviceInsuranceExclusions": "/device-insurance-exclusions",
      "deviceInsuranceSuccess": "/device-insurance-success",
      "digitalActivation": "/digital-activation",
      "digitalActivationCall": "/digital-activation-call",
      "digitalActivationMobileServices": "/digital-activation-mobile-services",
      "digitalCardOnOffHelpPage": "/card/digital/on-off-help",
      "disabilityVideocallHearingTactical": "/disability-videocall-hearing-tactical",
      "disabilityVideocallHearingTacticalCalling": "/disability-videocall-hearing-tactical-calling",
      "disabilityVideocallHearingTacticalPutAttention": "/disability-videocall-hearing-tactical-put-attention",
      "dynamicLifeInsuranceAddBeneficiaryPage": "/dynamic-life-insurance-beneficiary",
      "dynamicLifeInsuranceEditCoverageAmountPage": "/dynamic-life-edit-coverage-amount",
      "dynamicLifeInsuranceEditPercentagePage": "/dynamic-life-edit-percentage",
      "dynamicLifeInsuranceMainPage": "/dynamic-life-insurance-page",
      "dynamicLifeInsuranceNewAddressPage": "/dynamic-life-insurance-new-address",
      "dynamicLifeInsuranceOfferPage": "/dynamic-life-insurance-offer",
      "dynamicLifeInsuranceSuccess": "/dynamic-life-insurance-success",
      "editCreditCardLimits": "/edit-credit-card-limits",
      "emailComposer": "/email-composer",
      "emergencyChangePassword": "/emergency-change-password",
      "emergencyLostCard": "/emergency-lost-card",
      "emergencyNeedCash": "/emergency-need-cash",
      "emergencyReports": "/emergency-reports",
      "emergencyTrackingReports": "/emergency-tracking-reports",
      "emergencyZone": "/emergency-zone",
      "equity": "/equity/:productId",
      "equityContractsContribution": "/equity-contracts-contribution",
      "equityContractsContributionSuccess": "/equity-contracts-contribution-success",
      "equityContractsInvestmentDetail": "/equity-contracts-investment-detail",
      "equityContractsWithdrawal": "/equity-contracts-withdrawal",
      "equityContractsWithdrawalSuccess": "/equity-contracts-withdrawal-success",
      "equityEditAlias": "/equity/:productId/edit-alias",
      "equityErrorPage": "/equity-error-page",
      "equityMoreInfo": "/equity/:productId/more-info",
      "errorPage": "/error",
      "faqsPointsRedeemPage": "/faqs-points-redeem",
      "fatcaValidation": "/fatca-validation",
      "fatcaValidationResidenceForm": "/fatca-validation-residence-form",
      "fatcaValidationSuccess": "/fatca-validation-success",
      "feedback": "/generic-feedback",
      "feedbackContextualNPS": "/feedback",
      "filteredPoints": "/filtered-points",
      "financeTransactionMultipurchase": "/card/:productId/finance-transaction-multipurchase",
      "financeTransactionMultipurchaseReview": "/card/finance-transaction-multipurchase/review",
      "financialHealthPushAdvice": "/financial-health-push-advice",
      "financialHealthPushAdviceFeedback": "/financial-health-push-advice-feedback",
      "financingDebitListPage": "/financing-debit-list",
      "financingDebitPage": "/financing-debit-page",
      "financingDebitReceipt": "/financing-debit-receipt",
      "financingPurchase": "/card/:productId/transaction/:transactionId/financing-purchase",
      "financingPurchaseReview": "/card/:productId/transaction/:transactionId/financing-purchase/review",
      "flexibleLineCredit": "/card/:productId/flexibleCreditLine",
      "flexibleLineCreditFaqs": "/card/:productId/flexibleCreditLine/faqs",
      "fund": "/fund/:productId",
      "fundContractedDetail": "/fund-contracted-detail",
      "fundEditAlias": "/fund-edit-alias",
      "fundMoreInfo": "/fundMoreInfo",
      "fundsContribution": "/funds-contribution",
      "fundsHiring": "/funds-hiring",
      "fundsHiringReview": "/funds-hiring-review",
      "fundsInvestmentsContributionSuccessPage": "/funds-investments-contribution-success",
      "fundsInvestmentsWithdrawalSuccessPage": "/funds-investments-withdrawal-success",
      "fundsWithdrawal": "/funds-withdrawal",
      "goals": "/goals",
      "help": "/help",
      "helpInfoPage": "/help-info",
      "helpSectionDetailPage": "/help-section-detail",
      "helpSectionPage": "/help-section",
      "historyCreditPage": "/history-credit-page",
      "historyCreditReceipt": "/history-credit-receipt",
      "inappPage": "/inappPage",
      "increment": "/increment",
      "incrementReview": "/increment/review",
      "instantCash": "/instant-cash",
      "instantCashSuccessfulScreen": "/instant-cash-successful-screen",
      "insurance": "/insurance",
      "insuranceCancelPage": "/insurance-cancel",
      "insuranceCancelationRequest": "/insurance-cancelation-request",
      "insuranceCancelationSuccess": "/insurance-cancelation-success",
      "insuranceConsultPage": "/insurance-consult",
      "insuranceDetailCancelPage": "/insurance-detail-cancel",
      "insuranceMoreInfo": "/insurance/more-info",
      "interestSimulator": "/card/:productId/interest-simulator",
      "internationalRefundsPage": "/international-refunds",
      "internationalRefundsReceiptPage": "/international-refunds-receipt",
      "internationalTransfersCreateRecipientPage": "/international-transfers-create-recipient",
      "internationalTransfersDetailPage": "/international-transfers-detail",
      "internationalTransfersHistorical": "/internationalTransfersHistorical",
      "internationalTransfersPage": "/international-transfers",
      "internationalTransfersPanelPage": "/international-transfers-panel",
      "internationalTransfersReviewRecipientPage": "/international-transfers-review-recipient",
      "internationalTransfersSuccessPage": "/international-transfers-success",
      "investmentsFollowUp": "/investments-follow-up",
      "investmentsFollowUpDistribution": "/investments-follow-up-distribution",
      "investmentsFollowUpFeedback": "/investments-follow-up-feedback",
      "invitationNonAccountClient": "/invitation-non-account-client",
      "kycSuccessPage": "/kyc-success",
      "kycValidationPage": "/kyc-validation",
      "lifeInsuranceAddBeneficiaryPage": "/life-insurance-add-beneficiary",
      "lifeInsuranceEditPercentagePage": "/life-insurance-edit-percentage",
      "lifeInsuranceHelpPage": "/life-insurance-helps",
      "lifeInsuranceMainPage": "/life-insurance",
      "lifeInsuranceNoticesPage": "/life-insurance-notices",
      "lifeInsuranceQuestionsPage": "/life-insurance-questions",
      "lifeInsuranceSuccessPage": "/life-insurance-success",
      "limitedOperativesInfoPage": "/limited-operatives-info",
      "listCreditCardLimits": "/list-credit-card-limits",
      "loading": "/",
      "loan": "/loan/:productId",
      "loanEditAlias": "/loan/:productId/edit-alias",
      "loanMoreInfo": "/loan/:productId/more-info",
      "loanPaymentsEmailErrorPage": "/loan-payments-email-error-page",
      "loanPaymentsErrorPage": "/loan-error-payment",
      "loanPaymentsPage": "/loan-payments",
      "loanPaymentsSuccessPage": "/loan-payments-success",
      "lockCardsPage": "/lock-cards-page",
      "login": "/auth",
      "menuVisualAdditionalPage": "/menu-visual-additional-page",
      "menuVisualPage": "/menu-visual-page",
      "mgmCampaignsAndRewardsPage": "/campaigns-and-rewards-mgm-page",
      "mgmDetailCampaignsPage": "/mgm-detail-campaigns-page",
      "mgmDetailDynamicPage": "/mgm-detail-dynamic-page",
      "mixCreditCardAndLoan": "/mix-credit-card-and-loan",
      "mixCreditCardAndLoanReview": "/mix-credit-card-and-loan-review",
      "mobilePayment": "/mobile-payment",
      "mobileTopUp": "/mobile-top-up",
      "mobileTopUpReview": "/mobile-top-up-review",
      "monthlyStatementPage": "/monthly-statement-page",
      "mortgageCertificateCancellationSuccess": "/mortgage-certificate-cancellation-success",
      "mortgageCertificateDocs": "/mortgage-certificate-docs",
      "mortgageCertificateReview": "/mortgage-certificate-review",
      "mortgageLoanPaymentPage": "/mortgage-loan-payment",
      "mortgageLoanPaymentSuccessPage": "/mortgage-loan-payment-success",
      "mortgagePage": "/mortgage",
      "mortgageSuccessPage": "/mortgage-success",
      "myConversationChatPage": "/my-conversation-chat",
      "myConversationMessagePage": "/my-conversation-message",
      "myConversationSearchPage": "/my-conversation-search",
      "myConversationThemePage": "/my-conversation-theme",
      "noClientAdditionalCardInfo": "/no-client-additional-card-info",
      "noClientBusinessDebitCardInfo": "/no-client-business-debit-card-info",
      "noProductsHiredClient": "/no-products-hired-client",
      "nonPreApprovedCarCertificate": "/non-pre-approved-car-certificate",
      "nonPreApprovedCarCertificateSuccess": "/non-pre-approved-car-certificate-success",
      "nonPreapprovedBureauPage": "/non-preapproved-bureau",
      "nonPreapprovedCreditCardPage": "/non-preapproved-credit",
      "nonPreapprovedLoanMainPage": "/non-preapproved-loan",
      "notificationsList": "/notifications-list",
      "notificationsListSearch": "/notifications-list-search",
      "notificationsListSearchResult": "/notifications-list-search-result",
      "notificationsSettingsEditPage": "/notifications-settings-edit",
      "notificationsSettingsPage": "/notifications-settings",
      "ocLoanOfferPage": "/oc-loan-offer",
      "ocLoanOfferSuccessPage": "/oc-loan-offer-success",
      "ocMetaSeguraOfferPage": "/oc-metasegura-offer-page",
      "ocMetaSeguraOfferSuccess": "/oc-metasegura-offer-success",
      "ocPaymentPlanCardErrorPage": "/oc-payment-plan-card-error-page",
      "ocPaymentPlanCardSuccessPage": "/oc-payment-plan-card-success-page",
      "ocPayrollAdvancePage": "/oc-payroll-advance",
      "ocPayrollAdvanceReview": "/oc-payroll-advance-review",
      "ocPayrollPortability": "/oc-payroll-portability",
      "ocPayrollPortabilitySuccess": "/oc-payroll-portability-success",
      "ocSupportFixedPaymentsPage": "/oc-support-fixed-payments-page",
      "offerCtaModalPage": "/offer-cta-modal-page",
      "offerTdcModalPage": "/offer-tdc-modal-page",
      "openDigitalAccount": "/open-digital-account",
      "openDigitalAccountMultistep": "/open-digital-account-multistep",
      "openDigitalAccountSignaturePadModal": "/open-digital-account-signature-pad",
      "openDigitalAccountSuccess": "/open-digital-account-success",
      "operationalLimitsPage": "/operational-limits-page",
      "operationals": "/operationals",
      "operations": "/operations",
      "paseTagCardInfo": "/pase-tag-card-info",
      "paseTagCardList": "/pase-tag-card-list",
      "paseTagCardRecharge": "/pase-tag-card-recharge",
      "paseTagCardRechargeReview": "/pase-tag-card-recharge-review",
      "paseTagCardRegister": "/pase-tag-card-register",
      "paseTagCardRegisterInfo": "/pase-tag-card-register-info",
      "paseTagCardRegisterReview": "/pase-tag-card-register-review",
      "patrimonialAttentionHoursMessagePage": "/attention-hours-message",
      "patrimonialContractDetailsPage": "/patrimonial-details/:accountNumber/:productName/:productId",
      "patrimonialDetailPage": "/equity-private-banking-portfolios/:contractId",
      "patrimonialEquitityAssistancePage": "/patrimonial-equitity-assistance/:contractId",
      "paymentsThirdPartyWalletVerification": "/payments-third-party-wallet-verification",
      "payroll": "/payroll",
      "payrollAddressUpdateReceipt": "/payroll-address-update-receipt",
      "payrollAddressUpdateStepInputPage": "/payroll-address-update-step-input",
      "payrollAdvanceContractPage": "/payroll-advance-contract",
      "payrollAdvanceErrorPage": "/payroll-advance-contract-error",
      "payrollAdvanceOfferPage": "/payroll-advance-offer",
      "payrollAdvancePendingPage": "/payroll-advance-contract-pending",
      "payrollAdvanceSuccessPage": "/payroll-advance-contract-success",
      "payrollLink": "/payroll-link",
      "payrollLinkBenefits": "/payroll-link-benefits",
      "payrollLinkSuccess": "/payroll-link-success",
      "payrollPortabilityAccountsPage": "/glomo-payroll-portability-accounts",
      "payrollPortabilityConfirmBirthdayPage": "/payroll-portability-birthday",
      "payrollPortabilityCreatePage": "/payroll-portability-create",
      "payrollPortabilityListPage": "/payroll-portability-list",
      "payrollPortabilityProcessPage": "/payroll-portability-process",
      "payrollPortabilitySuccessPage": "/payroll-portability-success",
      "payrollPortabilityWrongBirthdayPage": "/payroll-portability-wrong-birthday",
      "pdfViewer": "/pdf-viewer",
      "pfmBudgetsCreate": "/pfm/budgets/create",
      "pfmBudgetsCreateReview": "/pfm/budgets/create/review",
      "pfmBudgetsEdit": "/pfm/budget/edit",
      "pfmBudgetsEditReview": "/pfm/budget/edit/review",
      "pfmDashboard": "/pfm/dashboard",
      "pfmExpensesTrends": "/pfm/trends",
      "pfmExpensesTrendsPeriodSelection": "/pfm/trends/period-selection",
      "pfmIncomeExpenses": "/pfm/groups",
      "pfmMessageInfoDashboard": "/pfm/message",
      "pfmPeriod": "/pfm/period",
      "pfmProducts": "/pfm/products",
      "pfmRecategorization": "/pfm/transactions/:transactionId/recategorization",
      "pfmRecategorizationReview": "/pfm/transactions/:transactionId/recategorization/review",
      "pfmSettings": "/pfm/settings",
      "pfmTransactionDetail": "/pfm/:productType/:productId/transactions/:transactionId/",
      "pfmaggregation": "/pfm/aggregation",
      "pinRequest": "/pin-request",
      "pocketMovementListPage": "/pocket-movement-list",
      "pocketsAddWithdrawSuccessPage": "/addwithdrawpocketssuccess",
      "pocketsAddWithdrawalMoneyMainPage": "/pocket-add-and-withdrawal-money-main",
      "pocketsAddWithdrawalMoneySuccessPage": "/pocket-add-and-withdrawal-money-success",
      "pocketsCreatePage": "/createpockets",
      "pocketsDeleteMainPage": "/pockets-delete-main",
      "pocketsDeletePage": "/pockets-delete",
      "pocketsDeleteSuccessPage": "/pockets-delete-success",
      "pocketsEditNoPayroll": "/pockets-edit-no-payroll",
      "pocketsEditUnprogrammerPage": "/pockets-edit-unprogrammer",
      "pocketsListPage": "/pockets-list",
      "pocketsNoticePage": "/createpocketsnotice",
      "pocketsSuccessPage": "/createpocketssuccess",
      "pointsRaffle": "/points-raffle",
      "pointsRaffleFaq": "/points-raffle-faq",
      "pointsRaffleReview": "/points-raffle/review",
      "pointsRedeemPurchases": "/points-redeem-purchases",
      "pointsRedeemPurchasesReview": "/points-redeem-purchases/review",
      "pointsTransfer": "/points-transfer",
      "pointsTransferReview": "/points-transfer/review",
      "poisDetail": "/pois/:type/:poisId",
      "portabilityE2EPage": "/portability-e2e",
      "ppfContractPage": "/ppf-contract",
      "ppfSuccessPage": "/ppf-success",
      "productSolutionsForPaymentPage": "/product-solutions-for-payment-page",
      "productSolutionsSuccessPage": "/product-solutions-success-page",
      "profileAvatar": "/profile-avatar",
      "profilePage": "/profile",
      "pushNotificationListPage": "/push-notification-list",
      "qrReaderPage": "/qr-reader-page",
      "recipientsAddressForm": "/recipients-address-form",
      "recipientsForm": "/recipients-form",
      "recipientsInit": "/recipients-init",
      "recipientsSuccessPage": "/recipients-success-page",
      "refunds": "/refunds",
      "refundsReview": "/refundsReview",
      "registerTagPage": "/register-tag-page",
      "registerUser": "/register-user",
      "relevantFactsDetail": "/feed/detail/:relevantFactId",
      "relocationMainPage": "/relocation",
      "relocationSuccessfulPage": "/relocation-successful",
      "requestBranchAppointmentDetailPage": "/request-branch-appointment-detail",
      "requestBranchAppointmentListPage": "/request-branch-appointment-list",
      "requestBranchAppointmentPage": "/request-branch-appointment",
      "requestBranchAppointmentSuccessPage": "/request-branch-appointment-success",
      "requestDebitCard": "/request-debit-card",
      "requestDebitCardSuccess": "/request-debit-card-success",
      "requestFiscalData": "/request-fiscal-data",
      "requestFiscalDataSuccess": "/request-fiscal-data-success",
      "responsePointsRedeemPage": "/response-points-redeem",
      "reward": "/reward",
      "rewardFaqDetail": "/reward-faq-detail",
      "rewardNewExperience": "/reward-new-experience",
      "rewardOriginCardPage": "/reward-origin-card-page",
      "sa": "/sa",
      "searchPlace": "/search-place",
      "searchPlacePage": "/search-place-page",
      "securityMenuPage": "/security-menu-page",
      "securityProfile": "/security-profile",
      "securitySettingsDiscreetMode": "/security-settings-discreet-mode",
      "securitySettingsDiscreetModeLottieByCamera": "/security-settings-discreet-mode-lottie-by-camera",
      "securitySettingsDiscreetModeLottieByGesture": "/security-settings-discreet-mode-lottie-by-gesture",
      "securityTipsDetailPage": "/security_tips_detail",
      "securityTipsGlossaryPage": "/security-tips-glossary",
      "securityTipsPage": "/security-tips-dashboard",
      "selfDrivenRoundUp": "/selfDrivenRoundUp",
      "sendEmailSuccessPage": "/send-email-success",
      "serviceBoxInfoPage": "/service-box-info",
      "serviceBoxPage": "/service-box",
      "settingsPage": "/settings",
      "specialSalesModalErrorPage": "/special-sales-modal-error",
      "specialSalesModalPage": "/special-sales-modal",
      "specialSalesPage": "/special-sales",
      "specialSalesSuccessPage": "/special-sales-success",
      "successModifyPage": "/success-modify",
      "sustainabilityCarbonFootprintPage": "/sustainability-carbon-footprint-page",
      "sustainabilityGlossaryPage": "/sustainability-glossary",
      "sustainabilityNews": "/sustainability-news",
      "sustainabilityNewsDetail": "/sustainability-news-detail",
      "sustainabilityPage": "/sustainability",
      "tagCardDetail": "/tag-card-detail",
      "tagCardInfo": "/tag-card-info",
      "tagCardList": "/tag-card-list",
      "tagRecharge": "/tag-recharge",
      "tagRechargeSuccessPage": "/tag-recharge-success-page",
      "tagRegisterInfoPage": "/tag-register-info-page",
      "tagRegisterPage": "/tag-register-page",
      "tagRegisterSuccessPage": "/tag-register-success-page",
      "termsAndConditionsPage": "/terms-and-conditions",
      "toggleCardsPage": "/toggle-cards",
      "topUp": "/top-up",
      "transactionsListWithholdingsPage": "/glomo-transactions-list-withholdings",
      "transfers": "/transfers",
      "transfersSuccess": "/transfersSuccess",
      "travelInsuranceCoverages": "/travel-insurance-coverages",
      "travelInsurancePage": "/travel-insurance",
      "travelInsuranceSuccessPage": "/travel-insurance-success",
      "travelInsuranceUserDataModal": "/travel-insurance-user-data-modal",
      "unifyCardsSuccessPage": "/unify-credit-cards-success",
      "unifyCreditCardsMainPage": "/unify-credit-cards",
      "unitLinkedBalancePage": "/unit-linked-balance/:accountNumber/:productName/:contractId",
      "unitLinkedContractDetailPage": "/unit-linked-contract-detail",
      "unsubscribe": "/unsubscribe",
      "updateAddressOptionsPage": "/update-address-options",
      "updateAddressStepInputPage": "/update-address-step-input",
      "updateAddressSuccessPage": "/update-address-success",
      "updateAddressUploadFilesPage": "/update-address-upload-files-page",
      "updateContractConfirmation": "/update-contract-confirmation",
      "updateContractRestrictions": "/update-contract-restrictions",
      "updateContractSuccess": "/update-contract-success",
      "updateEmailPage": "/update-email",
      "updateNationalId": "/update-national-id",
      "updateNationalIdSuccess": "/update-national-id-success",
      "upgradeAccountCustomerData": "/upgrade-account-customer-data",
      "upgradeAccountInit": "/upgrade-account-init/:productId",
      "upgradeAccountPrevQuestions": "/upgrade-account-prev-questions",
      "upgradeAccountRestrictions": "/upgrade-account-restrictions",
      "upgradeAccountRestrictionsModular": "/upgrade-account-restrictions-modular",
      "upgradeAccountReview": "/upgrade-account-review",
      "upgradeAccountReviewN2N4": "/upgrade-account-review-n2-n4",
      "upgradeConfirmN2N4": "/upgrade-confirm-N2-page",
      "upgradeN2N4": "/upgrade-N2-page",
      "validateEmailPage": "/validate-email",
      "validatedEmailSuccess": "/validated-email-success",
      "welcomeExperience": "/welcome-experience"
    },
    "engine": "native",
    "native": true,
    "nativeAndroid": true,
    "nativeIos": false,
    "mockNative": false,
    "nativeShell": true,
    "skipNavigations": [{
      "from": "digitalActivation",
      "to": "login"
    }, {
      "from": "digitalActivationCall",
      "to": "digitalActivation"
    }, {
      "from": "digitalActivationMobileServices",
      "to": "digitalActivationCall"
    }, {
      "from": "aboutPage",
      "to": "loading"
    }, {
      "from": "accessKeyQrSelector",
      "to": "login"
    }, {
      "from": "accessKeyQrPage",
      "to": "accessKeyQrSelector"
    }, {
      "from": "accessKeyRecoveryPage",
      "to": "accessKeyQrSelector"
    }, {
      "from": "accessKeyPinCvvPage",
      "to": "accessKeyQrSelector"
    }, {
      "from": "accessKeyResetPage",
      "to": "accessKeyQrSelector"
    }, {
      "from": "accessKeyDateSelector",
      "to": "accessKeyQrSelector"
    }, {
      "from": "accessKeyQrSuccessPage",
      "to": "accessKeyQrSelector"
    }, {
      "from": "cardGenerateSuccess",
      "to": "loading"
    }, {
      "from": "cardGenerateError",
      "to": "loading"
    }, {
      "from": "cardGenerateTerms",
      "to": "cardGenerate"
    }, {
      "from": "clarificationsManagementSuccessPage",
      "to": "clarificationsManagementPage"
    }, {
      "from": "clarificationsManagementCareSuccessPage",
      "to": "clarificationsManagementCarePage"
    }, {
      "from": "clarificationsManagementClarificationSuccessPage",
      "to": "clarificationsManagementCarePage"
    }, {
      "from": "codicelPeerToPeerTransferReview",
      "to": "codicelPeerToPeerSend"
    }, {
      "from": "creditCardUpgradeSuccessPage",
      "to": "creditCardUpgradePage"
    }, {
      "from": "decrementReview",
      "to": "decrement"
    }, {
      "from": "dynamicLifeInsuranceSuccess",
      "to": "loading"
    }, {
      "from": "fatcaValidationSuccess",
      "to": "fatcaValidation"
    }, {
      "from": "kycSuccessPage",
      "to": "kycValidationPage"
    }, {
      "from": "pocketsAddWithdrawalMoneySuccessPage",
      "to": "pocketsAddWithdrawalMoneyMainPage"
    }, {
      "from": "pocketsDeleteSuccessPage",
      "to": "pocketsDeleteMainPage"
    }, {
      "from": "payrollPortabilityWrongBirthdayPage",
      "to": "payrollPortabilityConfirmBirthdayPage"
    }, {
      "from": "payrollPortabilityProcessPage",
      "to": "payrollPortabilityCreatePage"
    }, {
      "from": "payrollPortabilitySuccessPage",
      "to": "payrollPortabilityCreatePage"
    }, {
      "from": "errorPage",
      "to": "payrollPortabilityCreatePage"
    }, {
      "from": "payrollAdvancePendingPage",
      "to": "payrollAdvanceContractPage"
    }, {
      "from": "payrollAdvanceErrorPage",
      "to": "payrollAdvanceContractPage"
    }, {
      "from": "payrollAdvanceSuccessPage",
      "to": "payrollAdvanceContractPage"
    }, {
      "from": "payrollLinkSuccess",
      "to": "payrollLinkBenefits"
    }, {
      "from": "payrollLinkBenefits",
      "to": "payrollLink"
    }, {
      "from": "payrollLink",
      "to": "payroll"
    }, {
      "from": "loanPaymentsSuccessPage",
      "to": "loanPaymentsPage"
    }, {
      "from": "mortgageLoanPaymentSuccessPage",
      "to": "mortgageLoanPaymentPage"
    }, {
      "from": "mixCreditCardAndLoanReview",
      "to": "mixCreditCardAndLoan"
    }, {
      "from": "branchLocator",
      "to": "mixCreditCardAndLoan"
    }, {
      "from": "carLoanPaymentSuccessPage",
      "to": "carLoanPaymentPage"
    }, {
      "from": "creditCardHolderIncompleteInfoPage",
      "to": "creditCardHolderPage"
    }, {
      "from": "creditCardHolderSuccessPage",
      "to": "creditCardHolderPage"
    }, {
      "from": "creditCardHolderRejectionBuroPage",
      "to": "creditCardHolderPage"
    }, {
      "from": "creditCardHolderErrorPage",
      "to": "creditCardHolderPage"
    }, {
      "from": "errorPage",
      "to": "creditCardHolderPage"
    }, {
      "from": "errorPage",
      "to": "pocketsListPage"
    }, {
      "from": "mortgageSuccessPage",
      "to": "mortgagePage"
    }, {
      "from": "cardCreditCardPayment",
      "to": "operations"
    }, {
      "from": "creditCardPaymentReview",
      "to": "cardCreditCardPayment"
    }, {
      "from": "disabilityVideocallHearingTacticalPutAttention",
      "to": "disabilityVideocallHearingTactical"
    }, {
      "from": "disabilityVideocallHearingTacticalCalling",
      "to": "disabilityVideocallHearingTacticalPutAttention"
    }, {
      "from": "financingPurchaseReview",
      "to": "cardTransactions"
    }, {
      "from": "mortgageSuccessPage",
      "to": "mortgagePage"
    }, {
      "from": "carLoanSuccessPage",
      "to": "carLoanPage"
    }, {
      "from": "pinRequest",
      "to": "operations"
    }, {
      "from": "cardEditAlias",
      "to": "operations"
    }, {
      "from": "accountEditAlias",
      "to": "operations"
    }, {
      "from": "pointsRaffleReview",
      "to": "pointsRaffle"
    }, {
      "from": "pointsTransferReview",
      "to": "pointsTransfer"
    }, {
      "from": "requestBranchAppointmentDetailPage",
      "to": "requestBranchAppointmentPage"
    }, {
      "from": "cleanCardOperations",
      "to": "operations"
    }, {
      "from": "cleanCardOperations",
      "to": "debitCardTraking"
    }, {
      "from": "errorPage",
      "to": "relocationMainPage"
    }, {
      "from": "relocationMainPage",
      "to": "relocationMainPage"
    }, {
      "from": "relocationSuccessfulPage",
      "to": "relocationMainPage"
    }, {
      "from": "blockAndReplacementPage",
      "to": "operations"
    }, {
      "from": "blockAndReplacementSuccessPage",
      "to": "blockAndReplacementPage"
    }, {
      "from": "nonPreapprovedCreditCardPage",
      "to": "nonPreapprovedBureau"
    }, {
      "from": "productSolutionsSuccessPage",
      "to": "productSolutionsForPaymentPage"
    }, {
      "from": "pointsRedeemPurchasesReview",
      "to": "pointsRedeemPurchases"
    }, {
      "from": "nonPreapprovedLoanMainPage",
      "to": "contractProductsPage"
    }, {
      "from": "qrReaderPage",
      "to": "loading"
    }, {
      "from": "budgetsList",
      "to": "pfmBudgetsCreateReview"
    }, {
      "from": "pfmBudgetsCreateReview",
      "to": "pfmBudgetsCreate"
    }, {
      "from": "pfmBudgetsEditReview",
      "to": "pfmBudgetsEdit"
    }, {
      "from": "pfmDashboard",
      "to": "budgetsList"
    }, {
      "from": "pfmDashboard",
      "to": "loading"
    }, {
      "from": "pfmRecategorizationReview",
      "to": "pfmRecategorization"
    }, {
      "from": "atmLocator",
      "to": "ocLoanOfferPage"
    }, {
      "from": "paseTagCardRegister",
      "to": "paseTagCardList"
    }, {
      "from": "paseTagCardRegisterReview",
      "to": "paseTagCardRegister"
    }, {
      "from": "paseTagCardRechargeReview",
      "to": "paseTagCardRecharge"
    }, {
      "from": "checksManagementServiceTermsReview",
      "to": "checksManagementServiceTerms"
    }, {
      "from": "checksManagementReview",
      "to": "checksManagement"
    }, {
      "from": "checksManagement",
      "to": "checksManagementServiceTermsReview"
    }, {
      "from": "unifyCardsSuccessPage",
      "to": "unifyCreditCardsMainPage"
    }, {
      "from": "updateContractSuccess",
      "to": "updateContractConfirmation"
    }, {
      "from": "blockAndReplacementPage",
      "to": "confirmationConsumptionPage"
    }, {
      "from": "blockAndReplacementSuccessPage",
      "to": "confirmationConsumptionPage"
    }, {
      "from": "upgradeAccountRestrictions",
      "to": "upgradeAccountInit"
    }, {
      "from": "upgradeAccountReview",
      "to": "upgradeAccountInit"
    }, {
      "from": "upgradeAccountPrevQuestions",
      "to": "upgradeAccountInit"
    }, {
      "from": "upgradeAccountCustomerData",
      "to": "upgradeAccountInit"
    }, {
      "from": "cardlessWithdrawal",
      "to": "operations"
    }, {
      "from": "cardlessWithdrawalReview",
      "to": "cardlessWithdrawal"
    }, {
      "from": "curpSuccessPage",
      "to": "curpPage"
    }, {
      "from": "updateNationalIdSuccess",
      "to": "updateNationalId"
    }, {
      "from": "updateAddressSuccessPage",
      "to": "updateAddressStepInputPage"
    }, {
      "from": "transfersSuccess",
      "to": "transfers"
    }, {
      "from": "internationalTransfersPanelPage",
      "to": "operationals"
    }, {
      "from": "internationalTransfersPanelPage",
      "to": "operations"
    }, {
      "from": "topUp",
      "to": "operations"
    }, {
      "from": "feedback",
      "to": "cardlessWithdrawalReview"
    }, {
      "from": "ocPayrollAdvanceReview",
      "to": "ocPayrollAdvancePage"
    }, {
      "from": "specialSalesPage",
      "to": "loading"
    }, {
      "from": "refundsReview",
      "to": "refunds"
    }, {
      "from": "internationalTransfersSuccessPage",
      "to": "internationalTransfersPage"
    }, {
      "from": "internationalTransfersPage",
      "to": "internationalTransfersPanelPage"
    }, {
      "from": "internationalTransfersPage",
      "to": "operationals"
    }, {
      "from": "internationalTransfersPage",
      "to": "operations"
    }, {
      "from": "ocMetaSeguraOfferSuccess",
      "to": "ocMetaSeguraOfferPage"
    }, {
      "from": "nonPreApprovedCarCertificateSuccess",
      "to": "nonPreApprovedCarCertificate"
    }, {
      "from": "nonPreApprovedCarCertificate",
      "to": "contractProductsPage"
    }, {
      "from": "ocPaymentPlanCardSuccessPage",
      "to": "ocSupportFixedPaymentsPage"
    }, {
      "from": "ocPaymentPlanCardErrorPage",
      "to": "ocSupportFixedPaymentsPage"
    }, {
      "from": "recipientsSuccessPage",
      "to": "recipientsInit"
    }, {
      "from": "openDigitalAccountSuccess",
      "to": "login"
    }],
    "pagesPath": "pages/",
    "once": true,
    "pageDefinitions": [{
      "name": "aboutInfo",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "aboutPage",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "accessKeyDateSelector",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "accessKeyDemo",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "accessKeyPinCvvPage",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "accessKeyQrPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "accessKeyQrSelector",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "accessKeyQrSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "accessKeyRecoveryPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "accessKeyResetPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "accountEditAlias",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "accountStatementsPdfPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "accountTransactionDetail",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "accountsEditAlias",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "addFundToContract",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "addFundToContractReview",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "addVideoSelfie",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "additionalCardDetail",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "additionalCreditCardMainPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "additionalCreditCardSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "appPermissionsInfoPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "appPermissionsPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "applicationFeedback",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "appsSectionPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "assistanceManagerBenefitsPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "assistanceManagerInfoPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "assistanceSection",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "assistanceSectionInfo",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "atmLocator",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "billPaymentsDashboard",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "billPaymentsPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "billPaymentsSuccess",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "blackhawkAnswer",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "blackhawkAnswerDetail",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "blackhawkInformation",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "blackhawkPurchase",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "blackhawkPurchaseDetail",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "blackhawkPurchaseReview",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "blackhawkWelcome",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "blockAndReplacementPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "blockAndReplacementSuccessPage",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "branchLocator",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "budget",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "budgetsList",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "businessAccountInfo",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "callMeBackAssistanceManager",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "callMeBackAssistanceManagerSuccess",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "callMeBackPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "carLoanPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "carLoanPaymentPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "carLoanPaymentSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "carLoanSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "cardCreditCardPayment",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "cardDetail",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "cardDynamicCvv",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "cardEditAlias",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "cardGenerate",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "cardGenerateError",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "cardGenerateSuccess",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "cardGenerateTerms",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "cardMoreInfo",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "cardOnOffHelpPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "cardTransactionDetail",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "cardTransactions",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "cardlessWithdrawal",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "cardlessWithdrawalOperation",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "cardlessWithdrawalReview",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "channelSettings",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "checkUpHealthPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "checkUpOfferDetailPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "checkUpPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "checksDeposits",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "checksDepositsCheckAggregator",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "checksDepositsDetail",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "checksDepositsList",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "checksDepositsListSearcher",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "checksDepositsPhotos",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "checksDepositsReview",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "checksManagement",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "checksManagementAddCheck",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "checksManagementCancelReview",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "checksManagementDetail",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "checksManagementFeedback",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "checksManagementList",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "checksManagementListSearcher",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "checksManagementReview",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "checksManagementServiceTerms",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "checksManagementServiceTermsReview",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "checksSection",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "clarificationsListCare",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "clarificationsListPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "clarificationsManagementCarePage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "clarificationsManagementCareSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "clarificationsManagementClarificationSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "clarificationsManagementPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "clarificationsManagementSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "clarificationsTrackingCare",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "cleanCardOperations",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "cleanCardQrFaqs",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "codiAccountValidationPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "codiEnrollPage",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "codiRegisterAccountsPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "codiSmsInfoPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "codiWelcomePage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "codicelAgreeAndRemoveConsent",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "codicelPeerToPeerSend",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "codicelPeerToPeerTransferReview",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "configureProductsPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "confirmationConsumptionPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "contactsAgenda",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "contractPaymentExistingPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "contractProductsPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "creditBureau",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "creditBureauReceipt",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "creditCardHolderErrorPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "creditCardHolderIncompleteInfoPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "creditCardHolderNoticePage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "creditCardHolderPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "creditCardHolderRejectionBuroPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "creditCardHolderSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "creditCardPaymentReview",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "creditCardTracking",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "creditCardUpgradePage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "creditCardUpgradeSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "curpPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "curpSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "customerContractsHelpPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "customerContractsListPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "dashboard",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "dashboardUnavailableFooterOperationsPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "debitCardTracking",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "debitCardTrackingDetail",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "debitTransactionDetail",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "debitTransactions",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "decrement",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "decrementReview",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "deferredSignature",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "deferredSignatureEquityContract",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "deferredSignatureEquityContractReview",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "deferredSignatureStructuredProducts",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "deferredSignatureStructuredProductsReview",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "demoFeedback",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "deposit",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "depositEditAlias",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "depositHiring",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "depositHiringSuccess",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "depositImpositionUpdate",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "depositImpositionUpdateSuccess",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "depositMoreInfo",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "depositSale",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "depositSaleSuccess",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "depositTransactionDetail",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "depositsPurchaseSale",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "depositsPurchaseSaleSuccess",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "deviceInsurance",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "deviceInsuranceExclusions",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "deviceInsuranceSuccess",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "digitalActivation",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "digitalActivationCall",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "digitalActivationMobileServices",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "digitalCardOnOffHelpPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "disabilityVideocallHearingTactical",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "disabilityVideocallHearingTacticalCalling",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "disabilityVideocallHearingTacticalPutAttention",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "dynamicLifeInsuranceAddBeneficiaryPage",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "dynamicLifeInsuranceEditCoverageAmountPage",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "dynamicLifeInsuranceEditPercentagePage",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "dynamicLifeInsuranceMainPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "dynamicLifeInsuranceNewAddressPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "dynamicLifeInsuranceOfferPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "dynamicLifeInsuranceSuccess",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "editCreditCardLimits",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "emailComposer",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "emergencyChangePassword",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "emergencyLostCard",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "emergencyNeedCash",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "emergencyReports",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "emergencyTrackingReports",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "emergencyZone",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "equity",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "equityContractsContribution",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "equityContractsContributionSuccess",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "equityContractsInvestmentDetail",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "equityContractsWithdrawal",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "equityContractsWithdrawalSuccess",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "equityEditAlias",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "equityErrorPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "equityMoreInfo",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "errorPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "faqsPointsRedeemPage",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "fatcaValidation",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "fatcaValidationResidenceForm",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "fatcaValidationSuccess",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "feedback",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "feedbackContextualNPS",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "filteredPoints",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "financeTransactionMultipurchase",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "financeTransactionMultipurchaseReview",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "financialHealthPushAdvice",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "financialHealthPushAdviceFeedback",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "financingDebitListPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "financingDebitPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "financingDebitReceipt",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "financingPurchase",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "financingPurchaseReview",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "flexibleLineCredit",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "flexibleLineCreditFaqs",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "fund",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "fundContractedDetail",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "fundEditAlias",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "fundMoreInfo",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "fundsContribution",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "fundsHiring",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "fundsHiringReview",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "fundsInvestmentsContributionSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "fundsInvestmentsWithdrawalSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "fundsWithdrawal",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "goals",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "help",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "helpSectionDetailPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "helpSectionPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "historyCreditPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "historyCreditReceipt",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "inappPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "increment",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "incrementReview",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "instantCash",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "instantCashSuccessfulScreen",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "insurance",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "insuranceCancelPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "insuranceCancelationRequest",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "insuranceCancelationSuccess",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "insuranceConsultPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "insuranceDetailCancelPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "insuranceMoreInfo",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "interestSimulator",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "internationalRefundsPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "internationalRefundsReceiptPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "internationalTransfersCreateRecipientPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "internationalTransfersDetailPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "internationalTransfersHistorical",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "internationalTransfersPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "internationalTransfersPanelPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "internationalTransfersReviewRecipientPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "internationalTransfersSuccessPage",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "investmentsFollowUp",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "investmentsFollowUpDistribution",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "investmentsFollowUpFeedback",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "invitationNonAccountClient",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "kycSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "kycValidationPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "lifeInsuranceAddBeneficiaryPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "lifeInsuranceEditPercentagePage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "lifeInsuranceHelpPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "lifeInsuranceMainPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "lifeInsuranceNoticesPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "lifeInsuranceQuestionsPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "lifeInsuranceSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "limitedOperativesInfoPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "listCreditCardLimits",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "loading",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "loan",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "loanEditAlias",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "loanMoreInfo",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "loanPaymentsEmailErrorPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "loanPaymentsErrorPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "loanPaymentsPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "loanPaymentsSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "lockCardsPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "login",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "menuVisualAdditionalPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "menuVisualPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "mgmCampaignsAndRewardsPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "mgmDetailCampaignsPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "mgmDetailDynamicPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "mixCreditCardAndLoan",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "mixCreditCardAndLoanReview",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "mobilePayment",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "mobileTopUp",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "mobileTopUpReview",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "monthlyStatementPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "mortgageCertificateCancellationSuccess",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "mortgageCertificateDocs",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "mortgageCertificateReview",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "mortgageLoanPaymentPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "mortgageLoanPaymentSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "mortgagePage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "mortgageSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "myConversationChatPage",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "myConversationMessagePage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "myConversationSearchPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "myConversationThemePage",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "noClientAdditionalCardInfo",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "noClientBusinessDebitCardInfo",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "noProductsHiredClient",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "nonPreApprovedCarCertificate",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "nonPreApprovedCarCertificateSuccess",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "nonPreapprovedBureauPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "nonPreapprovedCreditCardPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "nonPreapprovedLoanMainPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "notificationsList",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "notificationsListSearch",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "notificationsListSearchResult",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "notificationsSettingsEditPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "notificationsSettingsPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "ocLoanOfferPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "ocLoanOfferSuccessPage",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "ocMetaSeguraOfferPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "ocMetaSeguraOfferSuccess",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "ocPaymentPlanCardErrorPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "ocPaymentPlanCardSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "ocPayrollAdvancePage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "ocPayrollAdvanceReview",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "ocPayrollPortability",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "ocPayrollPortabilitySuccess",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "ocSupportFixedPaymentsPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "offerCtaModalPage",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "offerTdcModalPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "openDigitalAccount",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "openDigitalAccountMultistep",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "openDigitalAccountSignaturePadModal",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "openDigitalAccountSuccess",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "operationalLimitsPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "operationals",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "operations",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "paseTagCardInfo",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "paseTagCardList",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "paseTagCardRecharge",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "paseTagCardRechargeReview",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "paseTagCardRegister",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "paseTagCardRegisterInfo",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "paseTagCardRegisterReview",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "patrimonialAttentionHoursMessagePage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "patrimonialContractDetailsPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "patrimonialDetailPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "patrimonialEquitityAssistancePage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "paymentsThirdPartyWalletVerification",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "payroll",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "payrollAddressUpdateReceipt",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "payrollAddressUpdateStepInputPage",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "payrollAdvanceContractPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "payrollAdvancePendingPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "payrollAdvanceSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "payrollLink",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "payrollLinkBenefits",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "payrollLinkSuccess",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "payrollPortabilityCreatePage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "payrollPortabilityListPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "payrollPortabilitySuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "pdfViewer",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "pfmBudgetsCreate",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "pfmBudgetsCreateReview",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "pfmBudgetsEdit",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "pfmBudgetsEditReview",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "pfmDashboard",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "pfmExpensesTrends",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "pfmExpensesTrendsPeriodSelection",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "pfmIncomeExpenses",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "pfmMessageInfoDashboard",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "pfmPeriod",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "pfmProducts",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "pfmRecategorization",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "pfmRecategorizationReview",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "pfmSettings",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "pfmTransactionDetail",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "pfmaggregation",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "pinRequest",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "pocketMovementListPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "pocketsAddWithdrawSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "pocketsCreatePage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "pocketsDeletePage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "pocketsEditNoPayroll",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "pocketsListPage",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "pocketsNoticePage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "pocketsSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "pointsRaffle",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "pointsRaffleFaq",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "pointsRaffleReview",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "pointsRedeemPurchases",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "pointsRedeemPurchasesReview",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "pointsTransfer",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "pointsTransferReview",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "poisDetail",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "portabilityE2EPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "ppfContractPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "ppfSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "productSolutionsForPaymentPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "productSolutionsSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "profileAvatar",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "profilePage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "pushNotificationListPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "qrReaderPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "recipientsAddressForm",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "recipientsForm",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "recipientsInit",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "recipientsSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "refunds",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "refundsReview",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "registerUser",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "relevantFactsDetail",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "relocationMainPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "relocationSuccessfulPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "requestBranchAppointmentDetailPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "requestBranchAppointmentListPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "requestBranchAppointmentPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "requestBranchAppointmentSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "requestDebitCard",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "requestDebitCardSuccess",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "requestFiscalData",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "requestFiscalDataSuccess",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "reward",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "rewardFaqDetail",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "rewardNewExperience",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "rewardOriginCardPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "sa",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "searchPlace",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "searchPlacePage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "securityMenuPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "securityProfile",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "securitySettingsDiscreetMode",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "securitySettingsDiscreetModeLottieByCamera",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "securitySettingsDiscreetModeLottieByGesture",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "securityTipsDetailPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "securityTipsGlossaryPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "securityTipsPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "selfDrivenRoundUp",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "sendEmailSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "serviceBoxInfoPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "serviceBoxPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "settingsPage",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "specialSalesModalErrorPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "specialSalesModalPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "specialSalesPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "specialSalesSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "successModifyPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "sustainabilityCarbonFootprintPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "sustainabilityGlossaryPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "sustainabilityNews",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "sustainabilityNewsDetail",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "sustainabilityPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "tagCardDetail",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "tagCardInfo",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "tagCardList",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "tagRecharge",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "tagRechargeSuccessPage",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "tagRegisterInfoPage",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "tagRegisterPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "tagRegisterSuccessPage",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "toggleCardsPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "topUp",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "transfers",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "transfersSuccess",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "travelInsuranceCoverages",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "travelInsurancePage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "travelInsuranceSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "travelInsuranceUserDataModal",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "unifyCardsSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "unifyCreditCardsMainPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "unitLinkedBalancePage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "unitLinkedContractDetailPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "unsubscribe",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "updateAddressOptionsPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "updateAddressStepInputPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "updateAddressSuccessPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "updateAddressUploadFilesPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "updateContractConfirmation",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "updateContractRestrictions",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "updateContractSuccess",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "updateEmailPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "updateNationalId",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "updateNationalIdSuccess",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }, {
      "name": "upgradeAccountCustomerData",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "upgradeAccountInit",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "upgradeAccountPrevQuestions",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "upgradeAccountRestrictions",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "upgradeAccountRestrictionsModular",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "upgradeAccountReview",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "upgradeAccountReviewN2N4",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "upgradeConfirmN2N4",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "upgradeN2N4",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "validateEmailPage",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "validatedEmailSuccess",
      "type": "dynamic",
      "hasModules": false
    }, {
      "name": "welcomeExperience",
      "type": "dynamic",
      "hasModules": false,
      "adapter": "polymer"
    }],
    "pages": []
  };
  window.AppComposerConfig = {};

  function updateCache() {
    if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
      window.applicationCache.swapCache();
    }
  }

  function removeSplashScreen() {
    var loadEl = document.getElementById('splash');

    if (loadEl) {
      loadEl.parentNode.removeChild(loadEl);
      document.body.classList.remove('loading');
    }
  }

  function continueLoading() {
    if (isLoadingInitialPage()) {
      fireComponentsLoadEvent();
    } else {
      loadAppElements(fireComponentsLoadEvent);
    }
  }

  function fireComponentsLoadEvent() {
    var eventComponentsLoaded = new CustomEvent('componentsLoaded');
    document.body.dispatchEvent(eventComponentsLoaded);
  }

  function onScriptLoadError(file, cb) {
    return function () {
      var customEvent = new CustomEvent('scriptLoadError', {
        detail: file
      });
      document.body.dispatchEvent(customEvent);

      if (typeof cb === 'function') {
        cb();
      }
    };
  }

  function _importFile(url, cb, async) {
    var loadAsync = typeof async !== 'undefined' ? async : false;
    var nextBundle = document.createElement('link');
    nextBundle.rel = 'import';
    nextBundle.href = url;
    nextBundle.addEventListener('load', cb);
    nextBundle.addEventListener('error', onScriptLoadError(nextBundle.href, cb));

    if (loadAsync) {
      nextBundle.setAttribute('async', '');
    }

    document.head.appendChild(nextBundle);
  }

  function loadInitialPolymerComponents(cb) {
    _importFile(window.AppConfig.deployEndpoint + window.AppConfig.componentsPath + 'initial-components.html', cb);
  }

  function loadAppPolymerComponents(cb) {
    _importFile(window.AppConfig.deployEndpoint + window.AppConfig.componentsPath + 'app-components.html', cb, true);
  }

  function loadInitialLitComponents(cb) {
    _importFile(window.AppConfig.deployEndpoint + 'lit-initial-components.html', cb);
  }

  function loadAppLitComponents(cb) {
    _importFile(window.AppConfig.deployEndpoint + 'lit-components.html', cb, true);
  }

  function loadElements() {
    if (window.AppConfig.onlyLitElements) {
      loadInitialLitComponents(continueLoading);
    } else {
      loadInitialPolymerComponents(function () {
        if (window.AppConfig.enableLitElement) {
          loadInitialLitComponents(continueLoading);
        } else {
          continueLoading();
        }
      });
    }
  }

  function loadAppElements(cb) {
    if (window.AppConfig.onlyLitElements) {
      loadAppLitComponents(cb);
    } else {
      loadAppPolymerComponents(function () {
        if (window.AppConfig.enableLitElement) {
          loadAppLitComponents(cb);
        } else {
          if (cb && typeof cb === 'function') {
            cb();
          }
        }
      });
    }
  }

  function loadWebComponentPolyfill() {
    var url = 'none';

    if (window.AppConfig.onlyLitElements) {
      url = window.AppConfig.deployEndpoint + 'scripts/webcomponentsjs/webcomponents-lite.js';
    } else {
      url = window.AppConfig.deployEndpoint + window.AppConfig.componentsPath + 'webcomponentsjs/webcomponents-lite.js';
    }

    var polyfill = document.createElement('script');
    polyfill.src = url;
    polyfill.addEventListener('load', proxyCustomElements); //window.addEventListener('WebComponentsReady', proxyCustomElements);

    polyfill.addEventListener('error', onScriptLoadError(polyfill.src));
    document.head.appendChild(polyfill);
  }

  function isLoadingInitialPage() {
    var initialPage;
    var hash;
    var isInitialPage = true;

    if (window.AppConfig.initialBundle && window.AppConfig.initialBundle.length > 0) {
      hash = window.location.hash;

      if (hash === '' || hash === '#!/') {
        isInitialPage = true;
      } else {
        initialPage = window.AppConfig.initialBundle[0].split('.')[0];
        isInitialPage = hash.indexOf(initialPage) > -1;
      }
    }

    return isInitialPage;
  }

  function onNavigation(msg) {
    var customEvent = new CustomEvent('aria-announce', {
      detail: msg.detail.detail.page
    });
    document.body.dispatchEvent(customEvent);
  }

  function onAnnounce(msg) {
    var announcer = document.querySelector('#announcer');

    if (announcer) {
      announcer.textContent = msg.detail;
    }
  }

  function detectPlatform(which, orelse) {
    return 'desktop'; //return window.bowser[which] ? which : orelse;
  } //TODO: write a proper platform detection


  function getPlatform() {
    return detectPlatform('ios', detectPlatform('android', 'desktop'));
  }

  function shouldAddCordovaScript(config) {
    var userAgent = window.navigator.userAgent.toLowerCase();
    var ios = /iphone|ipod|ipad/.test(userAgent);
    var android = /android/.test(userAgent);
    var safari = /safari/.test(userAgent);
    var webViewWv = / wv\)/.test(userAgent);
    var crosswalk = /crosswalk/.test(userAgent); //var webViewVersion = /version/.test(userAgent);

    if (!config.cordovaScript) {
      return false;
    }

    if (ios) {
      return !safari;
    }

    if (android) {
      return webViewWv || crosswalk;
    }
  }

  function appendCordovaScript() {
    var script = document.createElement('script');
    script.setAttribute('src', window.AppConfig.cordovaScript);
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('charset', 'utf-8');
    script.onerror = onScriptLoadError(window.AppConfig.cordovaScript);
    document.body.appendChild(script);
  }

  function generateRequestHeaders() {
    var composerHeader = {};

    if (window.AppConfig.composerHeaderKey && window.AppConfig.composerHeaderValue) {
      composerHeader[window.AppConfig.composerHeaderKey] = window.AppConfig.composerHeaderValue;
    }

    return composerHeader;
  }

  function onRender(template, fixed) {
    if (!template.parentNode) {
      document.getElementById(this.mainNode).appendChild(template);
      var eventComponentsLoaded = new CustomEvent('componentsInTemplateLoaded');
      document.body.dispatchEvent(eventComponentsLoaded);
    }

    if (fixed) {
      document.getElementById('external__header').innerHTML = '';
      document.getElementById('external__footer').innerHTML = '';
      fixed.forEach(function (component) {
        document.getElementById(component.zone).appendChild(component.node);
      });
    }
  }

  function startCore(options) {
    return function () {
      var reference = getBridgeEngineReference(options);
      new reference(options);
    };
  }

  function getBridgeEngineReference(options) {
    var enginesNamespace = {
      polymer: 'CellsPolymerBridge',
      native: 'CellsNativeBridge'
    };
    var defaultEngine = 'polymer';
    var engine = (options.engine || defaultEngine).toLowerCase();

    if (!enginesNamespace[engine]) {
      engine = defaultEngine;
      console.warn('Invalid value for AppConfig.engine. Using ' + defaultEngine);
    }

    var engineReference = enginesNamespace[engine];
    return window[engineReference];
  }

  function webComponentsSupported() {
    return window.customElements && 'import' in document.createElement('link') && 'content' in document.createElement('template');
  }

  function proxyCustomElements() {
    var _customElementsDefine = window.customElements.define;

    window.customElements.define = function (name, cl, conf) {
      if (!customElements.get(name)) {
        _customElementsDefine.call(window.customElements, name, cl, conf);
      } else {
        console.warn(name + 'has been defined twice');
      }
    };

    loadElements();
  }

  window.CellsPolymer = {
    start: function (options) {
      var config = Object.assign({
        binding: 'currentview',
        cache: window.AppConfig.coreCache || false,
        domMode: 'shadow',
        headers: generateRequestHeaders(),
        mainNode: 'app__content',
        onRender: onRender,
        getPlatform: getPlatform,
        preCache: false,
        preRender: false
      }, window.AppConfig, options, AppComposerConfig);
      var onNavigation = config.onNavigation || onNavigation;
      var removeSplash = config.removeSplashScreen || removeSplashScreen;
      var updateCache = config.updateCache || updateCache;
      window.Polymer = window.Polymer || {
        dom: config.domMode,
        lazyRegister: 'max',
        useNativeCSSProperties: true
      };
      document.body.addEventListener('aria-announce', onAnnounce);
      document.body.addEventListener('componentsInTemplateLoaded', removeSplash, {
        once: true
      });

      if (config.initialBundle && isLoadingInitialPage() && !window.AppConfig.onlyLitElements) {
        document.body.addEventListener('componentsInTemplateLoaded', loadAppElements);
      }

      document.body.addEventListener('componentsLoaded', startCore(config), {
        once: true
      });

      if (options.enableSSLPinning) {
        document.body.addEventListener('componentsLoaded', options.enableSSLPinning, {
          once: true
        });
      }

      document.getElementById(config.mainNode).addEventListener('nav-request', onNavigation);

      if (window.applicationCache) {
        window.applicationCache.addEventListener('updateready', updateCache);
      }

      if (shouldAddCordovaScript(config)) {
        appendCordovaScript();
      }

      if (!config.skipInitialLoad) {
        this._loadElements();
      }
    },
    _loadElements: function () {
      if (webComponentsSupported()) {
        proxyCustomElements();
      } else {
        loadWebComponentPolyfill();
      }
    }
  };
})(document);