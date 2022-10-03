import ReactApexChart from 'react-apexcharts';
import React, {useState, useEffect} from "react";
import i18next from "i18next";

export default function ApexChart(props) {
  const [series, setSeries] = useState([{name: "", data: []}])
  const [options, setOptions] = useState({});

  useEffect(() => {
    if (props.topGames.length > 0) {
      let gamesNames = [];
      let gamesCount = [];
      props.topGames.forEach((item) => {
        gamesNames.push(item.game_name);
        gamesCount.push(item.cnt)
      });
      let currentOptions = {
        chart: {
          height: props.is4k ? 800 : 400,
          type: 'bar',
          events: {
            click: function(chart, w, e) {
              // console.log(chart, w, e)
            }
          }
        },
        colors: ['#3A572F'],
        plotOptions: {
          bar: {
            columnWidth: '15%',
            distributed: true
          }
        },
        dataLabels: {
          enabled: true
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: gamesNames,
          labels: {
            style: {
              colors: ['#3A572F'],
              fontSize: props.is4k ? '24px' : '12px',
            },
            maxHeight: props.is4k ? 250 : 120,
          }
        }
      };
      setOptions(currentOptions);
      setSeries([{name: i18next.t("Total played"), data: gamesCount}]);
    }

  }, [props.topGames])

  return (
    <div className='chart-bars'>
      {series[0].data.length > 0 && 
        <ReactApexChart 
          options={options} 
          series={series} 
          type="bar" 
          height={props.is4k ? 700 : 350} 
        />
      }
    </div>
  );
}
