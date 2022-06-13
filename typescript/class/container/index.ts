class Container {
	private _foo?: ServiceOne;
	private _bar?: ServiceTwo;

	serviceOne(): ServiceOne {
		return this._foo || (this._foo = new ServiceOne(this));
	}

	serviceTwo(): ServiceTwo {
		return this._bar || (this._bar = new ServiceTwo(this));
	}
}

class ServiceOne {
	constructor(private container: Container) {}

	message() {
		console.log("Hello world");
	}
}

class ServiceTwo {
	constructor(private container: Container) {}

	fooMessage() {
		this.container.serviceOne().message();
	}
}
