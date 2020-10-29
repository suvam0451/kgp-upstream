import React, { useState, EventHandler, useEffect, useImperativeHandle, useRef } from 'react'
import styled from '@emotion/styled'
import Slider from 'react-slick'
import { screenwidths } from '../../styles/variables'

import '../../styles/index.sass'
import './SpecialComponents.scss'

interface YoutubeProps {
  src?: string
  cardlinks: string[]
}

const YoutubeCarousal = styled.div`
  margin-left: 20px;
  border-bottom: 5px solid red;
`

function YoutubeExhibit(data: YoutubeProps) {
  // Sections
  const [, forceUpdate] = useState(null) // view README.md
  const [carousalSection, setCarousalSection] = useState(<></>)
  // const inputEle = useRef(null)

  const settings = {
    dots: true,
    infinite: false,
    speed: 1000,
    autoplaySpeed: 3000,
    fadeIn: false,
    autoplay: false,
    pauseOnHover: false,
    slidesToShow: 1,
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

  // componentDidMount / componentDidUpdate
  useEffect(() => {
    forceUpdate(null) // Have to use for TS for some reason
    generateCarousal() // Generate the carousal section
  }, [])

  /** Generate the youtube carousal cards */
  function generateCarousal() {
    const retval: any = [] // Returned React component
    setCarousalSection(
      <>
        <p>'API request complete...'</p>
      </>
    )

    data.cardlinks.forEach(link => {
      retval.push(
        <div className="component_youtube_carousal">
          <iframe
            width="420"
            height="315"
            src={'https://www.youtube.com/embed/' + link}
            allow="autoplay,encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      )
    })

    setCarousalSection(retval)
  }

  return (
    <div className="section_youtube_carousal">
      <YoutubeCarousal>
        <Slider {...settings}>
          {carousalSection}
          {/* <div className="ytcard">
            <iframe width="420" height="315" src={data.src} allow="autoplay,encrypted-media" allowFullScreen></iframe>
          </div> */}
        </Slider>
      </YoutubeCarousal>
    </div>
  )
}

export { YoutubeExhibit }
