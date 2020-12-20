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

async function getPictures(){
    let response = await fetch("https://jsonplaceholder.typicode.com/photos");
	if(response.ok){
		let json = await response.json();
		return json;
	}

}

async function addPosts(posts, users){
	var users = await getUsers();
	var posts = await getPosts();
	var pics = await getPictures();
	var feed = document.getElementsByClassName("middle");
	var res = "";
	for (var i = posts.length - 1; i >= 0; i--) {
		res += "<div class='post'>"
		res += "<div class='post-user'> <img src='https://picsum.photos/300/200?random=" + i+"'alt='profile picture' class='prof-pic'>";
		res += "<div class='fullname'>"+users[i%10].name;
		var hour = new Date().getHours();
		var minute = new Date().getMinutes();
		var time = hour < 10 ? "0" + hour : hour;
		time += ":";
		time += minute < 10 ? "0" + minute : minute;
		res += "<br><span class='date'>" + time + "</span></div></div>";
		res += "<div class='post-title'>" + posts[i].title + "</div>";
		res += "<img src='https://picsum.photos/400/200?random=" + i + "' class='post-pic' alt='" + pics[i].title + "'>";
		res += "</div>";
	}
	feed[0].innerHTML = res;
}

async function addChatheads(posts, users){
	var users = await getUsers();
	var pics = await getPictures();
	var chatheads = document.getElementsByClassName("right");
	var res = "";
	for (var i = users.length - 1; i >= 0; i--) {
		res += "<div class='chathead'>"
		res += "<div class='post-user'> <img src='https://picsum.photos/300/200?random=" + i+"'alt='profile picture' class='prof-pic'>";
		res += "<div class='fullname'>"+users[i%10].name+ "</div></div>";
		res += "</div>";
	}
	chatheads[0].innerHTML = res;
}