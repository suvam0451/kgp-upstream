import { Link } from 'gatsby'

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
    <div className="footer01">
      <h3>Thank you for visiting!</h3>
      <h6>Hope you got the resources you needed. Come visit again :)</h6>
      <p>
        I upload weekly and revamp bi-monthly. You can support my work at <b>Patreon</b> | <b>Paypal</b> | <b>Marketplace</b> |{' '}
        <b>Gumroad</b>
      </p>
      {/* <input
				className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
				type="email"
				placeholder="jane@example.com"
			></input> */}
    </div>
  )
}

export { MainPageFooter, DownloadButton, Footer }
