wciApp.factory(
    'gameDataService',
    function (

    ) {
        /* Contains all game data for units/research/law/buildings etc. It contains base values only.
        *  In order to get actual unit attack/defense, we will be using a method like "unit.getAttack();
        *  Which will add other bonuses to the formula, like research or terrain type(if we ever implement that)*/
        let data = {};
        data.init = function(excelObject){
            //Excel object or JSON object contains all game data separated into parts like: Buildings, Units etc. Based on sheets in excel.
            for(let key in excelObject) {
                if(excelObject.hasOwnProperty(key)){
                    this[key] = excelObject[key];
                }
            }
            console.log("Game Data Object for debug reference: ");
            console.dir(this);
        };

        return data;
    }
);