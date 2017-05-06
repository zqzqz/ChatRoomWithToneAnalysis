/////////////

var watson = require('watson-developer-cloud');
module.exports = Tone;

function Tone() {

this.initial=function(){
    var tone_analyzer = watson.tone_analyzer({
        username: "db31a52c-e67f-43dd-8fd8-556fe79eba58",
        password: "VbJyfa6kLAOB",
        version: 'v3',
        version_date: '2016-05-19 '
    });
};
this.analysis=function(m){
    tone_analyzer.tone({ text: "i have nothing." },
      function (err, tone) {
          if (err)
              console.log(err);
          else
              console.log(JSON.stringify(tone, null, 2));
      });
};


}

//////////////