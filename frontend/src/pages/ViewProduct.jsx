import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userSlice';
import styled from 'styled-components';
import { BasicButton } from '../utils/buttonStyles';
import { getProductDetails, updateStuff } from '../redux/userHandle';
import { Avatar, Card, IconButton, Menu, MenuItem, Typography, Rating } from '@mui/material';
import { generateRandomColor, timeAgo } from '../utils/helperFunctions';
import { MoreVert } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';

const ViewProduct = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const productID = params.id;


    const { currentUser, currentRole, productDetails, loading, responseDetails } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getProductDetails(productID));
    }, [productID, dispatch]);


    const [anchorElMenu, setAnchorElMenu] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorElMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    };

    const deleteHandler = (reviewId) => {
        const fields = { reviewId };

        dispatch(updateStuff(fields, productID, "deleteProductReview"));
    };

    const reviewer = currentUser && currentUser._id

    return (
        <PageContainer>
            {loading ? (
                <LoadingContainer>
                    <CircularProgress />
                </LoadingContainer>
            ) : (
                <>
                    {responseDetails ? (
                        <EmptyStateContainer>
                            <Typography variant="h5">Product not found</Typography>
                        </EmptyStateContainer>
                    ) : (
                        <>
                            <ProductContainer>
                                <ImageSection>
                                    <ProductImage src={productDetails?.productImage} alt={productDetails?.productName} />
                                </ImageSection>
                                <ProductInfo>
                                    <ProductName>{productDetails?.productName}</ProductName>
                                    <PriceContainer>
                                        <PriceCost>₹{productDetails?.price?.cost}</PriceCost>
                                        <PriceMrp>₹{productDetails?.price?.mrp}</PriceMrp>
                                        <PriceDiscount>{productDetails?.price?.discountPercent}% off</PriceDiscount>
                                    </PriceContainer>
                                    <Description>{productDetails?.description}</Description>
                                    <ProductDetails>
                                        <DetailRow>
                                            <DetailLabel>Category</DetailLabel>
                                            <DetailValue>{productDetails?.category}</DetailValue>
                                        </DetailRow>
                                        <DetailRow>
                                            <DetailLabel>Subcategory</DetailLabel>
                                            <DetailValue>{productDetails?.subcategory}</DetailValue>
                                        </DetailRow>
                                    </ProductDetails>
                                    {currentRole === "Customer" && (
                                        <ActionButton
                                            onClick={() => dispatch(addToCart(productDetails))}
                                        >
                                            Add to Cart
                                        </ActionButton>
                                    )}
                                </ProductInfo>
                            </ProductContainer>

                            <ReviewSection>
                                <ReviewHeader>
                                    <Typography variant="h4">Customer Reviews</Typography>
                                </ReviewHeader>

                                {productDetails.reviews?.length > 0 ? (
                                    <ReviewList>
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
                                                    <ReviewContent>
                                                        <ReviewerName variant="h6">
                                                            {review.reviewer.name}
                                                        </ReviewerName>
                                                        <ReviewMeta>
                                                            <Rating 
                                                                value={review.rating} 
                                                                readOnly 
                                                                size="small"
                                                                sx={{ 
                                                                    color: "#ffc107",
                                                                    marginRight: "1rem"
                                                                }}
                                                            />
                                                            <TimeStamp>
                                                                {timeAgo(review.date)}
                                                            </TimeStamp>
                                                        </ReviewMeta>
                                                        <ReviewText>
                                                            {review.comment}
                                                        </ReviewText>
                                                    </ReviewContent>
                                                    {review.reviewer._id === reviewer && (
                                                        <ReviewActions>
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
                                                            <StyledMenu
                                                                anchorEl={anchorElMenu}
                                                                open={Boolean(anchorElMenu)}
                                                                onClose={handleCloseMenu}
                                                            >
                                                                <MenuItem onClick={handleCloseMenu}>
                                                                    Edit
                                                                </MenuItem>
                                                                <MenuItem 
                                                                    onClick={() => {
                                                                        deleteHandler(review._id);
                                                                        handleCloseMenu();
                                                                    }}
                                                                    sx={{ color: '#dc3545' }}
                                                                >
                                                                    Delete
                                                                </MenuItem>
                                                            </StyledMenu>
                                                        </ReviewActions>
                                                    )}
                                                </ReviewCardDivision>
                                            </ReviewCard>
                                        ))}
                                    </ReviewList>
                                ) : (
                                    <EmptyReviews>
                                        <Typography variant="h6">
                                            No reviews yet. Be the first to review this product.
                                        </Typography>
                                    </EmptyReviews>
                                )}
                            </ReviewSection>
                        </>
                    )}
                </>
            )}
        </PageContainer>
    );
};

// Styled Components
const PageContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
`;

const EmptyStateContainer = styled.div`
    text-align: center;
    padding: 4rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
`;

const ProductContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    
    @media (min-width: 768px) {
        grid-template-columns: 1fr 1.5fr;
    }
`;

const ImageSection = styled.div`
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ProductImage = styled.img`
    width: 100%;
    max-width: 400px;
    height: auto;
    object-fit: contain;
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
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
    font-size: 1.1rem;
    line-height: 1.6;
    color: #4a4a4a;
`;

const ProductDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 8px;
`;

const DetailRow = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const DetailLabel = styled.span`
    font-weight: 600;
    color: #2c3e50;
    min-width: 120px;
`;

const DetailValue = styled.span`
    color: #4a4a4a;
`;

const ActionButton = styled(BasicButton)`
    && {
        margin-top: 1rem;
        padding: 1rem 2rem;
        font-size: 1.1rem;
        font-weight: 500;
        border-radius: 8px;
        transition: all 0.3s ease;
        
        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
    }
`;

const ReviewSection = styled.div`
    margin-top: 4rem;
`;

const ReviewHeader = styled.div`
    text-align: center;
    margin-bottom: 3rem;
    
    h4 {
        color: #2c3e50;
        font-weight: 600;
    }
`;

const ReviewList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 800px;
    margin: 0 auto;
`;

const ReviewCard = styled(Card)`
    && {
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

const ReviewContent = styled.div`
    flex: 1;
    margin-left: 1.5rem;
`;

const ReviewerName = styled(Typography)`
    && {
        font-weight: 600;
        color: #2c3e50;
        margin-bottom: 0.5rem;
    }
`;

const ReviewMeta = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
`;

const TimeStamp = styled(Typography)`
    && {
        color: #6c757d;
        font-size: 0.9rem;
    }
`;

const ReviewText = styled(Typography)`
    && {
        color: #4a4a4a;
        line-height: 1.6;
    }
`;

const ReviewActions = styled.div`
    margin-left: auto;
`;

const StyledMenu = styled(Menu)`
    && {
        .MuiPaper-root {
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        
        .MuiMenuItem-root {
            padding: 0.8rem 1.5rem;
            min-width: 150px;
            
            &:hover {
                background-color: #f8f9fa;
            }
        }
    }
`;

const EmptyReviews = styled.div`
    text-align: center;
    padding: 3rem;
    background: #f8f9fa;
    border-radius: 12px;
    color: #6c757d;
`;

const ReviewCardDivision = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    width: 100%;
`;

export default ViewProduct;