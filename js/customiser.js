// v2.0 WOO!


//defaults is data uploaded to users cache if they dont already have data.
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
    //global for my sanity.


    //console.log(options);

    drawoptions();//draws ui for user input
    drawdisplay();//draws area that phone is rendered in.
    update();//updates ui to show selected options
    drawPhone();//renders phone
}



//generates UI for customiser
function drawoptions() {
    var area = document.getElementById("options");

    area.innerHTML = '<div id="device"><h3>device</h3><div class="select"></div></div>';
    //replace html warning javascript not working with basic outline divs.


    var numOptions = (device[state[0].id]).options.slice();//TIL javascript always copies by value except array. this was a tricky one to find.
    //console.log(numOptions);

    //loops through fields required and deiplays..
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
    //just draws canvas and right side options such as reset and switch sides.
}

function selection(name, ref) {//html refers catagory and id to here for update.
    //debugger;
    console.log(state);
    if (name == 0) {//special case for device
        state[0].id = ref;
        
        drawoptions();//has to redraw options as some devices show diffrent fields.
    }else{
        
        state[state[0].id+1].selected[name-1] = ref;//just sets state (status of cusotmiser) to selected options.
        //selection is called from HTML on click functions.
    }

    update();//as selection is made ui needs updating with changes.
}

function update() {//updates global state of customiser and ui display.
    var element = document.getElementsByClassName("selected");
    for(var i =0;i<element.length;i) {
        element[i].classList.remove("selected");//removes selected class to remove css selection style.
    }

    element = document.getElementById("device");
    element = element.getElementsByClassName("option");
    element[state[0].id].className += " selected";//adds selcted class for css to apply class special case for device.

    var array = state[(state[0].id)+1].selected.slice();
    //array.pop();
    if (state[0].id==2) {
        array.pop();//pops for special case od device id 2
    }

    element = document.getElementById("options");
    element = element.getElementsByClassName("select");
    for (var i =1;i<=array.length;i++) {//readds selected class to user selected areas;
        element[i].getElementsByClassName("option")[array[i-1]].className += " selected";
    }

    drawPhone();//redraw phone with updated state.
    localStorage.setItem("options", JSON.stringify(state));//stores changes to local storage.
}

//not going to lie the JS rewrite has not improved my horrible code; one up point is that i actualy know what my code does now.

function displaySide() {//simple function called from HTML on click.
    front = !front;
    //console.log(front);
    drawPhone();//redraw phone from new angle.
}

function clearmem() {//simple function called from HTML on click.
    localStorage.clear();//clears local storage and reloads page so a new clean storage is made.
    location.reload(); 
}

function loadImage(imagePath) {//function for loading images all at once and returning to caller once required.
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.addEventListener("load", () => {//Gonna be honest not 100% honest with promise; but it works.
            resolve(image);
        });
        image.addEventListener("error", (err) => {
            reject(err);
        });
        image.src = imagePath;
    });
}

function drawPhone() {
    var canvas = document.getElementById("render");
    var context = canvas.getContext("2d");//setup canvas.

    canvas.height = window.innerHeight*0.7;//special heights to make height more responsive to screen size.
    canvas.width = (canvas.height/620)*320;
    
    var route = "/assets/customiser/"+device[state[0].id].name+"/";//generic route that all files use.

    var sources = [route+"back.png"];
    sources.push(route+"backPanel/"+backPanel[state[state[0].id+1].selected[1]].texture);
    sources.push(route+"FrontPanel/"+frontPanel[state[state[0].id+1].selected[0]].texture)
    sources.push(route+"front.png");//each image loaded and pushed to array.

    if (!front) {sources.reverse();}//switches angle device is hsown with a simple reverse of an array.

    Promise//promise function that loads images and then only fires once all images are loaded to ensure images displat in right order.
    .all(sources.map(i => loadImage(i)))
    .then((images) => {
        images.forEach((image) => {
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
        });
    }).catch((err) => {
        console.error(err);//the only error state in whole code because promise gets a bit funny without it.
    });
}


//And thats all folks.

/*

  JJJJJJ       AAA      VV    VV     AAA       SSSSSSS   CCCCCC  RRRRRR   IIIIII  PPPPP   TTTTTTTT
      JJ      AA AA     VV    VV    AA AA     SS        CC       RR  RRR    II    PP  PP     TT
      JJ     AA   AA     VV  VV    AA   AA     SSSSSS   CC       RRRRRR     II    PPPPP      TT
  JJ  JJ    AAAAAAAAA     VVVv    AAAAAAAAA         SS  CC       RR RR      II    PP         TT
   JJJJ     AA     AA      VV     AA     AA   SSSSSSS    CCCCCC  RR  RR   IIIIII  PP         TT
    
                                      IT's Just like JAVA
                         I dont like either, yet i keep going back to them.


*/