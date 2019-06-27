import React from 'react'
import TopAppBar, {
    TopAppBarIcon,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarTitle
} from '@material/react-top-app-bar'
import MaterialIcon from '@material/react-material-icon'
import './Appbar.scss'
import {connect} from 'react-redux'
import RequestMenu from '../RequestMenu/RequestMenu'

const Appbar = (props) => (
    <>
        <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection align='start'>
            {/* <TopAppBarIcon navIcon tabIndex={0}>
              <MaterialIcon hasRipple icon='menu' onClick={() => console.log('click')}/>
            </TopAppBarIcon> */}
            <TopAppBarTitle>gossip</TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection align='end' role='toolbar' className="mdc-menu-surface--anchor"> 
            <TopAppBarIcon actionItem tabIndex={0} >
              <MaterialIcon 
                aria-label="requests" 
                hasRipple 
                icon='notifications' 
                onClick={() => props.openMenu()}
              />
              
            </TopAppBarIcon>
            <RequestMenu />
            <TopAppBarIcon actionItem tabIndex={1}>
              <MaterialIcon 
                aria-label="search" 
                hasRipple 
                icon='search' 
                onClick={() => props.openModal()}
              />
            </TopAppBarIcon>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
    </>
)

const mapDispatchToProps = (dispatch) => ({
  openModal: () => dispatch({type: 'OPEN_MODAL'}),
  openMenu: () => dispatch({type: 'OPEN_MENU'})
}) 

export default connect(null, mapDispatchToProps)(Appbar)