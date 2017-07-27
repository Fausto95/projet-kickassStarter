import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class Header extends Component{

    renderLinks(){
        //const user = JSON.parse(localStorage.getItem('user'))
        if(this.props.authenticated && this.props.user !== undefined && this.props.user !== null ){
            return[
                <div className="navbar" key={0}> 
                    <div className="navItem" key={1}>
                        <Link to="/signout" activeStyle={{ color: 'black' }}>Sign Out</Link>
                    </div>
                    <div className="navItem" key={2}>
                        <Link to={`/dashboard/user/${this.props.user.userId}`} activeStyle={{ color: 'black' }}>Dashboard</Link>
                    </div>
                </div>
            ]

        } else{
            return [
                <div className="navbar" key={3}>
                    <div className="navItem" key={4}>
                        <Link  to="/signin" activeStyle={{ color: 'black' }}>Sign in </Link> 
                    </div>
                    <div className="navItem" key={5}>
                        <Link  to="/signup" activeStyle={{ color: 'black' }}>Sign Up</Link>
                    </div>
                </div>
            ]
        }
    }
    render(){
        //console.log('the Header props', this.props)
        return(
            <div className="Header">
                <div className="navbar">
                <Link to='/' className="navItem">Home</Link>
                    {this.renderLinks()}
                </div>
            </div>
        )
    }
}


function mapStateToProps(state){
    return{
        authenticated: state.auth.authenticated,
        user: state.auth.user
    }
}
export default connect(mapStateToProps)(Header)