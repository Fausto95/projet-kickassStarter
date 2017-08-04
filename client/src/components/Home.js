import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Footer from './footer'
//import Slide from './slider'
//import swal from 'sweetalert2'

class Welcome extends Component{
	componentDidMount(){
		this.props.fetchProjects()
		axios.get(`/projects/`)
      		.then(response =>{        
        		//console.log('the response projects',  response )
        		this.props.Projects(response.data.projects)
      		})
      		.catch(response =>{
        		console.log('the error projects', response)
      		})
	}
	slide(){
		if(this.props.projects){
			let projects = this.props.projects
			return <div className="slide">{
				projects
				.filter(project => project.Pledged >= 800)
				.map(project => {
					return <img className="mySlides" src={project.imageLink}/>
				})}</div>
			}
	}
	trendingProjects (){
    	if(this.props.projects){
    		let projects = this.props.projects
	      return <div className="cards">{
	      	projects
	      	.filter(project => project.Pledged >= 800)
	      	.map(project => {
	        return <div className="ui card" key={projects.projectId}>
	                  <div className="image">
	                    <img src={project.imageLink}/>
	                  </div>
	                  <div className="content">
	                    <a className="header">{project.Name}</a>
	                    <div className="meta">
	                      <span className="date">{project.Pledged}$ </span><label>Funded</label><br/>
	                      <span className="date">{project.Goals}$ </span><label>Goals</label><br/>
	                      <span className="date">{project.Deadline}</span><label>Days to go</label>
	                    </div>
	                    <div className="description">
	                      {project.Description}
	                    </div>
	                  </div>
	                  <div className="extra content">
	                    <a>
	                      <i className="user icon"></i>
	                      {this.props.user !== null && project.userId !== this.props.user.userId ? <button className="ui blue button" >Join</button> : '22 Friends'}
	                    </a>
	                  </div>
	              </div>
	      		})}</div>
	    	} else{
	      		console.log('ko')
	    } 
  }
  recentProjects(){
    	if(this.props.projects){
				let projects = this.props.projects
				let voteButton
	      return <div className="cards">{
	      	projects
	      	.filter(project => new Date(project.createdAt).setHours(0, 0, 0, 0) > new Date('2017-07-10T19:54:55.200Z').setHours(0, 0, 0, 0) && new Date(project.createdAt).setHours(0, 0, 0, 0) <= new Date().setHours(0,0,0,0))
	      	.map(project => {
	        return <div className="ui card" key={project.projectId}>
	                  <div className="image">
	                    <img src={project.imageLink}/>
	                  </div>
	                  <div className="content">
	                    <a className="header">{project.Name}</a>
	                    <div className="meta">
	                      <span className="date">{project.Pledged}$ </span><label>Funded</label><br/>
	                      <span className="date">{project.Goals}$ </span><label>Goals</label><br/>
	                      <span className="date">{project.Deadline}</span><label>Days to go</label>
	                    </div>
	                    <div className="description">
	                      {project.Description}
	                    </div>
	                  </div>
	                  <div className="extra content">
	                    <a>
												<i className="user icon"></i>
												{ 
													project.votes.some(vote => vote.userId === this.props.user.userId) ? <button className="buttonVote" onClick={this.deleteVote.bind(this, ({projectId: project.projectId, userId: this.props.user.userId, userName: this.props.user.firstName}))}><i className="thumbs down icon"></i></button> : <button className="buttonVote" onClick={this.vote.bind(this, ({projectId: project.projectId, userId: this.props.user.userId, userName: this.props.user.firstName}))}><i className="thumbs up icon"></i></button>													
												}
												<p>{project.votes.length / 100 }% votes</p>
	                      {/*this.props.user !== null && project.userId !== this.props.user.userId ? <button className="ui blue button" >Join</button> : '22 Friends'*/}
	                    </a>
	                  </div>
	              </div>
	      		})}</div>
	    	} else{
	      		console.log('ko')
	    } 
	}
	vote(obj){
		this.props.addVote(obj)
		//this.props.Projects(this.props.projects)
		axios.post('/vote', obj)
		.then(succes => console.log('succes', succes))
		.catch(err => console.log(err))
	}
	deleteVote(obj){
		this.props.deleteVote(obj)
		axios.delete(`/deletevote/${obj.userId}/${obj.projectId}`)
		.then(deleted => console.log('deleted', deleted))
		.catch(err => console.log(err))
	}
	render(){
		let trendingProjects = this.trendingProjects()
		let recentProjects = this.recentProjects()
		let slides = this.slide()
		console.log('home props', this.props)
		return (
			<div>
				{slides}
				<div className="content">
				<h1>Trending</h1>
				<hr/>
				{trendingProjects}
				<h1>Recent Added</h1>
				<hr/>
				{recentProjects}
				<div className="footer-Handler">
					<hr/>
					<Footer/>
        </div>
				</div>
			</div>

			)
	}
}
let myIndex = 0;
carousel();
function carousel() {
    let i;
    let x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";  
		}

		myIndex++;
    if (myIndex > x.length) {myIndex = 1}    
		if(x[myIndex-1]){
			x[myIndex-1].style.display = "block";
		}
    setTimeout(carousel, 2000); 
}
const ROOT_URL = 'http://localhost:3003'

function mapDispatchToProps(dispatch) {
  return {
    fetchProjects () {
		//console.log('the store', store)
		dispatch({ type: 'AUTH_USER', payload: JSON.parse(localStorage.getItem('user'))})
    },
    Projects(results){
    	dispatch({ type: 'FETCH_HOME_PROJECTS', payload: results })
		},
		addVote(obj){
			console.log('THE PROPS FUNC', obj)
			dispatch({ type: 'ADD_VOTE', payload: obj})
		},
		deleteVote(obj){
			dispatch({ type: 'DELETE_VOTE', payload: obj})
		}
  }
}

function mapStateToProps(state){
    return{
        authenticated: state.auth.authenticated,
        user: state.auth.user,
        projects: state.project.projects
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)

