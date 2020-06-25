import * as React from 'react';
import { Link } from 'gatsby';
// Popover and menus
import { PopoverX } from '../components/MenuSection';

export interface ISidebarTypeCProps {
}

export function SidebarTypeC(props: ISidebarTypeCProps) {
    return (
        <>
            <div className="sidebar">
                <Link to="/publications">Published papers</Link>
                <Link to="/">Second Link</Link>
                <Link to="/dynamic-menus">Dynamic Menus</Link>
                <Link to="/licensing">Libraries/Licensing</Link>
                <PopoverX />
                <div className="sidebar_footer">
                    <p>In association with</p>
                    <p>Dept. of Civl Engineering</p>
                    <p>IIT Kharagpur</p>
                </div>
            </div>
        </>
    );
}
