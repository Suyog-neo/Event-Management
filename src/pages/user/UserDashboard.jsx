import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Fade,
  Slide,
  Divider,
  useTheme,
} from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from '../../components/Footer';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const theme = useTheme();

  const actions = [
    {
      title: 'View All Events',
      icon: <EventAvailableIcon sx={{ fontSize: 40, color: '#0288d1' }} />,
      onClick: () => navigate('/user/events'),
    },
    {
      title: 'My Bookings',
      icon: <BookmarkIcon sx={{ fontSize: 40, color: '#7b1fa2' }} />,
      onClick: () => navigate('/user/bookings'),
    },
  ];

  const carouselItems = [
    {
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      caption: 'Book Your Favorite Events',
    },
    {
      image: 'https://images.unsplash.com/photo-1619229667009-e7e51684e8e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fGNvbmNlcnR8ZW58MHwwfDB8fHww',
      caption: 'Experience Live Concerts',
    },
    {
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      caption: 'Join Exciting Workshops',
    },
  ];

  const categories = [
    { title: 'Technology', description: 'Explore tech events and conferences.' },
    { title: 'Entertainment', description: 'Enjoy concerts, movies, and festivals.' },
    { title: 'Business', description: 'Network at business meetups and expos.' },
    { title: 'Art', description: 'Discover art exhibitions and creative workshops.' },
    { title: 'Sports', description: 'Participate in sports events and competitions.' },
    { title: 'Wellness', description: 'Relax with yoga retreats and wellness programs.' },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
  };

  return (
    <Fade in timeout={500}>
      <Box sx={{ background: '#fdfdfd', minHeight: '100vh', px: 2, pt: 4, pb: 8 }}>
        <Box
          sx={{
            maxWidth: '1400px',
            mx: 'auto',
            backgroundColor: '#ffffff',
            borderRadius: 3,
            boxShadow: 3,
            overflow: 'hidden',
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            textAlign="center"
            color="#3f51b5"
            sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mt: 4 }}
          >
            User Dashboard
          </Typography>

          {/* Carousel */}
          <Slider {...sliderSettings} style={{ marginBottom: '2rem' }}>
            {carouselItems.map((item, index) => (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  height: { xs: 220, sm: 300, md: 400 },
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 3,
                }}
              >
                <img
                  src={item.image}
                  alt={item.caption}
                  onError={(e) => {
                    e.target.onerror = null;
                    //e.target.src = 'https://via.placeholder.com/800x300?text=Image+Unavailable';
                    e.target.src = 'https://dummyimage.com/800x300/cccccc/000000&text=Image+Unavailable';

                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'flex-end',
                    p: 3,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {item.caption}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Slider>

          {/* Action Cards */}
          <Typography variant="h5" textAlign="center" mt={4} mb={2} fontWeight="bold" color="text.primary">
            Quick Actions
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {actions.map((action, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Slide in direction="up" timeout={400}>
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      background: '#f5f5f5',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                      },
                    }}
                  >
                    <CardActionArea onClick={action.onClick} sx={{ p: 3, textAlign: 'center' }}>
                      <Box mb={1}>{action.icon}</Box>
                      <CardContent>
                        <Typography variant="h6" fontWeight="medium">
                          {action.title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Slide>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 5 }} />

          {/* Categories Section */}
          <Box sx={{ px: 3, pb: 5 }}>
            <Typography variant="h5" textAlign="center" mb={4} fontWeight="bold" color="text.primary">
              Event Categories
            </Typography>

            <Grid container spacing={3} justifyContent="center">
              {categories.map((category, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      borderRadius: 3,
                      background: index % 2 === 0 ? '#0288d1' : '#7b1fa2',
                      color: 'white',
                      transition: '0.3s',
                      '&:hover': {
                        transform: 'scale(1.03)',
                        boxShadow: 10,
                        background: index % 2 === 0 ? '#0277bd' : '#6a1b9a',
                      },
                    }}
                    onClick={() => navigate(`/user/events?category=${category.title}`)}
                  >
                    <CardActionArea>
                      <CardContent>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                          {category.title}
                        </Typography>
                        <Typography variant="body2" color="inherit">
                          {category.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

      </Box>
    </Fade>
  );
}
