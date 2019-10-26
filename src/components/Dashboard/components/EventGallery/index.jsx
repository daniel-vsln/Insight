import React from 'react';
import './style.css';

export default (props) => {
    return <div className="event-gallery">
        {
            props.events ? renderEvents(props.events) : renderNoElementsMessaga()
        }
    </div>
}

function renderEvents(events) {
    return events.map(event => {
        return <div className="event-item">{event.content}</div>
    });
}

function renderNoElementsMessaga() {
    return <span>Sorry, no events.</span>;
}
