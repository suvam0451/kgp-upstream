import * as React from 'react'
import { Link } from 'gatsby'
// Popover and menus
import { PopoverX } from '../components/MenuSection'

export interface ISidebarTypeCProps {}

export default function Sidebar(props: ISidebarTypeCProps) {
  return (
    <>
      <div className="sidebar">
        <Link to="/">Home</Link>
        <Link className="navitem navitemActive" to="/publications">
          Published papers
        </Link>
        <Link to="/markdown-overview">Markdown Overview</Link>
        <Link to="/dynamic-menus">Dynamic Menus</Link>
        <Link to="/licensing">Libraries/Licensing</Link>
        <Link to="/webmaster">Webmasters</Link>
        {/* <PopoverX /> */}
        <div className="sidebar_footer">
          <p>In association with</p>
          <p>Dept. of Civl Engineering</p>
          <p>IIT Kharagpur</p>
        </div>
      </div>
    </>
  )
}
