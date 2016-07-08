const nunjucks = require('nunjucks');

module.exports = function(){
    const templates = [];
    const rowTemplates = [];

    function templater(data){
        let result = [];
        templates.forEach(function(t){
            result.push({
                'name': t,
                'body': nunjucks.render(t, data),
            });
        });

        rowTemplates.forEach(function(t){ 
            data.data.forEach(function(d, i){
                let bits = t.split('.');
                result.push({
                    'name': bits[0] + '-' + i + '.' + bits[1], //assumes a *.* naming pattern for the template,
                    'body': nunjucks.render(t, {row:d, options:data.options, credits:data.credits, dataColumns:data.dataColumns }),   
                })
            })
        });

        return result;
    }

    templater.templateDir = function(dir){
        nunjucks.configure(dir);
        return templater;
    };

    templater.addTemplate = function(t){
        templates.push(t);
        return templater;
    };

    templater.addRowTemplate = function(t){
        rowTemplates.push(t);
        return templater;
    };

    templater.nunjucks = function(){
        return nunjucks;
    };

    return templater;
}