/////////////

var tone = require('watson-developer-cloud');
const util = require('util')

function Tone() {
    var tone_dic = "default string";
    var tone_analyzer = tone.tone_analyzer({
            username: "db31a52c-e67f-43dd-8fd8-556fe79eba58",
            password: "VbJyfa6kLAOB",
            version: 'v3',
            version_date: '2016-05-19 '
        });
    this.analysis = function (m) {
        var promise = new Promise(function (resolve, reject) {
            tone_analyzer.tone({ text: m },
                function (err, tone) {
                    if (err) {
                        console.log("detection error");
                        reject(err);
                    }
                    else {
                        resolve(tone);                       
                        //return JSON.stringify(tone, null, 2);
                    }
                });
        });
        return promise;
    }
};

module.exports = Tone;
//////////////