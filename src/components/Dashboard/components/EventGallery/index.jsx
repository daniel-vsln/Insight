import React from 'react';
import ReactTooltip from 'react-tooltip'

import './style.css';

export default ({persons, events, loading, onLoadMore}) => {
    return (
      <div className="event-container">
          <div className="event-gallery">
              { events && events.length ? renderEvents(events, persons) : renderNoElementsMessage() }
          </div>
          <div>
              { loading ? 'Loading' : <button className='event-load-more' onClick={onLoadMore}>Load More</button> }
          </div>
      </div>
    );
}

function renderEvents(events, persons) {
    return events.map(event => {
        const person = persons.find(p => p.personId === event.personId);
        const meta = event.meta
            ? '<div>Meta:</div>' + Object.keys(event.meta).map(key => `<div>${key}: ${event.meta[key]}</div>`).join('')
            : '';

        return (
            <div key={event.id} className="event-item" style={{ background: getRbgColorString(event.personId * 10000) }}>
                <p className='event-item-title' data-tip={meta} data-html={true}>{ `${person.firstName} ${person.lastName}` }</p>
                <ReactTooltip place='bottom'/>
                { event.content }
                {
                    event.source && (
                        <a className='event-item-source' href={ event.source } target='_blank' rel="noopener noreferrer">
                            { event.source }
                        </a>
                    )
                }
            </div>
        );
    });
}

function renderNoElementsMessage() {
    return <span>Sorry, no events.</span>;
}

function getRbgColorString(num) {
  const i = num >>> 0;
  const b = i & 0xFF;
  const g = (i & 0xFF00) >>> 8;
  const r = (i & 0xFF0000) >>> 16;

  return 'rgb(' + [r, g, b].join(',') + ')';
}
