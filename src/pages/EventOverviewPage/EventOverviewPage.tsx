import React from 'react';
import { StyledCard } from "../../components/StyledCard/StyledCard";
import { BtnGroupSelect } from '../../components/ButtonGroup/ButtonGroup';
import BtnFilters from '../../components/Filters/BtnFilters';
import styles from "./EventOverviewPage.module.css";
import event1 from "../../assets/pictures/Event1.png";
import event2 from "../../assets/pictures/Event2.png";
import event3 from "../../assets/pictures/Event3.png";
import { useState } from 'react';
import { ButtonArt } from './../../components/ButtonArt/ButtonArt';

interface Iitems {
    id: number;
    name: string;
    date: string;
    image: string;
    type: string;
    status: string;
}

const items = [
    { id: 1, name: "1", date: "12.06.2023", image: event1, type: 'Выставка', status: 'draft' },
    { id: 2, name: "2", date: "12.06.2023", image: event2, type: 'Выставка', status: 'completed' },
    { id: 3, name: "3", date: "12.06.2023", image: event3, type: 'Выставка', status: 'published' },
];

const btnData = [
    { name: "Все" },
    { name: "Активные" },
    { name: "Просмотренные" },
    { name: "Черновик" },
];

const sort = [{ name: "По дате" }, { name: "По типу" }];

export function EventOverviewPage() {
    const [item, setItems] = useState<Iitems[]>([]);

    const handleSort = (status: string) => {
        const draftCard = [...items];

        switch (status) {
            case 'draft':
                setItems(draftCard.reduce((newArr: Iitems[], items) => {
                    if (items.status === 'draft') {
                        newArr.push(items);
                    }
                    return newArr;
                }, []));
                break;
            case 'completed':
                setItems(draftCard.reduce((newArr: Iitems[], items) => {
                    if (items.status === 'completed') {
                        newArr.push(items);
                    }
                    return newArr;
                }, []));
                break;
            case 'published':
                setItems(draftCard.reduce((newArr: Iitems[], items) => {
                    if (items.status === 'published') {
                        newArr.push(items);
                    }
                    return newArr;
                }, []));
                break;
            default:
                setItems(draftCard);
        }
    };

    return (

        <div className={styles.wrapper}>
            <div><h1>Мероприятия</h1></div>
            <div className={styles.filter}>
                <BtnGroupSelect view="radio" data={btnData} />
                <div style={{ margin: "10px 0" }} />
                <BtnFilters sort={sort} date={"12.02.2023"} type={""} />
            </div>
            <div className={styles.card}>
                {item.map((item) => (
                    <StyledCard
                        eventTitle={item.name}
                        dateOfCreation={item.date}
                        image={item.image}
                        type={item.type}
                        status={item.status}
                        key={item.id} />
                ))}
            </div>
            <div style={{ display: 'flex' }}>
                <ButtonArt onClick={() => handleSort('draft')}>draft</ButtonArt>
                <ButtonArt onClick={() => handleSort('completed')}>completed</ButtonArt>
                <ButtonArt onClick={() => handleSort('published')}>published</ButtonArt>
                <ButtonArt onClick={() => handleSort('')}>ALL</ButtonArt>
            </div>

        </div>
    );
}


