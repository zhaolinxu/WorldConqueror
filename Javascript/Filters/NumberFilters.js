'use strict';

wciApp.filter('roundInt',  ['$filter', function ($filter) {
    return function (input) {
        var roundNum = Math.round(input);
        return roundNum;
    };
}]);

wciApp.filter('fixedDecimalPlaces', ['$filter', function ($filter){

    return function (input, decimals) {
        var returnNum = input.toFixed(decimals);
        return returnNum;
    };
}]);

wciApp.filter('niceNumber', ['$filter', function ($filter) {

    return function (number) {

        var number = number.toString().replace(',', '');
        var absVal = Math.abs(number);

        if (absVal >= Math.pow(10, 15)) {

            var multiple = (number / Math.pow(10, 15));
            var decimal = decimalPlaces(multiple, 2);
        }
        else if (absVal >= Math.pow(10, 12)) {

            var multiple = (number / Math.pow(10, 12));
            var decimal = decimalPlaces(multiple, 2);

            number = multiple.toFixed(decimal) + "T";
        }
        else if (absVal >= Math.pow(10, 9)) {

            var multiple = (number / Math.pow(10, 9));
            var decimal = decimalPlaces(multiple, 2);

            number = multiple.toFixed(decimal) + "B";
        }
        else if (absVal >= Math.pow(10, 6)) {

            var multiple = (number / Math.pow(10, 6));
            var decimal = decimalPlaces(multiple, 2);

            number = multiple.toFixed(decimal) + "M";
        }
        else if (absVal >= Math.pow(10, 3)) {

            var multiple = (number / Math.pow(10, 3));
            var decimal = decimalPlaces(multiple, 2);

            number = multiple.toFixed(decimal) + "K";
        }
        else {
            //For small numbers no decimals.
            number = parseInt(number).toFixed(0);
        }
        return number;
    };

}]);


//#region Private Methods
//This calculates the number of decimal places needed.
function decimalPlaces(num, min) {
    var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) { return 0; }
    return Math.min(
         min,
         //Number of digits right of decimal point.
         (match[1] ? match[1].length : 0)
         //Adjust for scientific notation.
         - (match[2] ? +match[2] : 0));
};
//#endregion