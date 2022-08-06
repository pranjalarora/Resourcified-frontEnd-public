import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import moment from 'moment'
import configData from './config.json'

export class AllBatches extends Component {
  state = {
    branch: '',

    branches: []
  }

  instituteHandler = (e, id, name) => {
    // console.log(id);
    // console.log(name);
    localStorage.setItem('branchSelected', id)
    localStorage.setItem('branch',name)
    const url = '/courses/' + localStorage.getItem('branchSelected')
    this.props.history.push(url)
  }
  componentDidMount () {
    if (!localStorage.getItem('isLoggedIn')) {
      {
        this.props.history.push('/')
      }
    }
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
    const url =
      `${configData.SERVER_URL}api/branches?institute=` +
      localStorage.getItem('institute')
    axios
      .get(url, { headers })
      .then(result => {
        this.setState({ branches: result.data })

        // console.log(result.data);
      })
      .catch(error => {
        console.log(error)
      })
  }

  render () {
    //console.log(this.props);
    return (
      <div className='container'>

        <div className=' row'>
          {this.state.branches.map(val => {
            return (
              <div className='container col-lg-4 col-md-6 col-sm-12 branches'>
                <button
                  className='btn-outline-success '
                  style={{ color: 'black' }}
                  onClick={e => this.instituteHandler(e, val.id, val.name)}
                >
                  <div className='batches'>
                    <h3 style={{ paddingTop: '50px' }}>{val.name}</h3>
                  </div>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default AllBatches
