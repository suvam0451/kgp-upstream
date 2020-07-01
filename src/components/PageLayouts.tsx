import React, { useState, useRef, memo } from 'react'
import { Link } from 'gatsby'

import { Helmet } from 'react-helmet'
import { Footer, ForwardBackNavSection } from '../components/Decorators'
import { Switch, Icon, Intent } from '@blueprintjs/core'

// FontAwesome
import YTAPI from '../api/youtubecards'
import DataInput from '../components/DataInput'
import Sidebar from '../components/SidebarComponent'
import NavBar from '../components/NavBar'
import '../components/FontAwesomeLib'
import '../components/special/@styles.scss'

interface IDocPageProps {
  children: JSX.Element | JSX.Element[]
}

interface LinkArray {
  label: string
  link: string
  internal?: boolean
}

export function DocPage(props: IDocPageProps) {
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

  // function : updateButtonAction
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
      <div className="area_scrollable">
        <div className="container_mainpage">
          <div className="layout_mainpage" />
          <div className="layout_mainpage">{props.children}</div>
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
    </>
  )
}
