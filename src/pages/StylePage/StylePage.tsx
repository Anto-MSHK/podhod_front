import { BtnGroupSelect } from "../../components/buttonGroup/btnGroupSelect";
import { PublicationStatus } from "./../../common/PublicationStatus/PublicationStatus";
export const MainPage = () => {
  const btnData = [
    { name: "Все" },
    { name: "Активные" },
    { name: "Просмотренные" },
    { name: "Черновик" },
  ];

 const sort = [
      { name: "По дате"},
      { name: "По типу"},
  ]

  return (
    <div>
      <h1>{`<h1>`} - Заголовок 1</h1>
      <h2>{`<h2>`} - Заголовок 2</h2>
      <h3>{`<h3>`} - Заголовок 3</h3>
      <p>
        {`<p>`} - Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Consectetur sunt ea cumque esse deleniti eligendi consequatur quae
        tempore veniam possimus quasi aliquid aliquam, magnam fugiat, ducimus
        voluptas eveniet minima deserunt.
      </p>
      <p className="min">{`<p>.min`} - микро текст</p>
      <BtnGroupSelect view="radio" data={btnData} />
      <div style={{ margin: "10px 0" }} />
      <BtnGroupSelect view="select" data={btnData} />
      <PublicationStatus status="Опубликовано" type="completed" />
      <PublicationStatus status="Черновик" type="draft" />
      <PublicationStatus status="Выставка" type="event" />
    </div>
  );
};
