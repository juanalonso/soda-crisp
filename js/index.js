let dropzone;
let experiment, expname;


function setup() {

    dropzone = select('#dropzone');
    dropzone.dragOver(highlight);
    dropzone.dragLeave(unhighlight);
    dropzone.drop(gotFile, unhighlight);

    expname = select('#expname');
    expname.mousePressed(runExperiment)

}


function runExperiment() {
    window.open('run.html', '_self');
}


function gotFile(file) {
    experiment = file.data;
    expname.html('Run ' + experiment.expname + '<br\><small>' + experiment.measname + '</small>');
    expname.removeClass('hidden')
}

function highlight() {
    dropzone.style('background-color', '#308732')
    dropzone.style('color', 'var(--button-back-color)')
}

function unhighlight() {
    dropzone.style('background-color', 'var(--back-color)')
    dropzone.style('color', 'var(--button-fore-color)')
}