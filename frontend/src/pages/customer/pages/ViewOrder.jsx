import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Card, IconButton, Menu, MenuItem, Rating, TextField, Typography } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { addToCart, underControl } from '../../../redux/userSlice';
import { BasicButton, GreenButton } from '../../../utils/buttonStyles';
import { getProductDetails, updateStuff } from '../../../redux/userHandle';
import Popup from '../../../components/Popup';
import { generateRandomColor, timeAgo } from '../../../utils/helperFunctions';

const ViewOrder = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const productID = params.id;

    const { currentUser, currentRole, productDetails, loading, status, error, responseReview, responseDetails } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getProductDetails(productID));
    }, [productID, dispatch]);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const [anchorElMenu, setAnchorElMenu] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorElMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    };

    const handleRatingChange = (event, newRating) => {
        setRating(newRating);
    };

    const deleteHandler = (reviewId) => {
        const fields = { reviewId };

        dispatch(updateStuff(fields, productID, "deleteProductReview"));
    };

    const reviewer = currentUser && currentUser._id

    const handleSubmit = (event) => {
        event.preventDefault();

        if (rating === 0) {
            setMessage("Please select a rating.");
            setShowPopup(true);
        } else {
            const fields = { rating, comment, reviewer };
            dispatch(updateStuff(fields, productID, "addReview"));
            setRating(0);
            setComment('');
        }
    };

    useEffect(() => {
        if (status === "updated") {
            dispatch(getProductDetails(productID));
            dispatch(underControl());
        } else if (responseReview) {
            setMessage("You have already submitted a review for this product.");
            setShowPopup(true);
        } else if (error) {
            setMessage("Network Error");
            setShowPopup(true);
        }
    }, [dispatch, responseReview, productID, status, error]);

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {
                        responseDetails ?
                            <div>Product not found</div>
                            :
                            <>
                                <ProductContainer>
                                    <ProductImage src={productDetails && productDetails.productImage} alt={productDetails && productDetails.productName} />
                                    <ProductInfo>
                                        <ProductName>{productDetails && productDetails.productName}</ProductName>
                                        <PriceContainer>
                                            <PriceCost>₹{productDetails && productDetails.price && productDetails.price.cost}</PriceCost>
                                            <PriceMrp>₹{productDetails && productDetails.price && productDetails.price.mrp}</PriceMrp>
                                            <PriceDiscount>{productDetails && productDetails.price && productDetails.price.discountPercent}% off</PriceDiscount>
                                        </PriceContainer>
                                        <Description>{productDetails && productDetails.description}</Description>
                                        <ProductDetails>
                                            <p>Category: {productDetails && productDetails.category}</p>
                                            <p>Subcategory: {productDetails && productDetails.subcategory}</p>
                                        </ProductDetails>
                                    </ProductInfo>
                                </ProductContainer>

                                {
                                    currentRole === "Customer" &&
                                    <>
                                        <ButtonContainer>
                                            <BasicButton
                                                onClick={() => dispatch(addToCart(productDetails))}
                                            >
                                                Add to Cart
                                            </BasicButton>
                                        </ButtonContainer>

                                        <ReviewForm onSubmit={handleSubmit}>
                                            <ReviewWritingContainer>
                                                <Typography variant="h5" color="#2c3e50">Write a Review</Typography>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '600px' }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                        <Typography>Your Rating:</Typography>
                                                        <Rating
                                                            name="rating"
                                                            value={rating}
                                                            onChange={handleRatingChange}
                                                            size="large"
                                                        />
                                                    </Box>
                                                    <TextField
                                                        label="Your Review"
                                                        variant="outlined"
                                                        multiline
                                                        rows={4}
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                        required
                                                        fullWidth
                                                    />
                                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                        <GreenButton type="submit">
                                                            Submit Review
                                                        </GreenButton>
                                                    </Box>
                                                </Box>
                                            </ReviewWritingContainer>
                                        </ReviewForm>
                                    </>
                                }
                                <ReviewWritingContainer>
                                    <Typography variant="h4">Customer Reviews</Typography>
                                </ReviewWritingContainer>

                                {productDetails.reviews && productDetails.reviews.length > 0 ? (
                                    <ReviewContainer>
                                        {productDetails.reviews.map((review, index) => (
                                            <ReviewCard key={index}>
                                                <ReviewCardDivision>
                                                    <Avatar 
                                                        sx={{ 
                                                            width: "50px", 
                                                            height: "50px", 
                                                            backgroundColor: generateRandomColor(review._id),
                                                            fontSize: "1.2rem",
                                                            fontWeight: "600"
                                                        }}
                                                    >
                                                        {String(review.reviewer.name).charAt(0)}
                                                    </Avatar>
                                                    <ReviewDetails>
                                                        <Typography variant="h6">{review.reviewer.name}</Typography>
                                                        <Typography className="timestamp">
                                                            {timeAgo(review.date)}
                                                        </Typography>
                                                        <Rating 
                                                            value={review.rating} 
                                                            readOnly 
                                                            size="small"
                                                            sx={{ 
                                                                color: "#ffc107",
                                                                '& .MuiRating-iconFilled': {
                                                                    filter: 'drop-shadow(0 0 1px rgba(0,0,0,0.2))'
                                                                }
                                                            }}
                                                        />
                                                        <Typography className="comment">{review.comment}</Typography>
                                                    </ReviewDetails>
                                                    {review.reviewer._id === reviewer && (
                                                        <Box>
                                                            <IconButton 
                                                                onClick={handleOpenMenu}
                                                                sx={{ 
                                                                    color: '#6c757d',
                                                                    '&:hover': {
                                                                        color: '#2c3e50',
                                                                        background: '#f8f9fa'
                                                                    }
                                                                }}
                                                            >
                                                                <MoreVert />
                                                            </IconButton>
                                                            <Menu
                                                                anchorEl={anchorElMenu}
                                                                open={Boolean(anchorElMenu)}
                                                                onClose={handleCloseMenu}
                                                                PaperProps={{
                                                                    elevation: 3,
                                                                    sx: {
                                                                        borderRadius: '8px',
                                                                        minWidth: '120px'
                                                                    }
                                                                }}
                                                            >
                                                                <MenuItem onClick={handleCloseMenu}>
                                                                    <Typography>Edit</Typography>
                                                                </MenuItem>
                                                                <MenuItem 
                                                                    onClick={() => {
                                                                        deleteHandler(review._id);
                                                                        handleCloseMenu();
                                                                    }}
                                                                    sx={{ color: '#dc3545' }}
                                                                >
                                                                    <Typography>Delete</Typography>
                                                                </MenuItem>
                                                            </Menu>
                                                        </Box>
                                                    )}
                                                </ReviewCardDivision>
                                            </ReviewCard>
                                        ))}
                                    </ReviewContainer>
                                )
                                    :
                                    <ReviewWritingContainer>
                                        <Typography variant="h6" color="#7f8c8d">
                                            No Reviews Found. Be the first to review this product.
                                        </Typography>
                                    </ReviewWritingContainer>
                                }
                            </>
                    }
                </>
            }
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ViewOrder;

