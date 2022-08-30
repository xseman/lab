import log4js from "log4js"

import { ClassNameService } from "./class-name"
import { FileNameService } from "./file-name"

log4js.configure({
	appenders: {
		out: { type: "stdout" },
	},
	categories: {
		default: {
			appenders: ["out"],
			level: "debug",
		},
	},
})

// log file-name
const foo = new FileNameService()
foo.doStuff()

// log class-name
const bar = new ClassNameService()
bar.doStuff()
