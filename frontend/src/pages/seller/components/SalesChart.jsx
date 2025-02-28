import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    SvgIcon,
    Typography,
    Box
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Chart from 'react-apexcharts';
import { ChartDatabyYear } from '../../../utils/chartData';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Theme colors
const theme = {
    colors: {
        primary: '#6c5ce7',
        secondary: '#a29bfe',
        success: '#00b894',
        text: {
            primary: '#2d3436',
            secondary: '#636e72'
        },
        background: {
            light: '#f8f9fa',
            gradient: 'linear-gradient(135deg, rgba(108,92,231,0.1) 0%, rgba(162,155,254,0.1) 100%)'
        }
    }
};

const SalesChart = ({ type }) => {
    const navigate = useNavigate();

    // Customize chart options
    const chartOptions = {
        ...ChartDatabyYear.options,
        theme: {
            mode: 'light',
            palette: 'palette1'
        },
        colors: [theme.colors.primary, theme.colors.secondary],
        chart: {
            ...ChartDatabyYear.options.chart,
            toolbar: {
                show: true,
                tools: {
                    download: false,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                },
                autoSelected: 'zoom'
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        markers: {
            size: 5,
            colors: [theme.colors.primary],
            strokeColors: '#fff',
            strokeWidth: 2,
            hover: {
                size: 7
            }
        }
    };

    return (
        <ChartCard>
            <CardHeader
                title={
                    <HeaderTitle>
                        <TrendingUpIcon sx={{ color: theme.colors.primary }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {type === 'line' ? 'Sales Analytics' : 'Revenue Trends'}
                        </Typography>
                    </HeaderTitle>
                }
                action={
                    <RefreshButton
                        size="small"
                        startIcon={<RefreshIcon />}
                    >
                        Refresh
                    </RefreshButton>
                }
            />

            <ChartContent>
                <ResponsiveChart
                    options={chartOptions}
                    series={ChartDatabyYear.series}
                    type={type}
                    height={350}
                />
            </ChartContent>

            <Divider sx={{ opacity: 0.1 }} />

            <CardActions sx={{ justifyContent: 'space-between', padding: '16px' }}>
                <ChartStats>
                    <StatItem>
                        <StatLabel>Total Sales</StatLabel>
                        <StatValue>₹84,286</StatValue>
                    </StatItem>
                    <StatDivider orientation="vertical" flexItem />
                    <StatItem>
                        <StatLabel>Growth</StatLabel>
                        <StatValue success>+24%</StatValue>
                    </StatItem>
                </ChartStats>

                <ViewDetailsButton
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate("/Seller/orders")}
                >
                    View Details
                </ViewDetailsButton>
            </CardActions>
        </ChartCard>
    );
};

// Styled Components
const ChartCard = styled(Card)(({ theme }) => ({
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 6px 25px rgba(0,0,0,0.12)'
    }
}));

const HeaderTitle = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px'
});

const ChartContent = styled(CardContent)({
    padding: '24px',
    background: theme.colors.background.gradient,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
});

const ResponsiveChart = styled(Chart)({
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',

    '@media (max-width: 600px)': {
        width: '100%'
    }
});

const RefreshButton = styled(Button)({
    color: theme.colors.text.secondary,
    textTransform: 'none',
    padding: '6px 12px',
    '&:hover': {
        background: theme.colors.background.light
    }
});

const ViewDetailsButton = styled(Button)({
    color: theme.colors.primary,
    textTransform: 'none',
    fontWeight: 600,
    '&:hover': {
        background: theme.colors.background.light
    }
});

const ChartStats = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
});

const StatItem = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
});

const StatLabel = styled(Typography)({
    fontSize: '0.875rem',
    color: theme.colors.text.secondary
});

const StatValue = styled(Typography)(({ success }) => ({
    fontSize: '1.25rem',
    fontWeight: 600,
    color: success ? theme.colors.success : theme.colors.text.primary
}));

const StatDivider = styled(Divider)({
    margin: '0 8px',
    backgroundColor: 'rgba(0,0,0,0.1)'
});

export default SalesChart;