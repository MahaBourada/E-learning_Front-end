/* ReadyState function */
document.addEventListener("readystatechange", (event) => {
    if(event.target.readyState === "complete") {
        console.log("readyState: complete");
        initApp();
    }
})

const initApp = () => {
    /* Selecting and deleting students */
    var list = document.querySelector(".list"); /* List of students */

    /* var names = list.querySelectorAll("li"); */ /* Students' names */
    var names = [...list.querySelectorAll("li")];


    /* Filter/order the list of students */
    const filter = document.querySelector("#filter");

    /* Getting names into an object split by Sections, each section split by groups , each group is an array of names */
    var namesItems = {}

    names.forEach(name => {
        if(name.nodeType === 1) {
        var obj = {
            name: name.querySelector("span").innerHTML,
            section: name.querySelector("b").querySelector(".section").innerHTML,
            group:name.querySelector("b").querySelector(".group").innerHTML
        }
        
        if(!namesItems[obj.section]) namesItems[obj.section] = []
        if(!namesItems[obj.section][obj.group]) namesItems[obj.section][obj.group] = []
        namesItems[obj.section][obj.group].push(obj.name)
      }
    });

    filter.addEventListener("click", (event) => { 
        list.innerHTML = ""
        var htmlElement = `
        <li class="name"><span>{{name}}</span>
            <b class="class">
                <span class="section">{{section}}</span> 
                <span class="group">{{group}}</span>
            </b>
        </li>`;
        /* {
            "SECTION 3" : {
                "GROUP 2" : [ "Ibtihel","Boukerzaza"],
                "GROUP 1" : [ "Maha" , "Bourada"]
            },
            "SECTION 1" : {
                "GROUP 2" : [ "Aya","Naanaa"],
                "GROUP 1" : [ "Razane" , "Bennamoun"]
            },
        } */
        sortedSections = Object.keys(namesItems).sort() /* ["SECTION 1","SECTION 3"] */
        sortedSections.forEach(sect => {
            var sg = Object.keys( namesItems[sect]).sort() /* ["GROUP 1","GROUP 2"] */
            sg.forEach(group => {
                var sn = namesItems[sect][group].sort() /* Sorted Names of each group */
                sn.forEach(n => {
                    list.innerHTML = list.innerHTML + (htmlElement.replace('{{name}}',n).replace('{{section}}',sect).replace('{{group}}',group))
                });
            })
        });
    });

    /* Removing students */
    const dlt = document.querySelector("#delete");

    dlt.addEventListener("click", dltStudent);

    function dltStudent() {
        for(const li of names) {
            li.addEventListener("click", function() {
                this.parentNode.removeChild(this);
            })
        }
        dlt.removeEventListener("click", dltStudent);
    }
}




