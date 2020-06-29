import { Link } from 'gatsby'
import { Switch, Icon, Intent } from '@blueprintjs/core'

import './special/decorators.scss'

function MainPageFooter() {
  return <div className="bg-gray-600 px-4 py-2"></div>
}

interface DownloadProps {
  readonly icon: string
  readonly link: string
  readonly label: string
}

// Shows a download button
function DownloadButton(Props: DownloadProps) {
  return (
    <>
      <Link to={Props.link}>
        <button className="flex-1 bg-gray-400 hover:bg-gray-500 text-gray-800 font-bold px-2 py-1 rounded inline-flex items-center mx-1">
          <span>{Props.label}</span>
        </button>
      </Link>
    </>
  )
}

// Default page footer
function Footer() {
  return (
    <div className="div_visitagain">
      <div className="footer01">
        <div>
          <h3>Thank you for visiting!</h3>
          <h6>Please visit again.</h6>
          <p>Section for additional links and redirects</p>
        </div>
      </div>
    </div>
  )
}

export interface IForwardBackNavSectionProps {
  prevlink?: string
  nextlink?: string
  prevlinktitle?: string
  nextlinktitle?: string
}

function ForwardBackNavSection(props: IForwardBackNavSectionProps) {
  return (
    <div className="container_nextandback">
      <div className="nextandback">
        {props.prevlink ? (
          <div>
            <span>
              <Icon icon="chevron-left" />
            </span>
            <Link to={props.prevlink}>{props.prevlinktitle}</Link>
          </div>
        ) : (
          true
        )}
      </div>
      <div className="nextandback" />
      <div className="nextandback">
        {props.nextlink ? (
          <div>
            <Link to={props.nextlink}>{props.nextlinktitle}</Link>
            <span>
              <Icon icon="chevron-right" />
            </span>
          </div>
        ) : (
          true
        )}
      </div>
    </div>
  )
}

export { MainPageFooter, DownloadButton, Footer, ForwardBackNavSection }
