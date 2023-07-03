import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
// components //
import SinglePostWidgets from "./SinglePostWidgets";
// base Url //
import baseUrl from "../../assets/URL/baseUrl.js";

const PostsWidgets = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const res = await fetch(`${baseUrl}posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const res = await fetch(`${baseUrl}posts/${userId}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          name,
          location,
          description,
          picturePath,
          userPicturePath,
          likes,
        }) => (
          <SinglePostWidgets
            key={_id}
            postId={_id}
            userPostId={userId}
            name={name}
            location={location}
            description={description}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
          />
        )
      )}
    </>
  );
};

export default PostsWidgets;
