import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/googlemap';

class WeatherList extends Component {
  renderWeather(cityData) {
    const name = cityData.city.name;
    const temps = cityData.list.map(weather => weather.main.temp - 273);
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const humidities = cityData.list.map(weather => weather.main.humidity);
    // Same as doing:
    // const lon = cityData.city.coord.lon;
    // const lat = cityData.city.coord.lat;
    const { lat, lon } = cityData.city.coord
    console.log(temps);

    return (
      <tr key={name}>
        <td><GoogleMap lat={lat} lon={lon}  /></td>
        <td><Chart data={temps} color="red" units="C"/></td>
        <td><Chart data={pressures} color="green" units="hPa"/></td>
        <td><Chart data={humidities} color="blue" units="%"/></td>
      </tr>
    );
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature</th>
            <th>Pressure</th>
            <th>Humidity</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    )
  }
}

function mapStateToProps({ weather }) {
  return { weather };
}

// Same as doing:
// function mapStateToProps(state) {
//   return { weather: state.weather }
// }

export default connect(mapStateToProps)(WeatherList);
