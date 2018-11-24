import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import {getBookQuery} from '../queries/queries'

class BookDetails extends Component {

    bookDetails=(book)=>{
        return (
            <div>
                <h2>{book.name}</h2>
                <p> {book.genre} </p> 
            </div>
        )
    }

    authorDetails=(author)=>{
        if(author){
            return (
                <div>            
                <p>{author.name}</p>
                <p>All books by this author</p>
                <ul className="other-books">
                    {author.books.map(book=>(
                        <li key={book.id}>{book.name}</li> 
                    ))}
                </ul>
            </div>
            )
        }
        else{
            return null
        }
        
    }
    displayBookDetails=()=>{
        const {book}=this.props.getBookQuery
        if(book){
            return (
                <div>
                    {this.bookDetails(book)}
                    {this.authorDetails(book.author)}
                </div>
            )
        } else{
            return null
        }            
    }
    render(){
        return (
            this.displayBookDetails()    
        )
    }
}

export default graphql(getBookQuery, {
    name: "getBookQuery",
    options: (props)=>{
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails)