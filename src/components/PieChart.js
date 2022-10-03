import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { getTempCurrency, thousandSeparator } from '../utils/utils';
import chip from '../images/crypto-logos/bcoin.png';

const Pie = (props) => {
  // const data = [
  //   { title: props.title1, value: +props.value1, color: props.bg1 },
  //   { title: props.title2, value: +props.value2, color: props.bg2 },
  // ]
  const data = [
    { title: props.title1, value: +props.value1, color: props.bg1 },
    { title: props.title2, value: +props.value1 < 100 ? 100 - +props.value1 : 0, color: props.bg2 },
  ]

  console.log(props.value1_count);
  console.log(props.value2_count);
  return (
    <>
      <p className="pie-header">{props.header}</p>
      <PieChart
        rounded
        startAngle={90}
        lineWidth={30}
        data={data}
        // label={({ dataEntry }) => +props.value1 > +props.value2 ? Math.round(props.value1) +"%" : Math.round(props.value2) +"%"}
        label={({ dataEntry }) => Math.round(props.value1) +"%"}
        labelStyle={{
          fontSize: '18px',
          fill: props.bg1,
        }}
        labelPosition={0}
      />
      <div className="data-line flex">
        <div className="single-data-line">
          <div className="data-card flex">
            <div className="color-bg" style={{ backgroundColor: props.bg1 }}></div>
            <img src={chip} alt="chip" className="chip-icon"/>
            <p className="number">
              {/* {props.value1_count} */}
              {thousandSeparator((+props.value1_count).toFixed(2))}
            </p>
          </div>
          <p>{props.title1}</p>
        </div>

        <div className="single-data-line">
          <div className="data-card flex">
            <div className="color-bg" style={{ backgroundColor: props.bg3 || props.bg2 }}></div>
            <img src={chip} alt="chip" className="chip-icon"/>
            <p className="number">
              {/* {props.value2_count} */}
              {thousandSeparator((+props.value2_count).toFixed(2))}
            </p>
          </div>
          <p>{props.title2}</p>
        </div>

      </div>
    </>
  )
}

export default Pie;
