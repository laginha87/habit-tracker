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
    setDayGood: (day: DateTime) => void;
    setDayBad: (day: DateTime) => void;
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

    return <div className="px-2 h-screen py-4 w-screen" style={{ background: 'linear-gradient(0deg, rgba(39,87,138,1) 0%, rgba(30,91,172,1) 53%, rgba(50,50,179,1) 93%)' }}>
        <SectionComponent title="Activity">
            <div className='mb-2'>
                <ButtonComponent style="primary" action={() => changeDay(date.minus(Duration.fromObject({days: 1})))}><i className="fa fa-chevron-left"></i></ButtonComponent>
                <div className='text-3xl mb-10 text-blue-100'>
                    {dateFormatted}
                </div>
                <ButtonComponent style="primary" action={() => changeDay(date.plus(Duration.fromObject({days: 1})))}><i className="fa fa-chevron-right"></i></ButtonComponent>
            </div>

            <CheckboxesComponent status={result} setDayBad={() => setDayBad(date)} setDayGood={() => setDayGood(date)} />
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

