    /* Calendar */
const addM = document.querySelector("#add_module");
const dltM = document.querySelector("#dlt_module")

const table = document.querySelector("table");
var cells = [...table.querySelectorAll("td")];

/* Add a module */
addM.addEventListener("click", (event) => {
    for(const td of cells) {
        td.style.cursor = "pointer";
        td.addEventListener("click", function() {
            this.innerHTML += "<li>DAAW</li>";
        })
    }
})

/* Delete a module */
dltM.addEventListener("click", function() {
    for(const td of cells) {
        function dltText(text) {
            const li = [...document.querySelectorAll("td li")];
            for(const elem of li) {
                if(elem.innerHTML == text) elem.parentNode.removeChild(elem);
            };
        }
        td.addEventListener("click", function() {
            dltText("DAAW");
        })
    }
})
