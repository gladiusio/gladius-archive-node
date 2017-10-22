import React, {Component} from 'react';
import Form from './components/Form'
import logo from './logo.png';
import './App.css';

class App extends Component {
    checkInjectedWeb3() {
        if (typeof window.web3 !== 'undefined') {
            // Return the form object to allow interaction with pool contracts
            return (
                <Form/>
            )
        }
        else {
            return (
                <p>"Please use a browser that supports web3 or install an extension like Metamask."</p>
            )
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Gladius node interface</h1>
                </header>
                {this.checkInjectedWeb3()}
            </div>
        );
    }
}

export default App;
