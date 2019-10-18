import * as React from 'react';
import { Link } from "react-router-dom";
import classnames from 'classnames';

const IconLink = (props) => {
    return <Link to={{pathname: props.pathname}}>
        <div className='flex flex-wrap text-center'>
            <div className={classnames('fa text-4xl w-full', props.icon)}></div>
            <div className='w-full lowercase'>{props.children}</div>
        </div>
    </Link>
}

const Divider = () => <div className='bg-blue-100 mb-2' style={{width: 1}}></div>;
export const LayoutComponent = (props) => {

    return <div className="px-2 h-screen py-4 w-screen overflow-scroll text-blue-500" style={{ background: 'linear-gradient(0deg, rgba(39,87,138,1) 0%, rgba(30,91,172,1) 53%, rgba(50,50,179,1) 93%)' }}>
        {props.children}
        <div className='fixed w-full flex justify-center bg-white border-t border-white-200 bottom-0 -m-2 h-20 bg-white-100 py-2'>
            <IconLink pathname='/spend' icon='fa-wallet'> Spend</IconLink>
            <Divider />
            <IconLink pathname='/' icon='fa-home'> Home</IconLink>
        </div>

    </div>
}
