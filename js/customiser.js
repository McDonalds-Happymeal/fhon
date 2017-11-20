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

function Populate(location,resourse) {
    location = document.getElementById(location);
    location = location.getElementsByClassName("select")[0];

    for(var i = 0; i< resourse.length; i++) {
        var obj = resourse[i];
        if (obj.id===options.location) {
            location.insertAdjacentHTML("beforeend","<div class='option selected'><img src='/assets/customiser/textures/"+obj.texture+"' /></div>");
        }
        else {
            location.insertAdjacentHTML("beforeend","<div class='option'><img src='/assets/customiser/textures/"+obj.texture+"' /></div>");
        }
        
        console.log(obj.name);
    }
    location.insertAdjacentHTML("beforeend","<p>some test html</p>")
}