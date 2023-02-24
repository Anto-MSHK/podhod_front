import * as React from 'react';
import { PublicationStatus } from '../PublicationStatus/PublicationStatus';
import icon1 from '../icon/Icon.svg';
import icon2 from '../icon/Icon2.svg';
import icon3 from '../icon/Icon3.svg';
import icon4 from '../icon/Icon4.svg';
import icon7 from '../icon/Icon7.svg';
import { Widget } from './../Widget/Widget';
import { StyledCard } from './../StyledCard/StyledCard';
import DragAndDrop from '../DragAndDrop/dragAndDrop';


interface ITestProps {
}

export const Test: React.FC<ITestProps> = (props) => {
    return (
        <>
            <Widget info='4' icon={icon1} description='экспоната' />
            <Widget info='от 250р.' icon={icon2} description='платный вход' />
            <Widget info='6+' icon={icon3} description='возраст' />
            <Widget icon={icon7} info=' ' description='23-26 июля' />
            <Widget icon={icon4} description='Открытый вход' />

            <PublicationStatus status='Опубликовано' type='completed' />
            <PublicationStatus status='Черновик' type='draft' />
            <PublicationStatus status='Выставка' type='event' />

            <StyledCard eventTitle='Экспозиция музея' dateOfCreation='22.02.2023' />

            <DragAndDrop/>
        </>
    );
};

