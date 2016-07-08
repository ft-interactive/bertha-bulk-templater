const aws = require('aws-sdk'); 
const fs = require('fs');
const path = require('path');
const sheetLoader = require('./bertha-loader');
const bulkTemplater = require('./bulk-nunjucks');

const s3 = new aws.S3();
const s3Bucket = 'bertha-templater';

const myLoader = sheetLoader()
    .id('1XqXuzg62NiXNxuT1MkodvLpy6V_t80gjyFnXvffByL8')
    .republish(true);

const templater = bulkTemplater()
    .templateDir('templates')
    .addTemplate('table.html')
    .addRowTemplate('item.html');

myLoader().then(function( sheets ) {
        sheets.dataColumns = Object.keys(sheets.data[0])
        let result = templater( sheets );
        //writeFS(result, 'output');
        writeS3(result, s3Bucket);
    });

function writeFS(files, outputDir){
    console.log('write to file system');
    files.forEach(function(file){ 
        console.log('create ', file.name);
        fs.writeFile(path.join(outputDir, file.name), file.body );
    });
}

function writeS3(files, bucket){
    let s3obj = new aws.S3({ params: {Bucket: bucket} });
    files.forEach(function(file){ 
        s3obj.upload({ Body:file.body, Key: file.name }, function(err, data) {
            if (err) {
                console.log('Error uploading data to '  + bucket +  '/' + file.name +' :' , err);
            } else {
                console.log('Successfully uploaded data to ' + bucket +  '/' + file.name);
            }
        });
    });
}