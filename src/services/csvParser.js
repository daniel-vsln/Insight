import Papa from 'papaparse';

// TODO add format validation abd refactor
export class CsvParser {
    getCsv(inputId, callback) {
        const input = document.getElementById(inputId);

        input.addEventListener('change', function () {
            if (this.files && this.files[0]) {
                const myFile = this.files[0];
                const reader = new FileReader();

                reader.addEventListener('load', function (e) {
                    const result = Papa.parse(e.target.result);
                    callback(result.data);
                });
                reader.readAsBinaryString(myFile);
            }
        });
    }
};
