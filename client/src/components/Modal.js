import React, { Component } from 'react'
import { Button, Icon, Image, Modal, Input } from 'semantic-ui-react'
import Dropbox from 'dropbox'
import { connect } from 'react-redux'
import axios from 'axios'
import swal from 'sweetalert2'

class ModalAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Name: '',
      Description: '',
      imageLink: 'https://www.bus-stac.fr/var/site/storage/images/4/0/2/2/2204-1-eng-GB/B.png',
      Pledged: 0,
      Goals: 0,
      Deadline: 0,
      UpVotes: '{0}',
      DownVotes: '{0}',
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
        console.log('the response ', response);
      })
      .catch(function(error) {
        console.error(error);
      });
    return false;
  }

  submitProject = (e) => {
    e.preventDefault();
    axios.post(`${ROOT_URL}/createproject`, {
      name: this.state.Name,
      description: this.state.Description,
      userId: this.props.user.userId,
      img: this.state.imageLink,
      pledged: this.state.Pledged,
      goals: this.state.Goals,
      deadline: this.state.Deadline,
      upvotes: this.state.UpVotes,
      downvotes: this.state.DownVotes,
    })
      .then(response => {
        console.log('POSTED', response)
        this.props.addProject(response)
        swal('Nice!', 'Project Add', 'success')
      })
      .catch(err => console.log('NOT POSTED' , err))
  }



  render(){
    //console.log('Modal This', this.props)
    return (
      <Modal open={this.state.modal} trigger={<button id="buttonAdd" className="addProject" onClick={this.modalOpen}>Add New Project</button>}>
    <Modal.Header>Add New Project</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src={this.state.imageLink}/>
      <Modal.Description>
        <div className="addInput-Handler">
          <label> Name</label>
          <Input name="Name"  type="text" onChange={this.handleInputChange}/>
          <label> Description</label>
          <Input name="Description" type="text" onChange={this.handleInputChange}/>
          <label> Deadline</label>
          <Input name="Deadline" type="text" onChange={this.handleInputChange}/>
          <label> Image</label>
          <Input type="file" onChange={this.handleInputFile}/>
          <Button onClick={this.uploadFile}>Upload Image</Button>
        </div>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button primary className="negative ui button" onClick={this.modalClose}>Quit</Button>
      <Button primary onClick={this.submitProject}>
        Add <Icon name='checkmark'/>
      </Button>
    </Modal.Actions>
  </Modal>
)
}
}


const ROOT_URL = 'http://localhost:3003'

function mapDispatchToProps(dispatch) {
  return {
    addProject (results) {
        console.log('the add response',  results )
        dispatch({ type: 'ADD_PROJECT', payload: results.data.project })
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalAdd)