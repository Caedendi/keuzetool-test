(window.webpackJsonp = window.webpackJsonp || []).push([
        [1], {
            0: function(e, t, n) {
                e.exports = n("zUnb")
            },
            zUnb: function(e, t, n) {
                "use strict";

                function r(e) {
                    return "function" == typeof e
                }
                n.r(t);
                let s = !1;
                const i = {
                    Promise: void 0,
                    set useDeprecatedSynchronousErrorHandling(e) {
                        if (e) {
                            const e = new Error;
                            console.warn("DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" + e.stack)
                        } else s && console.log("RxJS: Back to a better error behavior. Thank you. <3");
                        s = e
                    },
                    get useDeprecatedSynchronousErrorHandling() {
                        return s
                    }
                };

                function o(e) {
                    setTimeout(() => {
                        throw e
                    })
                }
                const l = {
                        closed: !0,
                        next(e) {},
                        error(e) {
                            if (i.useDeprecatedSynchronousErrorHandling) throw e;
                            o(e)
                        },
                        complete() {}
                    },
                    a = Array.isArray || (e => e && "number" == typeof e.length);

                function u(e) {
                    return null !== e && "object" == typeof e
                }

                function c(e) {
                    return Error.call(this), this.message = e ? `${e.length} errors occurred during unsubscription:\n${e.map((e,t)=>`${t+1}) ${e.toString()}`).join("\n  ")}` : "", this.name = "UnsubscriptionError", this.errors = e, this
                }
                c.prototype = Object.create(Error.prototype);
                const h = c;
                let d = (() => {
                    class e {
                        constructor(e) {
                            this.closed = !1, this._parent = null, this._parents = null, this._subscriptions = null, e && (this._unsubscribe = e)
                        }
                        unsubscribe() {
                            let e, t = !1;
                            if (this.closed) return;
                            let {
                                _parent: n,
                                _parents: s,
                                _unsubscribe: i,
                                _subscriptions: o
                            } = this;
                            this.closed = !0, this._parent = null, this._parents = null, this._subscriptions = null;
                            let l = -1,
                                c = s ? s.length : 0;
                            for (; n;) n.remove(this), n = ++l < c && s[l] || null;
                            if (r(i)) try {
                                i.call(this)
                            } catch (d) {
                                t = !0, e = d instanceof h ? p(d.errors) : [d]
                            }
                            if (a(o))
                                for (l = -1, c = o.length; ++l < c;) {
                                    const n = o[l];
                                    if (u(n)) try {
                                        n.unsubscribe()
                                    } catch (d) {
                                        t = !0, e = e || [], d instanceof h ? e = e.concat(p(d.errors)) : e.push(d)
                                    }
                                }
                            if (t) throw new h(e)
                        }
                        add(t) {
                            let n = t;
                            switch (typeof t) {
                                case "function":
                                    n = new e(t);
                                case "object":
                                    if (n === this || n.closed || "function" != typeof n.unsubscribe) return n;
                                    if (this.closed) return n.unsubscribe(), n;
                                    if (!(n instanceof e)) {
                                        const t = n;
                                        (n = new e)._subscriptions = [t]
                                    }
                                    break;
                                default:
                                    if (!t) return e.EMPTY;
                                    throw new Error("unrecognized teardown " + t + " added to Subscription.")
                            }
                            if (n._addParent(this)) {
                                const e = this._subscriptions;
                                e ? e.push(n) : this._subscriptions = [n]
                            }
                            return n
                        }
                        remove(e) {
                            const t = this._subscriptions;
                            if (t) {
                                const n = t.indexOf(e); - 1 !== n && t.splice(n, 1)
                            }
                        }
                        _addParent(e) {
                            let {
                                _parent: t,
                                _parents: n
                            } = this;
                            return t !== e && (t ? n ? -1 === n.indexOf(e) && (n.push(e), !0) : (this._parents = [e], !0) : (this._parent = e, !0))
                        }
                    }
                    return e.EMPTY = function(e) {
                        return e.closed = !0, e
                    }(new e), e
                })();

                function p(e) {
                    return e.reduce((e, t) => e.concat(t instanceof h ? t.errors : t), [])
                }
                const f = "function" == typeof Symbol ? Symbol("rxSubscriber") : "@@rxSubscriber_" + Math.random();
                class g extends d {
                    constructor(e, t, n) {
                        switch (super(), this.syncErrorValue = null, this.syncErrorThrown = !1, this.syncErrorThrowable = !1, this.isStopped = !1, arguments.length) {
                            case 0:
                                this.destination = l;
                                break;
                            case 1:
                                if (!e) {
                                    this.destination = l;
                                    break
                                }
                                if ("object" == typeof e) {
                                    e instanceof g ? (this.syncErrorThrowable = e.syncErrorThrowable, this.destination = e, e.add(this)) : (this.syncErrorThrowable = !0, this.destination = new m(this, e));
                                    break
                                }
                                default:
                                    this.syncErrorThrowable = !0, this.destination = new m(this, e, t, n)
                        }
                    } [f]() {
                        return this
                    }
                    static create(e, t, n) {
                        const r = new g(e, t, n);
                        return r.syncErrorThrowable = !1, r
                    }
                    next(e) {
                        this.isStopped || this._next(e)
                    }
                    error(e) {
                        this.isStopped || (this.isStopped = !0, this._error(e))
                    }
                    complete() {
                        this.isStopped || (this.isStopped = !0, this._complete())
                    }
                    unsubscribe() {
                        this.closed || (this.isStopped = !0, super.unsubscribe())
                    }
                    _next(e) {
                        this.destination.next(e)
                    }
                    _error(e) {
                        this.destination.error(e), this.unsubscribe()
                    }
                    _complete() {
                        this.destination.complete(), this.unsubscribe()
                    }
                    _unsubscribeAndRecycle() {
                        const {
                            _parent: e,
                            _parents: t
                        } = this;
                        return this._parent = null, this._parents = null, this.unsubscribe(), this.closed = !1, this.isStopped = !1, this._parent = e, this._parents = t, this
                    }
                }
                class m extends g {
                    constructor(e, t, n, s) {
                        let i;
                        super(), this._parentSubscriber = e;
                        let o = this;
                        r(t) ? i = t : t && (i = t.next, n = t.error, s = t.complete, t !== l && (r((o = Object.create(t)).unsubscribe) && this.add(o.unsubscribe.bind(o)), o.unsubscribe = this.unsubscribe.bind(this))), this._context = o, this._next = i, this._error = n, this._complete = s
                    }
                    next(e) {
                        if (!this.isStopped && this._next) {
                            const {
                                _parentSubscriber: t
                            } = this;
                            i.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable ? this.__tryOrSetError(t, this._next, e) && this.unsubscribe() : this.__tryOrUnsub(this._next, e)
                        }
                    }
                    error(e) {
                        if (!this.isStopped) {
                            const {
                                _parentSubscriber: t
                            } = this, {
                                useDeprecatedSynchronousErrorHandling: n
                            } = i;
                            if (this._error) n && t.syncErrorThrowable ? (this.__tryOrSetError(t, this._error, e), this.unsubscribe()) : (this.__tryOrUnsub(this._error, e), this.unsubscribe());
                            else if (t.syncErrorThrowable) n ? (t.syncErrorValue = e, t.syncErrorThrown = !0) : o(e), this.unsubscribe();
                            else {
                                if (this.unsubscribe(), n) throw e;
                                o(e)
                            }
                        }
                    }
                    complete() {
                        if (!this.isStopped) {
                            const {
                                _parentSubscriber: e
                            } = this;
                            if (this._complete) {
                                const t = () => this._complete.call(this._context);
                                i.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable ? (this.__tryOrSetError(e, t), this.unsubscribe()) : (this.__tryOrUnsub(t), this.unsubscribe())
                            } else this.unsubscribe()
                        }
                    }
                    __tryOrUnsub(e, t) {
                        try {
                            e.call(this._context, t)
                        } catch (n) {
                            if (this.unsubscribe(), i.useDeprecatedSynchronousErrorHandling) throw n;
                            o(n)
                        }
                    }
                    __tryOrSetError(e, t, n) {
                        if (!i.useDeprecatedSynchronousErrorHandling) throw new Error("bad call");
                        try {
                            t.call(this._context, n)
                        } catch (r) {
                            return i.useDeprecatedSynchronousErrorHandling ? (e.syncErrorValue = r, e.syncErrorThrown = !0, !0) : (o(r), !0)
                        }
                        return !1
                    }
                    _unsubscribe() {
                        const {
                            _parentSubscriber: e
                        } = this;
                        this._context = null, this._parentSubscriber = null, e.unsubscribe()
                    }
                }
                const v = "function" == typeof Symbol && Symbol.observable || "@@observable";

                function y() {}

                function w(...e) {
                    return b(e)
                }

                function b(e) {
                    return e ? 1 === e.length ? e[0] : function(t) {
                        return e.reduce((e, t) => t(e), t)
                    } : y
                }
                let _ = (() => {
                    class e {
                        constructor(e) {
                            this._isScalar = !1, e && (this._subscribe = e)
                        }
                        lift(t) {
                            const n = new e;
                            return n.source = this, n.operator = t, n
                        }
                        subscribe(e, t, n) {
                            const {
                                operator: r
                            } = this, s = function(e, t, n) {
                                if (e) {
                                    if (e instanceof g) return e;
                                    if (e[f]) return e[f]()
                                }
                                return e || t || n ? new g(e, t, n) : new g(l)
                            }(e, t, n);
                            if (s.add(r ? r.call(s, this.source) : this.source || i.useDeprecatedSynchronousErrorHandling && !s.syncErrorThrowable ? this._subscribe(s) : this._trySubscribe(s)), i.useDeprecatedSynchronousErrorHandling && s.syncErrorThrowable && (s.syncErrorThrowable = !1, s.syncErrorThrown)) throw s.syncErrorValue;
                            return s
                        }
                        _trySubscribe(e) {
                            try {
                                return this._subscribe(e)
                            } catch (t) {
                                i.useDeprecatedSynchronousErrorHandling && (e.syncErrorThrown = !0, e.syncErrorValue = t),
                                    function(e) {
                                        for (; e;) {
                                            const {
                                                closed: t,
                                                destination: n,
                                                isStopped: r
                                            } = e;
                                            if (t || r) return !1;
                                            e = n && n instanceof g ? n : null
                                        }
                                        return !0
                                    }(e) ? e.error(t) : console.warn(t)
                            }
                        }
                        forEach(e, t) {
                            return new(t = C(t))((t, n) => {
                                let r;
                                r = this.subscribe(t => {
                                    try {
                                        e(t)
                                    } catch (s) {
                                        n(s), r && r.unsubscribe()
                                    }
                                }, n, t)
                            })
                        }
                        _subscribe(e) {
                            const {
                                source: t
                            } = this;
                            return t && t.subscribe(e)
                        } [v]() {
                            return this
                        }
                        pipe(...e) {
                            return 0 === e.length ? this : b(e)(this)
                        }
                        toPromise(e) {
                            return new(e = C(e))((e, t) => {
                                let n;
                                this.subscribe(e => n = e, e => t(e), () => e(n))
                            })
                        }
                    }
                    return e.create = t => new e(t), e
                })();

                function C(e) {
                    if (e || (e = i.Promise || Promise), !e) throw new Error("no Promise impl found");
                    return e
                }

                function x() {
                    return Error.call(this), this.message = "object unsubscribed", this.name = "ObjectUnsubscribedError", this
                }
                x.prototype = Object.create(Error.prototype);
                const S = x;
                class E extends d {
                    constructor(e, t) {
                        super(), this.subject = e, this.subscriber = t, this.closed = !1
                    }
                    unsubscribe() {
                        if (this.closed) return;
                        this.closed = !0;
                        const e = this.subject,
                            t = e.observers;
                        if (this.subject = null, !t || 0 === t.length || e.isStopped || e.closed) return;
                        const n = t.indexOf(this.subscriber); - 1 !== n && t.splice(n, 1)
                    }
                }
                class T extends g {
                    constructor(e) {
                        super(e), this.destination = e
                    }
                }
                let k = (() => {
                    class e extends _ {
                        constructor() {
                            super(), this.observers = [], this.closed = !1, this.isStopped = !1, this.hasError = !1, this.thrownError = null
                        } [f]() {
                            return new T(this)
                        }
                        lift(e) {
                            const t = new R(this, this);
                            return t.operator = e, t
                        }
                        next(e) {
                            if (this.closed) throw new S;
                            if (!this.isStopped) {
                                const {
                                    observers: t
                                } = this, n = t.length, r = t.slice();
                                for (let s = 0; s < n; s++) r[s].next(e)
                            }
                        }
                        error(e) {
                            if (this.closed) throw new S;
                            this.hasError = !0, this.thrownError = e, this.isStopped = !0;
                            const {
                                observers: t
                            } = this, n = t.length, r = t.slice();
                            for (let s = 0; s < n; s++) r[s].error(e);
                            this.observers.length = 0
                        }
                        complete() {
                            if (this.closed) throw new S;
                            this.isStopped = !0;
                            const {
                                observers: e
                            } = this, t = e.length, n = e.slice();
                            for (let r = 0; r < t; r++) n[r].complete();
                            this.observers.length = 0
                        }
                        unsubscribe() {
                            this.isStopped = !0, this.closed = !0, this.observers = null
                        }
                        _trySubscribe(e) {
                            if (this.closed) throw new S;
                            return super._trySubscribe(e)
                        }
                        _subscribe(e) {
                            if (this.closed) throw new S;
                            return this.hasError ? (e.error(this.thrownError), d.EMPTY) : this.isStopped ? (e.complete(), d.EMPTY) : (this.observers.push(e), new E(this, e))
                        }
                        asObservable() {
                            const e = new _;
                            return e.source = this, e
                        }
                    }
                    return e.create = (e, t) => new R(e, t), e
                })();
                class R extends k {
                    constructor(e, t) {
                        super(), this.destination = e, this.source = t
                    }
                    next(e) {
                        const {
                            destination: t
                        } = this;
                        t && t.next && t.next(e)
                    }
                    error(e) {
                        const {
                            destination: t
                        } = this;
                        t && t.error && this.destination.error(e)
                    }
                    complete() {
                        const {
                            destination: e
                        } = this;
                        e && e.complete && this.destination.complete()
                    }
                    _subscribe(e) {
                        const {
                            source: t
                        } = this;
                        return t ? this.source.subscribe(e) : d.EMPTY
                    }
                }

                function I(e) {
                    return e && "function" == typeof e.schedule
                }
                class A extends g {
                    constructor(e, t, n) {
                        super(), this.parent = e, this.outerValue = t, this.outerIndex = n, this.index = 0
                    }
                    _next(e) {
                        this.parent.notifyNext(this.outerValue, e, this.outerIndex, this.index++, this)
                    }
                    _error(e) {
                        this.parent.notifyError(e, this), this.unsubscribe()
                    }
                    _complete() {
                        this.parent.notifyComplete(this), this.unsubscribe()
                    }
                }
                const N = e => t => {
                        for (let n = 0, r = e.length; n < r && !t.closed; n++) t.next(e[n]);
                        t.closed || t.complete()
                    },
                    P = e => t => (e.then(e => {
                        t.closed || (t.next(e), t.complete())
                    }, e => t.error(e)).then(null, o), t);

                function O() {
                    return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
                }
                const D = O(),
                    M = e => t => {
                        const n = e[D]();
                        for (;;) {
                            const e = n.next();
                            if (e.done) {
                                t.complete();
                                break
                            }
                            if (t.next(e.value), t.closed) break
                        }
                        return "function" == typeof n.return && t.add(() => {
                            n.return && n.return()
                        }), t
                    },
                    L = e => t => {
                        const n = e[v]();
                        if ("function" != typeof n.subscribe) throw new TypeError("Provided object does not correctly implement Symbol.observable");
                        return n.subscribe(t)
                    },
                    U = e => e && "number" == typeof e.length && "function" != typeof e;

                function j(e) {
                    return !!e && "function" != typeof e.subscribe && "function" == typeof e.then
                }
                const V = e => {
                    if (e instanceof _) return t => e._isScalar ? (t.next(e.value), void t.complete()) : e.subscribe(t);
                    if (e && "function" == typeof e[v]) return L(e);
                    if (U(e)) return N(e);
                    if (j(e)) return P(e);
                    if (e && "function" == typeof e[D]) return M(e); {
                        const t = u(e) ? "an invalid object" : `'${e}'`;
                        throw new TypeError(`You provided ${t} where a stream was expected.` + " You can provide an Observable, Promise, Array, or Iterable.")
                    }
                };

                function H(e, t, n, r, s = new A(e, n, r)) {
                    if (!s.closed) return V(t)(s)
                }
                class F extends g {
                    notifyNext(e, t, n, r, s) {
                        this.destination.next(t)
                    }
                    notifyError(e, t) {
                        this.destination.error(e)
                    }
                    notifyComplete(e) {
                        this.destination.complete()
                    }
                }

                function z(e, t) {
                    return function(n) {
                        if ("function" != typeof e) throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");
                        return n.lift(new $(e, t))
                    }
                }
                class $ {
                    constructor(e, t) {
                        this.project = e, this.thisArg = t
                    }
                    call(e, t) {
                        return t.subscribe(new B(e, this.project, this.thisArg))
                    }
                }
                class B extends g {
                    constructor(e, t, n) {
                        super(e), this.project = t, this.count = 0, this.thisArg = n || this
                    }
                    _next(e) {
                        let t;
                        try {
                            t = this.project.call(this.thisArg, e, this.count++)
                        } catch (n) {
                            return void this.destination.error(n)
                        }
                        this.destination.next(t)
                    }
                }

                function q(e, t) {
                    return new _(t ? n => {
                        const r = new d;
                        let s = 0;
                        return r.add(t.schedule((function() {
                            s !== e.length ? (n.next(e[s++]), n.closed || r.add(this.schedule())) : n.complete()
                        }))), r
                    } : N(e))
                }

                function Z(e, t) {
                    if (!t) return e instanceof _ ? e : new _(V(e));
                    if (null != e) {
                        if (function(e) {
                                return e && "function" == typeof e[v]
                            }(e)) return function(e, t) {
                            return new _(t ? n => {
                                const r = new d;
                                return r.add(t.schedule(() => {
                                    const s = e[v]();
                                    r.add(s.subscribe({
                                        next(e) {
                                            r.add(t.schedule(() => n.next(e)))
                                        },
                                        error(e) {
                                            r.add(t.schedule(() => n.error(e)))
                                        },
                                        complete() {
                                            r.add(t.schedule(() => n.complete()))
                                        }
                                    }))
                                })), r
                            } : L(e))
                        }(e, t);
                        if (j(e)) return function(e, t) {
                            return new _(t ? n => {
                                const r = new d;
                                return r.add(t.schedule(() => e.then(e => {
                                    r.add(t.schedule(() => {
                                        n.next(e), r.add(t.schedule(() => n.complete()))
                                    }))
                                }, e => {
                                    r.add(t.schedule(() => n.error(e)))
                                }))), r
                            } : P(e))
                        }(e, t);
                        if (U(e)) return q(e, t);
                        if (function(e) {
                                return e && "function" == typeof e[D]
                            }(e) || "string" == typeof e) return function(e, t) {
                            if (!e) throw new Error("Iterable cannot be null");
                            return new _(t ? n => {
                                const r = new d;
                                let s;
                                return r.add(() => {
                                    s && "function" == typeof s.return && s.return()
                                }), r.add(t.schedule(() => {
                                    s = e[D](), r.add(t.schedule((function() {
                                        if (n.closed) return;
                                        let e, t;
                                        try {
                                            const n = s.next();
                                            e = n.value, t = n.done
                                        } catch (r) {
                                            return void n.error(r)
                                        }
                                        t ? n.complete() : (n.next(e), this.schedule())
                                    })))
                                })), r
                            } : M(e))
                        }(e, t)
                    }
                    throw new TypeError((null !== e && typeof e || e) + " is not observable")
                }

                function W(e, t, n = Number.POSITIVE_INFINITY) {
                    return "function" == typeof t ? r => r.pipe(W((n, r) => Z(e(n, r)).pipe(z((e, s) => t(n, e, r, s))), n)) : ("number" == typeof t && (n = t), t => t.lift(new G(e, n)))
                }
                class G {
                    constructor(e, t = Number.POSITIVE_INFINITY) {
                        this.project = e, this.concurrent = t
                    }
                    call(e, t) {
                        return t.subscribe(new Q(e, this.project, this.concurrent))
                    }
                }
                class Q extends F {
                    constructor(e, t, n = Number.POSITIVE_INFINITY) {
                        super(e), this.project = t, this.concurrent = n, this.hasCompleted = !1, this.buffer = [], this.active = 0, this.index = 0
                    }
                    _next(e) {
                        this.active < this.concurrent ? this._tryNext(e) : this.buffer.push(e)
                    }
                    _tryNext(e) {
                        let t;
                        const n = this.index++;
                        try {
                            t = this.project(e, n)
                        } catch (r) {
                            return void this.destination.error(r)
                        }
                        this.active++, this._innerSub(t, e, n)
                    }
                    _innerSub(e, t, n) {
                        const r = new A(this, void 0, void 0);
                        this.destination.add(r), H(this, e, t, n, r)
                    }
                    _complete() {
                        this.hasCompleted = !0, 0 === this.active && 0 === this.buffer.length && this.destination.complete(), this.unsubscribe()
                    }
                    notifyNext(e, t, n, r, s) {
                        this.destination.next(t)
                    }
                    notifyComplete(e) {
                        const t = this.buffer;
                        this.remove(e), this.active--, t.length > 0 ? this._next(t.shift()) : 0 === this.active && this.hasCompleted && this.destination.complete()
                    }
                }

                function K(e) {
                    return e
                }

                function J(e = Number.POSITIVE_INFINITY) {
                    return W(K, e)
                }

                function Y() {
                    return function(e) {
                        return e.lift(new X(e))
                    }
                }
                class X {
                    constructor(e) {
                        this.connectable = e
                    }
                    call(e, t) {
                        const {
                            connectable: n
                        } = this;
                        n._refCount++;
                        const r = new ee(e, n),
                            s = t.subscribe(r);
                        return r.closed || (r.connection = n.connect()), s
                    }
                }
                class ee extends g {
                    constructor(e, t) {
                        super(e), this.connectable = t
                    }
                    _unsubscribe() {
                        const {
                            connectable: e
                        } = this;
                        if (!e) return void(this.connection = null);
                        this.connectable = null;
                        const t = e._refCount;
                        if (t <= 0) return void(this.connection = null);
                        if (e._refCount = t - 1, t > 1) return void(this.connection = null);
                        const {
                            connection: n
                        } = this, r = e._connection;
                        this.connection = null, !r || n && r !== n || r.unsubscribe()
                    }
                }
                const te = class extends _ {
                        constructor(e, t) {
                            super(), this.source = e, this.subjectFactory = t, this._refCount = 0, this._isComplete = !1
                        }
                        _subscribe(e) {
                            return this.getSubject().subscribe(e)
                        }
                        getSubject() {
                            const e = this._subject;
                            return e && !e.isStopped || (this._subject = this.subjectFactory()), this._subject
                        }
                        connect() {
                            let e = this._connection;
                            return e || (this._isComplete = !1, (e = this._connection = new d).add(this.source.subscribe(new re(this.getSubject(), this))), e.closed ? (this._connection = null, e = d.EMPTY) : this._connection = e), e
                        }
                        refCount() {
                            return Y()(this)
                        }
                    }.prototype,
                    ne = {
                        operator: {
                            value: null
                        },
                        _refCount: {
                            value: 0,
                            writable: !0
                        },
                        _subject: {
                            value: null,
                            writable: !0
                        },
                        _connection: {
                            value: null,
                            writable: !0
                        },
                        _subscribe: {
                            value: te._subscribe
                        },
                        _isComplete: {
                            value: te._isComplete,
                            writable: !0
                        },
                        getSubject: {
                            value: te.getSubject
                        },
                        connect: {
                            value: te.connect
                        },
                        refCount: {
                            value: te.refCount
                        }
                    };
                class re extends T {
                    constructor(e, t) {
                        super(e), this.connectable = t
                    }
                    _error(e) {
                        this._unsubscribe(), super._error(e)
                    }
                    _complete() {
                        this.connectable._isComplete = !0, this._unsubscribe(), super._complete()
                    }
                    _unsubscribe() {
                        const e = this.connectable;
                        if (e) {
                            this.connectable = null;
                            const t = e._connection;
                            e._refCount = 0, e._subject = null, e._connection = null, t && t.unsubscribe()
                        }
                    }
                }

                function se() {
                    return new k
                }
                const ie = "__parameters__";

                function oe(e, t, n) {
                    const r = function(e) {
                        return function(...t) {
                            if (e) {
                                const n = e(...t);
                                for (const e in n) this[e] = n[e]
                            }
                        }
                    }(t);

                    function s(...e) {
                        if (this instanceof s) return r.apply(this, e), this;
                        const t = new s(...e);
                        return n.annotation = t, n;

                        function n(e, n, r) {
                            const s = e.hasOwnProperty(ie) ? e[ie] : Object.defineProperty(e, ie, {
                                value: []
                            })[ie];
                            for (; s.length <= r;) s.push(null);
                            return (s[r] = s[r] || []).push(t), e
                        }
                    }
                    return n && (s.prototype = Object.create(n.prototype)), s.prototype.ngMetadataName = e, s.annotationCls = s, s
                }
                const le = oe("Inject", e => ({
                        token: e
                    })),
                    ae = oe("Optional"),
                    ue = oe("Self"),
                    ce = oe("SkipSelf");
                var he = function(e) {
                    return e[e.Default = 0] = "Default", e[e.Host = 1] = "Host", e[e.Self = 2] = "Self", e[e.SkipSelf = 4] = "SkipSelf", e[e.Optional = 8] = "Optional", e
                }({});

                function de(e) {
                    for (let t in e)
                        if (e[t] === de) return t;
                    throw Error("Could not find renamed property on target object.")
                }

                function pe(e) {
                    return {
                        token: e.token,
                        providedIn: e.providedIn || null,
                        factory: e.factory,
                        value: void 0
                    }
                }

                function fe(e) {
                    const t = e[ge];
                    return t && t.token === e ? t : null
                }
                const ge = de({
                    ngInjectableDef: de
                });

                function me(e) {
                    if ("string" == typeof e) return e;
                    if (e instanceof Array) return "[" + e.map(me).join(", ") + "]";
                    if (null == e) return "" + e;
                    if (e.overriddenName) return `${e.overriddenName}`;
                    if (e.name) return `${e.name}`;
                    const t = e.toString();
                    if (null == t) return "" + t;
                    const n = t.indexOf("\n");
                    return -1 === n ? t : t.substring(0, n)
                }
                const ve = de({
                    __forward_ref__: de
                });

                function ye(e) {
                    return e.__forward_ref__ = ye, e.toString = function() {
                        return me(this())
                    }, e
                }

                function we(e) {
                    const t = e;
                    return "function" == typeof t && t.hasOwnProperty(ve) && t.__forward_ref__ === ye ? t() : e
                }
                const be = "undefined" != typeof globalThis && globalThis,
                    _e = "undefined" != typeof window && window,
                    Ce = "undefined" != typeof self && "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && self,
                    xe = "undefined" != typeof global && global,
                    Se = be || xe || _e || Ce;
                class Ee {
                    constructor(e, t) {
                        this._desc = e, this.ngMetadataName = "InjectionToken", this.ngInjectableDef = void 0, "number" == typeof t ? this.__NG_ELEMENT_ID__ = t : void 0 !== t && (this.ngInjectableDef = pe({
                            token: this,
                            providedIn: t.providedIn || "root",
                            factory: t.factory
                        }))
                    }
                    toString() {
                        return `InjectionToken ${this._desc}`
                    }
                }
                const Te = new Ee("INJECTOR", -1),
                    ke = new Object,
                    Re = "ngTempTokenPath",
                    Ie = "ngTokenPath",
                    Ae = /\n/gm,
                    Ne = "\u0275",
                    Pe = "__source",
                    Oe = de({
                        provide: String,
                        useValue: de
                    });
                let De, Me = void 0;

                function Le(e) {
                    const t = Me;
                    return Me = e, t
                }

                function Ue(e, t = he.Default) {
                    if (void 0 === Me) throw new Error("inject() must be called from an injection context");
                    return null === Me ? function(e, t, n) {
                        const r = fe(e);
                        if (r && "root" == r.providedIn) return void 0 === r.value ? r.value = r.factory() : r.value;
                        if (n & he.Optional) return null;
                        throw new Error(`Injector: NOT_FOUND [${me(e)}]`)
                    }(e, 0, t) : Me.get(e, t & he.Optional ? null : void 0, t)
                }

                function je(e, t = he.Default) {
                    return (De || Ue)(e, t)
                }
                class Ve {
                    get(e, t = ke) {
                        if (t === ke) {
                            const t = new Error(`NullInjectorError: No provider for ${me(e)}!`);
                            throw t.name = "NullInjectorError", t
                        }
                        return t
                    }
                }

                function He(e, t, n, r = null) {
                    e = e && "\n" === e.charAt(0) && e.charAt(1) == Ne ? e.substr(2) : e;
                    let s = me(t);
                    if (t instanceof Array) s = t.map(me).join(" -> ");
                    else if ("object" == typeof t) {
                        let e = [];
                        for (let n in t)
                            if (t.hasOwnProperty(n)) {
                                let r = t[n];
                                e.push(n + ":" + ("string" == typeof r ? JSON.stringify(r) : me(r)))
                            } s = `{${e.join(", ")}}`
                    }
                    return `${n}${r?"("+r+")":""}[${s}]: ${e.replace(Ae,"\n  ")}`
                }
                class Fe {}
                class ze {}

                function $e(e, t, n) {
                    t >= e.length ? e.push(n) : e.splice(t, 0, n)
                }

                function Be(e, t) {
                    return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0]
                }
                const qe = function() {
                        var e = {
                            Emulated: 0,
                            Native: 1,
                            None: 2,
                            ShadowDom: 3
                        };
                        return e[e.Emulated] = "Emulated", e[e.Native] = "Native", e[e.None] = "None", e[e.ShadowDom] = "ShadowDom", e
                    }(),
                    Ze = (() => ("undefined" != typeof requestAnimationFrame && requestAnimationFrame || setTimeout).bind(Se))(),
                    We = "ngDebugContext",
                    Ge = "ngOriginalError",
                    Qe = "ngErrorLogger";

                function Ke(e) {
                    return e[We]
                }

                function Je(e) {
                    return e[Ge]
                }

                function Ye(e, ...t) {
                    e.error(...t)
                }
                class Xe {
                    constructor() {
                        this._console = console
                    }
                    handleError(e) {
                        const t = this._findOriginalError(e),
                            n = this._findContext(e),
                            r = function(e) {
                                return e[Qe] || Ye
                            }(e);
                        r(this._console, "ERROR", e), t && r(this._console, "ORIGINAL ERROR", t), n && r(this._console, "ERROR CONTEXT", n)
                    }
                    _findContext(e) {
                        return e ? Ke(e) ? Ke(e) : this._findContext(Je(e)) : null
                    }
                    _findOriginalError(e) {
                        let t = Je(e);
                        for (; t && Je(t);) t = Je(t);
                        return t
                    }
                }
                let et = !0,
                    tt = !1;

                function nt() {
                    return tt = !0, et
                }
                class rt {
                    constructor(e) {
                        if (this.defaultDoc = e, this.inertDocument = this.defaultDoc.implementation.createHTMLDocument("sanitization-inert"), this.inertBodyElement = this.inertDocument.body, null == this.inertBodyElement) {
                            const e = this.inertDocument.createElement("html");
                            this.inertDocument.appendChild(e), this.inertBodyElement = this.inertDocument.createElement("body"), e.appendChild(this.inertBodyElement)
                        }
                        this.inertBodyElement.innerHTML = '<svg><g onload="this.parentNode.remove()"></g></svg>', !this.inertBodyElement.querySelector || this.inertBodyElement.querySelector("svg") ? (this.inertBodyElement.innerHTML = '<svg><p><style><img src="</style><img src=x onerror=alert(1)//">', this.getInertBodyElement = this.inertBodyElement.querySelector && this.inertBodyElement.querySelector("svg img") && function() {
                            try {
                                return !!window.DOMParser
                            } catch (e) {
                                return !1
                            }
                        }() ? this.getInertBodyElement_DOMParser : this.getInertBodyElement_InertDocument) : this.getInertBodyElement = this.getInertBodyElement_XHR
                    }
                    getInertBodyElement_XHR(e) {
                        e = "<body><remove></remove>" + e + "</body>";
                        try {
                            e = encodeURI(e)
                        } catch (r) {
                            return null
                        }
                        const t = new XMLHttpRequest;
                        t.responseType = "document", t.open("GET", "data:text/html;charset=utf-8," + e, !1), t.send(void 0);
                        const n = t.response.body;
                        return n.removeChild(n.firstChild), n
                    }
                    getInertBodyElement_DOMParser(e) {
                        e = "<body><remove></remove>" + e + "</body>";
                        try {
                            const t = (new window.DOMParser).parseFromString(e, "text/html").body;
                            return t.removeChild(t.firstChild), t
                        } catch (t) {
                            return null
                        }
                    }
                    getInertBodyElement_InertDocument(e) {
                        const t = this.inertDocument.createElement("template");
                        return "content" in t ? (t.innerHTML = e, t) : (this.inertBodyElement.innerHTML = e, this.defaultDoc.documentMode && this.stripCustomNsAttrs(this.inertBodyElement), this.inertBodyElement)
                    }
                    stripCustomNsAttrs(e) {
                        const t = e.attributes;
                        for (let r = t.length - 1; 0 < r; r--) {
                            const n = t.item(r).name;
                            "xmlns:ns1" !== n && 0 !== n.indexOf("ns1:") || e.removeAttribute(n)
                        }
                        let n = e.firstChild;
                        for (; n;) n.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(n), n = n.nextSibling
                    }
                }
                const st = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
                    it = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;

                function ot(e) {
                    return (e = String(e)).match(st) || e.match(it) ? e : (nt() && console.warn(`WARNING: sanitizing unsafe URL value ${e} (see http://g.co/ng/security#xss)`), "unsafe:" + e)
                }

                function lt(e) {
                    const t = {};
                    for (const n of e.split(",")) t[n] = !0;
                    return t
                }

                function at(...e) {
                    const t = {};
                    for (const n of e)
                        for (const e in n) n.hasOwnProperty(e) && (t[e] = !0);
                    return t
                }
                const ut = lt("area,br,col,hr,img,wbr"),
                    ct = lt("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
                    ht = lt("rp,rt"),
                    dt = at(ht, ct),
                    pt = at(ut, at(ct, lt("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")), at(ht, lt("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")), dt),
                    ft = lt("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
                    gt = lt("srcset"),
                    mt = at(ft, gt, lt("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"), lt("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext")),
                    vt = lt("script,style,template");
                class yt {
                    constructor() {
                        this.sanitizedSomething = !1, this.buf = []
                    }
                    sanitizeChildren(e) {
                        let t = e.firstChild,
                            n = !0;
                        for (; t;)
                            if (t.nodeType === Node.ELEMENT_NODE ? n = this.startElement(t) : t.nodeType === Node.TEXT_NODE ? this.chars(t.nodeValue) : this.sanitizedSomething = !0, n && t.firstChild) t = t.firstChild;
                            else
                                for (; t;) {
                                    t.nodeType === Node.ELEMENT_NODE && this.endElement(t);
                                    let e = this.checkClobberedElement(t, t.nextSibling);
                                    if (e) {
                                        t = e;
                                        break
                                    }
                                    t = this.checkClobberedElement(t, t.parentNode)
                                }
                        return this.buf.join("")
                    }
                    startElement(e) {
                        const t = e.nodeName.toLowerCase();
                        if (!pt.hasOwnProperty(t)) return this.sanitizedSomething = !0, !vt.hasOwnProperty(t);
                        this.buf.push("<"), this.buf.push(t);
                        const n = e.attributes;
                        for (let s = 0; s < n.length; s++) {
                            const e = n.item(s),
                                t = e.name,
                                i = t.toLowerCase();
                            if (!mt.hasOwnProperty(i)) {
                                this.sanitizedSomething = !0;
                                continue
                            }
                            let o = e.value;
                            ft[i] && (o = ot(o)), gt[i] && (r = o, o = (r = String(r)).split(",").map(e => ot(e.trim())).join(", ")), this.buf.push(" ", t, '="', _t(o), '"')
                        }
                        var r;
                        return this.buf.push(">"), !0
                    }
                    endElement(e) {
                        const t = e.nodeName.toLowerCase();
                        pt.hasOwnProperty(t) && !ut.hasOwnProperty(t) && (this.buf.push("</"), this.buf.push(t), this.buf.push(">"))
                    }
                    chars(e) {
                        this.buf.push(_t(e))
                    }
                    checkClobberedElement(e, t) {
                        if (t && (e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY) === Node.DOCUMENT_POSITION_CONTAINED_BY) throw new Error(`Failed to sanitize html because the element is clobbered: ${e.outerHTML}`);
                        return t
                    }
                }
                const wt = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
                    bt = /([^\#-~ |!])/g;

                function _t(e) {
                    return e.replace(/&/g, "&amp;").replace(wt, (function(e) {
                        return "&#" + (1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320) + 65536) + ";"
                    })).replace(bt, (function(e) {
                        return "&#" + e.charCodeAt(0) + ";"
                    })).replace(/</g, "&lt;").replace(/>/g, "&gt;")
                }
                let Ct;

                function xt(e) {
                    return "content" in e && function(e) {
                        return e.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === e.nodeName
                    }(e) ? e.content : null
                }
                const St = function() {
                    var e = {
                        NONE: 0,
                        HTML: 1,
                        STYLE: 2,
                        SCRIPT: 3,
                        URL: 4,
                        RESOURCE_URL: 5
                    };
                    return e[e.NONE] = "NONE", e[e.HTML] = "HTML", e[e.STYLE] = "STYLE", e[e.SCRIPT] = "SCRIPT", e[e.URL] = "URL", e[e.RESOURCE_URL] = "RESOURCE_URL", e
                }();
                class Et {}
                const Tt = new RegExp("^([-,.\"'%_!# a-zA-Z0-9]+|(?:(?:matrix|translate|scale|rotate|skew|perspective)(?:X|Y|Z|3d)?|(?:rgb|hsl)a?|(?:repeating-)?(?:linear|radial)-gradient|(?:calc|attr))\\([-0-9.%, #a-zA-Z]+\\))$", "g"),
                    kt = /^url\(([^)]+)\)$/,
                    Rt = /([A-Z])/g;

                function It(e) {
                    try {
                        return null != e ? e.toString().slice(0, 30) : e
                    } catch (t) {
                        return "[ERROR] Exception while trying to serialize the value"
                    }
                }
                let At = (() => {
                    class e {}
                    return e.__NG_ELEMENT_ID__ = () => Nt(), e
                })();
                const Nt = (...e) => {},
                    Pt = new Ee("The presence of this token marks an injector as being the root injector."),
                    Ot = function(e, t, n) {
                        return new Ht(e, t, n)
                    };
                let Dt = (() => {
                    class e {
                        static create(e, t) {
                            return Array.isArray(e) ? Ot(e, t, "") : Ot(e.providers, e.parent, e.name || "")
                        }
                    }
                    return e.THROW_IF_NOT_FOUND = ke, e.NULL = new Ve, e.ngInjectableDef = pe({
                        token: e,
                        providedIn: "any",
                        factory: () => je(Te)
                    }), e.__NG_ELEMENT_ID__ = -1, e
                })();
                const Mt = function(e) {
                        return e
                    },
                    Lt = [],
                    Ut = Mt,
                    jt = function() {
                        return Array.prototype.slice.call(arguments)
                    },
                    Vt = "\u0275";
                class Ht {
                    constructor(e, t = Dt.NULL, n = null) {
                        this.parent = t, this.source = n;
                        const r = this._records = new Map;
                        r.set(Dt, {
                                token: Dt,
                                fn: Mt,
                                deps: Lt,
                                value: this,
                                useNew: !1
                            }), r.set(Te, {
                                token: Te,
                                fn: Mt,
                                deps: Lt,
                                value: this,
                                useNew: !1
                            }),
                            function e(t, n) {
                                if (n)
                                    if ((n = we(n)) instanceof Array)
                                        for (let r = 0; r < n.length; r++) e(t, n[r]);
                                    else {
                                        if ("function" == typeof n) throw zt("Function/Class not supported", n);
                                        if (!n || "object" != typeof n || !n.provide) throw zt("Unexpected provider", n); {
                                            let e = we(n.provide);
                                            const r = function(e) {
                                                const t = function(e) {
                                                    let t = Lt;
                                                    const n = e.deps;
                                                    if (n && n.length) {
                                                        t = [];
                                                        for (let e = 0; e < n.length; e++) {
                                                            let r = 6,
                                                                s = we(n[e]);
                                                            if (s instanceof Array)
                                                                for (let e = 0, t = s; e < t.length; e++) {
                                                                    const n = t[e];
                                                                    n instanceof ae || n == ae ? r |= 1 : n instanceof ce || n == ce ? r &= -3 : n instanceof ue || n == ue ? r &= -5 : s = n instanceof le ? n.token : we(n)
                                                                }
                                                            t.push({
                                                                token: s,
                                                                options: r
                                                            })
                                                        }
                                                    } else if (e.useExisting) t = [{
                                                        token: we(e.useExisting),
                                                        options: 6
                                                    }];
                                                    else if (!(n || Oe in e)) throw zt("'deps' required", e);
                                                    return t
                                                }(e);
                                                let n = Mt,
                                                    r = Lt,
                                                    s = !1,
                                                    i = we(e.provide);
                                                if (Oe in e) r = e.useValue;
                                                else if (e.useFactory) n = e.useFactory;
                                                else if (e.useExisting);
                                                else if (e.useClass) s = !0, n = we(e.useClass);
                                                else {
                                                    if ("function" != typeof i) throw zt("StaticProvider does not have [useValue|useFactory|useExisting|useClass] or [provide] is not newable", e);
                                                    s = !0, n = i
                                                }
                                                return {
                                                    deps: t,
                                                    fn: n,
                                                    useNew: s,
                                                    value: r
                                                }
                                            }(n);
                                            if (!0 === n.multi) {
                                                let r = t.get(e);
                                                if (r) {
                                                    if (r.fn !== jt) throw Ft(e)
                                                } else t.set(e, r = {
                                                    token: n.provide,
                                                    deps: [],
                                                    useNew: !1,
                                                    fn: jt,
                                                    value: Lt
                                                });
                                                r.deps.push({
                                                    token: e = n,
                                                    options: 6
                                                })
                                            }
                                            const s = t.get(e);
                                            if (s && s.fn == jt) throw Ft(e);
                                            t.set(e, r)
                                        }
                                    }
                            }(r, e)
                    }
                    get(e, t, n = he.Default) {
                        const r = this._records.get(e);
                        try {
                            return function e(t, n, r, s, i, o) {
                                try {
                                    return function(t, n, r, s, i, o) {
                                        let l;
                                        if (!n || o & he.SkipSelf) o & he.Self || (l = s.get(t, i, he.Default));
                                        else {
                                            if ((l = n.value) == Ut) throw Error(Vt + "Circular dependency");
                                            if (l === Lt) {
                                                n.value = Ut;
                                                let t = void 0,
                                                    i = n.useNew,
                                                    o = n.fn,
                                                    a = n.deps,
                                                    u = Lt;
                                                if (a.length) {
                                                    u = [];
                                                    for (let t = 0; t < a.length; t++) {
                                                        const n = a[t],
                                                            i = n.options,
                                                            o = 2 & i ? r.get(n.token) : void 0;
                                                        u.push(e(n.token, o, r, o || 4 & i ? s : Dt.NULL, 1 & i ? null : Dt.THROW_IF_NOT_FOUND, he.Default))
                                                    }
                                                }
                                                n.value = l = i ? new o(...u) : o.apply(t, u)
                                            }
                                        }
                                        return l
                                    }(t, n, r, s, i, o)
                                } catch (l) {
                                    throw l instanceof Error || (l = new Error(l)), (l[Re] = l[Re] || []).unshift(t), n && n.value == Ut && (n.value = Lt), l
                                }
                            }(e, r, this._records, this.parent, t, n)
                        } catch (s) {
                            return function(e, t, n, r) {
                                const s = e[Re];
                                throw t[Pe] && s.unshift(t[Pe]), e.message = He("\n" + e.message, s, "StaticInjectorError", r), e[Ie] = s, e[Re] = null, e
                            }(s, e, 0, this.source)
                        }
                    }
                    toString() {
                        const e = [];
                        return this._records.forEach((t, n) => e.push(me(n))), `StaticInjector[${e.join(", ")}]`
                    }
                }

                function Ft(e) {
                    return zt("Cannot mix multi providers and regular providers", e)
                }

                function zt(e, t) {
                    return new Error(He(e, t, "StaticInjectorError"))
                }
                const $t = new Ee("AnalyzeForEntryComponents");
                let Bt = null;

                function qt() {
                    if (!Bt) {
                        const e = Se.Symbol;
                        if (e && e.iterator) Bt = e.iterator;
                        else {
                            const e = Object.getOwnPropertyNames(Map.prototype);
                            for (let t = 0; t < e.length; ++t) {
                                const n = e[t];
                                "entries" !== n && "size" !== n && Map.prototype[n] === Map.prototype.entries && (Bt = n)
                            }
                        }
                    }
                    return Bt
                }

                function Zt(e, t) {
                    return e === t || "number" == typeof e && "number" == typeof t && isNaN(e) && isNaN(t)
                }

                function Wt(e, t) {
                    const n = Qt(e),
                        r = Qt(t);
                    if (n && r) return function(e, t, n) {
                        const r = e[qt()](),
                            s = t[qt()]();
                        for (;;) {
                            const e = r.next(),
                                t = s.next();
                            if (e.done && t.done) return !0;
                            if (e.done || t.done) return !1;
                            if (!n(e.value, t.value)) return !1
                        }
                    }(e, t, Wt); {
                        const s = e && ("object" == typeof e || "function" == typeof e),
                            i = t && ("object" == typeof t || "function" == typeof t);
                        return !(n || !s || r || !i) || Zt(e, t)
                    }
                }
                class Gt {
                    constructor(e) {
                        this.wrapped = e
                    }
                    static wrap(e) {
                        return new Gt(e)
                    }
                    static unwrap(e) {
                        return Gt.isWrapped(e) ? e.wrapped : e
                    }
                    static isWrapped(e) {
                        return e instanceof Gt
                    }
                }

                function Qt(e) {
                    return !!Kt(e) && (Array.isArray(e) || !(e instanceof Map) && qt() in e)
                }

                function Kt(e) {
                    return null !== e && ("function" == typeof e || "object" == typeof e)
                }

                function Jt(e) {
                    return !!e && "function" == typeof e.then
                }

                function Yt(e) {
                    return !!e && "function" == typeof e.subscribe
                }
                class Xt {
                    constructor(e, t, n) {
                        this.previousValue = e, this.currentValue = t, this.firstChange = n
                    }
                    isFirstChange() {
                        return this.firstChange
                    }
                }
                class en {}
                class tn {}

                function nn(e) {
                    const t = Error(`No component factory found for ${me(e)}. Did you add it to @NgModule.entryComponents?`);
                    return t[rn] = e, t
                }
                const rn = "ngComponent";
                class sn {
                    resolveComponentFactory(e) {
                        throw nn(e)
                    }
                }
                let on = (() => {
                    class e {}
                    return e.NULL = new sn, e
                })();
                class ln {
                    constructor(e, t, n) {
                        this._parent = t, this._ngModule = n, this._factories = new Map;
                        for (let r = 0; r < e.length; r++) {
                            const t = e[r];
                            this._factories.set(t.componentType, t)
                        }
                    }
                    resolveComponentFactory(e) {
                        let t = this._factories.get(e);
                        if (!t && this._parent && (t = this._parent.resolveComponentFactory(e)), !t) throw nn(e);
                        return new an(t, this._ngModule)
                    }
                }
                class an extends tn {
                    constructor(e, t) {
                        super(), this.factory = e, this.ngModule = t, this.selector = e.selector, this.componentType = e.componentType, this.ngContentSelectors = e.ngContentSelectors, this.inputs = e.inputs, this.outputs = e.outputs
                    }
                    create(e, t, n, r) {
                        return this.factory.create(e, t, n, r || this.ngModule)
                    }
                }

                function un(...e) {}
                let cn = (() => {
                    class e {
                        constructor(e) {
                            this.nativeElement = e
                        }
                    }
                    return e.__NG_ELEMENT_ID__ = () => hn(e), e
                })();
                const hn = un;
                class dn {}
                class pn {}
                const fn = function() {
                    var e = {
                        Important: 1,
                        DashCase: 2
                    };
                    return e[e.Important] = "Important", e[e.DashCase] = "DashCase", e
                }();
                let gn = (() => {
                    class e {}
                    return e.__NG_ELEMENT_ID__ = () => mn(), e
                })();
                const mn = un;
                class vn {
                    constructor(e) {
                        this.full = e, this.major = e.split(".")[0], this.minor = e.split(".")[1], this.patch = e.split(".").slice(2).join(".")
                    }
                }
                const yn = new vn("8.2.14");
                class wn {
                    constructor() {}
                    supports(e) {
                        return Qt(e)
                    }
                    create(e) {
                        return new _n(e)
                    }
                }
                const bn = (e, t) => t;
                class _n {
                    constructor(e) {
                        this.length = 0, this._linkedRecords = null, this._unlinkedRecords = null, this._previousItHead = null, this._itHead = null, this._itTail = null, this._additionsHead = null, this._additionsTail = null, this._movesHead = null, this._movesTail = null, this._removalsHead = null, this._removalsTail = null, this._identityChangesHead = null, this._identityChangesTail = null, this._trackByFn = e || bn
                    }
                    forEachItem(e) {
                        let t;
                        for (t = this._itHead; null !== t; t = t._next) e(t)
                    }
                    forEachOperation(e) {
                        let t = this._itHead,
                            n = this._removalsHead,
                            r = 0,
                            s = null;
                        for (; t || n;) {
                            const i = !n || t && t.currentIndex < En(n, r, s) ? t : n,
                                o = En(i, r, s),
                                l = i.currentIndex;
                            if (i === n) r--, n = n._nextRemoved;
                            else if (t = t._next, null == i.previousIndex) r++;
                            else {
                                s || (s = []);
                                const e = o - r,
                                    t = l - r;
                                if (e != t) {
                                    for (let n = 0; n < e; n++) {
                                        const r = n < s.length ? s[n] : s[n] = 0,
                                            i = r + n;
                                        t <= i && i < e && (s[n] = r + 1)
                                    }
                                    s[i.previousIndex] = t - e
                                }
                            }
                            o !== l && e(i, o, l)
                        }
                    }
                    forEachPreviousItem(e) {
                        let t;
                        for (t = this._previousItHead; null !== t; t = t._nextPrevious) e(t)
                    }
                    forEachAddedItem(e) {
                        let t;
                        for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t)
                    }
                    forEachMovedItem(e) {
                        let t;
                        for (t = this._movesHead; null !== t; t = t._nextMoved) e(t)
                    }
                    forEachRemovedItem(e) {
                        let t;
                        for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t)
                    }
                    forEachIdentityChange(e) {
                        let t;
                        for (t = this._identityChangesHead; null !== t; t = t._nextIdentityChange) e(t)
                    }
                    diff(e) {
                        if (null == e && (e = []), !Qt(e)) throw new Error(`Error trying to diff '${me(e)}'. Only arrays and iterables are allowed`);
                        return this.check(e) ? this : null
                    }
                    onDestroy() {}
                    check(e) {
                        this._reset();
                        let t, n, r, s = this._itHead,
                            i = !1;
                        if (Array.isArray(e)) {
                            this.length = e.length;
                            for (let t = 0; t < this.length; t++) r = this._trackByFn(t, n = e[t]), null !== s && Zt(s.trackById, r) ? (i && (s = this._verifyReinsertion(s, n, r, t)), Zt(s.item, n) || this._addIdentityChange(s, n)) : (s = this._mismatch(s, n, r, t), i = !0), s = s._next
                        } else t = 0,
                            function(e, t) {
                                if (Array.isArray(e))
                                    for (let n = 0; n < e.length; n++) t(e[n]);
                                else {
                                    const n = e[qt()]();
                                    let r;
                                    for (; !(r = n.next()).done;) t(r.value)
                                }
                            }(e, e => {
                                r = this._trackByFn(t, e), null !== s && Zt(s.trackById, r) ? (i && (s = this._verifyReinsertion(s, e, r, t)), Zt(s.item, e) || this._addIdentityChange(s, e)) : (s = this._mismatch(s, e, r, t), i = !0), s = s._next, t++
                            }), this.length = t;
                        return this._truncate(s), this.collection = e, this.isDirty
                    }
                    get isDirty() {
                        return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead
                    }
                    _reset() {
                        if (this.isDirty) {
                            let e, t;
                            for (e = this._previousItHead = this._itHead; null !== e; e = e._next) e._nextPrevious = e._next;
                            for (e = this._additionsHead; null !== e; e = e._nextAdded) e.previousIndex = e.currentIndex;
                            for (this._additionsHead = this._additionsTail = null, e = this._movesHead; null !== e; e = t) e.previousIndex = e.currentIndex, t = e._nextMoved;
                            this._movesHead = this._movesTail = null, this._removalsHead = this._removalsTail = null, this._identityChangesHead = this._identityChangesTail = null
                        }
                    }
                    _mismatch(e, t, n, r) {
                        let s;
                        return null === e ? s = this._itTail : (s = e._prev, this._remove(e)), null !== (e = null === this._linkedRecords ? null : this._linkedRecords.get(n, r)) ? (Zt(e.item, t) || this._addIdentityChange(e, t), this._moveAfter(e, s, r)) : null !== (e = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null)) ? (Zt(e.item, t) || this._addIdentityChange(e, t), this._reinsertAfter(e, s, r)) : e = this._addAfter(new Cn(t, n), s, r), e
                    }
                    _verifyReinsertion(e, t, n, r) {
                        let s = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null);
                        return null !== s ? e = this._reinsertAfter(s, e._prev, r) : e.currentIndex != r && (e.currentIndex = r, this._addToMoves(e, r)), e
                    }
                    _truncate(e) {
                        for (; null !== e;) {
                            const t = e._next;
                            this._addToRemovals(this._unlink(e)), e = t
                        }
                        null !== this._unlinkedRecords && this._unlinkedRecords.clear(), null !== this._additionsTail && (this._additionsTail._nextAdded = null), null !== this._movesTail && (this._movesTail._nextMoved = null), null !== this._itTail && (this._itTail._next = null), null !== this._removalsTail && (this._removalsTail._nextRemoved = null), null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null)
                    }
                    _reinsertAfter(e, t, n) {
                        null !== this._unlinkedRecords && this._unlinkedRecords.remove(e);
                        const r = e._prevRemoved,
                            s = e._nextRemoved;
                        return null === r ? this._removalsHead = s : r._nextRemoved = s, null === s ? this._removalsTail = r : s._prevRemoved = r, this._insertAfter(e, t, n), this._addToMoves(e, n), e
                    }
                    _moveAfter(e, t, n) {
                        return this._unlink(e), this._insertAfter(e, t, n), this._addToMoves(e, n), e
                    }
                    _addAfter(e, t, n) {
                        return this._insertAfter(e, t, n), this._additionsTail = null === this._additionsTail ? this._additionsHead = e : this._additionsTail._nextAdded = e, e
                    }
                    _insertAfter(e, t, n) {
                        const r = null === t ? this._itHead : t._next;
                        return e._next = r, e._prev = t, null === r ? this._itTail = e : r._prev = e, null === t ? this._itHead = e : t._next = e, null === this._linkedRecords && (this._linkedRecords = new Sn), this._linkedRecords.put(e), e.currentIndex = n, e
                    }
                    _remove(e) {
                        return this._addToRemovals(this._unlink(e))
                    }
                    _unlink(e) {
                        null !== this._linkedRecords && this._linkedRecords.remove(e);
                        const t = e._prev,
                            n = e._next;
                        return null === t ? this._itHead = n : t._next = n, null === n ? this._itTail = t : n._prev = t, e
                    }
                    _addToMoves(e, t) {
                        return e.previousIndex === t ? e : (this._movesTail = null === this._movesTail ? this._movesHead = e : this._movesTail._nextMoved = e, e)
                    }
                    _addToRemovals(e) {
                        return null === this._unlinkedRecords && (this._unlinkedRecords = new Sn), this._unlinkedRecords.put(e), e.currentIndex = null, e._nextRemoved = null, null === this._removalsTail ? (this._removalsTail = this._removalsHead = e, e._prevRemoved = null) : (e._prevRemoved = this._removalsTail, this._removalsTail = this._removalsTail._nextRemoved = e), e
                    }
                    _addIdentityChange(e, t) {
                        return e.item = t, this._identityChangesTail = null === this._identityChangesTail ? this._identityChangesHead = e : this._identityChangesTail._nextIdentityChange = e, e
                    }
                }
                class Cn {
                    constructor(e, t) {
                        this.item = e, this.trackById = t, this.currentIndex = null, this.previousIndex = null, this._nextPrevious = null, this._prev = null, this._next = null, this._prevDup = null, this._nextDup = null, this._prevRemoved = null, this._nextRemoved = null, this._nextAdded = null, this._nextMoved = null, this._nextIdentityChange = null
                    }
                }
                class xn {
                    constructor() {
                        this._head = null, this._tail = null
                    }
                    add(e) {
                        null === this._head ? (this._head = this._tail = e, e._nextDup = null, e._prevDup = null) : (this._tail._nextDup = e, e._prevDup = this._tail, e._nextDup = null, this._tail = e)
                    }
                    get(e, t) {
                        let n;
                        for (n = this._head; null !== n; n = n._nextDup)
                            if ((null === t || t <= n.currentIndex) && Zt(n.trackById, e)) return n;
                        return null
                    }
                    remove(e) {
                        const t = e._prevDup,
                            n = e._nextDup;
                        return null === t ? this._head = n : t._nextDup = n, null === n ? this._tail = t : n._prevDup = t, null === this._head
                    }
                }
                class Sn {
                    constructor() {
                        this.map = new Map
                    }
                    put(e) {
                        const t = e.trackById;
                        let n = this.map.get(t);
                        n || (n = new xn, this.map.set(t, n)), n.add(e)
                    }
                    get(e, t) {
                        const n = this.map.get(e);
                        return n ? n.get(e, t) : null
                    }
                    remove(e) {
                        const t = e.trackById;
                        return this.map.get(t).remove(e) && this.map.delete(t), e
                    }
                    get isEmpty() {
                        return 0 === this.map.size
                    }
                    clear() {
                        this.map.clear()
                    }
                }

                function En(e, t, n) {
                    const r = e.previousIndex;
                    if (null === r) return r;
                    let s = 0;
                    return n && r < n.length && (s = n[r]), r + t + s
                }
                class Tn {
                    constructor() {}
                    supports(e) {
                        return e instanceof Map || Kt(e)
                    }
                    create() {
                        return new kn
                    }
                }
                class kn {
                    constructor() {
                        this._records = new Map, this._mapHead = null, this._appendAfter = null, this._previousMapHead = null, this._changesHead = null, this._changesTail = null, this._additionsHead = null, this._additionsTail = null, this._removalsHead = null, this._removalsTail = null
                    }
                    get isDirty() {
                        return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead
                    }
                    forEachItem(e) {
                        let t;
                        for (t = this._mapHead; null !== t; t = t._next) e(t)
                    }
                    forEachPreviousItem(e) {
                        let t;
                        for (t = this._previousMapHead; null !== t; t = t._nextPrevious) e(t)
                    }
                    forEachChangedItem(e) {
                        let t;
                        for (t = this._changesHead; null !== t; t = t._nextChanged) e(t)
                    }
                    forEachAddedItem(e) {
                        let t;
                        for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t)
                    }
                    forEachRemovedItem(e) {
                        let t;
                        for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t)
                    }
                    diff(e) {
                        if (e) {
                            if (!(e instanceof Map || Kt(e))) throw new Error(`Error trying to diff '${me(e)}'. Only maps and objects are allowed`)
                        } else e = new Map;
                        return this.check(e) ? this : null
                    }
                    onDestroy() {}
                    check(e) {
                        this._reset();
                        let t = this._mapHead;
                        if (this._appendAfter = null, this._forEach(e, (e, n) => {
                                if (t && t.key === n) this._maybeAddToChanges(t, e), this._appendAfter = t, t = t._next;
                                else {
                                    const r = this._getOrCreateRecordForKey(n, e);
                                    t = this._insertBeforeOrAppend(t, r)
                                }
                            }), t) {
                            t._prev && (t._prev._next = null), this._removalsHead = t;
                            for (let e = t; null !== e; e = e._nextRemoved) e === this._mapHead && (this._mapHead = null), this._records.delete(e.key), e._nextRemoved = e._next, e.previousValue = e.currentValue, e.currentValue = null, e._prev = null, e._next = null
                        }
                        return this._changesTail && (this._changesTail._nextChanged = null), this._additionsTail && (this._additionsTail._nextAdded = null), this.isDirty
                    }
                    _insertBeforeOrAppend(e, t) {
                        if (e) {
                            const n = e._prev;
                            return t._next = e, t._prev = n, e._prev = t, n && (n._next = t), e === this._mapHead && (this._mapHead = t), this._appendAfter = e, e
                        }
                        return this._appendAfter ? (this._appendAfter._next = t, t._prev = this._appendAfter) : this._mapHead = t, this._appendAfter = t, null
                    }
                    _getOrCreateRecordForKey(e, t) {
                        if (this._records.has(e)) {
                            const n = this._records.get(e);
                            this._maybeAddToChanges(n, t);
                            const r = n._prev,
                                s = n._next;
                            return r && (r._next = s), s && (s._prev = r), n._next = null, n._prev = null, n
                        }
                        const n = new Rn(e);
                        return this._records.set(e, n), n.currentValue = t, this._addToAdditions(n), n
                    }
                    _reset() {
                        if (this.isDirty) {
                            let e;
                            for (this._previousMapHead = this._mapHead, e = this._previousMapHead; null !== e; e = e._next) e._nextPrevious = e._next;
                            for (e = this._changesHead; null !== e; e = e._nextChanged) e.previousValue = e.currentValue;
                            for (e = this._additionsHead; null != e; e = e._nextAdded) e.previousValue = e.currentValue;
                            this._changesHead = this._changesTail = null, this._additionsHead = this._additionsTail = null, this._removalsHead = null
                        }
                    }
                    _maybeAddToChanges(e, t) {
                        Zt(t, e.currentValue) || (e.previousValue = e.currentValue, e.currentValue = t, this._addToChanges(e))
                    }
                    _addToAdditions(e) {
                        null === this._additionsHead ? this._additionsHead = this._additionsTail = e : (this._additionsTail._nextAdded = e, this._additionsTail = e)
                    }
                    _addToChanges(e) {
                        null === this._changesHead ? this._changesHead = this._changesTail = e : (this._changesTail._nextChanged = e, this._changesTail = e)
                    }
                    _forEach(e, t) {
                        e instanceof Map ? e.forEach(t) : Object.keys(e).forEach(n => t(e[n], n))
                    }
                }
                class Rn {
                    constructor(e) {
                        this.key = e, this.previousValue = null, this.currentValue = null, this._nextPrevious = null, this._next = null, this._prev = null, this._nextAdded = null, this._nextRemoved = null, this._nextChanged = null
                    }
                }
                let In = (() => {
                        class e {
                            constructor(e) {
                                this.factories = e
                            }
                            static create(t, n) {
                                if (null != n) {
                                    const e = n.factories.slice();
                                    t = t.concat(e)
                                }
                                return new e(t)
                            }
                            static extend(t) {
                                return {
                                    provide: e,
                                    useFactory: n => {
                                        if (!n) throw new Error("Cannot extend IterableDiffers without a parent injector");
                                        return e.create(t, n)
                                    },
                                    deps: [
                                        [e, new ce, new ae]
                                    ]
                                }
                            }
                            find(e) {
                                const t = this.factories.find(t => t.supports(e));
                                if (null != t) return t;
                                throw new Error(`Cannot find a differ supporting object '${e}' of type '${n=e,n.name||typeof n}'`);
                                var n
                            }
                        }
                        return e.ngInjectableDef = pe({
                            token: e,
                            providedIn: "root",
                            factory: () => new e([new wn])
                        }), e
                    })(),
                    An = (() => {
                        class e {
                            constructor(e) {
                                this.factories = e
                            }
                            static create(t, n) {
                                if (n) {
                                    const e = n.factories.slice();
                                    t = t.concat(e)
                                }
                                return new e(t)
                            }
                            static extend(t) {
                                return {
                                    provide: e,
                                    useFactory: n => {
                                        if (!n) throw new Error("Cannot extend KeyValueDiffers without a parent injector");
                                        return e.create(t, n)
                                    },
                                    deps: [
                                        [e, new ce, new ae]
                                    ]
                                }
                            }
                            find(e) {
                                const t = this.factories.find(t => t.supports(e));
                                if (t) return t;
                                throw new Error(`Cannot find a differ supporting object '${e}'`)
                            }
                        }
                        return e.ngInjectableDef = pe({
                            token: e,
                            providedIn: "root",
                            factory: () => new e([new Tn])
                        }), e
                    })();
                const Nn = [new Tn],
                    Pn = new In([new wn]),
                    On = new An(Nn);
                let Dn = (() => {
                    class e {}
                    return e.__NG_ELEMENT_ID__ = () => Mn(e, cn), e
                })();
                const Mn = un;
                let Ln = (() => {
                    class e {}
                    return e.__NG_ELEMENT_ID__ = () => Un(e, cn), e
                })();
                const Un = un;

                function jn(e, t, n, r) {
                    let s = `ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: '${t}'. Current value: '${n}'.`;
                    return r && (s += " It seems like the view has been created after its parent and its children have been dirty checked. Has it been created in a change detection hook ?"),
                        function(e, t) {
                            const n = new Error(e);
                            return Vn(n, t), n
                        }(s, e)
                }

                function Vn(e, t) {
                    e[We] = t, e[Qe] = t.logError.bind(t)
                }

                function Hn(e) {
                    return new Error(`ViewDestroyedError: Attempt to use a destroyed view: ${e}`)
                }

                function Fn(e, t, n) {
                    const r = e.state,
                        s = 1792 & r;
                    return s === t ? (e.state = -1793 & r | n, e.initIndex = -1, !0) : s === n
                }

                function zn(e, t, n) {
                    return (1792 & e.state) === t && e.initIndex <= n && (e.initIndex = n + 1, !0)
                }

                function $n(e, t) {
                    return e.nodes[t]
                }

                function Bn(e, t) {
                    return e.nodes[t]
                }

                function qn(e, t) {
                    return e.nodes[t]
                }

                function Zn(e, t) {
                    return e.nodes[t]
                }

                function Wn(e, t) {
                    return e.nodes[t]
                }
                const Gn = {
                        setCurrentNode: void 0,
                        createRootView: void 0,
                        createEmbeddedView: void 0,
                        createComponentView: void 0,
                        createNgModuleRef: void 0,
                        overrideProvider: void 0,
                        overrideComponentView: void 0,
                        clearOverrides: void 0,
                        checkAndUpdateView: void 0,
                        checkNoChangesView: void 0,
                        destroyView: void 0,
                        resolveDep: void 0,
                        createDebugContext: void 0,
                        handleEvent: void 0,
                        updateDirectives: void 0,
                        updateRenderer: void 0,
                        dirtyParentQueries: void 0
                    },
                    Qn = () => {},
                    Kn = new Map;

                function Jn(e) {
                    let t = Kn.get(e);
                    return t || (t = me(e) + "_" + Kn.size, Kn.set(e, t)), t
                }
                const Yn = "$$undefined",
                    Xn = "$$empty";

                function er(e) {
                    return {
                        id: Yn,
                        styles: e.styles,
                        encapsulation: e.encapsulation,
                        data: e.data
                    }
                }
                let tr = 0;

                function nr(e, t, n, r) {
                    return !(!(2 & e.state) && Zt(e.oldValues[t.bindingIndex + n], r))
                }

                function rr(e, t, n, r) {
                    return !!nr(e, t, n, r) && (e.oldValues[t.bindingIndex + n] = r, !0)
                }

                function sr(e, t, n, r) {
                    const s = e.oldValues[t.bindingIndex + n];
                    if (1 & e.state || !Wt(s, r)) {
                        const i = t.bindings[n].name;
                        throw jn(Gn.createDebugContext(e, t.nodeIndex), `${i}: ${s}`, `${i}: ${r}`, 0 != (1 & e.state))
                    }
                }

                function ir(e) {
                    let t = e;
                    for (; t;) 2 & t.def.flags && (t.state |= 8), t = t.viewContainerParent || t.parent
                }

                function or(e, t) {
                    let n = e;
                    for (; n && n !== t;) n.state |= 64, n = n.viewContainerParent || n.parent
                }

                function lr(e, t, n, r) {
                    try {
                        return ir(33554432 & e.def.nodes[t].flags ? Bn(e, t).componentView : e), Gn.handleEvent(e, t, n, r)
                    } catch (s) {
                        e.root.errorHandler.handleError(s)
                    }
                }

                function ar(e) {
                    return e.parent ? Bn(e.parent, e.parentNodeDef.nodeIndex) : null
                }

                function ur(e) {
                    return e.parent ? e.parentNodeDef.parent : null
                }

                function cr(e, t) {
                    switch (201347067 & t.flags) {
                        case 1:
                            return Bn(e, t.nodeIndex).renderElement;
                        case 2:
                            return $n(e, t.nodeIndex).renderText
                    }
                }

                function hr(e) {
                    return !!e.parent && !!(32768 & e.parentNodeDef.flags)
                }

                function dr(e) {
                    return !(!e.parent || 32768 & e.parentNodeDef.flags)
                }

                function pr(e) {
                    const t = {};
                    let n = 0;
                    const r = {};
                    return e && e.forEach(([e, s]) => {
                        "number" == typeof e ? (t[e] = s, n |= function(e) {
                            return 1 << e % 32
                        }(e)) : r[e] = s
                    }), {
                        matchedQueries: t,
                        references: r,
                        matchedQueryIds: n
                    }
                }

                function fr(e, t) {
                    return e.map(e => {
                        let n, r;
                        return Array.isArray(e) ? [r, n] = e : (r = 0, n = e), n && ("function" == typeof n || "object" == typeof n) && t && Object.defineProperty(n, Pe, {
                            value: t,
                            configurable: !0
                        }), {
                            flags: r,
                            token: n,
                            tokenKey: Jn(n)
                        }
                    })
                }

                function gr(e, t, n) {
                    let r = n.renderParent;
                    return r ? 0 == (1 & r.flags) || 0 == (33554432 & r.flags) || r.element.componentRendererType && r.element.componentRendererType.encapsulation === qe.Native ? Bn(e, n.renderParent.nodeIndex).renderElement : void 0 : t
                }
                const mr = new WeakMap;

                function vr(e) {
                    let t = mr.get(e);
                    return t || ((t = e(() => Qn)).factory = e, mr.set(e, t)), t
                }

                function yr(e, t, n, r, s) {
                    3 === t && (n = e.renderer.parentNode(cr(e, e.def.lastRenderRootNode))), wr(e, t, 0, e.def.nodes.length - 1, n, r, s)
                }

                function wr(e, t, n, r, s, i, o) {
                    for (let l = n; l <= r; l++) {
                        const n = e.def.nodes[l];
                        11 & n.flags && _r(e, n, t, s, i, o), l += n.childCount
                    }
                }

                function br(e, t, n, r, s, i) {
                    let o = e;
                    for (; o && !hr(o);) o = o.parent;
                    const l = o.parent,
                        a = ur(o),
                        u = a.nodeIndex + a.childCount;
                    for (let c = a.nodeIndex + 1; c <= u; c++) {
                        const e = l.def.nodes[c];
                        e.ngContentIndex === t && _r(l, e, n, r, s, i), c += e.childCount
                    }
                    if (!l.parent) {
                        const o = e.root.projectableNodes[t];
                        if (o)
                            for (let t = 0; t < o.length; t++) Cr(e, o[t], n, r, s, i)
                    }
                }

                function _r(e, t, n, r, s, i) {
                    if (8 & t.flags) br(e, t.ngContent.index, n, r, s, i);
                    else {
                        const o = cr(e, t);
                        if (3 === n && 33554432 & t.flags && 48 & t.bindingFlags ? (16 & t.bindingFlags && Cr(e, o, n, r, s, i), 32 & t.bindingFlags && Cr(Bn(e, t.nodeIndex).componentView, o, n, r, s, i)) : Cr(e, o, n, r, s, i), 16777216 & t.flags) {
                            const o = Bn(e, t.nodeIndex).viewContainer._embeddedViews;
                            for (let e = 0; e < o.length; e++) yr(o[e], n, r, s, i)
                        }
                        1 & t.flags && !t.element.name && wr(e, n, t.nodeIndex + 1, t.nodeIndex + t.childCount, r, s, i)
                    }
                }

                function Cr(e, t, n, r, s, i) {
                    const o = e.renderer;
                    switch (n) {
                        case 1:
                            o.appendChild(r, t);
                            break;
                        case 2:
                            o.insertBefore(r, t, s);
                            break;
                        case 3:
                            o.removeChild(r, t);
                            break;
                        case 0:
                            i.push(t)
                    }
                }
                const xr = /^:([^:]+):(.+)$/;

                function Sr(e) {
                    if (":" === e[0]) {
                        const t = e.match(xr);
                        return [t[1], t[2]]
                    }
                    return ["", e]
                }

                function Er(e) {
                    let t = 0;
                    for (let n = 0; n < e.length; n++) t |= e[n].flags;
                    return t
                }
                const Tr = new Object,
                    kr = Jn(Dt),
                    Rr = Jn(Te),
                    Ir = Jn(Fe);

                function Ar(e, t, n, r) {
                    return n = we(n), {
                        index: -1,
                        deps: fr(r, me(t)),
                        flags: e,
                        token: t,
                        value: n
                    }
                }

                function Nr(e, t, n = Dt.THROW_IF_NOT_FOUND) {
                    const r = Le(e);
                    try {
                        if (8 & t.flags) return t.token;
                        if (2 & t.flags && (n = null), 1 & t.flags) return e._parent.get(t.token, n);
                        const o = t.tokenKey;
                        switch (o) {
                            case kr:
                            case Rr:
                            case Ir:
                                return e
                        }
                        const l = e._def.providersByKey[o];
                        let a;
                        if (l) {
                            let t = e._providers[l.index];
                            return void 0 === t && (t = e._providers[l.index] = Pr(e, l)), t === Tr ? void 0 : t
                        }
                        if ((a = fe(t.token)) && (s = e, null != (i = a).providedIn && (function(e, t) {
                                return e._def.modules.indexOf(t) > -1
                            }(s, i.providedIn) || "root" === i.providedIn && s._def.isRoot))) {
                            const n = e._providers.length;
                            return e._def.providers[n] = e._def.providersByKey[t.tokenKey] = {
                                flags: 5120,
                                value: a.factory,
                                deps: [],
                                index: n,
                                token: t.token
                            }, e._providers[n] = Tr, e._providers[n] = Pr(e, e._def.providersByKey[t.tokenKey])
                        }
                        return 4 & t.flags ? n : e._parent.get(t.token, n)
                    } finally {
                        Le(r)
                    }
                    var s, i
                }

                function Pr(e, t) {
                    let n;
                    switch (201347067 & t.flags) {
                        case 512:
                            n = function(e, t, n) {
                                const r = n.length;
                                switch (r) {
                                    case 0:
                                        return new t;
                                    case 1:
                                        return new t(Nr(e, n[0]));
                                    case 2:
                                        return new t(Nr(e, n[0]), Nr(e, n[1]));
                                    case 3:
                                        return new t(Nr(e, n[0]), Nr(e, n[1]), Nr(e, n[2]));
                                    default:
                                        const s = new Array(r);
                                        for (let t = 0; t < r; t++) s[t] = Nr(e, n[t]);
                                        return new t(...s)
                                }
                            }(e, t.value, t.deps);
                            break;
                        case 1024:
                            n = function(e, t, n) {
                                const r = n.length;
                                switch (r) {
                                    case 0:
                                        return t();
                                    case 1:
                                        return t(Nr(e, n[0]));
                                    case 2:
                                        return t(Nr(e, n[0]), Nr(e, n[1]));
                                    case 3:
                                        return t(Nr(e, n[0]), Nr(e, n[1]), Nr(e, n[2]));
                                    default:
                                        const s = Array(r);
                                        for (let t = 0; t < r; t++) s[t] = Nr(e, n[t]);
                                        return t(...s)
                                }
                            }(e, t.value, t.deps);
                            break;
                        case 2048:
                            n = Nr(e, t.deps[0]);
                            break;
                        case 256:
                            n = t.value
                    }
                    return n === Tr || null === n || "object" != typeof n || 131072 & t.flags || "function" != typeof n.ngOnDestroy || (t.flags |= 131072), void 0 === n ? Tr : n
                }

                function Or(e, t) {
                    const n = e.viewContainer._embeddedViews;
                    if ((null == t || t >= n.length) && (t = n.length - 1), t < 0) return null;
                    const r = n[t];
                    return r.viewContainerParent = null, Be(n, t), Gn.dirtyParentQueries(r), Mr(r), r
                }

                function Dr(e, t, n) {
                    const r = t ? cr(t, t.def.lastRenderRootNode) : e.renderElement,
                        s = n.renderer.parentNode(r),
                        i = n.renderer.nextSibling(r);
                    yr(n, 2, s, i, void 0)
                }

                function Mr(e) {
                    yr(e, 3, null, null, void 0)
                }
                const Lr = new Object;

                function Ur(e, t, n, r, s, i) {
                    return new jr(e, t, n, r, s, i)
                }
                class jr extends tn {
                    constructor(e, t, n, r, s, i) {
                        super(), this.selector = e, this.componentType = t, this._inputs = r, this._outputs = s, this.ngContentSelectors = i, this.viewDefFactory = n
                    }
                    get inputs() {
                        const e = [],
                            t = this._inputs;
                        for (let n in t) e.push({
                            propName: n,
                            templateName: t[n]
                        });
                        return e
                    }
                    get outputs() {
                        const e = [];
                        for (let t in this._outputs) e.push({
                            propName: t,
                            templateName: this._outputs[t]
                        });
                        return e
                    }
                    create(e, t, n, r) {
                        if (!r) throw new Error("ngModule should be provided");
                        const s = vr(this.viewDefFactory),
                            i = s.nodes[0].element.componentProvider.nodeIndex,
                            o = Gn.createRootView(e, t || [], n, s, r, Lr),
                            l = qn(o, i).instance;
                        return n && o.renderer.setAttribute(Bn(o, 0).renderElement, "ng-version", yn.full), new Vr(o, new $r(o), l)
                    }
                }
                class Vr extends en {
                    constructor(e, t, n) {
                        super(), this._view = e, this._viewRef = t, this._component = n, this._elDef = this._view.def.nodes[0], this.hostView = t, this.changeDetectorRef = t, this.instance = n
                    }
                    get location() {
                        return new cn(Bn(this._view, this._elDef.nodeIndex).renderElement)
                    }
                    get injector() {
                        return new Wr(this._view, this._elDef)
                    }
                    get componentType() {
                        return this._component.constructor
                    }
                    destroy() {
                        this._viewRef.destroy()
                    }
                    onDestroy(e) {
                        this._viewRef.onDestroy(e)
                    }
                }

                function Hr(e, t, n) {
                    return new Fr(e, t, n)
                }
                class Fr {
                    constructor(e, t, n) {
                        this._view = e, this._elDef = t, this._data = n, this._embeddedViews = []
                    }
                    get element() {
                        return new cn(this._data.renderElement)
                    }
                    get injector() {
                        return new Wr(this._view, this._elDef)
                    }
                    get parentInjector() {
                        let e = this._view,
                            t = this._elDef.parent;
                        for (; !t && e;) t = ur(e), e = e.parent;
                        return e ? new Wr(e, t) : new Wr(this._view, null)
                    }
                    clear() {
                        for (let e = this._embeddedViews.length - 1; e >= 0; e--) {
                            const t = Or(this._data, e);
                            Gn.destroyView(t)
                        }
                    }
                    get(e) {
                        const t = this._embeddedViews[e];
                        if (t) {
                            const e = new $r(t);
                            return e.attachToViewContainerRef(this), e
                        }
                        return null
                    }
                    get length() {
                        return this._embeddedViews.length
                    }
                    createEmbeddedView(e, t, n) {
                        const r = e.createEmbeddedView(t || {});
                        return this.insert(r, n), r
                    }
                    createComponent(e, t, n, r, s) {
                        const i = n || this.parentInjector;
                        s || e instanceof an || (s = i.get(Fe));
                        const o = e.create(i, r, void 0, s);
                        return this.insert(o.hostView, t), o
                    }
                    insert(e, t) {
                        if (e.destroyed) throw new Error("Cannot insert a destroyed View in a ViewContainer!");
                        const n = e;
                        return function(e, t, n, r) {
                            let s = t.viewContainer._embeddedViews;
                            null == n && (n = s.length), r.viewContainerParent = e, $e(s, n, r),
                                function(e, t) {
                                    const n = ar(t);
                                    if (!n || n === e || 16 & t.state) return;
                                    t.state |= 16;
                                    let r = n.template._projectedViews;
                                    r || (r = n.template._projectedViews = []), r.push(t),
                                        function(e, t) {
                                            if (4 & t.flags) return;
                                            e.nodeFlags |= 4, t.flags |= 4;
                                            let n = t.parent;
                                            for (; n;) n.childFlags |= 4, n = n.parent
                                        }(t.parent.def, t.parentNodeDef)
                                }(t, r), Gn.dirtyParentQueries(r), Dr(t, n > 0 ? s[n - 1] : null, r)
                        }(this._view, this._data, t, n._view), n.attachToViewContainerRef(this), e
                    }
                    move(e, t) {
                        if (e.destroyed) throw new Error("Cannot move a destroyed View in a ViewContainer!");
                        const n = this._embeddedViews.indexOf(e._view);
                        return function(e, t, n) {
                            const r = e.viewContainer._embeddedViews,
                                s = r[t];
                            Be(r, t), null == n && (n = r.length), $e(r, n, s), Gn.dirtyParentQueries(s), Mr(s), Dr(e, n > 0 ? r[n - 1] : null, s)
                        }(this._data, n, t), e
                    }
                    indexOf(e) {
                        return this._embeddedViews.indexOf(e._view)
                    }
                    remove(e) {
                        const t = Or(this._data, e);
                        t && Gn.destroyView(t)
                    }
                    detach(e) {
                        const t = Or(this._data, e);
                        return t ? new $r(t) : null
                    }
                }

                function zr(e) {
                    return new $r(e)
                }
                class $r {
                    constructor(e) {
                        this._view = e, this._viewContainerRef = null, this._appRef = null
                    }
                    get rootNodes() {
                        return function(e) {
                            const t = [];
                            return yr(e, 0, void 0, void 0, t), t
                        }(this._view)
                    }
                    get context() {
                        return this._view.context
                    }
                    get destroyed() {
                        return 0 != (128 & this._view.state)
                    }
                    markForCheck() {
                        ir(this._view)
                    }
                    detach() {
                        this._view.state &= -5
                    }
                    detectChanges() {
                        const e = this._view.root.rendererFactory;
                        e.begin && e.begin();
                        try {
                            Gn.checkAndUpdateView(this._view)
                        } finally {
                            e.end && e.end()
                        }
                    }
                    checkNoChanges() {
                        Gn.checkNoChangesView(this._view)
                    }
                    reattach() {
                        this._view.state |= 4
                    }
                    onDestroy(e) {
                        this._view.disposables || (this._view.disposables = []), this._view.disposables.push(e)
                    }
                    destroy() {
                        this._appRef ? this._appRef.detachView(this) : this._viewContainerRef && this._viewContainerRef.detach(this._viewContainerRef.indexOf(this)), Gn.destroyView(this._view)
                    }
                    detachFromAppRef() {
                        this._appRef = null, Mr(this._view), Gn.dirtyParentQueries(this._view)
                    }
                    attachToAppRef(e) {
                        if (this._viewContainerRef) throw new Error("This view is already attached to a ViewContainer!");
                        this._appRef = e
                    }
                    attachToViewContainerRef(e) {
                        if (this._appRef) throw new Error("This view is already attached directly to the ApplicationRef!");
                        this._viewContainerRef = e
                    }
                }

                function Br(e, t) {
                    return new qr(e, t)
                }
                class qr extends Dn {
                    constructor(e, t) {
                        super(), this._parentView = e, this._def = t
                    }
                    createEmbeddedView(e) {
                        return new $r(Gn.createEmbeddedView(this._parentView, this._def, this._def.element.template, e))
                    }
                    get elementRef() {
                        return new cn(Bn(this._parentView, this._def.nodeIndex).renderElement)
                    }
                }

                function Zr(e, t) {
                    return new Wr(e, t)
                }
                class Wr {
                    constructor(e, t) {
                        this.view = e, this.elDef = t
                    }
                    get(e, t = Dt.THROW_IF_NOT_FOUND) {
                        return Gn.resolveDep(this.view, this.elDef, !!this.elDef && 0 != (33554432 & this.elDef.flags), {
                            flags: 0,
                            token: e,
                            tokenKey: Jn(e)
                        }, t)
                    }
                }

                function Gr(e, t) {
                    const n = e.def.nodes[t];
                    if (1 & n.flags) {
                        const t = Bn(e, n.nodeIndex);
                        return n.element.template ? t.template : t.renderElement
                    }
                    if (2 & n.flags) return $n(e, n.nodeIndex).renderText;
                    if (20240 & n.flags) return qn(e, n.nodeIndex).instance;
                    throw new Error(`Illegal state: read nodeValue for node index ${t}`)
                }

                function Qr(e) {
                    return new Kr(e.renderer)
                }
                class Kr {
                    constructor(e) {
                        this.delegate = e
                    }
                    selectRootElement(e) {
                        return this.delegate.selectRootElement(e)
                    }
                    createElement(e, t) {
                        const [n, r] = Sr(t), s = this.delegate.createElement(r, n);
                        return e && this.delegate.appendChild(e, s), s
                    }
                    createViewRoot(e) {
                        return e
                    }
                    createTemplateAnchor(e) {
                        const t = this.delegate.createComment("");
                        return e && this.delegate.appendChild(e, t), t
                    }
                    createText(e, t) {
                        const n = this.delegate.createText(t);
                        return e && this.delegate.appendChild(e, n), n
                    }
                    projectNodes(e, t) {
                        for (let n = 0; n < t.length; n++) this.delegate.appendChild(e, t[n])
                    }
                    attachViewAfter(e, t) {
                        const n = this.delegate.parentNode(e),
                            r = this.delegate.nextSibling(e);
                        for (let s = 0; s < t.length; s++) this.delegate.insertBefore(n, t[s], r)
                    }
                    detachView(e) {
                        for (let t = 0; t < e.length; t++) {
                            const n = e[t],
                                r = this.delegate.parentNode(n);
                            this.delegate.removeChild(r, n)
                        }
                    }
                    destroyView(e, t) {
                        for (let n = 0; n < t.length; n++) this.delegate.destroyNode(t[n])
                    }
                    listen(e, t, n) {
                        return this.delegate.listen(e, t, n)
                    }
                    listenGlobal(e, t, n) {
                        return this.delegate.listen(e, t, n)
                    }
                    setElementProperty(e, t, n) {
                        this.delegate.setProperty(e, t, n)
                    }
                    setElementAttribute(e, t, n) {
                        const [r, s] = Sr(t);
                        null != n ? this.delegate.setAttribute(e, s, n, r) : this.delegate.removeAttribute(e, s, r)
                    }
                    setBindingDebugInfo(e, t, n) {}
                    setElementClass(e, t, n) {
                        n ? this.delegate.addClass(e, t) : this.delegate.removeClass(e, t)
                    }
                    setElementStyle(e, t, n) {
                        null != n ? this.delegate.setStyle(e, t, n) : this.delegate.removeStyle(e, t)
                    }
                    invokeElementMethod(e, t, n) {
                        e[t].apply(e, n)
                    }
                    setText(e, t) {
                        this.delegate.setValue(e, t)
                    }
                    animate() {
                        throw new Error("Renderer.animate is no longer supported!")
                    }
                }

                function Jr(e, t, n, r) {
                    return new Yr(e, t, n, r)
                }
                class Yr {
                    constructor(e, t, n, r) {
                        this._moduleType = e, this._parent = t, this._bootstrapComponents = n, this._def = r, this._destroyListeners = [], this._destroyed = !1, this.injector = this,
                            function(e) {
                                const t = e._def,
                                    n = e._providers = new Array(t.providers.length);
                                for (let r = 0; r < t.providers.length; r++) {
                                    const s = t.providers[r];
                                    4096 & s.flags || void 0 === n[r] && (n[r] = Pr(e, s))
                                }
                            }(this)
                    }
                    get(e, t = Dt.THROW_IF_NOT_FOUND, n = he.Default) {
                        let r = 0;
                        return n & he.SkipSelf ? r |= 1 : n & he.Self && (r |= 4), Nr(this, {
                            token: e,
                            tokenKey: Jn(e),
                            flags: r
                        }, t)
                    }
                    get instance() {
                        return this.get(this._moduleType)
                    }
                    get componentFactoryResolver() {
                        return this.get(on)
                    }
                    destroy() {
                        if (this._destroyed) throw new Error(`The ng module ${me(this.instance.constructor)} has already been destroyed.`);
                        this._destroyed = !0,
                            function(e, t) {
                                const n = e._def,
                                    r = new Set;
                                for (let s = 0; s < n.providers.length; s++)
                                    if (131072 & n.providers[s].flags) {
                                        const t = e._providers[s];
                                        if (t && t !== Tr) {
                                            const e = t.ngOnDestroy;
                                            "function" != typeof e || r.has(t) || (e.apply(t), r.add(t))
                                        }
                                    }
                            }(this), this._destroyListeners.forEach(e => e())
                    }
                    onDestroy(e) {
                        this._destroyListeners.push(e)
                    }
                }
                const Xr = Jn(dn),
                    es = Jn(gn),
                    ts = Jn(cn),
                    ns = Jn(Ln),
                    rs = Jn(Dn),
                    ss = Jn(At),
                    is = Jn(Dt),
                    os = Jn(Te);

                function ls(e, t, n, r, s, i, o, l) {
                    const a = [];
                    if (o)
                        for (let c in o) {
                            const [e, t] = o[c];
                            a[e] = {
                                flags: 8,
                                name: c,
                                nonMinifiedName: t,
                                ns: null,
                                securityContext: null,
                                suffix: null
                            }
                        }
                    const u = [];
                    if (l)
                        for (let c in l) u.push({
                            type: 1,
                            propName: c,
                            target: null,
                            eventName: l[c]
                        });
                    return function(e, t, n, r, s, i, o, l, a) {
                        const {
                            matchedQueries: u,
                            references: c,
                            matchedQueryIds: h
                        } = pr(n);
                        a || (a = []), l || (l = []), i = we(i);
                        const d = fr(o, me(s));
                        return {
                            nodeIndex: -1,
                            parent: null,
                            renderParent: null,
                            bindingIndex: -1,
                            outputIndex: -1,
                            checkIndex: e,
                            flags: t,
                            childFlags: 0,
                            directChildFlags: 0,
                            childMatchedQueries: 0,
                            matchedQueries: u,
                            matchedQueryIds: h,
                            references: c,
                            ngContentIndex: -1,
                            childCount: r,
                            bindings: l,
                            bindingFlags: Er(l),
                            outputs: a,
                            element: null,
                            provider: {
                                token: s,
                                value: i,
                                deps: d
                            },
                            text: null,
                            query: null,
                            ngContent: null
                        }
                    }(e, t |= 16384, n, r, s, s, i, a, u)
                }

                function as(e, t) {
                    return ds(e, t)
                }

                function us(e, t) {
                    let n = e;
                    for (; n.parent && !hr(n);) n = n.parent;
                    return ps(n.parent, ur(n), !0, t.provider.value, t.provider.deps)
                }

                function cs(e, t) {
                    const n = ps(e, t.parent, (32768 & t.flags) > 0, t.provider.value, t.provider.deps);
                    if (t.outputs.length)
                        for (let r = 0; r < t.outputs.length; r++) {
                            const s = t.outputs[r],
                                i = n[s.propName];
                            if (!Yt(i)) throw new Error(`@Output ${s.propName} not initialized in '${n.constructor.name}'.`); {
                                const n = i.subscribe(hs(e, t.parent.nodeIndex, s.eventName));
                                e.disposables[t.outputIndex + r] = n.unsubscribe.bind(n)
                            }
                        }
                    return n
                }

                function hs(e, t, n) {
                    return r => lr(e, t, n, r)
                }

                function ds(e, t) {
                    const n = (8192 & t.flags) > 0,
                        r = t.provider;
                    switch (201347067 & t.flags) {
                        case 512:
                            return ps(e, t.parent, n, r.value, r.deps);
                        case 1024:
                            return function(e, t, n, r, s) {
                                const i = s.length;
                                switch (i) {
                                    case 0:
                                        return r();
                                    case 1:
                                        return r(gs(e, t, n, s[0]));
                                    case 2:
                                        return r(gs(e, t, n, s[0]), gs(e, t, n, s[1]));
                                    case 3:
                                        return r(gs(e, t, n, s[0]), gs(e, t, n, s[1]), gs(e, t, n, s[2]));
                                    default:
                                        const o = Array(i);
                                        for (let r = 0; r < i; r++) o[r] = gs(e, t, n, s[r]);
                                        return r(...o)
                                }
                            }(e, t.parent, n, r.value, r.deps);
                        case 2048:
                            return gs(e, t.parent, n, r.deps[0]);
                        case 256:
                            return r.value
                    }
                }

                function ps(e, t, n, r, s) {
                    const i = s.length;
                    switch (i) {
                        case 0:
                            return new r;
                        case 1:
                            return new r(gs(e, t, n, s[0]));
                        case 2:
                            return new r(gs(e, t, n, s[0]), gs(e, t, n, s[1]));
                        case 3:
                            return new r(gs(e, t, n, s[0]), gs(e, t, n, s[1]), gs(e, t, n, s[2]));
                        default:
                            const o = new Array(i);
                            for (let r = 0; r < i; r++) o[r] = gs(e, t, n, s[r]);
                            return new r(...o)
                    }
                }
                const fs = {};

                function gs(e, t, n, r, s = Dt.THROW_IF_NOT_FOUND) {
                    if (8 & r.flags) return r.token;
                    const i = e;
                    2 & r.flags && (s = null);
                    const o = r.tokenKey;
                    o === ss && (n = !(!t || !t.element.componentView)), t && 1 & r.flags && (n = !1, t = t.parent);
                    let l = e;
                    for (; l;) {
                        if (t) switch (o) {
                            case Xr:
                                return Qr(ms(l, t, n));
                            case es:
                                return ms(l, t, n).renderer;
                            case ts:
                                return new cn(Bn(l, t.nodeIndex).renderElement);
                            case ns:
                                return Bn(l, t.nodeIndex).viewContainer;
                            case rs:
                                if (t.element.template) return Bn(l, t.nodeIndex).template;
                                break;
                            case ss:
                                return zr(ms(l, t, n));
                            case is:
                            case os:
                                return Zr(l, t);
                            default:
                                const e = (n ? t.element.allProviders : t.element.publicProviders)[o];
                                if (e) {
                                    let t = qn(l, e.nodeIndex);
                                    return t || (t = {
                                        instance: ds(l, e)
                                    }, l.nodes[e.nodeIndex] = t), t.instance
                                }
                        }
                        n = hr(l), t = ur(l), l = l.parent, 4 & r.flags && (l = null)
                    }
                    const a = i.root.injector.get(r.token, fs);
                    return a !== fs || s === fs ? a : i.root.ngModule.injector.get(r.token, s)
                }

                function ms(e, t, n) {
                    let r;
                    if (n) r = Bn(e, t.nodeIndex).componentView;
                    else
                        for (r = e; r.parent && !hr(r);) r = r.parent;
                    return r
                }

                function vs(e, t, n, r, s, i) {
                    if (32768 & n.flags) {
                        const t = Bn(e, n.parent.nodeIndex).componentView;
                        2 & t.def.flags && (t.state |= 8)
                    }
                    if (t.instance[n.bindings[r].name] = s, 524288 & n.flags) {
                        i = i || {};
                        const t = Gt.unwrap(e.oldValues[n.bindingIndex + r]);
                        i[n.bindings[r].nonMinifiedName] = new Xt(t, s, 0 != (2 & e.state))
                    }
                    return e.oldValues[n.bindingIndex + r] = s, i
                }

                function ys(e, t) {
                    if (!(e.def.nodeFlags & t)) return;
                    const n = e.def.nodes;
                    let r = 0;
                    for (let s = 0; s < n.length; s++) {
                        const i = n[s];
                        let o = i.parent;
                        for (!o && i.flags & t && bs(e, s, i.flags & t, r++), 0 == (i.childFlags & t) && (s += i.childCount); o && 1 & o.flags && s === o.nodeIndex + o.childCount;) o.directChildFlags & t && (r = ws(e, o, t, r)), o = o.parent
                    }
                }

                function ws(e, t, n, r) {
                    for (let s = t.nodeIndex + 1; s <= t.nodeIndex + t.childCount; s++) {
                        const t = e.def.nodes[s];
                        t.flags & n && bs(e, s, t.flags & n, r++), s += t.childCount
                    }
                    return r
                }

                function bs(e, t, n, r) {
                    const s = qn(e, t);
                    if (!s) return;
                    const i = s.instance;
                    i && (Gn.setCurrentNode(e, t), 1048576 & n && zn(e, 512, r) && i.ngAfterContentInit(), 2097152 & n && i.ngAfterContentChecked(), 4194304 & n && zn(e, 768, r) && i.ngAfterViewInit(), 8388608 & n && i.ngAfterViewChecked(), 131072 & n && i.ngOnDestroy())
                }
                const _s = new Ee("SCHEDULER_TOKEN", {
                        providedIn: "root",
                        factory: () => Ze
                    }),
                    Cs = {},
                    xs = function() {
                        var e = {
                            LocaleId: 0,
                            DayPeriodsFormat: 1,
                            DayPeriodsStandalone: 2,
                            DaysFormat: 3,
                            DaysStandalone: 4,
                            MonthsFormat: 5,
                            MonthsStandalone: 6,
                            Eras: 7,
                            FirstDayOfWeek: 8,
                            WeekendRange: 9,
                            DateFormat: 10,
                            TimeFormat: 11,
                            DateTimeFormat: 12,
                            NumberSymbols: 13,
                            NumberFormats: 14,
                            CurrencySymbol: 15,
                            CurrencyName: 16,
                            Currencies: 17,
                            PluralCase: 18,
                            ExtraData: 19
                        };
                        return e[e.LocaleId] = "LocaleId", e[e.DayPeriodsFormat] = "DayPeriodsFormat", e[e.DayPeriodsStandalone] = "DayPeriodsStandalone", e[e.DaysFormat] = "DaysFormat", e[e.DaysStandalone] = "DaysStandalone", e[e.MonthsFormat] = "MonthsFormat", e[e.MonthsStandalone] = "MonthsStandalone", e[e.Eras] = "Eras", e[e.FirstDayOfWeek] = "FirstDayOfWeek", e[e.WeekendRange] = "WeekendRange", e[e.DateFormat] = "DateFormat", e[e.TimeFormat] = "TimeFormat", e[e.DateTimeFormat] = "DateTimeFormat", e[e.NumberSymbols] = "NumberSymbols", e[e.NumberFormats] = "NumberFormats", e[e.CurrencySymbol] = "CurrencySymbol", e[e.CurrencyName] = "CurrencyName", e[e.Currencies] = "Currencies", e[e.PluralCase] = "PluralCase", e[e.ExtraData] = "ExtraData", e
                    }(),
                    Ss = void 0;
                var Es = ["en", [
                        ["a", "p"],
                        ["AM", "PM"], Ss
                    ],
                    [
                        ["AM", "PM"], Ss, Ss
                    ],
                    [
                        ["S", "M", "T", "W", "T", "F", "S"],
                        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                        ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
                    ], Ss, [
                        ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
                        ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                    ], Ss, [
                        ["B", "A"],
                        ["BC", "AD"],
                        ["Before Christ", "Anno Domini"]
                    ], 0, [6, 0],
                    ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
                    ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
                    ["{1}, {0}", Ss, "{1} 'at' {0}", Ss],
                    [".", ",", ";", "%", "+", "-", "E", "\xd7", "\u2030", "\u221e", "NaN", ":"],
                    ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"], "$", "US Dollar", {},
                    function(e) {
                        let t = Math.floor(Math.abs(e)),
                            n = e.toString().replace(/^[^.]*\.?/, "").length;
                        return 1 === t && 0 === n ? 1 : 5
                    }
                ];
                const Ts = "en-US";
                let ks = Ts;

                function Rs(e) {
                    var t;
                    t = "Expected localeId to be defined", null == e && function(e) {
                        throw new Error(`ASSERTION ERROR: ${e}`)
                    }(t), "string" == typeof e && (ks = e.toLowerCase().replace(/_/g, "-"))
                }
                class Is extends k {
                    constructor(e = !1) {
                        super(), this.__isAsync = e
                    }
                    emit(e) {
                        super.next(e)
                    }
                    subscribe(e, t, n) {
                        let r, s = e => null,
                            i = () => null;
                        e && "object" == typeof e ? (r = this.__isAsync ? t => {
                            setTimeout(() => e.next(t))
                        } : t => {
                            e.next(t)
                        }, e.error && (s = this.__isAsync ? t => {
                            setTimeout(() => e.error(t))
                        } : t => {
                            e.error(t)
                        }), e.complete && (i = this.__isAsync ? () => {
                            setTimeout(() => e.complete())
                        } : () => {
                            e.complete()
                        })) : (r = this.__isAsync ? t => {
                            setTimeout(() => e(t))
                        } : t => {
                            e(t)
                        }, t && (s = this.__isAsync ? e => {
                            setTimeout(() => t(e))
                        } : e => {
                            t(e)
                        }), n && (i = this.__isAsync ? () => {
                            setTimeout(() => n())
                        } : () => {
                            n()
                        }));
                        const o = super.subscribe(r, s, i);
                        return e instanceof d && e.add(o), o
                    }
                }

                function As() {
                    return this._results[qt()]()
                }
                class Ns {
                    constructor() {
                        this.dirty = !0, this._results = [], this.changes = new Is, this.length = 0;
                        const e = qt(),
                            t = Ns.prototype;
                        t[e] || (t[e] = As)
                    }
                    map(e) {
                        return this._results.map(e)
                    }
                    filter(e) {
                        return this._results.filter(e)
                    }
                    find(e) {
                        return this._results.find(e)
                    }
                    reduce(e, t) {
                        return this._results.reduce(e, t)
                    }
                    forEach(e) {
                        this._results.forEach(e)
                    }
                    some(e) {
                        return this._results.some(e)
                    }
                    toArray() {
                        return this._results.slice()
                    }
                    toString() {
                        return this._results.toString()
                    }
                    reset(e) {
                        this._results = function e(t, n) {
                            void 0 === n && (n = t);
                            for (let r = 0; r < t.length; r++) {
                                let s = t[r];
                                Array.isArray(s) ? (n === t && (n = t.slice(0, r)), e(s, n)) : n !== t && n.push(s)
                            }
                            return n
                        }(e), this.dirty = !1, this.length = this._results.length, this.last = this._results[this.length - 1], this.first = this._results[0]
                    }
                    notifyOnChanges() {
                        this.changes.emit(this)
                    }
                    setDirty() {
                        this.dirty = !0
                    }
                    destroy() {
                        this.changes.complete(), this.changes.unsubscribe()
                    }
                }
                const Ps = new Ee("Application Initializer");
                class Os {
                    constructor(e) {
                        this.appInits = e, this.initialized = !1, this.done = !1, this.donePromise = new Promise((e, t) => {
                            this.resolve = e, this.reject = t
                        })
                    }
                    runInitializers() {
                        if (this.initialized) return;
                        const e = [],
                            t = () => {
                                this.done = !0, this.resolve()
                            };
                        if (this.appInits)
                            for (let n = 0; n < this.appInits.length; n++) {
                                const t = this.appInits[n]();
                                Jt(t) && e.push(t)
                            }
                        Promise.all(e).then(() => {
                            t()
                        }).catch(e => {
                            this.reject(e)
                        }), 0 === e.length && t(), this.initialized = !0
                    }
                }
                const Ds = new Ee("AppId");

                function Ms() {
                    return `${Ls()}${Ls()}${Ls()}`
                }

                function Ls() {
                    return String.fromCharCode(97 + Math.floor(25 * Math.random()))
                }
                const Us = new Ee("Platform Initializer"),
                    js = new Ee("Platform ID"),
                    Vs = new Ee("appBootstrapListener");
                class Hs {
                    log(e) {
                        console.log(e)
                    }
                    warn(e) {
                        console.warn(e)
                    }
                }
                const Fs = new Ee("LocaleId"),
                    zs = !1;

                function $s() {
                    throw new Error("Runtime compiler is not loaded")
                }
                const Bs = $s,
                    qs = $s,
                    Zs = $s,
                    Ws = $s;
                class Gs {
                    constructor() {
                        this.compileModuleSync = Bs, this.compileModuleAsync = qs, this.compileModuleAndAllComponentsSync = Zs, this.compileModuleAndAllComponentsAsync = Ws
                    }
                    clearCache() {}
                    clearCacheFor(e) {}
                    getModuleId(e) {}
                }
                class Qs {}
                let Ks, Js;

                function Ys() {
                    const e = Se.wtf;
                    return !(!e || !(Ks = e.trace) || (Js = Ks.events, 0))
                }
                const Xs = Ys();

                function ei(e, t) {
                    return null
                }
                const ti = Xs ? function(e, t = null) {
                        return Js.createScope(e, t)
                    } : (e, t) => ei,
                    ni = Xs ? function(e, t) {
                        return Ks.leaveScope(e, t), t
                    } : (e, t) => t,
                    ri = (() => Promise.resolve(0))();

                function si(e) {
                    "undefined" == typeof Zone ? ri.then(() => {
                        e && e.apply(null, null)
                    }) : Zone.current.scheduleMicroTask("scheduleMicrotask", e)
                }
                class ii {
                    constructor({
                        enableLongStackTrace: e = !1
                    }) {
                        if (this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new Is(!1), this.onMicrotaskEmpty = new Is(!1), this.onStable = new Is(!1), this.onError = new Is(!1), "undefined" == typeof Zone) throw new Error("In this configuration Angular requires Zone.js");
                        var t;
                        Zone.assertZonePatched(), this._nesting = 0, this._outer = this._inner = Zone.current, Zone.wtfZoneSpec && (this._inner = this._inner.fork(Zone.wtfZoneSpec)), Zone.TaskTrackingZoneSpec && (this._inner = this._inner.fork(new Zone.TaskTrackingZoneSpec)), e && Zone.longStackTraceZoneSpec && (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)), (t = this)._inner = t._inner.fork({
                            name: "angular",
                            properties: {
                                isAngularZone: !0
                            },
                            onInvokeTask: (e, n, r, s, i, o) => {
                                try {
                                    return ui(t), e.invokeTask(r, s, i, o)
                                } finally {
                                    ci(t)
                                }
                            },
                            onInvoke: (e, n, r, s, i, o, l) => {
                                try {
                                    return ui(t), e.invoke(r, s, i, o, l)
                                } finally {
                                    ci(t)
                                }
                            },
                            onHasTask: (e, n, r, s) => {
                                e.hasTask(r, s), n === r && ("microTask" == s.change ? (t.hasPendingMicrotasks = s.microTask, ai(t)) : "macroTask" == s.change && (t.hasPendingMacrotasks = s.macroTask))
                            },
                            onHandleError: (e, n, r, s) => (e.handleError(r, s), t.runOutsideAngular(() => t.onError.emit(s)), !1)
                        })
                    }
                    static isInAngularZone() {
                        return !0 === Zone.current.get("isAngularZone")
                    }
                    static assertInAngularZone() {
                        if (!ii.isInAngularZone()) throw new Error("Expected to be in Angular Zone, but it is not!")
                    }
                    static assertNotInAngularZone() {
                        if (ii.isInAngularZone()) throw new Error("Expected to not be in Angular Zone, but it is!")
                    }
                    run(e, t, n) {
                        return this._inner.run(e, t, n)
                    }
                    runTask(e, t, n, r) {
                        const s = this._inner,
                            i = s.scheduleEventTask("NgZoneEvent: " + r, e, li, oi, oi);
                        try {
                            return s.runTask(i, t, n)
                        } finally {
                            s.cancelTask(i)
                        }
                    }
                    runGuarded(e, t, n) {
                        return this._inner.runGuarded(e, t, n)
                    }
                    runOutsideAngular(e) {
                        return this._outer.run(e)
                    }
                }

                function oi() {}
                const li = {};

                function ai(e) {
                    if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable) try {
                        e._nesting++, e.onMicrotaskEmpty.emit(null)
                    } finally {
                        if (e._nesting--, !e.hasPendingMicrotasks) try {
                            e.runOutsideAngular(() => e.onStable.emit(null))
                        } finally {
                            e.isStable = !0
                        }
                    }
                }

                function ui(e) {
                    e._nesting++, e.isStable && (e.isStable = !1, e.onUnstable.emit(null))
                }

                function ci(e) {
                    e._nesting--, ai(e)
                }
                class hi {
                    constructor() {
                        this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new Is, this.onMicrotaskEmpty = new Is, this.onStable = new Is, this.onError = new Is
                    }
                    run(e) {
                        return e()
                    }
                    runGuarded(e) {
                        return e()
                    }
                    runOutsideAngular(e) {
                        return e()
                    }
                    runTask(e) {
                        return e()
                    }
                }
                class di {
                    constructor(e) {
                        this._ngZone = e, this._pendingCount = 0, this._isZoneStable = !0, this._didWork = !1, this._callbacks = [], this.taskTrackingZone = null, this._watchAngularEvents(), e.run(() => {
                            this.taskTrackingZone = "undefined" == typeof Zone ? null : Zone.current.get("TaskTrackingZone")
                        })
                    }
                    _watchAngularEvents() {
                        this._ngZone.onUnstable.subscribe({
                            next: () => {
                                this._didWork = !0, this._isZoneStable = !1
                            }
                        }), this._ngZone.runOutsideAngular(() => {
                            this._ngZone.onStable.subscribe({
                                next: () => {
                                    ii.assertNotInAngularZone(), si(() => {
                                        this._isZoneStable = !0, this._runCallbacksIfReady()
                                    })
                                }
                            })
                        })
                    }
                    increasePendingRequestCount() {
                        return this._pendingCount += 1, this._didWork = !0, this._pendingCount
                    }
                    decreasePendingRequestCount() {
                        if (this._pendingCount -= 1, this._pendingCount < 0) throw new Error("pending async requests below zero");
                        return this._runCallbacksIfReady(), this._pendingCount
                    }
                    isStable() {
                        return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
                    }
                    _runCallbacksIfReady() {
                        if (this.isStable()) si(() => {
                            for (; 0 !== this._callbacks.length;) {
                                let e = this._callbacks.pop();
                                clearTimeout(e.timeoutId), e.doneCb(this._didWork)
                            }
                            this._didWork = !1
                        });
                        else {
                            let e = this.getPendingTasks();
                            this._callbacks = this._callbacks.filter(t => !t.updateCb || !t.updateCb(e) || (clearTimeout(t.timeoutId), !1)), this._didWork = !0
                        }
                    }
                    getPendingTasks() {
                        return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(e => ({
                            source: e.source,
                            creationLocation: e.creationLocation,
                            data: e.data
                        })) : []
                    }
                    addCallback(e, t, n) {
                        let r = -1;
                        t && t > 0 && (r = setTimeout(() => {
                            this._callbacks = this._callbacks.filter(e => e.timeoutId !== r), e(this._didWork, this.getPendingTasks())
                        }, t)), this._callbacks.push({
                            doneCb: e,
                            timeoutId: r,
                            updateCb: n
                        })
                    }
                    whenStable(e, t, n) {
                        if (n && !this.taskTrackingZone) throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?');
                        this.addCallback(e, t, n), this._runCallbacksIfReady()
                    }
                    getPendingRequestCount() {
                        return this._pendingCount
                    }
                    findProviders(e, t, n) {
                        return []
                    }
                }
                class pi {
                    constructor() {
                        this._applications = new Map, mi.addToWindow(this)
                    }
                    registerApplication(e, t) {
                        this._applications.set(e, t)
                    }
                    unregisterApplication(e) {
                        this._applications.delete(e)
                    }
                    unregisterAllApplications() {
                        this._applications.clear()
                    }
                    getTestability(e) {
                        return this._applications.get(e) || null
                    }
                    getAllTestabilities() {
                        return Array.from(this._applications.values())
                    }
                    getAllRootElements() {
                        return Array.from(this._applications.keys())
                    }
                    findTestabilityInTree(e, t = !0) {
                        return mi.findTestabilityInTree(this, e, t)
                    }
                }
                class fi {
                    addToWindow(e) {}
                    findTestabilityInTree(e, t, n) {
                        return null
                    }
                }
                let gi, mi = new fi,
                    vi = function(e, t, n) {
                        return e.get(Qs).createCompiler([t]).compileModuleAsync(n)
                    },
                    yi = function(e) {
                        return e instanceof an
                    };
                const wi = new Ee("AllowMultipleToken");
                class bi {
                    constructor(e, t) {
                        this.name = e, this.token = t
                    }
                }

                function _i(e, t, n = []) {
                    const r = `Platform: ${t}`,
                        s = new Ee(r);
                    return (t = []) => {
                        let i = Ci();
                        if (!i || i.injector.get(wi, !1))
                            if (e) e(n.concat(t).concat({
                                provide: s,
                                useValue: !0
                            }));
                            else {
                                const e = n.concat(t).concat({
                                    provide: s,
                                    useValue: !0
                                });
                                ! function(e) {
                                    if (gi && !gi.destroyed && !gi.injector.get(wi, !1)) throw new Error("There can be only one platform. Destroy the previous one to create a new one.");
                                    gi = e.get(xi);
                                    const t = e.get(Us, null);
                                    t && t.forEach(e => e())
                                }(Dt.create({
                                    providers: e,
                                    name: r
                                }))
                            } return function(e) {
                            const t = Ci();
                            if (!t) throw new Error("No platform exists!");
                            if (!t.injector.get(e, null)) throw new Error("A platform with a different configuration has been created. Please destroy it first.");
                            return t
                        }(s)
                    }
                }

                function Ci() {
                    return gi && !gi.destroyed ? gi : null
                }
                class xi {
                    constructor(e) {
                        this._injector = e, this._modules = [], this._destroyListeners = [], this._destroyed = !1
                    }
                    bootstrapModuleFactory(e, t) {
                        const n = "noop" === (s = t ? t.ngZone : void 0) ? new hi : ("zone.js" === s ? void 0 : s) || new ii({
                                enableLongStackTrace: nt()
                            }),
                            r = [{
                                provide: ii,
                                useValue: n
                            }];
                        var s;
                        return n.run(() => {
                            const t = Dt.create({
                                    providers: r,
                                    parent: this.injector,
                                    name: e.moduleType.name
                                }),
                                s = e.create(t),
                                i = s.injector.get(Xe, null);
                            if (!i) throw new Error("No ErrorHandler. Is platform module (BrowserModule) included?");
                            return zs && Rs(s.injector.get(Fs, Ts) || Ts), s.onDestroy(() => Ti(this._modules, s)), n.runOutsideAngular(() => n.onError.subscribe({
                                    next: e => {
                                        i.handleError(e)
                                    }
                                })),
                                function(e, t, n) {
                                    try {
                                        const r = n();
                                        return Jt(r) ? r.catch(n => {
                                            throw t.runOutsideAngular(() => e.handleError(n)), n
                                        }) : r
                                    } catch (r) {
                                        throw t.runOutsideAngular(() => e.handleError(r)), r
                                    }
                                }(i, n, () => {
                                    const e = s.injector.get(Os);
                                    return e.runInitializers(), e.donePromise.then(() => (this._moduleDoBootstrap(s), s))
                                })
                        })
                    }
                    bootstrapModule(e, t = []) {
                        const n = Si({}, t);
                        return vi(this.injector, n, e).then(e => this.bootstrapModuleFactory(e, n))
                    }
                    _moduleDoBootstrap(e) {
                        const t = e.injector.get(Ei);
                        if (e._bootstrapComponents.length > 0) e._bootstrapComponents.forEach(e => t.bootstrap(e));
                        else {
                            if (!e.instance.ngDoBootstrap) throw new Error(`The module ${me(e.instance.constructor)} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. ` + "Please define one of these.");
                            e.instance.ngDoBootstrap(t)
                        }
                        this._modules.push(e)
                    }
                    onDestroy(e) {
                        this._destroyListeners.push(e)
                    }
                    get injector() {
                        return this._injector
                    }
                    destroy() {
                        if (this._destroyed) throw new Error("The platform has already been destroyed!");
                        this._modules.slice().forEach(e => e.destroy()), this._destroyListeners.forEach(e => e()), this._destroyed = !0
                    }
                    get destroyed() {
                        return this._destroyed
                    }
                }

                function Si(e, t) {
                    return Array.isArray(t) ? t.reduce(Si, e) : Object.assign({}, e, t)
                }
                let Ei = (() => {
                    class e {
                        constructor(e, t, n, r, s, i) {
                            this._zone = e, this._console = t, this._injector = n, this._exceptionHandler = r, this._componentFactoryResolver = s, this._initStatus = i, this._bootstrapListeners = [], this._views = [], this._runningTick = !1, this._enforceNoNewChanges = !1, this._stable = !0, this.componentTypes = [], this.components = [], this._enforceNoNewChanges = nt(), this._zone.onMicrotaskEmpty.subscribe({
                                next: () => {
                                    this._zone.run(() => {
                                        this.tick()
                                    })
                                }
                            });
                            const o = new _(e => {
                                    this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks, this._zone.runOutsideAngular(() => {
                                        e.next(this._stable), e.complete()
                                    })
                                }),
                                l = new _(e => {
                                    let t;
                                    this._zone.runOutsideAngular(() => {
                                        t = this._zone.onStable.subscribe(() => {
                                            ii.assertNotInAngularZone(), si(() => {
                                                this._stable || this._zone.hasPendingMacrotasks || this._zone.hasPendingMicrotasks || (this._stable = !0, e.next(!0))
                                            })
                                        })
                                    });
                                    const n = this._zone.onUnstable.subscribe(() => {
                                        ii.assertInAngularZone(), this._stable && (this._stable = !1, this._zone.runOutsideAngular(() => {
                                            e.next(!1)
                                        }))
                                    });
                                    return () => {
                                        t.unsubscribe(), n.unsubscribe()
                                    }
                                });
                            this.isStable = function(...e) {
                                let t = Number.POSITIVE_INFINITY,
                                    n = null,
                                    r = e[e.length - 1];
                                return I(r) ? (n = e.pop(), e.length > 1 && "number" == typeof e[e.length - 1] && (t = e.pop())) : "number" == typeof r && (t = e.pop()), null === n && 1 === e.length && e[0] instanceof _ ? e[0] : J(t)(q(e, n))
                            }(o, l.pipe(e => Y()(function(e, t) {
                                return function(t) {
                                    let n;
                                    n = "function" == typeof e ? e : function() {
                                        return e
                                    };
                                    const r = Object.create(t, ne);
                                    return r.source = t, r.subjectFactory = n, r
                                }
                            }(se)(e))))
                        }
                        bootstrap(e, t) {
                            if (!this._initStatus.done) throw new Error("Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.");
                            let n;
                            n = e instanceof tn ? e : this._componentFactoryResolver.resolveComponentFactory(e), this.componentTypes.push(n.componentType);
                            const r = yi(n) ? null : this._injector.get(Fe),
                                s = n.create(Dt.NULL, [], t || n.selector, r);
                            s.onDestroy(() => {
                                this._unloadComponent(s)
                            });
                            const i = s.injector.get(di, null);
                            return i && s.injector.get(pi).registerApplication(s.location.nativeElement, i), this._loadComponent(s), nt() && this._console.log("Angular is running in the development mode. Call enableProdMode() to enable the production mode."), s
                        }
                        tick() {
                            if (this._runningTick) throw new Error("ApplicationRef.tick is called recursively");
                            const t = e._tickScope();
                            try {
                                this._runningTick = !0;
                                for (let e of this._views) e.detectChanges();
                                if (this._enforceNoNewChanges)
                                    for (let e of this._views) e.checkNoChanges()
                            } catch (n) {
                                this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(n))
                            } finally {
                                this._runningTick = !1, ni(t)
                            }
                        }
                        attachView(e) {
                            const t = e;
                            this._views.push(t), t.attachToAppRef(this)
                        }
                        detachView(e) {
                            const t = e;
                            Ti(this._views, t), t.detachFromAppRef()
                        }
                        _loadComponent(e) {
                            this.attachView(e.hostView), this.tick(), this.components.push(e), this._injector.get(Vs, []).concat(this._bootstrapListeners).forEach(t => t(e))
                        }
                        _unloadComponent(e) {
                            this.detachView(e.hostView), Ti(this.components, e)
                        }
                        ngOnDestroy() {
                            this._views.slice().forEach(e => e.destroy())
                        }
                        get viewCount() {
                            return this._views.length
                        }
                    }
                    return e._tickScope = ti("ApplicationRef#tick()"), e
                })();

                function Ti(e, t) {
                    const n = e.indexOf(t);
                    n > -1 && e.splice(n, 1)
                }
                class ki {}
                const Ri = "#",
                    Ii = "NgFactory";
                class Ai {}
                const Ni = {
                    factoryPathPrefix: "",
                    factoryPathSuffix: ".ngfactory"
                };
                class Pi {
                    constructor(e, t) {
                        this._compiler = e, this._config = t || Ni
                    }
                    load(e) {
                        return !zs && this._compiler instanceof Gs ? this.loadFactory(e) : this.loadAndCompile(e)
                    }
                    loadAndCompile(e) {
                        let [t, r] = e.split(Ri);
                        return void 0 === r && (r = "default"), n("zn8P")(t).then(e => e[r]).then(e => Oi(e, t, r)).then(e => this._compiler.compileModuleAsync(e))
                    }
                    loadFactory(e) {
                        let [t, r] = e.split(Ri), s = Ii;
                        return void 0 === r && (r = "default", s = ""), n("zn8P")(this._config.factoryPathPrefix + t + this._config.factoryPathSuffix).then(e => e[r + s]).then(e => Oi(e, t, r))
                    }
                }

                function Oi(e, t, n) {
                    if (!e) throw new Error(`Cannot find '${n}' in '${t}'`);
                    return e
                }
                class Di {
                    constructor(e, t) {
                        this.name = e, this.callback = t
                    }
                }
                class Mi {
                    constructor(e, t, n) {
                        this.listeners = [], this.parent = null, this._debugContext = n, this.nativeNode = e, t && t instanceof Li && t.addChild(this)
                    }
                    get injector() {
                        return this._debugContext.injector
                    }
                    get componentInstance() {
                        return this._debugContext.component
                    }
                    get context() {
                        return this._debugContext.context
                    }
                    get references() {
                        return this._debugContext.references
                    }
                    get providerTokens() {
                        return this._debugContext.providerTokens
                    }
                }
                class Li extends Mi {
                    constructor(e, t, n) {
                        super(e, t, n), this.properties = {}, this.attributes = {}, this.classes = {}, this.styles = {}, this.childNodes = [], this.nativeElement = e
                    }
                    addChild(e) {
                        e && (this.childNodes.push(e), e.parent = this)
                    }
                    removeChild(e) {
                        const t = this.childNodes.indexOf(e); - 1 !== t && (e.parent = null, this.childNodes.splice(t, 1))
                    }
                    insertChildrenAfter(e, t) {
                        const n = this.childNodes.indexOf(e); - 1 !== n && (this.childNodes.splice(n + 1, 0, ...t), t.forEach(t => {
                            t.parent && t.parent.removeChild(t), e.parent = this
                        }))
                    }
                    insertBefore(e, t) {
                        const n = this.childNodes.indexOf(e); - 1 === n ? this.addChild(t) : (t.parent && t.parent.removeChild(t), t.parent = this, this.childNodes.splice(n, 0, t))
                    }
                    query(e) {
                        return this.queryAll(e)[0] || null
                    }
                    queryAll(e) {
                        const t = [];
                        return function e(t, n, r) {
                            t.childNodes.forEach(t => {
                                t instanceof Li && (n(t) && r.push(t), e(t, n, r))
                            })
                        }(this, e, t), t
                    }
                    queryAllNodes(e) {
                        const t = [];
                        return function e(t, n, r) {
                            t instanceof Li && t.childNodes.forEach(t => {
                                n(t) && r.push(t), t instanceof Li && e(t, n, r)
                            })
                        }(this, e, t), t
                    }
                    get children() {
                        return this.childNodes.filter(e => e instanceof Li)
                    }
                    triggerEventHandler(e, t) {
                        this.listeners.forEach(n => {
                            n.name == e && n.callback(t)
                        })
                    }
                }
                const Ui = new Map,
                    ji = function(e) {
                        return Ui.get(e) || null
                    };

                function Vi(e) {
                    Ui.set(e.nativeNode, e)
                }
                const Hi = _i(null, "core", [{
                    provide: js,
                    useValue: "unknown"
                }, {
                    provide: xi,
                    deps: [Dt]
                }, {
                    provide: pi,
                    deps: []
                }, {
                    provide: Hs,
                    deps: []
                }]);

                function Fi() {
                    return Pn
                }

                function zi() {
                    return On
                }

                function $i(e) {
                    return e ? (zs && Rs(e), e) : Ts
                }

                function Bi(e) {
                    let t = [];
                    return e.onStable.subscribe(() => {
                            for (; t.length;) t.pop()()
                        }),
                        function(e) {
                            t.push(e)
                        }
                }
                class qi {
                    constructor(e) {}
                }

                function Zi(e, t, n, r, s, i) {
                    e |= 1;
                    const {
                        matchedQueries: o,
                        references: l,
                        matchedQueryIds: a
                    } = pr(t);
                    return {
                        nodeIndex: -1,
                        parent: null,
                        renderParent: null,
                        bindingIndex: -1,
                        outputIndex: -1,
                        flags: e,
                        checkIndex: -1,
                        childFlags: 0,
                        directChildFlags: 0,
                        childMatchedQueries: 0,
                        matchedQueries: o,
                        matchedQueryIds: a,
                        references: l,
                        ngContentIndex: n,
                        childCount: r,
                        bindings: [],
                        bindingFlags: 0,
                        outputs: [],
                        element: {
                            ns: null,
                            name: null,
                            attrs: null,
                            template: i ? vr(i) : null,
                            componentProvider: null,
                            componentView: null,
                            componentRendererType: null,
                            publicProviders: null,
                            allProviders: null,
                            handleEvent: s || Qn
                        },
                        provider: null,
                        text: null,
                        query: null,
                        ngContent: null
                    }
                }

                function Wi(e, t, n, r, s, i, o = [], l, a, u, c, h) {
                    u || (u = Qn);
                    const {
                        matchedQueries: d,
                        references: p,
                        matchedQueryIds: f
                    } = pr(n);
                    let g = null,
                        m = null;
                    i && ([g, m] = Sr(i)), l = l || [];
                    const v = new Array(l.length);
                    for (let b = 0; b < l.length; b++) {
                        const [e, t, n] = l[b], [r, s] = Sr(t);
                        let i = void 0,
                            o = void 0;
                        switch (15 & e) {
                            case 4:
                                o = n;
                                break;
                            case 1:
                            case 8:
                                i = n
                        }
                        v[b] = {
                            flags: e,
                            ns: r,
                            name: s,
                            nonMinifiedName: s,
                            securityContext: i,
                            suffix: o
                        }
                    }
                    a = a || [];
                    const y = new Array(a.length);
                    for (let b = 0; b < a.length; b++) {
                        const [e, t] = a[b];
                        y[b] = {
                            type: 0,
                            target: e,
                            eventName: t,
                            propName: null
                        }
                    }
                    const w = (o = o || []).map(([e, t]) => {
                        const [n, r] = Sr(e);
                        return [n, r, t]
                    });
                    return h = function(e) {
                        if (e && e.id === Yn) {
                            const t = null != e.encapsulation && e.encapsulation !== qe.None || e.styles.length || Object.keys(e.data).length;
                            e.id = t ? `c${tr++}` : Xn
                        }
                        return e && e.id === Xn && (e = null), e || null
                    }(h), c && (t |= 33554432), {
                        nodeIndex: -1,
                        parent: null,
                        renderParent: null,
                        bindingIndex: -1,
                        outputIndex: -1,
                        checkIndex: e,
                        flags: t |= 1,
                        childFlags: 0,
                        directChildFlags: 0,
                        childMatchedQueries: 0,
                        matchedQueries: d,
                        matchedQueryIds: f,
                        references: p,
                        ngContentIndex: r,
                        childCount: s,
                        bindings: v,
                        bindingFlags: Er(v),
                        outputs: y,
                        element: {
                            ns: g,
                            name: m,
                            attrs: w,
                            template: null,
                            componentProvider: null,
                            componentView: c || null,
                            componentRendererType: h,
                            publicProviders: null,
                            allProviders: null,
                            handleEvent: u || Qn
                        },
                        provider: null,
                        text: null,
                        query: null,
                        ngContent: null
                    }
                }

                function Gi(e, t, n) {
                    const r = n.element,
                        s = e.root.selectorOrNode,
                        i = e.renderer;
                    let o;
                    if (e.parent || !s) {
                        o = r.name ? i.createElement(r.name, r.ns) : i.createComment("");
                        const s = gr(e, t, n);
                        s && i.appendChild(s, o)
                    } else o = i.selectRootElement(s, !!r.componentRendererType && r.componentRendererType.encapsulation === qe.ShadowDom);
                    if (r.attrs)
                        for (let l = 0; l < r.attrs.length; l++) {
                            const [e, t, n] = r.attrs[l];
                            i.setAttribute(o, t, n, e)
                        }
                    return o
                }

                function Qi(e, t, n, r) {
                    for (let o = 0; o < n.outputs.length; o++) {
                        const l = n.outputs[o],
                            a = Ki(e, n.nodeIndex, (i = l.eventName, (s = l.target) ? `${s}:${i}` : i));
                        let u = l.target,
                            c = e;
                        "component" === l.target && (u = null, c = t);
                        const h = c.renderer.listen(u || r, l.eventName, a);
                        e.disposables[n.outputIndex + o] = h
                    }
                    var s, i
                }

                function Ki(e, t, n) {
                    return r => lr(e, t, n, r)
                }

                function Ji(e, t, n, r) {
                    if (!rr(e, t, n, r)) return !1;
                    const s = t.bindings[n],
                        i = Bn(e, t.nodeIndex),
                        o = i.renderElement,
                        l = s.name;
                    switch (15 & s.flags) {
                        case 1:
                            ! function(e, t, n, r, s, i) {
                                const o = t.securityContext;
                                let l = o ? e.root.sanitizer.sanitize(o, i) : i;
                                l = null != l ? l.toString() : null;
                                const a = e.renderer;
                                null != i ? a.setAttribute(n, s, l, r) : a.removeAttribute(n, s, r)
                            }(e, s, o, s.ns, l, r);
                            break;
                        case 2:
                            ! function(e, t, n, r) {
                                const s = e.renderer;
                                r ? s.addClass(t, n) : s.removeClass(t, n)
                            }(e, o, l, r);
                            break;
                        case 4:
                            ! function(e, t, n, r, s) {
                                let i = e.root.sanitizer.sanitize(St.STYLE, s);
                                if (null != i) {
                                    i = i.toString();
                                    const e = t.suffix;
                                    null != e && (i += e)
                                } else i = null;
                                const o = e.renderer;
                                null != i ? o.setStyle(n, r, i) : o.removeStyle(n, r)
                            }(e, s, o, l, r);
                            break;
                        case 8:
                            ! function(e, t, n, r, s) {
                                const i = t.securityContext;
                                let o = i ? e.root.sanitizer.sanitize(i, s) : s;
                                e.renderer.setProperty(n, r, o)
                            }(33554432 & t.flags && 32 & s.flags ? i.componentView : e, s, o, l, r)
                    }
                    return !0
                }

                function Yi(e) {
                    const t = e.def.nodeMatchedQueries;
                    for (; e.parent && dr(e);) {
                        let n = e.parentNodeDef;
                        e = e.parent;
                        const r = n.nodeIndex + n.childCount;
                        for (let s = 0; s <= r; s++) {
                            const r = e.def.nodes[s];
                            67108864 & r.flags && 536870912 & r.flags && (r.query.filterId & t) === r.query.filterId && Wn(e, s).setDirty(), !(1 & r.flags && s + r.childCount < n.nodeIndex) && 67108864 & r.childFlags && 536870912 & r.childFlags || (s += r.childCount)
                        }
                    }
                    if (134217728 & e.def.nodeFlags)
                        for (let n = 0; n < e.def.nodes.length; n++) {
                            const t = e.def.nodes[n];
                            134217728 & t.flags && 536870912 & t.flags && Wn(e, n).setDirty(), n += t.childCount
                        }
                }

                function Xi(e, t) {
                    const n = Wn(e, t.nodeIndex);
                    if (!n.dirty) return;
                    let r, s = void 0;
                    if (67108864 & t.flags) {
                        const n = t.parent.parent;
                        s = eo(e, n.nodeIndex, n.nodeIndex + n.childCount, t.query, []), r = qn(e, t.parent.nodeIndex).instance
                    } else 134217728 & t.flags && (s = eo(e, 0, e.def.nodes.length - 1, t.query, []), r = e.component);
                    n.reset(s);
                    const i = t.query.bindings;
                    let o = !1;
                    for (let l = 0; l < i.length; l++) {
                        const e = i[l];
                        let t;
                        switch (e.bindingType) {
                            case 0:
                                t = n.first;
                                break;
                            case 1:
                                t = n, o = !0
                        }
                        r[e.propName] = t
                    }
                    o && n.notifyOnChanges()
                }

                function eo(e, t, n, r, s) {
                    for (let i = t; i <= n; i++) {
                        const t = e.def.nodes[i],
                            n = t.matchedQueries[r.id];
                        if (null != n && s.push(to(e, t, n)), 1 & t.flags && t.element.template && (t.element.template.nodeMatchedQueries & r.filterId) === r.filterId) {
                            const n = Bn(e, i);
                            if ((t.childMatchedQueries & r.filterId) === r.filterId && (eo(e, i + 1, i + t.childCount, r, s), i += t.childCount), 16777216 & t.flags) {
                                const e = n.viewContainer._embeddedViews;
                                for (let t = 0; t < e.length; t++) {
                                    const i = e[t],
                                        o = ar(i);
                                    o && o === n && eo(i, 0, i.def.nodes.length - 1, r, s)
                                }
                            }
                            const o = n.template._projectedViews;
                            if (o)
                                for (let e = 0; e < o.length; e++) {
                                    const t = o[e];
                                    eo(t, 0, t.def.nodes.length - 1, r, s)
                                }
                        }(t.childMatchedQueries & r.filterId) !== r.filterId && (i += t.childCount)
                    }
                    return s
                }

                function to(e, t, n) {
                    if (null != n) switch (n) {
                        case 1:
                            return Bn(e, t.nodeIndex).renderElement;
                        case 0:
                            return new cn(Bn(e, t.nodeIndex).renderElement);
                        case 2:
                            return Bn(e, t.nodeIndex).template;
                        case 3:
                            return Bn(e, t.nodeIndex).viewContainer;
                        case 4:
                            return qn(e, t.nodeIndex).instance
                    }
                }

                function no(e, t, n) {
                    const r = gr(e, t, n);
                    r && br(e, n.ngContent.index, 1, r, null, void 0)
                }

                function ro(e, t, n) {
                    const r = new Array(n.length - 1);
                    for (let s = 1; s < n.length; s++) r[s - 1] = {
                        flags: 8,
                        name: null,
                        ns: null,
                        nonMinifiedName: null,
                        securityContext: null,
                        suffix: n[s]
                    };
                    return {
                        nodeIndex: -1,
                        parent: null,
                        renderParent: null,
                        bindingIndex: -1,
                        outputIndex: -1,
                        checkIndex: e,
                        flags: 2,
                        childFlags: 0,
                        directChildFlags: 0,
                        childMatchedQueries: 0,
                        matchedQueries: {},
                        matchedQueryIds: 0,
                        references: {},
                        ngContentIndex: t,
                        childCount: 0,
                        bindings: r,
                        bindingFlags: 8,
                        outputs: [],
                        element: null,
                        provider: null,
                        text: {
                            prefix: n[0]
                        },
                        query: null,
                        ngContent: null
                    }
                }

                function so(e, t, n) {
                    let r;
                    const s = e.renderer;
                    r = s.createText(n.text.prefix);
                    const i = gr(e, t, n);
                    return i && s.appendChild(i, r), {
                        renderText: r
                    }
                }

                function io(e, t) {
                    return (null != e ? e.toString() : "") + t.suffix
                }

                function oo(e, t, n, r) {
                    let s = 0,
                        i = 0,
                        o = 0,
                        l = 0,
                        a = 0,
                        u = null,
                        c = null,
                        h = !1,
                        d = !1,
                        p = null;
                    for (let f = 0; f < t.length; f++) {
                        const e = t[f];
                        if (e.nodeIndex = f, e.parent = u, e.bindingIndex = s, e.outputIndex = i, e.renderParent = c, o |= e.flags, a |= e.matchedQueryIds, e.element) {
                            const t = e.element;
                            t.publicProviders = u ? u.element.publicProviders : Object.create(null), t.allProviders = t.publicProviders, h = !1, d = !1, e.element.template && (a |= e.element.template.nodeMatchedQueries)
                        }
                        if (ao(u, e, t.length), s += e.bindings.length, i += e.outputs.length, !c && 3 & e.flags && (p = e), 20224 & e.flags) {
                            h || (h = !0, u.element.publicProviders = Object.create(u.element.publicProviders), u.element.allProviders = u.element.publicProviders);
                            const t = 0 != (32768 & e.flags);
                            0 == (8192 & e.flags) || t ? u.element.publicProviders[Jn(e.provider.token)] = e : (d || (d = !0, u.element.allProviders = Object.create(u.element.publicProviders)), u.element.allProviders[Jn(e.provider.token)] = e), t && (u.element.componentProvider = e)
                        }
                        if (u ? (u.childFlags |= e.flags, u.directChildFlags |= e.flags, u.childMatchedQueries |= e.matchedQueryIds, e.element && e.element.template && (u.childMatchedQueries |= e.element.template.nodeMatchedQueries)) : l |= e.flags, e.childCount > 0) u = e, lo(e) || (c = e);
                        else
                            for (; u && f === u.nodeIndex + u.childCount;) {
                                const e = u.parent;
                                e && (e.childFlags |= u.childFlags, e.childMatchedQueries |= u.childMatchedQueries), c = (u = e) && lo(u) ? u.renderParent : u
                            }
                    }
                    return {
                        factory: null,
                        nodeFlags: o,
                        rootNodeFlags: l,
                        nodeMatchedQueries: a,
                        flags: e,
                        nodes: t,
                        updateDirectives: n || Qn,
                        updateRenderer: r || Qn,
                        handleEvent: (e, n, r, s) => t[n].element.handleEvent(e, r, s),
                        bindingCount: s,
                        outputCount: i,
                        lastRenderRootNode: p
                    }
                }

                function lo(e) {
                    return 0 != (1 & e.flags) && null === e.element.name
                }

                function ao(e, t, n) {
                    const r = t.element && t.element.template;
                    if (r) {
                        if (!r.lastRenderRootNode) throw new Error("Illegal State: Embedded templates without nodes are not allowed!");
                        if (r.lastRenderRootNode && 16777216 & r.lastRenderRootNode.flags) throw new Error(`Illegal State: Last root node of a template can't have embedded views, at index ${t.nodeIndex}!`)
                    }
                    if (20224 & t.flags && 0 == (1 & (e ? e.flags : 0))) throw new Error(`Illegal State: StaticProvider/Directive nodes need to be children of elements or anchors, at index ${t.nodeIndex}!`);
                    if (t.query) {
                        if (67108864 & t.flags && (!e || 0 == (16384 & e.flags))) throw new Error(`Illegal State: Content Query nodes need to be children of directives, at index ${t.nodeIndex}!`);
                        if (134217728 & t.flags && e) throw new Error(`Illegal State: View Query nodes have to be top level nodes, at index ${t.nodeIndex}!`)
                    }
                    if (t.childCount) {
                        const r = e ? e.nodeIndex + e.childCount : n - 1;
                        if (t.nodeIndex <= r && t.nodeIndex + t.childCount > r) throw new Error(`Illegal State: childCount of node leads outside of parent, at index ${t.nodeIndex}!`)
                    }
                }

                function uo(e, t, n, r) {
                    const s = po(e.root, e.renderer, e, t, n);
                    return fo(s, e.component, r), go(s), s
                }

                function co(e, t, n) {
                    const r = po(e, e.renderer, null, null, t);
                    return fo(r, n, n), go(r), r
                }

                function ho(e, t, n, r) {
                    const s = t.element.componentRendererType;
                    let i;
                    return i = s ? e.root.rendererFactory.createRenderer(r, s) : e.root.renderer, po(e.root, i, e, t.element.componentProvider, n)
                }

                function po(e, t, n, r, s) {
                    const i = new Array(s.nodes.length),
                        o = s.outputCount ? new Array(s.outputCount) : null;
                    return {
                        def: s,
                        parent: n,
                        viewContainerParent: null,
                        parentNodeDef: r,
                        context: null,
                        component: null,
                        nodes: i,
                        state: 13,
                        root: e,
                        renderer: t,
                        oldValues: new Array(s.bindingCount),
                        disposables: o,
                        initIndex: -1
                    }
                }

                function fo(e, t, n) {
                    e.component = t, e.context = n
                }

                function go(e) {
                    let t;
                    hr(e) && (t = Bn(e.parent, e.parentNodeDef.parent.nodeIndex).renderElement);
                    const n = e.def,
                        r = e.nodes;
                    for (let s = 0; s < n.nodes.length; s++) {
                        const i = n.nodes[s];
                        let o;
                        switch (Gn.setCurrentNode(e, s), 201347067 & i.flags) {
                            case 1:
                                const n = Gi(e, t, i);
                                let l = void 0;
                                if (33554432 & i.flags) {
                                    const t = vr(i.element.componentView);
                                    l = Gn.createComponentView(e, i, t, n)
                                }
                                Qi(e, l, i, n), o = {
                                    renderElement: n,
                                    componentView: l,
                                    viewContainer: null,
                                    template: i.element.template ? Br(e, i) : void 0
                                }, 16777216 & i.flags && (o.viewContainer = Hr(e, i, o));
                                break;
                            case 2:
                                o = so(e, t, i);
                                break;
                            case 512:
                            case 1024:
                            case 2048:
                            case 256:
                                (o = r[s]) || 4096 & i.flags || (o = {
                                    instance: as(e, i)
                                });
                                break;
                            case 16:
                                o = {
                                    instance: us(e, i)
                                };
                                break;
                            case 16384:
                                (o = r[s]) || (o = {
                                    instance: cs(e, i)
                                }), 32768 & i.flags && fo(Bn(e, i.parent.nodeIndex).componentView, o.instance, o.instance);
                                break;
                            case 32:
                            case 64:
                            case 128:
                                o = {
                                    value: void 0
                                };
                                break;
                            case 67108864:
                            case 134217728:
                                o = new Ns;
                                break;
                            case 8:
                                no(e, t, i), o = void 0
                        }
                        r[s] = o
                    }
                    So(e, xo.CreateViewNodes), Ro(e, 201326592, 268435456, 0)
                }

                function mo(e) {
                    wo(e), Gn.updateDirectives(e, 1), Eo(e, xo.CheckNoChanges), Gn.updateRenderer(e, 1), So(e, xo.CheckNoChanges), e.state &= -97
                }

                function vo(e) {
                    1 & e.state ? (e.state &= -2, e.state |= 2) : e.state &= -3, Fn(e, 0, 256), wo(e), Gn.updateDirectives(e, 0), Eo(e, xo.CheckAndUpdate), Ro(e, 67108864, 536870912, 0);
                    let t = Fn(e, 256, 512);
                    ys(e, 2097152 | (t ? 1048576 : 0)), Gn.updateRenderer(e, 0), So(e, xo.CheckAndUpdate), Ro(e, 134217728, 536870912, 0), ys(e, 8388608 | ((t = Fn(e, 512, 768)) ? 4194304 : 0)), 2 & e.def.flags && (e.state &= -9), e.state &= -97, Fn(e, 768, 1024)
                }

                function yo(e, t, n, r, s, i, o, l, a, u, c, h, d) {
                    return 0 === n ? function(e, t, n, r, s, i, o, l, a, u, c, h) {
                        switch (201347067 & t.flags) {
                            case 1:
                                return function(e, t, n, r, s, i, o, l, a, u, c, h) {
                                    const d = t.bindings.length;
                                    let p = !1;
                                    return d > 0 && Ji(e, t, 0, n) && (p = !0), d > 1 && Ji(e, t, 1, r) && (p = !0), d > 2 && Ji(e, t, 2, s) && (p = !0), d > 3 && Ji(e, t, 3, i) && (p = !0), d > 4 && Ji(e, t, 4, o) && (p = !0), d > 5 && Ji(e, t, 5, l) && (p = !0), d > 6 && Ji(e, t, 6, a) && (p = !0), d > 7 && Ji(e, t, 7, u) && (p = !0), d > 8 && Ji(e, t, 8, c) && (p = !0), d > 9 && Ji(e, t, 9, h) && (p = !0), p
                                }(e, t, n, r, s, i, o, l, a, u, c, h);
                            case 2:
                                return function(e, t, n, r, s, i, o, l, a, u, c, h) {
                                    let d = !1;
                                    const p = t.bindings,
                                        f = p.length;
                                    if (f > 0 && rr(e, t, 0, n) && (d = !0), f > 1 && rr(e, t, 1, r) && (d = !0), f > 2 && rr(e, t, 2, s) && (d = !0), f > 3 && rr(e, t, 3, i) && (d = !0), f > 4 && rr(e, t, 4, o) && (d = !0), f > 5 && rr(e, t, 5, l) && (d = !0), f > 6 && rr(e, t, 6, a) && (d = !0), f > 7 && rr(e, t, 7, u) && (d = !0), f > 8 && rr(e, t, 8, c) && (d = !0), f > 9 && rr(e, t, 9, h) && (d = !0), d) {
                                        let d = t.text.prefix;
                                        f > 0 && (d += io(n, p[0])), f > 1 && (d += io(r, p[1])), f > 2 && (d += io(s, p[2])), f > 3 && (d += io(i, p[3])), f > 4 && (d += io(o, p[4])), f > 5 && (d += io(l, p[5])), f > 6 && (d += io(a, p[6])), f > 7 && (d += io(u, p[7])), f > 8 && (d += io(c, p[8])), f > 9 && (d += io(h, p[9]));
                                        const g = $n(e, t.nodeIndex).renderText;
                                        e.renderer.setValue(g, d)
                                    }
                                    return d
                                }(e, t, n, r, s, i, o, l, a, u, c, h);
                            case 16384:
                                return function(e, t, n, r, s, i, o, l, a, u, c, h) {
                                    const d = qn(e, t.nodeIndex),
                                        p = d.instance;
                                    let f = !1,
                                        g = void 0;
                                    const m = t.bindings.length;
                                    return m > 0 && nr(e, t, 0, n) && (f = !0, g = vs(e, d, t, 0, n, g)), m > 1 && nr(e, t, 1, r) && (f = !0, g = vs(e, d, t, 1, r, g)), m > 2 && nr(e, t, 2, s) && (f = !0, g = vs(e, d, t, 2, s, g)), m > 3 && nr(e, t, 3, i) && (f = !0, g = vs(e, d, t, 3, i, g)), m > 4 && nr(e, t, 4, o) && (f = !0, g = vs(e, d, t, 4, o, g)), m > 5 && nr(e, t, 5, l) && (f = !0, g = vs(e, d, t, 5, l, g)), m > 6 && nr(e, t, 6, a) && (f = !0, g = vs(e, d, t, 6, a, g)), m > 7 && nr(e, t, 7, u) && (f = !0, g = vs(e, d, t, 7, u, g)), m > 8 && nr(e, t, 8, c) && (f = !0, g = vs(e, d, t, 8, c, g)), m > 9 && nr(e, t, 9, h) && (f = !0, g = vs(e, d, t, 9, h, g)), g && p.ngOnChanges(g), 65536 & t.flags && zn(e, 256, t.nodeIndex) && p.ngOnInit(), 262144 & t.flags && p.ngDoCheck(), f
                                }(e, t, n, r, s, i, o, l, a, u, c, h);
                            case 32:
                            case 64:
                            case 128:
                                return function(e, t, n, r, s, i, o, l, a, u, c, h) {
                                    const d = t.bindings;
                                    let p = !1;
                                    const f = d.length;
                                    if (f > 0 && rr(e, t, 0, n) && (p = !0), f > 1 && rr(e, t, 1, r) && (p = !0), f > 2 && rr(e, t, 2, s) && (p = !0), f > 3 && rr(e, t, 3, i) && (p = !0), f > 4 && rr(e, t, 4, o) && (p = !0), f > 5 && rr(e, t, 5, l) && (p = !0), f > 6 && rr(e, t, 6, a) && (p = !0), f > 7 && rr(e, t, 7, u) && (p = !0), f > 8 && rr(e, t, 8, c) && (p = !0), f > 9 && rr(e, t, 9, h) && (p = !0), p) {
                                        const p = Zn(e, t.nodeIndex);
                                        let g;
                                        switch (201347067 & t.flags) {
                                            case 32:
                                                g = new Array(d.length), f > 0 && (g[0] = n), f > 1 && (g[1] = r), f > 2 && (g[2] = s), f > 3 && (g[3] = i), f > 4 && (g[4] = o), f > 5 && (g[5] = l), f > 6 && (g[6] = a), f > 7 && (g[7] = u), f > 8 && (g[8] = c), f > 9 && (g[9] = h);
                                                break;
                                            case 64:
                                                g = {}, f > 0 && (g[d[0].name] = n), f > 1 && (g[d[1].name] = r), f > 2 && (g[d[2].name] = s), f > 3 && (g[d[3].name] = i), f > 4 && (g[d[4].name] = o), f > 5 && (g[d[5].name] = l), f > 6 && (g[d[6].name] = a), f > 7 && (g[d[7].name] = u), f > 8 && (g[d[8].name] = c), f > 9 && (g[d[9].name] = h);
                                                break;
                                            case 128:
                                                const e = n;
                                                switch (f) {
                                                    case 1:
                                                        g = e.transform(n);
                                                        break;
                                                    case 2:
                                                        g = e.transform(r);
                                                        break;
                                                    case 3:
                                                        g = e.transform(r, s);
                                                        break;
                                                    case 4:
                                                        g = e.transform(r, s, i);
                                                        break;
                                                    case 5:
                                                        g = e.transform(r, s, i, o);
                                                        break;
                                                    case 6:
                                                        g = e.transform(r, s, i, o, l);
                                                        break;
                                                    case 7:
                                                        g = e.transform(r, s, i, o, l, a);
                                                        break;
                                                    case 8:
                                                        g = e.transform(r, s, i, o, l, a, u);
                                                        break;
                                                    case 9:
                                                        g = e.transform(r, s, i, o, l, a, u, c);
                                                        break;
                                                    case 10:
                                                        g = e.transform(r, s, i, o, l, a, u, c, h)
                                                }
                                        }
                                        p.value = g
                                    }
                                    return p
                                }(e, t, n, r, s, i, o, l, a, u, c, h);
                            default:
                                throw "unreachable"
                        }
                    }(e, t, r, s, i, o, l, a, u, c, h, d) : function(e, t, n) {
                        switch (201347067 & t.flags) {
                            case 1:
                                return function(e, t, n) {
                                    let r = !1;
                                    for (let s = 0; s < n.length; s++) Ji(e, t, s, n[s]) && (r = !0);
                                    return r
                                }(e, t, n);
                            case 2:
                                return function(e, t, n) {
                                    const r = t.bindings;
                                    let s = !1;
                                    for (let i = 0; i < n.length; i++) rr(e, t, i, n[i]) && (s = !0);
                                    if (s) {
                                        let s = "";
                                        for (let e = 0; e < n.length; e++) s += io(n[e], r[e]);
                                        s = t.text.prefix + s;
                                        const i = $n(e, t.nodeIndex).renderText;
                                        e.renderer.setValue(i, s)
                                    }
                                    return s
                                }(e, t, n);
                            case 16384:
                                return function(e, t, n) {
                                    const r = qn(e, t.nodeIndex),
                                        s = r.instance;
                                    let i = !1,
                                        o = void 0;
                                    for (let l = 0; l < n.length; l++) nr(e, t, l, n[l]) && (i = !0, o = vs(e, r, t, l, n[l], o));
                                    return o && s.ngOnChanges(o), 65536 & t.flags && zn(e, 256, t.nodeIndex) && s.ngOnInit(), 262144 & t.flags && s.ngDoCheck(), i
                                }(e, t, n);
                            case 32:
                            case 64:
                            case 128:
                                return function(e, t, n) {
                                    const r = t.bindings;
                                    let s = !1;
                                    for (let i = 0; i < n.length; i++) rr(e, t, i, n[i]) && (s = !0);
                                    if (s) {
                                        const s = Zn(e, t.nodeIndex);
                                        let i;
                                        switch (201347067 & t.flags) {
                                            case 32:
                                                i = n;
                                                break;
                                            case 64:
                                                i = {};
                                                for (let s = 0; s < n.length; s++) i[r[s].name] = n[s];
                                                break;
                                            case 128:
                                                const e = n[0],
                                                    t = n.slice(1);
                                                i = e.transform(...t)
                                        }
                                        s.value = i
                                    }
                                    return s
                                }(e, t, n);
                            default:
                                throw "unreachable"
                        }
                    }(e, t, r)
                }

                function wo(e) {
                    const t = e.def;
                    if (4 & t.nodeFlags)
                        for (let n = 0; n < t.nodes.length; n++) {
                            const r = t.nodes[n];
                            if (4 & r.flags) {
                                const t = Bn(e, n).template._projectedViews;
                                if (t)
                                    for (let n = 0; n < t.length; n++) {
                                        const r = t[n];
                                        r.state |= 32, or(r, e)
                                    }
                            } else 0 == (4 & r.childFlags) && (n += r.childCount)
                        }
                }

                function bo(e, t, n, r, s, i, o, l, a, u, c, h, d) {
                    return 0 === n ? function(e, t, n, r, s, i, o, l, a, u, c, h) {
                        const d = t.bindings.length;
                        d > 0 && sr(e, t, 0, n), d > 1 && sr(e, t, 1, r), d > 2 && sr(e, t, 2, s), d > 3 && sr(e, t, 3, i), d > 4 && sr(e, t, 4, o), d > 5 && sr(e, t, 5, l), d > 6 && sr(e, t, 6, a), d > 7 && sr(e, t, 7, u), d > 8 && sr(e, t, 8, c), d > 9 && sr(e, t, 9, h)
                    }(e, t, r, s, i, o, l, a, u, c, h, d) : function(e, t, n) {
                        for (let r = 0; r < n.length; r++) sr(e, t, r, n[r])
                    }(e, t, r), !1
                }

                function _o(e, t) {
                    if (Wn(e, t.nodeIndex).dirty) throw jn(Gn.createDebugContext(e, t.nodeIndex), `Query ${t.query.id} not dirty`, `Query ${t.query.id} dirty`, 0 != (1 & e.state))
                }

                function Co(e) {
                    if (!(128 & e.state)) {
                        if (Eo(e, xo.Destroy), So(e, xo.Destroy), ys(e, 131072), e.disposables)
                            for (let t = 0; t < e.disposables.length; t++) e.disposables[t]();
                        ! function(e) {
                            if (!(16 & e.state)) return;
                            const t = ar(e);
                            if (t) {
                                const n = t.template._projectedViews;
                                n && (Be(n, n.indexOf(e)), Gn.dirtyParentQueries(e))
                            }
                        }(e), e.renderer.destroyNode && function(e) {
                            const t = e.def.nodes.length;
                            for (let n = 0; n < t; n++) {
                                const t = e.def.nodes[n];
                                1 & t.flags ? e.renderer.destroyNode(Bn(e, n).renderElement) : 2 & t.flags ? e.renderer.destroyNode($n(e, n).renderText) : (67108864 & t.flags || 134217728 & t.flags) && Wn(e, n).destroy()
                            }
                        }(e), hr(e) && e.renderer.destroy(), e.state |= 128
                    }
                }
                const xo = function() {
                    var e = {
                        CreateViewNodes: 0,
                        CheckNoChanges: 1,
                        CheckNoChangesProjectedViews: 2,
                        CheckAndUpdate: 3,
                        CheckAndUpdateProjectedViews: 4,
                        Destroy: 5
                    };
                    return e[e.CreateViewNodes] = "CreateViewNodes", e[e.CheckNoChanges] = "CheckNoChanges", e[e.CheckNoChangesProjectedViews] = "CheckNoChangesProjectedViews", e[e.CheckAndUpdate] = "CheckAndUpdate", e[e.CheckAndUpdateProjectedViews] = "CheckAndUpdateProjectedViews", e[e.Destroy] = "Destroy", e
                }();

                function So(e, t) {
                    const n = e.def;
                    if (33554432 & n.nodeFlags)
                        for (let r = 0; r < n.nodes.length; r++) {
                            const s = n.nodes[r];
                            33554432 & s.flags ? To(Bn(e, r).componentView, t) : 0 == (33554432 & s.childFlags) && (r += s.childCount)
                        }
                }

                function Eo(e, t) {
                    const n = e.def;
                    if (16777216 & n.nodeFlags)
                        for (let r = 0; r < n.nodes.length; r++) {
                            const s = n.nodes[r];
                            if (16777216 & s.flags) {
                                const n = Bn(e, r).viewContainer._embeddedViews;
                                for (let e = 0; e < n.length; e++) To(n[e], t)
                            } else 0 == (16777216 & s.childFlags) && (r += s.childCount)
                        }
                }

                function To(e, t) {
                    const n = e.state;
                    switch (t) {
                        case xo.CheckNoChanges:
                            0 == (128 & n) && (12 == (12 & n) ? mo(e) : 64 & n && ko(e, xo.CheckNoChangesProjectedViews));
                            break;
                        case xo.CheckNoChangesProjectedViews:
                            0 == (128 & n) && (32 & n ? mo(e) : 64 & n && ko(e, t));
                            break;
                        case xo.CheckAndUpdate:
                            0 == (128 & n) && (12 == (12 & n) ? vo(e) : 64 & n && ko(e, xo.CheckAndUpdateProjectedViews));
                            break;
                        case xo.CheckAndUpdateProjectedViews:
                            0 == (128 & n) && (32 & n ? vo(e) : 64 & n && ko(e, t));
                            break;
                        case xo.Destroy:
                            Co(e);
                            break;
                        case xo.CreateViewNodes:
                            go(e)
                    }
                }

                function ko(e, t) {
                    Eo(e, t), So(e, t)
                }

                function Ro(e, t, n, r) {
                    if (!(e.def.nodeFlags & t && e.def.nodeFlags & n)) return;
                    const s = e.def.nodes.length;
                    for (let i = 0; i < s; i++) {
                        const s = e.def.nodes[i];
                        if (s.flags & t && s.flags & n) switch (Gn.setCurrentNode(e, s.nodeIndex), r) {
                            case 0:
                                Xi(e, s);
                                break;
                            case 1:
                                _o(e, s)
                        }
                        s.childFlags & t && s.childFlags & n || (i += s.childCount)
                    }
                }
                let Io = !1;

                function Ao(e, t, n, r, s, i) {
                    const o = s.injector.get(pn);
                    return co(Po(e, s, o, t, n), r, i)
                }

                function No(e, t, n, r, s, i) {
                    const o = s.injector.get(pn),
                        l = Po(e, s, new cl(o), t, n),
                        a = zo(r);
                    return al(Go.create, co, null, [l, a, i])
                }

                function Po(e, t, n, r, s) {
                    const i = t.injector.get(Et),
                        o = t.injector.get(Xe),
                        l = n.createRenderer(null, null);
                    return {
                        ngModule: t,
                        injector: e,
                        projectableNodes: r,
                        selectorOrNode: s,
                        sanitizer: i,
                        rendererFactory: n,
                        renderer: l,
                        errorHandler: o
                    }
                }

                function Oo(e, t, n, r) {
                    const s = zo(n);
                    return al(Go.create, uo, null, [e, t, s, r])
                }

                function Do(e, t, n, r) {
                    return n = jo.get(t.element.componentProvider.provider.token) || zo(n), al(Go.create, ho, null, [e, t, n, r])
                }

                function Mo(e, t, n, r) {
                    return Jr(e, t, n, function(e) {
                        const {
                            hasOverrides: t,
                            hasDeprecatedOverrides: n
                        } = function(e) {
                            let t = !1,
                                n = !1;
                            return 0 === Lo.size ? {
                                hasOverrides: t,
                                hasDeprecatedOverrides: n
                            } : (e.providers.forEach(e => {
                                const r = Lo.get(e.token);
                                3840 & e.flags && r && (t = !0, n = n || r.deprecatedBehavior)
                            }), e.modules.forEach(e => {
                                Uo.forEach((r, s) => {
                                    fe(s).providedIn === e && (t = !0, n = n || r.deprecatedBehavior)
                                })
                            }), {
                                hasOverrides: t,
                                hasDeprecatedOverrides: n
                            })
                        }(e);
                        return t ? (function(e) {
                            for (let t = 0; t < e.providers.length; t++) {
                                const r = e.providers[t];
                                n && (r.flags |= 4096);
                                const s = Lo.get(r.token);
                                s && (r.flags = -3841 & r.flags | s.flags, r.deps = fr(s.deps), r.value = s.value)
                            }
                            if (Uo.size > 0) {
                                let t = new Set(e.modules);
                                Uo.forEach((r, s) => {
                                    if (t.has(fe(s).providedIn)) {
                                        let t = {
                                            token: s,
                                            flags: r.flags | (n ? 4096 : 0),
                                            deps: fr(r.deps),
                                            value: r.value,
                                            index: e.providers.length
                                        };
                                        e.providers.push(t), e.providersByKey[Jn(s)] = t
                                    }
                                })
                            }
                        }(e = e.factory(() => Qn)), e) : e
                    }(r))
                }
                const Lo = new Map,
                    Uo = new Map,
                    jo = new Map;

                function Vo(e) {
                    let t;
                    Lo.set(e.token, e), "function" == typeof e.token && (t = fe(e.token)) && "function" == typeof t.providedIn && Uo.set(e.token, e)
                }

                function Ho(e, t) {
                    const n = vr(t.viewDefFactory),
                        r = vr(n.nodes[0].element.componentView);
                    jo.set(e, r)
                }

                function Fo() {
                    Lo.clear(), Uo.clear(), jo.clear()
                }

                function zo(e) {
                    if (0 === Lo.size) return e;
                    const t = function(e) {
                        const t = [];
                        let n = null;
                        for (let r = 0; r < e.nodes.length; r++) {
                            const s = e.nodes[r];
                            1 & s.flags && (n = s), n && 3840 & s.flags && Lo.has(s.provider.token) && (t.push(n.nodeIndex), n = null)
                        }
                        return t
                    }(e);
                    if (0 === t.length) return e;
                    e = e.factory(() => Qn);
                    for (let r = 0; r < t.length; r++) n(e, t[r]);
                    return e;

                    function n(e, t) {
                        for (let n = t + 1; n < e.nodes.length; n++) {
                            const t = e.nodes[n];
                            if (1 & t.flags) return;
                            if (3840 & t.flags) {
                                const e = t.provider,
                                    n = Lo.get(e.token);
                                n && (t.flags = -3841 & t.flags | n.flags, e.deps = fr(n.deps), e.value = n.value)
                            }
                        }
                    }
                }

                function $o(e, t, n, r, s, i, o, l, a, u, c, h, d) {
                    const p = e.def.nodes[t];
                    return yo(e, p, n, r, s, i, o, l, a, u, c, h, d), 224 & p.flags ? Zn(e, t).value : void 0
                }

                function Bo(e, t, n, r, s, i, o, l, a, u, c, h, d) {
                    const p = e.def.nodes[t];
                    return bo(e, p, n, r, s, i, o, l, a, u, c, h, d), 224 & p.flags ? Zn(e, t).value : void 0
                }

                function qo(e) {
                    return al(Go.detectChanges, vo, null, [e])
                }

                function Zo(e) {
                    return al(Go.checkNoChanges, mo, null, [e])
                }

                function Wo(e) {
                    return al(Go.destroy, Co, null, [e])
                }
                const Go = function() {
                    var e = {
                        create: 0,
                        detectChanges: 1,
                        checkNoChanges: 2,
                        destroy: 3,
                        handleEvent: 4
                    };
                    return e[e.create] = "create", e[e.detectChanges] = "detectChanges", e[e.checkNoChanges] = "checkNoChanges", e[e.destroy] = "destroy", e[e.handleEvent] = "handleEvent", e
                }();
                let Qo, Ko, Jo;

                function Yo(e, t) {
                    Ko = e, Jo = t
                }

                function Xo(e, t, n, r) {
                    return Yo(e, t), al(Go.handleEvent, e.def.handleEvent, null, [e, t, n, r])
                }

                function el(e, t) {
                    if (128 & e.state) throw Hn(Go[Qo]);
                    return Yo(e, sl(e, 0)), e.def.updateDirectives((function(e, n, r, ...s) {
                        const i = e.def.nodes[n];
                        return 0 === t ? nl(e, i, r, s) : rl(e, i, r, s), 16384 & i.flags && Yo(e, sl(e, n)), 224 & i.flags ? Zn(e, i.nodeIndex).value : void 0
                    }), e)
                }

                function tl(e, t) {
                    if (128 & e.state) throw Hn(Go[Qo]);
                    return Yo(e, il(e, 0)), e.def.updateRenderer((function(e, n, r, ...s) {
                        const i = e.def.nodes[n];
                        return 0 === t ? nl(e, i, r, s) : rl(e, i, r, s), 3 & i.flags && Yo(e, il(e, n)), 224 & i.flags ? Zn(e, i.nodeIndex).value : void 0
                    }), e)
                }

                function nl(e, t, n, r) {
                    if (yo(e, t, n, ...r)) {
                        const o = 1 === n ? r[0] : r;
                        if (16384 & t.flags) {
                            const n = {};
                            for (let e = 0; e < t.bindings.length; e++) {
                                const r = t.bindings[e],
                                    l = o[e];
                                8 & r.flags && (n[(s = r.nonMinifiedName, i = void 0, i = s.replace(/[$@]/g, "_"), `ng-reflect-${s=i.replace(Rt,(...e)=>"-"+e[1].toLowerCase())}`)] = It(l))
                            }
                            const r = t.parent,
                                l = Bn(e, r.nodeIndex).renderElement;
                            if (r.element.name)
                                for (let t in n) {
                                    const r = n[t];
                                    null != r ? e.renderer.setAttribute(l, t, r) : e.renderer.removeAttribute(l, t)
                                } else e.renderer.setValue(l, `bindings=${JSON.stringify(n,null,2)}`)
                        }
                    }
                    var s, i
                }

                function rl(e, t, n, r) {
                    bo(e, t, n, ...r)
                }

                function sl(e, t) {
                    for (let n = t; n < e.def.nodes.length; n++) {
                        const t = e.def.nodes[n];
                        if (16384 & t.flags && t.bindings && t.bindings.length) return n
                    }
                    return null
                }

                function il(e, t) {
                    for (let n = t; n < e.def.nodes.length; n++) {
                        const t = e.def.nodes[n];
                        if (3 & t.flags && t.bindings && t.bindings.length) return n
                    }
                    return null
                }
                class ol {
                    constructor(e, t) {
                        this.view = e, this.nodeIndex = t, null == t && (this.nodeIndex = t = 0), this.nodeDef = e.def.nodes[t];
                        let n = this.nodeDef,
                            r = e;
                        for (; n && 0 == (1 & n.flags);) n = n.parent;
                        if (!n)
                            for (; !n && r;) n = ur(r), r = r.parent;
                        this.elDef = n, this.elView = r
                    }
                    get elOrCompView() {
                        return Bn(this.elView, this.elDef.nodeIndex).componentView || this.view
                    }
                    get injector() {
                        return Zr(this.elView, this.elDef)
                    }
                    get component() {
                        return this.elOrCompView.component
                    }
                    get context() {
                        return this.elOrCompView.context
                    }
                    get providerTokens() {
                        const e = [];
                        if (this.elDef)
                            for (let t = this.elDef.nodeIndex + 1; t <= this.elDef.nodeIndex + this.elDef.childCount; t++) {
                                const n = this.elView.def.nodes[t];
                                20224 & n.flags && e.push(n.provider.token), t += n.childCount
                            }
                        return e
                    }
                    get references() {
                        const e = {};
                        if (this.elDef) {
                            ll(this.elView, this.elDef, e);
                            for (let t = this.elDef.nodeIndex + 1; t <= this.elDef.nodeIndex + this.elDef.childCount; t++) {
                                const n = this.elView.def.nodes[t];
                                20224 & n.flags && ll(this.elView, n, e), t += n.childCount
                            }
                        }
                        return e
                    }
                    get componentRenderElement() {
                        const e = function(e) {
                            for (; e && !hr(e);) e = e.parent;
                            return e.parent ? Bn(e.parent, ur(e).nodeIndex) : null
                        }(this.elOrCompView);
                        return e ? e.renderElement : void 0
                    }
                    get renderNode() {
                        return 2 & this.nodeDef.flags ? cr(this.view, this.nodeDef) : cr(this.elView, this.elDef)
                    }
                    logError(e, ...t) {
                        let n, r;
                        2 & this.nodeDef.flags ? (n = this.view.def, r = this.nodeDef.nodeIndex) : (n = this.elView.def, r = this.elDef.nodeIndex);
                        const s = function(e, t) {
                            let n = -1;
                            for (let r = 0; r <= t; r++) 3 & e.nodes[r].flags && n++;
                            return n
                        }(n, r);
                        let i = -1;
                        n.factory(() => ++i === s ? e.error.bind(e, ...t) : Qn), i < s && (e.error("Illegal state: the ViewDefinitionFactory did not call the logger!"), e.error(...t))
                    }
                }

                function ll(e, t, n) {
                    for (let r in t.references) n[r] = to(e, t, t.references[r])
                }

                function al(e, t, n, r) {
                    const s = Qo,
                        i = Ko,
                        o = Jo;
                    try {
                        Qo = e;
                        const l = t.apply(n, r);
                        return Ko = i, Jo = o, Qo = s, l
                    } catch (u) {
                        if (Ke(u) || !Ko) throw u;
                        throw l = u, a = ul(), l instanceof Error || (l = new Error(l.toString())), Vn(l, a), l
                    }
                    var l, a
                }

                function ul() {
                    return Ko ? new ol(Ko, Jo) : null
                }
                class cl {
                    constructor(e) {
                        this.delegate = e
                    }
                    createRenderer(e, t) {
                        return new hl(this.delegate.createRenderer(e, t))
                    }
                    begin() {
                        this.delegate.begin && this.delegate.begin()
                    }
                    end() {
                        this.delegate.end && this.delegate.end()
                    }
                    whenRenderingDone() {
                        return this.delegate.whenRenderingDone ? this.delegate.whenRenderingDone() : Promise.resolve(null)
                    }
                }
                class hl {
                    constructor(e) {
                        this.delegate = e, this.debugContextFactory = ul, this.data = this.delegate.data
                    }
                    createDebugContext(e) {
                        return this.debugContextFactory(e)
                    }
                    destroyNode(e) {
                        const t = ji(e);
                        ! function(e) {
                            Ui.delete(e.nativeNode)
                        }(t), t instanceof Mi && (t.listeners.length = 0), this.delegate.destroyNode && this.delegate.destroyNode(e)
                    }
                    destroy() {
                        this.delegate.destroy()
                    }
                    createElement(e, t) {
                        const n = this.delegate.createElement(e, t),
                            r = this.createDebugContext(n);
                        if (r) {
                            const t = new Li(n, null, r);
                            t.name = e, Vi(t)
                        }
                        return n
                    }
                    createComment(e) {
                        const t = this.delegate.createComment(e),
                            n = this.createDebugContext(t);
                        return n && Vi(new Mi(t, null, n)), t
                    }
                    createText(e) {
                        const t = this.delegate.createText(e),
                            n = this.createDebugContext(t);
                        return n && Vi(new Mi(t, null, n)), t
                    }
                    appendChild(e, t) {
                        const n = ji(e),
                            r = ji(t);
                        n && r && n instanceof Li && n.addChild(r), this.delegate.appendChild(e, t)
                    }
                    insertBefore(e, t, n) {
                        const r = ji(e),
                            s = ji(t),
                            i = ji(n);
                        r && s && r instanceof Li && r.insertBefore(i, s), this.delegate.insertBefore(e, t, n)
                    }
                    removeChild(e, t) {
                        const n = ji(e),
                            r = ji(t);
                        n && r && n instanceof Li && n.removeChild(r), this.delegate.removeChild(e, t)
                    }
                    selectRootElement(e, t) {
                        const n = this.delegate.selectRootElement(e, t),
                            r = ul();
                        return r && Vi(new Li(n, null, r)), n
                    }
                    setAttribute(e, t, n, r) {
                        const s = ji(e);
                        s && s instanceof Li && (s.attributes[r ? r + ":" + t : t] = n), this.delegate.setAttribute(e, t, n, r)
                    }
                    removeAttribute(e, t, n) {
                        const r = ji(e);
                        r && r instanceof Li && (r.attributes[n ? n + ":" + t : t] = null), this.delegate.removeAttribute(e, t, n)
                    }
                    addClass(e, t) {
                        const n = ji(e);
                        n && n instanceof Li && (n.classes[t] = !0), this.delegate.addClass(e, t)
                    }
                    removeClass(e, t) {
                        const n = ji(e);
                        n && n instanceof Li && (n.classes[t] = !1), this.delegate.removeClass(e, t)
                    }
                    setStyle(e, t, n, r) {
                        const s = ji(e);
                        s && s instanceof Li && (s.styles[t] = n), this.delegate.setStyle(e, t, n, r)
                    }
                    removeStyle(e, t, n) {
                        const r = ji(e);
                        r && r instanceof Li && (r.styles[t] = null), this.delegate.removeStyle(e, t, n)
                    }
                    setProperty(e, t, n) {
                        const r = ji(e);
                        r && r instanceof Li && (r.properties[t] = n), this.delegate.setProperty(e, t, n)
                    }
                    listen(e, t, n) {
                        if ("string" != typeof e) {
                            const r = ji(e);
                            r && r.listeners.push(new Di(t, n))
                        }
                        return this.delegate.listen(e, t, n)
                    }
                    parentNode(e) {
                        return this.delegate.parentNode(e)
                    }
                    nextSibling(e) {
                        return this.delegate.nextSibling(e)
                    }
                    setValue(e, t) {
                        return this.delegate.setValue(e, t)
                    }
                }

                function dl(e, t, n) {
                    return new pl(e, t, n)
                }
                class pl extends ze {
                    constructor(e, t, n) {
                        super(), this.moduleType = e, this._bootstrapComponents = t, this._ngModuleDefFactory = n
                    }
                    create(e) {
                        ! function() {
                            if (Io) return;
                            Io = !0;
                            const e = nt() ? {
                                setCurrentNode: Yo,
                                createRootView: No,
                                createEmbeddedView: Oo,
                                createComponentView: Do,
                                createNgModuleRef: Mo,
                                overrideProvider: Vo,
                                overrideComponentView: Ho,
                                clearOverrides: Fo,
                                checkAndUpdateView: qo,
                                checkNoChangesView: Zo,
                                destroyView: Wo,
                                createDebugContext: (e, t) => new ol(e, t),
                                handleEvent: Xo,
                                updateDirectives: el,
                                updateRenderer: tl
                            } : {
                                setCurrentNode: () => {},
                                createRootView: Ao,
                                createEmbeddedView: uo,
                                createComponentView: ho,
                                createNgModuleRef: Jr,
                                overrideProvider: Qn,
                                overrideComponentView: Qn,
                                clearOverrides: Qn,
                                checkAndUpdateView: vo,
                                checkNoChangesView: mo,
                                destroyView: Co,
                                createDebugContext: (e, t) => new ol(e, t),
                                handleEvent: (e, t, n, r) => e.def.handleEvent(e, t, n, r),
                                updateDirectives: (e, t) => e.def.updateDirectives(0 === t ? $o : Bo, e),
                                updateRenderer: (e, t) => e.def.updateRenderer(0 === t ? $o : Bo, e)
                            };
                            Gn.setCurrentNode = e.setCurrentNode, Gn.createRootView = e.createRootView, Gn.createEmbeddedView = e.createEmbeddedView, Gn.createComponentView = e.createComponentView, Gn.createNgModuleRef = e.createNgModuleRef, Gn.overrideProvider = e.overrideProvider, Gn.overrideComponentView = e.overrideComponentView, Gn.clearOverrides = e.clearOverrides, Gn.checkAndUpdateView = e.checkAndUpdateView, Gn.checkNoChangesView = e.checkNoChangesView, Gn.destroyView = e.destroyView, Gn.resolveDep = gs, Gn.createDebugContext = e.createDebugContext, Gn.handleEvent = e.handleEvent, Gn.updateDirectives = e.updateDirectives, Gn.updateRenderer = e.updateRenderer, Gn.dirtyParentQueries = Yi
                        }();
                        const t = function(e) {
                            const t = Array.from(e.providers),
                                n = Array.from(e.modules),
                                r = {};
                            for (const s in e.providersByKey) r[s] = e.providersByKey[s];
                            return {
                                factory: e.factory,
                                isRoot: e.isRoot,
                                providers: t,
                                modules: n,
                                providersByKey: r
                            }
                        }(vr(this._ngModuleDefFactory));
                        return Gn.createNgModuleRef(this.moduleType, e || Dt.NULL, this._bootstrapComponents, t)
                    }
                }
                class fl {}
                class gl {
                    constructor() {
                        this.title = "keuzetool2"
                    }
                }
                class ml {}
                const vl = new Ee("Location Initialized");
                class yl {}
                const wl = new Ee("appBaseHref");
                class bl {
                    constructor(e, t) {
                        this._subject = new Is, this._urlChangeListeners = [], this._platformStrategy = e;
                        const n = this._platformStrategy.getBaseHref();
                        this._platformLocation = t, this._baseHref = bl.stripTrailingSlash(_l(n)), this._platformStrategy.onPopState(e => {
                            this._subject.emit({
                                url: this.path(!0),
                                pop: !0,
                                state: e.state,
                                type: e.type
                            })
                        })
                    }
                    path(e = !1) {
                        return this.normalize(this._platformStrategy.path(e))
                    }
                    getState() {
                        return this._platformLocation.getState()
                    }
                    isCurrentPathEqualTo(e, t = "") {
                        return this.path() == this.normalize(e + bl.normalizeQueryParams(t))
                    }
                    normalize(e) {
                        return bl.stripTrailingSlash(function(e, t) {
                            return e && t.startsWith(e) ? t.substring(e.length) : t
                        }(this._baseHref, _l(e)))
                    }
                    prepareExternalUrl(e) {
                        return e && "/" !== e[0] && (e = "/" + e), this._platformStrategy.prepareExternalUrl(e)
                    }
                    go(e, t = "", n = null) {
                        this._platformStrategy.pushState(n, "", e, t), this._notifyUrlChangeListeners(this.prepareExternalUrl(e + bl.normalizeQueryParams(t)), n)
                    }
                    replaceState(e, t = "", n = null) {
                        this._platformStrategy.replaceState(n, "", e, t), this._notifyUrlChangeListeners(this.prepareExternalUrl(e + bl.normalizeQueryParams(t)), n)
                    }
                    forward() {
                        this._platformStrategy.forward()
                    }
                    back() {
                        this._platformStrategy.back()
                    }
                    onUrlChange(e) {
                        this._urlChangeListeners.push(e), this.subscribe(e => {
                            this._notifyUrlChangeListeners(e.url, e.state)
                        })
                    }
                    _notifyUrlChangeListeners(e = "", t) {
                        this._urlChangeListeners.forEach(n => n(e, t))
                    }
                    subscribe(e, t, n) {
                        return this._subject.subscribe({
                            next: e,
                            error: t,
                            complete: n
                        })
                    }
                    static normalizeQueryParams(e) {
                        return e && "?" !== e[0] ? "?" + e : e
                    }
                    static joinWithSlash(e, t) {
                        if (0 == e.length) return t;
                        if (0 == t.length) return e;
                        let n = 0;
                        return e.endsWith("/") && n++, t.startsWith("/") && n++, 2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
                    }
                    static stripTrailingSlash(e) {
                        const t = e.match(/#|\?|$/),
                            n = t && t.index || e.length;
                        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n)
                    }
                }

                function _l(e) {
                    return e.replace(/\/index.html$/, "")
                }
                class Cl extends yl {
                    constructor(e, t) {
                        super(), this._platformLocation = e, this._baseHref = "", null != t && (this._baseHref = t)
                    }
                    onPopState(e) {
                        this._platformLocation.onPopState(e), this._platformLocation.onHashChange(e)
                    }
                    getBaseHref() {
                        return this._baseHref
                    }
                    path(e = !1) {
                        let t = this._platformLocation.hash;
                        return null == t && (t = "#"), t.length > 0 ? t.substring(1) : t
                    }
                    prepareExternalUrl(e) {
                        const t = bl.joinWithSlash(this._baseHref, e);
                        return t.length > 0 ? "#" + t : t
                    }
                    pushState(e, t, n, r) {
                        let s = this.prepareExternalUrl(n + bl.normalizeQueryParams(r));
                        0 == s.length && (s = this._platformLocation.pathname), this._platformLocation.pushState(e, t, s)
                    }
                    replaceState(e, t, n, r) {
                        let s = this.prepareExternalUrl(n + bl.normalizeQueryParams(r));
                        0 == s.length && (s = this._platformLocation.pathname), this._platformLocation.replaceState(e, t, s)
                    }
                    forward() {
                        this._platformLocation.forward()
                    }
                    back() {
                        this._platformLocation.back()
                    }
                }
                class xl extends yl {
                    constructor(e, t) {
                        if (super(), this._platformLocation = e, null == t && (t = this._platformLocation.getBaseHrefFromDOM()), null == t) throw new Error("No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.");
                        this._baseHref = t
                    }
                    onPopState(e) {
                        this._platformLocation.onPopState(e), this._platformLocation.onHashChange(e)
                    }
                    getBaseHref() {
                        return this._baseHref
                    }
                    prepareExternalUrl(e) {
                        return bl.joinWithSlash(this._baseHref, e)
                    }
                    path(e = !1) {
                        const t = this._platformLocation.pathname + bl.normalizeQueryParams(this._platformLocation.search),
                            n = this._platformLocation.hash;
                        return n && e ? `${t}${n}` : t
                    }
                    pushState(e, t, n, r) {
                        const s = this.prepareExternalUrl(n + bl.normalizeQueryParams(r));
                        this._platformLocation.pushState(e, t, s)
                    }
                    replaceState(e, t, n, r) {
                        const s = this.prepareExternalUrl(n + bl.normalizeQueryParams(r));
                        this._platformLocation.replaceState(e, t, s)
                    }
                    forward() {
                        this._platformLocation.forward()
                    }
                    back() {
                        this._platformLocation.back()
                    }
                }
                const Sl = function() {
                        var e = {
                            Zero: 0,
                            One: 1,
                            Two: 2,
                            Few: 3,
                            Many: 4,
                            Other: 5
                        };
                        return e[e.Zero] = "Zero", e[e.One] = "One", e[e.Two] = "Two", e[e.Few] = "Few", e[e.Many] = "Many", e[e.Other] = "Other", e
                    }(),
                    El = function(e) {
                        return function(e) {
                            const t = e.toLowerCase().replace(/_/g, "-");
                            let n = Cs[t];
                            if (n) return n;
                            const r = t.split("-")[0];
                            if (n = Cs[r]) return n;
                            if ("en" === r) return Es;
                            throw new Error(`Missing locale data for the locale "${e}".`)
                        }(e)[xs.PluralCase]
                    },
                    Tl = new Ee("UseV4Plurals");
                class kl {}
                class Rl extends kl {
                    constructor(e, t) {
                        super(), this.locale = e, this.deprecatedPluralFn = t
                    }
                    getPluralCategory(e, t) {
                        switch (this.deprecatedPluralFn ? this.deprecatedPluralFn(t || this.locale, e) : El(t || this.locale)(e)) {
                            case Sl.Zero:
                                return "zero";
                            case Sl.One:
                                return "one";
                            case Sl.Two:
                                return "two";
                            case Sl.Few:
                                return "few";
                            case Sl.Many:
                                return "many";
                            default:
                                return "other"
                        }
                    }
                }

                function Il(e, t) {
                    t = encodeURIComponent(t);
                    for (const n of e.split(";")) {
                        const e = n.indexOf("="),
                            [r, s] = -1 == e ? [n, ""] : [n.slice(0, e), n.slice(e + 1)];
                        if (r.trim() === t) return decodeURIComponent(s)
                    }
                    return null
                }
                class Al {
                    constructor(e, t, n, r) {
                        this.$implicit = e, this.ngForOf = t, this.index = n, this.count = r
                    }
                    get first() {
                        return 0 === this.index
                    }
                    get last() {
                        return this.index === this.count - 1
                    }
                    get even() {
                        return this.index % 2 == 0
                    }
                    get odd() {
                        return !this.even
                    }
                }
                class Nl {
                    constructor(e, t, n) {
                        this._viewContainer = e, this._template = t, this._differs = n, this._ngForOfDirty = !0, this._differ = null
                    }
                    set ngForOf(e) {
                        this._ngForOf = e, this._ngForOfDirty = !0
                    }
                    set ngForTrackBy(e) {
                        nt() && null != e && "function" != typeof e && console && console.warn && console.warn(`trackBy must be a function, but received ${JSON.stringify(e)}. ` + "See https://angular.io/docs/ts/latest/api/common/index/NgFor-directive.html#!#change-propagation for more information."), this._trackByFn = e
                    }
                    get ngForTrackBy() {
                        return this._trackByFn
                    }
                    set ngForTemplate(e) {
                        e && (this._template = e)
                    }
                    ngDoCheck() {
                        if (this._ngForOfDirty) {
                            this._ngForOfDirty = !1;
                            const n = this._ngForOf;
                            if (!this._differ && n) try {
                                this._differ = this._differs.find(n).create(this.ngForTrackBy)
                            } catch (t) {
                                throw new Error(`Cannot find a differ supporting object '${n}' of type '${e=n,e.name||typeof e}'. NgFor only supports binding to Iterables such as Arrays.`)
                            }
                        }
                        var e;
                        if (this._differ) {
                            const e = this._differ.diff(this._ngForOf);
                            e && this._applyChanges(e)
                        }
                    }
                    _applyChanges(e) {
                        const t = [];
                        e.forEachOperation((e, n, r) => {
                            if (null == e.previousIndex) {
                                const n = this._viewContainer.createEmbeddedView(this._template, new Al(null, this._ngForOf, -1, -1), null === r ? void 0 : r),
                                    s = new Pl(e, n);
                                t.push(s)
                            } else if (null == r) this._viewContainer.remove(null === n ? void 0 : n);
                            else if (null !== n) {
                                const s = this._viewContainer.get(n);
                                this._viewContainer.move(s, r);
                                const i = new Pl(e, s);
                                t.push(i)
                            }
                        });
                        for (let n = 0; n < t.length; n++) this._perViewChange(t[n].view, t[n].record);
                        for (let n = 0, r = this._viewContainer.length; n < r; n++) {
                            const e = this._viewContainer.get(n);
                            e.context.index = n, e.context.count = r, e.context.ngForOf = this._ngForOf
                        }
                        e.forEachIdentityChange(e => {
                            this._viewContainer.get(e.currentIndex).context.$implicit = e.item
                        })
                    }
                    _perViewChange(e, t) {
                        e.context.$implicit = t.item
                    }
                    static ngTemplateContextGuard(e, t) {
                        return !0
                    }
                }
                class Pl {
                    constructor(e, t) {
                        this.record = e, this.view = t
                    }
                }
                class Ol {
                    constructor(e, t) {
                        this._viewContainer = e, this._context = new Dl, this._thenTemplateRef = null, this._elseTemplateRef = null, this._thenViewRef = null, this._elseViewRef = null, this._thenTemplateRef = t
                    }
                    set ngIf(e) {
                        this._context.$implicit = this._context.ngIf = e, this._updateView()
                    }
                    set ngIfThen(e) {
                        Ml("ngIfThen", e), this._thenTemplateRef = e, this._thenViewRef = null, this._updateView()
                    }
                    set ngIfElse(e) {
                        Ml("ngIfElse", e), this._elseTemplateRef = e, this._elseViewRef = null, this._updateView()
                    }
                    _updateView() {
                        this._context.$implicit ? this._thenViewRef || (this._viewContainer.clear(), this._elseViewRef = null, this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context))) : this._elseViewRef || (this._viewContainer.clear(), this._thenViewRef = null, this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)))
                    }
                }
                class Dl {
                    constructor() {
                        this.$implicit = null, this.ngIf = null
                    }
                }

                function Ml(e, t) {
                    if (t && !t.createEmbeddedView) throw new Error(`${e} must be a TemplateRef, but received '${me(t)}'.`)
                }
                class Ll {}
                const Ul = new Ee("DocumentToken"),
                    jl = "server";
                let Vl = (() => {
                    class e {}
                    return e.ngInjectableDef = pe({
                        token: e,
                        providedIn: "root",
                        factory: () => new Hl(je(Ul), window, je(Xe))
                    }), e
                })();
                class Hl {
                    constructor(e, t, n) {
                        this.document = e, this.window = t, this.errorHandler = n, this.offset = () => [0, 0]
                    }
                    setOffset(e) {
                        this.offset = Array.isArray(e) ? () => e : e
                    }
                    getScrollPosition() {
                        return this.supportScrollRestoration() ? [this.window.scrollX, this.window.scrollY] : [0, 0]
                    }
                    scrollToPosition(e) {
                        this.supportScrollRestoration() && this.window.scrollTo(e[0], e[1])
                    }
                    scrollToAnchor(e) {
                        if (this.supportScrollRestoration()) {
                            e = this.window.CSS && this.window.CSS.escape ? this.window.CSS.escape(e) : e.replace(/(\"|\'\ |:|\.|\[|\]|,|=)/g, "\\$1");
                            try {
                                const t = this.document.querySelector(`#${e}`);
                                if (t) return void this.scrollToElement(t);
                                const n = this.document.querySelector(`[name='${e}']`);
                                if (n) return void this.scrollToElement(n)
                            } catch (t) {
                                this.errorHandler.handleError(t)
                            }
                        }
                    }
                    setHistoryScrollRestoration(e) {
                        if (this.supportScrollRestoration()) {
                            const t = this.window.history;
                            t && t.scrollRestoration && (t.scrollRestoration = e)
                        }
                    }
                    scrollToElement(e) {
                        const t = e.getBoundingClientRect(),
                            n = t.left + this.window.pageXOffset,
                            r = t.top + this.window.pageYOffset,
                            s = this.offset();
                        this.window.scrollTo(n - s[0], r - s[1])
                    }
                    supportScrollRestoration() {
                        try {
                            return !!this.window && !!this.window.scrollTo
                        } catch (e) {
                            return !1
                        }
                    }
                }
                const Fl = new _(e => e.complete());

                function zl(e) {
                    return e ? function(e) {
                        return new _(t => e.schedule(() => t.complete()))
                    }(e) : Fl
                }

                function $l(e) {
                    const t = new _(t => {
                        t.next(e), t.complete()
                    });
                    return t._isScalar = !0, t.value = e, t
                }

                function Bl(...e) {
                    let t = e[e.length - 1];
                    switch (I(t) ? e.pop() : t = void 0, e.length) {
                        case 0:
                            return zl(t);
                        case 1:
                            return t ? q(e, t) : $l(e[0]);
                        default:
                            return q(e, t)
                    }
                }
                class ql extends k {
                    constructor(e) {
                        super(), this._value = e
                    }
                    get value() {
                        return this.getValue()
                    }
                    _subscribe(e) {
                        const t = super._subscribe(e);
                        return t && !t.closed && e.next(this._value), t
                    }
                    getValue() {
                        if (this.hasError) throw this.thrownError;
                        if (this.closed) throw new S;
                        return this._value
                    }
                    next(e) {
                        super.next(this._value = e)
                    }
                }

                function Zl() {
                    return Error.call(this), this.message = "no elements in sequence", this.name = "EmptyError", this
                }
                Zl.prototype = Object.create(Error.prototype);
                const Wl = Zl,
                    Gl = {};
                class Ql {
                    constructor(e) {
                        this.resultSelector = e
                    }
                    call(e, t) {
                        return t.subscribe(new Kl(e, this.resultSelector))
                    }
                }
                class Kl extends F {
                    constructor(e, t) {
                        super(e), this.resultSelector = t, this.active = 0, this.values = [], this.observables = []
                    }
                    _next(e) {
                        this.values.push(Gl), this.observables.push(e)
                    }
                    _complete() {
                        const e = this.observables,
                            t = e.length;
                        if (0 === t) this.destination.complete();
                        else {
                            this.active = t, this.toRespond = t;
                            for (let n = 0; n < t; n++) {
                                const t = e[n];
                                this.add(H(this, t, t, n))
                            }
                        }
                    }
                    notifyComplete(e) {
                        0 == (this.active -= 1) && this.destination.complete()
                    }
                    notifyNext(e, t, n, r, s) {
                        const i = this.values,
                            o = this.toRespond ? i[n] === Gl ? --this.toRespond : this.toRespond : 0;
                        i[n] = t, 0 === o && (this.resultSelector ? this._tryResultSelector(i) : this.destination.next(i.slice()))
                    }
                    _tryResultSelector(e) {
                        let t;
                        try {
                            t = this.resultSelector.apply(this, e)
                        } catch (n) {
                            return void this.destination.error(n)
                        }
                        this.destination.next(t)
                    }
                }

                function Jl(e) {
                    return new _(t => {
                        let n;
                        try {
                            n = e()
                        } catch (r) {
                            return void t.error(r)
                        }
                        return (n ? Z(n) : zl()).subscribe(t)
                    })
                }

                function Yl() {
                    return J(1)
                }

                function Xl(e, t) {
                    return function(n) {
                        return n.lift(new ea(e, t))
                    }
                }
                class ea {
                    constructor(e, t) {
                        this.predicate = e, this.thisArg = t
                    }
                    call(e, t) {
                        return t.subscribe(new ta(e, this.predicate, this.thisArg))
                    }
                }
                class ta extends g {
                    constructor(e, t, n) {
                        super(e), this.predicate = t, this.thisArg = n, this.count = 0
                    }
                    _next(e) {
                        let t;
                        try {
                            t = this.predicate.call(this.thisArg, e, this.count++)
                        } catch (n) {
                            return void this.destination.error(n)
                        }
                        t && this.destination.next(e)
                    }
                }

                function na() {
                    return Error.call(this), this.message = "argument out of range", this.name = "ArgumentOutOfRangeError", this
                }
                na.prototype = Object.create(Error.prototype);
                const ra = na;

                function sa(e) {
                    return function(t) {
                        return 0 === e ? zl() : t.lift(new ia(e))
                    }
                }
                class ia {
                    constructor(e) {
                        if (this.total = e, this.total < 0) throw new ra
                    }
                    call(e, t) {
                        return t.subscribe(new oa(e, this.total))
                    }
                }
                class oa extends g {
                    constructor(e, t) {
                        super(e), this.total = t, this.ring = new Array, this.count = 0
                    }
                    _next(e) {
                        const t = this.ring,
                            n = this.total,
                            r = this.count++;
                        t.length < n ? t.push(e) : t[r % n] = e
                    }
                    _complete() {
                        const e = this.destination;
                        let t = this.count;
                        if (t > 0) {
                            const n = this.count >= this.total ? this.total : this.count,
                                r = this.ring;
                            for (let s = 0; s < n; s++) {
                                const s = t++ % n;
                                e.next(r[s])
                            }
                        }
                        e.complete()
                    }
                }

                function la(e, t, n) {
                    return function(r) {
                        return r.lift(new aa(e, t, n))
                    }
                }
                class aa {
                    constructor(e, t, n) {
                        this.nextOrObserver = e, this.error = t, this.complete = n
                    }
                    call(e, t) {
                        return t.subscribe(new ua(e, this.nextOrObserver, this.error, this.complete))
                    }
                }
                class ua extends g {
                    constructor(e, t, n, s) {
                        super(e), this._tapNext = y, this._tapError = y, this._tapComplete = y, this._tapError = n || y, this._tapComplete = s || y, r(t) ? (this._context = this, this._tapNext = t) : t && (this._context = t, this._tapNext = t.next || y, this._tapError = t.error || y, this._tapComplete = t.complete || y)
                    }
                    _next(e) {
                        try {
                            this._tapNext.call(this._context, e)
                        } catch (t) {
                            return void this.destination.error(t)
                        }
                        this.destination.next(e)
                    }
                    _error(e) {
                        try {
                            this._tapError.call(this._context, e)
                        } catch (e) {
                            return void this.destination.error(e)
                        }
                        this.destination.error(e)
                    }
                    _complete() {
                        try {
                            this._tapComplete.call(this._context)
                        } catch (e) {
                            return void this.destination.error(e)
                        }
                        return this.destination.complete()
                    }
                }
                const ca = (e = ha) => la({
                    hasValue: !1,
                    next() {
                        this.hasValue = !0
                    },
                    complete() {
                        if (!this.hasValue) throw e()
                    }
                });

                function ha() {
                    return new Wl
                }

                function da(e = null) {
                    return t => t.lift(new pa(e))
                }
                class pa {
                    constructor(e) {
                        this.defaultValue = e
                    }
                    call(e, t) {
                        return t.subscribe(new fa(e, this.defaultValue))
                    }
                }
                class fa extends g {
                    constructor(e, t) {
                        super(e), this.defaultValue = t, this.isEmpty = !0
                    }
                    _next(e) {
                        this.isEmpty = !1, this.destination.next(e)
                    }
                    _complete() {
                        this.isEmpty && this.destination.next(this.defaultValue), this.destination.complete()
                    }
                }

                function ga(e, t) {
                    const n = arguments.length >= 2;
                    return r => r.pipe(e ? Xl((t, n) => e(t, n, r)) : K, sa(1), n ? da(t) : ca(() => new Wl))
                }

                function ma(e) {
                    return function(t) {
                        const n = new va(e),
                            r = t.lift(n);
                        return n.caught = r
                    }
                }
                class va {
                    constructor(e) {
                        this.selector = e
                    }
                    call(e, t) {
                        return t.subscribe(new ya(e, this.selector, this.caught))
                    }
                }
                class ya extends F {
                    constructor(e, t, n) {
                        super(e), this.selector = t, this.caught = n
                    }
                    error(e) {
                        if (!this.isStopped) {
                            let n;
                            try {
                                n = this.selector(e, this.caught)
                            } catch (t) {
                                return void super.error(t)
                            }
                            this._unsubscribeAndRecycle();
                            const r = new A(this, void 0, void 0);
                            this.add(r), H(this, n, void 0, void 0, r)
                        }
                    }
                }

                function wa(e) {
                    return t => 0 === e ? zl() : t.lift(new ba(e))
                }
                class ba {
                    constructor(e) {
                        if (this.total = e, this.total < 0) throw new ra
                    }
                    call(e, t) {
                        return t.subscribe(new _a(e, this.total))
                    }
                }
                class _a extends g {
                    constructor(e, t) {
                        super(e), this.total = t, this.count = 0
                    }
                    _next(e) {
                        const t = this.total,
                            n = ++this.count;
                        n <= t && (this.destination.next(e), n === t && (this.destination.complete(), this.unsubscribe()))
                    }
                }

                function Ca(e, t) {
                    const n = arguments.length >= 2;
                    return r => r.pipe(e ? Xl((t, n) => e(t, n, r)) : K, wa(1), n ? da(t) : ca(() => new Wl))
                }
                class xa {
                    constructor(e, t, n) {
                        this.predicate = e, this.thisArg = t, this.source = n
                    }
                    call(e, t) {
                        return t.subscribe(new Sa(e, this.predicate, this.thisArg, this.source))
                    }
                }
                class Sa extends g {
                    constructor(e, t, n, r) {
                        super(e), this.predicate = t, this.thisArg = n, this.source = r, this.index = 0, this.thisArg = n || this
                    }
                    notifyComplete(e) {
                        this.destination.next(e), this.destination.complete()
                    }
                    _next(e) {
                        let t = !1;
                        try {
                            t = this.predicate.call(this.thisArg, e, this.index++, this.source)
                        } catch (n) {
                            return void this.destination.error(n)
                        }
                        t || this.notifyComplete(!1)
                    }
                    _complete() {
                        this.notifyComplete(!0)
                    }
                }

                function Ea(e, t) {
                    return "function" == typeof t ? n => n.pipe(Ea((n, r) => Z(e(n, r)).pipe(z((e, s) => t(n, e, r, s))))) : t => t.lift(new Ta(e))
                }
                class Ta {
                    constructor(e) {
                        this.project = e
                    }
                    call(e, t) {
                        return t.subscribe(new ka(e, this.project))
                    }
                }
                class ka extends F {
                    constructor(e, t) {
                        super(e), this.project = t, this.index = 0
                    }
                    _next(e) {
                        let t;
                        const n = this.index++;
                        try {
                            t = this.project(e, n)
                        } catch (r) {
                            return void this.destination.error(r)
                        }
                        this._innerSub(t, e, n)
                    }
                    _innerSub(e, t, n) {
                        const r = this.innerSubscription;
                        r && r.unsubscribe();
                        const s = new A(this, void 0, void 0);
                        this.destination.add(s), this.innerSubscription = H(this, e, t, n, s)
                    }
                    _complete() {
                        const {
                            innerSubscription: e
                        } = this;
                        e && !e.closed || super._complete(), this.unsubscribe()
                    }
                    _unsubscribe() {
                        this.innerSubscription = null
                    }
                    notifyComplete(e) {
                        this.destination.remove(e), this.innerSubscription = null, this.isStopped && super._complete()
                    }
                    notifyNext(e, t, n, r, s) {
                        this.destination.next(t)
                    }
                }

                function Ra(e, t) {
                    let n = !1;
                    return arguments.length >= 2 && (n = !0),
                        function(r) {
                            return r.lift(new Ia(e, t, n))
                        }
                }
                class Ia {
                    constructor(e, t, n = !1) {
                        this.accumulator = e, this.seed = t, this.hasSeed = n
                    }
                    call(e, t) {
                        return t.subscribe(new Aa(e, this.accumulator, this.seed, this.hasSeed))
                    }
                }
                class Aa extends g {
                    constructor(e, t, n, r) {
                        super(e), this.accumulator = t, this._seed = n, this.hasSeed = r, this.index = 0
                    }
                    get seed() {
                        return this._seed
                    }
                    set seed(e) {
                        this.hasSeed = !0, this._seed = e
                    }
                    _next(e) {
                        if (this.hasSeed) return this._tryNext(e);
                        this.seed = e, this.destination.next(e)
                    }
                    _tryNext(e) {
                        const t = this.index++;
                        let n;
                        try {
                            n = this.accumulator(this.seed, e, t)
                        } catch (r) {
                            this.destination.error(r)
                        }
                        this.seed = n, this.destination.next(n)
                    }
                }

                function Na(e, t) {
                    return W(e, t, 1)
                }
                class Pa {
                    constructor(e) {
                        this.callback = e
                    }
                    call(e, t) {
                        return t.subscribe(new Oa(e, this.callback))
                    }
                }
                class Oa extends g {
                    constructor(e, t) {
                        super(e), this.add(new d(t))
                    }
                }
                let Da = null;

                function Ma() {
                    return Da
                }
                class La {
                    constructor() {
                        this.resourceLoaderType = null
                    }
                    get attrToPropMap() {
                        return this._attrToPropMap
                    }
                    set attrToPropMap(e) {
                        this._attrToPropMap = e
                    }
                }
                class Ua extends La {
                    constructor() {
                        super(), this._animationPrefix = null, this._transitionEnd = null;
                        try {
                            const e = this.createElement("div", document);
                            if (null != this.getStyle(e, "animationName")) this._animationPrefix = "";
                            else {
                                const t = ["Webkit", "Moz", "O", "ms"];
                                for (let n = 0; n < t.length; n++)
                                    if (null != this.getStyle(e, t[n] + "AnimationName")) {
                                        this._animationPrefix = "-" + t[n].toLowerCase() + "-";
                                        break
                                    }
                            }
                            const t = {
                                WebkitTransition: "webkitTransitionEnd",
                                MozTransition: "transitionend",
                                OTransition: "oTransitionEnd otransitionend",
                                transition: "transitionend"
                            };
                            Object.keys(t).forEach(n => {
                                null != this.getStyle(e, n) && (this._transitionEnd = t[n])
                            })
                        } catch (e) {
                            this._animationPrefix = null, this._transitionEnd = null
                        }
                    }
                    getDistributedNodes(e) {
                        return e.getDistributedNodes()
                    }
                    resolveAndSetHref(e, t, n) {
                        e.href = null == n ? t : t + "/../" + n
                    }
                    supportsDOMEvents() {
                        return !0
                    }
                    supportsNativeShadowDOM() {
                        return "function" == typeof document.body.createShadowRoot
                    }
                    getAnimationPrefix() {
                        return this._animationPrefix ? this._animationPrefix : ""
                    }
                    getTransitionEnd() {
                        return this._transitionEnd ? this._transitionEnd : ""
                    }
                    supportsAnimation() {
                        return null != this._animationPrefix && null != this._transitionEnd
                    }
                }
                const ja = {
                        class: "className",
                        innerHtml: "innerHTML",
                        readonly: "readOnly",
                        tabindex: "tabIndex"
                    },
                    Va = 3,
                    Ha = {
                        "\b": "Backspace",
                        "\t": "Tab",
                        "\x7f": "Delete",
                        "\x1b": "Escape",
                        Del: "Delete",
                        Esc: "Escape",
                        Left: "ArrowLeft",
                        Right: "ArrowRight",
                        Up: "ArrowUp",
                        Down: "ArrowDown",
                        Menu: "ContextMenu",
                        Scroll: "ScrollLock",
                        Win: "OS"
                    },
                    Fa = {
                        A: "1",
                        B: "2",
                        C: "3",
                        D: "4",
                        E: "5",
                        F: "6",
                        G: "7",
                        H: "8",
                        I: "9",
                        J: "*",
                        K: "+",
                        M: "-",
                        N: ".",
                        O: "/",
                        "`": "0",
                        "\x90": "NumLock"
                    },
                    za = (() => {
                        if (Se.Node) return Se.Node.prototype.contains || function(e) {
                            return !!(16 & this.compareDocumentPosition(e))
                        }
                    })();
                class $a extends Ua {
                    parse(e) {
                        throw new Error("parse not implemented")
                    }
                    static makeCurrent() {
                        var e;
                        e = new $a, Da || (Da = e)
                    }
                    hasProperty(e, t) {
                        return t in e
                    }
                    setProperty(e, t, n) {
                        e[t] = n
                    }
                    getProperty(e, t) {
                        return e[t]
                    }
                    invoke(e, t, n) {
                        e[t](...n)
                    }
                    logError(e) {
                        window.console && (console.error ? console.error(e) : console.log(e))
                    }
                    log(e) {
                        window.console && window.console.log && window.console.log(e)
                    }
                    logGroup(e) {
                        window.console && window.console.group && window.console.group(e)
                    }
                    logGroupEnd() {
                        window.console && window.console.groupEnd && window.console.groupEnd()
                    }
                    get attrToPropMap() {
                        return ja
                    }
                    contains(e, t) {
                        return za.call(e, t)
                    }
                    querySelector(e, t) {
                        return e.querySelector(t)
                    }
                    querySelectorAll(e, t) {
                        return e.querySelectorAll(t)
                    }
                    on(e, t, n) {
                        e.addEventListener(t, n, !1)
                    }
                    onAndCancel(e, t, n) {
                        return e.addEventListener(t, n, !1), () => {
                            e.removeEventListener(t, n, !1)
                        }
                    }
                    dispatchEvent(e, t) {
                        e.dispatchEvent(t)
                    }
                    createMouseEvent(e) {
                        const t = this.getDefaultDocument().createEvent("MouseEvent");
                        return t.initEvent(e, !0, !0), t
                    }
                    createEvent(e) {
                        const t = this.getDefaultDocument().createEvent("Event");
                        return t.initEvent(e, !0, !0), t
                    }
                    preventDefault(e) {
                        e.preventDefault(), e.returnValue = !1
                    }
                    isPrevented(e) {
                        return e.defaultPrevented || null != e.returnValue && !e.returnValue
                    }
                    getInnerHTML(e) {
                        return e.innerHTML
                    }
                    getTemplateContent(e) {
                        return "content" in e && this.isTemplateElement(e) ? e.content : null
                    }
                    getOuterHTML(e) {
                        return e.outerHTML
                    }
                    nodeName(e) {
                        return e.nodeName
                    }
                    nodeValue(e) {
                        return e.nodeValue
                    }
                    type(e) {
                        return e.type
                    }
                    content(e) {
                        return this.hasProperty(e, "content") ? e.content : e
                    }
                    firstChild(e) {
                        return e.firstChild
                    }
                    nextSibling(e) {
                        return e.nextSibling
                    }
                    parentElement(e) {
                        return e.parentNode
                    }
                    childNodes(e) {
                        return e.childNodes
                    }
                    childNodesAsList(e) {
                        const t = e.childNodes,
                            n = new Array(t.length);
                        for (let r = 0; r < t.length; r++) n[r] = t[r];
                        return n
                    }
                    clearNodes(e) {
                        for (; e.firstChild;) e.removeChild(e.firstChild)
                    }
                    appendChild(e, t) {
                        e.appendChild(t)
                    }
                    removeChild(e, t) {
                        e.removeChild(t)
                    }
                    replaceChild(e, t, n) {
                        e.replaceChild(t, n)
                    }
                    remove(e) {
                        return e.parentNode && e.parentNode.removeChild(e), e
                    }
                    insertBefore(e, t, n) {
                        e.insertBefore(n, t)
                    }
                    insertAllBefore(e, t, n) {
                        n.forEach(n => e.insertBefore(n, t))
                    }
                    insertAfter(e, t, n) {
                        e.insertBefore(n, t.nextSibling)
                    }
                    setInnerHTML(e, t) {
                        e.innerHTML = t
                    }
                    getText(e) {
                        return e.textContent
                    }
                    setText(e, t) {
                        e.textContent = t
                    }
                    getValue(e) {
                        return e.value
                    }
                    setValue(e, t) {
                        e.value = t
                    }
                    getChecked(e) {
                        return e.checked
                    }
                    setChecked(e, t) {
                        e.checked = t
                    }
                    createComment(e) {
                        return this.getDefaultDocument().createComment(e)
                    }
                    createTemplate(e) {
                        const t = this.getDefaultDocument().createElement("template");
                        return t.innerHTML = e, t
                    }
                    createElement(e, t) {
                        return (t = t || this.getDefaultDocument()).createElement(e)
                    }
                    createElementNS(e, t, n) {
                        return (n = n || this.getDefaultDocument()).createElementNS(e, t)
                    }
                    createTextNode(e, t) {
                        return (t = t || this.getDefaultDocument()).createTextNode(e)
                    }
                    createScriptTag(e, t, n) {
                        const r = (n = n || this.getDefaultDocument()).createElement("SCRIPT");
                        return r.setAttribute(e, t), r
                    }
                    createStyleElement(e, t) {
                        const n = (t = t || this.getDefaultDocument()).createElement("style");
                        return this.appendChild(n, this.createTextNode(e, t)), n
                    }
                    createShadowRoot(e) {
                        return e.createShadowRoot()
                    }
                    getShadowRoot(e) {
                        return e.shadowRoot
                    }
                    getHost(e) {
                        return e.host
                    }
                    clone(e) {
                        return e.cloneNode(!0)
                    }
                    getElementsByClassName(e, t) {
                        return e.getElementsByClassName(t)
                    }
                    getElementsByTagName(e, t) {
                        return e.getElementsByTagName(t)
                    }
                    classList(e) {
                        return Array.prototype.slice.call(e.classList, 0)
                    }
                    addClass(e, t) {
                        e.classList.add(t)
                    }
                    removeClass(e, t) {
                        e.classList.remove(t)
                    }
                    hasClass(e, t) {
                        return e.classList.contains(t)
                    }
                    setStyle(e, t, n) {
                        e.style[t] = n
                    }
                    removeStyle(e, t) {
                        e.style[t] = ""
                    }
                    getStyle(e, t) {
                        return e.style[t]
                    }
                    hasStyle(e, t, n) {
                        const r = this.getStyle(e, t) || "";
                        return n ? r == n : r.length > 0
                    }
                    tagName(e) {
                        return e.tagName
                    }
                    attributeMap(e) {
                        const t = new Map,
                            n = e.attributes;
                        for (let r = 0; r < n.length; r++) {
                            const e = n.item(r);
                            t.set(e.name, e.value)
                        }
                        return t
                    }
                    hasAttribute(e, t) {
                        return e.hasAttribute(t)
                    }
                    hasAttributeNS(e, t, n) {
                        return e.hasAttributeNS(t, n)
                    }
                    getAttribute(e, t) {
                        return e.getAttribute(t)
                    }
                    getAttributeNS(e, t, n) {
                        return e.getAttributeNS(t, n)
                    }
                    setAttribute(e, t, n) {
                        e.setAttribute(t, n)
                    }
                    setAttributeNS(e, t, n, r) {
                        e.setAttributeNS(t, n, r)
                    }
                    removeAttribute(e, t) {
                        e.removeAttribute(t)
                    }
                    removeAttributeNS(e, t, n) {
                        e.removeAttributeNS(t, n)
                    }
                    templateAwareRoot(e) {
                        return this.isTemplateElement(e) ? this.content(e) : e
                    }
                    createHtmlDocument() {
                        return document.implementation.createHTMLDocument("fakeTitle")
                    }
                    getDefaultDocument() {
                        return document
                    }
                    getBoundingClientRect(e) {
                        try {
                            return e.getBoundingClientRect()
                        } catch (t) {
                            return {
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                width: 0,
                                height: 0
                            }
                        }
                    }
                    getTitle(e) {
                        return e.title
                    }
                    setTitle(e, t) {
                        e.title = t || ""
                    }
                    elementMatches(e, t) {
                        return !!this.isElementNode(e) && (e.matches && e.matches(t) || e.msMatchesSelector && e.msMatchesSelector(t) || e.webkitMatchesSelector && e.webkitMatchesSelector(t))
                    }
                    isTemplateElement(e) {
                        return this.isElementNode(e) && "TEMPLATE" === e.nodeName
                    }
                    isTextNode(e) {
                        return e.nodeType === Node.TEXT_NODE
                    }
                    isCommentNode(e) {
                        return e.nodeType === Node.COMMENT_NODE
                    }
                    isElementNode(e) {
                        return e.nodeType === Node.ELEMENT_NODE
                    }
                    hasShadowRoot(e) {
                        return null != e.shadowRoot && e instanceof HTMLElement
                    }
                    isShadowRoot(e) {
                        return e instanceof DocumentFragment
                    }
                    importIntoDoc(e) {
                        return document.importNode(this.templateAwareRoot(e), !0)
                    }
                    adoptNode(e) {
                        return document.adoptNode(e)
                    }
                    getHref(e) {
                        return e.getAttribute("href")
                    }
                    getEventKey(e) {
                        let t = e.key;
                        if (null == t) {
                            if (null == (t = e.keyIdentifier)) return "Unidentified";
                            t.startsWith("U+") && (t = String.fromCharCode(parseInt(t.substring(2), 16)), e.location === Va && Fa.hasOwnProperty(t) && (t = Fa[t]))
                        }
                        return Ha[t] || t
                    }
                    getGlobalEventTarget(e, t) {
                        return "window" === t ? window : "document" === t ? e : "body" === t ? e.body : null
                    }
                    getHistory() {
                        return window.history
                    }
                    getLocation() {
                        return window.location
                    }
                    getBaseHref(e) {
                        const t = qa || (qa = document.querySelector("base")) ? qa.getAttribute("href") : null;
                        return null == t ? null : (n = t, Ba || (Ba = document.createElement("a")), Ba.setAttribute("href", n), "/" === Ba.pathname.charAt(0) ? Ba.pathname : "/" + Ba.pathname);
                        var n
                    }
                    resetBaseElement() {
                        qa = null
                    }
                    getUserAgent() {
                        return window.navigator.userAgent
                    }
                    setData(e, t, n) {
                        this.setAttribute(e, "data-" + t, n)
                    }
                    getData(e, t) {
                        return this.getAttribute(e, "data-" + t)
                    }
                    getComputedStyle(e) {
                        return getComputedStyle(e)
                    }
                    supportsWebAnimation() {
                        return "function" == typeof Element.prototype.animate
                    }
                    performanceNow() {
                        return window.performance && window.performance.now ? window.performance.now() : (new Date).getTime()
                    }
                    supportsCookies() {
                        return !0
                    }
                    getCookie(e) {
                        return Il(document.cookie, e)
                    }
                    setCookie(e, t) {
                        document.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                    }
                }
                let Ba, qa = null;

                function Za() {
                    return !!window.history.pushState
                }
                const Wa = new Ee("TRANSITION_ID"),
                    Ga = [{
                        provide: Ps,
                        useFactory: function(e, t, n) {
                            return () => {
                                n.get(Os).donePromise.then(() => {
                                    const n = Ma();
                                    Array.prototype.slice.apply(n.querySelectorAll(t, "style[ng-transition]")).filter(t => n.getAttribute(t, "ng-transition") === e).forEach(e => n.remove(e))
                                })
                            }
                        },
                        deps: [Wa, Ul, Dt],
                        multi: !0
                    }];
                class Qa {
                    static init() {
                        var e;
                        e = new Qa, mi = e
                    }
                    addToWindow(e) {
                        Se.getAngularTestability = (t, n = !0) => {
                            const r = e.findTestabilityInTree(t, n);
                            if (null == r) throw new Error("Could not find testability for element.");
                            return r
                        }, Se.getAllAngularTestabilities = () => e.getAllTestabilities(), Se.getAllAngularRootElements = () => e.getAllRootElements(), Se.frameworkStabilizers || (Se.frameworkStabilizers = []), Se.frameworkStabilizers.push(e => {
                            const t = Se.getAllAngularTestabilities();
                            let n = t.length,
                                r = !1;
                            const s = function(t) {
                                r = r || t, 0 == --n && e(r)
                            };
                            t.forEach((function(e) {
                                e.whenStable(s)
                            }))
                        })
                    }
                    findTestabilityInTree(e, t, n) {
                        if (null == t) return null;
                        const r = e.getTestability(t);
                        return null != r ? r : n ? Ma().isShadowRoot(t) ? this.findTestabilityInTree(e, Ma().getHost(t), !0) : this.findTestabilityInTree(e, Ma().parentElement(t), !0) : null
                    }
                }

                function Ka(e, t) {
                    "undefined" != typeof COMPILED && COMPILED || ((Se.ng = Se.ng || {})[e] = t)
                }
                const Ja = (() => ({
                    ApplicationRef: Ei,
                    NgZone: ii
                }))();

                function Ya(e) {
                    return ji(e)
                }
                const Xa = new Ee("EventManagerPlugins");
                class eu {
                    constructor(e, t) {
                        this._zone = t, this._eventNameToPlugin = new Map, e.forEach(e => e.manager = this), this._plugins = e.slice().reverse()
                    }
                    addEventListener(e, t, n) {
                        return this._findPluginFor(t).addEventListener(e, t, n)
                    }
                    addGlobalEventListener(e, t, n) {
                        return this._findPluginFor(t).addGlobalEventListener(e, t, n)
                    }
                    getZone() {
                        return this._zone
                    }
                    _findPluginFor(e) {
                        const t = this._eventNameToPlugin.get(e);
                        if (t) return t;
                        const n = this._plugins;
                        for (let r = 0; r < n.length; r++) {
                            const t = n[r];
                            if (t.supports(e)) return this._eventNameToPlugin.set(e, t), t
                        }
                        throw new Error(`No event manager plugin found for event ${e}`)
                    }
                }
                class tu {
                    constructor(e) {
                        this._doc = e
                    }
                    addGlobalEventListener(e, t, n) {
                        const r = Ma().getGlobalEventTarget(this._doc, e);
                        if (!r) throw new Error(`Unsupported event target ${r} for event ${t}`);
                        return this.addEventListener(r, t, n)
                    }
                }
                class nu {
                    constructor() {
                        this._stylesSet = new Set
                    }
                    addStyles(e) {
                        const t = new Set;
                        e.forEach(e => {
                            this._stylesSet.has(e) || (this._stylesSet.add(e), t.add(e))
                        }), this.onStylesAdded(t)
                    }
                    onStylesAdded(e) {}
                    getAllStyles() {
                        return Array.from(this._stylesSet)
                    }
                }
                class ru extends nu {
                    constructor(e) {
                        super(), this._doc = e, this._hostNodes = new Set, this._styleNodes = new Set, this._hostNodes.add(e.head)
                    }
                    _addStylesToHost(e, t) {
                        e.forEach(e => {
                            const n = this._doc.createElement("style");
                            n.textContent = e, this._styleNodes.add(t.appendChild(n))
                        })
                    }
                    addHost(e) {
                        this._addStylesToHost(this._stylesSet, e), this._hostNodes.add(e)
                    }
                    removeHost(e) {
                        this._hostNodes.delete(e)
                    }
                    onStylesAdded(e) {
                        this._hostNodes.forEach(t => this._addStylesToHost(e, t))
                    }
                    ngOnDestroy() {
                        this._styleNodes.forEach(e => Ma().remove(e))
                    }
                }
                const su = {
                        svg: "http://www.w3.org/2000/svg",
                        xhtml: "http://www.w3.org/1999/xhtml",
                        xlink: "http://www.w3.org/1999/xlink",
                        xml: "http://www.w3.org/XML/1998/namespace",
                        xmlns: "http://www.w3.org/2000/xmlns/"
                    },
                    iu = /%COMP%/g,
                    ou = "_nghost-%COMP%",
                    lu = "_ngcontent-%COMP%";

                function au(e, t, n) {
                    for (let r = 0; r < t.length; r++) {
                        let s = t[r];
                        Array.isArray(s) ? au(e, s, n) : (s = s.replace(iu, e), n.push(s))
                    }
                    return n
                }

                function uu(e) {
                    return t => {
                        !1 === e(t) && (t.preventDefault(), t.returnValue = !1)
                    }
                }
                class cu {
                    constructor(e, t, n) {
                        this.eventManager = e, this.sharedStylesHost = t, this.appId = n, this.rendererByCompId = new Map, this.defaultRenderer = new hu(e)
                    }
                    createRenderer(e, t) {
                        if (!e || !t) return this.defaultRenderer;
                        switch (t.encapsulation) {
                            case qe.Emulated: {
                                let n = this.rendererByCompId.get(t.id);
                                return n || (n = new fu(this.eventManager, this.sharedStylesHost, t, this.appId), this.rendererByCompId.set(t.id, n)), n.applyToHost(e), n
                            }
                            case qe.Native:
                            case qe.ShadowDom:
                                return new gu(this.eventManager, this.sharedStylesHost, e, t);
                            default:
                                if (!this.rendererByCompId.has(t.id)) {
                                    const e = au(t.id, t.styles, []);
                                    this.sharedStylesHost.addStyles(e), this.rendererByCompId.set(t.id, this.defaultRenderer)
                                }
                                return this.defaultRenderer
                        }
                    }
                    begin() {}
                    end() {}
                }
                class hu {
                    constructor(e) {
                        this.eventManager = e, this.data = Object.create(null)
                    }
                    destroy() {}
                    createElement(e, t) {
                        return t ? document.createElementNS(su[t] || t, e) : document.createElement(e)
                    }
                    createComment(e) {
                        return document.createComment(e)
                    }
                    createText(e) {
                        return document.createTextNode(e)
                    }
                    appendChild(e, t) {
                        e.appendChild(t)
                    }
                    insertBefore(e, t, n) {
                        e && e.insertBefore(t, n)
                    }
                    removeChild(e, t) {
                        e && e.removeChild(t)
                    }
                    selectRootElement(e, t) {
                        let n = "string" == typeof e ? document.querySelector(e) : e;
                        if (!n) throw new Error(`The selector "${e}" did not match any elements`);
                        return t || (n.textContent = ""), n
                    }
                    parentNode(e) {
                        return e.parentNode
                    }
                    nextSibling(e) {
                        return e.nextSibling
                    }
                    setAttribute(e, t, n, r) {
                        if (r) {
                            t = r + ":" + t;
                            const s = su[r];
                            s ? e.setAttributeNS(s, t, n) : e.setAttribute(t, n)
                        } else e.setAttribute(t, n)
                    }
                    removeAttribute(e, t, n) {
                        if (n) {
                            const r = su[n];
                            r ? e.removeAttributeNS(r, t) : e.removeAttribute(`${n}:${t}`)
                        } else e.removeAttribute(t)
                    }
                    addClass(e, t) {
                        e.classList.add(t)
                    }
                    removeClass(e, t) {
                        e.classList.remove(t)
                    }
                    setStyle(e, t, n, r) {
                        r & fn.DashCase ? e.style.setProperty(t, n, r & fn.Important ? "important" : "") : e.style[t] = n
                    }
                    removeStyle(e, t, n) {
                        n & fn.DashCase ? e.style.removeProperty(t) : e.style[t] = ""
                    }
                    setProperty(e, t, n) {
                        pu(t, "property"), e[t] = n
                    }
                    setValue(e, t) {
                        e.nodeValue = t
                    }
                    listen(e, t, n) {
                        return pu(t, "listener"), "string" == typeof e ? this.eventManager.addGlobalEventListener(e, t, uu(n)) : this.eventManager.addEventListener(e, t, uu(n))
                    }
                }
                const du = (() => "@".charCodeAt(0))();

                function pu(e, t) {
                    if (e.charCodeAt(0) === du) throw new Error(`Found the synthetic ${t} ${e}. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.`)
                }
                class fu extends hu {
                    constructor(e, t, n, r) {
                        super(e), this.component = n;
                        const s = au(r + "-" + n.id, n.styles, []);
                        t.addStyles(s), this.contentAttr = lu.replace(iu, r + "-" + n.id), this.hostAttr = ou.replace(iu, r + "-" + n.id)
                    }
                    applyToHost(e) {
                        super.setAttribute(e, this.hostAttr, "")
                    }
                    createElement(e, t) {
                        const n = super.createElement(e, t);
                        return super.setAttribute(n, this.contentAttr, ""), n
                    }
                }
                class gu extends hu {
                    constructor(e, t, n, r) {
                        super(e), this.sharedStylesHost = t, this.hostEl = n, this.component = r, this.shadowRoot = r.encapsulation === qe.ShadowDom ? n.attachShadow({
                            mode: "open"
                        }) : n.createShadowRoot(), this.sharedStylesHost.addHost(this.shadowRoot);
                        const s = au(r.id, r.styles, []);
                        for (let i = 0; i < s.length; i++) {
                            const e = document.createElement("style");
                            e.textContent = s[i], this.shadowRoot.appendChild(e)
                        }
                    }
                    nodeOrShadowRoot(e) {
                        return e === this.hostEl ? this.shadowRoot : e
                    }
                    destroy() {
                        this.sharedStylesHost.removeHost(this.shadowRoot)
                    }
                    appendChild(e, t) {
                        return super.appendChild(this.nodeOrShadowRoot(e), t)
                    }
                    insertBefore(e, t, n) {
                        return super.insertBefore(this.nodeOrShadowRoot(e), t, n)
                    }
                    removeChild(e, t) {
                        return super.removeChild(this.nodeOrShadowRoot(e), t)
                    }
                    parentNode(e) {
                        return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))
                    }
                }
                const mu = (() => "undefined" != typeof Zone && Zone.__symbol__ || function(e) {
                        return "__zone_symbol__" + e
                    })(),
                    vu = mu("addEventListener"),
                    yu = mu("removeEventListener"),
                    wu = {},
                    bu = "FALSE",
                    _u = "ANGULAR",
                    Cu = "addEventListener",
                    xu = "removeEventListener",
                    Su = "__zone_symbol__propagationStopped",
                    Eu = "__zone_symbol__stopImmediatePropagation",
                    Tu = (() => {
                        const e = "undefined" != typeof Zone && Zone[mu("BLACK_LISTED_EVENTS")];
                        if (e) {
                            const t = {};
                            return e.forEach(e => {
                                t[e] = e
                            }), t
                        }
                    })(),
                    ku = function(e) {
                        return !!Tu && Tu.hasOwnProperty(e)
                    },
                    Ru = function(e) {
                        const t = wu[e.type];
                        if (!t) return;
                        const n = this[t];
                        if (!n) return;
                        const r = [e];
                        if (1 === n.length) {
                            const e = n[0];
                            return e.zone !== Zone.current ? e.zone.run(e.handler, this, r) : e.handler.apply(this, r)
                        } {
                            const t = n.slice();
                            for (let n = 0; n < t.length && !0 !== e[Su]; n++) {
                                const e = t[n];
                                e.zone !== Zone.current ? e.zone.run(e.handler, this, r) : e.handler.apply(this, r)
                            }
                        }
                    };
                class Iu extends tu {
                    constructor(e, t, n) {
                        super(e), this.ngZone = t, n && function(e) {
                            return e === jl
                        }(n) || this.patchEvent()
                    }
                    patchEvent() {
                        if ("undefined" == typeof Event || !Event || !Event.prototype) return;
                        if (Event.prototype[Eu]) return;
                        const e = Event.prototype[Eu] = Event.prototype.stopImmediatePropagation;
                        Event.prototype.stopImmediatePropagation = function() {
                            this && (this[Su] = !0), e && e.apply(this, arguments)
                        }
                    }
                    supports(e) {
                        return !0
                    }
                    addEventListener(e, t, n) {
                        let r = n;
                        if (!e[vu] || ii.isInAngularZone() && !ku(t)) e[Cu](t, r, !1);
                        else {
                            let n = wu[t];
                            n || (n = wu[t] = mu(_u + t + bu));
                            let s = e[n];
                            const i = s && s.length > 0;
                            s || (s = e[n] = []);
                            const o = ku(t) ? Zone.root : Zone.current;
                            if (0 === s.length) s.push({
                                zone: o,
                                handler: r
                            });
                            else {
                                let e = !1;
                                for (let t = 0; t < s.length; t++)
                                    if (s[t].handler === r) {
                                        e = !0;
                                        break
                                    } e || s.push({
                                    zone: o,
                                    handler: r
                                })
                            }
                            i || e[vu](t, Ru, !1)
                        }
                        return () => this.removeEventListener(e, t, r)
                    }
                    removeEventListener(e, t, n) {
                        let r = e[yu];
                        if (!r) return e[xu].apply(e, [t, n, !1]);
                        let s = wu[t],
                            i = s && e[s];
                        if (!i) return e[xu].apply(e, [t, n, !1]);
                        let o = !1;
                        for (let l = 0; l < i.length; l++)
                            if (i[l].handler === n) {
                                o = !0, i.splice(l, 1);
                                break
                            } o ? 0 === i.length && r.apply(e, [t, Ru, !1]) : e[xu].apply(e, [t, n, !1])
                    }
                }
                const Au = {
                        pan: !0,
                        panstart: !0,
                        panmove: !0,
                        panend: !0,
                        pancancel: !0,
                        panleft: !0,
                        panright: !0,
                        panup: !0,
                        pandown: !0,
                        pinch: !0,
                        pinchstart: !0,
                        pinchmove: !0,
                        pinchend: !0,
                        pinchcancel: !0,
                        pinchin: !0,
                        pinchout: !0,
                        press: !0,
                        pressup: !0,
                        rotate: !0,
                        rotatestart: !0,
                        rotatemove: !0,
                        rotateend: !0,
                        rotatecancel: !0,
                        swipe: !0,
                        swipeleft: !0,
                        swiperight: !0,
                        swipeup: !0,
                        swipedown: !0,
                        tap: !0
                    },
                    Nu = new Ee("HammerGestureConfig"),
                    Pu = new Ee("HammerLoader");
                class Ou {
                    constructor() {
                        this.events = [], this.overrides = {}
                    }
                    buildHammer(e) {
                        const t = new Hammer(e, this.options);
                        t.get("pinch").set({
                            enable: !0
                        }), t.get("rotate").set({
                            enable: !0
                        });
                        for (const n in this.overrides) t.get(n).set(this.overrides[n]);
                        return t
                    }
                }
                class Du extends tu {
                    constructor(e, t, n, r) {
                        super(e), this._config = t, this.console = n, this.loader = r
                    }
                    supports(e) {
                        return !(!Au.hasOwnProperty(e.toLowerCase()) && !this.isCustomEvent(e) || !window.Hammer && !this.loader && (this.console.warn(`The "${e}" event cannot be bound because Hammer.JS is not ` + "loaded and no custom loader has been specified."), 1))
                    }
                    addEventListener(e, t, n) {
                        const r = this.manager.getZone();
                        if (t = t.toLowerCase(), !window.Hammer && this.loader) {
                            let r = !1,
                                s = () => {
                                    r = !0
                                };
                            return this.loader().then(() => {
                                if (!window.Hammer) return this.console.warn("The custom HAMMER_LOADER completed, but Hammer.JS is not present."), void(s = () => {});
                                r || (s = this.addEventListener(e, t, n))
                            }).catch(() => {
                                this.console.warn(`The "${t}" event cannot be bound because the custom ` + "Hammer.JS loader failed."), s = () => {}
                            }), () => {
                                s()
                            }
                        }
                        return r.runOutsideAngular(() => {
                            const s = this._config.buildHammer(e),
                                i = function(e) {
                                    r.runGuarded((function() {
                                        n(e)
                                    }))
                                };
                            return s.on(t, i), () => {
                                s.off(t, i), "function" == typeof s.destroy && s.destroy()
                            }
                        })
                    }
                    isCustomEvent(e) {
                        return this._config.events.indexOf(e) > -1
                    }
                }
                const Mu = ["alt", "control", "meta", "shift"],
                    Lu = {
                        alt: e => e.altKey,
                        control: e => e.ctrlKey,
                        meta: e => e.metaKey,
                        shift: e => e.shiftKey
                    };
                class Uu extends tu {
                    constructor(e) {
                        super(e)
                    }
                    supports(e) {
                        return null != Uu.parseEventName(e)
                    }
                    addEventListener(e, t, n) {
                        const r = Uu.parseEventName(t),
                            s = Uu.eventCallback(r.fullKey, n, this.manager.getZone());
                        return this.manager.getZone().runOutsideAngular(() => Ma().onAndCancel(e, r.domEventName, s))
                    }
                    static parseEventName(e) {
                        const t = e.toLowerCase().split("."),
                            n = t.shift();
                        if (0 === t.length || "keydown" !== n && "keyup" !== n) return null;
                        const r = Uu._normalizeKey(t.pop());
                        let s = "";
                        if (Mu.forEach(e => {
                                const n = t.indexOf(e);
                                n > -1 && (t.splice(n, 1), s += e + ".")
                            }), s += r, 0 != t.length || 0 === r.length) return null;
                        const i = {};
                        return i.domEventName = n, i.fullKey = s, i
                    }
                    static getEventFullKey(e) {
                        let t = "",
                            n = Ma().getEventKey(e);
                        return " " === (n = n.toLowerCase()) ? n = "space" : "." === n && (n = "dot"), Mu.forEach(r => {
                            r != n && (0, Lu[r])(e) && (t += r + ".")
                        }), t += n
                    }
                    static eventCallback(e, t, n) {
                        return r => {
                            Uu.getEventFullKey(r) === e && n.runGuarded(() => t(r))
                        }
                    }
                    static _normalizeKey(e) {
                        switch (e) {
                            case "esc":
                                return "escape";
                            default:
                                return e
                        }
                    }
                }
                class ju {}
                class Vu extends ju {
                    constructor(e) {
                        super(), this._doc = e
                    }
                    sanitize(e, t) {
                        if (null == t) return null;
                        switch (e) {
                            case St.NONE:
                                return t;
                            case St.HTML:
                                return t instanceof Fu ? t.changingThisBreaksApplicationSecurity : (this.checkNotSafeValue(t, "HTML"), function(e, t) {
                                    let n = null;
                                    try {
                                        Ct = Ct || new rt(e);
                                        let r = t ? String(t) : "";
                                        n = Ct.getInertBodyElement(r);
                                        let s = 5,
                                            i = r;
                                        do {
                                            if (0 === s) throw new Error("Failed to sanitize html because the input is unstable");
                                            s--, r = i, i = n.innerHTML, n = Ct.getInertBodyElement(r)
                                        } while (r !== i);
                                        const o = new yt,
                                            l = o.sanitizeChildren(xt(n) || n);
                                        return nt() && o.sanitizedSomething && console.warn("WARNING: sanitizing HTML stripped some content, see http://g.co/ng/security#xss"), l
                                    } finally {
                                        if (n) {
                                            const e = xt(n) || n;
                                            for (; e.firstChild;) e.removeChild(e.firstChild)
                                        }
                                    }
                                }(this._doc, String(t)));
                            case St.STYLE:
                                return t instanceof zu ? t.changingThisBreaksApplicationSecurity : (this.checkNotSafeValue(t, "Style"), function(e) {
                                    if (!(e = String(e).trim())) return "";
                                    const t = e.match(kt);
                                    return t && ot(t[1]) === t[1] || e.match(Tt) && function(e) {
                                        let t = !0,
                                            n = !0;
                                        for (let r = 0; r < e.length; r++) {
                                            const s = e.charAt(r);
                                            "'" === s && n ? t = !t : '"' === s && t && (n = !n)
                                        }
                                        return t && n
                                    }(e) ? e : (nt() && console.warn(`WARNING: sanitizing unsafe style value ${e} (see http://g.co/ng/security#xss).`), "unsafe")
                                }(t));
                            case St.SCRIPT:
                                if (t instanceof $u) return t.changingThisBreaksApplicationSecurity;
                                throw this.checkNotSafeValue(t, "Script"), new Error("unsafe value used in a script context");
                            case St.URL:
                                return t instanceof qu || t instanceof Bu ? t.changingThisBreaksApplicationSecurity : (this.checkNotSafeValue(t, "URL"), ot(String(t)));
                            case St.RESOURCE_URL:
                                if (t instanceof qu) return t.changingThisBreaksApplicationSecurity;
                                throw this.checkNotSafeValue(t, "ResourceURL"), new Error("unsafe value used in a resource URL context (see http://g.co/ng/security#xss)");
                            default:
                                throw new Error(`Unexpected SecurityContext ${e} (see http://g.co/ng/security#xss)`)
                        }
                    }
                    checkNotSafeValue(e, t) {
                        if (e instanceof Hu) throw new Error(`Required a safe ${t}, got a ${e.getTypeName()} ` + "(see http://g.co/ng/security#xss)")
                    }
                    bypassSecurityTrustHtml(e) {
                        return new Fu(e)
                    }
                    bypassSecurityTrustStyle(e) {
                        return new zu(e)
                    }
                    bypassSecurityTrustScript(e) {
                        return new $u(e)
                    }
                    bypassSecurityTrustUrl(e) {
                        return new Bu(e)
                    }
                    bypassSecurityTrustResourceUrl(e) {
                        return new qu(e)
                    }
                }
                class Hu {
                    constructor(e) {
                        this.changingThisBreaksApplicationSecurity = e
                    }
                    toString() {
                        return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity}` + " (see http://g.co/ng/security#xss)"
                    }
                }
                class Fu extends Hu {
                    getTypeName() {
                        return "HTML"
                    }
                }
                class zu extends Hu {
                    getTypeName() {
                        return "Style"
                    }
                }
                class $u extends Hu {
                    getTypeName() {
                        return "Script"
                    }
                }
                class Bu extends Hu {
                    getTypeName() {
                        return "URL"
                    }
                }
                class qu extends Hu {
                    getTypeName() {
                        return "ResourceURL"
                    }
                }
                const Zu = _i(Hi, "browser", [{
                    provide: js,
                    useValue: "browser"
                }, {
                    provide: Us,
                    useValue: function() {
                        $a.makeCurrent(), Qa.init()
                    },
                    multi: !0
                }, {
                    provide: ml,
                    useClass: class extends ml {
                        constructor(e) {
                            super(), this._doc = e, this._init()
                        }
                        _init() {
                            this.location = Ma().getLocation(), this._history = Ma().getHistory()
                        }
                        getBaseHrefFromDOM() {
                            return Ma().getBaseHref(this._doc)
                        }
                        onPopState(e) {
                            Ma().getGlobalEventTarget(this._doc, "window").addEventListener("popstate", e, !1)
                        }
                        onHashChange(e) {
                            Ma().getGlobalEventTarget(this._doc, "window").addEventListener("hashchange", e, !1)
                        }
                        get href() {
                            return this.location.href
                        }
                        get protocol() {
                            return this.location.protocol
                        }
                        get hostname() {
                            return this.location.hostname
                        }
                        get port() {
                            return this.location.port
                        }
                        get pathname() {
                            return this.location.pathname
                        }
                        get search() {
                            return this.location.search
                        }
                        get hash() {
                            return this.location.hash
                        }
                        set pathname(e) {
                            this.location.pathname = e
                        }
                        pushState(e, t, n) {
                            Za() ? this._history.pushState(e, t, n) : this.location.hash = n
                        }
                        replaceState(e, t, n) {
                            Za() ? this._history.replaceState(e, t, n) : this.location.hash = n
                        }
                        forward() {
                            this._history.forward()
                        }
                        back() {
                            this._history.back()
                        }
                        getState() {
                            return this._history.state
                        }
                    },
                    deps: [Ul]
                }, {
                    provide: Ul,
                    useFactory: function() {
                        return document
                    },
                    deps: []
                }]);

                function Wu() {
                    return new Xe
                }
                class Gu {
                    constructor(e) {
                        if (e) throw new Error("BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.")
                    }
                    static withServerTransition(e) {
                        return {
                            ngModule: Gu,
                            providers: [{
                                provide: Ds,
                                useValue: e.appId
                            }, {
                                provide: Wa,
                                useExisting: Ds
                            }, Ga]
                        }
                    }
                }
                "undefined" != typeof window && window;
                class Qu {
                    constructor(e, t) {
                        this.id = e, this.url = t
                    }
                }
                class Ku extends Qu {
                    constructor(e, t, n = "imperative", r = null) {
                        super(e, t), this.navigationTrigger = n, this.restoredState = r
                    }
                    toString() {
                        return `NavigationStart(id: ${this.id}, url: '${this.url}')`
                    }
                }
                class Ju extends Qu {
                    constructor(e, t, n) {
                        super(e, t), this.urlAfterRedirects = n
                    }
                    toString() {
                        return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`
                    }
                }
                class Yu extends Qu {
                    constructor(e, t, n) {
                        super(e, t), this.reason = n
                    }
                    toString() {
                        return `NavigationCancel(id: ${this.id}, url: '${this.url}')`
                    }
                }
                class Xu extends Qu {
                    constructor(e, t, n) {
                        super(e, t), this.error = n
                    }
                    toString() {
                        return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`
                    }
                }
                class ec extends Qu {
                    constructor(e, t, n, r) {
                        super(e, t), this.urlAfterRedirects = n, this.state = r
                    }
                    toString() {
                        return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
                    }
                }
                class tc extends Qu {
                    constructor(e, t, n, r) {
                        super(e, t), this.urlAfterRedirects = n, this.state = r
                    }
                    toString() {
                        return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
                    }
                }
                class nc extends Qu {
                    constructor(e, t, n, r, s) {
                        super(e, t), this.urlAfterRedirects = n, this.state = r, this.shouldActivate = s
                    }
                    toString() {
                        return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`
                    }
                }
                class rc extends Qu {
                    constructor(e, t, n, r) {
                        super(e, t), this.urlAfterRedirects = n, this.state = r
                    }
                    toString() {
                        return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
                    }
                }
                class sc extends Qu {
                    constructor(e, t, n, r) {
                        super(e, t), this.urlAfterRedirects = n, this.state = r
                    }
                    toString() {
                        return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
                    }
                }
                class ic {
                    constructor(e) {
                        this.route = e
                    }
                    toString() {
                        return `RouteConfigLoadStart(path: ${this.route.path})`
                    }
                }
                class oc {
                    constructor(e) {
                        this.route = e
                    }
                    toString() {
                        return `RouteConfigLoadEnd(path: ${this.route.path})`
                    }
                }
                class lc {
                    constructor(e) {
                        this.snapshot = e
                    }
                    toString() {
                        return `ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
                    }
                }
                class ac {
                    constructor(e) {
                        this.snapshot = e
                    }
                    toString() {
                        return `ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
                    }
                }
                class uc {
                    constructor(e) {
                        this.snapshot = e
                    }
                    toString() {
                        return `ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
                    }
                }
                class cc {
                    constructor(e) {
                        this.snapshot = e
                    }
                    toString() {
                        return `ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
                    }
                }
                class hc {
                    constructor(e, t, n) {
                        this.routerEvent = e, this.position = t, this.anchor = n
                    }
                    toString() {
                        return `Scroll(anchor: '${this.anchor}', position: '${this.position?`${this.position[0]}, ${this.position[1]}`:null}')`
                    }
                }
                class dc {}
                const pc = "primary";
                class fc {
                    constructor(e) {
                        this.params = e || {}
                    }
                    has(e) {
                        return this.params.hasOwnProperty(e)
                    }
                    get(e) {
                        if (this.has(e)) {
                            const t = this.params[e];
                            return Array.isArray(t) ? t[0] : t
                        }
                        return null
                    }
                    getAll(e) {
                        if (this.has(e)) {
                            const t = this.params[e];
                            return Array.isArray(t) ? t : [t]
                        }
                        return []
                    }
                    get keys() {
                        return Object.keys(this.params)
                    }
                }

                function gc(e) {
                    return new fc(e)
                }
                const mc = "ngNavigationCancelingError";

                function vc(e) {
                    const t = Error("NavigationCancelingError: " + e);
                    return t[mc] = !0, t
                }

                function yc(e, t, n) {
                    const r = n.path.split("/");
                    if (r.length > e.length) return null;
                    if ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length)) return null;
                    const s = {};
                    for (let i = 0; i < r.length; i++) {
                        const t = r[i],
                            n = e[i];
                        if (t.startsWith(":")) s[t.substring(1)] = n;
                        else if (t !== n.path) return null
                    }
                    return {
                        consumed: e.slice(0, r.length),
                        posParams: s
                    }
                }
                class wc {
                    constructor(e, t) {
                        this.routes = e, this.module = t
                    }
                }

                function bc(e, t = "") {
                    for (let n = 0; n < e.length; n++) {
                        const r = e[n];
                        _c(r, Cc(t, r))
                    }
                }

                function _c(e, t) {
                    if (!e) throw new Error(`\n      Invalid configuration of route '${t}': Encountered undefined route.\n      The reason might be an extra comma.\n\n      Example:\n      const routes: Routes = [\n        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },\n        { path: 'dashboard',  component: DashboardComponent },, << two commas\n        { path: 'detail/:id', component: HeroDetailComponent }\n      ];\n    `);
                    if (Array.isArray(e)) throw new Error(`Invalid configuration of route '${t}': Array cannot be specified`);
                    if (!e.component && !e.children && !e.loadChildren && e.outlet && e.outlet !== pc) throw new Error(`Invalid configuration of route '${t}': a componentless route without children or loadChildren cannot have a named outlet set`);
                    if (e.redirectTo && e.children) throw new Error(`Invalid configuration of route '${t}': redirectTo and children cannot be used together`);
                    if (e.redirectTo && e.loadChildren) throw new Error(`Invalid configuration of route '${t}': redirectTo and loadChildren cannot be used together`);
                    if (e.children && e.loadChildren) throw new Error(`Invalid configuration of route '${t}': children and loadChildren cannot be used together`);
                    if (e.redirectTo && e.component) throw new Error(`Invalid configuration of route '${t}': redirectTo and component cannot be used together`);
                    if (e.path && e.matcher) throw new Error(`Invalid configuration of route '${t}': path and matcher cannot be used together`);
                    if (void 0 === e.redirectTo && !e.component && !e.children && !e.loadChildren) throw new Error(`Invalid configuration of route '${t}'. One of the following must be provided: component, redirectTo, children or loadChildren`);
                    if (void 0 === e.path && void 0 === e.matcher) throw new Error(`Invalid configuration of route '${t}': routes must have either a path or a matcher specified`);
                    if ("string" == typeof e.path && "/" === e.path.charAt(0)) throw new Error(`Invalid configuration of route '${t}': path cannot start with a slash`);
                    if ("" === e.path && void 0 !== e.redirectTo && void 0 === e.pathMatch) throw new Error(`Invalid configuration of route '{path: "${t}", redirectTo: "${e.redirectTo}"}': please provide 'pathMatch'. The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.`);
                    if (void 0 !== e.pathMatch && "full" !== e.pathMatch && "prefix" !== e.pathMatch) throw new Error(`Invalid configuration of route '${t}': pathMatch can only be set to 'prefix' or 'full'`);
                    e.children && bc(e.children, t)
                }

                function Cc(e, t) {
                    return t ? e || t.path ? e && !t.path ? `${e}/` : !e && t.path ? t.path : `${e}/${t.path}` : "" : e
                }

                function xc(e) {
                    const t = e.children && e.children.map(xc),
                        n = t ? Object.assign({}, e, {
                            children: t
                        }) : Object.assign({}, e);
                    return !n.component && (t || n.loadChildren) && n.outlet && n.outlet !== pc && (n.component = dc), n
                }

                function Sc(e, t) {
                    const n = Object.keys(e),
                        r = Object.keys(t);
                    if (!n || !r || n.length != r.length) return !1;
                    let s;
                    for (let i = 0; i < n.length; i++)
                        if (e[s = n[i]] !== t[s]) return !1;
                    return !0
                }

                function Ec(e) {
                    return Array.prototype.concat.apply([], e)
                }

                function Tc(e) {
                    return e.length > 0 ? e[e.length - 1] : null
                }

                function kc(e, t) {
                    for (const n in e) e.hasOwnProperty(n) && t(e[n], n)
                }

                function Rc(e) {
                    return Yt(e) ? e : Jt(e) ? Z(Promise.resolve(e)) : Bl(e)
                }

                function Ic(e, t, n) {
                    return n ? function(e, t) {
                        return Sc(e, t)
                    }(e.queryParams, t.queryParams) && function e(t, n) {
                        if (!Oc(t.segments, n.segments)) return !1;
                        if (t.numberOfChildren !== n.numberOfChildren) return !1;
                        for (const r in n.children) {
                            if (!t.children[r]) return !1;
                            if (!e(t.children[r], n.children[r])) return !1
                        }
                        return !0
                    }(e.root, t.root) : function(e, t) {
                        return Object.keys(t).length <= Object.keys(e).length && Object.keys(t).every(n => t[n] === e[n])
                    }(e.queryParams, t.queryParams) && function e(t, n) {
                        return function t(n, r, s) {
                            if (n.segments.length > s.length) return !!Oc(n.segments.slice(0, s.length), s) && !r.hasChildren();
                            if (n.segments.length === s.length) {
                                if (!Oc(n.segments, s)) return !1;
                                for (const t in r.children) {
                                    if (!n.children[t]) return !1;
                                    if (!e(n.children[t], r.children[t])) return !1
                                }
                                return !0
                            } {
                                const e = s.slice(0, n.segments.length),
                                    i = s.slice(n.segments.length);
                                return !!Oc(n.segments, e) && !!n.children[pc] && t(n.children[pc], r, i)
                            }
                        }(t, n, n.segments)
                    }(e.root, t.root)
                }
                class Ac {
                    constructor(e, t, n) {
                        this.root = e, this.queryParams = t, this.fragment = n
                    }
                    get queryParamMap() {
                        return this._queryParamMap || (this._queryParamMap = gc(this.queryParams)), this._queryParamMap
                    }
                    toString() {
                        return Uc.serialize(this)
                    }
                }
                class Nc {
                    constructor(e, t) {
                        this.segments = e, this.children = t, this.parent = null, kc(t, (e, t) => e.parent = this)
                    }
                    hasChildren() {
                        return this.numberOfChildren > 0
                    }
                    get numberOfChildren() {
                        return Object.keys(this.children).length
                    }
                    toString() {
                        return jc(this)
                    }
                }
                class Pc {
                    constructor(e, t) {
                        this.path = e, this.parameters = t
                    }
                    get parameterMap() {
                        return this._parameterMap || (this._parameterMap = gc(this.parameters)), this._parameterMap
                    }
                    toString() {
                        return Bc(this)
                    }
                }

                function Oc(e, t) {
                    return e.length === t.length && e.every((e, n) => e.path === t[n].path)
                }

                function Dc(e, t) {
                    let n = [];
                    return kc(e.children, (e, r) => {
                        r === pc && (n = n.concat(t(e, r)))
                    }), kc(e.children, (e, r) => {
                        r !== pc && (n = n.concat(t(e, r)))
                    }), n
                }
                class Mc {}
                class Lc {
                    parse(e) {
                        const t = new Qc(e);
                        return new Ac(t.parseRootSegment(), t.parseQueryParams(), t.parseFragment())
                    }
                    serialize(e) {
                        var t;
                        return `${`/${function e(t,n){if(!t.hasChildren())return jc(t);if(n){const n=t.children[pc]?e(t.children[pc],!1):"",r=[];return kc(t.children,(t,n)=>{n!==pc&&r.push(`${n}:${e(t,!1)}`)}),r.length>0?`${n}(${r.join("//")})`: n
                    } {
                        const n = Dc(t, (n, r) => r === pc ? [e(t.children[pc], !1)] : [`${r}:${e(n,!1)}`]);
                        return `${jc(t)}/(${n.join("//")})`
                    }
                }(e.root, !0)
            }
            `}${function(e){const t=Object.keys(e).map(t=>{const n=e[t];return Array.isArray(n)?n.map(e=>`${Hc(t)}=${Hc(e)}`).join("&"):`${Hc(t)}=${Hc(n)}`});return t.length?` ? $ {
                t.join("&")
            }
            `:""}(e.queryParams)}${"string"==typeof e.fragment?`#${t=e.fragment,encodeURI(t)}`:""}`
        }
    }
    const Uc = new Lc;

    function jc(e) {
        return e.segments.map(e => Bc(e)).join("/")
    }

    function Vc(e) {
        return encodeURIComponent(e).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",")
    }

    function Hc(e) {
        return Vc(e).replace(/%3B/gi, ";")
    }

    function Fc(e) {
        return Vc(e).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&")
    }

    function zc(e) {
        return decodeURIComponent(e)
    }

    function $c(e) {
        return zc(e.replace(/\+/g, "%20"))
    }

    function Bc(e) {
        return `${Fc(e.path)}${t=e.parameters,Object.keys(t).map(e=>`;${Fc(e)}=${Fc(t[e])}`).join("")}`;
        var t
    }
    const qc = /^[^\/()?;=#]+/;

    function Zc(e) {
        const t = e.match(qc);
        return t ? t[0] : ""
    }
    const Wc = /^[^=?&#]+/, Gc = /^[^?&#]+/; class Qc {
        constructor(e) {
            this.url = e, this.remaining = e
        }
        parseRootSegment() {
            return this.consumeOptional("/"), "" === this.remaining || this.peekStartsWith("?") || this.peekStartsWith("#") ? new Nc([], {}) : new Nc([], this.parseChildren())
        }
        parseQueryParams() {
            const e = {};
            if (this.consumeOptional("?"))
                do {
                    this.parseQueryParam(e)
                } while (this.consumeOptional("&"));
            return e
        }
        parseFragment() {
            return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null
        }
        parseChildren() {
            if ("" === this.remaining) return {};
            this.consumeOptional("/");
            const e = [];
            for (this.peekStartsWith("(") || e.push(this.parseSegment()); this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/(");) this.capture("/"), e.push(this.parseSegment());
            let t = {};
            this.peekStartsWith("/(") && (this.capture("/"), t = this.parseParens(!0));
            let n = {};
            return this.peekStartsWith("(") && (n = this.parseParens(!1)), (e.length > 0 || Object.keys(t).length > 0) && (n[pc] = new Nc(e, t)), n
        }
        parseSegment() {
            const e = Zc(this.remaining);
            if ("" === e && this.peekStartsWith(";")) throw new Error(`Empty path url segment cannot have parameters: '${this.remaining}'.`);
            return this.capture(e), new Pc(zc(e), this.parseMatrixParams())
        }
        parseMatrixParams() {
            const e = {};
            for (; this.consumeOptional(";");) this.parseParam(e);
            return e
        }
        parseParam(e) {
            const t = Zc(this.remaining);
            if (!t) return;
            this.capture(t);
            let n = "";
            if (this.consumeOptional("=")) {
                const e = Zc(this.remaining);
                e && this.capture(n = e)
            }
            e[zc(t)] = zc(n)
        }
        parseQueryParam(e) {
            const t = function(e) {
                const t = e.match(Wc);
                return t ? t[0] : ""
            }(this.remaining);
            if (!t) return;
            this.capture(t);
            let n = "";
            if (this.consumeOptional("=")) {
                const e = function(e) {
                    const t = e.match(Gc);
                    return t ? t[0] : ""
                }(this.remaining);
                e && this.capture(n = e)
            }
            const r = $c(t),
                s = $c(n);
            if (e.hasOwnProperty(r)) {
                let t = e[r];
                Array.isArray(t) || (e[r] = t = [t]), t.push(s)
            } else e[r] = s
        }
        parseParens(e) {
            const t = {};
            for (this.capture("("); !this.consumeOptional(")") && this.remaining.length > 0;) {
                const n = Zc(this.remaining),
                    r = this.remaining[n.length];
                if ("/" !== r && ")" !== r && ";" !== r) throw new Error(`Cannot parse url '${this.url}'`);
                let s = void 0;
                n.indexOf(":") > -1 ? (s = n.substr(0, n.indexOf(":")), this.capture(s), this.capture(":")) : e && (s = pc);
                const i = this.parseChildren();
                t[s] = 1 === Object.keys(i).length ? i[pc] : new Nc([], i), this.consumeOptional("//")
            }
            return t
        }
        peekStartsWith(e) {
            return this.remaining.startsWith(e)
        }
        consumeOptional(e) {
            return !!this.peekStartsWith(e) && (this.remaining = this.remaining.substring(e.length), !0)
        }
        capture(e) {
            if (!this.consumeOptional(e)) throw new Error(`Expected "${e}".`)
        }
    }
    class Kc {
        constructor(e) {
            this._root = e
        }
        get root() {
            return this._root.value
        }
        parent(e) {
            const t = this.pathFromRoot(e);
            return t.length > 1 ? t[t.length - 2] : null
        }
        children(e) {
            const t = Jc(e, this._root);
            return t ? t.children.map(e => e.value) : []
        }
        firstChild(e) {
            const t = Jc(e, this._root);
            return t && t.children.length > 0 ? t.children[0].value : null
        }
        siblings(e) {
            const t = Yc(e, this._root);
            return t.length < 2 ? [] : t[t.length - 2].children.map(e => e.value).filter(t => t !== e)
        }
        pathFromRoot(e) {
            return Yc(e, this._root).map(e => e.value)
        }
    }

    function Jc(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
            const t = Jc(e, n);
            if (t) return t
        }
        return null
    }

    function Yc(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
            const r = Yc(e, n);
            if (r.length) return r.unshift(t), r
        }
        return []
    }
    class Xc {
        constructor(e, t) {
            this.value = e, this.children = t
        }
        toString() {
            return `TreeNode(${this.value})`
        }
    }

    function eh(e) {
        const t = {};
        return e && e.children.forEach(e => t[e.value.outlet] = e), t
    }
    class th extends Kc {
        constructor(e, t) {
            super(e), this.snapshot = t, lh(this, e)
        }
        toString() {
            return this.snapshot.toString()
        }
    }

    function nh(e, t) {
        const n = function(e, t) {
                const n = new ih([], {}, {}, "", {}, pc, t, null, e.root, -1, {});
                return new oh("", new Xc(n, []))
            }(e, t),
            r = new ql([new Pc("", {})]),
            s = new ql({}),
            i = new ql({}),
            o = new ql({}),
            l = new ql(""),
            a = new rh(r, s, o, l, i, pc, t, n.root);
        return a.snapshot = n.root, new th(new Xc(a, []), n)
    }
    class rh {
        constructor(e, t, n, r, s, i, o, l) {
            this.url = e, this.params = t, this.queryParams = n, this.fragment = r, this.data = s, this.outlet = i, this.component = o, this._futureSnapshot = l
        }
        get routeConfig() {
            return this._futureSnapshot.routeConfig
        }
        get root() {
            return this._routerState.root
        }
        get parent() {
            return this._routerState.parent(this)
        }
        get firstChild() {
            return this._routerState.firstChild(this)
        }
        get children() {
            return this._routerState.children(this)
        }
        get pathFromRoot() {
            return this._routerState.pathFromRoot(this)
        }
        get paramMap() {
            return this._paramMap || (this._paramMap = this.params.pipe(z(e => gc(e)))), this._paramMap
        }
        get queryParamMap() {
            return this._queryParamMap || (this._queryParamMap = this.queryParams.pipe(z(e => gc(e)))), this._queryParamMap
        }
        toString() {
            return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`
        }
    }

    function sh(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
            for (r = n.length - 1; r >= 1;) {
                const e = n[r],
                    t = n[r - 1];
                if (e.routeConfig && "" === e.routeConfig.path) r--;
                else {
                    if (t.component) break;
                    r--
                }
            }
        return function(e) {
            return e.reduce((e, t) => ({
                params: Object.assign({}, e.params, t.params),
                data: Object.assign({}, e.data, t.data),
                resolve: Object.assign({}, e.resolve, t._resolvedData)
            }), {
                params: {},
                data: {},
                resolve: {}
            })
        }(n.slice(r))
    }
    class ih {
        constructor(e, t, n, r, s, i, o, l, a, u, c) {
            this.url = e, this.params = t, this.queryParams = n, this.fragment = r, this.data = s, this.outlet = i, this.component = o, this.routeConfig = l, this._urlSegment = a, this._lastPathIndex = u, this._resolve = c
        }
        get root() {
            return this._routerState.root
        }
        get parent() {
            return this._routerState.parent(this)
        }
        get firstChild() {
            return this._routerState.firstChild(this)
        }
        get children() {
            return this._routerState.children(this)
        }
        get pathFromRoot() {
            return this._routerState.pathFromRoot(this)
        }
        get paramMap() {
            return this._paramMap || (this._paramMap = gc(this.params)), this._paramMap
        }
        get queryParamMap() {
            return this._queryParamMap || (this._queryParamMap = gc(this.queryParams)), this._queryParamMap
        }
        toString() {
            return `Route(url:'${this.url.map(e=>e.toString()).join("/")}', path:'${this.routeConfig?this.routeConfig.path:""}')`
        }
    }
    class oh extends Kc {
        constructor(e, t) {
            super(t), this.url = e, lh(this, t)
        }
        toString() {
            return ah(this._root)
        }
    }

    function lh(e, t) {
        t.value._routerState = e, t.children.forEach(t => lh(e, t))
    }

    function ah(e) {
        const t = e.children.length > 0 ? ` { ${e.children.map(ah).join(", ")} } ` : "";
        return `${e.value}${t}`
    }

    function uh(e) {
        if (e.snapshot) {
            const t = e.snapshot,
                n = e._futureSnapshot;
            e.snapshot = n, Sc(t.queryParams, n.queryParams) || e.queryParams.next(n.queryParams), t.fragment !== n.fragment && e.fragment.next(n.fragment), Sc(t.params, n.params) || e.params.next(n.params),
                function(e, t) {
                    if (e.length !== t.length) return !1;
                    for (let n = 0; n < e.length; ++n)
                        if (!Sc(e[n], t[n])) return !1;
                    return !0
                }(t.url, n.url) || e.url.next(n.url), Sc(t.data, n.data) || e.data.next(n.data)
        } else e.snapshot = e._futureSnapshot, e.data.next(e._futureSnapshot.data)
    }

    function ch(e, t) {
        var n, r;
        return Sc(e.params, t.params) && Oc(n = e.url, r = t.url) && n.every((e, t) => Sc(e.parameters, r[t].parameters)) && !(!e.parent != !t.parent) && (!e.parent || ch(e.parent, t.parent))
    }

    function hh(e) {
        return "object" == typeof e && null != e && !e.outlets && !e.segmentPath
    }

    function dh(e, t, n, r, s) {
        let i = {};
        return r && kc(r, (e, t) => {
            i[t] = Array.isArray(e) ? e.map(e => `${e}`) : `${e}`
        }), new Ac(n.root === e ? t : function e(t, n, r) {
            const s = {};
            return kc(t.children, (t, i) => {
                s[i] = t === n ? r : e(t, n, r)
            }), new Nc(t.segments, s)
        }(n.root, e, t), i, s)
    }
    class ph {
        constructor(e, t, n) {
            if (this.isAbsolute = e, this.numberOfDoubleDots = t, this.commands = n, e && n.length > 0 && hh(n[0])) throw new Error("Root segment cannot have matrix parameters");
            const r = n.find(e => "object" == typeof e && null != e && e.outlets);
            if (r && r !== Tc(n)) throw new Error("{outlets:{}} has to be the last command")
        }
        toRoot() {
            return this.isAbsolute && 1 === this.commands.length && "/" == this.commands[0]
        }
    }
    class fh {
        constructor(e, t, n) {
            this.segmentGroup = e, this.processChildren = t, this.index = n
        }
    }

    function gh(e) {
        return "object" == typeof e && null != e && e.outlets ? e.outlets[pc] : `${e}`
    }

    function mh(e, t, n) {
        if (e || (e = new Nc([], {})), 0 === e.segments.length && e.hasChildren()) return vh(e, t, n);
        const r = function(e, t, n) {
                let r = 0,
                    s = t;
                const i = {
                    match: !1,
                    pathIndex: 0,
                    commandIndex: 0
                };
                for (; s < e.segments.length;) {
                    if (r >= n.length) return i;
                    const t = e.segments[s],
                        o = gh(n[r]),
                        l = r < n.length - 1 ? n[r + 1] : null;
                    if (s > 0 && void 0 === o) break;
                    if (o && l && "object" == typeof l && void 0 === l.outlets) {
                        if (!_h(o, l, t)) return i;
                        r += 2
                    } else {
                        if (!_h(o, {}, t)) return i;
                        r++
                    }
                    s++
                }
                return {
                    match: !0,
                    pathIndex: s,
                    commandIndex: r
                }
            }(e, t, n),
            s = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
            const t = new Nc(e.segments.slice(0, r.pathIndex), {});
            return t.children[pc] = new Nc(e.segments.slice(r.pathIndex), e.children), vh(t, 0, s)
        }
        return r.match && 0 === s.length ? new Nc(e.segments, {}) : r.match && !e.hasChildren() ? yh(e, t, n) : r.match ? vh(e, 0, s) : yh(e, t, n)
    }

    function vh(e, t, n) {
        if (0 === n.length) return new Nc(e.segments, {}); {
            const r = function(e) {
                    return "object" != typeof e[0] ? {
                        [pc]: e
                    } : void 0 === e[0].outlets ? {
                        [pc]: e
                    } : e[0].outlets
                }(n),
                s = {};
            return kc(r, (n, r) => {
                null !== n && (s[r] = mh(e.children[r], t, n))
            }), kc(e.children, (e, t) => {
                void 0 === r[t] && (s[t] = e)
            }), new Nc(e.segments, s)
        }
    }

    function yh(e, t, n) {
        const r = e.segments.slice(0, t);
        let s = 0;
        for (; s < n.length;) {
            if ("object" == typeof n[s] && void 0 !== n[s].outlets) {
                const e = wh(n[s].outlets);
                return new Nc(r, e)
            }
            if (0 === s && hh(n[0])) {
                r.push(new Pc(e.segments[t].path, n[0])), s++;
                continue
            }
            const i = gh(n[s]),
                o = s < n.length - 1 ? n[s + 1] : null;
            i && o && hh(o) ? (r.push(new Pc(i, bh(o))), s += 2) : (r.push(new Pc(i, {})), s++)
        }
        return new Nc(r, {})
    }

    function wh(e) {
        const t = {};
        return kc(e, (e, n) => {
            null !== e && (t[n] = yh(new Nc([], {}), 0, e))
        }), t
    }

    function bh(e) {
        const t = {};
        return kc(e, (e, n) => t[n] = `${e}`), t
    }

    function _h(e, t, n) {
        return e == n.path && Sc(t, n.parameters)
    }
    const Ch = (e, t, n) => z(r => (new xh(t, r.targetRouterState, r.currentRouterState, n).activate(e), r)); class xh {
        constructor(e, t, n, r) {
            this.routeReuseStrategy = e, this.futureState = t, this.currState = n, this.forwardEvent = r
        }
        activate(e) {
            const t = this.futureState._root,
                n = this.currState ? this.currState._root : null;
            this.deactivateChildRoutes(t, n, e), uh(this.futureState.root), this.activateChildRoutes(t, n, e)
        }
        deactivateChildRoutes(e, t, n) {
            const r = eh(t);
            e.children.forEach(e => {
                const t = e.value.outlet;
                this.deactivateRoutes(e, r[t], n), delete r[t]
            }), kc(r, (e, t) => {
                this.deactivateRouteAndItsChildren(e, n)
            })
        }
        deactivateRoutes(e, t, n) {
            const r = e.value,
                s = t ? t.value : null;
            if (r === s)
                if (r.component) {
                    const s = n.getContext(r.outlet);
                    s && this.deactivateChildRoutes(e, t, s.children)
                } else this.deactivateChildRoutes(e, t, n);
            else s && this.deactivateRouteAndItsChildren(t, n)
        }
        deactivateRouteAndItsChildren(e, t) {
            this.routeReuseStrategy.shouldDetach(e.value.snapshot) ? this.detachAndStoreRouteSubtree(e, t) : this.deactivateRouteAndOutlet(e, t)
        }
        detachAndStoreRouteSubtree(e, t) {
            const n = t.getContext(e.value.outlet);
            if (n && n.outlet) {
                const t = n.outlet.detach(),
                    r = n.children.onOutletDeactivated();
                this.routeReuseStrategy.store(e.value.snapshot, {
                    componentRef: t,
                    route: e,
                    contexts: r
                })
            }
        }
        deactivateRouteAndOutlet(e, t) {
            const n = t.getContext(e.value.outlet);
            if (n) {
                const r = eh(e),
                    s = e.value.component ? n.children : t;
                kc(r, (e, t) => this.deactivateRouteAndItsChildren(e, s)), n.outlet && (n.outlet.deactivate(), n.children.onOutletDeactivated())
            }
        }
        activateChildRoutes(e, t, n) {
            const r = eh(t);
            e.children.forEach(e => {
                this.activateRoutes(e, r[e.value.outlet], n), this.forwardEvent(new cc(e.value.snapshot))
            }), e.children.length && this.forwardEvent(new ac(e.value.snapshot))
        }
        activateRoutes(e, t, n) {
            const r = e.value,
                s = t ? t.value : null;
            if (uh(r), r === s)
                if (r.component) {
                    const s = n.getOrCreateContext(r.outlet);
                    this.activateChildRoutes(e, t, s.children)
                } else this.activateChildRoutes(e, t, n);
            else if (r.component) {
                const t = n.getOrCreateContext(r.outlet);
                if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
                    const e = this.routeReuseStrategy.retrieve(r.snapshot);
                    this.routeReuseStrategy.store(r.snapshot, null), t.children.onOutletReAttached(e.contexts), t.attachRef = e.componentRef, t.route = e.route.value, t.outlet && t.outlet.attach(e.componentRef, e.route.value), Sh(e.route)
                } else {
                    const n = function(e) {
                            for (let t = e.parent; t; t = t.parent) {
                                const e = t.routeConfig;
                                if (e && e._loadedConfig) return e._loadedConfig;
                                if (e && e.component) return null
                            }
                            return null
                        }(r.snapshot),
                        s = n ? n.module.componentFactoryResolver : null;
                    t.attachRef = null, t.route = r, t.resolver = s, t.outlet && t.outlet.activateWith(r, s), this.activateChildRoutes(e, null, t.children)
                }
            } else this.activateChildRoutes(e, null, n)
        }
    }

    function Sh(e) {
        uh(e.value), e.children.forEach(Sh)
    }

    function Eh(e) {
        return "function" == typeof e
    }

    function Th(e) {
        return e instanceof Ac
    }
    class kh {
        constructor(e) {
            this.segmentGroup = e || null
        }
    }
    class Rh {
        constructor(e) {
            this.urlTree = e
        }
    }

    function Ih(e) {
        return new _(t => t.error(new kh(e)))
    }

    function Ah(e) {
        return new _(t => t.error(new Rh(e)))
    }

    function Nh(e) {
        return new _(t => t.error(new Error(`Only absolute redirects can have named outlets. redirectTo: '${e}'`)))
    }
    class Ph {
        constructor(e, t, n, r, s) {
            this.configLoader = t, this.urlSerializer = n, this.urlTree = r, this.config = s, this.allowRedirects = !0, this.ngModule = e.get(Fe)
        }
        apply() {
            return this.expandSegmentGroup(this.ngModule, this.config, this.urlTree.root, pc).pipe(z(e => this.createUrlTree(e, this.urlTree.queryParams, this.urlTree.fragment))).pipe(ma(e => {
                if (e instanceof Rh) return this.allowRedirects = !1, this.match(e.urlTree);
                if (e instanceof kh) throw this.noMatchError(e);
                throw e
            }))
        }
        match(e) {
            return this.expandSegmentGroup(this.ngModule, this.config, e.root, pc).pipe(z(t => this.createUrlTree(t, e.queryParams, e.fragment))).pipe(ma(e => {
                if (e instanceof kh) throw this.noMatchError(e);
                throw e
            }))
        }
        noMatchError(e) {
            return new Error(`Cannot match any routes. URL Segment: '${e.segmentGroup}'`)
        }
        createUrlTree(e, t, n) {
            const r = e.segments.length > 0 ? new Nc([], {
                [pc]: e
            }) : e;
            return new Ac(r, t, n)
        }
        expandSegmentGroup(e, t, n, r) {
            return 0 === n.segments.length && n.hasChildren() ? this.expandChildren(e, t, n).pipe(z(e => new Nc([], e))) : this.expandSegment(e, n, t, n.segments, r, !0)
        }
        expandChildren(e, t, n) {
            return function(e, t) {
                if (0 === Object.keys(e).length) return Bl({});
                const n = [],
                    r = [],
                    s = {};
                return kc(e, (e, i) => {
                    const o = t(i, e).pipe(z(e => s[i] = e));
                    i === pc ? n.push(o) : r.push(o)
                }), Bl.apply(null, n.concat(r)).pipe(Yl(), ga(), z(() => s))
            }(n.children, (n, r) => this.expandSegmentGroup(e, t, r, n))
        }
        expandSegment(e, t, n, r, s, i) {
            return Bl(...n).pipe(z(o => this.expandSegmentAgainstRoute(e, t, n, o, r, s, i).pipe(ma(e => {
                if (e instanceof kh) return Bl(null);
                throw e
            }))), Yl(), Ca(e => !!e), ma((e, n) => {
                if (e instanceof Wl || "EmptyError" === e.name) {
                    if (this.noLeftoversInUrl(t, r, s)) return Bl(new Nc([], {}));
                    throw new kh(t)
                }
                throw e
            }))
        }
        noLeftoversInUrl(e, t, n) {
            return 0 === t.length && !e.children[n]
        }
        expandSegmentAgainstRoute(e, t, n, r, s, i, o) {
            return Lh(r) !== i ? Ih(t) : void 0 === r.redirectTo ? this.matchSegmentAgainstRoute(e, t, r, s) : o && this.allowRedirects ? this.expandSegmentAgainstRouteUsingRedirect(e, t, n, r, s, i) : Ih(t)
        }
        expandSegmentAgainstRouteUsingRedirect(e, t, n, r, s, i) {
            return "**" === r.path ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(e, n, r, i) : this.expandRegularSegmentAgainstRouteUsingRedirect(e, t, n, r, s, i)
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(e, t, n, r) {
            const s = this.applyRedirectCommands([], n.redirectTo, {});
            return n.redirectTo.startsWith("/") ? Ah(s) : this.lineralizeSegments(n, s).pipe(W(n => {
                const s = new Nc(n, {});
                return this.expandSegment(e, s, t, n, r, !1)
            }))
        }
        expandRegularSegmentAgainstRouteUsingRedirect(e, t, n, r, s, i) {
            const {
                matched: o,
                consumedSegments: l,
                lastChild: a,
                positionalParamSegments: u
            } = Oh(t, r, s);
            if (!o) return Ih(t);
            const c = this.applyRedirectCommands(l, r.redirectTo, u);
            return r.redirectTo.startsWith("/") ? Ah(c) : this.lineralizeSegments(r, c).pipe(W(r => this.expandSegment(e, t, n, r.concat(s.slice(a)), i, !1)))
        }
        matchSegmentAgainstRoute(e, t, n, r) {
            if ("**" === n.path) return n.loadChildren ? this.configLoader.load(e.injector, n).pipe(z(e => (n._loadedConfig = e, new Nc(r, {})))) : Bl(new Nc(r, {}));
            const {
                matched: s,
                consumedSegments: i,
                lastChild: o
            } = Oh(t, n, r);
            if (!s) return Ih(t);
            const l = r.slice(o);
            return this.getChildConfig(e, n, r).pipe(W(e => {
                const n = e.module,
                    r = e.routes,
                    {
                        segmentGroup: s,
                        slicedSegments: o
                    } = function(e, t, n, r) {
                        return n.length > 0 && function(e, t, n) {
                            return n.some(n => Mh(e, t, n) && Lh(n) !== pc)
                        }(e, n, r) ? {
                            segmentGroup: Dh(new Nc(t, function(e, t) {
                                const n = {};
                                n[pc] = t;
                                for (const r of e) "" === r.path && Lh(r) !== pc && (n[Lh(r)] = new Nc([], {}));
                                return n
                            }(r, new Nc(n, e.children)))),
                            slicedSegments: []
                        } : 0 === n.length && function(e, t, n) {
                            return n.some(n => Mh(e, t, n))
                        }(e, n, r) ? {
                            segmentGroup: Dh(new Nc(e.segments, function(e, t, n, r) {
                                const s = {};
                                for (const i of n) Mh(e, t, i) && !r[Lh(i)] && (s[Lh(i)] = new Nc([], {}));
                                return Object.assign({}, r, s)
                            }(e, n, r, e.children))),
                            slicedSegments: n
                        } : {
                            segmentGroup: e,
                            slicedSegments: n
                        }
                    }(t, i, l, r);
                return 0 === o.length && s.hasChildren() ? this.expandChildren(n, r, s).pipe(z(e => new Nc(i, e))) : 0 === r.length && 0 === o.length ? Bl(new Nc(i, {})) : this.expandSegment(n, s, r, o, pc, !0).pipe(z(e => new Nc(i.concat(e.segments), e.children)))
            }))
        }
        getChildConfig(e, t, n) {
            return t.children ? Bl(new wc(t.children, e)) : t.loadChildren ? void 0 !== t._loadedConfig ? Bl(t._loadedConfig) : function(e, t, n) {
                const r = t.canLoad;
                return r && 0 !== r.length ? Z(r).pipe(z(r => {
                    const s = e.get(r);
                    let i;
                    if (function(e) {
                            return e && Eh(e.canLoad)
                        }(s)) i = s.canLoad(t, n);
                    else {
                        if (!Eh(s)) throw new Error("Invalid CanLoad guard");
                        i = s(t, n)
                    }
                    return Rc(i)
                })).pipe(Yl(), (s = e => !0 === e, e => e.lift(new xa(s, void 0, e)))) : Bl(!0);
                var s
            }(e.injector, t, n).pipe(W(n => n ? this.configLoader.load(e.injector, t).pipe(z(e => (t._loadedConfig = e, e))) : function(e) {
                return new _(t => t.error(vc(`Cannot load children because the guard of the route "path: '${e.path}'" returned false`)))
            }(t))) : Bl(new wc([], e))
        }
        lineralizeSegments(e, t) {
            let n = [],
                r = t.root;
            for (;;) {
                if (n = n.concat(r.segments), 0 === r.numberOfChildren) return Bl(n);
                if (r.numberOfChildren > 1 || !r.children[pc]) return Nh(e.redirectTo);
                r = r.children[pc]
            }
        }
        applyRedirectCommands(e, t, n) {
            return this.applyRedirectCreatreUrlTree(t, this.urlSerializer.parse(t), e, n)
        }
        applyRedirectCreatreUrlTree(e, t, n, r) {
            const s = this.createSegmentGroup(e, t.root, n, r);
            return new Ac(s, this.createQueryParams(t.queryParams, this.urlTree.queryParams), t.fragment)
        }
        createQueryParams(e, t) {
            const n = {};
            return kc(e, (e, r) => {
                if ("string" == typeof e && e.startsWith(":")) {
                    const s = e.substring(1);
                    n[r] = t[s]
                } else n[r] = e
            }), n
        }
        createSegmentGroup(e, t, n, r) {
            const s = this.createSegments(e, t.segments, n, r);
            let i = {};
            return kc(t.children, (t, s) => {
                i[s] = this.createSegmentGroup(e, t, n, r)
            }), new Nc(s, i)
        }
        createSegments(e, t, n, r) {
            return t.map(t => t.path.startsWith(":") ? this.findPosParam(e, t, r) : this.findOrReturn(t, n))
        }
        findPosParam(e, t, n) {
            const r = n[t.path.substring(1)];
            if (!r) throw new Error(`Cannot redirect to '${e}'. Cannot find '${t.path}'.`);
            return r
        }
        findOrReturn(e, t) {
            let n = 0;
            for (const r of t) {
                if (r.path === e.path) return t.splice(n), r;
                n++
            }
            return e
        }
    }

    function Oh(e, t, n) {
        if ("" === t.path) return "full" === t.pathMatch && (e.hasChildren() || n.length > 0) ? {
            matched: !1,
            consumedSegments: [],
            lastChild: 0,
            positionalParamSegments: {}
        } : {
            matched: !0,
            consumedSegments: [],
            lastChild: 0,
            positionalParamSegments: {}
        };
        const r = (t.matcher || yc)(n, e, t);
        return r ? {
            matched: !0,
            consumedSegments: r.consumed,
            lastChild: r.consumed.length,
            positionalParamSegments: r.posParams
        } : {
            matched: !1,
            consumedSegments: [],
            lastChild: 0,
            positionalParamSegments: {}
        }
    }

    function Dh(e) {
        if (1 === e.numberOfChildren && e.children[pc]) {
            const t = e.children[pc];
            return new Nc(e.segments.concat(t.segments), t.children)
        }
        return e
    }

    function Mh(e, t, n) {
        return (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) && "" === n.path && void 0 !== n.redirectTo
    }

    function Lh(e) {
        return e.outlet || pc
    }
    class Uh {
        constructor(e) {
            this.path = e, this.route = this.path[this.path.length - 1]
        }
    }
    class jh {
        constructor(e, t) {
            this.component = e, this.route = t
        }
    }

    function Vh(e, t, n) {
        const r = e._root;
        return function e(t, n, r, s, i = {
            canDeactivateChecks: [],
            canActivateChecks: []
        }) {
            const o = eh(n);
            return t.children.forEach(t => {
                ! function(t, n, r, s, i = {
                    canDeactivateChecks: [],
                    canActivateChecks: []
                }) {
                    const o = t.value,
                        l = n ? n.value : null,
                        a = r ? r.getContext(t.value.outlet) : null;
                    if (l && o.routeConfig === l.routeConfig) {
                        const u = function(e, t, n) {
                            if ("function" == typeof n) return n(e, t);
                            switch (n) {
                                case "pathParamsChange":
                                    return !Oc(e.url, t.url);
                                case "pathParamsOrQueryParamsChange":
                                    return !Oc(e.url, t.url) || !Sc(e.queryParams, t.queryParams);
                                case "always":
                                    return !0;
                                case "paramsOrQueryParamsChange":
                                    return !ch(e, t) || !Sc(e.queryParams, t.queryParams);
                                case "paramsChange":
                                default:
                                    return !ch(e, t)
                            }
                        }(l, o, o.routeConfig.runGuardsAndResolvers);
                        u ? i.canActivateChecks.push(new Uh(s)) : (o.data = l.data, o._resolvedData = l._resolvedData), e(t, n, o.component ? a ? a.children : null : r, s, i), u && i.canDeactivateChecks.push(new jh(a && a.outlet && a.outlet.component || null, l))
                    } else l && Fh(n, a, i), i.canActivateChecks.push(new Uh(s)), e(t, null, o.component ? a ? a.children : null : r, s, i)
                }(t, o[t.value.outlet], r, s.concat([t.value]), i), delete o[t.value.outlet]
            }), kc(o, (e, t) => Fh(e, r.getContext(t), i)), i
        }(r, t ? t._root : null, n, [r.value])
    }

    function Hh(e, t, n) {
        const r = function(e) {
            if (!e) return null;
            for (let t = e.parent; t; t = t.parent) {
                const e = t.routeConfig;
                if (e && e._loadedConfig) return e._loadedConfig
            }
            return null
        }(t);
        return (r ? r.module.injector : n).get(e)
    }

    function Fh(e, t, n) {
        const r = eh(e),
            s = e.value;
        kc(r, (e, r) => {
            Fh(e, s.component ? t ? t.children.getContext(r) : null : t, n)
        }), n.canDeactivateChecks.push(new jh(s.component && t && t.outlet && t.outlet.isActivated ? t.outlet.component : null, s))
    }
    const zh = Symbol("INITIAL_VALUE");

    function $h() {
        return Ea(e => (function(...e) {
            let t = null,
                n = null;
            return I(e[e.length - 1]) && (n = e.pop()), "function" == typeof e[e.length - 1] && (t = e.pop()), 1 === e.length && a(e[0]) && (e = e[0]), q(e, n).lift(new Ql(t))
        })(...e.map(e => e.pipe(wa(1), function(...e) {
            return t => {
                let n = e[e.length - 1];
                I(n) ? e.pop() : n = null;
                const r = e.length;
                return function(...e) {
                    return Yl()(Bl(...e))
                }(1 !== r || n ? r > 0 ? q(e, n) : zl(n) : $l(e[0]), t)
            }
        }(zh)))).pipe(Ra((e, t) => {
            let n = !1;
            return t.reduce((e, r, s) => {
                if (e !== zh) return e;
                if (r === zh && (n = !0), !n) {
                    if (!1 === r) return r;
                    if (s === t.length - 1 || Th(r)) return r
                }
                return e
            }, e)
        }, zh), Xl(e => e !== zh), z(e => Th(e) ? e : !0 === e), wa(1)))
    }

    function Bh(e, t) {
        return null !== e && t && t(new uc(e)), Bl(!0)
    }

    function qh(e, t) {
        return null !== e && t && t(new lc(e)), Bl(!0)
    }

    function Zh(e, t, n) {
        const r = t.routeConfig ? t.routeConfig.canActivate : null;
        return r && 0 !== r.length ? Bl(r.map(r => Jl(() => {
            const s = Hh(r, t, n);
            let i;
            if (function(e) {
                    return e && Eh(e.canActivate)
                }(s)) i = Rc(s.canActivate(t, e));
            else {
                if (!Eh(s)) throw new Error("Invalid CanActivate guard");
                i = Rc(s(t, e))
            }
            return i.pipe(Ca())
        }))).pipe($h()) : Bl(!0)
    }

    function Wh(e, t, n) {
        const r = t[t.length - 1],
            s = t.slice(0, t.length - 1).reverse().map(e => (function(e) {
                const t = e.routeConfig ? e.routeConfig.canActivateChild : null;
                return t && 0 !== t.length ? {
                    node: e,
                    guards: t
                } : null
            })(e)).filter(e => null !== e).map(t => Jl(() => Bl(t.guards.map(s => {
                const i = Hh(s, t.node, n);
                let o;
                if (function(e) {
                        return e && Eh(e.canActivateChild)
                    }(i)) o = Rc(i.canActivateChild(r, e));
                else {
                    if (!Eh(i)) throw new Error("Invalid CanActivateChild guard");
                    o = Rc(i(r, e))
                }
                return o.pipe(Ca())
            })).pipe($h())));
        return Bl(s).pipe($h())
    }
    class Gh {}
    class Qh {
        constructor(e, t, n, r, s, i) {
            this.rootComponentType = e, this.config = t, this.urlTree = n, this.url = r, this.paramsInheritanceStrategy = s, this.relativeLinkResolution = i
        }
        recognize() {
            try {
                const e = Yh(this.urlTree.root, [], [], this.config, this.relativeLinkResolution).segmentGroup,
                    t = this.processSegmentGroup(this.config, e, pc),
                    n = new ih([], Object.freeze({}), Object.freeze(Object.assign({}, this.urlTree.queryParams)), this.urlTree.fragment, {}, pc, this.rootComponentType, null, this.urlTree.root, -1, {}),
                    r = new Xc(n, t),
                    s = new oh(this.url, r);
                return this.inheritParamsAndData(s._root), Bl(s)
            } catch (e) {
                return new _(t => t.error(e))
            }
        }
        inheritParamsAndData(e) {
            const t = e.value,
                n = sh(t, this.paramsInheritanceStrategy);
            t.params = Object.freeze(n.params), t.data = Object.freeze(n.data), e.children.forEach(e => this.inheritParamsAndData(e))
        }
        processSegmentGroup(e, t, n) {
            return 0 === t.segments.length && t.hasChildren() ? this.processChildren(e, t) : this.processSegment(e, t, t.segments, n)
        }
        processChildren(e, t) {
            const n = Dc(t, (t, n) => this.processSegmentGroup(e, t, n));
            return function(e) {
                const t = {};
                e.forEach(e => {
                    const n = t[e.value.outlet];
                    if (n) {
                        const t = n.url.map(e => e.toString()).join("/"),
                            r = e.value.url.map(e => e.toString()).join("/");
                        throw new Error(`Two segments cannot have the same outlet name: '${t}' and '${r}'.`)
                    }
                    t[e.value.outlet] = e.value
                })
            }(n), n.sort((e, t) => e.value.outlet === pc ? -1 : t.value.outlet === pc ? 1 : e.value.outlet.localeCompare(t.value.outlet)), n
        }
        processSegment(e, t, n, r) {
            for (const i of e) try {
                return this.processSegmentAgainstRoute(i, t, n, r)
            } catch (s) {
                if (!(s instanceof Gh)) throw s
            }
            if (this.noLeftoversInUrl(t, n, r)) return [];
            throw new Gh
        }
        noLeftoversInUrl(e, t, n) {
            return 0 === t.length && !e.children[n]
        }
        processSegmentAgainstRoute(e, t, n, r) {
            if (e.redirectTo) throw new Gh;
            if ((e.outlet || pc) !== r) throw new Gh;
            let s, i = [],
                o = [];
            if ("**" === e.path) {
                const i = n.length > 0 ? Tc(n).parameters : {};
                s = new ih(n, i, Object.freeze(Object.assign({}, this.urlTree.queryParams)), this.urlTree.fragment, td(e), r, e.component, e, Kh(t), Jh(t) + n.length, nd(e))
            } else {
                const l = function(e, t, n) {
                    if ("" === t.path) {
                        if ("full" === t.pathMatch && (e.hasChildren() || n.length > 0)) throw new Gh;
                        return {
                            consumedSegments: [],
                            lastChild: 0,
                            parameters: {}
                        }
                    }
                    const r = (t.matcher || yc)(n, e, t);
                    if (!r) throw new Gh;
                    const s = {};
                    kc(r.posParams, (e, t) => {
                        s[t] = e.path
                    });
                    const i = r.consumed.length > 0 ? Object.assign({}, s, r.consumed[r.consumed.length - 1].parameters) : s;
                    return {
                        consumedSegments: r.consumed,
                        lastChild: r.consumed.length,
                        parameters: i
                    }
                }(t, e, n);
                i = l.consumedSegments, o = n.slice(l.lastChild), s = new ih(i, l.parameters, Object.freeze(Object.assign({}, this.urlTree.queryParams)), this.urlTree.fragment, td(e), r, e.component, e, Kh(t), Jh(t) + i.length, nd(e))
            }
            const l = function(e) {
                    return e.children ? e.children : e.loadChildren ? e._loadedConfig.routes : []
                }(e),
                {
                    segmentGroup: a,
                    slicedSegments: u
                } = Yh(t, i, o, l, this.relativeLinkResolution);
            if (0 === u.length && a.hasChildren()) {
                const e = this.processChildren(l, a);
                return [new Xc(s, e)]
            }
            if (0 === l.length && 0 === u.length) return [new Xc(s, [])];
            const c = this.processSegment(l, a, u, pc);
            return [new Xc(s, c)]
        }
    }

    function Kh(e) {
        let t = e;
        for (; t._sourceSegment;) t = t._sourceSegment;
        return t
    }

    function Jh(e) {
        let t = e,
            n = t._segmentIndexShift ? t._segmentIndexShift : 0;
        for (; t._sourceSegment;) n += (t = t._sourceSegment)._segmentIndexShift ? t._segmentIndexShift : 0;
        return n - 1
    }

    function Yh(e, t, n, r, s) {
        if (n.length > 0 && function(e, t, n) {
                return n.some(n => Xh(e, t, n) && ed(n) !== pc)
            }(e, n, r)) {
            const s = new Nc(t, function(e, t, n, r) {
                const s = {};
                s[pc] = r, r._sourceSegment = e, r._segmentIndexShift = t.length;
                for (const i of n)
                    if ("" === i.path && ed(i) !== pc) {
                        const n = new Nc([], {});
                        n._sourceSegment = e, n._segmentIndexShift = t.length, s[ed(i)] = n
                    } return s
            }(e, t, r, new Nc(n, e.children)));
            return s._sourceSegment = e, s._segmentIndexShift = t.length, {
                segmentGroup: s,
                slicedSegments: []
            }
        }
        if (0 === n.length && function(e, t, n) {
                return n.some(n => Xh(e, t, n))
            }(e, n, r)) {
            const i = new Nc(e.segments, function(e, t, n, r, s, i) {
                const o = {};
                for (const l of r)
                    if (Xh(e, n, l) && !s[ed(l)]) {
                        const n = new Nc([], {});
                        n._sourceSegment = e, n._segmentIndexShift = "legacy" === i ? e.segments.length : t.length, o[ed(l)] = n
                    } return Object.assign({}, s, o)
            }(e, t, n, r, e.children, s));
            return i._sourceSegment = e, i._segmentIndexShift = t.length, {
                segmentGroup: i,
                slicedSegments: n
            }
        }
        const i = new Nc(e.segments, e.children);
        return i._sourceSegment = e, i._segmentIndexShift = t.length, {
            segmentGroup: i,
            slicedSegments: n
        }
    }

    function Xh(e, t, n) {
        return (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) && "" === n.path && void 0 === n.redirectTo
    }

    function ed(e) {
        return e.outlet || pc
    }

    function td(e) {
        return e.data || {}
    }

    function nd(e) {
        return e.resolve || {}
    }

    function rd(e, t, n, r) {
        const s = Hh(e, t, r);
        return Rc(s.resolve ? s.resolve(t, n) : s(t, n))
    }

    function sd(e) {
        return function(t) {
            return t.pipe(Ea(t => {
                const n = e(t);
                return n ? Z(n).pipe(z(() => t)) : Z([t])
            }))
        }
    }
    class id {}
    class od {
        shouldDetach(e) {
            return !1
        }
        store(e, t) {}
        shouldAttach(e) {
            return !1
        }
        retrieve(e) {
            return null
        }
        shouldReuseRoute(e, t) {
            return e.routeConfig === t.routeConfig
        }
    }
    const ld = new Ee("ROUTES"); class ad {
        constructor(e, t, n, r) {
            this.loader = e, this.compiler = t, this.onLoadStartListener = n, this.onLoadEndListener = r
        }
        load(e, t) {
            return this.onLoadStartListener && this.onLoadStartListener(t), this.loadModuleFactory(t.loadChildren).pipe(z(n => {
                this.onLoadEndListener && this.onLoadEndListener(t);
                const r = n.create(e);
                return new wc(Ec(r.injector.get(ld)).map(xc), r)
            }))
        }
        loadModuleFactory(e) {
            return "string" == typeof e ? Z(this.loader.load(e)) : Rc(e()).pipe(W(e => e instanceof ze ? Bl(e) : Z(this.compiler.compileModuleAsync(e))))
        }
    }
    class ud {}
    class cd {
        shouldProcessUrl(e) {
            return !0
        }
        extract(e) {
            return e
        }
        merge(e, t) {
            return e
        }
    }

    function hd(e) {
        throw e
    }

    function dd(e, t, n) {
        return t.parse("/")
    }

    function pd(e, t) {
        return Bl(null)
    }
    class fd {
        constructor(e, t, n, r, s, i, o, l) {
            this.rootComponentType = e, this.urlSerializer = t, this.rootContexts = n, this.location = r, this.config = l, this.lastSuccessfulNavigation = null, this.currentNavigation = null, this.navigationId = 0, this.isNgZoneEnabled = !1, this.events = new k, this.errorHandler = hd, this.malformedUriErrorHandler = dd, this.navigated = !1, this.lastSuccessfulId = -1, this.hooks = {
                beforePreactivation: pd,
                afterPreactivation: pd
            }, this.urlHandlingStrategy = new cd, this.routeReuseStrategy = new od, this.onSameUrlNavigation = "ignore", this.paramsInheritanceStrategy = "emptyOnly", this.urlUpdateStrategy = "deferred", this.relativeLinkResolution = "legacy", this.ngModule = s.get(Fe), this.console = s.get(Hs);
            const a = s.get(ii);
            this.isNgZoneEnabled = a instanceof ii, this.resetConfig(l), this.currentUrlTree = new Ac(new Nc([], {}), {}, null), this.rawUrlTree = this.currentUrlTree, this.browserUrlTree = this.currentUrlTree, this.configLoader = new ad(i, o, e => this.triggerEvent(new ic(e)), e => this.triggerEvent(new oc(e))), this.routerState = nh(this.currentUrlTree, this.rootComponentType), this.transitions = new ql({
                id: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(this.currentUrlTree),
                urlAfterRedirects: this.urlHandlingStrategy.extract(this.currentUrlTree),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: "imperative",
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: {
                    canActivateChecks: [],
                    canDeactivateChecks: []
                },
                guardsResult: null
            }), this.navigations = this.setupNavigations(this.transitions), this.processNavigations()
        }
        setupNavigations(e) {
            const t = this.events;
            return e.pipe(Xl(e => 0 !== e.id), z(e => Object.assign({}, e, {
                extractedUrl: this.urlHandlingStrategy.extract(e.rawUrl)
            })), Ea(e => {
                let n = !1,
                    r = !1;
                return Bl(e).pipe(la(e => {
                    this.currentNavigation = {
                        id: e.id,
                        initialUrl: e.currentRawUrl,
                        extractedUrl: e.extractedUrl,
                        trigger: e.source,
                        extras: e.extras,
                        previousNavigation: this.lastSuccessfulNavigation ? Object.assign({}, this.lastSuccessfulNavigation, {
                            previousNavigation: null
                        }) : null
                    }
                }), Ea(e => {
                    const n = !this.navigated || e.extractedUrl.toString() !== this.browserUrlTree.toString();
                    if (("reload" === this.onSameUrlNavigation || n) && this.urlHandlingStrategy.shouldProcessUrl(e.rawUrl)) return Bl(e).pipe(Ea(e => {
                        const n = this.transitions.getValue();
                        return t.next(new Ku(e.id, this.serializeUrl(e.extractedUrl), e.source, e.restoredState)), n !== this.transitions.getValue() ? Fl : [e]
                    }), Ea(e => Promise.resolve(e)), function(e, t, n, r) {
                        return function(s) {
                            return s.pipe(Ea(s => (function(e, t, n, r, s) {
                                return new Ph(e, t, n, r, s).apply()
                            })(e, t, n, s.extractedUrl, r).pipe(z(e => Object.assign({}, s, {
                                urlAfterRedirects: e
                            })))))
                        }
                    }(this.ngModule.injector, this.configLoader, this.urlSerializer, this.config), la(e => {
                        this.currentNavigation = Object.assign({}, this.currentNavigation, {
                            finalUrl: e.urlAfterRedirects
                        })
                    }), function(e, t, n, r, s) {
                        return function(i) {
                            return i.pipe(W(i => (function(e, t, n, r, s = "emptyOnly", i = "legacy") {
                                return new Qh(e, t, n, r, s, i).recognize()
                            })(e, t, i.urlAfterRedirects, n(i.urlAfterRedirects), r, s).pipe(z(e => Object.assign({}, i, {
                                targetSnapshot: e
                            })))))
                        }
                    }(this.rootComponentType, this.config, e => this.serializeUrl(e), this.paramsInheritanceStrategy, this.relativeLinkResolution), la(e => {
                        "eager" === this.urlUpdateStrategy && (e.extras.skipLocationChange || this.setBrowserUrl(e.urlAfterRedirects, !!e.extras.replaceUrl, e.id, e.extras.state), this.browserUrlTree = e.urlAfterRedirects)
                    }), la(e => {
                        const n = new ec(e.id, this.serializeUrl(e.extractedUrl), this.serializeUrl(e.urlAfterRedirects), e.targetSnapshot);
                        t.next(n)
                    }));
                    if (n && this.rawUrlTree && this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)) {
                        const {
                            id: n,
                            extractedUrl: r,
                            source: s,
                            restoredState: i,
                            extras: o
                        } = e, l = new Ku(n, this.serializeUrl(r), s, i);
                        t.next(l);
                        const a = nh(r, this.rootComponentType).snapshot;
                        return Bl(Object.assign({}, e, {
                            targetSnapshot: a,
                            urlAfterRedirects: r,
                            extras: Object.assign({}, o, {
                                skipLocationChange: !1,
                                replaceUrl: !1
                            })
                        }))
                    }
                    return this.rawUrlTree = e.rawUrl, this.browserUrlTree = e.urlAfterRedirects, e.resolve(null), Fl
                }), sd(e => {
                    const {
                        targetSnapshot: t,
                        id: n,
                        extractedUrl: r,
                        rawUrl: s,
                        extras: {
                            skipLocationChange: i,
                            replaceUrl: o
                        }
                    } = e;
                    return this.hooks.beforePreactivation(t, {
                        navigationId: n,
                        appliedUrlTree: r,
                        rawUrlTree: s,
                        skipLocationChange: !!i,
                        replaceUrl: !!o
                    })
                }), la(e => {
                    const t = new tc(e.id, this.serializeUrl(e.extractedUrl), this.serializeUrl(e.urlAfterRedirects), e.targetSnapshot);
                    this.triggerEvent(t)
                }), z(e => Object.assign({}, e, {
                    guards: Vh(e.targetSnapshot, e.currentSnapshot, this.rootContexts)
                })), function(e, t) {
                    return function(n) {
                        return n.pipe(W(n => {
                            const {
                                targetSnapshot: r,
                                currentSnapshot: s,
                                guards: {
                                    canActivateChecks: i,
                                    canDeactivateChecks: o
                                }
                            } = n;
                            return 0 === o.length && 0 === i.length ? Bl(Object.assign({}, n, {
                                guardsResult: !0
                            })) : function(e, t, n, r) {
                                return Z(e).pipe(W(e => (function(e, t, n, r, s) {
                                    const i = t && t.routeConfig ? t.routeConfig.canDeactivate : null;
                                    return i && 0 !== i.length ? Bl(i.map(i => {
                                        const o = Hh(i, t, s);
                                        let l;
                                        if (function(e) {
                                                return e && Eh(e.canDeactivate)
                                            }(o)) l = Rc(o.canDeactivate(e, t, n, r));
                                        else {
                                            if (!Eh(o)) throw new Error("Invalid CanDeactivate guard");
                                            l = Rc(o(e, t, n, r))
                                        }
                                        return l.pipe(Ca())
                                    })).pipe($h()) : Bl(!0)
                                })(e.component, e.route, n, t, r)), Ca(e => !0 !== e, !0))
                            }(o, r, s, e).pipe(W(n => n && function(e) {
                                return "boolean" == typeof e
                            }(n) ? function(e, t, n, r) {
                                return Z(t).pipe(Na(t => Z([qh(t.route.parent, r), Bh(t.route, r), Wh(e, t.path, n), Zh(e, t.route, n)]).pipe(Yl(), Ca(e => !0 !== e, !0))), Ca(e => !0 !== e, !0))
                            }(r, i, e, t) : Bl(n)), z(e => Object.assign({}, n, {
                                guardsResult: e
                            })))
                        }))
                    }
                }(this.ngModule.injector, e => this.triggerEvent(e)), la(e => {
                    if (Th(e.guardsResult)) {
                        const t = vc(`Redirecting to "${this.serializeUrl(e.guardsResult)}"`);
                        throw t.url = e.guardsResult, t
                    }
                }), la(e => {
                    const t = new nc(e.id, this.serializeUrl(e.extractedUrl), this.serializeUrl(e.urlAfterRedirects), e.targetSnapshot, !!e.guardsResult);
                    this.triggerEvent(t)
                }), Xl(e => {
                    if (!e.guardsResult) {
                        this.resetUrlToCurrentUrlTree();
                        const n = new Yu(e.id, this.serializeUrl(e.extractedUrl), "");
                        return t.next(n), e.resolve(!1), !1
                    }
                    return !0
                }), sd(e => {
                    if (e.guards.canActivateChecks.length) return Bl(e).pipe(la(e => {
                        const t = new rc(e.id, this.serializeUrl(e.extractedUrl), this.serializeUrl(e.urlAfterRedirects), e.targetSnapshot);
                        this.triggerEvent(t)
                    }), function(e, t) {
                        return function(n) {
                            return n.pipe(W(n => {
                                const {
                                    targetSnapshot: r,
                                    guards: {
                                        canActivateChecks: s
                                    }
                                } = n;
                                return s.length ? Z(s).pipe(Na(n => (function(e, t, n, r) {
                                    return function(e, t, n, r) {
                                        const s = Object.keys(e);
                                        if (0 === s.length) return Bl({});
                                        if (1 === s.length) {
                                            const i = s[0];
                                            return rd(e[i], t, n, r).pipe(z(e => ({
                                                [i]: e
                                            })))
                                        }
                                        const i = {};
                                        return Z(s).pipe(W(s => rd(e[s], t, n, r).pipe(z(e => (i[s] = e, e))))).pipe(ga(), z(() => i))
                                    }(e._resolve, e, t, r).pipe(z(t => (e._resolvedData = t, e.data = Object.assign({}, e.data, sh(e, n).resolve), null)))
                                })(n.route, r, e, t)), function(e, t) {
                                    return arguments.length >= 2 ? function(n) {
                                        return w(Ra(e, t), sa(1), da(t))(n)
                                    } : function(t) {
                                        return w(Ra((t, n, r) => e(t, n, r + 1)), sa(1))(t)
                                    }
                                }((e, t) => e), z(e => n)) : Bl(n)
                            }))
                        }
                    }(this.paramsInheritanceStrategy, this.ngModule.injector), la(e => {
                        const t = new sc(e.id, this.serializeUrl(e.extractedUrl), this.serializeUrl(e.urlAfterRedirects), e.targetSnapshot);
                        this.triggerEvent(t)
                    }))
                }), sd(e => {
                    const {
                        targetSnapshot: t,
                        id: n,
                        extractedUrl: r,
                        rawUrl: s,
                        extras: {
                            skipLocationChange: i,
                            replaceUrl: o
                        }
                    } = e;
                    return this.hooks.afterPreactivation(t, {
                        navigationId: n,
                        appliedUrlTree: r,
                        rawUrlTree: s,
                        skipLocationChange: !!i,
                        replaceUrl: !!o
                    })
                }), z(e => {
                    const t = function(e, t, n) {
                        const r = function e(t, n, r) {
                            if (r && t.shouldReuseRoute(n.value, r.value.snapshot)) {
                                const s = r.value;
                                s._futureSnapshot = n.value;
                                const i = function(t, n, r) {
                                    return n.children.map(n => {
                                        for (const s of r.children)
                                            if (t.shouldReuseRoute(s.value.snapshot, n.value)) return e(t, n, s);
                                        return e(t, n)
                                    })
                                }(t, n, r);
                                return new Xc(s, i)
                            } {
                                const r = t.retrieve(n.value);
                                if (r) {
                                    const e = r.route;
                                    return function e(t, n) {
                                        if (t.value.routeConfig !== n.value.routeConfig) throw new Error("Cannot reattach ActivatedRouteSnapshot created from a different route");
                                        if (t.children.length !== n.children.length) throw new Error("Cannot reattach ActivatedRouteSnapshot with a different number of children");
                                        n.value._futureSnapshot = t.value;
                                        for (let r = 0; r < t.children.length; ++r) e(t.children[r], n.children[r])
                                    }(n, e), e
                                } {
                                    const r = new rh(new ql((s = n.value).url), new ql(s.params), new ql(s.queryParams), new ql(s.fragment), new ql(s.data), s.outlet, s.component, s),
                                        i = n.children.map(n => e(t, n));
                                    return new Xc(r, i)
                                }
                            }
                            var s
                        }(e, t._root, n ? n._root : void 0);
                        return new th(r, t)
                    }(this.routeReuseStrategy, e.targetSnapshot, e.currentRouterState);
                    return Object.assign({}, e, {
                        targetRouterState: t
                    })
                }), la(e => {
                    this.currentUrlTree = e.urlAfterRedirects, this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, e.rawUrl), this.routerState = e.targetRouterState, "deferred" === this.urlUpdateStrategy && (e.extras.skipLocationChange || this.setBrowserUrl(this.rawUrlTree, !!e.extras.replaceUrl, e.id, e.extras.state), this.browserUrlTree = e.urlAfterRedirects)
                }), Ch(this.rootContexts, this.routeReuseStrategy, e => this.triggerEvent(e)), la({
                    next() {
                        n = !0
                    },
                    complete() {
                        n = !0
                    }
                }), function(e) {
                    return t => t.lift(new Pa(e))
                }(() => {
                    if (!n && !r) {
                        this.resetUrlToCurrentUrlTree();
                        const n = new Yu(e.id, this.serializeUrl(e.extractedUrl), `Navigation ID ${e.id} is not equal to the current navigation id ${this.navigationId}`);
                        t.next(n), e.resolve(!1)
                    }
                    this.currentNavigation = null
                }), ma(n => {
                    if (r = !0, function(e) {
                            return e && e[mc]
                        }(n)) {
                        const r = Th(n.url);
                        r || (this.navigated = !0, this.resetStateAndUrl(e.currentRouterState, e.currentUrlTree, e.rawUrl));
                        const s = new Yu(e.id, this.serializeUrl(e.extractedUrl), n.message);
                        t.next(s), e.resolve(!1), r && this.navigateByUrl(n.url)
                    } else {
                        this.resetStateAndUrl(e.currentRouterState, e.currentUrlTree, e.rawUrl);
                        const r = new Xu(e.id, this.serializeUrl(e.extractedUrl), n);
                        t.next(r);
                        try {
                            e.resolve(this.errorHandler(n))
                        } catch (s) {
                            e.reject(s)
                        }
                    }
                    return Fl
                }))
            }))
        }
        resetRootComponentType(e) {
            this.rootComponentType = e, this.routerState.root.component = this.rootComponentType
        }
        getTransition() {
            const e = this.transitions.value;
            return e.urlAfterRedirects = this.browserUrlTree, e
        }
        setTransition(e) {
            this.transitions.next(Object.assign({}, this.getTransition(), e))
        }
        initialNavigation() {
            this.setUpLocationChangeListener(), 0 === this.navigationId && this.navigateByUrl(this.location.path(!0), {
                replaceUrl: !0
            })
        }
        setUpLocationChangeListener() {
            this.locationSubscription || (this.locationSubscription = this.location.subscribe(e => {
                let t = this.parseUrl(e.url);
                const n = "popstate" === e.type ? "popstate" : "hashchange",
                    r = e.state && e.state.navigationId ? e.state : null;
                setTimeout(() => {
                    this.scheduleNavigation(t, n, r, {
                        replaceUrl: !0
                    })
                }, 0)
            }))
        }
        get url() {
            return this.serializeUrl(this.currentUrlTree)
        }
        getCurrentNavigation() {
            return this.currentNavigation
        }
        triggerEvent(e) {
            this.events.next(e)
        }
        resetConfig(e) {
            bc(e), this.config = e.map(xc), this.navigated = !1, this.lastSuccessfulId = -1
        }
        ngOnDestroy() {
            this.dispose()
        }
        dispose() {
            this.locationSubscription && (this.locationSubscription.unsubscribe(), this.locationSubscription = null)
        }
        createUrlTree(e, t = {}) {
            const {
                relativeTo: n,
                queryParams: r,
                fragment: s,
                preserveQueryParams: i,
                queryParamsHandling: o,
                preserveFragment: l
            } = t;
            nt() && i && console && console.warn && console.warn("preserveQueryParams is deprecated, use queryParamsHandling instead.");
            const a = n || this.routerState.root,
                u = l ? this.currentUrlTree.fragment : s;
            let c = null;
            if (o) switch (o) {
                case "merge":
                    c = Object.assign({}, this.currentUrlTree.queryParams, r);
                    break;
                case "preserve":
                    c = this.currentUrlTree.queryParams;
                    break;
                default:
                    c = r || null
            } else c = i ? this.currentUrlTree.queryParams : r || null;
            return null !== c && (c = this.removeEmptyProps(c)),
                function(e, t, n, r, s) {
                    if (0 === n.length) return dh(t.root, t.root, t, r, s);
                    const i = function(e) {
                        if ("string" == typeof e[0] && 1 === e.length && "/" === e[0]) return new ph(!0, 0, e);
                        let t = 0,
                            n = !1;
                        const r = e.reduce((e, r, s) => {
                            if ("object" == typeof r && null != r) {
                                if (r.outlets) {
                                    const t = {};
                                    return kc(r.outlets, (e, n) => {
                                        t[n] = "string" == typeof e ? e.split("/") : e
                                    }), [...e, {
                                        outlets: t
                                    }]
                                }
                                if (r.segmentPath) return [...e, r.segmentPath]
                            }
                            return "string" != typeof r ? [...e, r] : 0 === s ? (r.split("/").forEach((r, s) => {
                                0 == s && "." === r || (0 == s && "" === r ? n = !0 : ".." === r ? t++ : "" != r && e.push(r))
                            }), e) : [...e, r]
                        }, []);
                        return new ph(n, t, r)
                    }(n);
                    if (i.toRoot()) return dh(t.root, new Nc([], {}), t, r, s);
                    const o = function(e, t, n) {
                            if (e.isAbsolute) return new fh(t.root, !0, 0);
                            if (-1 === n.snapshot._lastPathIndex) return new fh(n.snapshot._urlSegment, !0, 0);
                            const r = hh(e.commands[0]) ? 0 : 1;
                            return function(e, t, n) {
                                let r = e,
                                    s = t,
                                    i = n;
                                for (; i > s;) {
                                    if (i -= s, !(r = r.parent)) throw new Error("Invalid number of '../'");
                                    s = r.segments.length
                                }
                                return new fh(r, !1, s - i)
                            }(n.snapshot._urlSegment, n.snapshot._lastPathIndex + r, e.numberOfDoubleDots)
                        }(i, t, e),
                        l = o.processChildren ? vh(o.segmentGroup, o.index, i.commands) : mh(o.segmentGroup, o.index, i.commands);
                    return dh(o.segmentGroup, l, t, r, s)
                }(a, this.currentUrlTree, e, c, u)
        }
        navigateByUrl(e, t = {
            skipLocationChange: !1
        }) {
            nt() && this.isNgZoneEnabled && !ii.isInAngularZone() && this.console.warn("Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?");
            const n = Th(e) ? e : this.parseUrl(e),
                r = this.urlHandlingStrategy.merge(n, this.rawUrlTree);
            return this.scheduleNavigation(r, "imperative", null, t)
        }
        navigate(e, t = {
            skipLocationChange: !1
        }) {
            return function(e) {
                for (let t = 0; t < e.length; t++) {
                    const n = e[t];
                    if (null == n) throw new Error(`The requested path contains ${n} segment at index ${t}`)
                }
            }(e), this.navigateByUrl(this.createUrlTree(e, t), t)
        }
        serializeUrl(e) {
            return this.urlSerializer.serialize(e)
        }
        parseUrl(e) {
            let t;
            try {
                t = this.urlSerializer.parse(e)
            } catch (n) {
                t = this.malformedUriErrorHandler(n, this.urlSerializer, e)
            }
            return t
        }
        isActive(e, t) {
            if (Th(e)) return Ic(this.currentUrlTree, e, t);
            const n = this.parseUrl(e);
            return Ic(this.currentUrlTree, n, t)
        }
        removeEmptyProps(e) {
            return Object.keys(e).reduce((t, n) => {
                const r = e[n];
                return null != r && (t[n] = r), t
            }, {})
        }
        processNavigations() {
            this.navigations.subscribe(e => {
                this.navigated = !0, this.lastSuccessfulId = e.id, this.events.next(new Ju(e.id, this.serializeUrl(e.extractedUrl), this.serializeUrl(this.currentUrlTree))), this.lastSuccessfulNavigation = this.currentNavigation, this.currentNavigation = null, e.resolve(!0)
            }, e => {
                this.console.warn("Unhandled Navigation Error: ")
            })
        }
        scheduleNavigation(e, t, n, r) {
            const s = this.getTransition();
            if (s && "imperative" !== t && "imperative" === s.source && s.rawUrl.toString() === e.toString()) return Promise.resolve(!0);
            if (s && "hashchange" == t && "popstate" === s.source && s.rawUrl.toString() === e.toString()) return Promise.resolve(!0);
            if (s && "popstate" == t && "hashchange" === s.source && s.rawUrl.toString() === e.toString()) return Promise.resolve(!0);
            let i = null,
                o = null;
            const l = new Promise((e, t) => {
                    i = e, o = t
                }),
                a = ++this.navigationId;
            return this.setTransition({
                id: a,
                source: t,
                restoredState: n,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.rawUrlTree,
                rawUrl: e,
                extras: r,
                resolve: i,
                reject: o,
                promise: l,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState
            }), l.catch(e => Promise.reject(e))
        }
        setBrowserUrl(e, t, n, r) {
            const s = this.urlSerializer.serialize(e);
            r = r || {}, this.location.isCurrentPathEqualTo(s) || t ? this.location.replaceState(s, "", Object.assign({}, r, {
                navigationId: n
            })) : this.location.go(s, "", Object.assign({}, r, {
                navigationId: n
            }))
        }
        resetStateAndUrl(e, t, n) {
            this.routerState = e, this.currentUrlTree = t, this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, n), this.resetUrlToCurrentUrlTree()
        }
        resetUrlToCurrentUrlTree() {
            this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree), "", {
                navigationId: this.lastSuccessfulId
            })
        }
    }
    class gd {
        constructor(e, t, n) {
            this.router = e, this.route = t, this.locationStrategy = n, this.commands = [], this.subscription = e.events.subscribe(e => {
                e instanceof Ju && this.updateTargetUrlAndHref()
            })
        }
        set routerLink(e) {
            this.commands = null != e ? Array.isArray(e) ? e : [e] : []
        }
        set preserveQueryParams(e) {
            nt() && console && console.warn && console.warn("preserveQueryParams is deprecated, use queryParamsHandling instead."), this.preserve = e
        }
        ngOnChanges(e) {
            this.updateTargetUrlAndHref()
        }
        ngOnDestroy() {
            this.subscription.unsubscribe()
        }
        onClick(e, t, n, r) {
            if (0 !== e || t || n || r) return !0;
            if ("string" == typeof this.target && "_self" != this.target) return !0;
            const s = {
                skipLocationChange: md(this.skipLocationChange),
                replaceUrl: md(this.replaceUrl),
                state: this.state
            };
            return this.router.navigateByUrl(this.urlTree, s), !1
        }
        updateTargetUrlAndHref() {
            this.href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.urlTree))
        }
        get urlTree() {
            return this.router.createUrlTree(this.commands, {
                relativeTo: this.route,
                queryParams: this.queryParams,
                fragment: this.fragment,
                preserveQueryParams: md(this.preserve),
                queryParamsHandling: this.queryParamsHandling,
                preserveFragment: md(this.preserveFragment)
            })
        }
    }

    function md(e) {
        return "" === e || !!e
    }
    class vd {
        constructor() {
            this.outlet = null, this.route = null, this.resolver = null, this.children = new yd, this.attachRef = null
        }
    }
    class yd {
        constructor() {
            this.contexts = new Map
        }
        onChildOutletCreated(e, t) {
            const n = this.getOrCreateContext(e);
            n.outlet = t, this.contexts.set(e, n)
        }
        onChildOutletDestroyed(e) {
            const t = this.getContext(e);
            t && (t.outlet = null)
        }
        onOutletDeactivated() {
            const e = this.contexts;
            return this.contexts = new Map, e
        }
        onOutletReAttached(e) {
            this.contexts = e
        }
        getOrCreateContext(e) {
            let t = this.getContext(e);
            return t || (t = new vd, this.contexts.set(e, t)), t
        }
        getContext(e) {
            return this.contexts.get(e) || null
        }
    }
    class wd {
        constructor(e, t, n, r, s) {
            this.parentContexts = e, this.location = t, this.resolver = n, this.changeDetector = s, this.activated = null, this._activatedRoute = null, this.activateEvents = new Is, this.deactivateEvents = new Is, this.name = r || pc, e.onChildOutletCreated(this.name, this)
        }
        ngOnDestroy() {
            this.parentContexts.onChildOutletDestroyed(this.name)
        }
        ngOnInit() {
            if (!this.activated) {
                const e = this.parentContexts.getContext(this.name);
                e && e.route && (e.attachRef ? this.attach(e.attachRef, e.route) : this.activateWith(e.route, e.resolver || null))
            }
        }
        get isActivated() {
            return !!this.activated
        }
        get component() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this.activated.instance
        }
        get activatedRoute() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this._activatedRoute
        }
        get activatedRouteData() {
            return this._activatedRoute ? this._activatedRoute.snapshot.data : {}
        }
        detach() {
            if (!this.activated) throw new Error("Outlet is not activated");
            this.location.detach();
            const e = this.activated;
            return this.activated = null, this._activatedRoute = null, e
        }
        attach(e, t) {
            this.activated = e, this._activatedRoute = t, this.location.insert(e.hostView)
        }
        deactivate() {
            if (this.activated) {
                const e = this.component;
                this.activated.destroy(), this.activated = null, this._activatedRoute = null, this.deactivateEvents.emit(e)
            }
        }
        activateWith(e, t) {
            if (this.isActivated) throw new Error("Cannot activate an already activated outlet");
            this._activatedRoute = e;
            const n = (t = t || this.resolver).resolveComponentFactory(e._futureSnapshot.routeConfig.component),
                r = this.parentContexts.getOrCreateContext(this.name).children,
                s = new bd(e, r, this.location.injector);
            this.activated = this.location.createComponent(n, this.location.length, s), this.changeDetector.markForCheck(), this.activateEvents.emit(this.activated.instance)
        }
    }
    class bd {
        constructor(e, t, n) {
            this.route = e, this.childContexts = t, this.parent = n
        }
        get(e, t) {
            return e === rh ? this.route : e === yd ? this.childContexts : this.parent.get(e, t)
        }
    }
    class _d {}
    class Cd {
        preload(e, t) {
            return t().pipe(ma(() => Bl(null)))
        }
    }
    class xd {
        preload(e, t) {
            return Bl(null)
        }
    }
    class Sd {
        constructor(e, t, n, r, s) {
            this.router = e, this.injector = r, this.preloadingStrategy = s, this.loader = new ad(t, n, t => e.triggerEvent(new ic(t)), t => e.triggerEvent(new oc(t)))
        }
        setUpPreloading() {
            this.subscription = this.router.events.pipe(Xl(e => e instanceof Ju), Na(() => this.preload())).subscribe(() => {})
        }
        preload() {
            const e = this.injector.get(Fe);
            return this.processRoutes(e, this.router.config)
        }
        ngOnDestroy() {
            this.subscription.unsubscribe()
        }
        processRoutes(e, t) {
            const n = [];
            for (const r of t)
                if (r.loadChildren && !r.canLoad && r._loadedConfig) {
                    const e = r._loadedConfig;
                    n.push(this.processRoutes(e.module, e.routes))
                } else r.loadChildren && !r.canLoad ? n.push(this.preloadConfig(e, r)) : r.children && n.push(this.processRoutes(e, r.children));
            return Z(n).pipe(J(), z(e => void 0))
        }
        preloadConfig(e, t) {
            return this.preloadingStrategy.preload(t, () => this.loader.load(e.injector, t).pipe(W(e => (t._loadedConfig = e, this.processRoutes(e.module, e.routes)))))
        }
    }
    class Ed {
        constructor(e, t, n = {}) {
            this.router = e, this.viewportScroller = t, this.options = n, this.lastId = 0, this.lastSource = "imperative", this.restoredId = 0, this.store = {}, n.scrollPositionRestoration = n.scrollPositionRestoration || "disabled", n.anchorScrolling = n.anchorScrolling || "disabled"
        }
        init() {
            "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.setHistoryScrollRestoration("manual"), this.routerEventsSubscription = this.createScrollEvents(), this.scrollEventsSubscription = this.consumeScrollEvents()
        }
        createScrollEvents() {
            return this.router.events.subscribe(e => {
                e instanceof Ku ? (this.store[this.lastId] = this.viewportScroller.getScrollPosition(), this.lastSource = e.navigationTrigger, this.restoredId = e.restoredState ? e.restoredState.navigationId : 0) : e instanceof Ju && (this.lastId = e.id, this.scheduleScrollEvent(e, this.router.parseUrl(e.urlAfterRedirects).fragment))
            })
        }
        consumeScrollEvents() {
            return this.router.events.subscribe(e => {
                e instanceof hc && (e.position ? "top" === this.options.scrollPositionRestoration ? this.viewportScroller.scrollToPosition([0, 0]) : "enabled" === this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition(e.position) : e.anchor && "enabled" === this.options.anchorScrolling ? this.viewportScroller.scrollToAnchor(e.anchor) : "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition([0, 0]))
            })
        }
        scheduleScrollEvent(e, t) {
            this.router.triggerEvent(new hc(e, "popstate" === this.lastSource ? this.store[this.restoredId] : null, t))
        }
        ngOnDestroy() {
            this.routerEventsSubscription && this.routerEventsSubscription.unsubscribe(), this.scrollEventsSubscription && this.scrollEventsSubscription.unsubscribe()
        }
    }
    const Td = new Ee("ROUTER_CONFIGURATION"), kd = new Ee("ROUTER_FORROOT_GUARD"), Rd = [bl, {
        provide: Mc,
        useClass: Lc
    }, {
        provide: fd,
        useFactory: Md,
        deps: [Ei, Mc, yd, bl, Dt, ki, Gs, ld, Td, [ud, new ae],
            [id, new ae]
        ]
    }, yd, {
        provide: rh,
        useFactory: Ld,
        deps: [fd]
    }, {
        provide: ki,
        useClass: Pi
    }, Sd, xd, Cd, {
        provide: Td,
        useValue: {
            enableTracing: !1
        }
    }];

    function Id() {
        return new bi("Router", fd)
    }
    class Ad {
        constructor(e, t) {}
        static forRoot(e, t) {
            return {
                ngModule: Ad,
                providers: [Rd, Dd(e), {
                        provide: kd,
                        useFactory: Od,
                        deps: [
                            [fd, new ae, new ce]
                        ]
                    }, {
                        provide: Td,
                        useValue: t || {}
                    }, {
                        provide: yl,
                        useFactory: Pd,
                        deps: [ml, [new le(wl), new ae], Td]
                    }, {
                        provide: Ed,
                        useFactory: Nd,
                        deps: [fd, Vl, Td]
                    }, {
                        provide: _d,
                        useExisting: t && t.preloadingStrategy ? t.preloadingStrategy : xd
                    }, {
                        provide: bi,
                        multi: !0,
                        useFactory: Id
                    },
                    [Ud, {
                        provide: Ps,
                        multi: !0,
                        useFactory: jd,
                        deps: [Ud]
                    }, {
                        provide: Hd,
                        useFactory: Vd,
                        deps: [Ud]
                    }, {
                        provide: Vs,
                        multi: !0,
                        useExisting: Hd
                    }]
                ]
            }
        }
        static forChild(e) {
            return {
                ngModule: Ad,
                providers: [Dd(e)]
            }
        }
    }

    function Nd(e, t, n) {
        return n.scrollOffset && t.setOffset(n.scrollOffset), new Ed(e, t, n)
    }

    function Pd(e, t, n = {}) {
        return n.useHash ? new Cl(e, t) : new xl(e, t)
    }

    function Od(e) {
        if (e) throw new Error("RouterModule.forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead.");
        return "guarded"
    }

    function Dd(e) {
        return [{
            provide: $t,
            multi: !0,
            useValue: e
        }, {
            provide: ld,
            multi: !0,
            useValue: e
        }]
    }

    function Md(e, t, n, r, s, i, o, l, a = {}, u, c) {
        const h = new fd(null, t, n, r, s, i, o, Ec(l));
        if (u && (h.urlHandlingStrategy = u), c && (h.routeReuseStrategy = c), a.errorHandler && (h.errorHandler = a.errorHandler), a.malformedUriErrorHandler && (h.malformedUriErrorHandler = a.malformedUriErrorHandler), a.enableTracing) {
            const e = Ma();
            h.events.subscribe(t => {
                e.logGroup(`Router Event: ${t.constructor.name}`), e.log(t.toString()), e.log(t), e.logGroupEnd()
            })
        }
        return a.onSameUrlNavigation && (h.onSameUrlNavigation = a.onSameUrlNavigation), a.paramsInheritanceStrategy && (h.paramsInheritanceStrategy = a.paramsInheritanceStrategy), a.urlUpdateStrategy && (h.urlUpdateStrategy = a.urlUpdateStrategy), a.relativeLinkResolution && (h.relativeLinkResolution = a.relativeLinkResolution), h
    }

    function Ld(e) {
        return e.routerState.root
    }
    class Ud {
        constructor(e) {
            this.injector = e, this.initNavigation = !1, this.resultOfPreactivationDone = new k
        }
        appInitializer() {
            return this.injector.get(vl, Promise.resolve(null)).then(() => {
                let e = null;
                const t = new Promise(t => e = t),
                    n = this.injector.get(fd),
                    r = this.injector.get(Td);
                if (this.isLegacyDisabled(r) || this.isLegacyEnabled(r)) e(!0);
                else if ("disabled" === r.initialNavigation) n.setUpLocationChangeListener(), e(!0);
                else {
                    if ("enabled" !== r.initialNavigation) throw new Error(`Invalid initialNavigation options: '${r.initialNavigation}'`);
                    n.hooks.afterPreactivation = () => this.initNavigation ? Bl(null) : (this.initNavigation = !0, e(!0), this.resultOfPreactivationDone), n.initialNavigation()
                }
                return t
            })
        }
        bootstrapListener(e) {
            const t = this.injector.get(Td),
                n = this.injector.get(Sd),
                r = this.injector.get(Ed),
                s = this.injector.get(fd),
                i = this.injector.get(Ei);
            e === i.components[0] && (this.isLegacyEnabled(t) ? s.initialNavigation() : this.isLegacyDisabled(t) && s.setUpLocationChangeListener(), n.setUpPreloading(), r.init(), s.resetRootComponentType(i.componentTypes[0]), this.resultOfPreactivationDone.next(null), this.resultOfPreactivationDone.complete())
        }
        isLegacyEnabled(e) {
            return "legacy_enabled" === e.initialNavigation || !0 === e.initialNavigation || void 0 === e.initialNavigation
        }
        isLegacyDisabled(e) {
            return "legacy_disabled" === e.initialNavigation || !1 === e.initialNavigation
        }
    }

    function jd(e) {
        return e.appInitializer.bind(e)
    }

    function Vd(e) {
        return e.bootstrapListener.bind(e)
    }
    const Hd = new Ee("Router Initializer");
    var Fd = er({
        encapsulation: 2,
        styles: [],
        data: {}
    });

    function zd(e) {
        return oo(0, [(e()(), Wi(0, 16777216, null, null, 1, "router-outlet", [], null, null, null, null, null)), ls(1, 212992, null, 0, wd, [yd, Ln, on, [8, null], At], null, null)], (function(e, t) {
            e(t, 1, 0)
        }), null)
    }

    function $d(e) {
        return oo(0, [(e()(), Wi(0, 0, null, null, 1, "ng-component", [], null, null, null, zd, Fd)), ls(1, 49152, null, 0, dc, [], null, null)], null, null)
    }
    var Bd = Ur("ng-component", dc, $d, {}, {}, []); class qd {
        constructor(e, t = 0) {
            this.name = e, this.score = t
        }
    }
    class Zd {
        constructor() {
            this.items = [], this.listChangeEmitter = new Is, this.isVisibleEmitter = new Is
        }
        ngOnInit() {}
        addItem(e) {
            e && (this.items.push(new qd(e, 0)), this.listChangeEmitter.emit(this.items))
        }
        removeItem(e) {
            const t = this.items.indexOf(e); - 1 !== t && (this.items.splice(t, 1), this.listChangeEmitter.emit(this.items))
        }
        finishList() {
            this.isVisibleEmitter.emit(!1)
        }
    }
    var Wd = er({
        encapsulation: 0,
        styles: [
            [""]
        ],
        data: {}
    });

    function Gd(e) {
        return oo(0, [(e()(), Wi(0, 0, null, null, 3, "li", [], null, null, null, null, null)), (e()(), ro(1, null, [" ", " "])), (e()(), Wi(2, 0, null, null, 1, "button", [], null, [
            [null, "click"]
        ], (function(e, t, n) {
            var r = !0;
            return "click" === t && (r = !1 !== e.component.removeItem(e.context.$implicit) && r), r
        }), null, null)), (e()(), ro(-1, null, ["Remove"]))], null, (function(e, t) {
            e(t, 1, 0, t.context.$implicit.name)
        }))
    }

    function Qd(e) {
        return oo(0, [(e()(), Wi(0, 0, null, null, 16, "div", [
            ["id", "keuzetool-creator-body"]
        ], null, null, null, null, null)), (e()(), Wi(1, 0, null, null, 1, "h2", [
            ["id", "creator-header"]
        ], null, null, null, null, null)), (e()(), ro(-1, null, ["Create list"])), (e()(), Wi(3, 0, null, null, 5, "p", [], null, null, null, null, null)), (e()(), ro(-1, null, [" Add items using the add button."])), (e()(), Wi(5, 0, null, null, 0, "br", [], null, null, null, null, null)), (e()(), ro(-1, null, [" Insert unique item names to avoid unexpected behaviour."])), (e()(), Wi(7, 0, null, null, 0, "br", [], null, null, null, null, null)), (e()(), ro(-1, null, [" Press Done to continue. "])), (e()(), Wi(9, 0, [
            ["newItem", 1]
        ], null, 0, "input", [], null, [
            [null, "keyup.enter"],
            [null, "blur"]
        ], (function(e, t, n) {
            var r = !0,
                s = e.component;
            return "keyup.enter" === t && (r = !1 !== s.addItem(Gr(e, 9).value) && r), "blur" === t && (s.addItem(Gr(e, 9).value), r = !1 !== (Gr(e, 9).value = "") && r), r
        }), null, null)), (e()(), Wi(10, 0, null, null, 1, "button", [], null, [
            [null, "click"]
        ], (function(e, t, n) {
            var r = !0;
            return "click" === t && (r = !1 !== e.component.addItem(Gr(e, 9).value) && r), r
        }), null, null)), (e()(), ro(-1, null, ["Add"])), (e()(), Wi(12, 0, null, null, 1, "button", [], null, [
            [null, "click"]
        ], (function(e, t, n) {
            var r = !0;
            return "click" === t && (r = !1 !== e.component.finishList() && r), r
        }), null, null)), (e()(), ro(-1, null, ["Done"])), (e()(), Wi(14, 0, null, null, 2, "ul", [], null, null, null, null, null)), (e()(), Zi(16777216, null, null, 1, null, Gd)), ls(16, 278528, null, 0, Nl, [Ln, Dn, In], {
            ngForOf: [0, "ngForOf"]
        }, null)], (function(e, t) {
            e(t, 16, 0, t.component.items)
        }), null)
    }
    class Kd {
        constructor() {
            this.list = [], this.matchesList = [], this.listEmitter = new Is, this.picksListEmitter = new Is, this.matchesListEmitter = new Is, this.picksList = [], this.resolveVisible = !1, this.highestScore = 0
        }
        ngOnInit() {}
        pick(e, t) {
            this.picksList.push([e[0], e[1], e[t]]);
            const n = this.matchesList.indexOf(e); - 1 !== n && this.matchesList.splice(n, 1), this.picksListEmitter.emit(this.picksList), this.matchesListEmitter.emit(this.matchesList), this.matchesList.length < 1 && (this.resolveVisible = !0), 0 === this.matchesList.length && this.calcHighestScore()
        }
        resolveAll() {
            let e;
            this.calcHighestScore();
            for (let t = this.highestScore; t >= 0; t--) {
                e = [];
                for (const n of this.list) n.score === t && e.push(n);
                e.length > 1 && this.resolveEqualScores(e)
            }
            this.listEmitter.emit(this.list)
        }
        resolveEqualScores(e) {
            for (const t of e)
                for (let n = e.indexOf(t) + 1; n < e.length; n++)
                    for (const r of this.picksList)(r[0].name === t.name && r[1].name === e[n].name || r[1].name === t.name && r[0].name === e[n].name) && (this.list.find(e => e.name === r[2].name).score += 1)
        }
        calcHighestScore() {
            for (const e of this.list) this.highestScore < e.score && (this.highestScore = e.score)
        }
    }
    var Jd = er({
        encapsulation: 0,
        styles: [
            [""]
        ],
        data: {}
    });

    function Yd(e) {
        return oo(0, [(e()(), Wi(0, 0, null, null, 5, "li", [], null, null, null, null, null)), (e()(), Wi(1, 0, null, null, 1, "button", [], null, [
            [null, "click"]
        ], (function(e, t, n) {
            var r = !0;
            return "click" === t && (r = !1 !== e.component.pick(e.context.$implicit, 0) && r), r
        }), null, null)), (e()(), ro(2, null, ["", ""])), (e()(), ro(-1, null, [" VS "])), (e()(), Wi(4, 0, null, null, 1, "button", [], null, [
            [null, "click"]
        ], (function(e, t, n) {
            var r = !0;
            return "click" === t && (r = !1 !== e.component.pick(e.context.$implicit, 1) && r), r
        }), null, null)), (e()(), ro(5, null, ["", ""]))], null, (function(e, t) {
            e(t, 2, 0, t.context.$implicit[0].name), e(t, 5, 0, t.context.$implicit[1].name)
        }))
    }

    function Xd(e) {
        return oo(0, [(e()(), Wi(0, 0, null, null, 2, "ul", [
            ["id", "matches-list"]
        ], null, null, null, null, null)), (e()(), Zi(16777216, null, null, 1, null, Yd)), ls(2, 278528, null, 0, Nl, [Ln, Dn, In], {
            ngForOf: [0, "ngForOf"]
        }, null)], (function(e, t) {
            e(t, 2, 0, t.component.matchesList)
        }), null)
    }

    function ep(e) {
        return oo(0, [(e()(), Wi(0, 0, null, null, 2, "div", [
            ["id", "keuzetool-matches-resolve"]
        ], null, null, null, null, null)), (e()(), Wi(1, 0, null, null, 1, "button", [], null, [
            [null, "click"]
        ], (function(e, t, n) {
            var r = !0;
            return "click" === t && (r = !1 !== e.component.resolveAll() && r), r
        }), null, null)), (e()(), ro(-1, null, ["Resolve"]))], null, null)
    }

    function tp(e) {
        return oo(0, [(e()(), Wi(0, 0, null, null, 10, "div", [
            ["id", "keuzetool-matches-body"]
        ], null, null, null, null, null)), (e()(), Wi(1, 0, null, null, 4, "div", [
            ["id", "keuzetool-matches-header"]
        ], null, null, null, null, null)), (e()(), Wi(2, 0, null, null, 1, "h2", [], null, null, null, null, null)), (e()(), ro(3, null, ["Matches [", "]"])), (e()(), Wi(4, 0, null, null, 1, "p", [], null, null, null, null, null)), (e()(), ro(5, null, ["highest score: ", ""])), (e()(), Wi(6, 0, null, null, 2, "div", [
            ["id", "keuzetool-matches-list"]
        ], null, null, null, null, null)), (e()(), Zi(16777216, null, null, 1, null, Xd)), ls(8, 16384, null, 0, Ol, [Ln, Dn], {
            ngIf: [0, "ngIf"]
        }, null), (e()(), Zi(16777216, null, null, 1, null, ep)), ls(10, 16384, null, 0, Ol, [Ln, Dn], {
            ngIf: [0, "ngIf"]
        }, null)], (function(e, t) {
            var n = t.component;
            e(t, 8, 0, n.matchesList), e(t, 10, 0, n.resolveVisible)
        }), (function(e, t) {
            var n = t.component;
            e(t, 3, 0, n.matches), e(t, 5, 0, n.highestScore)
        }))
    }
    class np {
        constructor() {}
        ngOnInit() {}
    }
    var rp = er({
        encapsulation: 0,
        styles: [
            [""]
        ],
        data: {}
    });

    function sp(e) {
        return oo(0, [(e()(), Wi(0, 0, null, null, 1, "li", [], null, null, null, null, null)), (e()(), ro(1, null, [" [", "] ", " "]))], null, (function(e, t) {
            e(t, 1, 0, t.context.$implicit.score, t.context.$implicit.name)
        }))
    }

    function ip(e) {
        return oo(0, [(e()(), Wi(0, 0, null, null, 7, "div", [
            ["id", "keuzetool-list-body"]
        ], null, null, null, null, null)), (e()(), Wi(1, 0, null, null, 2, "div", [
            ["id", "keuzetool-list-header"]
        ], null, null, null, null, null)), (e()(), Wi(2, 0, null, null, 1, "h2", [], null, null, null, null, null)), (e()(), ro(-1, null, ["List"])), (e()(), Wi(4, 0, null, null, 3, "div", [
            ["id", "keuzetool-list-list"]
        ], null, null, null, null, null)), (e()(), Wi(5, 0, null, null, 2, "ul", [
            ["id", "item-list"]
        ], null, null, null, null, null)), (e()(), Zi(16777216, null, null, 1, null, sp)), ls(7, 278528, null, 0, Nl, [Ln, Dn, In], {
            ngForOf: [0, "ngForOf"]
        }, null)], (function(e, t) {
            e(t, 7, 0, t.component.list)
        }), null)
    }
    class op {
        constructor() {
            this.mainList = [new qd("appel"), new qd("peer"), new qd("banaan"), new qd("kiwi"), new qd("aardbei"), new qd("mandarijn")], this.mainMatchesList = [], this.mainMatches = 0, this.mainPicksList = [], this.listVisible = !0, this.creatorVisible = !0, this.matchesVisible = !1, this.picksVisible = !1
        }
        ngOnInit() {
            this.createMatches(), this.countMatches()
        }
        listChange(e) {
            this.mainList = e, this.createMatches(), this.countMatches()
        }
        listResolved(e) {
            this.mainList = e
        }
        picksChange(e) {
            this.mainPicksList = e, this.clearPoints(), this.assignPoints()
        }
        hideList(e) {
            this.listVisible = e
        }
        hideCreator(e) {
            this.creatorVisible = e, this.createMatches(), this.matchesVisible = !0, this.picksVisible = !0
        }
        hideMatches(e) {
            this.matchesVisible = e
        }
        countMatches() {
            this.mainMatches = this.mainList.length < 1 ? 0 : 1 !== this.mainList.length ? this.countSeries(this.mainList.length - 1) : 0
        }
        countSeries(e) {
            return e * (e + 1) / 2
        }
        createMatches() {
            this.mainMatchesList = [];
            for (const e of this.mainList)
                for (let t = this.mainList.indexOf(e) + 1; t < this.mainList.length; t++) this.mainMatchesList.push([e, this.mainList[t]])
        }
        clearPoints() {
            for (const e of this.mainList) e.score = 0
        }
        assignPoints() {
            for (const e of this.mainPicksList)
                for (const t of this.mainList) t.name === e[2].name && (t.score += 1)
        }
    }
    var lp = er({
        encapsulation: 0,
        styles: [
            ["#keuzetool-body[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;height:100%}#keuzetool-header[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}#keuzetool-components[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-flex:1;flex:1;-webkit-box-align:stretch;align-items:stretch}#item-list-wrapper[_ngcontent-%COMP%]{float:left}app-keuzetool-list[_ngcontent-%COMP%], app-keuzetool-list-creator[_ngcontent-%COMP%], app-keuzetool-matches-list[_ngcontent-%COMP%]{flex-basis:50%;padding-left:50px;padding-right:50px;padding-top:25px}"]
        ],
        data: {}
    });

    function ap(e) {
        return oo(0, [(e()(), Wi(0, 0, null, null, 1, "app-keuzetool-list-creator", [], null, [
            [null, "listChangeEmitter"],
            [null, "isVisibleEmitter"]
        ], (function(e, t, n) {
            var r = !0,
                s = e.component;
            return "listChangeEmitter" === t && (r = !1 !== s.listChange(n) && r), "isVisibleEmitter" === t && (r = !1 !== s.hideCreator(n) && r), r
        }), Qd, Wd)), ls(1, 114688, null, 0, Zd, [], {
            items: [0, "items"]
        }, {
            listChangeEmitter: "listChangeEmitter",
            isVisibleEmitter: "isVisibleEmitter"
        })], (function(e, t) {
            e(t, 1, 0, t.component.mainList)
        }), null)
    }

    function up(e) {
        return oo(0, [(e()(), Wi(0, 0, null, null, 1, "app-keuzetool-matches-list", [], null, [
            [null, "listEmitter"],
            [null, "picksListEmitter"]
        ], (function(e, t, n) {
            var r = !0,
                s = e.component;
            return "listEmitter" === t && (r = !1 !== s.listResolved(n) && r), "picksListEmitter" === t && (r = !1 !== s.picksChange(n) && r), r
        }), tp, Jd)), ls(1, 114688, null, 0, Kd, [], {
            list: [0, "list"],
            matchesList: [1, "matchesList"],
            matches: [2, "matches"]
        }, {
            listEmitter: "listEmitter",
            picksListEmitter: "picksListEmitter"
        })], (function(e, t) {
            var n = t.component;
            e(t, 1, 0, n.mainList, n.mainMatchesList, n.mainMatches)
        }), null)
    }

    function cp(e) {
        return oo(0, [(e()(), Wi(0, 0, null, null, 1, "app-keuzetool-list", [], null, null, null, ip, rp)), ls(1, 114688, null, 0, np, [], {
            list: [0, "list"]
        }, null)], (function(e, t) {
            e(t, 1, 0, t.component.mainList)
        }), null)
    }

    function hp(e) {
        return oo(0, [(e()(), Wi(0, 0, null, null, 1, "li", [], null, null, null, null, null)), (e()(), ro(1, null, [" ", " VS ", " -- ", " "]))], null, (function(e, t) {
            e(t, 1, 0, t.context.$implicit[0].name, t.context.$implicit[1].name, t.context.$implicit[2].name)
        }))
    }

    function dp(e) {
        return oo(0, [(e()(), Wi(0, 0, null, null, 2, "ul", [
            ["id", "keuzetool-picks-list"]
        ], null, null, null, null, null)), (e()(), Zi(16777216, null, null, 1, null, hp)), ls(2, 278528, null, 0, Nl, [Ln, Dn, In], {
            ngForOf: [0, "ngForOf"]
        }, null)], (function(e, t) {
            e(t, 2, 0, t.component.mainPicksList)
        }), null)
    }

    function pp(e) {
        return oo(0, [(e()(), Wi(0, 0, null, null, 4, "div", [
            ["id", "keuzetool-picks"]
        ], null, null, null, null, null)), (e()(), Wi(1, 0, null, null, 1, "h2", [
            ["id", "keuzetool-picks-header"]
        ], null, null, null, null, null)), (e()(), ro(-1, null, ["Picks"])), (e()(), Zi(16777216, null, null, 1, null, dp)), ls(4, 16384, null, 0, Ol, [Ln, Dn], {
            ngIf: [0, "ngIf"]
        }, null)], (function(e, t) {
            e(t, 4, 0, t.component.mainPicksList)
        }), null)
    }

    function fp(e) {
        return oo(0, [(e()(), Wi(0, 0, null, null, 15, "div", [
            ["id", "keuzetool-body"]
        ], null, null, null, null, null)), (e()(), Wi(1, 0, null, null, 5, "div", [
            ["id", "keuzetool-header"]
        ], null, null, null, null, null)), (e()(), Wi(2, 0, null, null, 1, "h1", [
            ["id", "keuzetool-header-header"]
        ], null, null, null, null, null)), (e()(), ro(-1, null, ["Keuzetool"])), (e()(), Wi(4, 0, null, null, 2, "div", [
            ["id", "keuzetool-outcomes"]
        ], null, null, null, null, null)), (e()(), Wi(5, 0, [
            ["outcomes", 1]
        ], null, 1, "p", [], null, null, null, null, null)), (e()(), ro(6, null, [" Matches to be made: ", " "])), (e()(), Wi(7, 0, null, null, 6, "div", [
            ["id", "keuzetool-components"]
        ], null, null, null, null, null)), (e()(), Zi(16777216, null, null, 1, null, ap)), ls(9, 16384, null, 0, Ol, [Ln, Dn], {
            ngIf: [0, "ngIf"]
        }, null), (e()(), Zi(16777216, null, null, 1, null, up)), ls(11, 16384, null, 0, Ol, [Ln, Dn], {
            ngIf: [0, "ngIf"]
        }, null), (e()(), Zi(16777216, null, null, 1, null, cp)), ls(13, 16384, null, 0, Ol, [Ln, Dn], {
            ngIf: [0, "ngIf"]
        }, null), (e()(), Zi(16777216, null, null, 1, null, pp)), ls(15, 16384, null, 0, Ol, [Ln, Dn], {
            ngIf: [0, "ngIf"]
        }, null)], (function(e, t) {
            var n = t.component;
            e(t, 9, 0, n.creatorVisible), e(t, 11, 0, n.matchesVisible), e(t, 13, 0, n.listVisible), e(t, 15, 0, n.picksVisible)
        }), (function(e, t) {
            e(t, 6, 0, t.component.mainMatches)
        }))
    }

    function gp(e) {
        return oo(0, [(e()(), Wi(0, 0, null, null, 1, "app-keuzetool", [], null, null, null, fp, lp)), ls(1, 114688, null, 0, op, [], null, null)], (function(e, t) {
            e(t, 1, 0)
        }), null)
    }
    var mp = Ur("app-keuzetool", op, gp, {}, {}, []); class vp {
        constructor() {}
        ngOnInit() {}
    }
    var yp = er({
        encapsulation: 0,
        styles: [
            [""]
        ],
        data: {}
    });

    function wp(e) {
        return oo(0, [(e()(), Wi(0, 0, null, null, 1, "h1", [], null, null, null, null, null)), (e()(), ro(-1, null, ["Heading 1"])), (e()(), Wi(2, 0, null, null, 1, "h2", [], null, null, null, null, null)), (e()(), ro(-1, null, ["Heading 2"])), (e()(), Wi(4, 0, null, null, 1, "h3", [], null, null, null, null, null)), (e()(), ro(-1, null, ["Heading 3"])), (e()(), Wi(6, 0, null, null, 1, "h4", [], null, null, null, null, null)), (e()(), ro(-1, null, ["Heading 4"])), (e()(), Wi(8, 0, null, null, 1, "h5", [], null, null, null, null, null)), (e()(), ro(-1, null, ["Heading 5"])), (e()(), Wi(10, 0, null, null, 1, "p", [], null, null, null, null, null)), (e()(), ro(-1, null, ["This is a paragraph."])), (e()(), Wi(12, 0, null, null, 1, "p", [], null, null, null, null, null)), (e()(), ro(-1, null, ["This is also a paragraph."]))], null, null)
    }

    function bp(e) {
        return oo(0, [(e()(), Wi(0, 0, null, null, 1, "app-test", [], null, null, null, wp, yp)), ls(1, 114688, null, 0, vp, [], null, null)], (function(e, t) {
            e(t, 1, 0)
        }), null)
    }
    var _p = Ur("app-test", vp, bp, {}, {}, []); class Cp {
        constructor() {}
        ngOnInit() {}
    }
    var xp = er({
        encapsulation: 0,
        styles: [
            ["nav[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}a[_ngcontent-%COMP%]{color:#fff;padding-right:10px;padding-left:10px}"]
        ],
        data: {}
    });

    function Sp(e) {
        return oo(0, [(e()(), Wi(0, 0, null, null, 3, "nav", [], null, null, null, null, null)), (e()(), Wi(1, 0, null, null, 2, "a", [
            ["routerLink", "/test"]
        ], [
            [1, "target", 0],
            [8, "href", 4]
        ], [
            [null, "click"]
        ], (function(e, t, n) {
            var r = !0;
            return "click" === t && (r = !1 !== Gr(e, 2).onClick(n.button, n.ctrlKey, n.metaKey, n.shiftKey) && r), r
        }), null, null)), ls(2, 671744, null, 0, gd, [fd, rh, yl], {
            routerLink: [0, "routerLink"]
        }, null), (e()(), ro(-1, null, ["TEST"]))], (function(e, t) {
            e(t, 2, 0, "/test")
        }), (function(e, t) {
            e(t, 1, 0, Gr(t, 2).target, Gr(t, 2).href)
        }))
    }
    class Ep {
        constructor() {}
        ngOnInit() {}
    }
    var Tp = er({
        encapsulation: 0,
        styles: [
            ["nav[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:reverse;flex-direction:row-reverse}a[_ngcontent-%COMP%]{font-size:18px;color:#fff;padding-right:10px;padding-left:10px}"]
        ],
        data: {}
    });

    function kp(e) {
        return oo(0, [(e()(), Wi(0, 0, null, null, 3, "nav", [], null, null, null, null, null)), (e()(), Wi(1, 0, null, null, 2, "a", [
            ["routerLink", "/keuzetool"]
        ], [
            [1, "target", 0],
            [8, "href", 4]
        ], [
            [null, "click"]
        ], (function(e, t, n) {
            var r = !0;
            return "click" === t && (r = !1 !== Gr(e, 2).onClick(n.button, n.ctrlKey, n.metaKey, n.shiftKey) && r), r
        }), null, null)), ls(2, 671744, null, 0, gd, [fd, rh, yl], {
            routerLink: [0, "routerLink"]
        }, null), (e()(), ro(-1, null, ["KEUZETOOL"]))], (function(e, t) {
            e(t, 2, 0, "/keuzetool")
        }), (function(e, t) {
            e(t, 1, 0, Gr(t, 2).target, Gr(t, 2).href)
        }))
    }
    class Rp {
        constructor() {
            this.title = "Vac IT Web App"
        }
        ngOnInit() {}
    }
    var Ip = er({
        encapsulation: 0,
        styles: [
            ["header[_ngcontent-%COMP%]{height:235px}.header-body[_ngcontent-%COMP%]{color:#fff;background-color:#333;padding:10px;display:-webkit-box;display:flex;-webkit-box-flex:1;flex:1;-webkit-box-align:stretch;align-items:stretch}app-navbar[_ngcontent-%COMP%], app-navbar-test[_ngcontent-%COMP%]{-webkit-box-flex:1;flex:1;margin-top:auto}.header-body-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:250px}"]
        ],
        data: {}
    });

    function Ap(e) {
        return oo(0, [(e()(), Wi(0, 0, null, null, 9, "header", [], null, null, null, null, null)), (e()(), Wi(1, 0, null, null, 8, "div", [
            ["class", "header-body"]
        ], null, null, null, null, null)), (e()(), Wi(2, 0, null, null, 3, "div", [
            ["class", "header-body-logo"]
        ], null, null, null, null, null)), (e()(), Wi(3, 0, null, null, 2, "a", [
            ["class", "header-body-logo-link"],
            ["routerLink", "/home"]
        ], [
            [1, "target", 0],
            [8, "href", 4]
        ], [
            [null, "click"]
        ], (function(e, t, n) {
            var r = !0;
            return "click" === t && (r = !1 !== Gr(e, 4).onClick(n.button, n.ctrlKey, n.metaKey, n.shiftKey) && r), r
        }), null, null)), ls(4, 671744, null, 0, gd, [fd, rh, yl], {
            routerLink: [0, "routerLink"]
        }, null), (e()(), Wi(5, 0, null, null, 0, "img", [
            ["src", "/assets/logo/code-koffie-logo.png"]
        ], null, null, null, null, null)), (e()(), Wi(6, 0, null, null, 1, "app-navbar-test", [], null, null, null, Sp, xp)), ls(7, 114688, null, 0, Cp, [], null, null), (e()(), Wi(8, 0, null, null, 1, "app-navbar", [], null, null, null, kp, Tp)), ls(9, 114688, null, 0, Ep, [], null, null)], (function(e, t) {
            e(t, 4, 0, "/home"), e(t, 7, 0), e(t, 9, 0)
        }), (function(e, t) {
            e(t, 3, 0, Gr(t, 4).target, Gr(t, 4).href)
        }))
    }
    class Np {
        constructor() {}
        ngOnInit() {}
    }
    var Pp = er({
        encapsulation: 0,
        styles: [
            ["footer[_ngcontent-%COMP%]{height:150px}.footer-body[_ngcontent-%COMP%]{padding:10px;color:#fff;background-color:#333;display:-webkit-box;display:flex;flex-wrap:wrap;height:100%;align-content:center}.footer-body-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:200px}"]
        ],
        data: {}
    });

    function Op(e) {
        return oo(0, [(e()(), Wi(0, 0, null, null, 4, "footer", [], null, null, null, null, null)), (e()(), Wi(1, 0, null, null, 3, "div", [
            ["class", "footer-body"]
        ], null, null, null, null, null)), (e()(), Wi(2, 0, null, null, 2, "div", [
            ["class", "footer-body-logo"]
        ], null, null, null, null, null)), (e()(), Wi(3, 0, null, null, 1, "a", [
            ["class", "footer-body-logo-item"]
        ], null, null, null, null, null)), (e()(), Wi(4, 0, null, null, 0, "img", [
            ["src", "../../../../assets/logo/code-koffie-logo.png"]
        ], null, null, null, null, null))], null, null)
    }
    var Dp = er({
        encapsulation: 0,
        styles: [
            [""]
        ],
        data: {}
    });

    function Mp(e) {
        return oo(0, [(e()(), Wi(0, 0, null, null, 1, "app-header", [], null, null, null, Ap, Ip)), ls(1, 114688, null, 0, Rp, [], null, null), (e()(), Wi(2, 0, null, null, 2, "div", [
            ["class", "content"]
        ], null, null, null, null, null)), (e()(), Wi(3, 16777216, null, null, 1, "router-outlet", [], null, null, null, null, null)), ls(4, 212992, null, 0, wd, [yd, Ln, on, [8, null], At], null, null), (e()(), Wi(5, 0, null, null, 1, "app-footer", [], null, null, null, Op, Pp)), ls(6, 114688, null, 0, Np, [], null, null)], (function(e, t) {
            e(t, 1, 0), e(t, 4, 0), e(t, 6, 0)
        }), null)
    }

    function Lp(e) {
        return oo(0, [(e()(), Wi(0, 0, null, null, 1, "app-root", [], null, null, null, Mp, Dp)), ls(1, 49152, null, 0, gl, [], null, null)], null, null)
    }
    var Up = Ur("app-root", gl, Lp, {}, {}, []); class jp {
        constructor() {
            this._accessors = []
        }
        add(e, t) {
            this._accessors.push([e, t])
        }
        remove(e) {
            for (let t = this._accessors.length - 1; t >= 0; --t)
                if (this._accessors[t][1] === e) return void this._accessors.splice(t, 1)
        }
        select(e) {
            this._accessors.forEach(t => {
                this._isSameGroup(t, e) && t[1] !== e && t[1].fireUncheck(e.value)
            })
        }
        _isSameGroup(e, t) {
            return !!e[0].control && e[0]._parent === t._control._parent && e[1].name === t.name
        }
    }
    const Vp = new Ee("NgFormSelectorWarning"); class Hp {}
    class Fp {
        static withConfig(e) {
            return {
                ngModule: Fp,
                providers: [{
                    provide: Vp,
                    useValue: e.warnOnDeprecatedNgFormSelector
                }]
            }
        }
    }
    class zp {}
    class $p {}
    class Bp {
        constructor(e) {
            this.normalizedNames = new Map, this.lazyUpdate = null, e ? this.lazyInit = "string" == typeof e ? () => {
                this.headers = new Map, e.split("\n").forEach(e => {
                    const t = e.indexOf(":");
                    if (t > 0) {
                        const n = e.slice(0, t),
                            r = n.toLowerCase(),
                            s = e.slice(t + 1).trim();
                        this.maybeSetNormalizedName(n, r), this.headers.has(r) ? this.headers.get(r).push(s) : this.headers.set(r, [s])
                    }
                })
            } : () => {
                this.headers = new Map, Object.keys(e).forEach(t => {
                    let n = e[t];
                    const r = t.toLowerCase();
                    "string" == typeof n && (n = [n]), n.length > 0 && (this.headers.set(r, n), this.maybeSetNormalizedName(t, r))
                })
            } : this.headers = new Map
        }
        has(e) {
            return this.init(), this.headers.has(e.toLowerCase())
        }
        get(e) {
            this.init();
            const t = this.headers.get(e.toLowerCase());
            return t && t.length > 0 ? t[0] : null
        }
        keys() {
            return this.init(), Array.from(this.normalizedNames.values())
        }
        getAll(e) {
            return this.init(), this.headers.get(e.toLowerCase()) || null
        }
        append(e, t) {
            return this.clone({
                name: e,
                value: t,
                op: "a"
            })
        }
        set(e, t) {
            return this.clone({
                name: e,
                value: t,
                op: "s"
            })
        }
        delete(e, t) {
            return this.clone({
                name: e,
                value: t,
                op: "d"
            })
        }
        maybeSetNormalizedName(e, t) {
            this.normalizedNames.has(t) || this.normalizedNames.set(t, e)
        }
        init() {
            this.lazyInit && (this.lazyInit instanceof Bp ? this.copyFrom(this.lazyInit) : this.lazyInit(), this.lazyInit = null, this.lazyUpdate && (this.lazyUpdate.forEach(e => this.applyUpdate(e)), this.lazyUpdate = null))
        }
        copyFrom(e) {
            e.init(), Array.from(e.headers.keys()).forEach(t => {
                this.headers.set(t, e.headers.get(t)), this.normalizedNames.set(t, e.normalizedNames.get(t))
            })
        }
        clone(e) {
            const t = new Bp;
            return t.lazyInit = this.lazyInit && this.lazyInit instanceof Bp ? this.lazyInit : this, t.lazyUpdate = (this.lazyUpdate || []).concat([e]), t
        }
        applyUpdate(e) {
            const t = e.name.toLowerCase();
            switch (e.op) {
                case "a":
                case "s":
                    let n = e.value;
                    if ("string" == typeof n && (n = [n]), 0 === n.length) return;
                    this.maybeSetNormalizedName(e.name, t);
                    const r = ("a" === e.op ? this.headers.get(t) : void 0) || [];
                    r.push(...n), this.headers.set(t, r);
                    break;
                case "d":
                    const s = e.value;
                    if (s) {
                        let e = this.headers.get(t);
                        if (!e) return;
                        0 === (e = e.filter(e => -1 === s.indexOf(e))).length ? (this.headers.delete(t), this.normalizedNames.delete(t)) : this.headers.set(t, e)
                    } else this.headers.delete(t), this.normalizedNames.delete(t)
            }
        }
        forEach(e) {
            this.init(), Array.from(this.normalizedNames.keys()).forEach(t => e(this.normalizedNames.get(t), this.headers.get(t)))
        }
    }
    class qp {
        encodeKey(e) {
            return Zp(e)
        }
        encodeValue(e) {
            return Zp(e)
        }
        decodeKey(e) {
            return decodeURIComponent(e)
        }
        decodeValue(e) {
            return decodeURIComponent(e)
        }
    }

    function Zp(e) {
        return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/gi, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%2B/gi, "+").replace(/%3D/gi, "=").replace(/%3F/gi, "?").replace(/%2F/gi, "/")
    }
    class Wp {
        constructor(e = {}) {
            if (this.updates = null, this.cloneFrom = null, this.encoder = e.encoder || new qp, e.fromString) {
                if (e.fromObject) throw new Error("Cannot specify both fromString and fromObject.");
                this.map = function(e, t) {
                    const n = new Map;
                    return e.length > 0 && e.split("&").forEach(e => {
                        const r = e.indexOf("="),
                            [s, i] = -1 == r ? [t.decodeKey(e), ""] : [t.decodeKey(e.slice(0, r)), t.decodeValue(e.slice(r + 1))],
                            o = n.get(s) || [];
                        o.push(i), n.set(s, o)
                    }), n
                }(e.fromString, this.encoder)
            } else e.fromObject ? (this.map = new Map, Object.keys(e.fromObject).forEach(t => {
                const n = e.fromObject[t];
                this.map.set(t, Array.isArray(n) ? n : [n])
            })) : this.map = null
        }
        has(e) {
            return this.init(), this.map.has(e)
        }
        get(e) {
            this.init();
            const t = this.map.get(e);
            return t ? t[0] : null
        }
        getAll(e) {
            return this.init(), this.map.get(e) || null
        }
        keys() {
            return this.init(), Array.from(this.map.keys())
        }
        append(e, t) {
            return this.clone({
                param: e,
                value: t,
                op: "a"
            })
        }
        set(e, t) {
            return this.clone({
                param: e,
                value: t,
                op: "s"
            })
        }
        delete(e, t) {
            return this.clone({
                param: e,
                value: t,
                op: "d"
            })
        }
        toString() {
            return this.init(), this.keys().map(e => {
                const t = this.encoder.encodeKey(e);
                return this.map.get(e).map(e => t + "=" + this.encoder.encodeValue(e)).join("&")
            }).join("&")
        }
        clone(e) {
            const t = new Wp({
                encoder: this.encoder
            });
            return t.cloneFrom = this.cloneFrom || this, t.updates = (this.updates || []).concat([e]), t
        }
        init() {
            null === this.map && (this.map = new Map), null !== this.cloneFrom && (this.cloneFrom.init(), this.cloneFrom.keys().forEach(e => this.map.set(e, this.cloneFrom.map.get(e))), this.updates.forEach(e => {
                switch (e.op) {
                    case "a":
                    case "s":
                        const t = ("a" === e.op ? this.map.get(e.param) : void 0) || [];
                        t.push(e.value), this.map.set(e.param, t);
                        break;
                    case "d":
                        if (void 0 === e.value) {
                            this.map.delete(e.param);
                            break
                        } {
                            let t = this.map.get(e.param) || [];
                            const n = t.indexOf(e.value); - 1 !== n && t.splice(n, 1), t.length > 0 ? this.map.set(e.param, t) : this.map.delete(e.param)
                        }
                }
            }), this.cloneFrom = this.updates = null)
        }
    }

    function Gp(e) {
        return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer
    }

    function Qp(e) {
        return "undefined" != typeof Blob && e instanceof Blob
    }

    function Kp(e) {
        return "undefined" != typeof FormData && e instanceof FormData
    }
    class Jp {
        constructor(e, t, n, r) {
            let s;
            if (this.url = t, this.body = null, this.reportProgress = !1, this.withCredentials = !1, this.responseType = "json", this.method = e.toUpperCase(), function(e) {
                    switch (e) {
                        case "DELETE":
                        case "GET":
                        case "HEAD":
                        case "OPTIONS":
                        case "JSONP":
                            return !1;
                        default:
                            return !0
                    }
                }(this.method) || r ? (this.body = void 0 !== n ? n : null, s = r) : s = n, s && (this.reportProgress = !!s.reportProgress, this.withCredentials = !!s.withCredentials, s.responseType && (this.responseType = s.responseType), s.headers && (this.headers = s.headers), s.params && (this.params = s.params)), this.headers || (this.headers = new Bp), this.params) {
                const e = this.params.toString();
                if (0 === e.length) this.urlWithParams = t;
                else {
                    const n = t.indexOf("?");
                    this.urlWithParams = t + (-1 === n ? "?" : n < t.length - 1 ? "&" : "") + e
                }
            } else this.params = new Wp, this.urlWithParams = t
        }
        serializeBody() {
            return null === this.body ? null : Gp(this.body) || Qp(this.body) || Kp(this.body) || "string" == typeof this.body ? this.body : this.body instanceof Wp ? this.body.toString() : "object" == typeof this.body || "boolean" == typeof this.body || Array.isArray(this.body) ? JSON.stringify(this.body) : this.body.toString()
        }
        detectContentTypeHeader() {
            return null === this.body ? null : Kp(this.body) ? null : Qp(this.body) ? this.body.type || null : Gp(this.body) ? null : "string" == typeof this.body ? "text/plain" : this.body instanceof Wp ? "application/x-www-form-urlencoded;charset=UTF-8" : "object" == typeof this.body || "number" == typeof this.body || Array.isArray(this.body) ? "application/json" : null
        }
        clone(e = {}) {
            const t = e.method || this.method,
                n = e.url || this.url,
                r = e.responseType || this.responseType,
                s = void 0 !== e.body ? e.body : this.body,
                i = void 0 !== e.withCredentials ? e.withCredentials : this.withCredentials,
                o = void 0 !== e.reportProgress ? e.reportProgress : this.reportProgress;
            let l = e.headers || this.headers,
                a = e.params || this.params;
            return void 0 !== e.setHeaders && (l = Object.keys(e.setHeaders).reduce((t, n) => t.set(n, e.setHeaders[n]), l)), e.setParams && (a = Object.keys(e.setParams).reduce((t, n) => t.set(n, e.setParams[n]), a)), new Jp(t, n, s, {
                params: a,
                headers: l,
                reportProgress: o,
                responseType: r,
                withCredentials: i
            })
        }
    }
    const Yp = function() {
        var e = {
            Sent: 0,
            UploadProgress: 1,
            ResponseHeader: 2,
            DownloadProgress: 3,
            Response: 4,
            User: 5
        };
        return e[e.Sent] = "Sent", e[e.UploadProgress] = "UploadProgress", e[e.ResponseHeader] = "ResponseHeader", e[e.DownloadProgress] = "DownloadProgress", e[e.Response] = "Response", e[e.User] = "User", e
    }(); class Xp {
        constructor(e, t = 200, n = "OK") {
            this.headers = e.headers || new Bp, this.status = void 0 !== e.status ? e.status : t, this.statusText = e.statusText || n, this.url = e.url || null, this.ok = this.status >= 200 && this.status < 300
        }
    }
    class ef extends Xp {
        constructor(e = {}) {
            super(e), this.type = Yp.ResponseHeader
        }
        clone(e = {}) {
            return new ef({
                headers: e.headers || this.headers,
                status: void 0 !== e.status ? e.status : this.status,
                statusText: e.statusText || this.statusText,
                url: e.url || this.url || void 0
            })
        }
    }
    class tf extends Xp {
        constructor(e = {}) {
            super(e), this.type = Yp.Response, this.body = void 0 !== e.body ? e.body : null
        }
        clone(e = {}) {
            return new tf({
                body: void 0 !== e.body ? e.body : this.body,
                headers: e.headers || this.headers,
                status: void 0 !== e.status ? e.status : this.status,
                statusText: e.statusText || this.statusText,
                url: e.url || this.url || void 0
            })
        }
    }
    class nf extends Xp {
        constructor(e) {
            super(e, 0, "Unknown Error"), this.name = "HttpErrorResponse", this.ok = !1, this.message = this.status >= 200 && this.status < 300 ? `Http failure during parsing for ${e.url||"(unknown url)"}` : `Http failure response for ${e.url||"(unknown url)"}: ${e.status} ${e.statusText}`, this.error = e.error || null
        }
    }

    function rf(e, t) {
        return {
            body: t,
            headers: e.headers,
            observe: e.observe,
            params: e.params,
            reportProgress: e.reportProgress,
            responseType: e.responseType,
            withCredentials: e.withCredentials
        }
    }
    class sf {
        constructor(e) {
            this.handler = e
        }
        request(e, t, n = {}) {
            let r;
            if (e instanceof Jp) r = e;
            else {
                let s = void 0;
                s = n.headers instanceof Bp ? n.headers : new Bp(n.headers);
                let i = void 0;
                n.params && (i = n.params instanceof Wp ? n.params : new Wp({
                    fromObject: n.params
                })), r = new Jp(e, t, void 0 !== n.body ? n.body : null, {
                    headers: s,
                    params: i,
                    reportProgress: n.reportProgress,
                    responseType: n.responseType || "json",
                    withCredentials: n.withCredentials
                })
            }
            const s = Bl(r).pipe(Na(e => this.handler.handle(e)));
            if (e instanceof Jp || "events" === n.observe) return s;
            const i = s.pipe(Xl(e => e instanceof tf));
            switch (n.observe || "body") {
                case "body":
                    switch (r.responseType) {
                        case "arraybuffer":
                            return i.pipe(z(e => {
                                if (null !== e.body && !(e.body instanceof ArrayBuffer)) throw new Error("Response is not an ArrayBuffer.");
                                return e.body
                            }));
                        case "blob":
                            return i.pipe(z(e => {
                                if (null !== e.body && !(e.body instanceof Blob)) throw new Error("Response is not a Blob.");
                                return e.body
                            }));
                        case "text":
                            return i.pipe(z(e => {
                                if (null !== e.body && "string" != typeof e.body) throw new Error("Response is not a string.");
                                return e.body
                            }));
                        case "json":
                        default:
                            return i.pipe(z(e => e.body))
                    }
                    case "response":
                        return i;
                    default:
                        throw new Error(`Unreachable: unhandled observe type ${n.observe}}`)
            }
        }
        delete(e, t = {}) {
            return this.request("DELETE", e, t)
        }
        get(e, t = {}) {
            return this.request("GET", e, t)
        }
        head(e, t = {}) {
            return this.request("HEAD", e, t)
        }
        jsonp(e, t) {
            return this.request("JSONP", e, {
                params: (new Wp).append(t, "JSONP_CALLBACK"),
                observe: "body",
                responseType: "json"
            })
        }
        options(e, t = {}) {
            return this.request("OPTIONS", e, t)
        }
        patch(e, t, n = {}) {
            return this.request("PATCH", e, rf(n, t))
        }
        post(e, t, n = {}) {
            return this.request("POST", e, rf(n, t))
        }
        put(e, t, n = {}) {
            return this.request("PUT", e, rf(n, t))
        }
    }
    class of {
        constructor(e, t) {
            this.next = e, this.interceptor = t
        }
        handle(e) {
            return this.interceptor.intercept(e, this.next)
        }
    }
    const lf = new Ee("HTTP_INTERCEPTORS"); class af {
        intercept(e, t) {
            return t.handle(e)
        }
    }
    const uf = /^\)\]\}',?\n/; class cf {}
    class hf {
        constructor() {}
        build() {
            return new XMLHttpRequest
        }
    }
    class df {
        constructor(e) {
            this.xhrFactory = e
        }
        handle(e) {
            if ("JSONP" === e.method) throw new Error("Attempted to construct Jsonp request without JsonpClientModule installed.");
            return new _(t => {
                const n = this.xhrFactory.build();
                if (n.open(e.method, e.urlWithParams), e.withCredentials && (n.withCredentials = !0), e.headers.forEach((e, t) => n.setRequestHeader(e, t.join(","))), e.headers.has("Accept") || n.setRequestHeader("Accept", "application/json, text/plain, */*"), !e.headers.has("Content-Type")) {
                    const t = e.detectContentTypeHeader();
                    null !== t && n.setRequestHeader("Content-Type", t)
                }
                if (e.responseType) {
                    const t = e.responseType.toLowerCase();
                    n.responseType = "json" !== t ? t : "text"
                }
                const r = e.serializeBody();
                let s = null;
                const i = () => {
                        if (null !== s) return s;
                        const t = 1223 === n.status ? 204 : n.status,
                            r = n.statusText || "OK",
                            i = new Bp(n.getAllResponseHeaders()),
                            o = function(e) {
                                return "responseURL" in e && e.responseURL ? e.responseURL : /^X-Request-URL:/m.test(e.getAllResponseHeaders()) ? e.getResponseHeader("X-Request-URL") : null
                            }(n) || e.url;
                        return s = new ef({
                            headers: i,
                            status: t,
                            statusText: r,
                            url: o
                        })
                    },
                    o = () => {
                        let {
                            headers: r,
                            status: s,
                            statusText: o,
                            url: l
                        } = i(), a = null;
                        204 !== s && (a = void 0 === n.response ? n.responseText : n.response), 0 === s && (s = a ? 200 : 0);
                        let u = s >= 200 && s < 300;
                        if ("json" === e.responseType && "string" == typeof a) {
                            const e = a;
                            a = a.replace(uf, "");
                            try {
                                a = "" !== a ? JSON.parse(a) : null
                            } catch (c) {
                                a = e, u && (u = !1, a = {
                                    error: c,
                                    text: a
                                })
                            }
                        }
                        u ? (t.next(new tf({
                            body: a,
                            headers: r,
                            status: s,
                            statusText: o,
                            url: l || void 0
                        })), t.complete()) : t.error(new nf({
                            error: a,
                            headers: r,
                            status: s,
                            statusText: o,
                            url: l || void 0
                        }))
                    },
                    l = e => {
                        const {
                            url: r
                        } = i(), s = new nf({
                            error: e,
                            status: n.status || 0,
                            statusText: n.statusText || "Unknown Error",
                            url: r || void 0
                        });
                        t.error(s)
                    };
                let a = !1;
                const u = r => {
                        a || (t.next(i()), a = !0);
                        let s = {
                            type: Yp.DownloadProgress,
                            loaded: r.loaded
                        };
                        r.lengthComputable && (s.total = r.total), "text" === e.responseType && n.responseText && (s.partialText = n.responseText), t.next(s)
                    },
                    c = e => {
                        let n = {
                            type: Yp.UploadProgress,
                            loaded: e.loaded
                        };
                        e.lengthComputable && (n.total = e.total), t.next(n)
                    };
                return n.addEventListener("load", o), n.addEventListener("error", l), e.reportProgress && (n.addEventListener("progress", u), null !== r && n.upload && n.upload.addEventListener("progress", c)), n.send(r), t.next({
                    type: Yp.Sent
                }), () => {
                    n.removeEventListener("error", l), n.removeEventListener("load", o), e.reportProgress && (n.removeEventListener("progress", u), null !== r && n.upload && n.upload.removeEventListener("progress", c)), n.abort()
                }
            })
        }
    }
    const pf = new Ee("XSRF_COOKIE_NAME"), ff = new Ee("XSRF_HEADER_NAME"); class gf {}
    class mf {
        constructor(e, t, n) {
            this.doc = e, this.platform = t, this.cookieName = n, this.lastCookieString = "", this.lastToken = null, this.parseCount = 0
        }
        getToken() {
            if ("server" === this.platform) return null;
            const e = this.doc.cookie || "";
            return e !== this.lastCookieString && (this.parseCount++, this.lastToken = Il(e, this.cookieName), this.lastCookieString = e), this.lastToken
        }
    }
    class vf {
        constructor(e, t) {
            this.tokenService = e, this.headerName = t
        }
        intercept(e, t) {
            const n = e.url.toLowerCase();
            if ("GET" === e.method || "HEAD" === e.method || n.startsWith("http://") || n.startsWith("https://")) return t.handle(e);
            const r = this.tokenService.getToken();
            return null === r || e.headers.has(this.headerName) || (e = e.clone({
                headers: e.headers.set(this.headerName, r)
            })), t.handle(e)
        }
    }
    class yf {
        constructor(e, t) {
            this.backend = e, this.injector = t, this.chain = null
        }
        handle(e) {
            if (null === this.chain) {
                const e = this.injector.get(lf, []);
                this.chain = e.reduceRight((e, t) => new of (e, t), this.backend)
            }
            return this.chain.handle(e)
        }
    }
    class wf {
        static disable() {
            return {
                ngModule: wf,
                providers: [{
                    provide: vf,
                    useClass: af
                }]
            }
        }
        static withOptions(e = {}) {
            return {
                ngModule: wf,
                providers: [e.cookieName ? {
                    provide: pf,
                    useValue: e.cookieName
                } : [], e.headerName ? {
                    provide: ff,
                    useValue: e.headerName
                } : []]
            }
        }
    }
    class bf {}
    class _f {}
    var Cf = dl(fl, [gl], (function(e) {
        return function(e) {
            const t = {},
                n = [];
            let r = !1;
            for (let s = 0; s < e.length; s++) {
                const i = e[s];
                i.token === Pt && !0 === i.value && (r = !0), 1073741824 & i.flags && n.push(i.token), i.index = s, t[Jn(i.token)] = i
            }
            return {
                factory: null,
                providersByKey: t,
                providers: e,
                modules: n,
                isRoot: r
            }
        }([Ar(512, on, ln, [
            [8, [Bd, mp, _p, Up]],
            [3, on], Fe
        ]), Ar(5120, Fs, $i, [
            [3, Fs]
        ]), Ar(4608, kl, Rl, [Fs, [2, Tl]]), Ar(5120, _s, Bi, [ii]), Ar(5120, Ds, Ms, []), Ar(5120, In, Fi, []), Ar(5120, An, zi, []), Ar(4608, ju, Vu, [Ul]), Ar(6144, Et, null, [ju]), Ar(4608, Nu, Ou, []), Ar(5120, Xa, (function(e, t, n, r, s, i, o, l) {
            return [new Iu(e, t, n), new Uu(r), new Du(s, i, o, l)]
        }), [Ul, ii, js, Ul, Ul, Nu, Hs, [2, Pu]]), Ar(4608, eu, eu, [Xa, ii]), Ar(135680, ru, ru, [Ul]), Ar(4608, cu, cu, [eu, ru, Ds]), Ar(6144, pn, null, [cu]), Ar(6144, nu, null, [ru]), Ar(4608, di, di, [ii]), Ar(4608, jp, jp, []), Ar(4608, gf, mf, [Ul, js, pf]), Ar(4608, vf, vf, [gf, ff]), Ar(5120, lf, (function(e) {
            return [e]
        }), [vf]), Ar(4608, hf, hf, []), Ar(6144, cf, null, [hf]), Ar(4608, df, df, [cf]), Ar(6144, $p, null, [df]), Ar(4608, zp, yf, [$p, Dt]), Ar(4608, sf, sf, [zp]), Ar(5120, rh, Ld, [fd]), Ar(4608, xd, xd, []), Ar(6144, _d, null, [xd]), Ar(135680, Sd, Sd, [fd, ki, Gs, Dt, _d]), Ar(4608, Cd, Cd, []), Ar(5120, Ed, Nd, [fd, Vl, Td]), Ar(5120, Hd, Vd, [Ud]), Ar(5120, Vs, (function(e) {
            return [e]
        }), [Hd]), Ar(1073742336, Ll, Ll, []), Ar(1024, Xe, Wu, []), Ar(1024, bi, (function() {
            return [Id()]
        }), []), Ar(512, Ud, Ud, [Dt]), Ar(1024, Ps, (function(e, t) {
            return [(n = e, Ka("probe", Ya), Ka("coreTokens", Object.assign({}, Ja, (n || []).reduce((e, t) => (e[t.name] = t.token, e), {}))), () => Ya), jd(t)];
            var n
        }), [
            [2, bi], Ud
        ]), Ar(512, Os, Os, [
            [2, Ps]
        ]), Ar(131584, Ei, Ei, [ii, Hs, Dt, Xe, on, Os]), Ar(1073742336, qi, qi, [Ei]), Ar(1073742336, Gu, Gu, [
            [3, Gu]
        ]), Ar(1073742336, Hp, Hp, []), Ar(1073742336, Fp, Fp, []), Ar(1073742336, wf, wf, []), Ar(1073742336, bf, bf, []), Ar(1024, kd, Od, [
            [3, fd]
        ]), Ar(512, Mc, Lc, []), Ar(512, yd, yd, []), Ar(256, Td, {}, []), Ar(1024, yl, Pd, [ml, [2, wl], Td]), Ar(512, bl, bl, [yl, ml]), Ar(512, Gs, Gs, []), Ar(512, ki, Pi, [Gs, [2, Ai]]), Ar(1024, ld, (function() {
            return [
                [{
                    path: "",
                    redirectTo: "/keuzetool",
                    pathMatch: "full"
                }, {
                    path: "home",
                    redirectTo: "/keuzetool",
                    pathMatch: "full"
                }, {
                    path: "keuzetool",
                    component: op
                }, {
                    path: "test",
                    component: vp
                }]
            ]
        }), []), Ar(1024, fd, Md, [Ei, Mc, yd, bl, Dt, ki, Gs, ld, Td, [2, ud],
            [2, id]
        ]), Ar(1073742336, Ad, Ad, [
            [2, kd],
            [2, fd]
        ]), Ar(1073742336, _f, _f, []), Ar(1073742336, fl, fl, []), Ar(256, Pt, !0, []), Ar(256, pf, "XSRF-TOKEN", []), Ar(256, ff, "X-XSRF-TOKEN", [])])
    }));
    (function() {
        if (tt) throw new Error("Cannot enable prod mode after platform setup.");
        et = !1
    })(), Zu().bootstrapModuleFactory(Cf).catch(e => console.error(e))
}, zn8P: function(e, t) {
    function n(e) {
        return Promise.resolve().then((function() {
            var t = new Error("Cannot find module '" + e + "'");
            throw t.code = "MODULE_NOT_FOUND", t
        }))
    }
    n.keys = function() {
        return []
    }, n.resolve = n, e.exports = n, n.id = "zn8P"
}
}, [
    [0, 0]
]]);
