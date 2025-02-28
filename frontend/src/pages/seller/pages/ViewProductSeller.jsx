import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { BlueButton, DarkRedButton, GreenButton } from '../../../utils/buttonStyles';
import { deleteStuff, getProductDetails, updateStuff } from '../../../redux/userHandle';
import { Delete, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { Avatar, Box, Card, CircularProgress, Collapse, IconButton, Stack, TextField, Typography, Rating } from '@mui/material';
import altImage from "../../../assets/altimg.png";
import Popup from '../../../components/Popup';
import { generateRandomColor, timeAgo } from '../../../utils/helperFunctions';
import { underControl } from '../../../redux/userSlice';
import AlertDialogSlide from '../../../components/AlertDialogSlide';

const ViewProductSeller = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const productID = params.id;

  const [showTab, setShowTab] = useState(false);
  const buttonText = showTab ? 'Cancel' : 'Edit product details';

  useEffect(() => {
    dispatch(getProductDetails(productID));
  }, [productID, dispatch]);

  const { loading, status, error, productDetails, responseDetails } = useSelector(state => state.user);

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState({});
  const [mrp, setMrp] = useState("");
  const [cost, setCost] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [productImage, setProductImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [tagline, setTagline] = useState("");

  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [dialog, setDialog] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  console.log(price);

  useEffect(() => {
    if (productDetails) {
      setProductName(productDetails.productName || '');
      setPrice(productDetails.price || '');
      setSubcategory(productDetails.subcategory || '');
      setProductImage(productDetails.productImage || '');
      setCategory(productDetails.category || '');
      setDescription(productDetails.description || "");
      setTagline(productDetails.tagline || "");
    }
    if (productDetails.price) {
      setMrp(productDetails.price.mrp || '');
      setCost(productDetails.price.cost || '');
      setDiscountPercent(productDetails.price.discountPercent || '');
    }
  }, [productDetails]);

  const fields = {
    productName,
    price: {
      mrp: mrp,
      cost: cost,
      discountPercent: discountPercent,
    },
    subcategory,
    productImage,
    category,
    description,
    tagline,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(updateStuff(fields, productID, "ProductUpdate"));
  };

  const deleteHandler = (reviewId) => {
    console.log(reviewId);

    const fields = { reviewId };

    dispatch(updateStuff(fields, productID, "deleteProductReview"));
  };

  const deleteAllHandler = () => {
    dispatch(deleteStuff(productID, "deleteAllProductReviews"))
  }

  useEffect(() => {
    if (status === "updated" || status === "deleted") {
      setLoader(false);
      dispatch(getProductDetails(productID));
      setShowPopup(true);
      setMessage("Done Successfully");
      setShowTab(false)
      dispatch(underControl());
    } else if (error) {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, error, dispatch, productID]);

  return (
    <PageWrapper>
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
              <MainSection>
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
                  </ProductInfo>
                </ProductContainer>

                <EditSection>
                  <EditButton
                    onClick={() => setShowTab(!showTab)}
                    startIcon={showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  >
                    {buttonText}
                  </EditButton>

                  <Collapse in={showTab} timeout="auto" unmountOnExit>
                    <EditFormContainer>
                      <EditForm onSubmit={submitHandler}>
                        <EditImagePreview>
                          {productImage ? (
                            <img src={productImage} alt="Preview" />
                          ) : (
                            <img src={altImage} alt="Default" />
                          )}
                        </EditImagePreview>
                        <EditFields>
                          <TextField
                            fullWidth
                            label="Product Image URL"
                            value={productImage}
                            onChange={(e) => setProductImage(e.target.value)}
                            required
                            variant="outlined"
                          />
                          <TextField
                            fullWidth
                            label="Product Name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                            variant="outlined"
                          />
                          <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            variant="outlined"
                          />
                          <PriceFieldsGrid>
                            <TextField
                              label="MRP"
                              value={mrp}
                              onChange={(e) => setMrp(e.target.value)}
                              required
                              variant="outlined"
                            />
                            <TextField
                              label="Cost"
                              value={cost}
                              onChange={(e) => setCost(e.target.value)}
                              required
                              variant="outlined"
                            />
                            <TextField
                              label="Discount %"
                              value={discountPercent}
                              onChange={(e) => setDiscountPercent(e.target.value)}
                              required
                              variant="outlined"
                            />
                          </PriceFieldsGrid>
                          <TextField
                            fullWidth
                            label="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            variant="outlined"
                          />
                          <TextField
                            fullWidth
                            label="Subcategory"
                            value={subcategory}
                            onChange={(e) => setSubcategory(e.target.value)}
                            required
                            variant="outlined"
                          />
                          <TextField
                            fullWidth
                            label="Tagline"
                            value={tagline}
                            onChange={(e) => setTagline(e.target.value)}
                            required
                            variant="outlined"
                          />
                          <SubmitButton
                            type="submit"
                            disabled={loader}
                          >
                            {loader ? <CircularProgress size={24} /> : "Update Product"}
                          </SubmitButton>
                        </EditFields>
                      </EditForm>
                    </EditFormContainer>
                  </Collapse>
                </EditSection>

                <ReviewsSection>
                  <ReviewHeader>
                    <Typography variant="h4">Customer Reviews</Typography>
                    {productDetails.reviews?.length > 0 && (
                      <RemoveAllButton 
                        onClick={() => {
                          setDialog("Do you want to delete all reviews?")
                          setShowDialog(true)
                        }}
                      >
                        Remove All Reviews
                      </RemoveAllButton>
                    )}
                  </ReviewHeader>

                  {productDetails.reviews?.length > 0 ? (
                    <ReviewList>
                      {productDetails.reviews.map((review, index) => (
                        <ReviewCard key={index}>
                          <ReviewContent>
                            <Avatar 
                              sx={{ 
                                width: 50, 
                                height: 50,
                                backgroundColor: generateRandomColor(review._id)
                              }}
                            >
                              {String(review.reviewer.name).charAt(0)}
                            </Avatar>
                            <ReviewDetails>
                              <ReviewerName>{review.reviewer.name}</ReviewerName>
                              <ReviewMeta>
                                <Rating 
                                  value={review.rating} 
                                  readOnly 
                                  size="small"
                                />
                                <TimeStamp>{timeAgo(review.date)}</TimeStamp>
                              </ReviewMeta>
                              <ReviewText>{review.comment}</ReviewText>
                            </ReviewDetails>
                            <DeleteButton onClick={() => deleteHandler(review._id)}>
                              <Delete />
                            </DeleteButton>
                          </ReviewContent>
                        </ReviewCard>
                      ))}
                    </ReviewList>
                  ) : (
                    <EmptyReviews>
                      <Typography variant="h6">No Reviews Found</Typography>
                    </EmptyReviews>
                  )}
                </ReviewsSection>
              </MainSection>
            </>
          )}
        </>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
      <AlertDialogSlide dialog={dialog} showDialog={showDialog} setShowDialog={setShowDialog} taskHandler={deleteAllHandler} />
    </PageWrapper>
  );
};

export default ViewProductSeller;

const PageWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
`;

const MainSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3rem;
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

const ImageSection = styled.div`
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const EditSection = styled.div`
    margin: 2rem 0;
`;

const EditButton = styled(GreenButton)`
    && {
        padding: 1rem 2rem;
        font-size: 1.1rem;
        border-radius: 8px;
        transition: all 0.3s ease;
        
        &:hover {
            transform: translateY(-2px);
        }
    }
`;

const EditFormContainer = styled.div`
    margin-top: 2rem;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
`;

const EditForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const EditImagePreview = styled.div`
    width: 200px;
    height: 200px;
    margin: 0 auto;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

const EditFields = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
`;

const PriceFieldsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
`;

const SubmitButton = styled(BlueButton)`
    && {
        margin-top: 1rem;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 8px;
    }
`;

const ReviewsSection = styled.div`
    margin-top: 4rem;
`;

const ReviewHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding: 0 1rem;
`;

const RemoveAllButton = styled(DarkRedButton)`
    && {
        padding: 0.8rem 1.5rem;
        border-radius: 8px;
    }
`;

const ReviewList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const ReviewContent = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
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
    gap: 1rem;
    margin-bottom: 0.5rem;
`;

const TimeStamp = styled(Typography)`
    color: #6c757d;
    font-size: 0.9rem;
`;

const ReviewText = styled(Typography)`
    color: #4a4a4a;
    line-height: 1.6;
`;

const DeleteButton = styled(IconButton)`
    && {
        color: #dc3545;
        padding: 0.5rem;
        
        &:hover {
            background-color: #dc354511;
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

const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2rem auto;
    max-width: 1200px;
    padding: 0 2rem;
    gap: 2rem;
    
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
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    
    @media (min-width: 768px) {
        width: 40%;
    }
`;

const EditImage = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 8px;
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
    padding: 1rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const ProductName = styled.h1`
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
`;

const PriceContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid #eee;
`;

const PriceMrp = styled.p`
    font-size: 1.1rem;
    text-decoration: line-through;
    color: #7f8c8d;
`;

const PriceCost = styled.h3`
    font-size: 1.8rem;
    color: #2c3e50;
    font-weight: bold;
`;

const PriceDiscount = styled.p`
    font-size: 1rem;
    color: #27ae60;
    font-weight: 500;
    background-color: #e8f5e9;
    padding: 0.3rem 0.8rem;
    border-radius: 4px;
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

const DetailRow = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
`;

const DetailLabel = styled.p`
    font-weight: 500;
    color: #2c3e50;
`;

const DetailValue = styled.p`
    color: #34495e;
`;

const ReviewCard = styled(Card)`
    && {
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        transition: all 0.3s ease;
        border: 1px solid #eef0f2;
        margin-bottom: 1.5rem;
        
        &:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }
    }
`;

const ReviewDetails = styled.div`
    flex: 1;
    margin-left: 1.5rem;
    
    h6 {
        font-size: 1.1rem;
        font-weight: 600;
        color: #2c3e50;
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