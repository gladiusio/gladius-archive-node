import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Form from './components/Form';
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
                <p>Please use a browser that supports web3 or install an extension like Metamask.</p>
            )
        }
    }

    render() {
        return (
            <Grid className="App">
                <Row className="show-grid">
                    <Col xs={6} xsOffset={3} className="Top-Row">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo"/>
                            <h1 className="App-title">Gladius node interface</h1>
                        </header>
                        <br/>
                        {this.checkInjectedWeb3()}
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default App;
