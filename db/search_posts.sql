SELECT post_id,title,content,img_url,username,profile_pic FROM posts,users
WHERE ($1 OR author_id != $3)
AND title LIKE $2
AND author_id = id;
