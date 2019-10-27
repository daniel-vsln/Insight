import React from 'react';
import { CsvParser } from '../../services/csvParser';
import eventStoreService from '../../services/eventStore';
import './style.css';

export default class ImportPersons extends React.Component {
    constructor(props) {
        super(props);

        this.eventStore = new eventStoreService();

        this.state = { data: [], status: 'initial' };
    }
    componentDidMount() {
        const parser = new CsvParser();
        parser.getCsv('personsCsv', this.csvUploaded);
    }

    csvUploaded = (data) => {
        this.setState({ data });
    }

    renderCsvPreview = (data) => {
        if (!this.hasData()) {
            return <span>No data for preview.</span>;
        }

        const rows = data.map((row, index) => {
            return <tr key={index}>
                {
                    row.map((item, index) => {
                        return <td key={index}>{item}</td>;
                    })
                }
            </tr>;
        });

        return (
          <table>
              <thead>
              <tr>
                  <th>First Name</th><th>Last Name</th><th>Company</th><th>Twitter ID</th><th>Crunch ID</th>
              </tr>
              </thead>
              <tbody>{rows}</tbody>
          </table>
        );
    }

    hasData = () => {
        return this.state.data.length > 0;
    }

    // TODO add columns selection feature. Now it depends on order
    uploadData = () => {
        const persons = this.state.data.map(person => {
            return {
                firstName: person[0],
                lastName: person[1],
                company: person[2],
                twitterId: person[3],
                crunchId: person[4],
            };
        });

        this.eventStore.addPersons(persons)
            .catch(response => { this.setState({ status: 'error' }) })
            .then(response => { this.setState({ status: 'done' }) });

    }

    renderStatusMessage = () => {
        switch (this.state.status) {
            case 'error': return <span>Error</span>;
            default: return <span>Done</span>;
        }
    }

    render() {
        const {
            data,
            status,
        } = this.state;
        return (
            <div className="csv-upload-panel">
                <div className='csv-notify'>
                    <p>CSV structure:</p>
                    <span>:FirstName | :LastName | :Company | :TwitterId | :CrunchId</span>
                </div>
                <div>
                    <input type="file" id="personsCsv" accept=".csv" />
                </div>
                <div className="csv-preview-table">
                    {
                        data && this.renderCsvPreview(data)
                    }
                </div>
                <div>
                    {
                        status !== 'initial' ? this.renderStatusMessage() : (
                          <button
                            className='csv-upload-button'
                            disabled={!this.hasData()}
                            onClick={this.uploadData}
                          >Upload to Server</button>
                        )
                    }
                </div>
            </div>
        );
    }
}
