interface Point {
	x: number
	y: number
}

class Point {
	x: number
	y: number

	constructor()
	constructor(obj: Point)
	constructor(obj?: Point) {
		this.x = obj.x
		this.y = obj.y
	}
}

const box1 = new Point()
const box2 = new Point({ x: 1, y: 1 })
