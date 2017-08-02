import React, { Component } from 'react'
import { Button, Icon, Image, Modal, Input } from 'semantic-ui-react'
import Dropbox from 'dropbox'
import { connect } from 'react-redux'
import axios from 'axios'
import swal from 'sweetalert2'

class ModalEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projectId: this.props.projectId,
      Name: this.props.Name,
      Description: this.props.Description,
      imageLink: this.props.imageLink,
      Pledged: this.props.Pledged,
      Goals: this.props.Goals,
      Deadline: this.props.Deadline,
      modal: false

    }
  }

  modalOpen = () => {
    this.setState({modal: true})
  }
  modalClose = () => {
    this.setState({modal: false})
  }

  handleInputChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleInputFile = (e) => {
    this.setState({
        image: e.target.files[0]
    })
  }

  uploadFile = () => {
    const ACCESS_TOKEN = 'TxXQs2_z27AAAAAAAAAAEXUwkv2g2isWmRYnC7BWPubzGbp3-TUkYY23RlBfTg0M'
    const dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
    const file = this.state.image;
    dbx.filesUpload({path: '/' + file.name, contents: file})
      .then(response => {
        //console.log('the response ', response);
      })
      .catch(function(error) {
        //console.error(error);
      });
    return false;
  }

  submitProject (e) {
    //e.preventDefault();
    let obj = {
      //id: this.props.id,
      name: this.state.Name,
      description: this.state.Description,
      userId: this.props.user.userId,
      img: this.state.imageLink,
      pledged: this.state.Pledged,
      goals: this.state.Goals,
      deadline: this.state.Deadline,
    }
    axios.post(`/editproject/${e}`, obj)
      .then(response => {
        this.props.editProject(e, response.data)
        swal('Nice!', 'Project Add', 'success')
      })
      .catch(err => console.log('NOT POSTED' , err))
  }



  render(){
   // console.log('Modal This Edit', this.state)
    return (
      <Modal open={this.state.modal} trigger={<button className="ui black button" onClick={this.modalOpen}>Edit</button>}>
    <Modal.Header>Add New Project</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src={this.state.imageLink}/>
      <Modal.Description>
        <div className="addInput-Handler">
          <label> Name</label>
          <Input name="Name"  type="text" onChange={this.handleInputChange} value={this.state.Name}/>
          <label> Description</label>
          <Input name="Description" type="text" onChange={this.handleInputChange} value={this.state.Description}/>
          <label> Deadline</label>
          <Input name="Deadline" type="text" onChange={this.handleInputChange} value={this.state.Deadline}/>
          <label> Image</label>
          <Input type="file" onChange={this.handleInputFile}/>
          <Button onClick={this.uploadFile}>Upload Image</Button>
        </div>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button primary className="negative ui button" onClick={this.modalClose}>Cancel</Button>
      <Button primary onClick={this.submitProject.bind(this, this.props.projectId)}>
        Save <Icon name='checkmark'/>
      </Button>
    </Modal.Actions>
  </Modal>
)
}
}


const ROOT_URL = 'http://localhost:3003'

function mapDispatchToProps(dispatch) {
  return {
    editProject (results, item) {
        dispatch({ type: 'EDIT_PROJECT', payload: results, item: item })
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEdit)