/**
 * Resources:
 * - https://reactjs.org/docs/add-react-to-a-website.html
 * - https://gist.github.com/gaearon/faa67b76a6c47adbab04f739cba7ceda
 */

import React from "https://esm.sh/react@18.2.0"
import ReactDOM from "https://esm.sh/react-dom@18.2.0"

import Counter from './Counter.js';

const h = React.createElement;

export function init() {
    const rootElement = document.getElementById("root");
    const root = ReactDOM.createRoot(rootElement);
    root.render(h(Counter, null));
}
