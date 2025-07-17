import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Checkbox, 
  IconButton,
  Box,
  TextField,
  Button,
  Chip
} from '@mui/material';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';

const TodoItem = ({ todo, onUpdateTodo, onDeleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);

  const handleToggleComplete = () => {
    onUpdateTodo(todo._id, { completed: !todo.completed });
  };

  const handleSaveEdit = () => {
    onUpdateTodo(todo._id, { 
      title: editTitle, 
      description: editDescription 
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setIsEditing(false);
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="flex-start" gap={2}>
          <Checkbox
            checked={todo.completed}
            onChange={handleToggleComplete}
            sx={{ mt: 1 }}
          />
          
          <Box sx={{ flexGrow: 1 }}>
            {isEditing ? (
              <>
                <TextField
                  fullWidth
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  sx={{ mb: 1 }}
                />
                <TextField
                  fullWidth
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  multiline
                  rows={2}
                  sx={{ mb: 1 }}
                />
              </>
            ) : (
              <>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'text.secondary' : 'text.primary'
                  }}
                >
                  {todo.title}
                </Typography>
                {todo.description && (
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      textDecoration: todo.completed ? 'line-through' : 'none'
                    }}
                  >
                    {todo.description}
                  </Typography>
                )}
              </>
            )}
            
            <Box sx={{ mt: 1 }}>
              <Chip 
                label={todo.completed ? 'Completed' : 'Pending'} 
                color={todo.completed ? 'success' : 'warning'}
                size="small"
              />
            </Box>
          </Box>
          
          <Box>
            {isEditing ? (
              <>
                <IconButton onClick={handleSaveEdit} color="primary">
                  <Save />
                </IconButton>
                <IconButton onClick={handleCancelEdit}>
                  <Cancel />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton onClick={() => setIsEditing(true)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => onDeleteTodo(todo._id)} color="error">
                  <Delete />
                </IconButton>
              </>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TodoItem;