import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import moment from 'moment'
import Avatar from 'react-avatar'
import configData from './config.json'

import { LinkPreview } from '@dhaiwat10/react-link-preview'

export class Posts extends Component {
  state = {
    upvote: 0,
    upvoted: false,
    posts: [],
    createRequested: false,
    createLink: '',
    createDescription: '',
    disabled: false
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({ disabled: true })
    const url = `${configData.SERVER_URL}api/posts`
    // console.log(url)

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `JWT ${localStorage.getItem('token')}`
    }
    const link = this.state.createLink
    const description = this.state.createDescription
    const course = this.props.match.params.id
    let bodyFormData = new FormData()
    bodyFormData.set('link', link)
    bodyFormData.set('description', description)
    bodyFormData.set('course', course)

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
    }, 1000)

    // window.location.reload()
  }

  upvoteHandler = (e, id, val, upvoted) => {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `JWT ${localStorage.getItem('token')}`
    }
    const url = `${configData.SERVER_URL}api/upvote`
    const user = localStorage.getItem('userid')
    const post = id
    let bodyFormData = new FormData()
    bodyFormData.set('user', user)
    bodyFormData.set('post', post)

    // console.log(user)
    // console.log(post)
    axios
      .post(url, bodyFormData, { headers })
      .then(result => {
        // this.setState({ posts: result.data });
        // console.log(result.data)
      })
      .catch(error => {
        console.log(error)
      })

    window.setTimeout(function () {
      window.location.reload()
    }, 400)
  }

  handleCreatepost = event => {
    // console.log('Bye')
    this.setState({ createRequested: true })
  }

  handleCreateLinkChange = event => {
    this.setState({ createLink: event.target.value })
  }
  handleCreateDescriptionChange = event => {
    this.setState({ createDescription: event.target.value })
  }

  componentDidMount () {
    // console.log(configData.SERVER_URL)

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
      `${configData.SERVER_URL}api/posts?course=` + this.props.match.params.id
    axios
      .get(url, { headers })
      .then(result => {
        this.setState({ posts: result.data })

        // console.log(result.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  render () {
    //console.log(this.props);
    return (
      <div>
        <div className='container'>
        <br></br>
        <div style={{float:"left"}}>
          <span style={{fontSize:"20px",color:"gray"}}> > {localStorage.getItem('branch')}  > {localStorage.getItem('course_name')}</span>
        </div>
        <br></br>
        <br></br>
          <button className='btn btn-primary ' onClick={this.handleCreatepost}>
            Create Post
          </button>

          {this.state.createRequested ? (
            <div>
              <br></br>
              <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
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
                    />
                    <label htmlFor='description'>Description</label>
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
                    Post &nbsp;&nbsp;&nbsp;
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div></div>
          )}

          <br></br>
          <br></br>
          {this.state.posts.length == 0 ? (
            <div>
              <h2>No Posts Yet</h2>
            </div>
          ) : (
            this.state.posts.map(val => {
              return (
                <div className=' container '>
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
                      <LinkPreview url={val.link} width='100%' height='300px' />
                    </a>

                    <br></br>
                    <span>
                      <button
                        className={
                          val.is_already_upvoted
                            ? 'btn btn-success'
                            : ' btn btn-secondary'
                        }
                        onClick={e =>
                          this.upvoteHandler(
                            e,
                            val.id,
                            val.upvote_count,
                            val.is_already_upvoted
                          )
                        }
                      >
                        <i class='fas fa-arrow-up'></i>
                      </button>
                      <span></span>{' '}
                      <span style={{ size: '15px' }}>
                        Upvote Count- {val.upvote_count}
                      </span>
                    </span>
                  </div>
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

export default Posts
