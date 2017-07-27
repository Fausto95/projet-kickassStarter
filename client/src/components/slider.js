import React, { Component } from  'react'
import Slider from  'react-slick'

export default class Slide extends Component {
  render () {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    console.log('NIce', this.props)
    return (
      <Slider {...settings}>
        <div><h3><img src="https://i.ytimg.com/vi/_Fc09EAMAPo/maxresdefault.jpg"/></h3></div>
        <div><h3><img src="https://semantic-ui.com/images/avatar2/large/kristy.png"/></h3></div>
        <div><h3><img src="https://www.bus-stac.fr/var/site/storage/images/4/0/2/2/2204-1-eng-GB/B.png"/></h3></div>
        <div><h3><img src="http://cdn03.androidauthority.net/wp-content/uploads/2016/09/best-kickstarter-august-2016-gaze-desk2-840x511.jpg"/></h3></div>
        <div><h3><img src="https://i.ytimg.com/vi/_Fc09EAMAPo/maxresdefault.jpg"/></h3></div>
        <div><h3><img src="https://i.ytimg.com/vi/_Fc09EAMAPo/maxresdefault.jpg"/></h3></div>
      </Slider>
    );
  }
}