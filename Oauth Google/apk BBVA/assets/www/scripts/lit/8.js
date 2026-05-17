(window.webpackJsonp = window.webpackJsonp || []).push([[8], {
  982: function (t, r, e) {
    "use strict";

    function n(t) {
      return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t;
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
      })(t);
    }

    function o() {
      /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
      o = function () {
        return t;
      };

      var t = {},
          r = Object.prototype,
          e = r.hasOwnProperty,
          i = Object.defineProperty || function (t, r, e) {
        t[r] = e.value;
      },
          a = "function" == typeof Symbol ? Symbol : {},
          c = a.iterator || "@@iterator",
          u = a.asyncIterator || "@@asyncIterator",
          f = a.toStringTag || "@@toStringTag";

      function l(t, r, e) {
        return Object.defineProperty(t, r, {
          value: e,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }), t[r];
      }

      try {
        l({}, "");
      } catch (t) {
        l = function (t, r, e) {
          return t[r] = e;
        };
      }

      function s(t, r, e, n) {
        var o = r && r.prototype instanceof y ? r : y,
            a = Object.create(o.prototype),
            c = new P(n || []);
        return i(a, "_invoke", {
          value: L(t, e, c)
        }), a;
      }

      function h(t, r, e) {
        try {
          return {
            type: "normal",
            arg: t.call(r, e)
          };
        } catch (t) {
          return {
            type: "throw",
            arg: t
          };
        }
      }

      t.wrap = s;
      var p = {};

      function y() {}

      function v() {}

      function d() {}

      var m = {};
      l(m, c, function () {
        return this;
      });
      var g = Object.getPrototypeOf,
          b = g && g(g(S([])));
      b && b !== r && e.call(b, c) && (m = b);
      var w = d.prototype = y.prototype = Object.create(m);

      function x(t) {
        ["next", "throw", "return"].forEach(function (r) {
          l(t, r, function (t) {
            return this._invoke(r, t);
          });
        });
      }

      function E(t, r) {
        var o;
        i(this, "_invoke", {
          value: function (i, a) {
            function c() {
              return new r(function (o, c) {
                !function o(i, a, c, u) {
                  var f = h(t[i], t, a);

                  if ("throw" !== f.type) {
                    var l = f.arg,
                        s = l.value;
                    return s && "object" == n(s) && e.call(s, "__await") ? r.resolve(s.__await).then(function (t) {
                      o("next", t, c, u);
                    }, function (t) {
                      o("throw", t, c, u);
                    }) : r.resolve(s).then(function (t) {
                      l.value = t, c(l);
                    }, function (t) {
                      return o("throw", t, c, u);
                    });
                  }

                  u(f.arg);
                }(i, a, o, c);
              });
            }

            return o = o ? o.then(c, c) : c();
          }
        });
      }

      function L(t, r, e) {
        var n = "suspendedStart";
        return function (o, i) {
          if ("executing" === n) throw new Error("Generator is already running");

          if ("completed" === n) {
            if ("throw" === o) throw i;
            return k();
          }

          for (e.method = o, e.arg = i;;) {
            var a = e.delegate;

            if (a) {
              var c = O(a, e);

              if (c) {
                if (c === p) continue;
                return c;
              }
            }

            if ("next" === e.method) e.sent = e._sent = e.arg;else if ("throw" === e.method) {
              if ("suspendedStart" === n) throw n = "completed", e.arg;
              e.dispatchException(e.arg);
            } else "return" === e.method && e.abrupt("return", e.arg);
            n = "executing";
            var u = h(t, r, e);

            if ("normal" === u.type) {
              if (n = e.done ? "completed" : "suspendedYield", u.arg === p) continue;
              return {
                value: u.arg,
                done: e.done
              };
            }

            "throw" === u.type && (n = "completed", e.method = "throw", e.arg = u.arg);
          }
        };
      }

      function O(t, r) {
        var e = r.method,
            n = t.iterator[e];
        if (void 0 === n) return r.delegate = null, "throw" === e && t.iterator.return && (r.method = "return", r.arg = void 0, O(t, r), "throw" === r.method) || "return" !== e && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + e + "' method")), p;
        var o = h(n, t.iterator, r.arg);
        if ("throw" === o.type) return r.method = "throw", r.arg = o.arg, r.delegate = null, p;
        var i = o.arg;
        return i ? i.done ? (r[t.resultName] = i.value, r.next = t.nextLoc, "return" !== r.method && (r.method = "next", r.arg = void 0), r.delegate = null, p) : i : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, p);
      }

      function j(t) {
        var r = {
          tryLoc: t[0]
        };
        1 in t && (r.catchLoc = t[1]), 2 in t && (r.finallyLoc = t[2], r.afterLoc = t[3]), this.tryEntries.push(r);
      }

      function _(t) {
        var r = t.completion || {};
        r.type = "normal", delete r.arg, t.completion = r;
      }

      function P(t) {
        this.tryEntries = [{
          tryLoc: "root"
        }], t.forEach(j, this), this.reset(!0);
      }

      function S(t) {
        if (t) {
          var r = t[c];
          if (r) return r.call(t);
          if ("function" == typeof t.next) return t;

          if (!isNaN(t.length)) {
            var n = -1,
                o = function r() {
              for (; ++n < t.length;) if (e.call(t, n)) return r.value = t[n], r.done = !1, r;

              return r.value = void 0, r.done = !0, r;
            };

            return o.next = o;
          }
        }

        return {
          next: k
        };
      }

      function k() {
        return {
          value: void 0,
          done: !0
        };
      }

      return v.prototype = d, i(w, "constructor", {
        value: d,
        configurable: !0
      }), i(d, "constructor", {
        value: v,
        configurable: !0
      }), v.displayName = l(d, f, "GeneratorFunction"), t.isGeneratorFunction = function (t) {
        var r = "function" == typeof t && t.constructor;
        return !!r && (r === v || "GeneratorFunction" === (r.displayName || r.name));
      }, t.mark = function (t) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(t, d) : (t.__proto__ = d, l(t, f, "GeneratorFunction")), t.prototype = Object.create(w), t;
      }, t.awrap = function (t) {
        return {
          __await: t
        };
      }, x(E.prototype), l(E.prototype, u, function () {
        return this;
      }), t.AsyncIterator = E, t.async = function (r, e, n, o, i) {
        void 0 === i && (i = Promise);
        var a = new E(s(r, e, n, o), i);
        return t.isGeneratorFunction(e) ? a : a.next().then(function (t) {
          return t.done ? t.value : a.next();
        });
      }, x(w), l(w, f, "Generator"), l(w, c, function () {
        return this;
      }), l(w, "toString", function () {
        return "[object Generator]";
      }), t.keys = function (t) {
        var r = Object(t),
            e = [];

        for (var n in r) e.push(n);

        return e.reverse(), function t() {
          for (; e.length;) {
            var n = e.pop();
            if (n in r) return t.value = n, t.done = !1, t;
          }

          return t.done = !0, t;
        };
      }, t.values = S, P.prototype = {
        constructor: P,
        reset: function (t) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(_), !t) for (var r in this) "t" === r.charAt(0) && e.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = void 0);
        },
        stop: function () {
          this.done = !0;
          var t = this.tryEntries[0].completion;
          if ("throw" === t.type) throw t.arg;
          return this.rval;
        },
        dispatchException: function (t) {
          if (this.done) throw t;
          var r = this;

          function n(e, n) {
            return a.type = "throw", a.arg = t, r.next = e, n && (r.method = "next", r.arg = void 0), !!n;
          }

          for (var o = this.tryEntries.length - 1; o >= 0; --o) {
            var i = this.tryEntries[o],
                a = i.completion;
            if ("root" === i.tryLoc) return n("end");

            if (i.tryLoc <= this.prev) {
              var c = e.call(i, "catchLoc"),
                  u = e.call(i, "finallyLoc");

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
        abrupt: function (t, r) {
          for (var n = this.tryEntries.length - 1; n >= 0; --n) {
            var o = this.tryEntries[n];

            if (o.tryLoc <= this.prev && e.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
              var i = o;
              break;
            }
          }

          i && ("break" === t || "continue" === t) && i.tryLoc <= r && r <= i.finallyLoc && (i = null);
          var a = i ? i.completion : {};
          return a.type = t, a.arg = r, i ? (this.method = "next", this.next = i.finallyLoc, p) : this.complete(a);
        },
        complete: function (t, r) {
          if ("throw" === t.type) throw t.arg;
          return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), p;
        },
        finish: function (t) {
          for (var r = this.tryEntries.length - 1; r >= 0; --r) {
            var e = this.tryEntries[r];
            if (e.finallyLoc === t) return this.complete(e.completion, e.afterLoc), _(e), p;
          }
        },
        catch: function (t) {
          for (var r = this.tryEntries.length - 1; r >= 0; --r) {
            var e = this.tryEntries[r];

            if (e.tryLoc === t) {
              var n = e.completion;

              if ("throw" === n.type) {
                var o = n.arg;

                _(e);
              }

              return o;
            }
          }

          throw new Error("illegal catch attempt");
        },
        delegateYield: function (t, r, e) {
          return this.delegate = {
            iterator: S(t),
            resultName: r,
            nextLoc: e
          }, "next" === this.method && (this.arg = void 0), p;
        }
      }, t;
    }

    function i(t, r, e, n, o, i, a) {
      try {
        var c = t[i](a),
            u = c.value;
      } catch (t) {
        return void e(t);
      }

      c.done ? r(u) : Promise.resolve(u).then(n, o);
    }

    function a(t, r) {
      if (!(t instanceof r)) throw new TypeError("Cannot call a class as a function");
    }

    function c(t, r) {
      for (var e = 0; e < r.length; e++) {
        var o = r[e];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, (i = o.key, a = void 0, a = function (t, r) {
          if ("object" !== n(t) || null === t) return t;
          var e = t[Symbol.toPrimitive];

          if (void 0 !== e) {
            var o = e.call(t, r || "default");
            if ("object" !== n(o)) return o;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }

          return ("string" === r ? String : Number)(t);
        }(i, "string"), "symbol" === n(a) ? a : String(a)), o);
      }

      var i, a;
    }

    function u(t, r) {
      return (u = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, r) {
        return t.__proto__ = r, t;
      })(t, r);
    }

    function f(t) {
      var r = function () {
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
        var e,
            n = s(t);

        if (r) {
          var o = s(this).constructor;
          e = Reflect.construct(n, arguments, o);
        } else e = n.apply(this, arguments);

        return l(this, e);
      };
    }

    function l(t, r) {
      if (r && ("object" === n(r) || "function" == typeof r)) return r;
      if (void 0 !== r) throw new TypeError("Derived constructors may only return object or undefined");
      return function (t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t;
      }(t);
    }

    function s(t) {
      return (s = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t);
      })(t);
    }

    e.r(r), e.d(r, "BbvaCustomerLopdDocumentsEsApiDm", function () {
      return h;
    });

    var h = function (t) {
      !function (t, r) {
        if ("function" != typeof r && null !== r) throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(r && r.prototype, {
          constructor: {
            value: t,
            writable: !0,
            configurable: !0
          }
        }), Object.defineProperty(t, "prototype", {
          writable: !1
        }), r && u(t, r);
      }(p, t);
      var r,
          e,
          n,
          l,
          s,
          h = f(p);

      function p() {
        return a(this, p), h.apply(this, arguments);
      }

      return r = p, e = [{
        key: "_responseMapping",
        value: (l = o().mark(function t(r) {
          return o().wrap(function (t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                return t.next = 2, this.updateComplete;

              case 2:
                return t.abrupt("return", r);

              case 3:
              case "end":
                return t.stop();
            }
          }, t, this);
        }), s = function () {
          var t = this,
              r = arguments;
          return new Promise(function (e, n) {
            var o = l.apply(t, r);

            function a(t) {
              i(o, e, n, a, c, "next", t);
            }

            function c(t) {
              i(o, e, n, a, c, "throw", t);
            }

            a(void 0);
          });
        }, function (t) {
          return s.apply(this, arguments);
        })
      }], n = [{
        key: "is",
        get: function () {
          return "bbva-customer-lopd-documents-es-api-dm";
        }
      }], e && c(r.prototype, e), n && c(r, n), Object.defineProperty(r, "prototype", {
        writable: !1
      }), p;
    }(e(601).a);

    customElements.define(h.is, h);
  }
}]);