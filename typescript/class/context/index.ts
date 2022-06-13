class Service {
	private message = "Hello world!";

	constructor() {
		this.showMessage1 = this.showMessage1.bind(this);
	}

	// will fail as reference usage
	showMessage0() {
		console.log(this.message);
	}

	// need to bind(this, ..) context if used as reference
	showMessage1() {
		console.log(this.message);
	}

	// no need to bind
	showMessage2 = () => {
		console.log(this.message);
	};
}

const service = new Service();

function bar(cb: () => void) {
	cb();
}

bar(service.showMessage0); // Uncaught TypeError: Cannot read properties of undefined (reading 'message')
bar(service.showMessage1); // Hello world!
bar(service.showMessage2); // Hello world!
