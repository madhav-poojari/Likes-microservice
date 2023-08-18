# Likes-microservice
<br>
To Run the project
<br><br>

step 1 clone the repo<br>
step 2 cd ./Likes-microservice<br>
step 3 docker build -t my-node-app . <br>
step 4 docker-compose up --build<br>

<br>
the project uses postgre to store the like event<br>
and uses redis cache to store like count of a certain post<br>

![image](https://github.com/madhav-poojari/Likes-microservice/assets/88374622/a3013c67-77a4-4c24-938e-b5fa5a5d4837)

for ease of use added a little dummy data<br><br>

 The endpoints are :<br>
http://localhost:13000/allLikes
<br>
the above endpoint gets all the "like" event, which are stored as {_id,user_id,content_id} in the database

<br><br>
https://localhost:13000/addLike
<br>
{ "user_id":"kkdn8932n3290ewk9",
 "content_id":"Himachal-photo" 
 } 
<br>requires the above body
<br>saves the like event , aswell as updates the like_count of that post in cache<br>
<br><br>
https://localhost:13000/total-likes?content_id={content-id-goes-here}
<br>this returns the like count from cache, if not in cache then from db (updates the cache while doing so)
<br><br>
https://localhost:13000/hasliked?content_id={contentId-goes-here}&user_id={userId-goes-here}
<br>
checks from database if a certain user has liked a certain post
<br><br><br>
