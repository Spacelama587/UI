import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EmployeeList from './EmployeeList';
import EmployeeScreen from './EmployeeScreen';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Primary color
    },
    secondary: {
      main: '#dc004e', // Secondary color
    },
  },
});

const App = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', skills: ['JavaScript', 'React'] },
    { id: 2, name: 'Jane Smith', skills: ['JavaScript', 'Node.js'] },
    { id: 3, name: 'Alice Johnson', skills: ['JavaScript', 'CSS', 'React'] },
    { id: 4, name: 'Bob Brown', skills: ['JavaScript', 'HTML', 'CSS'] },
    { id: 5, name: 'Charlie Davis', skills: ['Python', 'Django'] },
    { id: 6, name: 'Diana Clark', skills: ['JavaScript', 'Angular'] },
    { id: 7, name: 'Edward Lewis', skills: ['JavaScript', 'TypeScript', 'React'] },
    { id: 8, name: 'Fiona Martinez', skills: ['JavaScript', 'Node.js', 'Express'] },
    { id: 9, name: 'George Wilson', skills: ['Ruby', 'Rails'] },
    { id: 10, name: 'Hannah Moore', skills: ['JavaScript', 'Vue.js'] },
  ]);

  const addSkill = (employeeId, newSkill) => {
    setEmployees(employees.map(emp =>
      emp.id === employeeId
        ? { ...emp, skills: [...(emp.skills || []), newSkill] }
        : emp
    ));
  };

  // Calculate skill counts
  const skillCounts = employees.flatMap(emp => emp.skills)
    .reduce((acc, skill) => {
      acc[skill] = (acc[skill] || 0) + 1;
      return acc;
    }, {});

  // Chart data
  const data = Object.entries(skillCounts).map(([skill, count]) => ({
    name: skill,
    value: count,
  }));

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<>
          <EmployeeList employees={employees} />
          <div style={{ padding: '20px' }}>
            <h2>Company Skill Distribution</h2>
            <PieChart width={800} height={400}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </>} />
        <Route path="/employee/:id" element={<EmployeeScreen employees={employees} addSkill={addSkill} />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
