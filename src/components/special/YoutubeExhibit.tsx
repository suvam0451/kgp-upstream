import * as React from 'react'
import styled from '@emotion/styled'
import Slider from 'react-slick'
import { screenwidths } from '../../styles/variables'
// import { getEmSize } from '../styles/mixins'

// const StyledContainer = styled.div`
//   position: relative;
//   margin-left: atuo;
//   margin-right: auto;
//   max-width: ${getEmSize(widths.lg)}em;
// `

import '../../styles/index.sass'
import './SpecialComponents.scss'

interface YoutubeProps {
  src?: string
}

const YoutubeCarousal = styled.div`
  max-width: 960px;
  margin-left: 20px;
  border-bottom: 5px solid red;
`

function YoutubeExhibit(data: YoutubeProps) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    autoplaySpeed: 3000,
    fadeIn: false,
    autoplay: false,
    pauseOnHover: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    // screen breakdowns
    responsive: [
      {
        breakpoint: screenwidths.maxscreen,
        settings: {
          slidesToShow: 1, // Number of sections to show
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: screenwidths.smallwidescreen,
        settings: {
          slidesToShow: 1, // Number of sections to show
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: screenwidths.minscreen,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      }
    ]
  }

  return (
    <>
      <YoutubeCarousal className="include-media-test">
        <Slider {...settings}>
          <div className="ytcard">
            <iframe width="420" height="315" src={data.src} allow="autoplay,encrypted-media" allowFullScreen></iframe>
          </div>
          <div className="ytcard">
            <iframe width="420" height="315" src={data.src} allow="autoplay,encrypted-media" allowFullScreen></iframe>
          </div>
          <div className="ytcard">
            <iframe width="420" height="315" src={data.src} allow="autoplay,encrypted-media" allowFullScreen></iframe>
          </div>
        </Slider>
      </YoutubeCarousal>
    </>
  )
}
// const YoutubeExhibit: React.FC<YoutubeProps> = ({ src }) => (
//   <>
//     <Slider {...settings}></Slider>
//     <iframe width="420" height="315" src={src} allow="autoplay,encrypted-media" allowFullScreen></iframe>
//   </>
// )

function YoutubeSingleton(data: YoutubeProps) {
  return (
    <>
      <iframe width="420" height="315" src={data.src} allow="autoplay,encrypted-media" allowFullScreen></iframe>
    </>
  )
}

export { YoutubeExhibit, YoutubeSingleton }
