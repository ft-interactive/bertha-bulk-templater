#Proof of concept.

From a Bertha spreadsheet create a bunch of HTML (etc.) files based on templates. Store the results in an S3 bucket (or locally for development)

2 basic types of templates are available... either all the data in a single file or one file per data row. In the example `templates/table.html` and `templates/item.html` respectively.

You can test output locally by switching from `writeS3(result, s3Bucket);` to `writeFS(result, 'output');`

_NOTE:_ the s3 bucket currently being written to is in my (Tom P) personal S3 space so won't work for you ( or at least shouldn't! )