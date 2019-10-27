import React from 'react';
import ReactTags from 'react-tag-autocomplete'
import './style.css';

export default (props) => {
    return <ReactTags
        tags={props.tags}
        suggestions={props.suggestions}
        handleDelete={props.handleDelete}
        handleAddition={props.handleAddition}
        minQueryLength={1}
        placeholder="Select Person" />;
}
