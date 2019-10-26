// TODO add format validation abd refactor
export class CsvParser {
    getCsv(inputId, callback) {
        let input = document.getElementById(inputId);
        const parser = this.getParsecsvdata;
        input.addEventListener('change', function () {
            if (this.files && this.files[0]) {
                var myFile = this.files[0];
                var reader = new FileReader();

                reader.addEventListener('load', function (e) {
                    let csvdata = e.target.result;
                    const result = parser(csvdata);
                    callback(result);
                });
                reader.readAsBinaryString(myFile);
            }
        });
    }

    getParsecsvdata(data) {
        let parsedata = [];
        let newLinebrk = data.split("\n");
        for (let i = 0; i < newLinebrk.length; i++) {

            parsedata.push(newLinebrk[i].split(";"))
        }
        return parsedata;
    }
};