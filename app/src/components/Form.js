import React, {Component} from 'react';
import './css/Form.css';
import Web3 from 'web3';
import JoinPool from "./JoinPool";
import GetIP from "./GetIP";

var Pool = require('../contracts/Pool.json');
var Keys = require('../keypair.json');


class Form extends Component {
    constructor(props) {
        super(props);

        // Get web3 instance
        let myWeb3 = new Web3(window.web3.currentProvider);

        // Get abi
        let abi = Pool.abi;

        // creation of contract object
        let poolObject = new myWeb3.eth.Contract(abi);

        // Create a new instance of web3
        this.state = {myWeb3: myWeb3, poolObject: poolObject};
    }


    render() {
        return (
            <div>
                <JoinPool myWeb3={this.state.myWeb3} poolObject={this.state.poolObject} keys={Keys}/>
                <GetIP myWeb3={this.state.myWeb3} poolObject={this.state.poolObject} keys={Keys}/>
            </div>
        );
    }
}

export default Form;