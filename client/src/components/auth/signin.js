import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import axios from 'axios'


class SignIn extends Component{
    constructor(){
        super()
        this.state ={
            email: '',
            password: ''
        }
    }
    

    handleFormSubmit = (e) => {
        e.preventDefault()
        const email = this.state.email
        const password = this.state.password
            /// Need to do something to login the user 
        
        this.props.UserLogin({email, password})
    }
    handleInputChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: [e.target.value]
        })
    }
    renderAlert(){
        if(this.props.errorMessage){
            return (
                <div className="alert alert-danger">
                    <strong>Ooops </strong>{this.props.errorMessage}
                </div>
                )
        }
    }
    render(){
        //console.log(this.state.email)
        return(
            <div className="signin-Handler">
                <form className="signin-form" onSubmit={this.handleFormSubmit}>
                        <label> Email </label>
                        <div className="ui input focus">
                            <input name="email" type="email" onChange={this.handleInputChange} placeholder="Email" />
                        </div>
                        <label> Password </label>
                        <div className="ui input focus">
                            <input name="password" type="password" onChange={this.handleInputChange} placeholder="Password" />
                        </div>
                    {this.renderAlert()}
                    <button className="ui primary button" action="submit">Sign In</button>
                </form>
            </div>
        )
    }
}



const ROOT_URL = 'http://localhost:3003'

function mapDispatchToProps(dispatch) {
  return {
    UserLogin (results) {
        axios.post(`/signin`, { email: results.email[0], password: results.password[0] })
            .then(response =>{
                console.log('the user', response)
                localStorage.setItem('user', JSON.stringify(response.data.user))
                localStorage.setItem('token', response.data.token)
                // console.log('the dispatch', dispatch)
                // console.log('the response', response)
                dispatch({ type: 'AUTH_USER', payload: response.data.user })
                browserHistory.push(`/dashboard/user/${response.data.user.userId}`)
            })
            .catch(() =>{ 
                dispatch(authError('Bad Login Info'))
            })
    }
  }
}

function authError(error){
    return{
        type: 'AUTH_ERROR',
        payload: error
    }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  }
}

const Signn = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);

export default Signn



