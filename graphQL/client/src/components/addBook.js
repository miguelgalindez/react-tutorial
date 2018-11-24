import React, {Component} from 'react'
import {graphql, compose} from 'react-apollo'
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries'

class addBook extends Component{
    state={
        name: "",
        genre: '',
        authorId: ''
    }

    displayAuthors=()=>{
        console.log(this.props)
        const data=this.props.getAuthorsQuery
        if(data.loading){
            return (<option disabled>Loading authors...</option>)
        } else{
            return data.authors.map(author=>(
                <option key={author.id} value={author.id} >{author.name}</option>
            ))
        }
    }

    handleInputChange=(event)=>{
        const state=this.state
        state[event.target.name]=event.target.value
        this.setState({ state })
    }

    submitForm=(event)=>{
        event.preventDefault()
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [
                {query: getBooksQuery}
            ]
        })
    }

    render(){
        return (
            <form id="add-book" onSubmit={this.submitForm}>
                <div className="field">
                    <label>Book name:</label>
                    <input name="name" type="text" value={this.state.name} onChange={this.handleInputChange}></input>
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input name="genre" type="text" value={this.state.genre} onChange={this.handleInputChange}></input>
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select name="authorId" value={this.state.authorId} onChange={this.handleInputChange}>
                        <option>Select author</option>
                        {this.displayAuthors()}
                    </select>
                </div>

                <button>+</button>
            </form>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
)(addBook)