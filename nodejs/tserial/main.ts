/**
 * @serializable
 */
export interface MyInterface {
	prop: string
}

import { deserialize } from './generated'

const goodData = { prop: '1234' }
const badData = { prop: 1234 }

/**
 * { success: true, value: { prop: '1234' } } - `value` is type `MyInterface`
 */
console.log(deserialize('MyInterface', goodData))

/**
 * { success: false, { ...errorInfo } }
 */
console.log(deserialize('MyInterface', badData))
