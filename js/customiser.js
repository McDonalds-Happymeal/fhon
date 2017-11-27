// v2.0 WOO!

var defaults = [
    {
        "id":1,
        "device":"Prime",
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

window.onload = function() {
    initialise();
}

function initialise() {
    if (localStorage.getItem("options")===null) {
        console.log("hello");
        localStorage.setItem("options", JSON.stringify(defaults));
    }

    var options = JSON.parse(localStorage.getItem("options"));

    console.log(options);
    
    

}