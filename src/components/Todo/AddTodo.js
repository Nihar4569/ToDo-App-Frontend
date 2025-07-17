import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Box,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddTodo = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    setLoading(true);
    await onAddTodo({ title, description });
    setTitle('');
    setDescription('');
    setLoading(false);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Add New Task
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={2}
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ mt: 2 }}
            disabled={loading || !title.trim()}
          >
            {loading ? 'Adding...' : 'Add Task'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AddTodo;