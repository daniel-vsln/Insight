import React from 'react';
import ReactTags from 'react-tag-autocomplete'
import './style.css';
import eventStore from '../../services/eventStore';
import EventGallery from './components/EventGallery';
import PersonsPanel from './components/PersonsPanel';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tags: [],
            suggestions: [],
            events: [],
        }
    }

    componentDidMount() {
        eventStore.getAllPersons().then(persons => {
            const tags = persons
                .slice(0, 5)
                .map(value => ({
                    id: value.personId,
                    name: `${value.firstName} ${value.lastName} (${value.company})`
                }));

            const suggestions = persons
                .slice(5)
                .map(value => ({
                    id: value.personId,
                    name: `${value.firstName} ${value.lastName} (${value.company})`
                }));

            this.setState({ tags, suggestions });
        });
        eventStore.getLatestEvents(10).then(events => {
            this.setState({ events });
        });
    }

    // TODO refactoring
    handleDelete = (i) => {
        const tags = this.state.tags.slice(0);
        const suggestions = this.state.suggestions.slice(0);

        suggestions.push(tags[i]);
        tags.splice(i, 1);

        this.setState({ tags, suggestions });
    }

    // TODO refactoring
    handleAddition = (tag) => {
        const tags = [].concat(this.state.tags, tag)
        const suggestions = this.state.suggestions.slice(0);
        const suggestionIndex = suggestions.findIndex(s => s.id === tag.id);

        suggestions.splice(suggestionIndex, 1);
        this.setState({ tags, suggestions });
    }

    render() {
        const {
            tags,
            suggestions,
            events
        } = this.state;
        return (
            <div>
                <PersonsPanel
                    tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                />
                <EventGallery events={events} />
            </div>
        );
    }
}