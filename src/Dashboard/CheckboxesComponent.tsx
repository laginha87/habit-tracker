import * as React from "react";
import classnames from 'classnames';

import { DayResult } from "../model/types";

type Props = {
    status?: DayResult;
}

export const CheckboxesComponent = (props : Props) => {
    const { status } = props;

    return <div>
        <i className={classnames('fas', 'fa-check', {'text-green-800': status === 'good'})}></i>
        <i className={classnames('fas', 'fa-times', {'text-red-800': status === 'bad'})}></i>
    </div>
}