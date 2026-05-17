(window.webpackJsonp = window.webpackJsonp || []).push([[12], {
  983: function (t, e, r) {
    "use strict";

    r.r(e), r.d(e, "BbvaCardTransactionsEsApiDm", function () {
      return _;
    });
    var n,
        o,
        i = r(0),
        a = r(641),
        c = r(4),
        u = r(8),
        s = r(613);

    function l(t) {
      return (l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t;
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
      })(t);
    }

    function f() {
      /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
      f = function () {
        return t;
      };

      var t = {},
          e = Object.prototype,
          r = e.hasOwnProperty,
          n = Object.defineProperty || function (t, e, r) {
        t[e] = r.value;
      },
          o = "function" == typeof Symbol ? Symbol : {},
          i = o.iterator || "@@iterator",
          a = o.asyncIterator || "@@asyncIterator",
          c = o.toStringTag || "@@toStringTag";

      function u(t, e, r) {
        return Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }), t[e];
      }

      try {
        u({}, "");
      } catch (t) {
        u = function (t, e, r) {
          return t[e] = r;
        };
      }

      function s(t, e, r, o) {
        var i = e && e.prototype instanceof h ? e : h,
            a = Object.create(i.prototype),
            c = new L(o || []);
        return n(a, "_invoke", {
          value: j(t, r, c)
        }), a;
      }

      function p(t, e, r) {
        try {
          return {
            type: "normal",
            arg: t.call(e, r)
          };
        } catch (t) {
          return {
            type: "throw",
            arg: t
          };
        }
      }

      t.wrap = s;
      var d = {};

      function h() {}

      function v() {}

      function y() {}

      var m = {};
      u(m, i, function () {
        return this;
      });
      var g = Object.getPrototypeOf,
          b = g && g(g(k([])));
      b && b !== e && r.call(b, i) && (m = b);
      var w = y.prototype = h.prototype = Object.create(m);

      function O(t) {
        ["next", "throw", "return"].forEach(function (e) {
          u(t, e, function (t) {
            return this._invoke(e, t);
          });
        });
      }

      function E(t, e) {
        var o;
        n(this, "_invoke", {
          value: function (n, i) {
            function a() {
              return new e(function (o, a) {
                !function n(o, i, a, c) {
                  var u = p(t[o], t, i);

                  if ("throw" !== u.type) {
                    var s = u.arg,
                        f = s.value;
                    return f && "object" == l(f) && r.call(f, "__await") ? e.resolve(f.__await).then(function (t) {
                      n("next", t, a, c);
                    }, function (t) {
                      n("throw", t, a, c);
                    }) : e.resolve(f).then(function (t) {
                      s.value = t, a(s);
                    }, function (t) {
                      return n("throw", t, a, c);
                    });
                  }

                  c(u.arg);
                }(n, i, o, a);
              });
            }

            return o = o ? o.then(a, a) : a();
          }
        });
      }

      function j(t, e, r) {
        var n = "suspendedStart";
        return function (o, i) {
          if ("executing" === n) throw new Error("Generator is already running");

          if ("completed" === n) {
            if ("throw" === o) throw i;
            return T();
          }

          for (r.method = o, r.arg = i;;) {
            var a = r.delegate;

            if (a) {
              var c = _(a, r);

              if (c) {
                if (c === d) continue;
                return c;
              }
            }

            if ("next" === r.method) r.sent = r._sent = r.arg;else if ("throw" === r.method) {
              if ("suspendedStart" === n) throw n = "completed", r.arg;
              r.dispatchException(r.arg);
            } else "return" === r.method && r.abrupt("return", r.arg);
            n = "executing";
            var u = p(t, e, r);

            if ("normal" === u.type) {
              if (n = r.done ? "completed" : "suspendedYield", u.arg === d) continue;
              return {
                value: u.arg,
                done: r.done
              };
            }

            "throw" === u.type && (n = "completed", r.method = "throw", r.arg = u.arg);
          }
        };
      }

      function _(t, e) {
        var r = e.method,
            n = t.iterator[r];
        if (void 0 === n) return e.delegate = null, "throw" === r && t.iterator.return && (e.method = "return", e.arg = void 0, _(t, e), "throw" === e.method) || "return" !== r && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + r + "' method")), d;
        var o = p(n, t.iterator, e.arg);
        if ("throw" === o.type) return e.method = "throw", e.arg = o.arg, e.delegate = null, d;
        var i = o.arg;
        return i ? i.done ? (e[t.resultName] = i.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = void 0), e.delegate = null, d) : i : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, d);
      }

      function P(t) {
        var e = {
          tryLoc: t[0]
        };
        1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
      }

      function x(t) {
        var e = t.completion || {};
        e.type = "normal", delete e.arg, t.completion = e;
      }

      function L(t) {
        this.tryEntries = [{
          tryLoc: "root"
        }], t.forEach(P, this), this.reset(!0);
      }

      function k(t) {
        if (t) {
          var e = t[i];
          if (e) return e.call(t);
          if ("function" == typeof t.next) return t;

          if (!isNaN(t.length)) {
            var n = -1,
                o = function e() {
              for (; ++n < t.length;) if (r.call(t, n)) return e.value = t[n], e.done = !1, e;

              return e.value = void 0, e.done = !0, e;
            };

            return o.next = o;
          }
        }

        return {
          next: T
        };
      }

      function T() {
        return {
          value: void 0,
          done: !0
        };
      }

      return v.prototype = y, n(w, "constructor", {
        value: y,
        configurable: !0
      }), n(y, "constructor", {
        value: v,
        configurable: !0
      }), v.displayName = u(y, c, "GeneratorFunction"), t.isGeneratorFunction = function (t) {
        var e = "function" == typeof t && t.constructor;
        return !!e && (e === v || "GeneratorFunction" === (e.displayName || e.name));
      }, t.mark = function (t) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(t, y) : (t.__proto__ = y, u(t, c, "GeneratorFunction")), t.prototype = Object.create(w), t;
      }, t.awrap = function (t) {
        return {
          __await: t
        };
      }, O(E.prototype), u(E.prototype, a, function () {
        return this;
      }), t.AsyncIterator = E, t.async = function (e, r, n, o, i) {
        void 0 === i && (i = Promise);
        var a = new E(s(e, r, n, o), i);
        return t.isGeneratorFunction(r) ? a : a.next().then(function (t) {
          return t.done ? t.value : a.next();
        });
      }, O(w), u(w, c, "Generator"), u(w, i, function () {
        return this;
      }), u(w, "toString", function () {
        return "[object Generator]";
      }), t.keys = function (t) {
        var e = Object(t),
            r = [];

        for (var n in e) r.push(n);

        return r.reverse(), function t() {
          for (; r.length;) {
            var n = r.pop();
            if (n in e) return t.value = n, t.done = !1, t;
          }

          return t.done = !0, t;
        };
      }, t.values = k, L.prototype = {
        constructor: L,
        reset: function (t) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(x), !t) for (var e in this) "t" === e.charAt(0) && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0);
        },
        stop: function () {
          this.done = !0;
          var t = this.tryEntries[0].completion;
          if ("throw" === t.type) throw t.arg;
          return this.rval;
        },
        dispatchException: function (t) {
          if (this.done) throw t;
          var e = this;

          function n(r, n) {
            return a.type = "throw", a.arg = t, e.next = r, n && (e.method = "next", e.arg = void 0), !!n;
          }

          for (var o = this.tryEntries.length - 1; o >= 0; --o) {
            var i = this.tryEntries[o],
                a = i.completion;
            if ("root" === i.tryLoc) return n("end");

            if (i.tryLoc <= this.prev) {
              var c = r.call(i, "catchLoc"),
                  u = r.call(i, "finallyLoc");

              if (c && u) {
                if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                if (this.prev < i.finallyLoc) return n(i.finallyLoc);
              } else if (c) {
                if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
              } else {
                if (!u) throw new Error("try statement without catch or finally");
                if (this.prev < i.finallyLoc) return n(i.finallyLoc);
              }
            }
          }
        },
        abrupt: function (t, e) {
          for (var n = this.tryEntries.length - 1; n >= 0; --n) {
            var o = this.tryEntries[n];

            if (o.tryLoc <= this.prev && r.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
              var i = o;
              break;
            }
          }

          i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
          var a = i ? i.completion : {};
          return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, d) : this.complete(a);
        },
        complete: function (t, e) {
          if ("throw" === t.type) throw t.arg;
          return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), d;
        },
        finish: function (t) {
          for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var r = this.tryEntries[e];
            if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), x(r), d;
          }
        },
        catch: function (t) {
          for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var r = this.tryEntries[e];

            if (r.tryLoc === t) {
              var n = r.completion;

              if ("throw" === n.type) {
                var o = n.arg;
                x(r);
              }

              return o;
            }
          }

          throw new Error("illegal catch attempt");
        },
        delegateYield: function (t, e, r) {
          return this.delegate = {
            iterator: k(t),
            resultName: e,
            nextLoc: r
          }, "next" === this.method && (this.arg = void 0), d;
        }
      }, t;
    }

    function p(t, e, r, n, o, i, a) {
      try {
        var c = t[i](a),
            u = c.value;
      } catch (t) {
        return void r(t);
      }

      c.done ? e(u) : Promise.resolve(u).then(n, o);
    }

    function d(t, e) {
      var r = Object.keys(t);

      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(t);
        e && (n = n.filter(function (e) {
          return Object.getOwnPropertyDescriptor(t, e).enumerable;
        })), r.push.apply(r, n);
      }

      return r;
    }

    function h(t) {
      for (var e = 1; e < arguments.length; e++) {
        var r = null != arguments[e] ? arguments[e] : {};
        e % 2 ? d(Object(r), !0).forEach(function (e) {
          v(t, e, r[e]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : d(Object(r)).forEach(function (e) {
          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
        });
      }

      return t;
    }

    function v(t, e, r) {
      return (e = b(e)) in t ? Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : t[e] = r, t;
    }

    function y(t, e) {
      return e || (e = t.slice(0)), Object.freeze(Object.defineProperties(t, {
        raw: {
          value: Object.freeze(e)
        }
      }));
    }

    function m(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }

    function g(t, e) {
      for (var r = 0; r < e.length; r++) {
        var n = e[r];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, b(n.key), n);
      }
    }

    function b(t) {
      var e = function (t, e) {
        if ("object" !== l(t) || null === t) return t;
        var r = t[Symbol.toPrimitive];

        if (void 0 !== r) {
          var n = r.call(t, e || "default");
          if ("object" !== l(n)) return n;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }

        return ("string" === e ? String : Number)(t);
      }(t, "string");

      return "symbol" === l(e) ? e : String(e);
    }

    function w(t, e) {
      return (w = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
        return t.__proto__ = e, t;
      })(t, e);
    }

    function O(t) {
      var e = function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;

        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
        } catch (t) {
          return !1;
        }
      }();

      return function () {
        var r,
            n = j(t);

        if (e) {
          var o = j(this).constructor;
          r = Reflect.construct(n, arguments, o);
        } else r = n.apply(this, arguments);

        return E(this, r);
      };
    }

    function E(t, e) {
      if (e && ("object" === l(e) || "function" == typeof e)) return e;
      if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
      return function (t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t;
      }(t);
    }

    function j(t) {
      return (j = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t);
      })(t);
    }

    var _ = function (t) {
      !function (t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            writable: !0,
            configurable: !0
          }
        }), Object.defineProperty(t, "prototype", {
          writable: !1
        }), e && w(t, e);
      }(v, t);
      var e,
          r,
          u,
          s,
          l,
          d = O(v);

      function v() {
        return m(this, v), d.apply(this, arguments);
      }

      return e = v, r = [{
        key: "render",
        value: function () {
          return Object(i.d)(n || (n = y([" ", " "])), this.cardTransactionsDM);
        }
      }, {
        key: "cardTransactionsDM",
        get: function () {
          return Object(i.d)(o || (o = y(['\n      <bbva-core-generic-dp\n        id="cardTransactions"\n        requiresToken\n        cross-domain\n        .host="', '"\n        .path="', '"\n        headers="', '"\n        method="', '"\n      >\n      </bbva-core-generic-dp>\n    '])), this.host, this.path, Object(c.a)(this.headers), this.method);
        }
      }, {
        key: "_requestCardTransactions",
        value: function (t, e) {
          var r = this;
          return new Promise(function (n, o) {
            var i = r.shadowRoot.getElementById("cardTransactions");
            i.addEventListener("request-success", function (t) {
              var e = t.detail,
                  o = r._formatData(e);

              r._dispatchCustomEvent("card-transactions-api-dm-fetch", o), n(h({}, o));
            }), i.addEventListener("request-error", function (t) {
              r._dispatchCustomEvent("card-transactions-api-dm-fetch-error", t), o({
                error: t
              });
            }), i.addEventListener("bbva-core-generic-dp-error", function (t) {
              r._dispatchCustomEvent("api-dm-error", t), o({
                error: t,
                type: "generic"
              });
            });
            var a = h(h({}, (null == e ? void 0 : e.fromOperationDate) && {
              from: null == e ? void 0 : e.fromOperationDate
            }), (null == e ? void 0 : e.toOperationDate) && {
              to: null == e ? void 0 : e.toOperationDate
            }),
                c = h({}, Object.values(a).length && {
              transactionDate: a
            }),
                u = (null == e ? void 0 : e.orderBy) || "operationDate:desc",
                s = "operationDate" === u.split(":")[0] ? "TRANSACTION_DATE" : "",
                l = u.split(":")[1] || "desc";

            r._setGenericRequest({
              dm: i,
              path: "cardTransactions/V01/listIntegratedCardTransactions",
              method: "post",
              params: e.paginationKey ? "?paginationKey=".concat(e.paginationKey, "&pageSize=").concat(e.pageSize || "60") : "?paginationKey=0&pageSize=".concat(e.pageSize || "60"),
              body: h({
                cards: [{
                  id: t
                }],
                customerId: e.customerId,
                searchFilters: c
              }, s && {
                sortedBy: s,
                sortedType: l.toUpperCase()
              })
            });
          });
        }
      }, {
        key: "_dispatchCustomEvent",
        value: function (t, e) {
          this.dispatchEvent(new CustomEvent(t, {
            bubbles: !0,
            composed: !0,
            detail: e
          }));
        }
      }, {
        key: "_formatData",
        value: function (t) {
          var e = this,
              r = t.cardsTransactions.map(function (t) {
            var r, n;
            return {
              id: t.id,
              operationAmounts: e._formatingOperationAmounts(t),
              contract: {
                id: t.contract.id
              },
              moneyFlow: {
                id: (null == t || null === (r = t.amount) || void 0 === r ? void 0 : r.amount) < 0 ? "EXPENSE" : "INCOME",
                name: (null == t || null === (n = t.amount) || void 0 === n ? void 0 : n.amount) < 0 ? "expense" : "income"
              },
              operationDate: t.transactionDate,
              valueDate: t.valueDate,
              concept: e._formatConcept(t.concept.name)
            };
          });
          return t.pagination && (t.pagination = {
            links: h(h(h({
              first: t.pagination.firstPage
            }, void 0 !== t.pagination.lastPage && {
              last: t.pagination.lastPage
            }), void 0 !== t.pagination.previousPage && {
              previous: t.pagination.previousPage
            }), void 0 !== t.pagination.nextPage && {
              next: t.pagination.nextPage
            }),
            page: t.pagination.page,
            totalPages: t.pagination.total,
            totalElements: t.totalResults,
            pageSize: t.pagination.pageSize
          }, void 0 !== t.pagination.links.next && this._dispatchCustomEvent("card-transactions-api-dm-pagination", t.pagination)), r;
        }
      }, {
        key: "_formatConcept",
        value: function (t) {
          return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
        }
      }, {
        key: "_formatingOperationAmounts",
        value: function (t) {
          var e,
              r,
              n = null == t ? void 0 : t.amount,
              o = null == t ? void 0 : t.holderAmount,
              i = {};
          o && (i = {
            id: "EUR" === (null == o || null === (e = o.currency) || void 0 === e ? void 0 : e.code) ? "LOCAL_AMOUNT" : "ORIGIN_AMOUNT",
            amount: Math.abs(null == o ? void 0 : o.amount),
            currency: null == o || null === (r = o.currency) || void 0 === r ? void 0 : r.code
          });
          var a = {};
          n && (a = {
            id: "ORIGIN_AMOUNT",
            amount: null == n ? void 0 : n.amount,
            currency: null == n ? void 0 : n.currency.code
          });
          var c = 0 === Object.keys(i).length,
              u = 0 === Object.keys(a).length;
          return c && u ? null : c ? a : u ? i : [i, a];
        }
      }, {
        key: "getCardTransactions",
        value: (s = f().mark(function t(e, r) {
          return f().wrap(function (t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                this._requestCardTransactions(e, r);

              case 1:
              case "end":
                return t.stop();
            }
          }, t, this);
        }), l = function () {
          var t = this,
              e = arguments;
          return new Promise(function (r, n) {
            var o = s.apply(t, e);

            function i(t) {
              p(o, r, n, i, a, "next", t);
            }

            function a(t) {
              p(o, r, n, i, a, "throw", t);
            }

            i(void 0);
          });
        }, function (t, e) {
          return l.apply(this, arguments);
        })
      }, {
        key: "_setGenericRequest",
        value: function (t) {
          var e = t.dm,
              r = t.path,
              n = t.method,
              o = t.params,
              i = t.body;
          return e.native = !1, e.requiresToken = !0, e.path = "".concat(r).concat(o), e.method = n, e.body = i, e.generateRequest();
        }
      }], u = [{
        key: "is",
        get: function () {
          return "bbva-card-transactions-es-api-dm";
        }
      }, {
        key: "scopedElements",
        get: function () {
          var t = [a.b];
          return v.scopedElementsFromClasses(t);
        }
      }], r && g(e.prototype, r), u && g(e, u), Object.defineProperty(e, "prototype", {
        writable: !1
      }), v;
    }(Object(u.a)(s.a));

    customElements.define(_.is, _);
  }
}]);