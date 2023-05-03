import React, {useEffect, useMemo, useRef, useState} from "react";

import {
  Card, CardContent, Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery, useTheme, Button, TablePagination,
} from "@mui/material";
import {v4 as uuidv4} from "uuid";
import { ref, get, set, push, child, remove , onValue, off   } from "firebase/database";
import {timeStampToDate, timeStampToDateString} from "../utils/formatDate";
import VerifyPostWidget from "../components/posts/VerifyPostWidget";
import {realtimeDB} from "../firebase/firebase";
import setUpInterceptor from "../apiService/setupInterceptor";

const PostVerifyPage = () => {
  setUpInterceptor();
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);


  const isNonMobileScreens = useMediaQuery("(min-width: 800px)");
  const [selectPost, setSelectPost] = useState(null);
  const [posts, setPosts] = useState(null);
  const [inProcessPosts, setInProcessPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token") ?? "";

  const serverUrl =  process.env.REACT_APP_ENV === "Development" ? "https://localhost:7010/" : process.env.REACT_APP_API_GATEWAY
  const getPosts = async () => {
    const response = await fetch( `${serverUrl  }Post/un-approve`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}`}
    });

    const responseData = await response.json();
    setPosts(responseData.posts)
    setIsLoading(false)
  }

  const onPostSelect = (postId) => {
    if(selectPost !== null)
    {
      removePostInProcess(selectPost.id)
    }
    setSelectPost(posts.find((post) => post.id === postId));
    addPostInProcess(postId)
    localStorage.setItem("selectPostId", postId)
  }

  useEffect( () => {
    refreshSelectedPost();
    const requestsRef = ref(realtimeDB, 'approve-processing');
    onValue(requestsRef, (snapshot) => {
      const data = snapshot.val();
      const requestsData = data ? Object.values(data) : [];
      setInProcessPosts(requestsData);
    });
    getPosts();

    return () => {
      const selectedPostId = localStorage.getItem("selectPostId")
      off(requestsRef, null);
      if(selectedPostId === null) return;
      removePostInProcess(selectedPostId)
      localStorage.removeItem("selectPostId")

    }
  },[]);


  const addPostInProcess = (postId) => {
    const postsRef = ref(realtimeDB, "approve-processing");
    set(child(postsRef, postId.toString()), {
      postId: parseInt(postId, 10),
      status: "Processing"});
  }

  const removePostInProcess = (postId) => {
    const nodeRef = ref(realtimeDB, `approve-processing/${postId}`);
    remove(nodeRef)
        .then(() => {
          console.log("Node removed successfully");
        })
        .catch((error) => {
          console.log("Error removing node: ", error);
        });
  }

  const refreshSelectedPost = () => {
    const selectedPostId = localStorage.getItem("selectPostId")
    if(selectedPostId === null) return;
    removePostInProcess(selectedPostId)
    localStorage.removeItem("selectPostId")
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  if(isLoading){
    return  Array.from(new Array(3)).map((el,index) => (<Box key={index}/>)
    )
  }


  return (
      <Box>
        <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="0.5rem"
        >
          <Box
              flexBasis={isNonMobileScreens ? "42%" : undefined}
              mt={isNonMobileScreens ? undefined : "2rem"}
          >
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h3">Pending Post for Verification</Typography>
                <Box
                    sx={{
                      overflow: {
                        xs: "auto",
                        sm: "unset",
                      },
                    }}
                >
                  <Table
                      aria-label="simple table"
                      sx={{
                        mt: 3,
                        whiteSpace: "nowrap",
                      }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography color="textSecondary" variant="h6">
                            Create by User
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="h6">
                            Submit on
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="h6">
                            Category
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography color="textSecondary" variant="h6">
                            Amount
                          </Typography>
                        </TableCell>

                        <TableCell align="right">
                          <Typography color="textSecondary" variant="h6">
                            Status
                          </Typography>
                        </TableCell>


                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {posts.map((post) => (
                          <TableRow key={post.id}>
                            <TableCell>
                              <Typography
                                  variant="h6"
                                  sx={{
                                    fontWeight: "600",
                                  }}
                              >
                                {post.author.email}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography color="textSecondary" variant="h6">
                                {timeStampToDateString(post.createdAt)}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography color="textSecondary" variant="h6">
                                Financial Request
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="h6">{post.expectedAmount} {post.currency}</Typography>
                            </TableCell>

                            <TableCell align="right">
                              <Typography variant="h6">{post.approveStatus}</Typography>
                            </TableCell>

                            <TableCell align="right">
                              {selectPost !== null && selectPost.id === post.id ? (
                                  <Button
                                      disabled
                                      sx={{ pl: "4px", pr: "4px", color: "#000000" }}
                                      variant="h6"
                                  >
                                    Selected
                                  </Button>
                              ) : inProcessPosts?.find((postInProcess) => postInProcess.postId === post.id) ? (
                                  <Button
                                      disabled
                                      sx={{ pl: "4px", pr: "4px", color: "#000000" }}
                                      variant="h6"
                                  >
                                    {inProcessPosts?.find((postInProcess) => postInProcess.postId === post.id).status}
                                  </Button>
                              ) : (
                                  <Button
                                      sx={{
                                        pl: "4px",
                                        pr: "4px",
                                        backgroundColor: "primary.main",
                                        color: "#fff",
                                      }}
                                      variant="h6"
                                      onClick={() => {
                                        onPostSelect(post.id);
                                      }}
                                  >
                                    Process
                                  </Button>
                              )}
                            </TableCell>

                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={posts.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
          {selectPost !== null ? (
              <Box
                  flexBasis={isNonMobileScreens ? "100%" : undefined}
                  mt={isNonMobileScreens ? undefined : "2rem"}
              >
                <VerifyPostWidget
                    key={uuidv4()}
                    postId={selectPost.id}
                    postUserId={selectPost?.userId}
                    postAuthorUsername={selectPost.author.displayName}
                    postAuthorEmail={selectPost.author.email}
                    location={selectPost.location}
                    caption={selectPost.content}
                    mediaUrls={selectPost.mediaUrls}
                    documentUrls={selectPost.documentUrls}
                    userProfilePhoto={selectPost.author.avatarUrl}
                    createdAt={timeStampToDate(selectPost.createdAt)}
                    expectedReceivedDate={timeStampToDate(selectPost.expectedReceivedDate)}
                    expectedAmount={selectPost.expectedAmount}
                    currency={selectPost.currency}
                 />
              </Box>
          ) : <Box
              flexBasis={isNonMobileScreens ? "42%" : undefined}
              mt={isNonMobileScreens ? undefined : "2rem"}
          >
            <Typography variant="h5" style={{ fontSize: "24px", textAlign: "center" }}>Select post to process</Typography>
          </Box>}
        </Box>
      </Box>
  );
};

export default PostVerifyPage;
