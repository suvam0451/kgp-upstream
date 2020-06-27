import React, { useState, EventHandler, useRef, useReducer, ReducerAction } from 'react'
import { Link } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import { Helmet } from 'react-helmet'
import { YoutubeExhibit } from '../components/special/YoutubeExhibit'
import { Footer, ForwardBackNavSection } from '../components/Decorators'
import { Switch, Icon, Intent } from '@blueprintjs/core'

import YTAPI, { YoutubeCardResult } from '../api/youtubecards'

import NavBar from '../components/NavBar'
// import IndexLayout from '../layouts'
import '../components/special/forms.scss'
import '../components/special/links.scss'
import '../components/special/sidebar.scss'
import '../components/special/fonts.scss'
import '../components/special/external_api.scss'
import '../components/special/navigation.scss'

// Popover and menus
import { PopoverX } from '../components/MenuSection'

function IndexPage() {
  // STATE
  const deadPeople = () => [
    { name: 'Jay', alive: false },
    { name: 'Kailee', alive: false },
    { name: 'John', alive: false },
    { name: 'Mia', alive: false }
  ]

  // const reducer = (people: string[], action: ReducerAction) => {
  //   if (action.type == "add") {
  //     return person;
  //   }
  // };

  // Reducers
  // const [state, dispatch] = React.useReducer(reducer, initialState);

  // STATE management
  const [myLinkArray, setMyLinkArray] = useState(<></>)
  const [cardLinks, setCardLinks] = useState<string[] | null>(['fdkU6MgrUV4', 'RIZdjT1472Y'])
  const [carousalHidden, setCarousalHidden] = useState(true)
  const updateCardsRef = useRef<HTMLInputElement>(null)

  function requestLinks(e: React.FormEvent<HTMLInputElement>) {
    let target = e.target // element data
    let value = e.currentTarget.value // gets text
    let name = e.currentTarget.name // if named, else empty string
    setMyLinkArray(
      <>
        <p>'Loading data...'</p>
      </>
    ) // Loading screen

    let ex: RegExp = /www.youtube.com\/embed\/videoseries\?list=/
    if (carousalHidden == true) {
      if (ex.test(value)) {
        YTAPI.read().then(res => {
          console.log('There it is. Sample obtained after success...', res)
          setMyLinkArray(res)
        })
      } else {
        YTAPI.read().then((res: YoutubeCardResult) => {
          const retval: any = [] // Returned React component
          if (typeof res == 'undefined') {
            console.log('Failed to obtain API data')
          } else {
            console.log('Sample obtained after failure...', res)
            // loop out the inks
            let cardlinks: string[] = []
            res.data.forEach(linkobject => {
              cardlinks = cardlinks.concat([linkobject])
            })

            retval.push(<YoutubeExhibit cardlinks={cardlinks} />)
            setMyLinkArray(retval)
          }
        })
      }
      setCarousalHidden(false)
    } else {
      // hide carousal element if already visible
      setCarousalHidden(true)
    }
  }

  function updatecards() {
    if (typeof updateCardsRef.current != 'undefined') {
      console.log(updateCardsRef.current!.value)
      let val = updateCardsRef.current!.value
      YTAPI.update(val)
    }
  }
  return (
    <>
      <div className="container_root">
        <Helmet></Helmet>
        <NavBar></NavBar>
        <div className="sidebar">
          <Link className="navitem navitemActive" to="/publications">
            Published papers
          </Link>
          <Link to="/">Second Link</Link>
          <Link to="/dynamic-menus">Dynamic Menus</Link>
          <Link to="/licensing">Libraries/Licensing</Link>
          <PopoverX />
          <div className="sidebar_footer">
            <p>In association with</p>
            <p>Dept. of Civl Engineering</p>
            <p>IIT Kharagpur</p>
          </div>
        </div>
        <Page>
          {/* All the children are flexboxed */}
          <div className="container_mainpage">
            {/* floating Sidebar div (Hidden in mobile) */}
            <div className="layout_mainpage" />
            <div className="layout_mainpage">
              <h1>Introduction page</h1>
              <p>
                This means that, right now anyone with access to this page can add/remove videos. Of course, we won't need that in
                aproduction site. This is just to demonstrate that videos can be dynamically added via youtube/facebook API... or someone
                can add the links offline and they will be available here...
              </p>
              <h3>Database provider</h3>
              <p>
                We are using faunadb as our database provider. The free tier has a read operation limit of <b>100K requests/day</b>. It is
                highly unlikely to reach that limit with a non-commercial website. The pricing beyond that starts at{' '}
                <b>$0.05 per 100K read</b>. The benefit is that, due to this being a managed database, there is no price for server hosting
                and nobody has to maintain it.
              </p>
              <p>
                That said, due to similar limitations, we cannot use it as a content database. That means no images, no videos can be
                stored. <i>(Not to be confused with links. Links are texts. Google hosts youtube. Images are hosted externally)</i>
              </p>

              <h3>Database queries</h3>
              <p>
                Here is a demo for the database. The links are fetched from a faunadb database. Try flipping the button below{' '}
                <i>(labelled display carousal)</i> to fetch the links.
              </p>
              {/* Database query section */}
              <Switch label="Display Carousal" onChange={requestLinks} />
              {/* CArousal section */}
              {carousalHidden ? null : <div>{myLinkArray}</div>}

              <h3>Adding links</h3>
              <p>
                We can add to the database from anywhere. Try one of these links. Paste them into the input section and press the lock icon.
                If it's not a duplicate, it will get added. When we will turn the switch off and on above, we should get the updated links
                for the carousal.
              </p>
              {/* Input group */}
              <div className="bp3-input-group .modifier">
                <input ref={updateCardsRef} type="url" className="bp3-input" placeholder="Enter valid youtube URL..." />
                <button className="bp3-button bp3-minimal bp3-intent-warning bp3-icon-lock" onClick={updatecards}></button>
              </div>

              <ul>
                <li>https://www.youtube.com/watch?v=6VJBBUqr1wM</li>
                <li>https://www.youtube.com/watch?v=6VJBBUqr1wM</li>
              </ul>
              <p>
                On that note, this is not something that would be done online like this. Because our website is static, we don't have any
                id-password or admin login or anything.
                <i>(i.e.- everything is produced on the client-side, when a person visits/refreshes the page)</i>.
              </p>

              <h3>Extra thoughts</h3>
              <p>
                Maybe flat styling like this and more conventional font choices would make the website more professional. Aside from adding
                page contents, link sections like this would need to be added. The problem is, of course appropriate icon selection and
                color palettes. A lot of sections for this website would be filled and look better with banners, logos and theming.
              </p>

              <ForwardBackNavSection
                nextlink="/dynamic-menus/"
                prevlink="/dynamic-menus/"
                nextlinktitle="Dynamic menus"
                prevlinktitle="Dynamic menus"
              />
            </div>
            <div className="layout_mainpage">
              <iframe
                className="researchgate_embed"
                src="https://www.researchgate.net/plugins/department?stats=true&faces=true&publications=true&height=600&width=300&theme=light&type=department&installationId=5ef18e2b12eb0b14a569b35c"
              />
            </div>
          </div>
        </Page>
        <Footer />
      </div>
    </>
  )
}

export default IndexPage
