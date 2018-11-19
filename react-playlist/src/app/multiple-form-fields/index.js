const React=require('react')
const FieldComponent=require('./field-component')
const CourseSelectComponent=require('./course-select')
module.exports=class extends React.Component {
    state={
        fields: {
            name: '',
            email: ''
        },
        fieldErrors: {},
        people: []
    }

    handleInputChange=({name, value, error})=>{
        const fields=this.state.fields
        const fieldErrors=this.state.fieldErrors
        fields[name]=value
        fieldErrors[name]=error
        this.setState({ fields })
    }

    handleFormSubmit=(event)=>{
        event.preventDefault()
        const person=this.state.fields
        const people=this.state.people                
        
        if(this.validate()) return;
        
        this.setState({
            people: people.concat(person),
            fields: {
                name: '',
                email: ''
            }
        })        
    }

    validate=()=>{
        const person=this.state.fields
        const fieldErrors=this.state.fieldErrors
        const errMessages=Object.keys(fieldErrors).filter((k)=>fieldErrors[k])        
        if(!person.name) return true;
        if(!person.email) return true;
        if(!person.course) return true;
        if(!person.department) return true;

        if (errMessages.length) return true;
        return false
    }


    requiredValidator=(msg)=>(val)=>(val ? false: msg)
    
    render(){
        return (
            <div>
                <h1>Sign up sheet</h1>
                <form onSubmit={this.handleFormSubmit}>
                    <FieldComponent placeholder='Name' name='name' value={this.state.fields.name} onChange={this.handleInputChange} validate={this.requiredValidator('Name required')} />
                    <br/>
                    <FieldComponent placeholder='Email' name='email' value={this.state.fields.email} onChange={this.handleInputChange} validate={this.requiredValidator('Email is required')} />                    
                    <br/>
                    <CourseSelectComponent department={this.state.fields.department} course={this.state.fields.course} onChange={this.handleInputChange} />
                    <br/>
                    <input type='submit' disabled={this.validate()} />
                </form>

                <div>
                    <h3>People</h3>
                    <ul>
                        {this.state.people.map(({name, email, department, course}, i)=>(
                            <li key={i}>{[name, email, department, course].join(' - ')}</li>
                        ))}
                    </ul>
                </div>
            </div>            
        )
    }
}