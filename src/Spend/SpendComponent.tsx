import * as React from 'react';

import { WalletExtended } from '../model/types';
import { WalletComponent } from '../common/WalletComponent';
import { convertToEuros, convertToTime, convertFromTime, convertFromEuros } from '../App/selectors';
import classnames from 'classnames';
import { ButtonComponent } from '../common/ButtonComponent';



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
    const callback = React.useCallback(() => { updateToggle(toggle === 'money' ? 'time' : 'money') }, [toggle, updateToggle])
    return <div className="flex rounded-full border-white-100 border shadow-inner select-none relative my-4" onClick={callback}>
        <div className="flex absolute w-full h-full">
            <div className={classnames('w-1/2 bg-white-100 h-full rounded-full absolute', { 'ml-half': toggle == 'money' })} style={{ transition: 'margin-left 0.5s' }}></div>
        </div>
        <div className="w-1/2 text-center text-white-100">money</div>
        <div className="w-1/2 text-center text-white-100">time</div>
    </div>
}

type InputProps = {
    updateSpend: (i : number) => void;
    value: number;
}

const MoneyInput = (props : InputProps) => {
    const { updateSpend } = props;

    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        updateSpend(parseFloat(value === '' ? '0' : value))
    }, [updateSpend]);

    const value = props.value > 0 ? props.value.toFixed(2) : (0).toFixed(2);
    return <input type="number" placeholder='0' inputMode="decimal" step='0.1' className='bg-transparent text-right text-right text-2xl w-full focus-none outline-none text-white-100' value={value} onChange={onChange} />
}

const TimeInput = (props: InputProps) => {
    const { updateSpend, value } = props;
    const minInput = React.useRef<HTMLInputElement>();
    const hourInput = React.useRef<HTMLInputElement>();

    const onMinuteChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        const minutes = parseFloat(value === '' ? '0' : value)
        const hours = parseFloat(hourInput.current.value === '' ? '0' : hourInput.current.value)
        if(minutes > 9) {
            hourInput.current.focus();
        }
        updateSpend( hours * 60 + minutes);
    }, [updateSpend, minInput, hourInput]);

    const onHourChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        const hours = parseFloat(value === '' ? '0' : value)
        const minutes = parseFloat(minInput.current.value === '' ? '0' : minInput.current.value)
        updateSpend( hours * 60 + minutes);
    }, [updateSpend, hourInput, minInput]);

    return <div className='flex text-white-100 justify-end items-end text-2xl'>
        <input className='bg-transparent focus-none outline-none text-right w-12 text-right' ref={hourInput} type="number" placeholder='00' inputMode="decimal" step='1'  onChange={onHourChange} />
        <div className=''>h</div>
        <input className='bg-transparent focus-none outline-none text-right w-12 text-right' ref={minInput} type="number" placeholder='00' inputMode="decimal" step='5'  onChange={onMinuteChange} />
        <div className=''>m</div>
    </div>
}

export const SpendComponent = (props: SpendProps) => {
    const { wallet } = props;

    const [toggle, updateToggle] = React.useState<ToggleState>("money")
    const [spend, updateSpend] = React.useState(0)
    const toggleChange = React.useCallback((toggle: ToggleState) => {
        updateSpend(0)
        updateToggle(toggle)
    }, [])

    const converter = toggle === "money" ? convertFromEuros : convertFromTime
    const credits = converter(spend);

    const newCredits = wallet.total - credits;
    const walletAfter: WalletExtended = {
        total: newCredits,
        euros: convertToEuros(newCredits),
        minutes: convertToTime(newCredits)
    }

    const InputComponent = toggle === 'money' ? MoneyInput : TimeInput

    return <div className="px-2 h-screen py-4 w-screen overflow-scroll" style={{ background: 'linear-gradient(0deg, rgba(39,87,138,1) 0%, rgba(30,91,172,1) 53%, rgba(50,50,179,1) 93%)' }}>
        <div className='flex'>
        <div className='w-8'> <ButtonComponent style="clean"><a href='/'><i className="fa fa-chevron-left"></i></a></ButtonComponent></div>
            <div className='text-2xl text-blue-100 text-center flex-grow' onClick={() => location.reload()}>
                Spend
            </div>

        </div>

        <Toggle toggle={toggle} updateToggle={toggleChange} />

        <InputComponent updateSpend={updateSpend} value={spend} />

        <WalletComponent wallet={walletAfter}></WalletComponent>
    </div>;
    }

