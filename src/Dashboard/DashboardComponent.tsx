import * as React from 'react';

import { DayDataExtended, WalletExtended, DayResult } from '../model/types';
import { CheckboxesComponent } from './CheckboxesComponent';
import { TotalsComponent } from './TotalsComponent';
import { SectionComponent } from './SectionComponent';
import { DataRowComponent } from './DataRowComponent';
import { ListComponent } from './ListComponent';
import { chainToValue } from '../App/selectors';
import { DateTime, Duration } from 'luxon';
import { ButtonComponent } from './ButtonComponent';



export type DashboardDispatchProps = {
    setDayGood: (day: DateTime, result: DayResult) => void;
    setDayBad: (day: DateTime, result: DayResult) => void;
    changeDay: (day: DateTime) => void;
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
        date,
        result
    }, wallet, chain, setDayBad, setDayGood, changeDay
    } = props;

    return <div className="px-2 h-screen py-4 w-screen overflow-scroll" style={{ background: 'linear-gradient(0deg, rgba(39,87,138,1) 0%, rgba(30,91,172,1) 53%, rgba(50,50,179,1) 93%)' }}>
        <div className='flex mb-10 items-center'>
            <div className='w-8'> <ButtonComponent style="primary-outline" action={() => changeDay(date.minus(Duration.fromObject({ days: 1 })))}><i className="fa fa-chevron-left"></i></ButtonComponent></div>
            <div className='text-3xl text-blue-100 flex-grow text-center' onClick={ () => location.reload() }>
                {dateFormatted}
            </div>
            <div className='w-8'> <ButtonComponent style="primary-outline" action={() => changeDay(date.plus(Duration.fromObject({ days: 1 })))}><i className="fa fa-chevron-right"></i></ButtonComponent></div>
        </div>

        <div className='mb-2'>
            <CheckboxesComponent status={result} setDayBad={() => setDayBad(date, result)} setDayGood={() => setDayGood(date, result)} />
        </div>

        <SectionComponent title="Activity">

            <ListComponent>
                <DataRowComponent label="Current Streak">
                    {chain}
                </DataRowComponent>
                <DataRowComponent label="Next Ok">
                    {chainToValue(chain + 1)} credits
                </DataRowComponent>
            </ListComponent>
        </SectionComponent>
        <SectionComponent title="wallet">
            <TotalsComponent wallet={wallet} />
        </SectionComponent>
    </div>;
}

