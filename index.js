import { postsData } from './data.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';




document.addEventListener("click",function(e){
    if(e.target.dataset.like){
        handleLikeClick(e.target.dataset.like);
    }
    else if(e.target.dataset.repost){
        handleRepostClick(e.target.dataset.repost);
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply);
    }
    else if(e.target.id === "post-button"){
        handlePostBtnClick();
    }
});

function handleLikeClick(postID){
    const targetPostObj = postsData.filter(function(post){
        return post.uuid === postID;
    })[0];

    if(targetPostObj.isLiked){
        targetPostObj.likes--;    
    }
    else{
        targetPostObj.likes++;  
    }

    targetPostObj.isLiked = !targetPostObj.isLiked;

    
    render();
};

function handleRepostClick(postID){
    const targetPostObj = postsData.filter(function(post){
        return post.uuid === postID;
    })[0];

    if(targetPostObj.isReposted){
        targetPostObj.reposts--;
    }
    else{
        targetPostObj.reposts++;
    }

    targetPostObj.isReposted = !targetPostObj.isReposted;

    render();

};

function handleReplyClick(replyID){
    document.getElementById(`replies-${replyID}`).classList.toggle('hidden');
}

function handlePostBtnClick(){

    const inputBox = document.getElementById('input-box');

    if(inputBox.value){
        postsData.unshift({
        
                handle:`@Shikhar_Verma_01`,
                profilePic:`images/2c56ebc89b30b98254177b1bb65b64cb.jpg`,
                likes:0,
                reposts:0,
                postText: inputBox.value,
                replies: [],
                isLiked: false,
                isReposted: false,
                uuid: uuidv4()
        
        });
    }
    render();
   inputBox.value="";
};

function getFeedHtml(){

    let feedHtml = ""; 
    postsData.forEach(function(post){
        let likeIconClass = "";
        let repostIconClass = "";

        if(post.isLiked){
            likeIconClass = "liked";
        }
        else if(post.isReposted){
            repostIconClass = "reposted";
        }

        let repliesHTML = "";

        if(post.replies.length > 0){
            post.replies.forEach(function(reply){
                repliesHTML += 
                                `<div class="reply-container" id="post">
                                    <img src="${reply.profilePic}" class="post-img" alt="profile picture">
                                    <div class="post-content">
                                        <h3 class= "post-user-name" id="user-name">${reply.handle}</h3>
                                        <p  class="post-paragraph" id="post-paragrapgh">${reply.postText}</p>
                                   </div>
                                </div>`
                                    
                                    
            });

        };

        feedHtml += 
                   `<div class="post-container" id="post">
                        <img src="${post.profilePic}" class="post-img" alt="profile picture">
                        <div class="post-content">
                            <h3 class= "post-user-name" id="user-name">${post.handle}</h3>
                            <p  class="post-paragraph" id="post-paragrapgh">${post.postText}</p>
                            <div class="post-numbers">
                                <span class="post-number">
                                    <i class="fa-regular fa-comment-dots" data-reply="${post.uuid}"></i>
                                    ${post.replies.length}
                                </span>
                                <span class="post-number">
                                <i class="fa-solid fa-heart ${likeIconClass}" data-like="${post.uuid}"></i>
                                    ${post.likes}
                                </span>
                                <span class="post-number">
                                    <i class="fa-solid fa-retweet ${repostIconClass}" data-repost="${post.uuid}"></i>
                                    ${post.reposts}
                                </span>  
                            </div>   
                        </div>
                    </div>
                    <div class="hidden" id="replies-${post.uuid}">
                        ${repliesHTML}
                    </div>                            
                    <hr class="post-hr">
                    `
    });

    return feedHtml;
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml(); 
}

render();