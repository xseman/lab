import Counter from './Counter.js';

const h = React.createElement;

export function main() {
    const rootElement = document.getElementById("root");

    const root = ReactDOM.createRoot(rootElement);
    root.render(h(Counter, null));
}

/**
 * Related:
 * - https://reactjs.org/docs/add-react-to-a-website.html
 * - https://gist.github.com/gaearon/faa67b76a6c47adbab04f739cba7ceda
 */
