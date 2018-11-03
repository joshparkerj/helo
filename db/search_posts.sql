SELECT * FROM posts
WHERE ($1 OR author_id != $3)
AND title LIKE $2;
