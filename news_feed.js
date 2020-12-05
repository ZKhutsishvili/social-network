async function getPosts(){
	let response = await fetch("https://jsonplaceholder.typicode.com/posts");
	if(response.ok){
		let json = await response.json();
		return json;
	}
}

async function getUsers(){
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
	if(response.ok){
		let json = await response.json();
		return json;
	}

}

async function addPosts(posts, users){
	users = await getUsers();
	posts = await getPosts();
	var feed = document.getElementsByClassName("middle");
	var res = "";
	for (var i = posts.length - 1; i >= 0; i--) {
		res += "<div class='post'>"
		res += "<div class='post-user'>" +users[i%10].name+ "</div>";
		res += "<div class='post-title'>" + posts[i].title + "</div>";
		res += "</div>";
	}
	feed[0].innerHTML = res;
}