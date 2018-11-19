const React=require('react')
const PropTypes=require('prop-types')
module.exports = class extends React.Component{
    static propTypes={
        placeholder: PropTypes.string,
        name: PropTypes.string.isRequired,
        value: PropTypes.string,
        validate: PropTypes.func,
        onChange: PropTypes.func.isRequired
    }

    state={
        value: this.props.value,
        error: false
    }
    // Sometimes the parent of this component will want to update the value property.
    componentWillReceiveProps(update){        
        this.setState({ value: update.value })
    }

    onChange=(event)=>{
        const value=event.target.value        
        const error=this.props.validate ? this.props.validate(value) : false
        this.setState({ value, error })

        const name=this.props.name
        this.props.onChange({name, value, error})
    }

    render(){
        return (
            <div>
                <input placeholder={this.props.placeholder} value={this.state.value} onChange={this.onChange} />
                <span style={{color: 'red'}}>{this.state.error}</span>
            </div>
        )
    }
}