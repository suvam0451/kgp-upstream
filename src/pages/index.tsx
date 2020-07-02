import React, { useState, useRef, useEffect } from 'react'
import Library from '../components/FontAwesomeLib'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useWindowScroll } from 'react-use'
import { Link } from 'gatsby'

import { Helmet } from 'react-helmet'
import { Footer, ForwardBackNavSection } from '../components/Decorators'
import { Switch, Icon, Intent } from '@blueprintjs/core'
import { DocPage } from '../components/PageLayouts'
import { GatsbyLinkFA } from '../components/LinkComponents'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { InputWithValidation } from '../components/DataInput'

// FontAwesome
import YTAPI from '../api/youtubecards'
// import DataInput from '../components/DataInput'
import Sidebar from '../components/SidebarComponent'
import NavBar from '../components/NavBar'
import { ScrollToTop } from '../components/ScrollToTop'

import '../components/FontAwesomeLib'
import '../components/special/@styles.scss'

interface LinkArray {
  label: string
  link: string
  internal?: boolean
  iconfa?: IconProp
}

const FooterLinkData: LinkArray[][] = [
  [
    {
      label: 'Curriculum(UG)',
      link: 'https://erp.iitkgp.ac.in/ERPWebServices/curricula/specialisationList.jsp?stuType=UG'
    },
    {
      label: 'ERP',
      link: 'https://erp.iitkgp.ac.in/'
    },
    {
      label: 'Announcements',
      link: 'https://www.iitkgp.ac.in/iitkgp-announcements'
    },
    {
      label: 'Web Mail',
      link: 'https://iitkgpmail.iitkgp.ac.in/',
      iconfa: 'envelope'
    }
  ],
  [
    { label: 'News', link: 'http://www.iitkgp.ac.in/news' },
    { label: 'News', link: 'http://www.iitkgp.ac.in/news' },
    { label: 'News', link: 'http://www.iitkgp.ac.in/news' },
    {
      label: 'Event Calender',
      link: 'http://www.iitkgp.ac.in/events'
    }
  ],
  [{ label: 'For Webmasters', link: '/webmaster', internal: true }],
  [{ label: 'Privacy Policy', link: '/privacy-policy', internal: true }]
]

let youtuberegex: RegExp = /www.youtube.com\/watch\?v=([_\-=a-zA-Z0-9]{11})/

export default function IndexPage() {
  // STATE management
  const [myLinkArray, setMyLinkArray] = useState(<></>)
  const [queryStatusSection, setQueryStatusSection] = useState(<></>)
  const updateCardsRef = useRef<HTMLInputElement>(null)
  const deleteCardsRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    YTAPI.readcards(setMyLinkArray)
    return () => {}
  }, [])

  function deletecards(_ref: React.RefObject<HTMLInputElement>) {
    console.log(_ref.current?.value)
    return <></>
  }

  return (
    <>
      <div className="container_root">
        <Helmet></Helmet>
        <NavBar />
        <Sidebar SectionIdx={0} />
        <DocPage>
          <h1>Introduction page</h1>
          <p>
            This means that, right now anyone with access to this page can add/remove videos. Of course, we won't need that in aproduction
            site. This is just to demonstrate that videos can be dynamically added via youtube/facebook API... or someone can add the links
            offline and they will be available here...
          </p>
          <blockquote>I think the researchgate embed service is not active 24*7. The right section may appear empty, at times.</blockquote>
          <h3>Database provider</h3>
          <p>
            This is an example reel that would be generated and updated client-side. We are using faunadb as our database provider. The free
            tier has a read operation limit of <b>100K requests/day</b>. It is highly unlikely to reach that limit with a non-commercial
            website. The pricing beyond that starts at <b>$0.05 per 100K read</b>.
          </p>

          <p>
            If you enter a valid youtube link{' '}
            <i>(that was not already present, in the database, this reel will auto-update and that link will be added)</i>
          </p>
          <div>{myLinkArray}</div>
          <blockquote>For now, if a link exists, nothing will happen. In that case, try a different link.</blockquote>
          <h3>Adding links</h3>
          <p>
            We can edit to the database from anywhere. Here are some unused links to try out. Paste them into the input section and press
            the lock icon{' '}
            <i>
              (If something is wrong, the section should give a red outline. If the link seems fine, it will instead give green outline)
            </i>
            . If it's not a duplicate, it will get added. When we will turn the switch off and on above, we should get the updated links for
            the carousal.
          </p>
          <InputWithValidation
            placeholder="Enter valid youtube URL..."
            onAccept={() => {
              YTAPI.updatecards(updateCardsRef, setMyLinkArray)
            }}
            onReject={() => {
              console.log('Input invalid...')
            }}
          />
          <div>{queryStatusSection}</div>
          <ul>
            <li>
              https://www.youtube.com/watch?v=6VJBBUqr1wM <i> -- (used)</i>
            </li>
            <li>
              https://www.youtube.com/watch?v=jYUvzH4tCkA <i> -- (unused)</i>
            </li>
            <li>
              https://www.youtube.com/watch?v=0SA8aCb3KYc <i> -- (unused)</i>
            </li>
            <li>
              https://www.youtube.com/watch?v=WGsHz_XuCsI <i> -- (unused)</i>
            </li>
            <li>
              https://www.youtube.com/watch?v=XgdY_s1LsZc <i> -- (unused)</i>
            </li>
          </ul>
          <p>It should have form validation and respond to invalid links</p>
          <p>
            On that note, this is not something that would be done online like this. Because our website is static, we don't have any
            id-password or admin login or anything.
            <i>(i.e.- everything is produced on the client-side, when a person visits/refreshes the page)</i>.
          </p>

          <h3>Deleting entries</h3>
          <p>Missing content</p>
          <InputWithValidation
            placeholder="Enter youtube URL to delete..."
            onAccept={() => {
              deletecards(deleteCardsRef)
            }}
            onReject={() => {
              console.log('Input invalid...')
            }}
            validation={youtuberegex}
          />

          <h3>Extra thoughts</h3>
          <p>
            Maybe flat styling like this and more conventional font choices would make the website more professional. Aside from adding page
            contents, link sections like this would need to be added. The problem is, of course appropriate icon selection and color
            palettes. A lot of sections for this website would be filled and look better with banners, logos and theming.
          </p>

          <ForwardBackNavSection
            nextlink="/dynamic-menus/"
            prevlink="/dynamic-menus/"
            nextlinktitle="Dynamic menus"
            prevlinktitle="Dynamic menus"
          />
        </DocPage>
      </div>
    </>
  )
}
