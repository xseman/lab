const h = React.createElement;

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
    }

    render() {
        return h("div", null, [
            h("div", null, `Clicked ${this.state.count} times`),
            h("button", { onClick: this._onButtonClick }, "Click"),
        ]);
    }

    _onButtonClick = () => {
        this.setState({
            count: this.state.count + 1
        });
    };
}

export default Counter;
