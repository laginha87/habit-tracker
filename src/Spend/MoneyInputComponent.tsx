import * as React from 'react';


type MoneyInputProps = {
    updateSpend: (i : number) => void;
    value: number;
}

export const MoneyInputComponent = (props : MoneyInputProps) => {
    const { updateSpend } = props;

    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        updateSpend(parseFloat(value === '' ? '0' : value))
    }, [updateSpend]);

    const value = props.value > 0 ? props.value.toFixed(2) : (0).toFixed(2);
    return <input type="number" placeholder='0' inputMode="decimal" step='0.1' className='bg-transparent text-2xl w-full focus-none outline-none text-white-100' value={value} onChange={onChange} />
}
