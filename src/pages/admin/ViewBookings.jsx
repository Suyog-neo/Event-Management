import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const dummyBookings = [
  { eventId: 1, userId: 101, username: 'John Doe', seats: ['A1', 'A2'] },
  { eventId: 2, userId: 102, username: 'Jane Smith', seats: ['B1', 'B2'] },
  { eventId: 3, userId: 103, username: 'Alice Johnson', seats: ['C1', 'C2'] },
  { eventId: 4, userId: 104, username: 'Bob Brown', seats: ['D1', 'D2'] },
  { eventId: 5, userId: 105, username: 'Charlie White', seats: ['E1', 'E2'] },
];

export default function ViewBookings() {
  const bookings = useSelector((state) =>
    state.bookings.length ? state.bookings : dummyBookings
  );
  const events = useSelector((state) => state.events);

  return (
    <Box
      sx={{
        flexGrow: 1,
        px: { xs: 2, sm: 4 },
        py: 4,
        mx: 'auto',
        width: '100%',
        maxWidth: { xs: '100%', sm: '800px', md: '1200px', lg: '1700px' },
        backgroundColor: '#ffffff',
        minHeight: '85vh',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: { xs: 'center', sm: 'left' } }}
      >
        All Bookings
      </Typography>

      {bookings.length === 0 ? (
        <Typography
          variant="body1"
          align="center"
          sx={{ mt: 4, fontSize: { xs: '0.9rem', sm: '1rem' } }}
        >
          No bookings made yet.
        </Typography>
      ) : (
        <Paper
          elevation={3}
          sx={{
            mt: 2,
            p: { xs: 1, sm: 2 },
          }}
        >
          <List>
            {bookings.map((b, i) => {
              const event = events.find((e) => e.id === b.eventId);
              return (
                <ListItem
                  key={i}
                  divider
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                    },
                    '& .MuiListItemText-secondary': {
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    },
                  }}
                >
                  <ListItemText
                    primary={`${event?.title || 'Unknown Event'} - ${b.username}`}
                    secondary={`📍 ${event?.location || 'N/A'} | 📅 ${event?.date || 'N/A'} | Seats: ${b.seats.join(', ')}`}
                  />
                </ListItem>
              );
            })}
          </List>
        </Paper>
      )}
    </Box>
  );
}
