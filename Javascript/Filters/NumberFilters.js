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
            var decimal = decimalPlaces(multiple, 1);

            number = multiple.toFixed(decimal) + "Q";
        }
        else if (absVal >= Math.pow(10, 12)) {
            number = (number / Math.pow(10, 12)).toFixed(0) + "T";
        }
        else if (absVal >= Math.pow(10, 9)) {
            number = (number / Math.pow(10, 9)).toFixed(0) + "B";
        }
        else if (absVal >= Math.pow(10, 6)) {
            number = (number / Math.pow(10, 6)).toFixed(0) + "M";
        }
        else if (absVal >= Math.pow(10, 3)) {

            var multiple = (number / Math.pow(10, 3));
            var decimal = decimalPlaces(multiple, 1);

            number = multiple.toFixed(decimal) + "K";
        }
        else {
            var multiple = number;
            var decimal = decimalPlaces(multiple, 1);

            number = multiple.toFixed(decimal);
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
         2,
         //Number of digits right of decimal point.
         (match[1] ? match[1].length : 0)
         //Adjust for scientific notation.
         - (match[2] ? +match[2] : 0));
};
//#endregion