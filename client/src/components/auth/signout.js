import React, { Component } from 'react'
import { connect } from 'react-redux'

class Signout extends Component{
	componentWillMount(){
		this.props.UserLogout();
	}
	render(){
		return <div> <h1 className="SignoutMessage"> Good Bye, Hope See You Soon</h1></div>
	}
}

function mapDispatchToProps(dispatch) {
  return {
    UserLogout () {
    	localStorage.removeItem('token')
    	localStorage.removeItem('user')
        dispatch({ type: 'UNAUTH_USER' })
    }
  }
}


export default connect(null, mapDispatchToProps)(Signout)