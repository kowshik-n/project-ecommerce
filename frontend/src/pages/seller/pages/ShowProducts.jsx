import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Container, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteStuff, getProductsbySeller } from '../../../redux/userHandle';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate.jsx';
import AddCardIcon from '@mui/icons-material/AddCard';
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from '@mui/icons-material/Upload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AlertDialogSlide from '../../../components/AlertDialogSlide';

// Theme colors
const theme = {
  colors: {
    primary: '#6c5ce7',
    success: '#00b894',
    warning: '#fdcb6e',
    error: '#ff7675',
    background: '#f8f9fa',
    white: '#ffffff',
    text: {
      primary: '#2d3436',
      secondary: '#636e72'
    }
  }
};

const ShowProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, currentRole, loading, sellerProductData, responseSellerProducts } = useSelector(state => state.user);
  const sellerID = currentUser._id;
  const [dialog, setDialog] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    dispatch(getProductsbySeller(currentUser._id));
  }, [dispatch, currentUser._id]);

  const deleteHandler = (deleteID, address) => {
    dispatch(deleteStuff(deleteID, address))
      .then(() => {
        dispatch(getProductsbySeller(currentUser._id));
      });
  };

  const deleteAllProducts = () => {
    deleteHandler(sellerID, "DeleteProducts");
  };

  const actions = [
    {
      icon: <AddCardIcon color="primary" />, 
      name: 'Add New Product',
      action: () => navigate("/Seller/addproduct")
    },
    {
      icon: <DeleteIcon color="error" />, 
      name: 'Delete All Products',
      action: () => {
        setDialog("Do you want to delete all products?");
        setShowDialog(true);
      }
    },
  ];

  const shopcartActions = [
    {
      icon: <AddCardIcon color="primary" />, 
      name: 'Add New Product',
      action: () => navigate("/Seller/addproduct")
    },
    {
      icon: <UploadIcon color="success" />, 
      name: 'Upload New Product',
      action: () => navigate("/Seller/uploadproducts")
    },
    {
      icon: <DeleteIcon color="error" />, 
      name: 'Delete All Products',
      action: () => {
        setDialog("Do you want to delete all products?");
        setShowDialog(true);
      }
    },
  ];

  if (loading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  return (
    <PageContainer>
      <PageHeader>
        <Typography variant="h4" sx={{ fontWeight: 600, color: theme.colors.text.primary }}>
          Products Management
        </Typography>
        <Typography variant="body1" sx={{ color: theme.colors.text.secondary, mb: 3 }}>
          Manage your product inventory
        </Typography>
      </PageHeader>

      {responseSellerProducts ? (
        <EmptyState>
          <AddProductButton onClick={() => navigate("/Seller/addproduct")}>
            Add Product
          </AddProductButton>
          {currentRole === "Shopcart" && (
            <UploadButton onClick={() => navigate("/Seller/uploadproducts")}>
              Upload Product
            </UploadButton>
          )}
        </EmptyState>
      ) : (
        <>
          {Array.isArray(sellerProductData) && sellerProductData.length > 0 && (
            <ProductGrid container spacing={3}>
              {sellerProductData.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <ProductCard>
                    <ProductImageContainer>
                      <ProductImage src={product.productImage} alt={product.productName} />
                      <ProductOverlay>
                        <ActionButtons>
                          <Tooltip title="View Details">
                            <IconButton 
                              onClick={() => navigate(`/Seller/products/product/${product._id}`)}
                              className="action-button"
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Product">
                            <IconButton 
                              onClick={() => deleteHandler(product._id, "DeleteProduct")}
                              className="action-button delete"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </ActionButtons>
                      </ProductOverlay>
                    </ProductImageContainer>

                    <ProductInfo>
                      <ProductName>{product.productName}</ProductName>
                      <PriceContainer>
                        <OriginalPrice>₹{product.price.mrp}</OriginalPrice>
                        <CurrentPrice>₹{product.price.cost}</CurrentPrice>
                        <DiscountBadge>{product.price.discountPercent}% off</DiscountBadge>
                      </PriceContainer>
                    </ProductInfo>
                  </ProductCard>
                </Grid>
              ))}
            </ProductGrid>
          )}
          {currentRole === "Shopcart" ? (
            <SpeedDialTemplate actions={shopcartActions} />
          ) : (
            <SpeedDialTemplate actions={actions} />
          )}
        </>
      )}
      <AlertDialogSlide 
        dialog={dialog} 
        showDialog={showDialog} 
        setShowDialog={setShowDialog} 
        taskHandler={deleteAllProducts} 
      />
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled(Container)({
  padding: '24px',
  backgroundColor: theme.colors.background,
  minHeight: '100vh'
});

const PageHeader = styled(Box)({
  marginBottom: '32px'
});

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '400px',
  fontSize: '1.2rem',
  color: theme.colors.text.secondary
});

const EmptyState = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  padding: '48px',
  background: theme.colors.white,
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
});

const ProductGrid = styled(Grid)({
  marginBottom: '32px'
});

const ProductCard = styled(Box)({
  background: theme.colors.white,
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 4px 25px rgba(0,0,0,0.12)',
    
    '& .MuiIconButton-root': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  }
});

const ProductImageContainer = styled(Box)({
  position: 'relative',
  paddingTop: '100%',
  backgroundColor: '#f8f9fa'
});

const ProductImage = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s ease',
  
  '&:hover': {
    transform: 'scale(1.05)'
  }
});

const ProductOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.3)',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  
  '&:hover': {
    opacity: 1
  }
});

const ActionButtons = styled(Box)({
  display: 'flex',
  gap: '8px',
  
  '& .action-button': {
    color: theme.colors.white,
    backgroundColor: 'rgba(255,255,255,0.1)',
    opacity: 0,
    transform: 'translateY(20px)',
    transition: 'all 0.3s ease',
    
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.2)'
    },
    
    '&.delete:hover': {
      backgroundColor: theme.colors.error
    }
  }
});

const ProductInfo = styled(Box)({
  padding: '16px'
});

const ProductName = styled(Typography)({
  fontSize: '1rem',
  fontWeight: 600,
  color: theme.colors.text.primary,
  marginBottom: '8px',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
});

const PriceContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexWrap: 'wrap'
});

const OriginalPrice = styled(Typography)({
  color: theme.colors.text.secondary,
  textDecoration: 'line-through',
  fontSize: '0.875rem'
});

const CurrentPrice = styled(Typography)({
  color: theme.colors.text.primary,
  fontWeight: 600,
  fontSize: '1.1rem'
});

const DiscountBadge = styled(Box)({
  background: 'rgba(0,184,148,0.1)',
  color: theme.colors.success,
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontWeight: 600
});

const AddProductButton = styled('button')({
  background: theme.colors.primary,
  color: theme.colors.white,
  border: 'none',
  padding: '12px 24px',
  borderRadius: '8px',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    background: '#5541e5',
    transform: 'translateY(-2px)'
  }
});

const UploadButton = styled(AddProductButton)({
  background: theme.colors.success,
  
  '&:hover': {
    background: '#00a884'
  }
});

export default ShowProducts;