import { BtnGroupSelect } from './../../components/buttonGroup/ButtonGroup';
import { PublicationStatus } from "./../../components/PublicationStatus/PublicationStatus";
import { Widget } from "./../../components/Widget/Widget";
import { StyledCard } from "../../components/StyledCard/StyledCard";
import DragAndDrop from "../../components/DragAndDrop/dragAndDrop";
import ImagesGallery from "../../components/ImagesGallery/imagesGallery";

import icon1 from "../../assets/icons/Icon.svg";
import icon2 from "../../assets/icons/Icon2.svg";
import icon3 from "../../assets/icons/Icon3.svg";
import icon4 from "../../assets/icons/Icon4.svg";
import icon7 from "../../assets/icons/Icon7.svg";
import { CheckBox } from '../../components/CheckBox/CheckBox';
import { FillForm } from '../../components/FillForm/FillForm';


export const MainPage = () => {
    const btnData = [
        { name: "Все" },
        { name: "Активные" },
        { name: "Просмотренные" },
        { name: "Черновик" },
    ];

    const sort = [{ name: "По дате" }, { name: "По типу" }];

    return (
        <div>
            <div style={{ display: "flex" }}>
                <div style={{ marginRight: 40, width: "40%" }}>
                    <h1>{`<h1>`} - Заголовок 1</h1>
                    <h2>{`<h2>`} - Заголовок 2</h2>
                    <h3>{`<h3>`} - Заголовок 3</h3>
                    <p>
                        {`<p>`} - Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consectetur sunt ea cumque esse deleniti eligendi consequatur quae
                        tempore veniam possimus quasi aliquid aliquam, magnam fugiat,
                        ducimus voluptas eveniet minima deserunt.
                    </p>
                    <p className="min">{`<p>.min`} - микро текст</p>
                    <BtnGroupSelect view="radio" data={btnData} />
                    <div style={{ margin: "10px 0" }} />
                    <BtnGroupSelect view="select" data={btnData} />
                    <div style={{ margin: "10px 0" }} />
                    <div style={{ display: "flex" }}>
                        <div style={{ marginRight: 45 }}>
                            <p className="bold">{`<p>.bold`}</p>
                            <p className="medium">{`<p>.medium`}</p>
                            <p className="regular">{`<p>.regular`}</p>
                        </div>
                        <div>
                            <p className="bold-italic">{`<p>.bold-italic`}</p>
                            <p className="medium-italic">{`<p>.medium-italic`}</p>
                            <p className="regular-italic">{`<p>.regular-italic`}</p>
                        </div>
                    </div>
                </div>
                <div style={{ width: "60%" }}>
                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            marginBottom: 10,
                        }}
                    >
                        <Widget info="4" icon={icon1} description="экспоната" />
                        <Widget info="от 250р." icon={icon2} description="платный вход" />
                        <Widget info="6+" icon={icon3} description="возраст" />
                        <Widget icon={icon7} info=" " description="23-26 июля" />
                        <Widget icon={icon4} description="Открытый вход" />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            marginBottom: 10,
                        }}
                    >
                        <PublicationStatus status="Опубликовано" type="completed" />
                        <PublicationStatus status="Черновик" type="draft" />
                        <PublicationStatus status="Выставка" type="event" />
                    </div>
                    <StyledCard
                        eventTitle="Экспозиция музея"
                        dateOfCreation="22.02.2023"
                    />
                </div>
            </div>
            <div>
                <div style={{ margin: "10px 0" }} />
                <DragAndDrop />
                <div style={{ margin: "10px 0" }} />
                <ImagesGallery />
                <div style={{ margin: "10px 0" }} />
            </div>
            <div style={{ width: 1200 }}>
                <FillForm />
            </div>
        </div>
    );
};
