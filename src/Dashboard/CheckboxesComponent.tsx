import * as React from "react";

import { DayResult } from "../model/types";
import { ButtonComponent } from "./ButtonComponent";

type Props = {
    status?: DayResult;
}

export const CheckboxesComponent = (props: Props) => {
    const { status } = props;

    return <div className='flex -ml-2'>
        <div className='ml-2 w-1/2'>
            <ButtonComponent style={status === 'good' ? 'primary' : 'primary-outline'}>
                <i className='fas fa-check'></i>
            </ButtonComponent>
        </div>
        <div className='ml-2 w-1/2'>
            <ButtonComponent style={status === 'bad' ? 'primary' : 'primary-outline'}>
                <i className='fas fa-times'></i>
            </ButtonComponent>
        </div>
    </div>;
}