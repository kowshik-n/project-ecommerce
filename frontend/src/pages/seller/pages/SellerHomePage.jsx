import { Grid } from '@mui/material';
import SalesCard from '../components/SalesCard';
import SalesChart from '../components/SalesChart';
import { styled } from '@mui/material/styles';
import { Paper, Typography, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CancelIcon from '@mui/icons-material/Cancel';

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

const SellerHomePage = () => {
  const salesData = [
    {
      title: "Weekly Sales",
      total: 71,
      icon: <TrendingUpIcon />,
      color: "primary",
      trend: "+12%",
      subtitle: "Than last week"
    },
    {
      title: "Added to Cart",
      total: 23,
      icon: <ShoppingCartIcon />,
      color: "success",
      trend: "+8%",
      subtitle: "Than yesterday"
    },
    {
      title: "Ongoing Orders",
      total: 17,
      icon: <LocalShippingIcon />,
      color: "warning",
      trend: "+5%",
      subtitle: "Than last month"
    },
    {
      title: "Cancelled Orders",
      total: 13,
      icon: <CancelIcon />,
      color: "error",
      trend: "-2%",
      subtitle: "Than last month"
    }
  ];

  return (
    <DashboardContainer>
      <PageHeader>
        <Typography variant="h4" sx={{ fontWeight: 600, color: theme.colors.text.primary }}>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" sx={{ color: theme.colors.text.secondary }}>
          Welcome back! Here's what's happening with your store today.
        </Typography>
      </PageHeader>

      <Grid container spacing={3}>
        {salesData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatsCard color={card.color}>
              <CardContent>
                <IconWrapper color={card.color}>
                  {card.icon}
                </IconWrapper>
                <StatsInfo>
                  <CardTitle>{card.title}</CardTitle>
                  <NumberWrapper>
                    <StatsNumber>{card.total}</StatsNumber>
                    <TrendIndicator isPositive={card.trend.includes('+')}>
                      {card.trend}
                    </TrendIndicator>
                  </NumberWrapper>
                  <Subtitle>{card.subtitle}</Subtitle>
                </StatsInfo>
              </CardContent>
            </StatsCard>
          </Grid>
        ))}

        <Grid item xs={12} lg={6}>
          <ChartCard>
            <ChartHeader>
              <Typography variant="h6">Sales Trend</Typography>
              <Typography variant="body2" color="textSecondary">
                Last 7 days
              </Typography>
            </ChartHeader>
            <SalesChart type="line" />
          </ChartCard>
        </Grid>

        <Grid item xs={12} lg={6}>
          <ChartCard>
            <ChartHeader>
              <Typography variant="h6">Revenue Analysis</Typography>
              <Typography variant="body2" color="textSecondary">
                Monthly comparison
              </Typography>
            </ChartHeader>
            <SalesChart type="bar" />
          </ChartCard>
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};

// Styled Components
const DashboardContainer = styled(Box)(({ theme }) => ({
  padding: '24px',
  backgroundColor: '#f8f9fa',
  minHeight: '100vh',
}));

const PageHeader = styled(Box)(({ theme }) => ({
  marginBottom: '32px',
}));

const StatsCard = styled(Paper)(({ color }) => ({
  padding: '24px',
  borderRadius: '16px',
  background: theme.colors.white,
  boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
  
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 4px 25px rgba(0,0,0,0.12)',
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100px',
    height: '100px',
    background: theme.colors[color],
    opacity: 0.1,
    borderRadius: '50%',
    transform: 'translate(30%, -30%)',
  }
}));

const CardContent = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '16px',
});

const IconWrapper = styled(Box)(({ color }) => ({
  padding: '12px',
  borderRadius: '12px',
  backgroundColor: theme.colors[color],
  color: theme.colors.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StatsInfo = styled(Box)({
  flex: 1,
});

const CardTitle = styled(Typography)({
  fontSize: '0.875rem',
  color: theme.colors.text.secondary,
  marginBottom: '8px',
});

const NumberWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'baseline',
  gap: '8px',
  marginBottom: '4px',
});

const StatsNumber = styled(Typography)({
  fontSize: '1.75rem',
  fontWeight: 700,
  color: theme.colors.text.primary,
});

const TrendIndicator = styled(Typography)(({ isPositive }) => ({
  fontSize: '0.875rem',
  fontWeight: 600,
  color: isPositive ? theme.colors.success : theme.colors.error,
  padding: '4px 8px',
  borderRadius: '4px',
  backgroundColor: isPositive ? 'rgba(0, 184, 148, 0.1)' : 'rgba(255, 118, 117, 0.1)',
}));

const Subtitle = styled(Typography)({
  fontSize: '0.75rem',
  color: theme.colors.text.secondary,
});

const ChartCard = styled(Paper)({
  padding: '24px',
  borderRadius: '16px',
  background: theme.colors.white,
  boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
  height: '100%',
});

const ChartHeader = styled(Box)({
  marginBottom: '24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export default SellerHomePage;
