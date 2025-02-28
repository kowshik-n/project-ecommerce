import React from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Paper, Typography, Avatar, Container, Box, Divider } from '@mui/material';
import ShippingPage from '../components/ShippingPage';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';

// Theme colors
const theme = {
  colors: {
    primary: '#6c5ce7',
    secondary: '#a29bfe',
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

const Profile = () => {
  const { currentUser } = useSelector(state => state.user);

  return (
    <PageWrapper>
      <ProfileContainer>
        <ProfileHeader>
          <CoverImage />
          <AvatarWrapper>
            <StyledAvatar>
              {currentUser?.name[0].toUpperCase()}
            </StyledAvatar>
          </AvatarWrapper>
          <ProfileInfo>
            <ProfileName variant="h4">
              {currentUser?.name}
            </ProfileName>
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
        </ProfileHeader>

        <StyledDivider />

        <ShippingContainer>
          <SectionTitle variant="h5">
            Shipping Information
          </SectionTitle>
          <ShippingPage profile="Profile" />
        </ShippingContainer>
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
  maxWidth: '800px !important'
});

const ProfileHeader = styled(Paper)({
  position: 'relative',
  borderRadius: '16px',
  overflow: 'hidden',
  background: theme.colors.background.light,
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  marginBottom: '24px'
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

const ProfileName = styled(Typography)({
  color: theme.colors.text.primary,
  fontWeight: '600',
  marginBottom: '16px'
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

const StyledDivider = styled(Divider)({
  margin: '24px 0',
  opacity: 0.1
});

const ShippingContainer = styled(Paper)({
  padding: '24px',
  borderRadius: '16px',
  background: theme.colors.background.light,
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
});

const SectionTitle = styled(Typography)({
  color: theme.colors.text.primary,
  fontWeight: '600',
  marginBottom: '24px'
});

export default Profile;