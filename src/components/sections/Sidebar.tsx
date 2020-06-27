import * as React from 'react'

export interface ISidebarProps {}

export interface ISidebarState {}

export default class Sidebar extends React.Component<ISidebarProps, ISidebarState> {
  constructor(props: ISidebarProps) {
    super(props)

    this.state = {}
  }

  // Generate the sidebar
  PopulateSidebar = () => {
    const retval: any = []
    return retval
  }

  public render() {
    return (
      <div>
        <div className="overflow-y-auto shadow border-t-4 rounded-t border-red-500 p-2 bg-white mb-2 w-full">{this.PopulateSidebar()}</div>
      </div>
    )
  }
}
