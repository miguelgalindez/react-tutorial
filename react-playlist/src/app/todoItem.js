// create TodoItem component
const React=require('react')
require('./css/todo-item.css')
class TodoItem extends React.Component{
    
    render(){
        return (
            <li>
                <div className="todo-item">
                    <span className="itme-name">{this.props.item}</span>
                    <span className="item-remove" onClick={this.handleDelete}> x </span>
                </div>
            </li>
        )
    }
    handleDelete=(e)=>{
        this.props.onDelete(this.props.item)        
    }
}
module.exports=TodoItem