const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2rem auto;
    max-width: 1200px;
    padding: 2rem;
    gap: 3rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    
    @media (min-width: 768px) {
        flex-direction: row;
        align-items: flex-start;
    }
`;

const ProductImage = styled.img`
    width: 100%;
    max-width: 400px;
    height: auto;
    object-fit: contain;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    padding: 1rem;
    background: #f8f9fa;
    
    @media (min-width: 768px) {
        width: 40%;
    }
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    flex: 1;
    padding: 1rem;
`;

const ProductName = styled.h1`
    font-size: 2.2rem;
    color: #1a1a1a;
    font-weight: 600;
    line-height: 1.3;
`;

const PriceContainer = styled.div`
    display: flex;
    align-items: baseline;
    gap: 1.2rem;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 8px;
`;

const PriceMrp = styled.p`
    font-size: 1.2rem;
    text-decoration: line-through;
    color: #6c757d;
`;

const PriceCost = styled.h3`
    font-size: 2.2rem;
    color: #2c3e50;
    font-weight: 700;
`;

const PriceDiscount = styled.p`
    font-size: 1rem;
    color: #198754;
    font-weight: 600;
    background-color: #e8f5e9;
    padding: 0.4rem 1rem;
    border-radius: 20px;
`;

const Description = styled.p`
    margin: 1rem 0;
    line-height: 1.6;
    color: #34495e;
`;

const ProductDetails = styled.div`
    padding: 1rem 0;
    border-top: 1px solid #eee;
    
    p {
        margin: 0.5rem 0;
        color: #34495e;
        font-size: 1rem;
        
        span {
            font-weight: 500;
            color: #2c3e50;
        }
    }
`;

const ButtonContainer = styled.div`
    margin: 2rem auto;
    max-width: 800px;
    padding: 0 2rem;
    display: flex;
    gap: 1rem;
    justify-content: center;

    button {
        min-width: 160px;
        padding: 0.8rem 1.5rem;
        font-weight: 500;
        transition: all 0.3s ease;

        &:hover {
            transform: translateY(-2px);
        }
    }
`;

const ReviewForm = styled.form`
    max-width: 800px;
    margin: 3rem auto;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
`;

const ReviewWritingContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;

    h4 {
        color: #2c3e50;
        margin-bottom: 1rem;
    }
`;

const ReviewContainer = styled.div`
    max-width: 800px;
    margin: 0 auto 4rem;
    padding: 0 2rem;
`;

const ReviewCard = styled(Card)`
    && {
        background: white;
        margin-bottom: 1.5rem;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        transition: all 0.3s ease;
        border: 1px solid #eef0f2;
        
        &:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }
    }
`;

const ReviewCardDivision = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
`;

const ReviewDetails = styled.div`
    flex: 1;
    
    h6 {
        font-size: 1.1rem;
        font-weight: 600;
        color: #1a1a1a;
        margin-bottom: 0.5rem;
    }
    
    .timestamp {
        color: #6c757d;
        font-size: 0.9rem;
        margin-bottom: 1rem;
    }
    
    .comment {
        color: #4a4a4a;
        line-height: 1.6;
        margin-top: 0.8rem;
    }
`;