/* global fetch */

import React from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';
import queryString from 'query-string';
import ReactAnimatedWeather from 'react-animated-weather';
import appClasses from './App.css';
import { getIcon } from './utils/getIcon';

const baseURL = 'http://api.openweathermap.org/data/2.5/';
const APIKEY = 'e157ce238d967d8f28da1df242247ae9';

export const Day = (props) => {
  const date = props.day.dt;
  const icon = getIcon(props.day.weather[0].id);
  const animate = true;
  const iconSize = 64;
  const iconColor = 'black';
  return (
    <div className={appClasses.dayContainer} onClick={props.onClick} role="link" tabIndex="-1">
       <ReactAnimatedWeather
            icon={icon}
            color={iconColor}
            size={iconSize}
            animate={animate}
        />
      <h2 className={appClasses.date}>{(new Date(date * 1000)).toDateString()}</h2>
    </div>
  );
};

Day.defaultProps = {
  onClick: () => {},
};

Day.propTypes = {
  day: PropTypes.shape({
    dt: PropTypes.number.isRequired,
    weather: PropTypes.array.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = { city: '', forecast: [], loading: true };
  }

  componentDidMount() {
    const city = queryString.parse(this.props.location.search).city; // eslint-disable-line
    this.fetchWeather(city);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search === nextProps.location.search) { // eslint-disable-line
      return;
    }
    const city = queryString.parse(nextProps.location.search).city; // eslint-disable-line
    this.fetchWeather(city);
  }

  fetchWeather = (city) => {
    console.log(city);
    this.setState({ city, loading: true });
    const cityHTTP = city.split(' ').join('%20');
    fetch(`${baseURL}forecast?q=${cityHTTP}&APPID=${APIKEY}&units=metric&cnt=5&type=accurate`)
      .then(response => response.json())
      .then((json) => {
        this.setState({ forecast: json.list, loading: false });
      });
      console.log("forecast");
      console.log(this.state);
  }

  handleClick = (day) => {
    this.props.history.push({ // eslint-disable-line
      pathname: `/details/${this.state.city}`,
      state: day,
    });
  }

  render() {
      console.log("render");
      console.log(this.state);
    const { city, forecast } = this.state;

    return this.state.loading ?
      <h1 className={appClasses.forecastHeader}>Loading...</h1> :
      (
        <div className={appClasses.forecastContainer}>
          <h1 className={appClasses.forecastHeader}>{city}</h1>
          {forecast.map(day =>
            <Day key={day.dt} day={day} onClick={() => this.handleClick(day)} />,
          )}
        </div>
      );
  }
}

export default Forecast;