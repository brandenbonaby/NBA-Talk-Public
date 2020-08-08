import https from "https";

const httpsRequest = function (options, data) {
    return new Promise(function(resolve, reject) {
        var req = https.request(options, function(res) {
            // reject on bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            var body = [];
            res.on('data', function(chunk) {
                body.push(chunk);
            });
            // resolve on end
            res.on('end', function() {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch(e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        // reject on request error
        req.on('error', function(err) {
            reject(err);
        });
        if (data) {
            req.write(data);
        }
        req.end();
    });
}

export default httpsRequest;