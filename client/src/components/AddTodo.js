import React, { Component } from 'react'
import PropTypes from 'prop-types'


export class AddTodo extends Component {
    state =  {
        title: '',
        tags: []
    }
    
    componentDidMount() {
    }
    
    onChange = (e) => {
        this.setState({title: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.addTodo(this.state.title);
        this.setState({title: ''})
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} style={{display:'flex'}}>
                <input type="text" name="title" placeholder="Add Todo" style={{flex: '7', padding: '10px'}} 
                value={this.state.title} onChange={this.onChange}/>
                <input  type="submit" value="submit" className="btn" style={{flex: '1'}} />

            </form>
        )
    }
}

AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired,
    
  }
export default AddTodo
