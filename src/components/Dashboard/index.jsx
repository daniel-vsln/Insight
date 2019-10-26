import React from 'react';
import ReactTags from 'react-tag-autocomplete'
import './style.css';
import eventStore from '../../services/eventStore';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tags: [],
            suggestions: [
            { id: 3, name: "Bananas" },
            { id: 4, name: "Mangos" },
            { id: 5, name: "Lemons" },
            { id: 6, name: "Apricots" }]
        }
    }

    componentDidMount() {
        eventStore.getAllPersons().then(persons => {
            const tags = persons
                .slice(0, 10)
                .map(value => ({
                    id: value.personId,
                    name: `${value.firstName} ${value.lastName} (${value.company})`
                }));

            const suggestions = persons
                .slice(10)
                .map(value => ({
                    id: value.personId,
                    name: `${value.firstName} ${value.lastName} (${value.company})`
                }));

            this.setState({ tags, suggestions });
        });
    }

    handleDelete(i) {
        const tags = this.state.tags.slice(0)
        tags.splice(i, 1)
        this.setState({ tags })
    }

    handleAddition(tag) {
        const tags = [].concat(this.state.tags, tag)
        this.setState({ tags })
    }

    render() {
        return (
            <ReactTags
                tags={this.state.tags}
                suggestions={this.state.suggestions}
                handleDelete={this.handleDelete.bind(this)}
                handleAddition={this.handleAddition.bind(this)} />
        )
    }
}