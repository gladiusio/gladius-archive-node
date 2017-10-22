import React, {Component} from 'react';
import {FormControl, Button, FormGroup, Form, ControlLabel, HelpBlock} from 'react-bootstrap';
import './css/Form.css';

class JoinPool extends Component {
    constructor(props) {
        super(props);

        this.getValidationState = this.getValidationState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);

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

    handleButtonClick(e) {
        if (this.getValidationState().status === 'success') {
            this.state.poolObject.options.address = this.state.value;

            let account = this.state.myWeb3.eth.accounts[0];

            this.state.poolObject.methods.getPoolPublicKey().call({from: account}).then(function (result) {
                console.log(result);
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