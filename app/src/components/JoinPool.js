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
        this.validateEmail = this.validateEmail.bind(this);
        this.validateIP = this.validateIP.bind(this);

        // Set initial values and inherit web3
        this.state = {
            poolAddress: '',
            ipAddress: '',
            emailAddress: '',
            myWeb3: props.myWeb3,
            poolObject: props.poolObject
        };
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    validateIP(ip) {
        var re = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
        return re.test(ip)
    }

    getValidationState() {
        let messages = [];
        let status = 'success';

        if (this.state.myWeb3.utils.isAddress(this.state.poolAddress)) {
            messages[0] = 'Valid eth address';
        } else {
            status = 'error';
            messages[0] = 'Invalid eth address';
        }

        if (this.validateEmail(this.state.emailAddress)) {
            messages[1] = 'Valid email address';
        } else {
            status = 'error';
            messages[1] = 'Invalid email address';
        }

        if (this.validateIP(this.state.ipAddress)) {
            messages[2] = 'Valid IP address';
        } else {
            status = 'error';
            messages[2] = 'Invalid IP address';
        }


        return {status: status, message: messages.join(', ')}
    }


    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    encryptData(data, publicKey) {
        let key = new NodeRSA();
        key.importKey(publicKey, 'pkcs1-public-pem');
        return key.encrypt(data, 'base64');
    }

    handleButtonClick(e) {
        if (this.getValidationState().status === 'success') {
            this.state.poolObject.options.address = this.state.poolAddress;

            let self = this;
            // Get the accounts
            this.state.myWeb3.eth.getAccounts(function (err, accounts) {
                if (accounts[0] !== undefined) {
                        // Get the public key
                        self.state.poolObject.methods.getPoolPublicKey().call().then(function (result) {
                            // Encrypt the string
                            let encryptedData = self.encryptData(self.state.ipAddress + "|" + self.state.emailAddress, result);
                            console.log("Encrypted string: " + encryptedData);
                            // Propose the node and it's information
                            self.state.poolObject.methods.proposeNode(accounts[0], self.props.keys.publicKey, encryptedData)
                                .send({from: accounts[0]}).then(
                                function (send_result) {
                                    console.log(send_result);
                                }
                            )
                        });
                    }
                    else{
                        alert("Looks like you need to unlock your wallet.")
                    }
                }
            );
        }
    }

    render() {
        return (
            <Form inline>
                <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState().status}
                >
                    <ControlLabel>Information</ControlLabel>
                    {' '}
                    <FormControl
                        type="text"
                        name="poolAddress"
                        value={this.state.poolAddress}
                        placeholder="Enter pool"
                        onChange={this.handleChange}
                    />
                    {' '}
                    <FormControl
                        type="text"
                        name="ipAddress"
                        value={this.state.ipAddress}
                        placeholder="Enter your public IP"
                        onChange={this.handleChange}
                    />
                    {' '}
                    <FormControl
                        type="text"
                        name="emailAddress"
                        value={this.state.emailAddress}
                        placeholder="Enter email"
                        onChange={this.handleChange}
                    />
                    {' '}
                    <Button className="Form-Button" onClick={this.handleButtonClick}>Request to join pool</Button>
                    <HelpBlock>{this.getValidationState().message}</HelpBlock>
                </FormGroup>
            </Form>
        );
    }
}

export default JoinPool;