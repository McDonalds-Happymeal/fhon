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
        "price":0.99,
        "texture":"leatherBlack.jpg"
    },
    {
        "id":2,
        "name":"Blue Leather",
        "price":0.99,
        "texture":"leatherBlue.jpg"
    },
    {
        "id":3,
        "name":"Red Leather",
        "price":0.99,
        "texture":"leatherRed.jpg"
    },
    {
        "id":4,
        "name":"Aluminium",
        "price":2.99,
        "texture":"metal_silver.jpg"
    },
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
        "price":4.99,
        "texture":"leatherBlack.jpg"
    },
    {
        "id":2,
        "name":"Blue Leather",
        "price":4.99,
        "texture":"leatherBlue.jpg"
    },
    {
        "id":3,
        "name":"Red Leather",
        "price":4.99,
        "texture":"leatherRed.jpg"
    },
    {
        "id":4,
        "name":"Aluminium",
        "price":9.99,
        "texture":"metal_silver.jpg"
    },
]

var options = [
    {
        "name":"frontPanel",
        "selected":0
    },
    {
        "name":"backPanel",
        "selected":0
    },
]

window.onload = function() {
    Populate("frontPanel",frontPanel);
    Populate("backPanel",backPanel);
}

function Populate(name,resourse) {
    var area = document.getElementById(name);
    area = area.getElementsByClassName("select")[0];

    for(var i = 0; i< resourse.length; i++) {
        var obj = resourse[i];
            area.insertAdjacentHTML("beforeend",'<div class="option selected" onclick="selection(\''+name+'\','+obj.id+')" ><img src="/assets/customiser/textures/'+obj.texture+'" /><p>'+obj.name+'</p></div>');
        
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
    //remove active tag from all selection and add active to location.id
}

function update() {
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