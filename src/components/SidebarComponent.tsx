import * as React from 'react'
import { Link } from 'gatsby'
// Popover and menus
import { PopoverX } from '../components/MenuSection'

interface ISidebarTypeCProps {
  SectionIdx: number
}
interface SidebarData {
  link: string
  external?: boolean
  label: string
}

export default function Sidebar(props: ISidebarTypeCProps) {
  const _data: SidebarData[] = [
    {
      link: '/',
      label: 'Home'
    },
    {
      link: '/markdown-overview',
      label: 'Markdown Overview'
    },
    {
      link: '/dynamic-menus',
      label: 'Dynamic Menus'
    },
    {
      link: '/licensing',
      label: 'Libraries/Licensing'
    },
    {
      link: '/webmaster',
      label: 'Webmasters'
    },
    { link: '/resources', label: 'Resources' },
    { link: '/search', label: 'Search' }
  ]

  function GenerateSidebar(idx: number) {
    let retval: any = []
    _data.forEach((section, index) => {
      if (index == idx) {
        retval.push(
          <Link to={section.link} draggable={false}>
            <span className="link_selected" />
            {section.label}
          </Link>
        )
      } else {
        retval.push(<Link to={section.link}>{section.label}</Link>)
      }
    })

    return retval
  }
  return (
    <>
      <div className="sidebar">
        <div className="sidebar_linksection">{GenerateSidebar(props.SectionIdx)}</div>
        <div className="sidebar_footer">
          <p>In association with</p>
          <p>Dept. of Civl Engineering</p>
          <p>IIT Kharagpur</p>
        </div>
      </div>
    </>
  )
}
