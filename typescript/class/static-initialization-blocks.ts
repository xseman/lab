export class Static {
	public static foo: string

	static {
		console.log("static initialization:", this.foo)
		this.foo = "initialized"
	}

	static somethingUseful() {
		console.log("runs after static initialization:", this.foo)
	}
}

Static.somethingUseful()
// static initialization: undefined
// runs after static initialization: initialized
