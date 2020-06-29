import React, { useState, EventHandler, useEffect, useImperativeHandle, useRef } from 'react';
import styled from '@emotion/styled';
import Slider from 'react-slick';
import { screenwidths } from '../../styles/variables';
// import { getEmSize } from '../styles/mixins'

// const StyledContainer = styled.div`
//   position: relative;
//   margin-left: atuo;
//   margin-right: auto;
//   max-width: ${getEmSize(widths.lg)}em;
// `

import '../../styles/index.sass';
import './SpecialComponents.scss';

interface YoutubeProps {
  src?: string;
  cardlinks: string[];
}

const YoutubeCarousal = styled.div`
  margin-left: 20px;
  border-bottom: 5px solid red;
`;

function YoutubeExhibit(data: YoutubeProps) {
  // Sections
  const [, forceUpdate] = useState(null); // view README.md
  const [carousalSection, setCarousalSection] = useState(<></>);
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
  };

  // componentDidMount / componentDidUpdate
  useEffect(() => {
    forceUpdate(null); // Have to use for TS for some reason
    generateCarousal(); // Generate the carousal section
  }, []);

  // FIXME: This does not work
  // Parent to child linking functions
  // useImperativeHandle(ref, () => ({
  //   /** Generate the youtube carousal cards */
  //   generateCarousal() {
  //     console.log('Child funcction tree would be called...')
  //     const retval: any = [] // Returned React component

  //     console.log(data.cardlinks)
  //     data.cardlinks.forEach(link => {
  //       retval.push(
  //         <div className="ytcard">
  //           <iframe
  //             width="420"
  //             height="315"
  //             src={'https://www.youtube.com/embed/' + link}
  //             allow="autoplay,encrypted-media"
  //             allowFullScreen
  //           ></iframe>
  //         </div>
  //       )
  //     })
  //     setCarousalSection(retval) // State update
  //   }
  // }))

  /** Generate the youtube carousal cards */
  function generateCarousal() {
    const retval: any = []; // Returned React component
    setCarousalSection(
      <>
        <p>'API request complete...'</p>
      </>
    );

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
      );
    });

    setCarousalSection(retval);
  }

  return (
    <>
      <YoutubeCarousal className="section_youtube_carousal">
        <Slider {...settings}>
          {carousalSection}
          {/* <div className="ytcard">
            <iframe width="420" height="315" src={data.src} allow="autoplay,encrypted-media" allowFullScreen></iframe>
          </div> */}
        </Slider>
      </YoutubeCarousal>
    </>
  );
}

// class Yuri extends React.Component {
//   constructor(props: any) {
//     super(props)
//     this.state = {
//       open: false,
//       carousalSection: <></>,
//       settings: {
//         dots: false,
//         infinite: false,
//         speed: 1000,
//         autoplaySpeed: 3000,
//         fadeIn: false,
//         autoplay: false,
//         pauseOnHover: false,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         // screen breakdowns
//         responsive: [
//           {
//             breakpoint: screenwidths.maxscreen,
//             settings: {
//               slidesToShow: 1, // Number of sections to show
//               slidesToScroll: 1,
//               infinite: true,
//               dots: true
//             }
//           },
//           {
//             breakpoint: screenwidths.smallwidescreen,
//             settings: {
//               slidesToShow: 1, // Number of sections to show
//               slidesToScroll: 1,
//               infinite: true,
//               dots: true
//             }
//           },
//           {
//             breakpoint: screenwidths.minscreen,
//             settings: {
//               slidesToShow: 1,
//               slidesToScroll: 1,
//               dots: true
//             }
//           }
//         ]
//       }
//     }
//   }

//   render() {
//     return (
//       <>
//         <YoutubeCarousal className="include-media-test">
//           <Slider {...this.state.settings}>
//             {carousalSection}
//             <div className="ytcard">
//               <iframe width="420" height="315" src={data.src} allow="autoplay,encrypted-media" allowFullScreen></iframe>
//             </div>
//           </Slider>
//         </YoutubeCarousal>
//       </>
//     )
//   }
// }

// function YoutubeSingleton(data: YoutubeProps) {
//   return (
//     <>
//       <iframe width="420" height="315" src={data.src} allow="autoplay,encrypted-media" allowFullScreen></iframe>
//     </>
//   )
// }

export { YoutubeExhibit };;

// export default React.forwardRef((props, ref) => {
//   const menuRef = useRef<any>(null)

//   useImperativeHandle(ref, () => ({
//     open() {
//       menuRef.current.open()
//     }
//   }))

//   return <Yuri ref={menuRef} {...props} />
// })
