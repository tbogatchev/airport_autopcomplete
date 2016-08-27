import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'airports',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Airports = require('./containers/AirportsContainer').default
      const reducer = require('./modules/airports').default

      /*  Add the reducer to the store on key 'airports'  */
      injectReducer(store, { key: 'airports', reducer })

      /*  Return getComponent   */
      cb(null, Airports)

    /* Webpack named bundle   */
    }, 'airports')
  }
})
