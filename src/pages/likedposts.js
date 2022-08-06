import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import moment from 'moment'
import Avatar from 'react-avatar'
import { LinkPreview } from '@dhaiwat10/react-link-preview'
import configData from './config.json'

export class Likedposts extends Component {
  state = {
    posts: [],

    subscription: '/mysubscription',
    myprofile: '/userProfile',
    myposts: '/myposts',
    likedposts: '/likedposts'
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
    const url = `${configData.SERVER_URL}api/posts?course=&created_by=`
    axios
      .get(url, { headers })
      .then(result => {
        this.setState({ posts: result.data })

        // console.log(result.data);
      })
      .catch(error => {
        console.log(error)
      })
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

    // console.log(user); console.log(post);
    axios
      .post(url, bodyFormData, { headers })
      .then(result => {
        // this.setState({ posts: result.data });
        // console.log(result.data);
      })
      .catch(error => {
        console.log(error)
      })

    window.setTimeout(function () {
      window.location.reload()
    }, 200)
  }

  render () {
    return (
      <div>
        <div className='container'>
          <div>
            <a type='button' href={this.state.myprofile}>
              <button style={{ marginRight: '4px' }} className='btn hover'>
                My Profile
              </button>
            </a>
            <a type='button' href={this.state.myposts}>
              <button style={{ marginRight: '4px' }} className='btn hover '>
                My Posts
              </button>
            </a>
            <a type='button' href={this.state.likedposts}>
              <button
                style={{ marginRight: '4px', color: 'black' }}
                className='btn  hover activeness '
              >
                Liked Posts
              </button>{' '}
            </a>
            <a type='button' href={this.state.subscription}>
              <button style={{ marginRight: '4px' }} className='btn hover '>
                My Subscription
              </button>{' '}
            </a>
          </div>
        </div>
        <br></br>

        <div>
          {this.state.posts.length == 0 ? (
            <div>
              <h2>No Posts Liked Yet</h2>
            </div>
          ) : (
            this.state.posts.map(val => {
              return (
                <div className=' container'>
                  {val.is_already_upvoted ? (
                    <div className='likedposts'>
                      <Avatar
                        style={{ float: 'left', marginRight: '10px' }}
                        round
                        name={val.created_by.full_name}
                        size='40px'
                      />

                      <span style={{ fontSize: '25px', color: 'black' }}>
                        {val.created_by.full_name} - {val.created_by.email}
                      </span>
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

                      <h6>{val.description}</h6>
                      <a target='_blank' href={val.link}>
                        {' '}
                        <LinkPreview
                          url={val.link}
                          width='100%'
                          height='300px'
                        />
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
                          {' '}
                          <i class='fas fa-arrow-up'></i>
                        </button>
                        <span></span> Upvote Count- {val.upvote_count}
                      </span>
                    </div>
                  ) : (
                    <div></div>
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

export default Likedposts
