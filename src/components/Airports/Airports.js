import React from 'react'
import classes from './Airports.scss'
import _ from 'lodash'

class Airports extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fromAirportSelected: false,
      toAirportSelected: false,
      fromAirport: null,
      toAirport: null,
      formSubmitted: false,
      distance: null
    }

    //We don't want to fire the autocomplete a million times, just when the user stops typing
    this.getAutocomplete = _.debounce(this.getAutocomplete,250);
  }

  calculateAndDisplayRoute(directionsService, directionsDisplay ,from, to) {
    directionsService.route({
      origin: from,
      destination: to,
      travelMode: google.maps.TravelMode.DRIVING
    }, function (response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    })
  }

  componentWillMount() {
    const script = document.createElement("script");

    // Normally this would be an env variable
    const GOOGLE_API_KEY = 'YOUR API KEY HERE';

    script.src = `http://maps.google.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=geometry`;
    script.async = true;

    document.body.appendChild(script);
  }

  onAutocompleteFromChange(e){
    const value = e.target.value;
    this.setState({fromAirportSelected: false});
    this.getAutocomplete(value, "from");
  }

  onAutocompleteToChange(e){
    const value = e.target.value;
    this.setState({toAirportSelected: false});
    this.getAutocomplete(value, "to");
  }

  getAutocomplete(value, field) {
    this.props.airportAutocomplete(value, field);
  }

  onFromAirportClick(airport, e){
    this.setState({fromAirportSelected: true, fromAirport: airport});
    this.refs.fromAirportInput.value = airport.name
  }

  onToAirportClick(airport, e){
    this.setState({toAirportSelected: true, toAirport: airport});
    this.refs.toAirportInput.value = airport.name
  }

  onSubmitClick(e){
    const {
      fromAirport,
      toAirport
    } = this.state

    if (fromAirport && toAirport){
      let from = new google.maps.LatLng(fromAirport.lat, fromAirport.lng);
      let to = new google.maps.LatLng(toAirport.lat, toAirport.lng);
      let dist = google.maps.geometry.spherical.computeDistanceBetween(from, to);
      // Using the conversion from this website: http://www.metric-conversions.org/length/meters-to-nautical-miles.htm
      let nauticalDist = dist * 0.00053996;
      this.setState({formSubmitted: true, distance: nauticalDist});
      // Google maps stuff
      const directionsService = new google.maps.DirectionsService;
      const directionsDisplay = new google.maps.DirectionsRenderer;

      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: {lat: 41.85, lng: -87.65}
      });
      directionsDisplay.setMap(map);

      this.calculateAndDisplayRoute(directionsService, directionsDisplay, from, to)
    }
  }

  render() {

    const {
      fromAutocomplete,
      toAutocomplete,
    } = this.props;

    const {
      fromAirportSelected,
      toAirportSelected,
      fromAirport,
      toAirport,
      formSubmitted,
      distance
    } = this.state;


    return (
      <div>
        <div className={classes.inputsContainer}>
          <div className={classes.autocompleteContainer}>
            <div className={classes.airportLabel}>
              Origin Airport
            </div>
            <input
              size="50"
              ref="fromAirportInput"
              type="text"
              onChange={this.onAutocompleteFromChange.bind(this)}
            />
            {(fromAutocomplete.length > 0) && (!fromAirportSelected) && (
              <div>
                {fromAutocomplete.map(
                  (airport) =>
                    <div
                      onClick={this.onFromAirportClick.bind(this, airport)}
                      key={airport.geonameId}
                      className={classes.airportNameContainer}
                    >
                      {airport.name}
                    </div>
                )}
              </div>
            )}
          </div>
          <div className={classes.autocompleteContainer}>
            <div className={classes.airportLabel}>
              Destination Airport
            </div>
            <input
              size="50"
              ref="toAirportInput"
              type="text"
              onChange={this.onAutocompleteToChange.bind(this)}
            />
            {(toAutocomplete.length > 0) && (!toAirportSelected) && (
              <div>
                {toAutocomplete.map(
                  (airport) =>
                    <div
                      onClick={this.onToAirportClick.bind(this, airport)}
                      key={airport.geonameId}
                      className={classes.airportNameContainer}
                    >
                      {airport.name}
                    </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div>
          <button className="btn btn-default" onClick={this.onSubmitClick.bind(this)}>Get Directions</button>
        </div>
        <div className={classes.mapAndDistanceContainer}>
          {(formSubmitted) && (
            <div>The distance between {fromAirport.name} and {toAirport.name} is {distance} nautical miles. </div>
          )}
          <div className={classes.mapContainer} id="map"></div>
        </div>
      </div>
    )
  }
}

Airports.propTypes = {
  airportAutocomplete: React.PropTypes.func.isRequired,
}

export default Airports
