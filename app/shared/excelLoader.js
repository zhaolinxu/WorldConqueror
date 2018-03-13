//universal excel loader, all you need to do is specify "sheets" array, which tells the function what to return to you.
//for example ["BuildingType", "Units"] as long as those 2 sheets are part of same excel file.
var getDataFromExcel = function ($q, sheets, url) {
    return $q(function (resolve, reject) {
        //pass an url or load default + Date string to load new file instead of cached.
        var path = url || "assets/excel/Data.ods";
        var fileUrl = path + "?_=" + new Date().getTime();
        var oReq = new XMLHttpRequest();
        oReq.open("GET", fileUrl, true);
        oReq.responseType = "arraybuffer";

        oReq.onload = function () {
            var arraybuffer = oReq.response;

            /* convert data to binary string */
            var data = new Uint8Array(arraybuffer);
            var arr = [];
            for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");

            /* Call XLSX */
            var workbook = XLSX.read(bstr, {type: "binary"});

            /* DO SOMETHING WITH workbook HERE */

            var workbookSheets = {};
            for (var j = 0; j < sheets.length; j++) {
                var workbookSheet = workbook.Sheets[sheets[j]];
                //raw so we get numbers instead of strings, header: 1 creates a 2D array
                var sheetData = XLSX.utils.sheet_to_json(workbookSheet, {header: 1, raw: true});
                workbookSheets[sheets[j]] = {};
                var arra = [];
                //work with 2d array and create an object.
                for (var l = 1; l < sheetData.length; l++) {
                    var obj = {};
                    for (var k = 0; k < sheetData[0].length; k++) {
                        var property = sheetData[0][k];
                        obj[property] = sheetData[l][k]
                    }
                    arra.push(obj);
                }
                workbookSheets[sheets[j]] = arra;
            }
            console.log("Finished initializing data from excel");
            resolve(workbookSheets);
        };
        oReq.send();
    })
};