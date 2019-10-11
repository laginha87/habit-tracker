import * as React from 'react';

type TimeInputProps = {
    updateSpend: (i : number) => void;
    value: number;
}


export const TimeInputComponent = (props: TimeInputProps) => {
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

    return <div className='flex text-white-100 justify-start items-start text-2xl'>
        <input className='bg-transparent focus-none outline-none w-12' ref={hourInput} type="number" placeholder='00' inputMode="decimal" step='1'  onChange={onHourChange} />
        <div className=''>h</div>
        <input className='bg-transparent focus-none outline-none w-12' ref={minInput} type="number" placeholder='00' inputMode="decimal" step='5'  onChange={onMinuteChange} />
        <div className=''>m</div>
    </div>
}
