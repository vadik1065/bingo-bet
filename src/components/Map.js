import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = () => (
  <div className="point-map" style={{
    backgroundColor: 'white',
    width: '120px',
    height: '40px',
    display: 'flex',
    borderRadius: '5px'
  }}>
  </div>
);

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 12.130739,
      lng: -68.895085
    },
    zoom: 15
  };

  render() {
    const exampleMapStyles = [
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [
            {
                color: "#AEE2E0",
            },
        ],
    },
    {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [
            {
                color: "#ABCE83",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#9BBF72",
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#E9EDA4",
            },
        ],
    },
    {
    featureType: "administrative",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off"
      }
    ]
  }
];

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyChBSRi1qhIbP4lkbCmhGBIA-A1ZaAN78Y' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={{
                styles: exampleMapStyles,
            }}
        >
          <AnyReactComponent

            lat={12.131439}
            lng={-68.896585}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
