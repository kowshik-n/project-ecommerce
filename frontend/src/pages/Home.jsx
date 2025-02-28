import React, { useEffect, useState } from 'react';
import { Box, Container, styled } from '@mui/material';
import Slide from './Slide';
import Banner from './Banner';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/userHandle';
import ProductsMenu from './customer/components/ProductsMenu';
import { NewtonsCradle } from '@uiball/loaders';
import { Link } from 'react-router-dom';
import StorefrontIcon from '@mui/icons-material/Storefront';

const Home = () => {
  const adURL =
    'https://rukminim1.flixcart.com/flap/464/708/image/1f03e99f6dc9f7a6.jpg?q=70';

  const dispatch = useDispatch();

  const { productData, responseProducts, error } = useSelector((state) => state.user);

  const [showNetworkError, setShowNetworkError] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setShowNetworkError(true);
      }, 40000);

      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  return (
    <HomeWrapper id="top">
      <MobileMenuContainer>
        <ProductsMenu dropName="Categories" />
        <ProductsMenu dropName="Products" />
      </MobileMenuContainer>

      <BannerSection>
        <Banner />
      </BannerSection>

      {showNetworkError ? (
        <ErrorContainer>
          <ErrorMessage>Sorry, network error.</ErrorMessage>
        </ErrorContainer>
      ) : error ? (
        <LoadingContainer>
          <LoadingMessage>Please Wait A Second</LoadingMessage>
          <NewtonsCradle size={70} speed={1.4} color="#6c5ce7" />
        </LoadingContainer>
      ) : (
        <>
          {responseProducts ? (
            <EmptyStateContainer>
              <EmptyStateContent>
                <EmptyIcon>
                  <StorefrontIcon sx={{ fontSize: 64, color: '#6c5ce7' }} />
                </EmptyIcon>
                <EmptyTitle>No products found right now</EmptyTitle>
                <EmptyDescription>
                  Become a seller to add products
                  <StyledLink to="/Sellerregister">
                    Join Now
                  </StyledLink>
                </EmptyDescription>
              </EmptyStateContent>
            </EmptyStateContainer>
          ) : (
            <ContentSection>
              {/* <MainContent>
                <LeftContent>
                  <Slide products={productData} title="Top Selection" />
                </LeftContent>

                <RightContent>
                  <AdImage src={adURL} alt="Advertisement" />
                </RightContent>
              </MainContent> */}

              <SlideSection>
                <Slide products={productData} title="Deals of the Day" />
              </SlideSection>
              <SlideSection>
                <Slide products={productData} title="Suggested Items" />
              </SlideSection>
              <SlideSection>
                <Slide products={productData} title="Discounts for You" />
              </SlideSection>
              <SlideSection>
                <Slide products={productData} title="Recommended Items" />
              </SlideSection>
            </ContentSection>
          )}
        </>
      )}
    </HomeWrapper>
  );
};

// Styled Components
const HomeWrapper = styled('div')`
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const MobileMenuContainer = styled(Container)`
  display: none;
  padding: 16px;
  gap: 16px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  @media (max-width: 600px) {
    display: flex;
  }
`;

const BannerSection = styled(Box)`
  padding: 20px 10px;
  background: linear-gradient(to bottom, #f8f9fa, white);
`;

const ContentSection = styled('div')`
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
`;

const MainContent = styled(Box)`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
`;

const LeftContent = styled(Box)`
  flex: 1;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const RightContent = styled(Box)`
  width: 17%;
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const AdImage = styled('img')`
  width: 100%;
  height: auto;
  border-radius: 8px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const SlideSection = styled('div')`
  margin-bottom: 32px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  overflow: hidden;
`;

const ErrorContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  text-align: center;
`;

const ErrorMessage = styled('h1')`
  color: #e74c3c;
  font-size: 1.5rem;
  font-weight: 600;
`;

const LoadingContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  gap: 24px;
`;

const LoadingMessage = styled('h1')`
  color: #2d3436;
  font-size: 1.5rem;
  font-weight: 600;
`;

const EmptyStateContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: 40px;
`;

const EmptyStateContent = styled('div')`
  text-align: center;
  background: white;
  padding: 48px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  max-width: 500px;
`;

const EmptyIcon = styled('div')`
  margin-bottom: 24px;
`;

const EmptyTitle = styled('h2')`
  color: #2d3436;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 16px;
`;

const EmptyDescription = styled('p')`
  color: #636e72;
  font-size: 1.1rem;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: white;
  background-color: #6c5ce7;
  padding: 12px 32px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #5541e5;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(108,92,231,0.2);
  }
`;

export default Home;
