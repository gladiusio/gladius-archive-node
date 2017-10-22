import React, {Component} from 'react';
import {FormControl, Button, FormGroup, Form, ControlLabel, HelpBlock} from 'react-bootstrap';
import NodeRSA from 'node-rsa';
import './css/Form.css';

class JoinPool extends Component {
    constructor(props) {
        super(props);

        this.getValidationState = this.getValidationState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.encryptData = this.encryptData.bind(this);

        // Set initial value and inherit web3
        this.state = {value: '', myWeb3: props.myWeb3, poolObject: props.poolObject, help: 'Not a valid address'};
    }

    getValidationState() {
        if (this.state.myWeb3.utils.isAddress(this.state.value))
            return {status: 'success', message: 'Valid address'};
        else
            return {status: 'error', message: 'Not a valid address'};

    }


    handleChange(e) {
        this.setState({value: e.target.value});
    }

    encryptData(data, publicKey) {
        let key = new NodeRSA();
        key.importKey(publicKey, 'pkcs1-public-pem');
        return key.encrypt(data, 'base64');
    }

    handleButtonClick(e) {
        if (this.getValidationState().status === 'success') {
            this.state.poolObject.options.address = this.state.value;

            let self = this;
            // Get the accounts
            this.state.myWeb3.eth.getAccounts(function (err, accounts) {
                // Get the public key
                self.state.poolObject.methods.getPoolPublicKey().call().then(function (result) {
                    // Propose the node
                    self.state.poolObject.methods.proposeNode(accounts[0], self.props.keys.publicKey, self.encryptData("testing", result))
                        .send({from: accounts[0]}).then(
                        function (send_result) {
                            console.log(send_result);
                        }
                    )
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
                    <ControlLabel>Pool address</ControlLabel>
                    {' '}
                    <FormControl
                        type="text"
                        value={this.state.value}
                        placeholder="Enter text"
                        onChange={this.handleChange}
                    />
                    {' '}
                    <Button class="Form-Button" onClick={this.handleButtonClick}>Request to join pool</Button>
                    <HelpBlock>{this.getValidationState().message}</HelpBlock>
                </FormGroup>
            </Form>
        );
    }
}

export default JoinPool;