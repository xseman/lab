class Container {
    private _foo?: Foo;
    private _bar?: Bar;

    foo(): Foo {
        return this._foo || (this._foo = new Foo(this));
    }

    bar(): Bar {
        return this._bar || (this._bar = new Bar(this));
    }
}

class Foo {
    constructor(private container: Container) { }

    message() {
        console.log("Hello world");
    }
}

class Bar {
    constructor(private container: Container) { }

    fooMessage() {
        this.container.foo().message();
    }
}
