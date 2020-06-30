import React, { useState, useRef } from 'react'
import { Link } from 'gatsby'

import { Helmet } from 'react-helmet'
import { Footer, ForwardBackNavSection } from '../components/Decorators'
import { Switch, Icon, Intent } from '@blueprintjs/core'

// FontAwesome
import '../components/FontAwesomeLib'

import YTAPI from '../api/youtubecards'
import DataInput from '../components/DataInput'

import Sidebar from '../components/SidebarComponent'

import NavBar from '../components/NavBar'
// import IndexLayout from '../layouts'
import '../components/special/forms.scss'
import '../components/special/links.scss'
import '../components/special/sidebar.scss'
import '../components/special/fonts.scss'
import '../components/special/external_api.scss'
import '../components/special/navigation.scss'
import '../components/special/extension.scss'
import '../components/special/fontawesome.scss'
import '../components/special/springs.scss'

function IndexPage() {
  interface LinkArray {
    label: string
    link: string
    internal?: boolean
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
        link: 'https://iitkgpmail.iitkgp.ac.in/'
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

  function FooterLinkSection(index: number) {
    let retval: any = []
    FooterLinkData[index].forEach(pair => {
      if (typeof pair.internal == 'undefined') {
        retval.push(
          <li>
            <a href={pair.link}>{pair.label}</a>
          </li>
        )
      } else {
        retval.push(
          <li>
            <Link to={pair.link}>{pair.label}</Link>
          </li>
        )
      }
    })
    return <ul>{retval}</ul>
  }
  return (
    <>
      <div className="container_root">
        <Helmet></Helmet>
        <NavBar />
        <Sidebar SectionIdx={0} />
        <div className="area_scrollable">
          <div className="container_mainpage">
            <div className="layout_mainpage" />
            <div className="layout_mainpage">
              <h1>Introduction page</h1>
              <p>
                This means that, right now anyone with access to this page can add/remove videos. Of course, we won't need that in
                aproduction site. This is just to demonstrate that videos can be dynamically added via youtube/facebook API... or someone
                can add the links offline and they will be available here...
              </p>
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
        </div>
        <Footer />
        <div className="div_mainfooter">
          <div className="main_footer">
            <div className="section_link_groups">
              <h3 className="ml-2">External Links</h3>
              <hr />
              <div className="link_group">
                {FooterLinkSection(0)}
                {FooterLinkSection(1)}
              </div>
            </div>
            <div className="section_link_groups">
              <h3 className="ml-2">Internal Links</h3>
              <hr />

              <div className="link_group">
                {FooterLinkSection(2)}
                {FooterLinkSection(3)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default IndexPage
