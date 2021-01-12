var likes = [];

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

async function getComments(){
    let response = await fetch("https://jsonplaceholder.typicode.com/comments");
	if(response.ok){
		let json = await response.json();
		return json;
	}
}

async function addPosts(posts, users){
	var users = await getUsers();
	var posts = await getPosts();
	var pics = await getPictures();
	var comments = await getComments();	
	var feed = document.getElementsByClassName("middle");
	var res = "";
	for (var i = posts.length - 1; i >= 0; i--) {
		res += "<div class='post' id='post-"+i+"'>"
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
		var currComments = getRandom(comments, Math.floor(Math.random() * 5));
		res += "<div class='counts'><div class='like-count'>" + Math.round(Math.random()*100) +" Likes</div><div class='com-count'>" + currComments.length+" Comments</div></div>";
		res += "<hr> <div class='like-com'> <div class='like' onclick='addLike("+i+")'>Like</div><div class='com'><a style='color:black;' href='#com-"+i+"'>Comment</a></div> </div> <hr>"; 
		res += "<div class='comments-container' id='comments-container-"+i+"'>";
		for (var j = 0; j < currComments.length; j++) {
			res += "<div class=comment-container>";
			res += "<div class='post-user'> <img src='https://picsum.photos/300/200?random=" + j+"'alt='profile picture' class='prof-pic'>";
			res += "<div class='fullname'>"+users[j%10].name+ "</div></div>"
			res += "<div class='comment'>" + currComments[j].body+"</div></div>";
		}
		res += "</div>"
		res += `<form id="form_`+i+`" method="POST" name="data`+i+`" onsubmit="addComment(`+i+`); return false">
			<input type="text" id="com-`+i+`"class="com-field" name="comment" placeholder="Write a comment">
				</form>`;
		res += "</div>";
	}
	feed[0].innerHTML = res;

}

function addLike(index){
	var count = document.getElementById("post-"+index).getElementsByClassName("counts")[0].getElementsByClassName("like-count")[0];
	var like = document.getElementById("post-"+index).getElementsByClassName("like-com")[0].getElementsByClassName("like")[0];
	if(likes.includes(index)){
		like.style.color = "black";
		likes.splice(likes.indexOf(index),1);
		count.innerHTML = parseInt(count.innerHTML.split(" ")[0])-1+" Likes";
	}else{
		like.style.color = "blue";
		likes.push(index);
		count.innerHTML = parseInt(count.innerHTML.split(" ")[0])+1+" Likes";
	}
}

function addComment(index){
	var comments = document.getElementById("comments-container-"+index);
	var res = "";
	res += "<div class=comment-container>";
	res += "<div class='post-user'> <img src='http://newsbote.com/wp-content/uploads/2011/04/wolverine-origins-jackman-300x200.jpg'alt='profile picture' class='prof-pic'>";
	res += "<div class='fullname'>"+"Zura Khutsishvili"+ "</div></div>"
	res += "<div class='comment'>" + document.forms["data"+index]["comment"].value+"</div></div>";	
	comments.innerHTML += res; 
	document.forms["data"+index]["comment"].value = "";
	var count = document.getElementById("post-"+index).getElementsByClassName("counts")[0].getElementsByClassName("com-count")[0];
	count.innerHTML = parseInt(count.innerHTML.split(" ")[0])+1+" Comments";
}

async function addChatheads(posts, users){
	var users = await getUsers();
	var pics = await getPictures();
	var chatheads = document.getElementsByClassName("right");
	var res = "";
	for (var i = 5*users.length - 1; i >= 0; i--) {
		res += `<div class='chathead' onclick='openChat("`+users[i%10].name+`")'>`;
		res += "<div class='post-user'> <img src='https://picsum.photos/300/200?random="+ i +"'alt='profile picture' class='prof-pic'>";
		res += "<div class='fullname' style='font-weight:normal; font-size:small'>"+users[i%10].name+ "</div></div>";
		res += "</div>";
	}
	chatheads[0].innerHTML = res;
}

function openChat(fullname){
	var main = document.getElementsByClassName("container")[0];
	var res = "<div class='chat-container'><div class='fullname' onclick='closeChat()'>"+fullname+"</div><div class='chat'></div><div class=chat-text><input id='chat-txt' type='text' placeholder='Write a message'></div></div>"
	main.innerHTML += res;
}
function closeChat(){
	var chats = document.getElementsByClassName("chat-container");
	for (var i = chats.length - 1; i >= 0; i--) {
		chats[i].style.display = "none";
	}
}

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}