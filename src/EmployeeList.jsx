import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Paper, Box, Button, TextField } from '@mui/material';

const EmployeeList = ({ employees }) => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Employee Dashboard
      </Typography>
      <Box mb={2}>
        <TextField
          label="Search Employees"
          variant="outlined"
          fullWidth
          value={search}
          onChange={handleSearchChange}
        />
      </Box>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Employee List
        </Typography>
        <List>
          {filteredEmployees.map(emp => (
            <ListItem button component={Link} to={`/employee/${emp.id}`} key={emp.id}>
              <ListItemAvatar>
                <Avatar>{emp.name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={emp.name} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary">
          Add Employee
        </Button>
      </Box>
    </Container>
  );
};

export default EmployeeList;
