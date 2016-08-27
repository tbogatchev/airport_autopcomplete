import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import classes from './HomeView.scss'

export const HomeView = () => (
  <div>
    <h4>Project approach:</h4>
    <div>
      I started this project with my favorite barebone tech stack: the react-redux-koa starter pack.
      It can be found <a href="https://github.com/davezuko/react-redux-starter-kit">here</a>.
    </div>
    <div style={{marginTop:'20px'}}>I used the geonames API in order to get a list of airports in the United States.</div>
    <div>I then used Google's Geometry and Directions services to calculate the distance and directions between the two airports.</div>
    <div>Follow the Airports link above to see the completed project.</div>
  </div>
)

export default HomeView
