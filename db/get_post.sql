SELECT post_id,title,content,img_url,username,profile_pic FROM posts,users
WHERE post_id = $1
AND author_id = id;
