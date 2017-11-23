//This is the most disgusting code file i have ever made. it works; but at what cost.

var device = [
    {
        "id":0,
        "name":"Prime",
        "price":200,
        "texture":"prime.png"
    },
]

var frontPanel = [
    {
        "id":0,
        "name":"Black Plastic",
        "price":0,
        "texture":"black.png"
    },
    {
        "id":1,
        "name":"Aluminium",
        "price":2.99,
        "texture":"metal_silver.jpg"
    },
    {
        "id":2,
        "name":"Titanium",
        "price":2.99,
        "texture":"metalBlack.jpg"
    },
    {
        "id":3,
        "name":"Mahogony",
        "price":2.99,
        "texture":"waveRed.png"
    },
    {
        "id":4,
        "name":"Oak",
        "price":2.99,
        "texture":"woodDark.jpg"
    },
    {
        "id":5,
        "name":"Pine",
        "price":2.99,
        "texture":"woodYellow.jpg"
    }

]

var backPanel = [
    {
        "id":0,
        "name":"Black Plastic",
        "price":0,
        "texture":"black.png"
    },
    {
        "id":1,
        "name":"Black Leather",
        "price":2.99,
        "texture":"leatherBlack.jpg"
    },
    {
        "id":2,
        "name":"Blue Leather",
        "price":2.99,
        "texture":"leatherBlue.jpg"
    },
    {
        "id":3,
        "name":"Red Leather",
        "price":2.99,
        "texture":"leatherRed.jpg"
    },
    {
        "id":4,
        "name":"Aluminium",
        "price":9.99,
        "texture":"metal_silver.jpg"
    },
    {
        "id":5,
        "name":"Titanium",
        "price":9.99,
        "texture":"metalBlack.jpg"
    },
    {
        "id":6,
        "name":"Maghogony",
        "price":4.99,
        "texture":"waveRed.png"
    },
    {
        "id":7,
        "name":"Oak",
        "price":4.99,
        "texture":"woodDark.jpg"
    },
    {
        "id":8,
        "name":"Pine",
        "price":4.99,
        "texture":"woodYellow.jpg"
    },
]

var options = [
    {
        "name":"device",
        "selected":0
    },
    {
        "name":"frontPanel",
        "selected":0
    },
    {
        "name":"backPanel",
        "selected":0
    },
]

var price = 0;

window.onload = function() {
    Populate("frontPanel",frontPanel);
    Populate("backPanel",backPanel);
    Populate("device",device);

    update();
}

function Populate(name,resourse) {
    var area = document.getElementById(name);
    area = area.getElementsByClassName("select")[0];

    for(var i = 0; i< resourse.length; i++) {
        var obj = resourse[i];
            area.insertAdjacentHTML("beforeend",'<div class="option" onclick="selection(\''+name+'\','+obj.id+')" ><img src="/assets/customiser/textures/'+obj.texture+'" /><p>'+obj.name+'</p></div>');
        console.log(eval("options."+name));
    }
    //area.insertAdjacentHTML("beforeend","<p>some test html</p>")
}

function selection(name, id) {
    for(var i =0;i<options.length;i++) {
        if(options[i].name==name) {
            options[i].selected=id;
        }
    }
    console.log(options);
    eval("options."+name+"=id");
    update();
}

function update() {
    price = 0;
    var element = document.getElementsByClassName("selected");
    for(var i =0;i<element.length;i) {
        element[i].classList.remove("selected");
    }
    var obj;
    for(var i =0; i<options.length;i++) {
        obj = document.getElementById(options[i].name);
        obj = obj.getElementsByClassName("option")[options[i].selected];
        obj.className += " selected";
    }
}