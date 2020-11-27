function getPosts(){
	$.ajax({
        url: "https://jsonplaceholder.typicode.com/posts",
        type: 'GET',
        dataType: 'json', // added data type
        success: function(res) {
        	addPosts(res);
        }
    });
}

function getUsers(){
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/users",
        type: 'GET',
        dataType: 'json', // added data type
        success: function(res) {
        	return res;
        }
    });
}

function addPosts(posts){
	var feed = document.getElementsByClassName("middle");
	var res = "";
	for (var i = posts.length - 1; i >= 0; i--) {
		res += "<div class='post'>"
		res += posts[i].title + "<br>";
		res += posts[i].body;
		res += "</div>";
	}
	feed[0].innerHTML = res;
}