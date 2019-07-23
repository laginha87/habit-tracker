import * as React from "react";

type Props = {
    title?: string,
    children: React.ReactNode
}
export const SectionComponent = (props : Props) => (
    <div>
        { props.title && <div className="text-2xl text-white-100 capitalize">{props.title}</div>}
        <div>{props.children}</div>
    </div>
)