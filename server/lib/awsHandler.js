var fs = require('fs');
var AWS = require('aws-sdk');
var credentials = require('./credentials');

// not recommended for deployment, only for testing
AWS.config.update({
  accessKeyId: credentials.aws.keyId,
  secretAccessKey: credentials.aws.secret
});

// Create an S3 client
var s3 = new AWS.S3();

var baseParams = {
  Bucket: credentials.aws.s3BucketName,
}

exports.imgUpload = function(image, callback) {

  fs.readFile(image.path, function(err, data) {
    if (err) return callback(err, null);

    // file read, create params for upload
    var params = _.extend(baseParams, {
      Key: Date.now().toString() + '_' + encodeURIComponent(image.name),
      ACL: 'public-read',
      Body: data,
      ContentType: image.type,
    });

    s3.upload(params, function(err, data) {
      if (err) return callback(err, null);

      // image uploaded!
      var upload = {
        Key: params.Key,
        ETag: data.ETag,
        url: data.Location
      }
      callback(null, upload);
    });
  });
};