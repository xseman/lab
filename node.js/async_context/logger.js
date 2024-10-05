// @ts-check
import { loggerContext } from "./server-logger.js";

export function logger(msg) {
	const id = loggerContext.getStore();
	console.log(`${id !== undefined ? id : '-'}:`, msg);
}
