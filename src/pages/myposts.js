import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import moment from 'moment'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Avatar from 'react-avatar'
import { LinkPreview } from '@dhaiwat10/react-link-preview'
import configData from './config.json'

export class Myposts extends Component {
  state = {
    posts: [],
    subscription: '/mysubscription',
    myprofile: '/userProfile',
    myposts: '/myposts',
    likedposts: '/likedposts',
    editid: 0,
    editable: false,
    link: '',
    description: '',
    showId: 0,
    modalShow: false,
    disabled: false
  }

  handleCreateDescriptionChange = event => {
    this.setState({ description: event.target.value })
  }

  handleCreateLinkChange = event => {
    this.setState({ link: event.target.value })
  }

  handleSubmit = (event, postid) => {
    event.preventDefault()
    this.setState({ disabled: true })
    const url = `${configData.SERVER_URL}api/posts/` + postid
    // console.log(url)

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `JWT ${localStorage.getItem('token')}`
    }

    const link = this.state.link
    const description = this.state.description

    let bodyFormData = new FormData()
    bodyFormData.set('link', link)
    bodyFormData.set('description', description)

    axios
      .put(url, bodyFormData, { headers })
      .then(result => {
        // console.log(result.data)
      })
      .catch(error => {
        console.log(error)
      })

    window.setTimeout(function () {
      window.location.reload()
    }, 500)
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
      `${configData.SERVER_URL}api/posts?course=&created_by=` +
      localStorage.getItem('userid')
    axios
      .get(url, { headers })
      .then(result => {
        this.setState({ posts: result.data })
        this.setState({ link: result.data.link })
        this.setState({ description: result.data.description })

        // console.log(result.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  editingHandler = e => {
    this.setState({ editable: false })
  }
  deleteHandler = (e, id) => {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `JWT ${localStorage.getItem('token')}`
    }
    const url = `${configData.SERVER_URL}api/posts/` + id
    axios
      .delete(url, { headers })
      .then(result => {
        // this.setState({ posts: result.data });
        // console.log(result.data)
      })
      .catch(error => {
        console.log(error)
      })
    window.setTimeout(function () {
      window.location.reload()
    }, 200)
  }

  editHandler = (e, id, link, description) => {
    this.setState({ link: link })
    this.setState({ description: description })
    this.setState({ editid: id })
    this.setState({ editable: true })
  }

  handleClose = () => {
    this.setState({ modalShow: false })
  }

  handleShow = (e, id) => {
    this.setState({ modalShow: true })
    this.setState({ showId: id })
  }

  render () {
    return (
      <div>
        <div className='container'>
          <div>
            <a type='button' href={this.state.myprofile}>
              <button style={{ marginRight: '4px' }} className='btn hover '>
                My Profile
              </button>
            </a>
            <a type='button' href={this.state.myposts}>
              <button
                style={{
                  marginRight: '4px',
                  color: 'black'
                }}
                className='btn hover activeness'
              >
                My Posts
              </button>
            </a>
            <a type='button' href={this.state.likedposts}>
              <button style={{ marginRight: '4px' }} className='btn hover  '>
                Liked Posts
              </button>{' '}
            </a>
            <a type='button' href={this.state.subscription}>
              <button style={{ marginRight: '4px' }} className='btn hover'>
                My Subscription
              </button>{' '}
            </a>
          </div>
          <br></br>

          {this.state.posts.length == 0 ? (
            <div>
              <h2>No Posts Yet</h2>
            </div>
          ) : (
            this.state.posts.map(val => {
              return (
                <div className=' container '>
                  {this.state.editable && this.state.editid == val.id ? (
                    <div>
                      <form onSubmit={e => this.handleSubmit(e, val.id)}>
                        <div className='form-group editpostsdetails'>
                          <div className='form-label-group'>
                            <input
                              className={'form-control '}
                              id='link'
                              placeholder='Link'
                              type='text'
                              name='link'
                              onChange={this.handleCreateLinkChange}
                              autoFocus
                              required
                              value={this.state.link}
                            />
                            <label htmlFor='link'>Link</label>
                          </div>

                          <div className='form-label-group'>
                            <input
                              className={'form-control '}
                              id='description'
                              placeholder='Description'
                              type='text'
                              name='description'
                              onChange={this.handleCreateDescriptionChange}
                              autoFocus
                              required
                              value={this.state.description}
                            />
                            <label htmlFor='description'>Description</label>
                          </div>
                        </div>

                        <div className='form-group editposts'>
                          <button
                            className='btn btn-danger '
                            onClick={this.editingHandler}
                          >
                            Cancel
                          </button>
                          <button
                            className={
                              this.state.disabled
                                ? 'btn btn-disabled '
                                : 'btn btn-primary '
                            }
                            type='submit'
                          >
                            Post &nbsp;&nbsp;&nbsp;
                          </button>
                        </div>
                      </form>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                    </div>
                  ) : (
                    <div className='posts'>
                      <Avatar
                        style={{ float: 'left', marginRight: '10px' }}
                        round
                        name={val.created_by.full_name}
                        size='40px'
                      />
                      <span style={{ fontSize: '25px', color: 'black' }}>
                        {val.created_by.full_name} - {val.created_by.email}
                      </span>
                      {val.modified_by ? (
                        <h6
                          style={{
                            textAlign: 'left',
                            color: 'rgba(72, 70, 75, 0.979)'
                          }}
                        >
                          {' '}
                          Modified at :{' '}
                          {moment(val.modified_at).format(
                            'dddd, MMMM Do YYYY, h:mm:ss a'
                          )}{' '}
                        </h6>
                      ) : (
                        <h6
                          style={{
                            textAlign: 'left',
                            color: 'rgba(72, 70, 75, 0.979)'
                          }}
                        >
                          {' '}
                          {moment(val.created_at).format(
                            'dddd, MMMM Do YYYY, h:mm:ss a'
                          )}{' '}
                        </h6>
                      )}
                      <h6>{val.description}</h6>

                      <a target='_blank' href={val.link}>
                        <LinkPreview
                          url={val.link}
                          width='100%'
                          height='300px'
                        />
                      </a>
                      <br></br>
                      <span>Upvote Count- {val.upvote_count}</span>
                      <br></br>
                      <button
                        className='btn btn-danger'
                        onClick={e => this.handleShow(e, val.id)}
                      >
                        <i class='fas fa-trash'></i>
                      </button>
                      {this.state.showId == val.id ? (
                        <Modal
                          show={this.state.modalShow}
                          onHide={this.handleClose}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>
                              Are you sure you want to delete this post?
                            </Modal.Title>
                          </Modal.Header>

                          <Modal.Footer>
                            <Button
                              variant='secondary'
                              onClick={this.handleClose}
                            >
                              Close
                            </Button>
                            <Button
                              variant='danger'
                              onClick={e => this.deleteHandler(e, val.id)}
                            >
                              Yes
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      ) : (
                        <span></span>
                      )}

                      {/* <button
                        className='btn btn-danger'
                        onClick={e => this.deleteHandler(e, val.id)}
                      >
                        Delete
                      </button> */}

                      <button
                        className='btn btn-primary'
                        onClick={e =>
                          this.editHandler(e, val.id, val.link, val.description)
                        }
                      >
                        {' '}
                        <i class='fas fa-user-edit'></i>
                      </button>
                    </div>
                  )}
                  <br></br>
                </div>
              )
            })
          )}
        </div>
      </div>
    )
  }
}

export default Myposts
