// ------------------------------------
// Constants
// ------------------------------------
export const AIRPORT_AUTOCOMPLETE_REQUEST = 'AIRPORT_AUTOCOMPLETE_REQUEST'
export const AIRPORT_AUTOCOMPLETE_RESPONSE = 'AIRPORT_AUTOCOMPLETE_RESPONSE'

// ------------------------------------
// Actions
// ------------------------------------

export function airportAutocomplete (airportString, field) {
  return function (dispatch) {
    dispatch(airportAutocompleteRequest(airportString))

    //USERNAME SHOULD BE AN ENV VARIABLE HERE, BUT FOR EASE OF USE I AM HARDCODING
    let url = `http://api.geonames.org/searchJSON?fcode=AIRP&maxRows=10&country=US&username=tbogatchev&name_startsWith=${airportString}`;

    return fetch(url)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((json) => {
        dispatch(airportAutocompleteResponse(json, field))
      });
  }
}

const airportAutocompleteRequest = (airportString) => {
  return {
    type: AIRPORT_AUTOCOMPLETE_REQUEST,
    payload: airportString,
  }
}

const airportAutocompleteResponse = (json, field) => {
  return {
    type: AIRPORT_AUTOCOMPLETE_RESPONSE,
    airports: json.geonames,
    field
  }
}

export const actions = {
  airportAutocomplete
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  fromAutocomplete: [],
  toAutocomplete: [],
};


export default function airportsReducer (state = initialState, action) {
  switch (action.type) {
    case AIRPORT_AUTOCOMPLETE_REQUEST:
      return {
        ...state,
      };
    case AIRPORT_AUTOCOMPLETE_RESPONSE:
      if (action.field == "from")
        return {
          ...state,
          fromAutocomplete: action.airports
        };
      else
        return {
          ...state,
          toAutocomplete: action.airports
        };
    default:
      return state
  }
}
