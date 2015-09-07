const MYAPP = {
	namespace(ns) {
		ns.split('.').reduce((pr, cr, i) => pr[cr] = pr[cr] || {}, MYAPP);
	}
};

MYAPP.namespace('this.is.testing.name.space');
console.log(JSON.stringify(MYAPP, null, 4));