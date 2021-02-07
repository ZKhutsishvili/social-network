var likes = [];
var postIndex = 100;
var username = "Zura Khutsishvili";
function getName(){
	var username2 = document.forms["register-data"]["fullname"].value;
	if(username1 == ""){
		if(username2 != "")
			username = username2;
	}else{
		username = username1;
	}
}
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
	var feed = document.getElementsByClassName("posts-container");
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
		res += "<hr> <div class='like-com'> <div class='like' onclick='addLike("+i+")'>Like</div><div class='com' onclick='scrollCom("+i+")'>Comment</div> </div> <hr>"; 
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

function createPost(){
	var text = document.forms["post-data"]["text"].value;
	var image = document.forms["post-data"]["image"].value;
	document.forms["post-data"]["text"].value = "";
	document.forms["post-data"]["image"].value = "";
	if(image == "" && text == ""){
		return;
	}
	var posts = document.getElementsByClassName("posts-container")[0];
	var res = "<div class='post' id='post-"+postIndex+"'>";
	res += "<div class='post-user'> <img src='http://newsbote.com/wp-content/uploads/2011/04/wolverine-origins-jackman-300x200.jpg' alt='profile picture' class='prof-pic'>";
	res += "<div class='fullname'>"+username;
	var hour = new Date().getHours();
	var minute = new Date().getMinutes();
	var time = hour < 10 ? "0" + hour : hour;
	time += ":";
	time += minute < 10 ? "0" + minute : minute;
	res += "<br><span class='date'>" + time + "</span></div></div>";
	res += "<div class='post-title'>" + text + "</div>";
	if (image != ""){
		res += "<img src='" + image + "' class='post-pic' alt='" + text + "'>";
	}
	res += "<div class='counts'><div class='like-count'>0 Likes</div><div class='com-count'>0 Comments</div></div>";
	res += "<hr> <div class='like-com'> <div class='like' onclick='addLike("+postIndex+")'>Like</div><div class='com' onclick='scrollCom("+postIndex+")'>Comment</div> </div> <hr>"; 
	res += "<div class='comments-container' id='comments-container-"+postIndex+"'>";
	res += "</div>";
	res += `<form id="form_`+postIndex+`" method="POST" name="data`+postIndex+`" onsubmit="addComment(`+postIndex+`); return false">
		<input type="text" id="com-`+postIndex+`"class="com-field" name="comment" placeholder="Write a comment">
			</form>`;
	res += "</div>";
	posts.innerHTML = res + posts.innerHTML;
	postIndex++;
}

function scrollCom(index){
	var a = document.getElementById("com-"+index);
	// a.style.behavior = 'smooth';
	a.focus();
	a.scrollTop = a.scrollHeight;
	// window.scrollTo({top: a.scrollHeight, behavior: 'smooth'});
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
	if(document.forms["data"+index]["comment"].value == "") 
		return;
	res += "<div class=comment-container>";
	res += "<div class='post-user'> <img src='http://newsbote.com/wp-content/uploads/2011/04/wolverine-origins-jackman-300x200.jpg'alt='profile picture' class='prof-pic'>";
	res += "<div class='fullname'>"+username+ "</div></div>"
	res += "<div class='comment'>" + document.forms["data"+index]["comment"].value+"</div></div>";	
	comments.innerHTML += res; 
	document.forms["data"+index]["comment"].value = "";
	var count = document.getElementById("post-"+index).getElementsByClassName("counts")[0].getElementsByClassName("com-count")[0];
	count.innerHTML = parseInt(count.innerHTML.split(" ")[0])+1+" Comments";
}

async function addChatheads(){
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
	closeChats();
	var main = document.getElementById(fullname);
	main.style.display = "block";
}

function sendMessage(index){
	if(document.forms["chat-data-"+index]["message"].value == "") 
		return;
	var chat = document.getElementsByClassName("chat-container")[index].getElementsByClassName("chat")[0];
	chat.innerHTML += "<div><div class=sent-text>"+document.forms["chat-data-"+index]["message"].value+"</div></div>";
	chat.scrollTop = chat.scrollHeight;
	var myVar = setTimeout(() => {chat.innerHTML += "<div><div class=received-text>Random Text</div></div>"; chat.scrollTop = chat.scrollHeight;}, 1000);
	document.forms["chat-data-"+index]["message"].value = "";
}

async function createChats(){
	var users = await getUsers();
	var main = document.getElementsByClassName("chat-wrapper")[0];
	var res = "";
	for (var i = 0; i < users.length; i++) {
		var curr = "<div class='chat-container' id='"+users[i].name+"'><div class='fullname' onclick='closeChats()'>"+users[i].name
		+`</div><div class='chat'></div><div class=chat-text><form id="chat-form-"` + i + ` method="POST" name="chat-data-`+i+`" onsubmit="sendMessage(`+i+`); return false">
		<input id='chat-txt' name='message' type='text' placeholder='Write a message'></form></div></div>`;
		res += curr;
	}
	main.innerHTML = res;
	closeChats();
}

function closeChats(){
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