import * as React from 'react';

import { DayDataExtended, WalletExtended, DayResult } from '../model/types';
import { CheckboxesComponent } from './CheckboxesComponent';
import { WalletComponent } from '../common/WalletComponent';
import { SectionComponent } from '../common/SectionComponent';
import { DataRowComponent } from '../common/DataRowComponent';
import { ListComponent } from '../common/ListComponent';
import { chainToValue } from '../App/selectors';
import { DateTime, Duration } from 'luxon';
import { ButtonComponent } from '../common/ButtonComponent';
import { Link } from "react-router-dom";



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
            <div className='w-8'> <ButtonComponent style="clean" action={() => changeDay(date.minus(Duration.fromObject({ days: 1 })))}><i className="fa fa-chevron-left"></i></ButtonComponent></div>
            <div className='text-2xl text-blue-100 flex-grow text-center' onClick={() => location.reload()}>
                {dateFormatted}
            </div>
            { date.diffNow('days').days <= -1 ?  <div className='w-8'> <ButtonComponent style="clean" action={() => changeDay(date.plus(Duration.fromObject({ days: 1 })))}><i className="fa fa-chevron-right"></i></ButtonComponent></div> : <div className='w-8'/>}
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
            <WalletComponent wallet={wallet} />

            <div className='w-full'>
                <ButtonComponent style='primary-outline' size="large">
                    <Link to="/spend"> SPEND </Link>
                </ButtonComponent>
            </div>
        </SectionComponent>
    </div>;
    }

