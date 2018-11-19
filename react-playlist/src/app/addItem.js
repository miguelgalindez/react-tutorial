const React=require('react')

class AddItem extends React.Component {
    state={
        text: ''
    }

    handleSubmit=()=>{
        this.props.onSubmit(text)
    }
    
    render(){
        return (
            <form id="add-todo">
                <input type="text" required />
                <input type="submit" onSubmit={this.handleSubmit} value="Hit me"/>
            </form>
        )
    }
}
module.exports=AddItem