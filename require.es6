var m = require('module');
var fs1 = require('fs');

var orig = m.prototype.require;

// var INTERCEPT = {
// 	'./larch.es6': 'my-fs',
// 	'module': 'my-module'
// };

// m.prototype.require = function(path) {
// 	if (INTERCEPT[path]) {
// 		orig(INTERCEPT[path]);	
// 	} else {
// 		orig(path);
// 	}
// }


var my = require('./my-module.es6');

console.log(process.cwd());

process.exit();