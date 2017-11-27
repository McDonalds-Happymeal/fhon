// v2.0 WOO!
//defualt JSON uploaded if user does not have already.
var defaults = [
    {
        "id":0,
    },
    {
        "device":"Prime",
        "frontPanel":0,
        "backPanel":0,
        "text":null
    },
    {
        "device":"Tuff",
        "frontPanel":0,
        "backPanel":0,
        "text":null
    },
    {
        "device":"Tuff",
        "frontPanel":0,
        "backPanel":0,
        "text":null
    }
];

var state = null; //global variable for my sanity; sorry :(

window.onload = function() {
    initialise();
}


//intialise loads up customiser
function initialise() {

    //local storage 
    if (localStorage.getItem("options")===null) {
        console.log("local storage loading attempted");
        localStorage.setItem("options", JSON.stringify(defaults));
    }

    state = JSON.parse(localStorage.getItem("options"));
    //loads local stoage data for use in program.


    console.log(options);
    
    drawoptions();

}


//generates UI for customiser
function drawoptions() {
    var area = document.getElementById("options");
    //area.innerHTML = "<!--wiped-->";
    area.innerHTML = '<div id="device"><h3>device</h3><div class="select"></div></div>';
    //area.insertAdjacentHTML("beforeend",'<div id="device"><h3>device</h3><div class="select"></div></div>');
    console.log(state);

    var numOptions = (device[state[0].id]).options;//hold number of options used for loops.
    for(var i = 0; i< numOptions.length; i++) {
        area.insertAdjacentHTML("beforeend",'<div id="'+device[state[0].id].options[i]+'"><h3>'+device[state[0].id].options[i]+'</h3><div class="select"></div></div>');
    }

    numOptions.unshift("device");//adds device top options array for generation


    for(var i = 0; i<numOptions.length;i++) {//loops through each catgory generated above
        area = document.getElementById(numOptions[i]);
        area = area.getElementsByClassName("select")[0];

        var resourse = eval(numOptions[i]);

        for(var k = 0; k< resourse.length; k++) {//goes through json for catagory and populates options
            var obj = resourse[k];
                area.insertAdjacentHTML("beforeend",'<div class="option" onclick="selection(\''+numOptions[i]+'\','+obj.id+')" ><img src="/assets/customiser/textures/'+obj.texture+'" /><p>'+obj.name+'</p></div>');
        }
    }
}

function selection(name, id) {//html refers catagory and id to here for update.
    if (name === "device") {//special case for device
        console.log(id + " " + state[0].id);
        state[0].id = id;
        
        drawoptions();
    }else{

    }
}