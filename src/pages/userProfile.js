import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import moment from 'moment'
import Avatar from 'react-avatar'
import configData from './config.json'

export class userProfile extends Component {
  state = {
    profile: [],
    isEditing: false,
    full_name: '',
    phone: '',
    gender: '',
    degree: '',
    branch: '',
    institute: '',
    subscription: '/mysubscription',
    myprofile: '/userProfile',
    myposts: '/myposts',
    likedposts: '/likedposts',
    disabled: false
  }

  handleDegree = event => {
    this.setState({ degree: event.target.value })
  }
  handleFullname = event => {
    this.setState({ full_name: event.target.value })
  }
  handlePhone = event => {
    this.setState({ phone: event.target.value })
  }
  handleGender = event => {
    this.setState({ gender: event.target.value })
  }
  editHandler = event => {
    this.setState({ isEditing: true })
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

    const url = `${configData.SERVER_URL}api/current-user-profile`
    axios
      .get(url, { headers })
      .then(result => {
        this.setState({ profile: result.data })
        this.setState({ full_name: result.data.full_name })
        this.setState({ phone: result.data.phone })
        this.setState({ degree: result.data.degree })
        this.setState({ gender: result.data.gender })
        this.setState({ branch: result.data.branch.name })
        this.setState({ institute: result.data.institute.name })
        localStorage.setItem('full_name', this.state.full_name);
       
        // console.log(result.data)
        // console.log(result.data.branch.name)
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({ disabled: true })
    // console.log(this.state.phone)
    // console.log(this.state.full_name)
    // console.log(this.state.gender)
    // console.log(this.state.degree)

    const degree = this.state.degree
    const gender = this.state.gender
    const full_name = this.state.full_name
    const phone = this.state.phone

    let bodyFormData = new FormData()
    bodyFormData.set('gender', gender)
    bodyFormData.set('degree', degree)
    bodyFormData.set('full_name', full_name)
    bodyFormData.set('phone', phone)

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `JWT ${localStorage.getItem('token')}`
    }
    const url = `${configData.SERVER_URL}api/current-user-profile`
    axios
      .put(url, bodyFormData, { headers })
      .then(result => {
        // this.setState({ profile: result.data });
        // console.log(result.data)
      })
      .catch(error => {
        console.log(error)
      })
    // this.setState({isEditing:false});
    window.setTimeout(function () {
      window.location.reload()
    }, 700)
  }
  render () {
    return (
      <div>
        <div>
          <a type='button' href={this.state.myprofile}>
            <button
              style={{
                marginRight: '4px',
                color: 'black'
              }}
              className='btn hover activeness'
            >
              My Profile
            </button>
          </a>
          <a type='button' href={this.state.myposts}>
            <button style={{ marginRight: '4px' }} className='btn hover'>
              My Posts
            </button>
          </a>
          <a type='button' href={this.state.likedposts}>
            <button style={{ marginRight: '4px' }} className='btn  hover'>
              Liked Posts
            </button>{' '}
          </a>
          <a type='button' href={this.state.subscription}>
            <button style={{ marginRight: '4px' }} className='btn  hover'>
              My Subscription
            </button>{' '}
          </a>
        </div>
        <div className='container'>
          <br></br>

          {!this.state.isEditing ? (
            <div className=' container '>
              <button className='btn hover ' onClick={this.editHandler}>
                <i class='fas fa-edit fa-3x'></i>
              </button>
              <br></br>
              <br></br>
              <div className='profile_placement'>
                <div>
                  <div className='avatar'>
                    <Avatar
                      round
                      name={this.state.profile.full_name}
                      width={100}
                      height={100}
                      className='avatar1'
                    />
                  </div>
                </div>
                <div className='profile'>
                  <ul>
                    <h5>Name:- {this.state.profile.full_name}</h5>
                    <h5>Email:- {this.state.profile.email}</h5>
                    <h5>Gender:- {this.state.profile.gender} </h5>
                    <h5>Institute:- {this.state.institute}</h5>
                    <h5>Branch:- {this.state.branch}</h5>
                    <h5>Degree:- {this.state.profile.degree} </h5>
                    <h5>Contact Number:- {this.state.profile.phone} </h5>
                  </ul>
                </div>
              </div>
              <br></br>
            </div>
          ) : (
            <div>
              <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                  <div className='form-group'>
                    <label htmlFor='full_name' style={{ color: 'blue' }}>
                      Full Name
                    </label>
                    <input
                      className={'form-control '}
                      id='full_name'
                      placeholder='Full Name'
                      type='text'
                      name='full_name'
                      onChange={this.handleFullname}
                      autoFocus
                      required
                      value={this.state.full_name}
                    />
                  </div>

                  <div className='form-group'>
                    <label for='phone' style={{ color: 'blue' }}>
                      Contact Number
                    </label>
                    <input
                      className={'form-control '}
                      id='phone'
                      placeholder='Phone'
                      type='text'
                      name='phone'
                      onChange={this.handlePhone}
                      autoFocus
                      required
                      value={this.state.phone}
                    />
                  </div>
                  <div class='form-group'>
                    <label for='gender' style={{ color: 'blue' }}>
                      Gender
                    </label>
                    <select
                      reequired
                      class='custom-select'
                      id='gender'
                      name='gender'
                      onChange={this.handleGender}
                      value={this.state.gender}
                    >
                      <option selected>Choose...</option>
                      <option value={'male'}>Male</option>
                      <option value={'female'}>Female</option>
                      <option value={'other'}>Other</option>
                    </select>
                  </div>

                  <div class='form-group'>
                    <label for='degree' style={{ color: 'blue' }}>
                      Degree
                    </label>
                    <select
                      reequired
                      class='custom-select'
                      id='degree'
                      name='degree'
                      onChange={this.handleDegree}
                      value={this.state.degree}
                    >
                      <option selected value={0}>
                        Choose...
                      </option>
                      <option value={'btech'}>BTech</option>
                      <option value={'mtech'}>MTech</option>
                      <option value={'phd'}>Phd</option>
                      <option value={'msc'}>Msc</option>
                      <option value={'mba'}>MBA</option>
                    </select>
                  </div>
                </div>

                <div className='form-group' style={{ color: 'blue' }}>
                  <button
                    className={
                      this.state.disabled
                        ? 'btn btn-secondary  btn-block disabled'
                        : 'btn btn-primary btn-block active'
                    }
                    type='submit'
                  >
                    Change Details &nbsp;&nbsp;&nbsp;
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default userProfile
