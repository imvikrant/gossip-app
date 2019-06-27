import React from 'react'
import Card, {CardPrimaryContent, CardMedia, CardActions, CardActionButtons} from '@material/react-card'
import {Headline6, Subtitle2, Headline4, Body1} from '@material/react-typography'
import {connect} from 'react-redux'
import './ProfilePanel.scss'

const ProfilePanel = ({username, status, imageUrl, openDrawer}) => (
    <Card className='card' outlined >
  <CardPrimaryContent className='card-primary-content' onClick={() => {openDrawer()}}>
    <CardMedia square imageUrl={imageUrl} className='card-media' />
    <div className="card-text-content">
      <Headline6 className="card-title">{username}</Headline6>
      <Subtitle2 className="card-subtitle">{status}</Subtitle2>
    </div>
  </CardPrimaryContent>
</Card>
)

const mapDispatchToProps = (dispatch) => ({
  openDrawer: () => dispatch({type: 'OPEN_DRAWER'})
})

const mapStateToProps = (state) => ({
  username: state.profile.username,
  status: state.profile.status,
  imageUrl: state.profile.imageUrl
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePanel);