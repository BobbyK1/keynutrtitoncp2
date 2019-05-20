var field = 1;

function addExp() {
    id = "moreExp" + field;
    var container = document.getElementById(id);
    console.log(container);
    
    var column = document.createElement("div");
    column.classList = "col";
    column.id = "test";
    container.appendChild(column);

    container = document.getElementById("test");
    var input = document.createElement("input");
    input.type = "text";
    input.name = "work" + field;
    input.classList = "form-control"
    container.appendChild(input);
    field++;
}

