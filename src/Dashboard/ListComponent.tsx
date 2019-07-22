import * as React from "react";


type Props = {
    children: any[],
}
export const ListComponent = (props: Props) => {
    const children = props.children.map((e, i, col) =>
        React.cloneElement(e, {
            first: i == 0,
            last: i == col.length - 1
        })
    )

    return <div>
        {children}
    </div>
}