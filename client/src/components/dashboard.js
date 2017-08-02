import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Modal from './Modal'
import ModalEdit from './ModalEdit'
import swal from 'sweetalert2'


class Dashboard extends Component{
  componentDidMount(){
    axios.get(`/myprojects/${this.props.routeParams.id}`, {  headers: { authorization: localStorage.getItem('token') } })
      .then(response =>{        
        //console.log('the response',  response )
        this.props.fetchProjects(response)
        
      })
      .catch(response =>{
        //console.log('the error', response)
      })
  }
  deleteProject = (e) => {
    let theThis = this
    //console.log('THE DELETE BUTTON', e)
    swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
      }).then(function () {
        axios.delete(`/deleteproject/${e}`)
          .then(result =>{
            //console.log('DELETEDD', result)
            theThis.props.deleteProject(e)
            swal(
            'Deleted!',
            `Your file has been deleted.`,
            'success'
            )
            //this.props.deleteProject(e)
          })
      }, function (dismiss) {
        // dismiss can be 'cancel', 'overlay',
        // 'close', and 'timer'
        if (dismiss === 'cancel') {
          swal(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
    })
  }

  projects (){
    const user = JSON.parse(localStorage.getItem('user'))
    if(this.props.projects && this.props.user.userId === user.userId){
      return <div className="cards" >{this.props.projects.projects.map(project => {
        return <div className="ui card" key={project.id}>
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
                    <button className="ui red button" onClick={this.deleteProject.bind(this, project.id)}>Delete</button>
                    <ModalEdit {...project}/>
                  </div>
              </div>
      })}</div>
    } else{
      //console.log('ko')
    } 

  }
	render(){
    //console.log('url params', this.props.routeParams.id)
    //console.log('dash props', this.props)

    let card = this.projects()
		return(
			<div>
        <div className="wrapper">
          <div className="two">
            <div className="imageProfile">
              <img className="ui small circular image" src="http://nodeframework.com/assets/img/js.png"/>
              <h1>{this.props.user ? this.props.user.firstName : ''}</h1>
            </div>
            <Modal/>
            <div className="addProject">Contributing</div>
            <div className="addProject">Other Features</div>
          </div>
          <div className="three">
            <h1> Dashboard </h1>
            <hr/>
            <div className="cardsHandler">
              {card}
            </div>
          </div>
        </div>
        <div className="respModal">
        <Modal/>
        </div>
      </div>

		)
	}
}

const ROOT_URL = 'http://localhost:3003'

function mapDispatchToProps(dispatch) {
  return {
    fetchProjects (results) {
        //console.log('the response',  results )
        dispatch({ type: 'FETCH_MY_PROJECTS', payload: results.data })
        dispatch({ type: 'AUTH_USER', payload: JSON.parse(localStorage.getItem('user'))})
    },
    deleteProject(id){
      //console.log("THE ID OF THE PROJECT THAT GONNA BE DELETED", id)
      dispatch({ type: 'DELETE_PROJECT', payload: id })
    }
  }
}

function mapStateToProps(state){
    return{
        authenticated: state.auth.authenticated,
        user: state.project.data,
        projects: state.project.data
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)