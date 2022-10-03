import ReactApexChart from 'react-apexcharts';
import React, { useState, useEffect } from "react";
import moment from 'moment';
export default function TransactionsChart(props) {
  const [series, setSeries] = useState([{ name: "", data: [] }])
  const [options, setOptions] = useState({});
  useEffect(() => {
    if (props.topGames.length > 0) {
      let gamesNames = [];
      let gamesCount = [];
      props.topGames.forEach((item) => {
        gamesNames.push(moment(item.date).format('DD/MM'));
        gamesCount.push(item.amount)
      });
      let currentOptions = {
        chart: {
          height: props.is4k ? 800 : 400,
          type: 'line',
          toolbar: {
            show: false
          }
        },
        colors: ['#A6D997', '#DD6F0C'],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
          width: props.is4k ? 3.6 : 1.8
        },
        title: {
          text: 'Transactions',
          fontWeight: 'bold',
          fontSize: props.is4k ? '40px' : '20px',
          align: 'left',
          offsetY: 10,
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        markers: {
          size: props.is4k ? 9.6 : 4.8
        },
        xaxis: {
          categories: gamesNames,
          labels: {
            maxHeight: props.is4k ? 250 : 120,
          }
        },
        yaxis: {
          labels: {
            maxWidth: 'inherit',
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -45,
          offsetX: -40,
          fontSize: props.is4k ? '24px' : '12px',
        }
      };

      setOptions(currentOptions);
      setSeries([
        {
          name: "Deposit",
          data: props.topGames.filter(i => i.operation === 'Deposit').map(el => el.amount)
        },
        {
          name: "Withdrawal",
          data: props.topGames.filter(i => i.operation === 'Withdrawal').map(el => el.amount)
        },
      ]);
    }

  }, [props.topGames]);

  return (
    <div className='chart-bars'>
      {series[0].data.length > 0 &&  
        <ReactApexChart 
          options={options} 
          series={series} 
          type="line" 
          height={props.is4k ? 700 : 350} />
      }
    </div>
  );
}
