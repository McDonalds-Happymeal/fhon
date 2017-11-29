// v2.0 WOO!
//defualt JSON uploaded if user does not have already.
//localStorage.clear();//to do add user button for this!

var defaults = [
    {
        "id":0,
    },
    {
        "device":"prime",
        "selected":[0,0]
    },
    {
        "device":"tuff",
        "selected":[0,0]
    },
    {
        "device":"base",
        "selected":[0,0]
    }
];
front = true; //global var for display to render front or back.

window.onload = function() {
    initialise();
}


//intialise loads up customiser
function initialise() {

    //local storage 
    if (localStorage.getItem("options")==null) {
        console.log("local storage loading attempted");
        localStorage.setItem("options", JSON.stringify(defaults));
    }

    state = JSON.parse(localStorage.getItem("options"));
    //loads local stoage data for use in program.
    //global for my sanity sorry.


    console.log(options);
    
    drawoptions();
    drawdisplay();
    update();
    drawPhone();
}


//generates UI for customiser
function drawoptions() {
    var area = document.getElementById("options");
    //area.innerHTML = "<!--wiped-->";
    area.innerHTML = '<div id="device"><h3>device</h3><div class="select"></div></div>';
    //area.insertAdjacentHTML("beforeend",'<div id="device"><h3>device</h3><div class="select"></div></div>');
    var numOptions = (device[state[0].id]).options.slice();//TIL javascript always copies by value except array. this was a tricky one to find.
    console.log(numOptions);
    for(var i = 0; i< numOptions.length; i++) {
        area.insertAdjacentHTML("beforeend",'<div id="'+device[state[0].id].options[i]+'"><h3>'+device[state[0].id].options[i]+'</h3><div class="select"></div></div>');
    }

    numOptions.unshift("device");//adds device as top options array for generation


    for(var i = 0; i<numOptions.length;i++) {//loops through each catgory generated above
        area = document.getElementById(numOptions[i]);
        area = area.getElementsByClassName("select")[0];

        var resourse = eval(numOptions[i]);

        for(var k = 0; k< resourse.length; k++) {//goes through json for catagory and populates options
            var obj = resourse[k];
                area.insertAdjacentHTML("beforeend",'<div class="option" onclick="selection(\''+(i)+'\','+obj.id+')" ><img src="/assets/customiser/textures/'+obj.texture+'" /><p>'+obj.name+'</p></div>');
        }
    }

}

function drawdisplay() {
    var area = document.getElementById("display");
    area.innerHTML = '<canvas id="render" width="320" height="620"></canvas><div class="select"><div class="option" onclick="displaySide()" ><img src="/assets/flip.png" /><p>front/back</p></div>    <div class="option" onclick="clearmem()" ><img src="/assets/clear.png" /><p>start again</p></div></div>';
    
}

function selection(name, ref) {//html refers catagory and id to here for update.
    //debugger;
    console.log(state);
    if (name == 0) {//special case for device
        state[0].id = ref;
        
        drawoptions();
    }else{
        
        state[state[0].id+1].selected[name-1] = ref;
        
    }

    update();
}

function update() {
    var element = document.getElementsByClassName("selected");
    for(var i =0;i<element.length;i) {
        element[i].classList.remove("selected");
    }

    element = document.getElementById("device");
    element = element.getElementsByClassName("option");
    element[state[0].id].className += " selected";

    var array = state[(state[0].id)+1].selected.slice();
    //array.pop();

    element = document.getElementById("options");
    element = element.getElementsByClassName("select");
    for (var i =1;i<=array.length;i++) {
        element[i].getElementsByClassName("option")[array[i-1]].className += " selected";
    }

    drawPhone();
    localStorage.setItem("options", JSON.stringify(state));
}

//not going to lie the JS rewrite has not improved my horrible code; one up point is that i actualy know what my code does now.

function displaySide() {
    front = !front;
    //console.log(front);
    drawPhone();
}

function clearmem() {
    localStorage.clear();
    location.reload(); 
}

function drawPhone() {
    var canvas = document.getElementById("render");
    var context = canvas.getContext("2d");

    canvas.height = window.innerHeight*0.7;
    canvas.width = (canvas.height/620)*320;

    var images = ["/assets/customiser/prime/backPanel/woodDark.png","/assets/customiser/prime/FrontPanel/metalBlack.jpg","/assets/customiser/prime/front.png"];

    for(var i = 0;i<images.length;i++) {
        var cheat = drawImage(canvas,images[i]);//the only correct variable name in this program.
        
        
    }

}

function drawImage(canvas,location) {
    var context = canvas.getContext("2d");
    var img = new Image;
    img.src = location;

    img.onload = function() {
        context.drawImage(img,0,0,canvas.width,canvas.height);
    }
    return true;
}