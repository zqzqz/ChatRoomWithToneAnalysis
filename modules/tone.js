/////////////

var tone = require('watson-developer-cloud');


function Tone() {
    var tone_analyzer;

    this.initial = function () {
        tone_analyzer = tone.tone_analyzer({
            username: "db31a52c-e67f-43dd-8fd8-556fe79eba58",
            password: "VbJyfa6kLAOB",
            version: 'v3',
            version_date: '2016-05-19 '
        });
    };
    this.analysis = function (m) {
        tone_analyzer.tone({ text: "i have nothing." },
            function (err, tone) {
                if (err)
                    return err;
                else
                    return JSON.stringify(tone, null, 2);
        });
    };
};






module.exports = Tone;
//////////////