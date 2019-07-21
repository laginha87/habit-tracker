import * as React from "react";
import classnames from 'classnames';

type ButtonStyle = 'primary' | 'primary-outline';

type ButtonSize = 'medium' | 'large';

const STYLES: { [s in ButtonStyle]: string } = {
    "primary": 'text-blue-800 bg-blue-100 border-2',
    "primary-outline": 'text-blue-100 border-2'
}

const SIZES : { [s in ButtonSize]: string } = {
    "large":"h-16",
    "medium": "h-8"

}

type ButtonProps = {
    children: React.ReactNode,
    style: ButtonStyle,
    size?: ButtonSize,
    action?: () => void,
}

export const ButtonComponent = (props: ButtonProps) => {
    const className =
        classnames(
            'rounded',
            'items-center',
            'w-full',
            'flex',
            'justify-center',
            'cursor-pointer',
            STYLES[props.style],
            SIZES[props.size || 'medium']

        );
    return <div
        className={className}
        onClick={props.action}>
        {props.children}
    </div>
}