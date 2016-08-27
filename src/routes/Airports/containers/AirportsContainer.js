import { connect } from 'react-redux'
import { airportAutocomplete } from '../modules/airports'
import Airports from 'components/Airports'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapActionCreators = {
  airportAutocomplete
}

const mapStateToProps = (state) => ({
  fromAutocomplete: state.airports.fromAutocomplete,
  toAutocomplete: state.airports.toAutocomplete
})

export default connect(mapStateToProps, mapActionCreators)(Airports)
