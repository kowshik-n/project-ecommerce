import React from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Paper, Typography, Avatar, Container, Box, Divider, Grid, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import VerifiedIcon from '@mui/icons-material/Verified';

// Theme colors
const theme = {
  colors: {
    primary: '#6c5ce7',
    secondary: '#a29bfe',
    success: '#00b894',
    warning: '#fdcb6e',
    background: {
      main: '#f8f9fa',
      light: '#ffffff',
      gradient: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)'
    },
    text: {
      primary: '#2d3436',
      secondary: '#636e72'
    }
  }
};

const SellerProfile = () => {
  const { currentUser } = useSelector(state => state.user);

  const stats = [
    { icon: <StorefrontIcon />, label: 'Total Products', value: '45' },
    { icon: <LocalShippingIcon />, label: 'Orders Delivered', value: '156' },
    { icon: <StarIcon />, label: 'Average Rating', value: '4.8' }
  ];

  return (
    <PageWrapper>
      <ProfileContainer>
        {/* Header Section */}
        <ProfileHeader>
          <CoverImage />
          <HeaderContent>
            <AvatarWrapper>
              <VerifiedBadge>
                <VerifiedIcon sx={{ fontSize: 20 }} />
              </VerifiedBadge>
            </AvatarWrapper>
            <ProfileInfo>
              <NameSection>
                <ProfileName variant="h4">
                  {currentUser?.name}
                  <EditButton>
                    <EditIcon sx={{ fontSize: 20 }} />
                  </EditButton>
                </ProfileName>
                <StoreBadge>Verified Seller</StoreBadge>
              </NameSection>
              <InfoGrid>
                <InfoItem>
                  <EmailIcon sx={{ color: theme.colors.primary }} />
                  <InfoText>{currentUser?.email}</InfoText>
                </InfoItem>
                <InfoItem>
                  <WorkIcon sx={{ color: theme.colors.primary }} />
                  <InfoText>{currentUser?.role}</InfoText>
                </InfoItem>
              </InfoGrid>
            </ProfileInfo>
          </HeaderContent>
        </ProfileHeader>

        {/* Stats Section */}
        <StatsGrid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <StatCard>
                <StatIconWrapper>
                  {stat.icon}
                </StatIconWrapper>
                <StatInfo>
                  <StatValue>{stat.value}</StatValue>
                  <StatLabel>{stat.label}</StatLabel>
                </StatInfo>
              </StatCard>
            </Grid>
          ))}
        </StatsGrid>

        {/* Store Details Section */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StoreDetailsCard>
              <SectionTitle>
                Store Information
                <EditButton>
                  <EditIcon sx={{ fontSize: 18 }} />
                </EditButton>
              </SectionTitle>
              <StyledDivider />
              <DetailsList>
                <DetailItem>
                  <DetailLabel>Store Name</DetailLabel>
                  <DetailValue>{currentUser?.name}'s Store</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Member Since</DetailLabel>
                  <DetailValue>January 2022</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Business Type</DetailLabel>
                  <DetailValue>Retail</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Location</DetailLabel>
                  <DetailValue>Mumbai, India</DetailValue>
                </DetailItem>
              </DetailsList>
            </StoreDetailsCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <StoreDetailsCard>
              <SectionTitle>
                Performance Metrics
              </SectionTitle>
              <StyledDivider />
              <DetailsList>
                <DetailItem>
                  <DetailLabel>Response Rate</DetailLabel>
                  <PerformanceValue positive>98%</PerformanceValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Shipping Speed</DetailLabel>
                  <PerformanceValue positive>24h</PerformanceValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Return Rate</DetailLabel>
                  <PerformanceValue>2.3%</PerformanceValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Customer Satisfaction</DetailLabel>
                  <PerformanceValue positive>4.8/5</PerformanceValue>
                </DetailItem>
              </DetailsList>
            </StoreDetailsCard>
          </Grid>
        </Grid>
      </ProfileContainer>
    </PageWrapper>
  );
};

