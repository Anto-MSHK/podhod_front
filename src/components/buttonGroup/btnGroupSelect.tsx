import React, {FC} from 'react';
import {RadioBtnGroup} from './radioBtnGroup/radioBtnGroup';
import {SelectBtnGroup} from './selectBtnGroup/selectBtnGroup';
import {ButtonGroup, ButtonToolbar} from 'reactstrap';

type btnGroup = { name: string; }[];

interface BtnGroupI {
    view: string;
    data: btnGroup;
}


export const BtnGroupSelect: FC<BtnGroupI> = ({view, data}) => {

    return (
        <div>
            {view === 'radio' ? (
                <ButtonToolbar>
                    <ButtonGroup>
                        <RadioBtnGroup data={data}/>
                    </ButtonGroup>
                </ButtonToolbar>
            ) : view === 'select' &&
                (
                    <ButtonToolbar>
                        <ButtonGroup>
                            <SelectBtnGroup data={data}/>
                        </ButtonGroup>
                    </ButtonToolbar>
                )
            }
        </div>
    );

}