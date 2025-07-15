import { useState , useEffect} from "react";

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

import { Line } from "react-chartjs-2";

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

const ESP_URL = "http://[ip]/data"


function gaussianRandom(mean=0, stdev=1) {
    const u = 1 - Math.random(); // Converting [0,1) to (0,1]
    const v = Math.random();
    const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    // Transform to the desired mean and standard deviation:
    return z * stdev + mean;
}

function getFakeData(){
    return {temp:gaussianRandom(30, 4), humid:gaussianRandom(70,3)};
}

function LiveChart(){
    const [tempData, setTempData] = useState([]);
    const [humidData, setHumidData] = useState([]);
    const [timestamps, setTimestamps] = useState([]);

    const tempDataset = {
        labels: timestamps,
        datasets:[
            {
                label: "Temperature",
                data: tempData,
                backgroundColor: [
                    "rgba(43,63,229,0.8)"
                ]
            }
        ]
    }

     const humidDataset = {
        labels: timestamps,
        datasets:[
            {
                label: "Humidity",
                data: humidData,
                backgroundColor:[
                    "rgba(229, 108, 43, 0.8)"
                ]
            }
        ]
    }


    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        layout:{
            
        },
        scales: {
            y: {
                beginAtZero: false,
                suggestedMin:10,
                suggestedMax:100
            },
        },
    };
    
    useEffect(()=>{
        const interval = setInterval(()=>{
            fetch(ESP_URL)
                .then((response) => response.json())
                .then((data) => {

                setTempData(prev => [...prev, data.temp].slice(-19));
                setHumidData(prev => [...prev, data.humid].slice(-19));
            }).catch(error => {
                // Handle any errors that occurred during the fetch or in the .then() blocks
                console.error('Fetch error:', error);
            });

            // const data = getFakeData();

            // setTempData(prev => [...prev, data.temp].slice(-19));
            // setHumidData(prev => [...prev, data.humid].slice(-19));
            
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { hour12: false });
            setTimestamps(prev => [...prev, timeString].slice(-19));

        }, 3000);

        return ()=>clearInterval(interval);
    }, []);


    return (
    <div class="chart-container">
        <div class="box">
            <Line data={tempDataset} options={options}/>
        </div>
        <div class="box">
            <Line data={humidDataset} options={options}/>
        </div>
    </div>
    );
}

export default LiveChart;