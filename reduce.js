'use strict';

var MYAPP = {
	namespace: function namespace(ns) {
		var parent = MYAPP;

		ns.split('.').reduce(function (pr, cr, i) {
			return pr[cr] = pr[cr] || {};
		}, parent);
	}
};

MYAPP.namespace('this.is.testing.namespace');
console.log(JSON.stringify(MYAPP));
