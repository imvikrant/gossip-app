import React, {Component} from 'react';
import './SideDrawerContent.scss'
import MaterialIcon from '@material/react-material-icon'
import Card, {CardMedia, CardPrimaryContent} from '@material/react-card'
import {Headline6, Body1} from '@material/react-typography'
import TextField, {Input, HelperText} from '@material/react-text-field'
import Button from '@material/react-button'
import IconButton from '@material/react-icon-button'
import FloatingLabel from '@material/react-floating-label'
import {connect} from 'react-redux'
import socket from './../../socketio/socket'

class SideDrawerContent extends Component {
  // componentDidMount() {
  //   this.setState({
  //     username: this.props.username,
  //     status: this.props.status
  //   })
  // }

  constructor(props) {
    super(props)
    
    // console.log(props)

    this.state = {
      username: '',
      status: '',
      usernameIcon: '',
      statusicon: ''
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.username !== this.props.username || prevProps.status !== this.props.status)
    {
      this.setState({
      username: this.props.username,
      status: this.props.status
    })
  }
  }


  handleKeyDownStatus = (e) => {
    if (e.keyCode == 13) {
      e.target.blur()
      socket.emitUpdateProfile('status', this.state.status)
    }
  } 

  handleKeyDownName = (e) => {
    // console.log('keydown', e.keyCode)
    if (e.keyCode == 13) {
      
      e.target.blur()
      socket.emitUpdateProfile('username', this.state.username)
    }
  } 

  render() {
    console.log('state', this.state)
    console.log('hello', this.state.username, this.state.status)

    return (
      <>
        <IconButton
          onClick={this.props.closeDrawer}
        >
          <MaterialIcon icon="arrow_back"/>
        </IconButton>
        <Card className="drawer-card">
         
            <CardMedia className="drawer-display-pic" square imageUrl={this.props.imageUrl} >
            
            
            </CardMedia>
            <Button
              className="btn"
              outlined
              onClick={this.props.openProfileDialog}
            >
              Change Pic
            </Button>
            {/* <h3 className="profile-name">Vikrant <MaterialIcon icon="edit"/></h3> */}
            <Headline6 className="label">Name</Headline6>
            <TextField
        
              helperText={<HelperText>Press Enter to update</HelperText>}
              outlined
              className="text-field"
              trailingIcon= {<MaterialIcon icon={this.state.usernameIcon}/>}
            >
              <Input 
                value={this.state.username}
                onChange={(e) => this.setState({username: e.target.value})}
                onFocus={(e => this.setState({usernameIcon: 'edit'}))}
                onBlur={(e => this.setState({usernameIcon: ''}))}
                onKeyDown={this.handleKeyDownName}
              />
            </TextField>
            <div className="gap"></div>
            
            
            <Headline6 className="label">Status</Headline6>
            <TextField
              helperText={<HelperText>Press Enter to update</HelperText>}
              className="text-field"
              // disabled
              outlined
              trailingIcon= {<MaterialIcon icon="edit"/>}
            >
              <Input 
                value={this.state.status}
                onChange={(e) => this.setState({status: e.target.value})}
                onFocus={(e => this.setState({statusIcon: 'edit'}))}
                onBlur={(e => this.setState({statusIcon: ''}))}
                onKeyDown={this.handleKeyDownStatus}
              />
              
            </TextField>
           
        </Card>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.profile.username,
  status: state.profile.status,
  imageUrl: state.profile.imageUrl
})

const mapDispatchToProps = (dispatch) => ({
  closeDrawer : () => dispatch({type: 'CLOSE_DRAWER'}),
  openProfileDialog: () => dispatch({type: 'OPEN_PROFILE_DIALOG'})
})

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawerContent)