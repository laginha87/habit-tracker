import * as React from 'react';

import { DayDataExtended, WalletExtended, DayResult } from '../model/types';
import { CheckboxesComponent } from './CheckboxesComponent';
import { TotalsComponent } from './TotalsComponent';
import { SectionComponent } from './SectionComponent';
import { DataRowComponent } from './DataRowComponent';
import { ListComponent } from './ListComponent';
import { chainToValue } from '../App/selectors';



export type DashboardDispatchProps = {
    setDayGood: () => void;
    setDayBad: () => void;
}

export type DashboardStateProps = {
    wallet: WalletExtended;
    chain: number;
    day: DayDataExtended;
};

type DashboardProps = DashboardStateProps & DashboardDispatchProps;

export const DashboardComponent = (props: DashboardProps) => {
    const { day: {
        dateFormatted,
        result
    }, wallet, chain
    } = props;


    return <div className="px-2 h-screen py-4 w-screen" style={{background: 'linear-gradient(0deg, rgba(39,87,138,1) 0%, rgba(30,91,172,1) 53%, rgba(50,50,179,1) 93%)'}}>
        <SectionComponent title="Activity">
            <input type='date' className='text-3xl mb-10 text-blue-100' />
            <div className='text-3xl mb-10 text-blue-100'>
                {dateFormatted}
            </div>

            <CheckboxesComponent status={result} setDayBad={props.setDayBad} setDayGood={props.setDayGood} />
        </SectionComponent>


        <SectionComponent title="">
            <ListComponent>
                <DataRowComponent label="Current Streak">
                        {chain}
                </DataRowComponent>
                <DataRowComponent label="Next Ok">
                    {chainToValue(chain)} credits
                </DataRowComponent>
            </ListComponent>
        </SectionComponent>
        <SectionComponent title="wallet">
            <TotalsComponent wallet={wallet} />
        </SectionComponent>
    </div>;
}

