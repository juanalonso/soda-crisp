let butCreate;
let production = true;

var fields = {
    'expid': '',
    'expname': '',
    'freqgain1': '',
    'freqgain2': '',
    'freqgain3': '',
    'finalgain1': '',
    'finalgain2': '',
    'finalgain3': '',
    'measname': '',
    'scalemin': '',
    'scalemax': '',
    'repetitions': '',
}



function setup() {

    butCreate = select('#butCreate');
    butCreate.mousePressed(saveForm);

    expid = select('#expid')
    expid.value(randomID())
}



function saveForm() {

    for (var key in fields) {
        fields[key] = select('#' + key).value();
    }

    radioFreqs = document.getElementsByName("freqs");
    if (radioFreqs[0].checked) {
        fields.freqs = "lopass"
    } else {
        fields.freqs = "hipass"
    }

    print(JSON.stringify(fields))
    if (production) {
        saveJSON(fields, fields.expid + '.json');
    }

    delete  fields.freqs
}



function randomID() {
    result = ''
    for (var i = 0; i < 6; i++) {
        result += Math.floor(Math.random() * 16).toString(16)
    }
    return result
}