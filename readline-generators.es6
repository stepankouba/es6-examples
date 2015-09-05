import readline from 'readline';

const questions = ['How old are you? ', 'Have you any girlfriend? ', 'Don\'t you want to stop? '];
const answers = [];

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

function ask(t) {
	return function(cb) {
		rl.question(t, cb);
	};
};

function* gen() {
	for (const t in questions) {
		const value = yield ask(questions[t]);
		answers.push(value);
	}
}

function run(gen) {
	return new Promise((resolve, reject) => {
		const g = gen();
		next();

		function next(val) {
			const con = g.next(val);

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