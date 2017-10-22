import React, {Component} from 'react';
import './css/Form.css';
import Web3 from 'web3';


class Form extends Component {
    constructor(props) {
        super(props);

        // Create a new instance of web3
        this.myWeb3 = new Web3(window.web3.currentProvider);
        this.state = {};
    }


    render() {
        return (
            <p className="Form-Header">
                Testing
            </p>
        );
    }
}

export default Form;