// Styled Components
const PageWrapper = styled('div')({
  background: theme.colors.background.main,
  minHeight: '100vh',
  padding: '24px'
});

const ProfileContainer = styled(Container)({
  maxWidth: '1200px !important'
});

const ProfileHeader = styled(Paper)({
  position: 'relative',
  borderRadius: '16px',
  overflow: 'hidden',
  background: theme.colors.background.light,
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  marginBottom: '24px'
});

const HeaderContent = styled(Box)({
  position: 'relative',
  zIndex: 1
});

const CoverImage = styled('div')({
  height: '200px',
  background: theme.colors.background.gradient,
  position: 'relative'
});

const AvatarWrapper = styled('div')({
  position: 'absolute',
  bottom: '-40px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  justifyContent: 'center'
});

const VerifiedBadge = styled(Box)({
  position: 'absolute',
  bottom: 0,
  right: 0,
  background: theme.colors.success,
  borderRadius: '50%',
  padding: '4px',
  color: 'white',
  border: '2px solid white'
});

const StyledAvatar = styled(Avatar)({
  width: '120px',
  height: '120px',
  fontSize: '3rem',
  fontWeight: '600',
  background: theme.colors.primary,
  border: '4px solid white',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
});

const ProfileInfo = styled(Box)({
  padding: '60px 24px 24px',
  textAlign: 'center'
});

const NameSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '16px'
});

const ProfileName = styled(Typography)({
  color: theme.colors.text.primary,
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
});

const StoreBadge = styled(Box)({
  background: 'rgba(0,184,148,0.1)',
  color: theme.colors.success,
  padding: '4px 12px',
  borderRadius: '20px',
  fontSize: '0.875rem',
  fontWeight: '600'
});

const EditButton = styled(IconButton)({
  color: theme.colors.text.secondary,
  padding: '4px',
  '&:hover': {
    color: theme.colors.primary,
    background: 'rgba(108,92,231,0.1)'
  }
});

const InfoGrid = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'center'
});

const InfoItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
});

const InfoText = styled(Typography)({
  color: theme.colors.text.secondary,
  fontSize: '1rem'
});

const StatsGrid = styled(Grid)({
  marginBottom: '24px'
});

const StatCard = styled(Paper)({
  padding: '24px',
  borderRadius: '12px',
  background: theme.colors.background.light,
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  transition: 'transform 0.3s ease',
  
  '&:hover': {
    transform: 'translateY(-4px)'
  }
});

const StatIconWrapper = styled(Box)({
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  background: theme.colors.background.gradient,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white'
});

const StatInfo = styled(Box)({
  flex: 1
});

const StatValue = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: '700',
  color: theme.colors.text.primary
});

const StatLabel = styled(Typography)({
  fontSize: '0.875rem',
  color: theme.colors.text.secondary
});

const StoreDetailsCard = styled(Paper)({
  padding: '24px',
  borderRadius: '16px',
  background: theme.colors.background.light,
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
});

const DetailsList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
});

const DetailItem = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px',
  borderRadius: '8px',
  background: theme.colors.background.main,
  
  '&:hover': {
    background: '#f1f3f5'
  }
});

const DetailLabel = styled(Typography)({
  color: theme.colors.text.secondary,
  fontWeight: '500'
});

const DetailValue = styled(Typography)({
  color: theme.colors.text.primary,
  fontWeight: '600'
});

const SectionTitle = styled(Typography)({
  color: theme.colors.text.primary,
  fontWeight: '600',
  marginBottom: '24px'
});

const StyledDivider = styled(Divider)({
  margin: '24px 0',
  opacity: 0.1
});

const PerformanceValue = styled(Box)({
  fontWeight: '600',
  color: theme.colors.text.primary,
  ...(props => ({
    color: props.positive ? theme.colors.success : theme.colors.warning
  }))
});

export default SellerProfile;