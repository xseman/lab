class Foo {
    private message = 'Hello world!';

    constructor() {
        this.showMessage1 = this.showMessage1.bind(this);
    }

    // will fail as reference usage
    showMessage0() {
        console.log(this.message)
    }

    // need to bind(this, ..) context if used as reference
    showMessage1() {
        console.log(this.message)
    }

    // no need to bind
    showMessage2 = () => {
        console.log(this.message)
    }
}

const foo = new Foo();

function bar(cb: () => void) {
    cb();
}

bar(foo.showMessage0); // Uncaught TypeError: Cannot read properties of undefined (reading 'message')
bar(foo.showMessage1); // 'Hello world!'
bar(foo.showMessage2); // 'Hello world!'


