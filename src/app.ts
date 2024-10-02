import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import errorHandler from './middleware/errorHandler'; // Import the error handler middleware

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use Routes
app.use('/api/auth', authRoutes);

// Define a simple route to check server status
app.get('/', (req, res) => {
  res.send('Expense Manager API is running');
});

// Use the error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
