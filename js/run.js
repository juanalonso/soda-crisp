let config;

let tests;
let currentTest;
let userResults;
let session = {};

let filter, fft, mic;
let UAStarted = false;


let butstep2;

function preload() {
    config = loadJSON('data/3e0617.json')
}

function setup() {

    getAudioContext().suspend();

    mic = new p5.AudioIn();

    filter = new p5.Filter();
    filter.setType('highshelf');
    filter.freq(2000);

    fft = new p5.FFT();

    mic.connect(filter);
    fft.setInput(filter);

    let cnv = createCanvas(600, 300);

    session.expid = config.expid;
    session.expname = config.expname;
    session.measname = config.measname;
    session.scalemin = config.scalemin;
    session.scalemax = config.scalemax;
    session.results = [];

    select('#expname').html(config.expname);
    select('#measname').html(config.measname);

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

function draw() {

    let spectrum = fft.analyze();

    background(30, 30, 40);
    noStroke();
    fill(255, 100, 205);
    for (let i = 0; i < spectrum.length; i++) {
        let x = map(i, 0, spectrum.length, 0, width);
        let h = -height + map(spectrum[i], 0, 255, height, 0);
        rect(x, height, width / spectrum.length, h)
    }
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

function initAudio() {
    if (!UAStarted) {
        userStartAudio();
        UAStarted = true;
        print("User Audio started");
        mic.start();
        mic.amp(1);
    }
}

function goToStep2() {
    initTest();
    initAudio();
    setFilterGainConfig();
    updateButtonCounter();
    select('#step2').removeClass('hidden');
    select('#step1').addClass('hidden');
}

function goToStep3() {
    getAudioContext().suspend();
    UAStarted = false;
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
    //print(session);

    select('#step4').removeClass('hidden');
    select('#step3').addClass('hidden');
}

function goToStep1() {
    select('#step1').removeClass('hidden');
    select('#step4').addClass('hidden');
}


function endSession() {
    d = new Date();
    saveJSON(session, config.expid + '_' + d.getTime() + '_data.json');
    window.open('index.html', '_self');
}

function nextConfig() {
    tests[currentTest].response = expid.value;
    currentTest++;
    if (currentTest >= 9 * config.repetitions) {
        goToStep3();
    } else {
        setFilterGainConfig();
        updateButtonCounter();
    }
}

function setFilterGainConfig() {

    print("Current test: ", currentTest);
    print(tests[currentTest]);

    filter.gain(int(tests[currentTest].freqgain));
    vol = map(int(tests[currentTest].finalgain),-60,0,0,1);
    mic.amp(vol,0);
    //print(vol);
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