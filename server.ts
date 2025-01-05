import app from './src/app';
import dbConnect from './src/config/dbConnect';

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await dbConnect();
  console.log(`Server is running on port ${PORT}`);
});
