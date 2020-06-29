import { Popover, Button } from '@blueprintjs/core'

function ChaiScript() {
  return <a>Shining Light</a>
}

export function PopoverX() {
  return <Popover content={<ChaiScript />} target={<a>Shining Light</a>} />
}
