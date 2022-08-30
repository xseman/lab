import log4js from "log4js"
import { basename, extname } from "path"

const log = log4js.getLogger(basename(__filename, extname(__filename)))

export class FileNameService {
	constructor() { }

	public doStuff() {
		log.info("Doing stuff")
	}
}
