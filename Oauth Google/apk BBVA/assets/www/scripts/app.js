/*eslint-disable */
(function (document) {
  /*eslint-enable */
  'use strict';

  sessionStorage.setItem('x-api-key', window.AppConfig.globalServices.apiKeyAp);

  function updateHTTPPlugin() {
    if (window.AppConfig.native) {
      window.cordovaCells = window.cordovaCells || {};
      window.cordovaCells.Http = {
        get: function (url, params, headers, success, failure) {
          window.CellsNativePlugins.pluginManager.execute(success, failure, 'Http', 'get', {
            'url': url,
            'params': params,
            'headers': headers
          });
        },
        post: function (url, params, headers, success, failure, multipart) {
          const requestModel = {
            'url': url,
            'params': params,
            'headers': headers
          };

          if (multipart) {
            requestModel.multipart = multipart;
          }

          window.CellsNativePlugins.pluginManager.execute(success, failure, 'Http', 'post', requestModel);
        },
        put: function (url, params, headers, success, failure, multipart) {
          const requestModel = {
            'url': url,
            'params': params,
            'headers': headers
          };

          if (multipart) {
            requestModel.multipart = multipart;
          }

          window.CellsNativePlugins.pluginManager.execute(success, failure, 'Http', 'put', requestModel);
        },
        head: function (url, params, headers, success, failure) {
          window.CellsNativePlugins.pluginManager.execute(success, failure, 'Http', 'head', {
            'url': url,
            'params': params,
            'headers': headers
          });
        },
        patch: function (url, params, headers, success, failure) {
          window.CellsNativePlugins.pluginManager.execute(success, failure, 'Http', 'patch', {
            'url': url,
            'params': params,
            'headers': headers
          });
        },
        delete: function (url, params, headers, success, failure) {
          window.CellsNativePlugins.pluginManager.execute(success, failure, 'Http', 'delete', {
            'url': url,
            'params': params,
            'headers': headers
          });
        },
        cleanAllCookies: function (success, failure) {
          window.CellsNativePlugins.pluginManager.execute(success, failure, 'Http', 'cleanAllCookies', {});
        },
        sslPinning: function (certificates, success, failure) {
          window.CellsNativePlugins.pluginManager.execute(success, failure, 'Http', 'sslPinning', {
            'certificates': certificates
          });
        },
        acceptAllCerts: function (allow, success, failure) {
          window.CellsNativePlugins.pluginManager.execute(success, failure, 'Http', 'acceptAllCerts', {
            'allow': allow
          });
        }
      };
      window.CellsNativePlugins = window.CellsNativePlugins || {};
      window.CellsNativePlugins.Nativesettings = {
        getSetting: function (options, successCallback, errorCallback) {
          window.CellsNativePlugins.pluginManager.execute(successCallback, errorCallback, 'NativeSettings', 'opensetting', options);
        }
      };
    }
  }

  var routes = window.AppConfig.routes;

  var userInfo = function () {
    var params = localStorage.getItem('cells-params');

    try {
      return JSON.parse(params) && JSON.parse(params).userInfo;
    } catch (e) {
      return null;
    }
  }();

  if (!window.AppConfig.nativeBuild && userInfo && userInfo.userId) {
    routes.login = '/';
    routes.welcome = '/welcome';

    if (window.location.href.split('#!/')[1] === 'login') {
      window.location.href = window.location.origin;
    }
  }

  var featureFlag = {
    defaultChangedCallback: function (featureFlagValue) {
      this.hidden = !featureFlagValue;
      return !!featureFlagValue;
    }
  };

  function updateAppsFlyerPlugin() {
    if (window.AppConfig.native) {
      var AppsFlyer = {
        trackEvent: function (payload, success, error) {
          window.CellsNativePlugins.pluginManager.execute(success, error, 'AppsFlyerPlugin', 'trackEvent', payload);
        }
      };
      window.CellsNativePlugins = window.CellsNativePlugins || {};
      window.CellsNativePlugins.AppFlyer = AppsFlyer;
    }
  }
  /* eslint-disable complexity */


  function beforeBackStep(backNavigation) {
    var srcPage = backNavigation.currentPage;
    var preventBackNavigation = ['accessKeyDateSelector', 'accessKeyPinCvvPage', 'accessKeyQrPage', 'accessKeyQRReader', 'accessKeyRecoveryPage', 'accessKeyResetPage', 'accountStatementsPdfPage', 'additionalCardDetail', 'applicationFeedback', 'atmLocator', 'billPaymentsDashboard', 'billPaymentsPage', 'billPaymentsSuccess', 'blackhawkPurchase', 'blackhawkPurchaseDetail', 'cardCreditCardPayment', 'cardDetail', 'cardDynamicCvv', 'cardGenerateSuccess', 'cardGenerateTerms', 'cardlessWithdrawalOperation', 'cardTransactionDetail', 'cardTransactions', 'carLoanPage', 'carLoanPaymentPage', 'channelSettings', 'checksDeposits', 'checksDepositsCheckAggregator', 'checksDepositsPhotos', 'checksDepositsReview', 'checksManagement', 'checksManagementAddCheck', 'clarificationsManagementCarePage', 'clarificationsManagementPage', 'cleanCardOperations', 'codicelAgreeAndRemoveConsent', 'codicelPeerToPeerSend', 'codicelPeerToPeerTransferReview', 'contractPaymentExistingPage', 'creditBureau', 'creditCardHolderPage', 'creditCardUpgradePage', 'curpPage', 'customerContractsListPage', 'dashboard', 'debitCardTracking', 'debitTransactionDetail', 'debitTransactions', 'decrement', 'decrementReview', 'digitalActivation', 'dynamicLifeInsuranceMainPage', 'dynamicLifeInsuranceOfferPage', 'editCreditCardLimits', 'editCreditCardLimits', 'emergencyReports', 'equity', 'equityContractsContribution', 'equityContractsContributionSuccess', 'equityContractsInvestmentDetail', 'equityContractsWithdrawal', 'equityContractsWithdrawalSuccess', 'feedbackContextualNPS', 'filteredPoints', 'financeTransactionMultipurchase', 'financialHealthPushAdviceFeedback', 'financingDebitListPage', 'financingDebitPage', 'financingPurchase', 'flexibleLineCredit', 'flexibleLineCreditFaqs', 'fundsContribution', 'fundsHiring', 'fundsInvestmentsContributionSuccessPage', 'fundsInvestmentsWithdrawalSuccessPage', 'fundsWithdrawal', 'goals', 'helpSectionPage', 'increment', 'incrementReview', 'interestSimulator', 'internationalTransfersCreateRecipientPage', 'internationalTransfersPage', 'internationalTransfersPanelPage', 'internationalTransfersReviewRecipientPage', 'internationalTransfersSuccessPage', 'investmentsFollowUp', 'investmentsFollowUpDistribution', 'lifeInsuranceMainPage', 'listCreditCardLimits', 'loanPaymentsPage', 'mgmCampaignsAndRewardsPage', 'mgmDetailCampaignsPage', 'mixCreditCardAndLoan', 'mobilePayment', 'mobileTopUp', 'mobileTopUpReview', 'monthlyStatementPage', 'monthlyStatementPage', 'mortgageLoanPaymentPage', 'mortgagePage', 'myConversationChatPage', 'nonPreApprovedCarCertificate', 'nonPreApprovedCarCertificateSuccess', 'notificationsSettingsEditPage', 'notificationsSettingsPage', 'ocLoanOfferPage', 'ocMetaSeguraOfferPage', 'ocPayrollAdvancePage', 'ocPaymentPlanCardErrorPage', 'ocPaymentPlanCardSuccessPage', 'ocPayrollPortability', 'ocSupportFixedPaymentsPage', 'operationalLimitsPage', 'operationals', 'paseTagCardRecharge', 'paseTagCardRegister', 'payroll', 'payrollAdvanceContractPage', 'payrollPortabilityCreatePage', 'payrollLink', 'payrollLinkBenefits', 'payrollLinkSuccess', 'pinRequest', 'pocketsAddWithdrawSuccessPage', 'pocketsCreatePage', 'pocketsDeletePage', 'pocketsEditNoPayroll', 'pocketsSuccessPage', 'pointsTransfer', 'productSolutionsForPaymentPage', 'productSolutionsSuccessPage', 'requestBranchAppointmentPage', 'requestDebitCard', 'requestDebitCardSuccess', 'reward', 'rewardFaqDetail', 'rewardNewExperience', 'rewardOriginCardPage', 'sa', 'selfDrivenRoundUp', 'sustainabilityNewsDetail', 'sustainabilityPage', 'transfers', 'transfersSuccess', 'updateEmailPage', 'updateNationalId', 'upgradeAccountCustomerData', 'upgradeAccountInit', 'upgradeAccountPrevQuestions', 'upgradeAccountRestrictions', 'upgradeAccountReview', 'validatedEmailSuccess', 'validateEmailPage'];
    var canContinue = !preventBackNavigation.includes(srcPage);
    return {
      continue: canContinue
    };
  }

  window.CellsPolymer.start({
    avoidPolymerEventCache: true,
    mainNode: window.AppConfig.mainNode,
    binding: 'currentview',
    initialTemplate: window.AppConfig.native ? 'loading' : 'login',
    cache: window.AppConfig.cache,
    debug: window.AppConfig.debug,
    engine: window.AppConfig.engine,
    fullProgressiveTransition: window.AppConfig.fullProgressiveTransition,
    prplLevel: window.AppConfig.prplLevel,
    preCache: window.AppConfig.preCache,
    preRender: window.AppConfig.preRender,

    /*eslint-disable */
    generateRequestUrl: function generateRequestUrl(page) {
      /*eslint-enable */
      return window.AppConfig.composerEndpoint + page + '.json';
    },
    componentsPath: window.AppConfig.componentsPath,
    nativeNamespace: 'NativeBridge',
    onNativeBackStepRequest: beforeBackStep,
    routes: routes,
    skipNavigations: window.AppConfig.skipNavigations,
    initialPreRender: {},
    onRender: function onrender(template, fixed) {
      updateAppsFlyerPlugin();
      updateHTTPPlugin();

      if (!template.parentNode) {
        document.getElementById(this.mainNode).appendChild(template);
        var eventComponentsLoaded = document.createEvent('Event');
        eventComponentsLoaded.initEvent('componentsInTemplateLoaded', true, true);
        document.body.dispatchEvent(eventComponentsLoaded);
      }

      if (fixed) {
        fixed.forEach(function (component) {
          document.getElementById(component.zone).appendChild(component.node);
        });
      }
    }
  });

  var proxyCustomElements = function proxyCustomElements() {
    var _customElementsDefine = window.customElements.define;
    /*eslint-disable */

    window.customElements.define = (name, cl, conf) => {
      /*eslint-enable */
      if (!customElements.get(name)) {
        _customElementsDefine.call(window.customElements, name, cl, conf);
      } else {
        console.warn(`${name} has been defined twice`);
      }
    };
  };

  proxyCustomElements();
  /*eslint-disable */

  document.documentElement.addEventListener('touchmove', function (event) {
    /*eslint-enable */
    event = event.originalEvent || event;

    if (event.scale > 1) {
      event.preventDefault();
    }
  }, false);
  document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
  });
})(document);