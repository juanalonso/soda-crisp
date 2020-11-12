let config;

let tests;
let currentTest;
let userResults;
let session = {};

let butstep2;

function preload() {
    config = loadJSON('data/3e0617.json')
}

function setup() {

    session.expid = config.expid;
    session.expname = config.expname;
    session.measname = config.measname;
    session.scalemin = config.scalemin;
    session.scalemax = config.scalemax;
    session.results = [];

    select('#expname').html(config.expname);

    select('#butstep1').mousePressed(goToStep2);
    select('#butstep3').mousePressed(goToStep4);
    select('#butstep4_repeat').mousePressed(goToStep1);
    select('#butstep4_main').mousePressed(endSession);

    butstep2 = select('#butstep2');
    butstep2.mousePressed(nextConfig);

    select('#measname').html(config.measname);
    select('#scalemin').html(config.scalemin);
    select('#scalemax').html(config.scalemax);

}

function initTest() {
    currentTest = 0;
    tests = [];
    userResults = {};
    for (reps = 1; reps <= config.repetitions; reps++) {
        for (freqs = 1; freqs <= 3; freqs++) {
            for (gains = 1; gains <= 3; gains++) {
                test = {
                    'freqgain': config['freqgain' + freqs],
                    'finalgain': config['finalgain' + gains]
                }
                tests.push(test);
            }
        }
    }
    shuffleArray(tests);

}

function goToStep2() {
    initTest();
    updateButtonCounter();
    select('#step2').removeClass('hidden');
    select('#step1').addClass('hidden');
}

function goToStep3() {
    select('#step3').removeClass('hidden');
    select('#step2').addClass('hidden');
}

function goToStep4() {

    d = new Date();

    userResults.subage = select('#subage').value();
    userResults.subgender = select('#subgender').value();
    userResults.date = d.toUTCString();
    userResults.results = tests;

    session.results.push(userResults);
    print(session);

    select('#step4').removeClass('hidden');
    select('#step3').addClass('hidden');
}

function goToStep1() {
    select('#step1').removeClass('hidden');
    select('#step4').addClass('hidden');
}


function endSession(){
    d = new Date();
    saveJSON(session, config.expid + '_' + d.getTime() + '_data.json');
    window.open('index.html', '_self');
}

function nextConfig() {
    tests[currentTest].response = Math.floor(Math.random() * 5)
    currentTest++;
    if (currentTest >= 9 * config.repetitions) {
        goToStep3();
    }
    updateButtonCounter();
}

function updateButtonCounter() {
    butstep2.html('Save (' + (currentTest + 1) + ' of ' + (9 * config.repetitions) + ')');
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}