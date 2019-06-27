import React from 'react';
import Button from '@material/react-button';
import TextField, { Input } from '@material/react-text-field'
import './LoginForm.scss'

export default class LoginForm extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            name: ''
        }
    
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // fetch('http://localhost:3000/user', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         name: this.state.name
        //     })
        // }).then((res) => res.json())
        // .then((response) => {
        //     if (response.auth) {
        //         this.props.onLogin(this.state.name);
        //     }
        // })
        this.props.onLogin(this.state.name)
    }

    render() {
        return (

            <form className="login-form">
                <TextField
                    label="name"
                >
                    <Input 
                        value={this.state.name}
                        onChange={e => this.setState({name: e.currentTarget.value})}
                    />
                </TextField>
                <Button className="submit-button"
                    raised outlined
                    onClick={this.handleSubmit}
                >Enter Chat</Button>
            </form>
        )
    }
}

