import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box,
  Alert,
  CircularProgress,
  Tabs,
  Tab
} from '@mui/material';
import api from '../../services/api';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState(0);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await api.get('/todos');
      setTodos(response.data);
    } catch (error) {
      setError('Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todoData) => {
    try {
      const response = await api.post('/todos', todoData);
      setTodos([response.data, ...todos]);
    } catch (error) {
      setError('Failed to add todo');
    }
  };

  const handleUpdateTodo = async (id, updateData) => {
    try {
      const response = await api.put(`/todos/${id}`, updateData);
      setTodos(todos.map(todo => 
        todo._id === id ? response.data : todo
      ));
    } catch (error) {
      setError('Failed to update todo');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      setError('Failed to delete todo');
    }
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 1:
        return todos.filter(todo => !todo.completed);
      case 2:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Tasks
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <AddTodo onAddTodo={handleAddTodo} />
      
      <Tabs value={filter} onChange={(e, newValue) => setFilter(newValue)} sx={{ mb: 3 }}>
        <Tab label={`All (${todos.length})`} />
        <Tab label={`Pending (${todos.filter(t => !t.completed).length})`} />
        <Tab label={`Completed (${todos.filter(t => t.completed).length})`} />
      </Tabs>
      
      {filteredTodos.length === 0 ? (
        <Typography variant="body1" color="text.secondary" align="center">
          No tasks found
        </Typography>
      ) : (
        filteredTodos.map(todo => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onUpdateTodo={handleUpdateTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        ))
      )}
    </Box>
  );
};

export default TodoList;