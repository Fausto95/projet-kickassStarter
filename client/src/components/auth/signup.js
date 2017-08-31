import React, { Component } from 'react'
import { connect } from 'react-redux'
import swal from 'sweetalert2'
import axios from 'axios'
import { browserHistory } from 'react-router'


class SignUp extends Component{
    constructor(){
        super()
        this.state ={
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: '',
            passwordMatch: false
        }
    }
    

    handleFormSubmit = (e) => {
        e.preventDefault()
        let required = ['firstName', 'lastName', 'email', 'password', 'confirmPassword', 'role']
        let isValide = true
        required.forEach(item => {
            if (this.state[item] === '') isValide = false
        })
        if (!isValide) return swal('Must!', 'fill all inputs', 'error')
        const firstName = this.state.firstName.toString()
    	const lastName = this.state.lastName.toString()
        const email = this.state.email.toString()
        const password = this.state.password.toString()
        const confirmPassword = this.state.confirmPassword.toString()
        const role = this.state.role.toString()
        if(password !== confirmPassword) return this.setState({ passwordMatch: true })
            /// Need to do something to login the user 
        
       this.props.UserSignUp({firstName, lastName, email, password, role})
    }
    handleInputChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: [e.target.value]
        })
    }
    renderAlert(){
        if(this.state.passwordMatch){
            return (
                <div className="ui red basic label">
                    <strong>Ooops </strong>Passwords Dont Match
                </div>
                )
        }

    }
    renderAlertError(){
        if(this.props.errorMessage){
            return (
                <div className="ui red basic label">
                    <strong>Ooops </strong>{this.props.errorMessage}
                </div>
                )
        }

    }
	render(){
		//console.log(this.state)
		return(
            <div className="signup-Handler">
                <h1>Sign Up</h1>
                <form className="signup-form" onSubmit={this.handleFormSubmit}>
                    <label> First Name </label>
                    <div className="ui input focus">
                        <input name="firstName" type="text" onChange={this.handleInputChange} placeholder="First Name"/>
                    </div>

                    <label> Last Name </label> 
                    <div className="ui input focus">
                        <input name="lastName" type="text" onChange={this.handleInputChange} placeholder="Last Name"/>
                    </div>  

                    <label> Email </label>
                    <div className="ui input focus">
                        <input name="email" type="email" onChange={this.handleInputChange} placeholder="Email"/>
                    </div>  

                    <label> Password </label>
                    <div className="ui input focus">
                        <input name="password" type="password" onChange={this.handleInputChange} placeholder="Password"/>
                    </div>  

                    {this.renderAlert()}
                    <br/>

                    <label> Confirm Password </label>
                    <div className="ui input focus">
                        <input name="confirmPassword" type="password" onChange={this.handleInputChange} placeholder="Confirm Password"/>
                    </div>                     

                    <label> Role </label>
                    <div className="ui input focus">
                        <input name="role" type="text" onChange={this.handleInputChange} placeholder="Role" />
                    </div> 

                    {this.renderAlertError()}
                    <br/>
                    <button className="ui primary button" action="submit">Sign Up</button>
                    <br/>
                </form>
            </div>
		)
	}
}

// const ROOT_URL = 'http://localhost:3003'

function mapDispatchToProps(dispatch) {
  return {
    UserSignUp (results) {
    	//console.log('the results',results)
        axios.post(`/signup`, { firstName: results.firstName, lastName: results.lastName, email: results.email, password: results.password, function: results.role })
            .then(response =>{
            	console.log('the response', response)
                localStorage.setItem('user', JSON.stringify(response.data.user))
                localStorage.setItem('token', response.data.token)
                console.log('the dispatch', dispatch)
                dispatch({ type: 'AUTH_USER', payload: response.data.user })
                browserHistory.push(`/dashboard/user/${response.data.user.userId}`)
            })
            .catch(response =>{
            	const err = Object.assign({}, response)
            	//console.log(err.response)
              	dispatch(authError(err.response.data.error))
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

const SignUser = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);

export default SignUser

