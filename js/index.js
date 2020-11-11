let dropzone;
let experiment, expname, measname;


function setup() {

    dropzone = select('#dropzone');
    dropzone.dragOver(highlight);
    dropzone.dragLeave(unhighlight);
    dropzone.drop(gotFile, unhighlight);

    expname = select('#expname');
    measname = select('#measname');

}


function gotFile(file) {
    experiment = file.data;
    print(experiment);
    expname.html(experiment.expname + '<small>' + experiment.expid + '</small>');
    measname.html(experiment.measname);

}

function highlight() {
    dropzone.style('background-color', '#308732')
}

function unhighlight() {
    dropzone.style('background-color', '#1976d2')
}