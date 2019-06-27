import React, { useEffect } from 'react'
import './App.scss';
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import { Grid, Row, Cell } from '@material/react-layout-grid'
import { emit } from '../../socketio/socket'
import Appbar from '../Appbar/Appbar'
import Menu from '../Menu/Menu'
import ChatPanel from '../ChatPanel/ChatPanel'
import SearchDialog from '../SearchDialog/SearchDialog'
import RequestMenu from '../RequestMenu/RequestMenu'
// import SideDrawer from '../SideDrawer/SideDrawer'
import SideDrawerContent from '../SideDrawer/SideDrawerContent'
import ProfileChangeDialog from '../ProfileChangeDialog/ProfileChangeDialog'
import Drawer, { DrawerAppContent } from '@material/react-drawer';
import {connect} from 'react-redux'
import socket from '../../socketio/socket'



console.log('app ran')

class App extends React.Component {


    constructor(props) {
        super(props)
    }


    render() {

        console.log('do', this.props.openDrawer)
        return (
            <>
                <div>
                    <Drawer
                        dismissible
                        open={this.props.openDrawer}
                        
                    >
                        <SideDrawerContent />
                    </Drawer>
                    

            <DrawerAppContent >
                    <Appbar />
                <SearchDialog />
                <ProfileChangeDialog />
                {/* <RequestMenu /> */}
                <TopAppBarFixedAdjust className="app-bar-adjust">
                    <Grid className="app-grid">
                        <Row className="app-row">
                            <Cell desktopColumns={3} tabletColumns={4}>
                                <Menu />
                            </Cell>
                            <Cell desktopColumns={9} tabletColumns={4}>
                                <ChatPanel/>
                            </Cell>
                        </Row>
                    </Grid>
                </TopAppBarFixedAdjust>
                    </DrawerAppContent >
                </div>


            </>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        openDrawer : state.ui.drawerOpen
    })
}

export default connect(mapStateToProps)(App)