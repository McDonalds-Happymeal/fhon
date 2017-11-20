var frontPanel = [
    {
        "id":0,
        "name":"Black Plastic",
        "price":0,
        "texture":"black.png"
    },
    {
        "id":1,
        "name":"Black Leather",
        "price":5,
        "texture":"leatherBlack.jpg"
    },
    {
        "id":2,
        "name":"Blue Leather",
        "price":5,
        "texture":"leatherBlue.jpg"
    },
    {
        "id":3,
        "name":"Red Leather",
        "price":5,
        "texture":"leatherRed.jpg"
    },
    {
        "id":4,
        "name":"Aluminium",
        "price":15,
        "texture":"metal_silver.jpg"
    },
]

var options = {
    "frontPanel":0,
    "backpanel":0
};

window.onload = function() {
    Populate("frontPanel",frontPanel);
}

function Populate(name,resourse) {
    var area = document.getElementById(name);
    area = area.getElementsByClassName("select")[0];

    for(var i = 0; i< resourse.length; i++) {
        var obj = resourse[i];
        if (obj.id==eval("options."+name)) {
            area.insertAdjacentHTML("beforeend","<div class='option selected'><img src='/assets/customiser/textures/"+obj.texture+"' /><p>"+obj.name+"</p></div>");
        }
        else {
            area.insertAdjacentHTML("beforeend",'<div class="option" onclick="selection(\''+name+'\','+obj.id+')" ><img src="/assets/customiser/textures/'+obj.texture+'" /><p>'+obj.name+'</p></div>');
        }
        
        console.log(eval("options."+name));
    }
    //area.insertAdjacentHTML("beforeend","<p>some test html</p>")
}

function selection(name, id) {
    console.log(eval("options."+name));
    eval("options."+name+"=id");
    //update();
}
