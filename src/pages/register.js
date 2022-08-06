import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import configData from './config.json'

export default class Register extends Component {
  state = {
    username: '',
    name: '',
    email: '',
    password: '',
    redirect: false,
    authError: false,
    isLoading: false,
    instituteName: '',
    instituteId: 0,
    institutes: [],
    branches: [],
    branchId: 0
  }

  componentDidMount () {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
    const url = `${configData.SERVER_URL}api/institutes`
    axios
      .get(url, { headers })
      .then(result => {
        // if (result.data.status !== "fail") {
        //   this.setState({ redirect: true, authError: false });
        // } else {
        //   this.setState({ redirect: false, authError: true });
        // }
        this.setState({ institutes: result.data })

        // console.log(result.data);
      })
      .catch(error => {
        console.log(error)
        this.setState({ authError: true, isLoading: false })
      })
  }
  //if(localStorage.getItem("isLoggedIn")!=NULL & localStorage.getItem("isLoggedIn")==true)

  handleEmailChange = event => {
    // console.log(this.state.role);
    this.setState({ email: event.target.value })
    this.setState({ username: event.target.value })
  }
  handlePwdChange = event => {
    this.setState({ password: event.target.value })
  }
  handleNameChange = event => {
    this.setState({ name: event.target.value })
  }

  handleInstitueChange = event => {
    // console.log();
    // console.log(event.target.value);
    // this.setState({ instituteName: event.target.value });
    this.setState({ instituteId: event.target.value })
    this.handleBranchChange(event)
  }

  handleBranchChange = event => {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
    const url =
      `${configData.SERVER_URL}api/branches?institute=` + event.target.value
    axios
      .get(url, { headers })
      .then(result => {
        this.setState({ branches: result.data })

        // console.log(result.data);
      })
      .catch(error => {
        console.log(error)
        this.setState({ authError: true, isLoading: false })
      })
    // this.setState({ branch: event.target.value });
    // console.log(this.state.branch);
  }

  handleBranchChanged = event => {
    this.setState({ branchId: event.target.value })
  }
  handleSubmit = event => {
    event.preventDefault()
    this.setState({ isLoading: true })
    const url = `${configData.SERVER_URL}api/signup`
    const email = this.state.email
    const role = 'student'
    const password = this.state.password
    const full_name = this.state.name
    const username = this.state.username
    const branch = this.state.branchId
    const institute = this.state.instituteId
    let bodyFormData = new FormData()
    bodyFormData.set('role', role)
    bodyFormData.set('email', email)

    bodyFormData.set('full_name', full_name)
    bodyFormData.set('username', username)
    bodyFormData.set('password', password)
    bodyFormData.set('branch', branch)
    bodyFormData.set('institute', institute)

    // console.log(institute)
    // console.log(branch)
    axios
      .post(url, bodyFormData)
      .then(result => {
        this.setState({ isLoading: false })
        if (result.data.status !== 'fail') {
          this.setState({ redirect: true, authError: false })
        } else {
          this.setState({ redirect: false, authError: true })
        }

        // console.log(result)
      })
      .catch(error => {
        console.log(error)
        this.setState({ authError: true, isLoading: false })
      })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/login' />
    }
  }

  render () {
    const isLoading = this.state.isLoading
    return (
      <div className='container'>
        <div className='card card-login mx-auto mt-5'>
          <div className='card-header colour-green'>Register</div>
          <div className='card-body'>
            <form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <div className='form-label-group'>
                  <input
                    type='text'
                    id='inputName'
                    className='form-control'
                    placeholder='name'
                    name='name'
                    onChange={this.handleNameChange}
                    required
                  />
                  <label htmlFor='inputName'>Full Name</label>
                </div>
              </div>

              <div className='form-group'>
                <div className='form-label-group'>
                  <input
                    id='inputEmail'
                    className={
                      'form-control ' +
                      (this.state.authError ? 'is-invalid' : '')
                    }
                    placeholder='Email address'
                    type='text'
                    name='email'
                    onChange={this.handleEmailChange}
                    autoFocus
                    required
                  />
                  <label htmlFor='inputEmail'>Email address</label>
                  <div className='invalid-feedback'>
                    Please provide a valid Email. or Email Exist
                  </div>
                </div>
              </div>
              <div className='form-group'>
                <div className='form-label-group'>
                  <input
                    type='password'
                    className='form-control'
                    id='inputPassword'
                    placeholder='******'
                    name='password'
                    onChange={this.handlePwdChange}
                    required
                  />
                  <label htmlFor='inputPassword'>Password</label>
                </div>
              </div>

              <div class='form-group'>
                <label for='institute'>Institute</label>
                <select
                  reequired
                  class='custom-select'
                  id='institute'
                  name='institute'
                  onChange={this.handleInstitueChange}
                  value={this.state.instituteId}
                >
                  <option selected value={0}>
                    Choose...
                  </option>
                  {this.state.institutes.map(val => (
                    <option value={val.id}>{val.name}</option>
                  ))}

                  {/* {console.log(this.state.instituteId)} */}
                </select>
              </div>

              <div class='form-group'>
                <label for='institute'>Branches</label>
                <select
                  reequired
                  class='custom-select'
                  id='branch'
                  name='branch'
                  onChange={this.handleBranchChanged}
                  value={this.state.branchId}
                >
                  <option selected value={0}>
                    Choose...
                  </option>
                  {this.state.branches.map(val => (
                    <option value={val.id}>{val.name}</option>
                  ))}
                  {/* {console.log(this.state.branch)} */}
                </select>
              </div>

              <div className='form-group'>
                <button
                  className='btn btn-primary btn-block'
                  type='submit'
                  disabled={this.state.isLoading ? true : false}
                >
                  Register &nbsp;&nbsp;&nbsp;
                  {isLoading ? (
                    <span
                      className='spinner-border spinner-border-sm'
                      role='status'
                      aria-hidden='true'
                    ></span>
                  ) : (
                    <span></span>
                  )}
                </button>
              </div>
            </form>
            <div className='text-center'>
              <Link className='d-block small mt-3' to={'/login'}>
                Login Your Account
              </Link>
            </div>
          </div>
        </div>
        {this.renderRedirect()}
      </div>
    )
  }
}
