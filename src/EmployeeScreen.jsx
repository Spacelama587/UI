import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, Typography, Paper, Box, Grid, Rating, Slider, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Button
} from '@mui/material';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { TagCloud } from 'react-tagcloud';

const EmployeeScreen = ({ employees, addSkill }) => {
  const { id } = useParams();
  const employee = employees.find(emp => emp.id === parseInt(id));
  const [skillRatings, setSkillRatings] = useState({});
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    if (employee) {
      const initialRatings = employee.skills.reduce((acc, skill) => {
        acc[skill] = { rating: 0, proficiency: 0 };
        return acc;
      }, {});
      setSkillRatings(initialRatings);
    }
  }, [employee]);

  if (!employee) {
    return (
      <Container className="mt-8">
        <Typography variant="h4" gutterBottom>Employee Not Found</Typography>
      </Container>
    );
  }

  const handleRatingChange = (skill, newValue) => {
    setSkillRatings(prev => ({
      ...prev,
      [skill]: { ...prev[skill], rating: newValue }
    }));
  };

  const handleProficiencyChange = (skill, newValue) => {
    setSkillRatings(prev => ({
      ...prev,
      [skill]: { ...prev[skill], proficiency: newValue }
    }));
  };

  const handleAddSkill = () => {
    if (newSkill && !employee.skills.includes(newSkill)) {
      addSkill(employee.id, newSkill);
      setSkillRatings(prev => ({
        ...prev,
        [newSkill]: { rating: 0, proficiency: 0 }
      }));
      setNewSkill('');
    }
  };

  const radarData = employee.skills.map(skill => ({
    skill,
    rating: skillRatings[skill]?.rating || 0,
    proficiency: skillRatings[skill]?.proficiency || 0
  }));

  const tagCloudData = employee.skills.map(skill => ({
    value: skill,
    count: (skillRatings[skill]?.rating + skillRatings[skill]?.proficiency) / 2
  }));

  return (
    <Container className="mt-8">
      <Typography variant="h4" gutterBottom>{employee.name}'s Dashboard</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="p-4">
            <Typography variant="h6" gutterBottom>Skill Ratings</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Skill</TableCell>
                    <TableCell>Self-Rating</TableCell>
                    <TableCell>Proficiency</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employee.skills.map(skill => (
                    <TableRow key={skill}>
                      <TableCell>{skill}</TableCell>
                      <TableCell>
                        <Rating
                          value={skillRatings[skill]?.rating || 0}
                          onChange={(event, newValue) => handleRatingChange(skill, newValue)}
                        />
                      </TableCell>
                      <TableCell>
                        <Slider
                          value={skillRatings[skill]?.proficiency || 0}
                          onChange={(event, newValue) => handleProficiencyChange(skill, newValue)}
                          step={10}
                          marks
                          min={0}
                          max={100}
                          valueLabelDisplay="auto"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="p-4">
            <Typography variant="h6" gutterBottom>Skill Radar</Typography>
            <RadarChart width={400} height={300} data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Rating" dataKey="rating" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="Proficiency" dataKey="proficiency" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
              <Legend />
            </RadarChart>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} className="p-4">
            <Typography variant="h6" gutterBottom>Skill Cloud</Typography>
            <TagCloud
              minSize={12}
              maxSize={35}
              tags={tagCloudData}
              className="text-center"
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} className="p-4">
            <Typography variant="h6" gutterBottom>Add New Skill</Typography>
            <Box className="flex gap-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Enter new skill"
                className="flex-grow p-2 border rounded"
              />
              <Button variant="contained" color="primary" onClick={handleAddSkill}>
                Add Skill
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EmployeeScreen;