import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';


class StreamEdit extends React.Component{
    componentDidMount(){
        //hay que fechear el stream con una action, no se puede directo del state
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    }

    render(){
        //this.props.match.params.id
        //para la primera vez que carga
        if(!this.props.stream){
            return <div>Loading...</div>
        }

        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm 
                    initialValues={_.pick(this.props.stream, 'title', 'description')}
                    onSubmit={this.onSubmit}                    
                />
            </div>
        );
    }
    
}

//recordar que ownProps tiene las propiedades del componente este , o el que sea
const mapStateToProps = (state, ownProps) => {
    return { stream : state.streams[ownProps.match.params.id]};
};

export default connect(mapStateToProps,
    {fetchStream, editStream}
    )(StreamEdit);