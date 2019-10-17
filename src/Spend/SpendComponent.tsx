import { DateTime } from 'luxon';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { spendCreditsAction } from '../App';
import { convertFromEuros, convertFromTime, convertToEuros, convertToTime, getWalletExtended } from '../App/selectors';
import { ButtonComponent } from '../common/ButtonComponent';
import { WalletComponent } from '../common/WalletComponent';
import { SpendType, WalletExtended } from '../model/types';
import { MoneyInputComponent } from './MoneyInputComponent';
import { TimeInputComponent } from './TimeInputComponent';
import { Toggle } from './ToggleComponent';
import { LayoutComponent } from '../common/LayoutComponent';

export const SpendComponent = () => {

    const dispatch = useDispatch();
    const wallet = useSelector(getWalletExtended);
    const submitSpend = React.useCallback(
        (value: number, date : DateTime, spendType: SpendType, description: string) =>
            dispatch(spendCreditsAction(value, date , spendType, description)) ,
        [dispatch])

    const [toggle, updateToggle] = React.useState<SpendType>("money")
    const [spend, updateSpend] = React.useState(0)
    const [description, updateDescription] = React.useState("");

    const updateDescriptionCb = React.useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
        updateDescription(e.target.value);
    }, [updateDescription])

    const toggleChange = React.useCallback((toggle: SpendType) => {
        updateSpend(0)
        updateToggle(toggle)
    }, [])

    const converter = toggle === "money" ? convertFromEuros : convertFromTime
    const credits = converter(spend);

    const submitValue = React.useCallback(() => {
        submitSpend(credits, DateTime.local(), toggle, description);
    }, [credits, toggle, submitSpend, description])


    const newCredits = wallet.total - credits;
    const walletAfter: WalletExtended = {
        total: newCredits,
        euros: convertToEuros(newCredits),
        minutes: convertToTime(newCredits)
    }

    const InputComponent = toggle === 'money' ? MoneyInputComponent : TimeInputComponent

    return <LayoutComponent>
        <div className='flex'>
            <div className='w-8' />
                <div className='text-2xl text-blue-100 text-center flex-grow' onClick={() => location.reload()}>
                    Spend
                </div>
            <div className="w-8" />
        </div>

        <Toggle toggle={toggle} updateToggle={toggleChange} />

        <InputComponent updateSpend={updateSpend} value={spend} />
        <input type='text' onChange={updateDescriptionCb} className='bg-transparent focus-none outline-none text-white-100 border-b border-white-100 text-xl w-full' placeholder='What am I spending credits on?'/>
        <WalletComponent wallet={walletAfter}></WalletComponent>
        <ButtonComponent style="primary" action={submitValue} disabled={credits <= 0}> Submit </ButtonComponent>
    </LayoutComponent>;
    }

