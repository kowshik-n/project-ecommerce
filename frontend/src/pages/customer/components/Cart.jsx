import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container, Divider, Grid, IconButton, Paper, Typography } from '@mui/material';
import styled from 'styled-components';
import emptyCart from "../../../assets/cartimg.png"
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { addToCart, removeAllFromCart, removeFromCart } from '../../../redux/userSlice';
import { BasicButton } from '../../../utils/buttonStyles';
import { useNavigate } from 'react-router-dom';
import { updateCustomer } from '../../../redux/userHandle';

const Cart = ({ setIsCartOpen }) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { currentUser } = useSelector((state) => state.user);

    let cartDetails = currentUser.cartDetails;

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const handleRemoveAllFromCart = () => {
        dispatch(removeAllFromCart());
    };

    const totalQuantity = cartDetails.reduce((total, item) => total + item.quantity, 0);
    const totalOGPrice = cartDetails.reduce((total, item) => total + (item.quantity * item.price.mrp), 0);
    const totalNewPrice = cartDetails.reduce((total, item) => total + (item.quantity * item.price.cost), 0);

    const productViewHandler = (productID) => {
        navigate("/product/view/" + productID)
        setIsCartOpen(false)
    }

    const productBuyingHandler = (id) => {
        console.log(currentUser);
        dispatch(updateCustomer(currentUser, currentUser._id));
        setIsCartOpen(false)
        navigate(`/product/buy/${id}`)
    }

    const allProductsBuyingHandler = () => {
        console.log(currentUser);
        dispatch(updateCustomer(currentUser, currentUser._id));
        setIsCartOpen(false)
        navigate("/Checkout")
    }

    const priceContainerRef = useRef(null);

    const handleScrollToBottom = () => {
        if (priceContainerRef.current) {
            priceContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const firstCartItemRef = useRef(null);

    const handleScrollToTop = () => {
        if (firstCartItemRef.current) {
            firstCartItemRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <StyledContainer>
            <TopContainer>
                <ContinueShoppingButton onClick={() => setIsCartOpen(false)}>
                    <KeyboardDoubleArrowLeftIcon /> Continue Shopping
                </ContinueShoppingButton>
                {cartDetails.length > 0 && (
                    <ScrollButton onClick={handleScrollToTop}>
                        <KeyboardDoubleArrowUpIcon />
                    </ScrollButton>
                )}
            </TopContainer>

            {cartDetails.length === 0 ? (
                <EmptyCartContainer>
                    <CartImage src={emptyCart} alt="Empty Cart" />
                    <EmptyCartText>Your cart is empty</EmptyCartText>
                </EmptyCartContainer>
            ) : (
                <CartContent>
                    <CartItemsGrid container spacing={2}>
                        {cartDetails.map((data, index) => (
                            <Grid item xs={12} key={index} ref={index === 0 ? firstCartItemRef : null}>
                                <CartItemCard>
                                    <ProductImageWrapper>
                                        <ProductImage src={data.productImage} alt={data.productName} />
                                    </ProductImageWrapper>
                                    <ProductInfo>
                                        <ProductName variant="h6">
                                            {data.productName}
                                        </ProductName>
                                        <PriceInfo>
                                            <OriginalPrice>₹{data.price.mrp}</OriginalPrice>
                                            <FinalPrice>₹{data.price.cost}</FinalPrice>
                                            <DiscountBadge>{data.price.discountPercent}% Off</DiscountBadge>
                                        </PriceInfo>
                                        <QuantityInfo>
                                            <QuantityText>Quantity: {data.quantity}</QuantityText>
                                            <TotalPrice>Total: ₹{data.quantity * data.price.cost}</TotalPrice>
                                        </QuantityInfo>
                                        <ActionButtons>
                                            <QuantityButton
                                                variant="outlined"
                                                color="error"
                                                onClick={() => handleRemoveFromCart(data)}
                                            >
                                                -1
                                            </QuantityButton>
                                            <QuantityButton
                                                variant="outlined"
                                                color="success"
                                                onClick={() => handleAddToCart(data)}
                                            >
                                                +1
                                            </QuantityButton>
                                        </ActionButtons>
                                        <ProductActions>
                                            <ViewButton
                                                onClick={() => productViewHandler(data._id)}
                                            >
                                                View Details
                                            </ViewButton>
                                            <BuyButton
                                                onClick={() => productBuyingHandler(data._id)}
                                            >
                                                Buy Now
                                            </BuyButton>
                                        </ProductActions>
                                    </ProductInfo>
                                </CartItemCard>
                            </Grid>
                        ))}
                    </CartItemsGrid>

                    <OrderSummary ref={priceContainerRef}>
                        <SummaryTitle>
                            <ReceiptLongIcon /> ORDER SUMMARY
                        </SummaryTitle>
                        <Divider sx={{ my: 2 }} />
                        <SummaryDetails>
                            <SummaryRow>
                                <span>Items ({totalQuantity})</span>
                                <span>₹{totalOGPrice}</span>
                            </SummaryRow>
                            <SummaryRow>
                                <span>Discount</span>
                                <DiscountAmount>- ₹{totalOGPrice - totalNewPrice}</DiscountAmount>
                            </SummaryRow>
                            <Divider sx={{ my: 2 }} />
                            <TotalRow>
                                <span>Total Amount</span>
                                <TotalAmount>₹{totalNewPrice}</TotalAmount>
                            </TotalRow>
                        </SummaryDetails>
                        {cartDetails.length > 0 && (
                            <CheckoutButton
                                onClick={allProductsBuyingHandler}
                            >
                                <ShoppingCartCheckoutIcon sx={{ mr: 1 }} />
                                Proceed to Checkout
                            </CheckoutButton>
                        )}
                    </OrderSummary>
                </CartContent>
            )}

            {cartDetails.length > 0 && (
                <BottomActions>
                    <ActionButton
                        variant="contained"
                        color="primary"
                        onClick={handleScrollToBottom}
                    >
                        <ReceiptLongIcon sx={{ mr: 1 }} />
                        View Bill
                    </ActionButton>
                    <ActionButton
                        variant="contained"
                        color="error"
                        onClick={handleRemoveAllFromCart}
                    >
                        <DeleteOutlineIcon sx={{ mr: 1 }} />
                        Clear Cart
                    </ActionButton>
                </BottomActions>
            )}
        </StyledContainer>
    );
};

export default Cart;

const StyledContainer = styled(Container)`
    padding: 20px;
    background-color: #f8f9fa;
    min-height: 100vh;
    position: relative;
`;

const TopContainer = styled.div`
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0;
    padding: 16px;
    background-color: #f8f9fa;
    z-index: 10;
`;

const ContinueShoppingButton = styled(Button)`
    && {
        background-color: #6c5ce7;
        color: white;
        padding: 8px 16px;
        border-radius: 8px;
        text-transform: none;
        font-weight: 600;
        transition: all 0.3s ease;

        &:hover {
            background-color: #5641e5;
            transform: translateX(-4px);
        }
    }
`;

const ScrollButton = styled(IconButton)`
    && {
        background-color: #2d3436;
        color: white;
        transition: all 0.3s ease;

        &:hover {
            background-color: #636e72;
            transform: translateY(-4px);
        }
    }
`;

const EmptyCartContainer = styled.div`
    text-align: center;
    padding: 40px;
`;

const CartImage = styled.img`
    max-width: 400px;
    width: 100%;
    margin-bottom: 24px;
`;

const EmptyCartText = styled(Typography)`
    && {
        font-size: 1.5rem;
        color: #2d3436;
        font-weight: 600;
    }
`;

const CartContent = styled.div`
    display: grid;
    gap: 24px;
    grid-template-columns: 1fr;
    
    @media (min-width: 1024px) {
        grid-template-columns: 2fr 1fr;
    }
`;

const CartItemsGrid = styled(Grid)`
    flex: 1;
`;

const CartItemCard = styled(Paper)`
    && {
        display: flex;
        padding: 16px;
        gap: 20px;
        border-radius: 12px;
        transition: all 0.3s ease;
        border: 1px solid #e0e0e0;

        &:hover {
            transform: translateY(-4px);
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
    }
`;

const ProductImageWrapper = styled.div`
    width: 120px;
    height: 120px;
    border-radius: 8px;
    overflow: hidden;
`;

const ProductImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const ProductInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const ProductName = styled(Typography)`
    && {
        font-weight: 600;
        color: #2d3436;
    }
`;

const PriceInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const OriginalPrice = styled.span`
    text-decoration: line-through;
    color: #636e72;
    font-size: 0.9rem;
`;

const FinalPrice = styled.span`
    font-size: 1.2rem;
    font-weight: 600;
    color: #2d3436;
`;

const DiscountBadge = styled.span`
    background-color: #00b894;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 600;
`;

const QuantityInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const QuantityText = styled.span`
    color: #636e72;
`;

const TotalPrice = styled.span`
    font-weight: 600;
    color: #2d3436;
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 12px;
`;

const QuantityButton = styled(Button)`
    && {
        min-width: 40px;
        height: 40px;
        padding: 0;
    }
`;

const ProductActions = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 8px;
`;

const ViewButton = styled(Button)`
    && {
        background-color: #74b9ff;
        color: white;
        text-transform: none;
        
        &:hover {
            background-color: #0984e3;
        }
    }
`;

const BuyButton = styled(Button)`
    && {
        background-color: #00b894;
        color: white;
        text-transform: none;
        
        &:hover {
            background-color: #00a884;
        }
    }
`;

const OrderSummary = styled(Paper)`
    && {
        padding: 24px;
        border-radius: 12px;
        position: sticky;
        top: 100px;
        height: fit-content;
    }
`;

const SummaryTitle = styled.h2`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.2rem;
    color: #2d3436;
    margin: 0;
`;

const SummaryDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const SummaryRow = styled.div`
    display: flex;
    justify-content: space-between;
    color: #636e72;
`;

const DiscountAmount = styled.span`
    color: #00b894;
`;

const TotalRow = styled(SummaryRow)`
    font-weight: 600;
    color: #2d3436;
    font-size: 1.1rem;
`;

const TotalAmount = styled.span`
    color: #6c5ce7;
`;

const CheckoutButton = styled(Button)`
    && {
        width: 100%;
        margin-top: 24px;
        background-color: #6c5ce7;
        color: white;
        padding: 12px;
        text-transform: none;
        font-weight: 600;
        
        &:hover {
            background-color: #5641e5;
        }
    }
`;

const BottomActions = styled.div`
    display: flex;
    justify-content: space-between;
    position: sticky;
    bottom: 0;
    padding: 16px;
    background-color: #f8f9fa;
    gap: 16px;
    margin-top: 24px;
`;

const ActionButton = styled(Button)`
    && {
        flex: 1;
        padding: 12px;
        text-transform: none;
        font-weight: 600;
    }
`;
