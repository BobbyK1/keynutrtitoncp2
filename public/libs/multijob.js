var field = 1;
function deleteExp(id) {
    document.getElementById(id).remove();
}

function addExp() {
    var container = document.createElement("div");
    container.classList = "mg-top animated fadeInLeft fast";
    container.id = field;
    container.innerHTML = 
    '<div class="row">\
        <div class="col">\
            <label for="job-title">Job Title:</label>\
            <input type="text" name="jobTitle" id="job-title" class="form-control">\
        </div>\
        <div class="col">\
            <label for="company">Company:</label>\
            <input type="text" name="company" id="company" class="form-control">\
        </div>\
    </div>\
    <div class="row">\
        <div class="col text-right text-white" style="margin-top: 15px;">\
            <a class="btn btn-sm btn-danger" onclick="deleteExp(id)" id="' + field + '"><i class="fas fa-trash"></i></a>\
        </div>\
    </div>';

    document.getElementById("moreExp").appendChild(container);
    field++;
}