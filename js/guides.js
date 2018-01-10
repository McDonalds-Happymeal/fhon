function update(file) {
        $.ajax({url: "/guides/"+file, success: function(result){
            $("#content").html(result);
        }});
}