import React from 'react';
import { Field, reduxForm} from 'redux-form';

class StreamForm extends React.Component {
    renderError({error, touched}){
        if(touched && error){
            return(
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }
    renderInput = ({input, label, meta}) => {
        //cambia las clases del div para que se vea rojo
        const className= `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }

    /*
    <Input 
    onChange={formProps.input.onChange} 
    value={formProps.input.value}
    />

    se puede hacer, trae propiedades de form redux
    <input {...formProps.input}/>
    */

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
        //event.preventDefault(); no hace falta hacerlo
    }

    render(){
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}
            className="ui form error">
                <Field 
                name="title" 
                component={this.renderInput}
                label="Enter Title"
                />
                <Field 
                name="description" 
                component={this.renderInput}
                label="Enter Description"
                 />

                <button className="ui button primary">
                    Submit
                </button>
            </form>
        );
    };   
}

const validate = (formValues) => {
    const errors = {};

    if(!formValues.title){
        errors.title = 'You must enter a title';
    }

    if(!formValues.description){    
        errors.description = 'You must enter a description';
    }

    return errors;
};


export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);