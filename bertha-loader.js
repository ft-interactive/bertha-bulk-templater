var fetch = require('node-fetch');

module.exports = function(){
    let sheetId = '';
    let sheets = 'basic';
    let requestType = 'republish';

    function getSheets(){
        if (!sheetId) console.log( 'no sheet id :(' );
        return fetch( 'http://bertha.ig.ft.com/' + requestType + '/publish/ig/' + sheetId + '/' + sheets )
            .then(function( res ) {
                return res.json();
            });
    }

    getSheets.republish = function(bool){
        if(bool){
            requestType = 'republish';
        }else{
            requestType = 'view';
        }
        return getSheets;
    }

    getSheets.id = function(id){
        sheetId = id;
        return getSheets;
    }

    getSheets.sheets = function(str){
        sheets = str;
        return getSheets;
    }

    return getSheets;
}