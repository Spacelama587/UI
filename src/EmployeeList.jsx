import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, Typography, Grid, Paper, Box, Button, TextField, 
  Card, CardContent, CardActions, Avatar, Chip, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, LineChart, Line
} from 'recharts';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';

const EmployeeList = ({ employees }) => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  // Dummy data for charts
  const skillDistributionData = [
    { name: 'JavaScript', count: 15 },
    { name: 'React', count: 12 },
    { name: 'Node.js', count: 8 },
    { name: 'Python', count: 10 },
    { name: 'Java', count: 7 },
    { name: 'C#', count: 6 },
  ];

  const skillGrowthData = [
    { month: 'Jan', newSkills: 5 },
    { month: 'Feb', newSkills: 8 },
    { month: 'Mar', newSkills: 12 },
    { month: 'Apr', newSkills: 15 },
    { month: 'May', newSkills: 20 },
    { month: 'Jun', newSkills: 18 },
  ];

  const topPerformers = [
    { id: 1, name: 'John Doe', skills: ['JavaScript', 'React', 'Node.js'], score: 95 },
    { id: 2, name: 'Jane Smith', skills: ['Python', 'Django', 'SQL'], score: 92 },
    { id: 3, name: 'Mike Johnson', skills: ['Java', 'Spring', 'Hibernate'], score: 90 },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Skill Management Dashboard
          </Typography>
        </Grid>

        {/* Search Bar */}
        <Grid item xs={12}>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
          >
            <IconButton sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <TextField
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Employees"
              value={search}
              onChange={handleSearchChange}
            />
          </Paper>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Total Employees
            </Typography>
            <Typography component="p" variant="h4">
              {employees.length}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              <GroupIcon /> Active team members
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Total Skills
            </Typography>
            <Typography component="p" variant="h4">
              {skillDistributionData.reduce((acc, curr) => acc + curr.count, 0)}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              <SchoolIcon /> Across all employees
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Skill Growth
            </Typography>
            <Typography component="p" variant="h4">
              +{skillGrowthData[skillGrowthData.length - 1].newSkills}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              <TrendingUpIcon /> New skills this month
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Top Performer
            </Typography>
            <Typography component="p" variant="h4">
              {topPerformers[0].name}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              <EmojiEventsIcon /> Score: {topPerformers[0].score}
            </Typography>
          </Paper>
        </Grid>

        {/* Skill Distribution Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Skill Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Skill Growth Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Skill Growth Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={skillGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="newSkills" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Top Performers */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Top Performers
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Skills</TableCell>
                    <TableCell align="right">Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topPerformers.map((performer) => (
                    <TableRow key={performer.id}>
                      <TableCell>{performer.name}</TableCell>
                      <TableCell>
                        {performer.skills.map((skill) => (
                          <Chip key={skill} label={skill} size="small" sx={{ mr: 0.5 }} />
                        ))}
                      </TableCell>
                      <TableCell align="right">{performer.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Employee List */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Employee List
            </Typography>
            <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
              {filteredEmployees.map(emp => (
                <Card key={emp.id} sx={{ mb: 2 }}>
                  <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ mr: 2 }}>{emp.name[0]}</Avatar>
                    <Typography variant="h6">{emp.name}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" component={Link} to={`/employee/${emp.id}`}>
                      View Profile
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Add Employee Button */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
            >
              Add Employee
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EmployeeList;