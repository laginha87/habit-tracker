import * as React from 'react';
import { SpendType } from "../model/types";
import classnames from 'classnames';

type ToggleProps = {
    toggle: SpendType,
    updateToggle: (t: SpendType) => void
}

export const Toggle = (props: ToggleProps) => {
    const { toggle, updateToggle } = props;
    const callback = React.useCallback(() => { updateToggle(toggle === 'money' ? 'time' : 'money') }, [toggle, updateToggle])
    return <div className="flex rounded-full border-white-100 border shadow-inner select-none relative my-4" onClick={callback}>
        <div className="flex absolute w-full h-full">
            <div className={classnames('w-1/2 bg-white-100 h-full rounded-full absolute', { 'ml-half': toggle == 'money' })} style={{ transition: 'margin-left 0.5s' }}></div>
        </div>
        <div className="w-1/2 text-center text-white-100">money</div>
        <div className="w-1/2 text-center text-white-100">time</div>
    </div>
}