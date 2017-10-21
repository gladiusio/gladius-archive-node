import React, {Component} from 'react';
import './css/Form.css';
import Web3 from 'web3';

// Create a new instance of web3
let myWeb3 = new Web3(window.web3.currentProvider);


class Form extends Component {
    render() {
        return (
            <p className="Form-Header">
                Test
            </p>
        )
    }
}

export default Form;