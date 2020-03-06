import * as React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Fib} from './Fib';
// import {register} from './ts/registerServiceWorker';
import './scss/App';

export const App = () => {
    return (
        <Router>
        <div className="container">
            <p className="body-text">I am the body text</p>
            <p className="link-text"><Link to="/">Go back to homepage</Link></p>
        </div>
        <div>
            <Route exact path="/" component={Fib} />
        </div>
        </Router>
    );
};

const root = document.getElementById('root');
if (root) {
    // register();
    render(<App />, root);
}