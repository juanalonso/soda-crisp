let dropzone;
let experiment, runexp, createexp;


function setup() {

    dropzone = select('#dropzone');
    dropzone.dragOver(highlight);
    dropzone.dragLeave(unhighlight);
    dropzone.drop(gotFile, unhighlight);

    createexp = select('#createexp');
    createexp.mousePressed(createExperiment)

    runexp = select('#runexp');
    runexp.mousePressed(runExperiment)

}


function createExperiment() {
    window.open('create.html', '_self');
}

function runExperiment() {
    window.open('run.html', '_self');
}


function gotFile(file) {
    experiment = file.data;
    //runexp.html('Run ' + experiment.expname + '<br\><small>' + experiment.measname + '</small>');
    //runexp.removeClass('hidden')
    window.open('run.html', '_self');
}

function highlight() {
    dropzone.style('background-color', '#308732')
    dropzone.style('color', 'var(--button-back-color)')
}

function unhighlight() {
    dropzone.style('background-color', 'var(--back-color)')
    dropzone.style('color', 'var(--button-fore-color)')
}