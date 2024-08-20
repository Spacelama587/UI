import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, Paper, Box } from '@mui/material';

const EmployeeScreen = ({ employees, addSkill }) => {
  const { id } = useParams();
  const employee = employees.find(emp => emp.id === parseInt(id));

  // Initialize skills if employee is found; otherwise, use an empty array
  const [newSkill, setNewSkill] = useState('');
  const skills = employee?.skills || [];

  const handleAddSkill = () => {
    if (newSkill && employee) {
      addSkill(employee.id, newSkill);
      setNewSkill('');
    }
  };

  // Show a message if the employee is not found
  if (!employee) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Employee Not Found
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {employee.name}'s Profile
      </Typography>
      <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
        <Typography variant="h6" gutterBottom>
          Skills
        </Typography>
        <List>
          {skills.map((skill, index) => (
            <ListItem key={index}>
              <ListItemText primary={skill} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box mt={2}>
        <TextField
          label="Add new skill"
          variant="outlined"
          fullWidth
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddSkill}
          sx={{ marginTop: 2 }}
        >
          Add Skill
        </Button>
      </Box>
    </Container>
  );
};

export default EmployeeScreen;
