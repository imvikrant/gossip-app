import React from 'react';
import Dialog, { DialogContent, DialogTitle } from '@material/react-dialog'
import TextField, {HelperText, Input} from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon'
import socket from '../../socketio/socket';
import {connect} from 'react-redux'
import List, {ListItem, ListItemText, ListItemGraphic, ListItemMeta, ListDivider} from '@material/react-list';
import './SearchDialog.scss'

class SearchDialog extends React.Component {

    constructor(props) {
        super(props)
    }
   
    state = {
        value: '',
        users: []
    }

    handleSearch = () => {
        // socket.emitAddNewUser(this.state.value);
        // this.setState({value: ''})
        fetch(`/users/search/${this.state.value}`)
            .then((response) => {
            return response.json();
          })
          .then((myJson) => {
                console.log(myJson)
                this.setState({users: myJson.users})
          });
    }


    addRequest = (username) => {

        socket.emitAddNewUser(username);

        const newUsers = this.state.users.map((user) => {
            if (user.username === username) 
                user.reqSent = true;
           
                return user;
        })

        this.setState({users: newUsers})
    }

    render() {
        console.log(this.props)
        return (
            <Dialog open={this.props.isOpen} className="search-dialog" onClose={this.props.closeModal}>
                <DialogTitle className="search-title">
                    <TextField
                        label='Enter Username'
                        fullWidth
                        helperText={<HelperText>Enter Username</HelperText>}
                        onTrailingIconSelect={this.handleSearch}
                        trailingIcon={<MaterialIcon role="button" icon="search" onClick={this.handleSearch} />}
                    ><Input
                            
                            value={this.state.value}
                            onChange={(e) => this.setState({ value: e.currentTarget.value })} />
                    </TextField>
                </DialogTitle>
                <DialogContent className="search-content">
                    <List className="search-populate">

                        {

                            this.state.users
                                .map(user => (
                                    <ListItem key={Math.random()}>
                                        {/* <ListItemGraphic
                                            className="profile-img"
                                                graphic={
                                                    <img 
                                                        src={`http://localhost:3000/avatar/${user.username}`}
                                                    />
                                                }
                                            /> */}
                                        <ListItemText primaryText={user.username} />
                                        <ListItemMeta meta={user.reqSent ? 'reqest sent': <MaterialIcon icon="add" 
                                            onClick={() => this.addRequest(user.username)}
                                        />}/>
                                    </ListItem>
                                ))

                        }
                    </List>
                </DialogContent>
            </Dialog>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch({type: 'CLOSE_MODAL'})
})

const mapStateToProps = (state) => ({
    isOpen: state.ui.modalOpen
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchDialog)