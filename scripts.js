//https://en.wikipedia.org/wiki/Octave_band

let noise, eq, fft;
let eqAmpState = 0;
let eqAmp = 5;
let UAStarted = false;

function setup() {

    getAudioContext().suspend();

    eq = new p5.EQ(8);
    //eq.disconnect();

    noise = new p5.Noise();
    noise.amp(0.01);
    noise.disconnect();
    noise.connect(eq);

    fft = new p5.FFT();
    fft.setInput(eq);

    let cnv = createCanvas(300, 300);
    cnv.mousePressed(UAStart);

    for (let f = 36; f <= 43; f++) {
        eq.bands[f-36].freq(pow(10, 0.1 * f))
        //print(pow(10, 0.1 * f))
    }

}

function draw() {

    let spectrum = fft.analyze();

    background(30, 30, 40);
    noStroke();
    fill(100, 100, 205);
    for (let i = 0; i < spectrum.length; i++) {
        let x = map(i, 0, spectrum.length, 0, width);
        let h = -height + map(spectrum[i], 0, 255, height, 0);
        rect(x, height, width / spectrum.length, h)
    }
}

function UAStart() {
    if (!UAStarted) {
        userStartAudio();
        UAStarted = true;
        print("User Audio started");
        noise.start();
    } else {
        eqAmpState = (eqAmpState + 1) % 3;
        //print("Band " + eqAmpState);
        for (let i = 0; i < eq.bands.length; i++) {
            eq.bands[i].gain(eqAmp*(eqAmpState-1));
        }
    }
}

// let eq, soundFile
// let eqBandIndex = 0;
// let eqBandNames = ['lows', 'mids', 'highs'];

// function preload() {
//     soundFormats('mp3', 'ogg');
//     soundFile = loadSound('assets/beat');
// }

// function setup() {
//     let cnv = createCanvas(100, 100);
//     cnv.mousePressed(toggleSound);

//     eq = new p5.EQ(eqBandNames.length);
//     soundFile.disconnect();
//     eq.process(soundFile);
// }

// function draw() {
//     background(30);
//     noStroke();
//     fill(255);
//     textAlign(CENTER);
//     text('filtering ', 50, 25);

//     fill(255, 40, 255);
//     textSize(26);
//     text(eqBandNames[eqBandIndex], 50, 55);

//     fill(255);
//     textSize(9);

//     if (!soundFile.isPlaying()) {
//         text('tap to play', 50, 80);
//     } else {
//         text('tap to filter next band', 50, 80)
//     }
// }

// function toggleSound() {
//     if (!soundFile.isPlaying()) {
//         soundFile.play();
//     } else {
//         eqBandIndex = (eqBandIndex + 1) % eq.bands.length;
//     }

//     for (let i = 0; i < eq.bands.length; i++) {
//         eq.bands[i].gain(0);
//     }
//     // filter the band we want to filter
//     eq.bands[eqBandIndex].gain(-40);
// }


// // let osc;
// // let mic;
// // let UAStarted = false;

// // function setup() {

// //     getAudioContext().suspend();

// //     let cnv = createCanvas(300, 300);
// //     background(220);
// //     textAlign(CENTER);
// //     fill(127);
// //     stroke(0);

// //     mic = new p5.AudioIn();
// //     mic.start();


// //     osc = new p5.Oscillator('square');
// //     osc.amp(0.015);

// //     delay = new p5.Delay();
// //     delay.drywet(0);
// //     delay.process(mic, 0.92, 0.4);

// //     cnv.mousePressed(oscStart);
// // }


// // function oscStart() {
// //     if (!UAStarted) {
// //         userStartAudio();
// //         UAStarted = true;
// //     }
// //     osc.start();
// // }


// // function mouseReleased() {
// //     osc.stop();
// // }


// // function draw() {

// //     background(200);
// //     let vol = mic.getLevel();

// //     let h = map(vol, 0, 1, height, 0);
// //     ellipse(width / 2, h - 25, 50, 50);

// // }