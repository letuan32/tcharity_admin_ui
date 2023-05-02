import {useNavigate} from "react-router-dom";
import {useState} from "react";


import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined, PaymentOutlined,
    ShareOutlined,
    RequestQuoteOutlined,
    PriceChangeOutlined, PriceCheckOutlined,
    VolunteerActivismOutlined, ApprovalOutlined, VerifiedOutlined, UnpublishedOutlined
} from "@mui/icons-material";

import {
    IconButton,
    Typography,
    useTheme,
    Box,
    useMediaQuery, Modal, Button, ListItem, ListItemAvatar, ListItemText, TextField, InputAdornment
} from "@mui/material";
import Carousel from 'react-material-ui-carousel'
import {fToNow, timeStampToDate} from "../../utils/formatDate";
import FlexBetween from "../CustomStyledComponents/FlexBetween";
import {updatePostApproveStatusAsync} from "../../apiService/baseApi";
import MediaCard from './MediaCard'
import MediaCarousel from "./MediaCarousel";
import Following from "../Following";
import PostAuthor from "../PostAuthor";

const VerifyPostWidget = ({
                              postId,
                              postUserId,
                              postAuthorUsername,
                              postAuthorEmail,
                              location,
                              caption,
                              mediaUrls,
                              documentUrls,
                              userProfilePhoto,
                              createdAt,
                              expectedAmount,
                              currency
                          }) => {
    const navigate = useNavigate();
    const [isLongCaption, setIsLongCaption] = useState(false);
    const isNonMobileScreens = useMediaQuery("(min-width: 800px)");
    const [approveMessage, setApproveMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    console.log('File: VerifyPostWidget.js, Line 48:  ');

    const handlePostApprove = async (isApprove) => {
        setLoading(true)
        if(isApprove === false && (approveMessage === null || approveMessage.trim() === ""))
        {
            setErrorMessage("Please enter a message for reject response")
            return;
        }

        await updatePostApproveStatusAsync({
            postId: parseInt(postId, 10),
            postApproveStatusEnum: isApprove ? 3 : 4,
            message: approveMessage ?? ""
        })
        setLoading(false)
    }

    const handleCaptionToggle = () => {
        setIsLongCaption(!isLongCaption)
    }


    return (
        <Box
            m="0 0 2rem 0"
            sx={{
                // backgroundColor: palette.background.alt,
                borderRadius: "0.75rem",
                padding: isNonMobileScreens ? "1.5rem 1.5rem 0.75rem 1.5rem" : "1.5rem 0"
            }}
        >

            <Box
                sx={{
                    padding: !isNonMobileScreens ? "0 0.75rem" : ""
                }}
            >
                <PostAuthor
                    // userEmail = {postAuthorEmail}
                />

                <Typography
                    // color={main}
                    sx={{mt: "1rem"}}>
                    {caption.length > 100 ? isLongCaption ? caption : `${caption.substring(0, 100)}...` : caption}
                </Typography>
                {caption.length > 100 ? (
                    <Typography
                        onClick={handleCaptionToggle}
                        sx={{
                            cursor: 'pointer',
                            "&:hover": {
                                // color: palette.light
                            }
                        }}
                        // color={medium}>
                        >
                        {isLongCaption ? 'View less' : 'view More'}
                    </Typography>
                ) : null}


            </Box>
            <Box>
                <MediaCarousel mediaUrls={mediaUrls}  />

            </Box>

            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton>
                            <RequestQuoteOutlined />
                        </IconButton>
                        <Typography>{expectedAmount} {currency}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton>
                            <PriceCheckOutlined />
                        </IconButton>
                        {/* TODO: Realtime */}
                        <Typography>1000 {currency}</Typography>
                    </FlexBetween>
                </FlexBetween>
            </FlexBetween>

            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton
                            onClick={() => handlePostApprove(true)}
                        >
                            <VerifiedOutlined />
                            <Typography>Approve</Typography>

                        </IconButton>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton
                            onClick={() => handlePostApprove(false)}
                        >
                            <UnpublishedOutlined />
                            <Typography>Reject</Typography>
                        </IconButton>
                    </FlexBetween>
                    {errorMessage && (
                        <p style={{ color: "red" }}>{errorMessage}</p>
                    )}
                </FlexBetween>
            </FlexBetween>
            <TextField
                name={"approveMessage"}
                value={approveMessage}
                label="Approve Message"
                type="text"
                variant="outlined"
                fullWidth
                onChange={(event) => setApproveMessage(event.target.value)}
             />
            <Box
                sx={{
                    padding: !isNonMobileScreens ? "0 0.75rem" : ""
                }}
            >
                <Typography
                    fontWeight="200"
                    fontSize="0.79rem"
                    marginBottom="1rem"
                >Posted {fToNow(createdAt)}</Typography>
            </Box>


        </Box>
    )
}

export default VerifyPostWidget
