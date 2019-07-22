import * as React from "react";
import classnames from "classnames";

type Props = {
    label: string,
    children: React.ReactNode,
    first?: boolean,
    last?: boolean,
}
export const DataRowComponent = (props : Props) => {
    const classNames = classnames('flex px-2 py-3 text-xl', {
        'border-b border-white-100 mb-2': !props.last,
        'mt-2': props.first,

    })
    return <div className={classNames}>
        <div className="w-1/2 text-white-100">{props.label}</div>
        <div className="w-1/2 text-white-100 text-right">{props.children}</div>
    </div>
}