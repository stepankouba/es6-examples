import readline from 'readline';

// define some globals
const questions = ['How old are you? ', 'Have you any girlfriend? ', 'Don\'t you want to stop? '];
const answers = [];

// create readline interface
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// this is thunk for rl.question method (https://en.wikipedia.org/wiki/Thunk)
function ask(t) {
	return function(cb) {
		rl.question(t, cb);
	};
};

// generator function to walkthrough the questions
function* gen() {
	for (const t in questions) {
		const value = yield ask(questions[t]);
		answers.push(value);
	}
}

// coordination rutine
function run(gen) {
	// rturn promise, so that we can use then
	return new Promise((resolve, reject) => {
		// call the gen function to return Generator object
		const g = gen();
		// call the next method
		next();

		function next(val) {
			const con = g.next(val);

			// if Generator object says it's done
			if (con.done) {
				// close readline and pass handling to Promises
				return resolve(rl.close());
			}

			// call the returned function from ask()
			con.value(next);
		}
	});
};

run(gen)
	.then(() => {
		console.log('Answers are:', answers);
	});