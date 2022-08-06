import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import  Modal from 'react-bootstrap/Modal'

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export class random extends Component {

    state={
        modalShow:false
    }

    handleClose=()=>{
        this.setState({modalShow:false});
    }

    handleShow=()=>{
        this.setState({modalShow:true})
    }

    componentDidMount=()=>{
      if(!localStorage.getItem("isLoggedIn")){
        {
          this.props.history.push("/");  
        }
    }
    }
    render() {
        return (
            <div>
                <Button variant="primary" onClick={this.handleShow}>
        Launch demo modal
      </Button>

      <Modal show={this.state.modalShow} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleSubcribe}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
            </div>
        )
    }
}

export default random
