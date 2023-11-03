import React from "https://esm.sh/react@18.2.0"

const h = React.createElement;

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }

    render() {
        return h("div", null, [
            h("button", { onClick: this._onButtonClick }, "Click me: " + this.state.count),
        ]);
    }

    _onButtonClick = () => {
        this.setState({
            count: this.state.count + 1
        });
    };
}

export default Counter;
