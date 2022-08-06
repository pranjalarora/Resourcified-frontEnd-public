import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import moment from 'moment'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import configData from './config.json'

export class Subscription extends Component {
  state = {
    courses: [],
    subscription: '/mysubscription',
    myprofile: '/userProfile',
    myposts: '/myposts',
    likedposts: '/likedposts',
    modalShow: false,
    showId: 0
  }
  handleClose = () => {
    this.setState({ modalShow: false })
  }

  handleShow = (e, id) => {
    this.setState({ modalShow: true })
    this.setState({ showId: id })
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
    const url = `${configData.SERVER_URL}api/courses?branch=&institute=`
    axios
      .get(url, { headers })
      .then(result => {
        this.setState({ courses: result.data })

        // console.log(result.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  courseHandler = (e, id, name) => {
    // console.log(id)
    // console.log(name)
    localStorage.setItem('course', id)
    const url = '/posts/' + localStorage.getItem('course')
    this.props.history.push(url)
  }

  subscribeHandler = (e, id, subs) => {
    if (!subs) {
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
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div>
            <a type='button' href={this.state.myprofile}>
              <button style={{ marginRight: '4px' }} className='btn hover'>
                My Profile
              </button>
            </a>
            <a type='button' href={this.state.myposts}>
              <button style={{ marginRight: '4px' }} className='btn hover'>
                My Posts
              </button>
            </a>
            <a type='button' href={this.state.likedposts}>
              <button style={{ marginRight: '4px' }} className='btn hover'>
                Liked Posts
              </button>{' '}
            </a>
            <a type='button' href={this.state.subscription}>
              <button
                style={{ marginRight: '4px', color: 'black' }}
                className='btn  hover activeness'
              >
                My Subscription
              </button>{' '}
            </a>
          </div>

          <div>
            <br></br>
            <br></br>
            {this.state.courses.length == 0 ? (
              <div>
                <h1>No Courses added</h1>
              </div>
            ) : (
              this.state.courses.map(val => {
                return val.email_notification_subscription ? (
                  <div className=' container courses btn-group col-lg-4 col-md-6 col-sm-12'>
                    <div className='btn-group '>
                      <button
                        style={{
                          width: '100%',
                          textAlign: 'center',
                          color: 'black'
                        }}
                        className='btn btn-outline-success btn-block crs'
                        onClick={e => this.courseHandler(e, val.id, val.name)}
                      >
                        <h3>{val.name} By </h3>
                        <h3>{val.branch.name}</h3>
                      </button>
                      <button
                        style={{
                          width: '30px',
                          height: '30px',
                          textAlign: 'center'
                        }}
                        className={
                          val.email_notification_subscription
                            ? 'btn btn-success btn-block '
                            : 'btn btn-secondary btn-block'
                        }
                        variant='primary'
                        onClick={e => this.handleShow(e, val.id)}
                      >
                        <h6 style={{ alignItems: 'center', size: '100%' }}>
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
                                Are you sure you want to unsubscribe? You wont
                                be receiving email notification when a new post
                                get added in {val.name}?
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
                            <Button
                              variant='secondary'
                              onClick={this.handleClose}
                            >
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
                  </div>
                ) : (
                  <span></span>
                )
              })
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Subscription
