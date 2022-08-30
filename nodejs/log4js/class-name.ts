import log4js from "log4js"

export class ClassNameService {
	private log: log4js.Logger

	constructor() {
		this.log = log4js.getLogger(this.constructor.name)
	}

	public doStuff() {
		this.log.info("Doing stuff")
	}
}
