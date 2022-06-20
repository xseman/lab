export class Container {
	private _serviceOne?: ServiceOne;
	private _serviceTwo?: ServiceTwo;

	serviceOne(): ServiceOne {
		return this._serviceOne || (this._serviceOne = new ServiceOne(this));
	}

	serviceTwo(): ServiceTwo {
		return this._serviceTwo || (this._serviceTwo = new ServiceTwo(this));
	}
}

export class ServiceOne {
	constructor(private container: Container) {}

	message() {
		console.log("Hello world");
	}
}

export class ServiceTwo {
	constructor(private container: Container) {}

	fooMessage() {
		this.container.serviceOne().message();
	}
}
