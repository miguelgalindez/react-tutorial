const React=require('react')
const ReactDOM=require('react-dom')
const TodoItem=require('./todoItem')
const AddItem=require('./addItem')
const MultipleFormsFields=require('./multiple-form-fields/index')
require('./css/index.css')
class TodoComponent extends React.Component {
    state = {
        todos: []
    }

    componentDidMount(){
        this.setState({
            todos: ['Wash up', 'eat some cheese', 'take a nap']
        })
    }

    onDelete=(item)=>{
        this.setState({
            todos: this.state.todos.filter(i => i!==item)
        })
    }

    render(){
        let todos=this.state.todos.map((item, index)=>{
            return (
                <TodoItem item={item} key={index} onDelete={this.onDelete} />
            )
        })
        return(
            <div id="todo-list">
                <p onClick={this.clicked}>The busiest people have the most leisure</p>
                <ul>{todos}</ul>
                <AddItem />
            </div>
        )
    }

    clicked=()=>{
        console.log('You clicked me')
    }
}

//ReactDOM.render(<TodoComponent/>, document.getElementById("todo-wrapper"))
ReactDOM.render(<MultipleFormsFields/>, document.getElementById("todo-wrapper"))