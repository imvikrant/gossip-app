import React from 'react'
import List, {ListItem, ListItemText, ListItemGraphic, ListItemMeta, ListDivider} from '@material/react-list'
import './Menu.scss'
import { connect } from 'react-redux';
import ProfilePanel from '../ProfilePanel/ProfilePanel'
// import SearchBar from '../SearchBar/SearchBar'

class Menu extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedIndex: null
        }
    }

    render() {

        const {users, setCurrentUser} = this.props;
    return (
        <div className="user-panel">
            <ProfilePanel />
            {/* <SearchBar /> */}
            <List avatarList className="user-list"
                
                singleSelection
                selectedIndex = {this.state.selectedIndex}
                handleSelect = {(selectedIndex) => {this.setState({selectedIndex})
                setCurrentUser(users[selectedIndex].username);
            }}
            >
                    {/* <ListItem>
                        <ListItemText primaryText={'Contacts'} className="contact-header"/>
                    </ListItem>
                    <ListDivider /> */}
                {users.map((user, index) => (
                    <React.Fragment key={index}>
                    <ListItem>
                        <ListItemGraphic
                        className="profile-img"
                            graphic={
                                <img 
                                    src={`/avatar/${user.username}`}
                                />
                            }
                        />
                        <ListItemText primaryText={user.username}/>
                        {user.online && <ListItemMeta meta="online"/>}
                    </ListItem>
                    <ListDivider />
                    </React.Fragment>
                )) }
            </List>
        </div>
    )
    }
}

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (username) => dispatch({
        type: 'SET_CURRENT_USER',
        username
    })
})

const mapStateToProps = (state) => ({
    users: state.users,
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu);