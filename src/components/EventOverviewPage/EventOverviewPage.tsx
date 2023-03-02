import React, { FC } from 'react'
import { StyledCard } from "../../components/StyledCard/StyledCard";
import { BtnGroupSelect } from '../ButtonGroup/ButtonGroup';
import BtnFilters from '../Filters/BtnFilters';
import styles from "./EventOverviewPage.module.css";
import icon1 from "../../assets/icons/Icon.svg"
import icon2 from "../../assets/icons/Icon2.svg";
import icon3 from "../../assets/icons/Icon3.svg";

const items =[
    {name: "Fff", date: "12.06.2023", image: icon1},
    {name: "Dff", date: "12.06.2023", image: icon2},
    {name: "Tff", date: "12.06.2023", image: icon3},
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


