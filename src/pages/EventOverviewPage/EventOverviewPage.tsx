import React, { useEffect } from 'react';
import { StyledCard } from "../../components/StyledCard/StyledCard";
import { BtnGroupSelect } from '../../components/ButtonGroup/ButtonGroup';
import BtnFilters from '../../components/Filters/BtnFilters';
import styles from "./EventOverviewPage.module.css";
import event1 from "../../assets/pictures/Event1.png";
import event2 from "../../assets/pictures/Event2.png";
import event3 from "../../assets/pictures/Event3.png";
import { useState } from 'react';
import { ButtonArt } from './../../components/ButtonArt/ButtonArt';
import { useFetchEventsQuery } from '../../app/services/EventsApi';
import { EventT } from '../../app/Types/EventsT';


interface Iitems {
    id: number;
    name: string;
    date: string;
    image: string;
    type: string;
    status: string;
    numberOfExhibits: string,
    entryCost: string,
    ageRestriction: string,
}

/* const items = [
    {
        id: 1, name: "1", date: "12.06.2023", image: event1, type: 'Выставка', status: 'draft',
        numberOfExhibits: '50', entryCost: '1000', ageRestriction: '50'
    },
    {
        id: 2, name: "2", date: "12.06.2023", image: event2, type: 'Выставка', status: 'completed',
        numberOfExhibits: '2000000000', entryCost: '15000', ageRestriction: '6'
    },
    {
        id: 3, name: "3", date: "12.06.2023", image: event3, type: 'Выставка', status: 'published',
        numberOfExhibits: '10', entryCost: '300', ageRestriction: '12'
    },
    {
        id: 4, name: "5", date: "12.06.2023", image: event1, type: 'Тусня', status: 'completed',
        numberOfExhibits: '24', entryCost: '250', ageRestriction: '18'
    },
    {
        id: 5, name: "7", date: "12.06.2023", image: event1, type: 'Тусня', status: 'completed',
        numberOfExhibits: '24', entryCost: '250', ageRestriction: '18'
    },
    {
        id:6, name: "7", date: "12.06.2023", image: event1, type: 'Тусня', status: 'completed',
        numberOfExhibits: '24', entryCost: '250', ageRestriction: '18'
    },
    {
        id: 7, name: "7", date: "12.06.2023", image: event1, type: 'Тусня', status: 'completed',
        numberOfExhibits: '24', entryCost: '250', ageRestriction: '18'
    },
    {
        id: 8, name: "7", date: "12.06.2023", image: event1, type: 'Тусня', status: 'completed',
        numberOfExhibits: '24', entryCost: '250', ageRestriction: '18'
    },
    {
        id: 9, name: "7", date: "12.06.2023", image: event1, type: 'Тусня', status: 'completed',
        numberOfExhibits: '24', entryCost: '250', ageRestriction: '18'
    },
]; */



const sort = [{ name: "По дате" }, { name: "По типу" }];

export const EventOverviewPage: React.FC = () => {
    const { data: events, isLoading } = useFetchEventsQuery()
    const [items, setItems] = useState<EventT[]>([]);

    useEffect(() => {
        let isCancelled = false
        if (!isCancelled && events) {
            setItems([...events])
        }
        return () => {
            isCancelled = true
        }
    }, [events])

    const handleSort = (status: string) => {
        if (events) {
            switch (status) {
                case 'all':
                    setItems([...events]);
                    break;
                case status:
                   /*  setItems(draftCard.reduce((newArr: Iitems[], items) => {
                        if (items.status === status) {
                            newArr.push(items);
                        }
                        return newArr;
                    }, [])) */;
                    setItems(events.filter(item => item.status === status))
                    break;
            }
        }
    };

    const btnData = [
        { name: "Все", onClick: () => handleSort('all') },
        { name: "Активные", onClick: () => handleSort('active') },
        { name: "Неактивные", onClick: () => handleSort('completed') },
        { name: "Черновик", onClick: () => handleSort('draft') },
    ];

    return (

        <div className={styles.wrapper}>
            <div><h1>Мероприятия</h1></div>
            <div className={styles.filter}>
                <BtnGroupSelect view="radio" data={btnData} />
                <div style={{ margin: "10px 0" }} />
                <BtnFilters sort={sort} date={"12.02.2023"} type={""} />
            </div>
            <div className={styles.events_wrapper}>
                {
                    items && items.map((item) => (
                        <div className={styles.events_container}>
                            <StyledCard
                                event={item}
                                key={item.id}
                            />
                        </div>

                    ))}
            </div>
        </div>
    );
}


