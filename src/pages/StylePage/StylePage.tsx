import { CustomBtnGroup } from "../../components/CustomBtnGroup/CustomBtnGroup";
import { InfoTag } from "../../components/InfoTag/InfoTag";
import { WidgetItem } from "../../components/WidgetItem/WidgetItem";

import icon1 from "../../assets/icons/NumberOfExhibits.svg";
import icon2 from "../../assets/icons/Wallet.svg";
import icon3 from "../../assets/icons/SmilingFace.svg";
import icon4 from "../../assets/icons/Eye.svg";
import icon9 from "../../assets/icons/RedCircleWithCross.svg";
import icon8 from "../../assets/icons/RedСheckMark.svg";
import icon7 from "../../assets/icons/Calendar.svg";
import loginIcon from "../../assets/icons/loginIcon.svg";
import registerIcon from "../../assets/icons/RegisterIcon.svg";
// import { Form } from "../../components/Form/Form";
import { FormContainer } from "../../components/Form/Form";
import { FormInput } from "../../components/Form/FormInput";
import * as Yup from "yup";
import { useFormik, FormikConfig } from "formik";
import { CustomBtn } from "../../components/CustomBtn/CustomBtn";
import { MyForm } from "./Test";
import { InfoMessage } from "../../components/InfoMessage/InfoMessage";
import { ChapterForm } from "../../components/ChapterForm/ChapterForm";
import CustomCard from "../../components/CustomCard/CustomCard";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import ImageItem from "../../components/ImageItem/ImageItem";


export const MainPage = () => {
	const btnData = [
		{ name: "Все" },
		{ name: "Активные" },
		{ name: "Просмотренные" },
		{ name: "Черновик" },
	];

	const sort = [{ name: "По дате" }, { name: "По типу" }];

	const formConfig: FormikConfig<any> = {
		initialValues: {
			email: "",
			password: "",
		},
		onSubmit: values => {
			alert(JSON.stringify(values, null, 2));
		},
	};

	const schemaConfig: Yup.ObjectShape = {
		email: Yup.string()
			.email("Некорректная почта!")
			.required("Обязательное поле!"),
		password: Yup.string()
			.min(4, "Минимум 4 символа!")
			.max(12, "Максимум 12 символов!")
			.required("Обязательное поле!"),
	};

	// @ts-ignore
	// @ts-ignore
	// @ts-ignore
	// @ts-ignore
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
					<CustomBtnGroup view="radio" data={btnData} />
					<div style={{ margin: "10px 0" }} />
					<CustomBtnGroup view="select" data={btnData} />
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
						<WidgetItem info="4" icon={icon1} description="экспоната" />
						<WidgetItem
							info="от 250р."
							icon={icon2}
							description="платный вход"
						/>
						<WidgetItem info="6+" icon={icon3} description="возраст" />
						<WidgetItem icon={icon7} info=" " description="23-26 июля" />
						<WidgetItem icon={icon4} description="Открытый вход" />
					</div>
					<div
						style={{
							display: "flex",
							gap: "10px",
							marginBottom: 10,
						}}
					></div>
					{/*     <EventCard
                        eventTitle="Экспозиция музея"
                        dateOfCreation="22.02.2023"
                        type='Выставка'
                        status="completed"
                    /> */}
				</div>
			</div>
			<div>
				<div style={{ margin: "10px 0" }} />
				{/* <DragAndDrop /> */}
				<div style={{ margin: "10px 0" }} />
				{/* <ImagesGallery /> */}
				<div style={{ margin: "10px 0" }} />
			</div>
			<div>{/* <MainInfoExpoForm /> */}</div>
			<div style={{ marginTop: "10px", marginBottom: "10px" }}>
				<FormContainer schemaConfig={schemaConfig} formConfig={formConfig}>
					{formik => (
						<div>
							<div>
								<div style={{ display: "flex", gap: "10px" }}>
									<CustomBtn icon={registerIcon} type="submit">
										Зарегистрироваться
									</CustomBtn>
									<CustomBtn
										icon={loginIcon}
										iconWidth={25}
										style={{
											backgroundColor: "#282828",
											border: "2px solid #282828",
										}}
									>
										Выйти
									</CustomBtn>
								</div>

								<FormInput name="email" label="Email" />
								<FormInput
									name="password"
									label="Пароль"
									help="От 4 до 12 символов"
								/>
							</div>
						</div>
					)}
				</FormContainer>
			</div>
			<MyForm />
			<div style={{ display: "flex", gap: "10px" }}>
				<div style={{ width: "300px" }}>
					<InfoMessage
						icon={icon9}
						title={"Не может быть опубликовано"}
						desc={"Есть незаполненные поля"}
						iconPosition="right"
					/>
				</div>
				<div style={{ width: "300px" }}>
					<InfoMessage
						icon={icon8}
						title={"Успешно опубликовано"}
						desc={"Ошибок не найдено"}
						iconPosition="right"
					/>
				</div>
				<div>
					<InfoMessage
						iconWidth={100}
						icon={icon7}
						title={"А тут здоровая иконка"}
						desc={"Прикол да"}
					/>
				</div>
			</div>
			<InfoMessage
				iconWidth={50}
				icon={icon4}
				title={"Пример адаптивности"}
				desc={
					"Лорем ипсум долор сит амет, цонсецтетуер адиписцинг елит. Аенеан вулпутате маурис ид аугуе, алияуам тинцидунт нулла ац, пеллентескуе сед маурис. Нам а цонгуе еуисмод елеифенд. Нулла рисус орнаре етим, егестас вел лигула. Сед егестас фелис а дуи, моллис ут рисус ат, моллис моллис рисус."
				}
			/>
			<CustomCard title="sadadas">
					<img style={{width: '100px'}} src={icon1}></img>
					<CardBody>
					<CardTitle tag="h1">
						Card title
					</CardTitle>
					<CardSubtitle
						className="mb-2 text-muted"
						tag="h6"
					>
						Card subtitle
					</CardSubtitle>
					<CardText>
						Some quick example text to build on the card title and make up the bulk of the card‘s content.
					</CardText>
					<CustomBtn>
						Button
					</CustomBtn>
				</CardBody>
				</CustomCard>
			<Card
				style={{
					width: '18rem',
					height: 'fit-content'
				}}
			>
				<img
					alt="Sample"
					src="https://picsum.photos/300/200"
				/>
			
			</Card>

		</div>
	);
};
