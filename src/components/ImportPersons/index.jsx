import React from 'react';
import { CsvParser } from '../../services/csvParser';
import './style.css';

export default class ImportPersons extends React.Component {
    constructor(props) {
        super(props);

        this.state = { data: [] };
    }
    componentDidMount() {
        const parser = new CsvParser();
        parser.getCsv('personsCsv', this.csvUploaded);
    }

    csvUploaded = (data) => {
        this.setState({ data });
    }

    renderCsvPreview = (data) => {
        const rows = data.map(row => {
            return <tr>
                {
                    row.map(item => {
                        return <td>{item}</td>;
                    })
                }
            </tr>;
        });

        return rows && rows.length ? <table>{rows}</table> : <span>No data for preview.</span>;
    }

    render() {
        const { data } = this.state;
        return (
            <div className="csv-upload-panel">
                <div>
                    <input type="file" id="personsCsv" accept=".csv" />
                </div>
                <div className="csv-preview-table">
                    {
                        data && this.renderCsvPreview(data)
                    }
                </div>
                <div>
                    <button>Upload to Server</button>
                </div>
            </div>
        );
    }
}