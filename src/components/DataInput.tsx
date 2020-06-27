import React, { useRef, forwardRef } from 'react'

export interface IDataInputProps {
  onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
  placeholder?: string
}

export default forwardRef<HTMLInputElement, IDataInputProps>((props, _ref) => {
  return (
    <div className="bp3-input-group .modifier">
      <input ref={_ref} type="url" className="bp3-input" placeholder={props.placeholder} />
      <button className="bp3-button bp3-minimal bp3-intent-warning bp3-icon-lock" onClick={props.onClick} />
    </div>
  )
})
