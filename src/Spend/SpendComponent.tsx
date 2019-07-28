import * as React from 'react';

import { DayDataExtended, WalletExtended, DayResult, Wallet } from '../model/types';
import { DateTime, Duration } from 'luxon';
import { WalletComponent } from '../common/WalletComponent';
import { SectionComponent } from '../common/SectionComponent';
import { convertToEuros, convertToTime, convertFromTime } from '../App/selectors';
import classnames from 'classnames';



export type SpendDispatchProps = {

}

export type SpendStateProps = {
    wallet: WalletExtended;
};


type SpendProps = SpendStateProps & SpendDispatchProps;

type ToggleState = "money" | "time"

type ToggleProps = {
    toggle: ToggleState,
    updateToggle: (t: ToggleState) => void
}

const Toggle = (props: ToggleProps) => {
    const { toggle, updateToggle } = props;
    const callback = React.useCallback(() => {updateToggle(toggle === 'money' ? 'time' : 'money')}, [toggle, updateToggle])
    return <div className="flex rounded-full border-white-100 border shadow-inner select-none relative my-4" onClick={callback}>
        <div className="flex absolute w-full h-full">
            <div className={classnames('w-1/2 bg-white-100 h-full rounded-full absolute', { 'ml-half': toggle == 'money' } )} style={{ transition: 'margin-left 0.5s' }}></div>
        </div>
        <div className="w-1/2 text-center text-white-100">time</div>
        <div className="w-1/2 text-center text-white-100">money</div>
    </div>
}

export const SpendComponent = (props: SpendProps) => {
    const { wallet } = props;

    const [toggle, updateToggle] = React.useState<ToggleState>("money")
    const [spend, updateSpend] = React.useState(0)

    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        updateSpend(convertFromTime(parseInt(e.currentTarget.value, 10)))
    }, [updateSpend]);

    const newCredits = wallet.total - spend;
    const walletAfter: WalletExtended = {
        total: newCredits,
        euros: convertToEuros(newCredits),
        minutes: convertToTime(newCredits)
    }

    return <div className="px-2 h-screen py-4 w-screen overflow-scroll" style={{ background: 'linear-gradient(0deg, rgba(39,87,138,1) 0%, rgba(30,91,172,1) 53%, rgba(50,50,179,1) 93%)' }}>
        <div className='text-2xl text-blue-100 text-center' onClick={() => location.reload()}>
            Spend
        </div>

        <Toggle toggle={toggle} updateToggle={updateToggle}/>

        <input type="number" className='bg-transparent text-right text-right text-2xl w-full focus-none outline-none text-white-100' value={spend} onChange={onChange} />

        <WalletComponent wallet={walletAfter}></WalletComponent>
    </div>;
}

