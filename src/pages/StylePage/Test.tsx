import { useState } from "react";
import { Formik, Form, Field } from "formik";

export function MyForm() {
	const [editing, setEditing] = useState(false);

	const initialValues = {
		// здесь ваши начальные значения полей формы
	};

	const handleSubmit = (values: any, actions: any) => {
		// здесь ваша логика отправки формы
		actions.setSubmitting(false);
		setEditing(false);
	};

	const toggleEditing = () => {
		setEditing(!editing);
	};

	return (
		<Formik initialValues={initialValues} onSubmit={handleSubmit}>
			{({ isSubmitting }) => (
				<Form>
					<Field type="text" name="field1" disabled={!editing} />
					<Field type="text" name="field2" disabled={!editing} />
					<button type="submit" disabled={!editing || isSubmitting}>
						{editing ? "Сохранить" : "Изменить"}
					</button>
					<button type="button" onClick={toggleEditing}>
						{editing ? "Отмена" : "Редактировать"}
					</button>
				</Form>
			)}
		</Formik>
	);
}
