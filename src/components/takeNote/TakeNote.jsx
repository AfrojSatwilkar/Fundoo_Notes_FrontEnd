import React, { Component } from 'react'


import '../takeNote/TakeNote.css'

export class TakeNote extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: true,
      title: '',
      description: '',
      color: '#ffffff',
      archive: false
    }
  }

  handleOpen = () => {
    this.setState({
      open: false
    })
  }

  handleClose = () => {


  }

  getNotesChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  changeColor = (val) => {
    this.setState({
      color: val
    })
  }

  archivebtn = (val) => {
    this.setState({
      archive: val
    })
  }

  render() {
    return (
      <div className='take-container'>
        {
          this.state.open ?
            <div className="title-container">
              <input type="text" name="note" placeholder='Take a Note' onClick={this.handleOpen} />
              <div className="title-icons">
                
              </div>
            </div>
            :
            <div className="discp-container" style={{ backgroundColor: this.state.color }}>
              <input type="text" name="title" placeholder='Take a Note' onChange={(e) => this.getNotesChange(e)} />
              <input type="text" name="description" placeholder='Discription' onChange={(e) => this.getNotesChange(e)} />

              <div className="discp-icons">
                <div className="icon-list">
                  {/* <Icons changeColor={this.changeColor} archivebtn={this.archivebtn} mode="create" /> */}
                </div>
                <button onClick={this.handleClose}>close</button>
              </div>
            </div>

        }
      </div>

    )
  }
}

export default TakeNote