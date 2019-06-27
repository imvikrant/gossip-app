import React from 'react'
import Dialog, {DialogContent, DialogTitle, DialogFooter, DialogButton} from '@material/react-dialog'
import './ProfileChangeDialog.scss'
import {connect} from 'react-redux'

class ProfileChangeDialog extends React.Component {

    constructor(props) {
        super(props)
    }

    state = {
        file: null
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.closeProfileDialog();
        const formData = new FormData();

        formData.append('avatar', this.state.file)
        formData.append('username', this.props.username)

        fetch('/avatar', {
            method: 'POST',
            body: formData,
        }).then(() => {
            this.props.updateImage()
        }).catch(e => console.log(e))
    }

    render() {
        return (
            <Dialog open={this.props.profileDialogOpen} onClose={this.props.closeProfileDialog}>
            <DialogContent>
        
                <form onSubmit={this.handleSubmit} method="POST" encType="multipart/form-data">
                    <input type="file" name="avatar" onChange={(e) => this.setState({file: e.target.files[0]})}/>
                    <DialogButton type="submit">Submit</DialogButton>
                </form>
       
            </DialogContent>
            </Dialog>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    closeProfileDialog: () => dispatch({type: 'CLOSE_PROFILE_DIALOG'}),
    updateImage: () => dispatch({type: 'UPDATE_IMAGE'})
})

const mapStateToProps = (state) => ({
    profileDialogOpen: state.ui.profileDialogOpen,
    username: state.profile.username
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileChangeDialog);