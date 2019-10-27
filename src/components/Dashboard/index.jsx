import React from 'react';
import './style.css';
import eventStoreService from '../../services/eventStore';
import EventGallery from './components/EventGallery';
import PersonsPanel from './components/PersonsPanel';
import Search from './components/Search';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.eventStore = new eventStoreService();

        this.state = {
            persons: [],
            tags: [],
            suggestions: [],
            events: [],
            page: 1,
            perpage: 12,
            query: '',
            loading: true,
            loadMore: true,
        }
    }

    componentDidMount() {
        this.eventStore.getAllPersons().then(persons => {
            const tags = persons
                .slice(0, 10)
                .map(p => ({
                    id: p.id,
                    name: `${p.firstName} ${p.lastName} (${p.company})`
                }));

            const suggestions = persons
                .slice(10)
                .map(p => ({
                    id: p.id,
                    name: `${p.firstName} ${p.lastName} (${p.company})`
                }));

            this.setState({ tags, suggestions, persons }, this.requestNewList);
        });
    }

    requestEvents = () => {
        this.setState({ loading: true });

        const { page, perpage, tags, query } = this.state;

        const personsFilter = tags.map(tag => tag.id);

        return this.eventStore.getEvents(page, perpage, personsFilter, query);
    }

    requestNewList = () => {
        this.setState({ page: 1 }, () => this.requestEvents().then(events => {
            this.setState({ loading: false, events, loadMore: events.length > 0 });
        }));
    }

    // TODO refactoring
    handleDelete = (i) => {
        const tags = this.state.tags.slice(0);
        const suggestions = this.state.suggestions.slice(0);

        suggestions.push(tags[i]);
        tags.splice(i, 1);

        this.setState({ tags, suggestions }, this.requestNewList);
    }

    // TODO refactoring
    handleAddition = (tag) => {
        const tags = [].concat(this.state.tags, tag);
        const suggestions = this.state.suggestions.slice(0);
        const suggestionIndex = suggestions.findIndex(s => s.id === tag.id);

        suggestions.splice(suggestionIndex, 1);
        this.setState({ tags, suggestions }, this.requestNewList);
    }

    handleQueryChange = (e) => {
        this.setState({ query: e.target.value });
    }

    handleLoadMore = () => {
        const { events, page } = this.state;

        this.setState({ page: page + 1 }, () => this.requestEvents().then(newEvents => {
            this.setState({ loading: false, events: [...events, ...newEvents], loadMore: events.length > 0 });
        }))
    }

    // TODO add error handling for upload
    render() {
        const {
            persons,
            tags,
            suggestions,
            events,
            query,
            loading
        } = this.state;
        return (
            <div>
                <PersonsPanel
                    tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                />
                <Search
                  query={query}
                  onQueryChange={this.handleQueryChange}
                  onSearch={this.requestNewList}
                />
                <EventGallery
                  events={events}
                  loading={loading}
                  persons={persons}
                  onLoadMore={this.handleLoadMore}
                />
            </div>
        );
    }
}
