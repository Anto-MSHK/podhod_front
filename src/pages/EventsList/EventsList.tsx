import React, { useEffect } from "react";
import { EventCard } from "../../components/EventCard/EventCard";
import { CustomBtnGroup } from "../../components/CustomBtnGroup/CustomBtnGroup";
import { BtnFilters } from "../../components/Filters/BtnFilters";
import styles from "./EventsList.module.css";
import { useState } from "react";
import { useFetchEventsQuery } from "../../app/services/EventsApi";
import { EventT } from "../../app/Types/EventsT";
import icon10 from "../../assets/icons/DateOfEvent.svg";
import icon11 from "../../assets/icons/DeterminingTheType.svg";

import { InfoCard } from "../../components/InfoCard/InfoCard";
import walletIcon from '../../assets/icons/Wallet.svg'
import smilingFaceIcon from '../../assets/icons/SmilingFace.svg'
import numberOfExhIcon from '../../assets/icons/NumberOfExhibits.svg'

interface Iitems {
	id: number;
	name: string;
	date: string;
	image: string;
	type: string;
	status: string;
	numberOfExhibits: string;
	entryCost: string;
	ageRestriction: string;
}



const handleFilter = (date: string | number, type?: string | undefined) => {};

export const EventsList: React.FC = () => {
	const { data: events, isLoading } = useFetchEventsQuery();
	const [items, setItems] = useState<EventT[]>([]);

	useEffect(() => {
		let isCancelled = false;
		if (!isCancelled && events) {
			setItems([...events]);
		}
		return () => {
			isCancelled = true;
		};
	}, [events]);

	const handleSort = (status: string) => {
		if (events) {
			switch (status) {
				case "all":
					setItems([...events]);
					break;
				case status:
					setItems(events.filter(item => item.status === status));
					break;
			}
		}
	};

	const handleSortByDate = (asc: boolean) => {
		if (items) {
			const sorted = [...items].sort((a, b) => {
				const dateA = new Date(a.createdAt);
				const dateB = new Date(b.createdAt);
				return asc
					? dateA.getTime() - dateB.getTime()
					: dateB.getTime() - dateA.getTime();
			});
			setItems(sorted);
		}
	};



	const handleSortByType = (asc: boolean) => {
		if (items) {
			const sorted = [...items].sort((a, b) => {
				if (a.type === b.type) {
					return a.name.localeCompare(b.name);
				} else {
					return asc
						? a.type.localeCompare(b.type)
						: b.type.localeCompare(a.type);
				}
			});
			setItems(sorted);
		}
	};

	const btnData = [
		{ name: "Все", onClick: () => handleSort("all") },
		{ name: "Активные", onClick: () => handleSort("active") },
		{ name: "Неактивные", onClick: () => handleSort("completed") },
		{ name: "Черновик", onClick: () => handleSort("draft") },
	];

	const sort = [
		{
			name: "По дате",
			icon: icon10,
			onClick: () => {
				handleSortByDate(true);
			},
		},
		{
			name: "По типу",
			icon: icon11,
			onClick: () => {
				handleSortByType(true);
			},
		},
	];

	const calcAvgPricePerEvent = (events: EventT[] | undefined): number[] => {
		let avgPrices: number[] = [];

		events?.forEach(event => {
			let totalPrice = 0;
			let totalCount = 0;
			event.prices.forEach(price => {
				totalPrice += price.price;
				totalCount++;
			});
			avgPrices.push(totalCount ? totalPrice / totalCount : 0);
		});

		return avgPrices;
	};

	const calcAvgOfAvgs = (avgPrices: number[]): number => {
		let total = 0;
		let count = 0;

		avgPrices.forEach(avgPrice => {
			total += avgPrice;
			count++;
		});

		return count ? Math.round(total / count) : 0;
	};

	const avgPrices = calcAvgPricePerEvent(events);
	const avgOfAvgs = calcAvgOfAvgs(avgPrices);


	const roundToNearest = (num: number, numArray: number[]): number => {
		let curr = numArray[0];
		let diff = Math.abs(num - curr);

		numArray.forEach(val => {
			let newdiff = Math.abs(num - val);
			if (newdiff < diff) {
				diff = newdiff;
				curr = val;
			}
		});

		return curr;
	}

	const calcAvgAge = (events: EventT[] | undefined): number => {
		let totalAge = 0;
		let totalCount = 0;

		events?.forEach(event => {
			if(event.ageLimit !== null){
				const age = parseInt(event.ageLimit);
				if(!isNaN(age)){
					totalAge += age;
					totalCount++;
				}
			}
		});

		const averageAge = totalCount ? totalAge / totalCount : 0;

		return roundToNearest(averageAge, [0, 6, 12, 16, 18]);
	};


	const countEvents = (events: EventT[] | undefined): number => {
		return events?.length || 0;
	};




	return (
		<div className={styles.wrapper}>
			<div>
				<h1>Мероприятия</h1>
			</div>
			<div className={styles.filter}>
				<div style={{display: 'flex', flexDirection: 'column', gap: 15}}>
					<CustomBtnGroup view="radio" data={btnData} />
					<CustomBtnGroup data={sort} view={"radio"} type={"filter"} />
				</div>
				<div style={{ margin: "10px 0" }} />
				<div className={styles.infoCards}>
					<InfoCard title="Средняя цена за выставку" value={`${avgOfAvgs} руб.`} icon={walletIcon}/>
					<InfoCard title="Всего создано выставок" value={`${countEvents(events)} шт.`} icon={numberOfExhIcon} />
					<InfoCard title="Среднее ограничение" value={`${calcAvgAge(events)}+`} icon={smilingFaceIcon} />
				</div>
			</div>
			<div className={styles.content_container}>
				<div className={styles.content_container__grid_list}>
					{items.length > 0 ?
						items.map(item => (
							<div key={item.id} className={styles.grid_list__item_container}>
								<EventCard event={item} />
							</div>
						)) : <h1>Мероприятия отсутствуют</h1>}
				</div>
			</div>
		</div>
	);
};
