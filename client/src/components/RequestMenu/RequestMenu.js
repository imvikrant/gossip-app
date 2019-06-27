import React from 'react';
import Menu, {MenuList, MenuListItem, MenuListItemText, MenuListItemMeta} from '@material/react-menu';
import MaterialIcon from '@material/react-material-icon'
import {connect} from 'react-redux';
import './RequestMenu.scss';
import socket from '../../socketio/socket'
import { Corner } from '@material/menu';

class RequestMenu extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
    anchorElement: null
  };

  setAnchorElement = (element) => {
    if (this.state.anchorElement) {
      return;
    }
    this.setState({anchorElement: element});
  }

  
  onClose = () => {
    this.props.closeModal()
  }

  render() {
   
    return (
      <div
        className='mdc-menu-surface--anchor'
        ref={this.setAnchorElement}
      >
      <Menu
        open={this.props.isOpen}
        onClose={this.onClose}
        anchorCorner={Corner.BOTTOM_RIGHT}
        coordinates={this.state.coordinates}
        onSelected={(index, item) => console.log(index, item)}
        anchorElement={this.state.anchorElement}
      > 
      { 
        <MenuList>
          {
            this.props.requests.length > 0 ? this.props.requests.map((username, index) => (
            <MenuListItem key={index}>
              <MenuListItemText primaryText={username} />
              <MenuListItemMeta meta={<MaterialIcon icon="add" 
                onClick={() => socket.emitRequestAccepted(username)}
              />}/>
            </MenuListItem>
          )) : <p>No request</p>
          }
        </MenuList>
       
        
      }
        
      </Menu>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch({type: 'CLOSE_MENU'})
})

const mapStateToProps = (state) => ({
  isOpen: state.ui.menuOpen,
  requests: state.requests
})

export default connect(mapStateToProps, mapDispatchToProps)(RequestMenu)