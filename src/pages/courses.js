import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import moment from 'moment'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import configData from './config.json'

export class Courses extends Component {
  state = {
    courses: [],
    modalShow: false,
    showId: 0,
    createRequested: false,
    newCourse: ''
  }

  handleClose = () => {
    this.setState({ modalShow: false })
  }

  handleShow = (e, id) => {
    this.setState({ modalShow: true })
    this.setState({ showId: id })
  }

  courseHandler = (e, id, name) => {
    // console.log(id)
    // console.log(name)
    localStorage.setItem('course', id);
    localStorage.setItem('course_name',name);
    const url = '/posts/' + localStorage.getItem('course')
    this.props.history.push(url)
  }
  handleCreatecourse = event => {
    // console.log('Bye')
    this.setState({ createRequested: true })
  }

  handleCourseName = e => {
    this.setState({ newCourse: e.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({ disabled: true })
    const url = `${configData.SERVER_URL}api/courses`
    // console.log(url)

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `JWT ${localStorage.getItem('token')}`
    }
    const course = this.state.newCourse
    const branch = this.props.match.params.id
    const institute = localStorage.getItem('institute')
    let bodyFormData = new FormData()
    bodyFormData.set('name', course)
    bodyFormData.set('branch', branch)
    bodyFormData.set('institute', institute)

    axios
      .post(url, bodyFormData, { headers })
      .then(result => {
        // console.log(result.data)
      })
      .catch(error => {
        console.log(error)
      })

    window.setTimeout(function () {
      window.location.reload()
    }, 200)

    // window.location.reload()
  }

  subscribeHandler = (e, id, subs) => {
    if (!subs) {
      // alert("Are you sure you want to Subscribe?");
      const url = `${configData.SERVER_URL}api/email-notification-subscription`
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `JWT ${localStorage.getItem('token')}`
      }
      const user = localStorage.getItem('userid')

      const course = id

      let bodyFormData = new FormData()
      bodyFormData.set('course', course)
      bodyFormData.set('user', user)

      axios
        .post(url, bodyFormData, { headers })
        .then(result => {
          // this.setState({ profile: result.data });
          // console.log(result.data)
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      // alert("Are you sure you want to Unsubscribe?");
      const url =
        `${configData.SERVER_URL}api/email-notification-subscription/` + subs
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `JWT ${localStorage.getItem('token')}`
      }

      axios
        .delete(url, { headers })
        .then(result => {
          // this.setState({ profile: result.data });
          // console.log(result.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
    this.handleClose()

    window.setTimeout(function () {
      window.location.reload()
    }, 400)
  }
  componentDidMount () {
    if (!localStorage.getItem('isLoggedIn')) {
      {
        this.props.history.push('/')
      }
    }
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `JWT ${localStorage.getItem('token')}`
    }
    const url =
      `${configData.SERVER_URL}api/courses?branch=` +
      this.props.match.params.id +
      '&institute=' +
      localStorage.getItem('institute')
    axios
      .get(url, { headers })
      .then(result => {
        this.setState({ courses: result.data })

        // console.log(result.data)
      })
      .catch(error => {
        // console.log(error)
      })
  }

  render () {
    //console.log(this.props);
    return (
      <div className='container'>
        <br></br>
        <div style={{float:"left"}}>
          <span style={{fontSize:"20px",color:"gray"}}> > {localStorage.getItem('branch')}</span>
        </div>
        <br></br>
        <br></br>
        {localStorage.getItem('role') == 'admin' ? (
          <button
            className='btn btn-primary '
            onClick={this.handleCreatecourse}
          >
            Create Course
          </button>
        ) : (
          <span></span>
        )}

        <div className='row'>
          {this.state.createRequested ? (
            <div>
              <br></br>
              <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                  <div className='form-label-group'>
                    <input
                      className={'form-control '}
                      id='course_name'
                      placeholder='course_name'
                      type='text'
                      name='course_name'
                      onChange={this.handleCourseName}
                      autoFocus
                      required
                    />
                    <label htmlFor='course_name'>Course Name</label>
                  </div>
                </div>

                <div className='form-group'>
                  <button
                    className={
                      this.state.disabled
                        ? 'btn btn-secondary  btn-block disabled'
                        : 'btn btn-primary btn-block active'
                    }
                    type='submit'
                    style={{ width: '10%', marginTop: '20px' }}
                  >
                    Create &nbsp;&nbsp;&nbsp;
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div></div>
          )}

          <br></br>
          {this.state.courses.length == 0 ? (
            <div>
              <h1>No Courses added</h1>
            </div>
          ) : (
            this.state.courses.map(val => {
              return (
                <div className=' container courses btn-group col-lg-4 col-md-6 col-sm-12'>
                  <button
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      color: 'black'
                    }}
                    className='btn btn-outline-success btn-block crs'
                    onClick={e => this.courseHandler(e, val.id, val.name)}
                  >
                    <h3>{val.name}</h3>
                  </button>

                  <button
                    style={{ width: '30px', height: '30px' }}
                    className={
                      val.email_notification_subscription
                        ? 'btn btn-success  '
                        : 'btn btn-secondary'
                    }
                    variant='primary'
                    onClick={e => this.handleShow(e, val.id)}
                  >
                    <h6 style={{ alignItems: 'center', padding: 'auto' }}>
                      {val.email_notification_subscription ? (
                        <i class='fas fa-bell-slash'></i>
                      ) : (
                        <i class='fas fa-bell'></i>
                      )}
                    </h6>
                  </button>

                  {this.state.showId == val.id ? (
                    <Modal
                      show={this.state.modalShow}
                      onHide={this.handleClose}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>
                          {val.email_notification_subscription ? (
                            <h4>Unsubscribe</h4>
                          ) : (
                            <h4>Subscribe</h4>
                          )}
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {val.email_notification_subscription ? (
                          <p>
                            Are you sure you want to unsubscribe? You wont be
                            receiving email notification when a new post get
                            added in {val.name}?
                          </p>
                        ) : (
                          <p>
                            Are you sure you want to Subscribe? You will be
                            receiving email notification when a new post get
                            added in {val.name}?
                          </p>
                        )}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant='secondary' onClick={this.handleClose}>
                          Close
                        </Button>
                        <Button
                          variant='primary'
                          onClick={e =>
                            this.subscribeHandler(
                              e,
                              val.id,
                              val.email_notification_subscription
                            )
                          }
                        >
                          Yes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  ) : (
                    <span></span>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    )
  }
}

export default Courses
