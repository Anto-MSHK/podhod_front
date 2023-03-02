import React  from 'react'
import { StyledCard } from "../../components/StyledCard/StyledCard";
import { BtnGroupSelect } from '../../components/ButtonGroup/ButtonGroup';
import BtnFilters from '../../components/Filters/BtnFilters';
import styles from "./EventOverviewPage.module.css";
import event1 from "../../assets/pictures/Event1.png";
import event2 from "../../assets/pictures/Event2.png";
import event3 from "../../assets/pictures/Event3.png";

const items =[
    {name: "Fff", date: "12.06.2023", image: event1},
    {name: "Dff", date: "12.06.2023", image: event2},
    {name: "Tff", date: "12.06.2023", image: event3},
] 



const btnData = [
    { name: "Все" },
    { name: "Активные" },
    { name: "Просмотренные" },
    { name: "Черновик" },
]


const sort = [{ name: "По дате" }, { name: "По типу" }];

export function EventOverviewPage() {
    return (
     
        <div className={styles.wrapper}>
            <div><h1>Мероприятия</h1></div>

            <div className={styles.filter}>
                <BtnGroupSelect view="radio" data={btnData} />
                <div style={{ margin: "10px 0" }} />
                <BtnFilters sort={sort} date={"12.02.2023"} type={""} />
            </div>
           <div className={styles.card}>
         
                {items.map((item)=>(<StyledCard eventTitle={item.name} dateOfCreation={item.date} image={item.image}/>))}
           </div>
            


        </div>
    );
}


