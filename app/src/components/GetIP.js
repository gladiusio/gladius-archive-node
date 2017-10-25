import React, {Component} from 'react';
import {FormControl, Button, FormGroup, Form, ControlLabel, HelpBlock} from 'react-bootstrap';
import NodeRSA from 'node-rsa';
import './css/Form.css';

class GetIP extends Component {
    constructor(props) {
        super(props);

        this.getValidationState = this.getValidationState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.decryptData = this.decryptData.bind(this);

        // Set initial values and inherit web3
        this.state = {
            poolAddress: '',
            myWeb3: props.myWeb3,
            poolObject: props.poolObject,
            help: 'Not a valid address'
        };
    }

    getValidationState() {
        if (this.state.myWeb3.utils.isAddress(this.state.poolAddress))
            return {status: 'success', message: 'Valid address'};
        else
            return {status: 'error', message: 'Not a valid address'};

    }


    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    decryptData(data, privateKey){
        let key = new NodeRSA();
        key.importKey(privateKey, 'pkcs1-private-pem');
        return key.decrypt(data, 'utf8');
    }


    handleButtonClick(e) {
        if (this.getValidationState().status === 'success') {
            this.state.poolObject.options.address = this.state.poolAddress;

            let self = this;
            // Get the accounts
            this.state.myWeb3.eth.getAccounts(function (err, accounts) {
                self.state.poolObject.methods.getPoolDataForNode(accounts[0]).call().then(function (result) {
                    if (result === ""){
                        alert("Not accepted to that pool yet");
                    }else{
                        alert("Pool information: " + self.decryptData(result, self.props.keys.privateKey));
                    }
                });
            });
        }
    }

    render() {
        return (
            <Form inline>
                <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState().status}
                >
                    <ControlLabel>Get pool information</ControlLabel>
                    {' '}
                    <FormControl
                        type="text"
                        name="poolAddress"
                        value={this.state.poolAddress}
                        placeholder="Enter pool"
                        onChange={this.handleChange}
                    />
                    {' '}
                    <Button className="Form-Button" onClick={this.handleButtonClick}>Get information</Button>
                    <HelpBlock>{this.getValidationState().message}</HelpBlock>
                </FormGroup>
            </Form>
        );
    }
}

export default GetIP;