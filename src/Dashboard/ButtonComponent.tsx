import * as React from "react";
import classnames from 'classnames';

type ButtonStyle = 'primary' | 'primary-outline'

const CLASS_NAMES : { [s in ButtonStyle] : string}= {
    "primary": 'text-blue-800 bg-blue-100 border-2',
    "primary-outline": 'text-blue-100 border-2'
}

type ButtonProps = {
    children: React.ReactNode,
    style: ButtonStyle,
}

export const ButtonComponent = (props : ButtonProps) => {

    return <div
        className={classnames('rounded items-center w-full h-8 flex justify-center cursor-pointer', CLASS_NAMES[props.style])}>
        {props.children}
    </div>
}