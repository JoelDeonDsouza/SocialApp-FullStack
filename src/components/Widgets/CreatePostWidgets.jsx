import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
// Components //
import FlexBetween from "../../components/Styles/FlexBetween.jsx";
import UserImg from "../../components/Styles/UserImg.jsx";
import WidgetWrapper from "../../components/Styles/WidgetWrapper.jsx";
// Img upload //
import Dropzone from "react-dropzone";
// Styles and constructors //
import {
  Box,
  Divider,
  Typography,
  InputBase,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
// Base url //
import baseUrl from "../../assets/URL/baseUrl.js";
// icon //
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  DeleteOutline,
  GifBoxOutlined,
  ImageOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";

const CreatePostWidgets = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [img, setImg] = useState(null);
  const [post, setPost] = useState("");
  // user id //
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  //   handle post //
  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (img) {
      formData.append("picture", img);
      formData.append("picturePath", img.name);
    }
    const res = await fetch(`${baseUrl}posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await res.json();
    dispatch(setPosts({ posts }));
    setImg(null);
    setPost("");
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImg image={picturePath} />
        <InputBase
          placeholder="Kick off typing..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            borderRadius: "2rem",
            padding: "0.8rem 2rem",
            backgroundColor: "#FFFFFF",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          borderRadius="5px"
          border={`1px solid #A2FF86`}
          marginTop="1rem"
          padding="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImg(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border="2px dashed #888888"
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!img ? (
                    <p>Add Image here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{img.name}</Typography>
                      <EditOutlinedIcon />
                    </FlexBetween>
                  )}
                </Box>
                {img && (
                  <IconButton
                    onClick={() => setImg(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutline />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}
      <Divider sx={{ margin: "1.25rem 0" }} />
      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: "#001C30" }} />
          <Typography
            color="#888"
            sx={{ "&:hover": { cursor: "pointer", color: "#0079FF" } }}
          >
            image
          </Typography>
        </FlexBetween>
        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: "#001C30" }} />
              <Typography
                color="#888"
                sx={{ "&:hover": { cursor: "pointer", color: "#0079FF" } }}
              >
                Clip
              </Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: "#001C30" }} />
          </FlexBetween>
        )}
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            backgroundColor: "#98EECC",
            borderRadius: "3rem",
            color: "#000000",
          }}
        >
          <Typography color="#000" fontSize="12px" fontWeight="700">
            Post
          </Typography>
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default CreatePostWidgets;
