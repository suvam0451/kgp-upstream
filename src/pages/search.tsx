import React, { useState, EventHandler, useRef, useReducer, ReducerAction } from 'react'
import { Link } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import { Helmet } from 'react-helmet'
import { YoutubeExhibit } from '../components/special/YoutubeExhibit'
import { Footer, ForwardBackNavSection } from '../components/Decorators'
import { Switch, Icon, Intent } from '@blueprintjs/core'

import YTAPI, { YoutubeCardResult, IResponse } from '../api/youtubecards'
import DataInput from '../components/DataInput'
import Search from '../components/SearchContainer'

import Sidebar from '../components/SidebarComponent'

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
import forwardRef from 'react'

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
  const [queryStatusSection, setQueryStatusSection] = useState(<></>)
  const updateCardsRef = useRef<HTMLInputElement>(null)
  const deleteCardsRef = useRef<HTMLInputElement>(null)

  function deletecards(_ref: React.RefObject<HTMLInputElement>) {
    console.log('Delete function called...')
    console.log(_ref.current?.value)
    return <></>
  }
  return (
    <>
      <div className="container_root">
        <Helmet></Helmet>
        <NavBar />
        <Sidebar />
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
              <Search />
              <blockquote>
                I think the researchgate embed service is not active 24*7. The right section may appear empty, at times.
              </blockquote>
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
              <Switch
                label="Display Carousal"
                onChange={() => {
                  YTAPI.readcards(setMyLinkArray, setCarousalHidden, carousalHidden)
                }}
              />
              {/* CArousal section */}
              {carousalHidden ? null : <div>{myLinkArray}</div>}
              <blockquote>After adding more links from the section below, try flipping the switch off and on again.</blockquote>
              <h3>Adding links</h3>
              <p>
                We can add to the database from anywhere. Try one of these links. Paste them into the input section and press the lock icon.
                If it's not a duplicate, it will get added. When we will turn the switch off and on above, we should get the updated links
                for the carousal.
              </p>
              {/* Input group */}
              <DataInput
                onClick={() => {
                  YTAPI.updatecards(updateCardsRef, setQueryStatusSection)
                }}
                placeholder="Enter valid youtube URL..."
                ref={updateCardsRef}
              />
              <div>{queryStatusSection}</div>
              <ul>
                <li>https://www.youtube.com/watch?v=6VJBBUqr1wM</li>
                <li>https://www.youtube.com/watch?v=6VJBBUqr1wM</li>
              </ul>
              <p>
                On that note, this is not something that would be done online like this. Because our website is static, we don't have any
                id-password or admin login or anything.
                <i>(i.e.- everything is produced on the client-side, when a person visits/refreshes the page)</i>.
              </p>

              <h3>Deleting entries</h3>
              <p>Missing content</p>
              <DataInput
                onClick={() => {
                  deletecards(deleteCardsRef)
                }}
                placeholder="Placeholder..."
                ref={deleteCardsRef}
              />

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
