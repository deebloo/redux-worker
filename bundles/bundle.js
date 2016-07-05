var Rw =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	function createStore(fn, initialState) {
	    return new core_1.Store(fn, initialState);
	}
	exports.createStore = createStore;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(2));
	__export(__webpack_require__(3));
	__export(__webpack_require__(5));


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var config_1 = __webpack_require__(4);
	// create a web worker tailored for state management
	function createWorker(fn, initialState) {
	    // create boilerplate worker
	    // store default state
	    // manages get state
	    // assigns reducer
	    var blob = new Blob([("\n    self.state = " + JSON.stringify(initialState) + ";\n\n    self.reducer = " + fn.toString() + ";\n\n    self.onmessage = function (e) {\n      if (e.data.type !== " + JSON.stringify(config_1.actions.GET_STATE) + ") {\n        self.state = self.reducer(self.state, e.data);\n      }\n\n      self.postMessage(self.state);\n    }\n  ")], { type: 'text/javascript' });
	    var url = URL.createObjectURL(blob);
	    var worker = new Worker(url);
	    URL.revokeObjectURL(url);
	    return worker;
	}
	exports.createWorker = createWorker;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	exports.actions = {
	    GET_STATE: 'GET_STATE'
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var store_worker_1 = __webpack_require__(3);
	var config_1 = __webpack_require__(4);
	var Store = (function () {
	    function Store(fn, initialState) {
	        this.store = store_worker_1.createWorker(fn, initialState);
	    }
	    // subscribe to changes to the store.
	    // the web worker acts as the dispatcher
	    Store.prototype.subscribe = function (fn) {
	        this.store.addEventListener('message', function (e) { return fn(e.data); });
	        return this;
	    };
	    // dispatch and action to the store
	    // posts a message to the web worker
	    Store.prototype.dispatch = function (action) {
	        this.store.postMessage(action);
	        return this;
	    };
	    // Get the current state of the store
	    // uses special reserved action
	    Store.prototype.getState = function (fn) {
	        var _this = this;
	        this.store.onmessage = function (e) {
	            fn(e.data);
	            _this.store.onmessage = undefined;
	        };
	        this.store.postMessage({
	            type: config_1.actions.GET_STATE
	        });
	        return this;
	    };
	    return Store;
	}());
	exports.Store = Store;


/***/ }
/******/ ]);