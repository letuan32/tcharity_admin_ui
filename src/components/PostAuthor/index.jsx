import {
    PersonAddOutlined,
    PersonRemoveOutlined
} from "@mui/icons-material";

import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {Box, IconButton, Typography, useTheme, CircularProgress, Skeleton} from "@mui/material";
import FlexBetween from '../CustomStyledComponents/FlexBetween';
import UserAvatar from '../CustomStyledComponents/UserAvatar';


const PostAuthor = () => {
    const userEmail = 'test@gmail.com';
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)


    const serverUrl =  process.env.REACT_APP_ENV === "Development" ? "https://localhost:7010/" : process.env.REACT_APP_API_GATEWAY

    // useEffect(() => {
    //     console.log('File: index.jsx, Line 24: wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww ');
    //     const getUser = async () => {
    //         const token = localStorage.getItem("token");
    //         const response = await fetch( `${serverUrl}identity/user?userEmail=${userEmail}`, {
    //             method: "GET",
    //             headers: { Authorization: `Bearer ${token}`}
    //         });
    //
    //         const responseData = await response.json();
    //         setUser(responseData)
    //         setLoading(false)
    //     }
    //
    //     setLoading(true)
    //     getUser();
    // });

    useEffect(() => {
            const getUser = async () => {
                const token = localStorage.getItem("token");
                const response = await fetch( `${serverUrl}identity/user?userEmail=${userEmail}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}`}
                });

                const responseData = await response.json();
                setUser(responseData)
                setLoading(false)
            }

            setLoading(true)
            getUser();
    },[])


    if(loading){
        return (
            <Box />
        )
    }
    return (
      <FlexBetween>
        <FlexBetween gap="1rem">
            <UserAvatar image={user.profilePicture} size="55px" />
          <Box
            onClick={() => {
              // navigate(`/profile${name !== username ? `/${  name}` : ''}`);
              navigate(0);
            }}
          >
            <Typography
              variant="h5"
              fontWeight="500"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
                {user.displayName}
            </Typography>
          </Box>
    </FlexBetween>
      </FlexBetween>

    )
}

export default PostAuthor