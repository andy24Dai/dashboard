import React from 'react';
import './App.css';

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import LiveChart from './sensors/SensorCharts';

// Register components for Chart.js v4+
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

function App() {
  return (
    <div className="App">
      <h1>DHT11 SENSOR READING</h1>
      <LiveChart></LiveChart>
    </div>
  );
}

export default App;