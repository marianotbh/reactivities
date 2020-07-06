import "mobx-react-lite/batchingForReactDom";
import React from "react";
import ReactDOM from "react-dom";
import App from "./app/layout/App";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import "./app/layout/styles.css";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.register();
