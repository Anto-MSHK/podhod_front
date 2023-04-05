import * as React from "react";
import styles from "./EventForm.module.css";
import { CustomBtn } from "../CustomBtn/CustomBtn";
import { useState, useEffect } from "react";
import { FormContainer } from "../Form/Form";
import * as Yup from "yup";
import { FormikConfig, FormikProps } from "formik";
import { FormInput } from "../Form/FormInput";
import { useAppDispatch } from "../../app/hooks";
import { setEvent } from "../../app/Slices/ExpoCreateSlice";
import {
  useAddEventMutation,
  useUpdateEventMutation,
} from "../../app/services/EventsApi";
import {
  CreateEventPayloadT,
  EventT,
  UpdateEventPayloadT,
} from "../../app/Types/EventsT";
import { useNavigate, useParams } from "react-router-dom";
import { InputType } from "reactstrap/types/lib/Input";

interface formType {
  eventName: string;
  description: string;
  age: string;
  eventType: string;
}
interface MainInfoExpoFormI {
  defaultData: EventT | undefined;
}
export const EventForm: React.FC<MainInfoExpoFormI> = ({
  defaultData,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const EventTypeOptions = [
    { name: "Выставка", value: "exhibition" },
    { name: "Ярмарка", value: "fair" },
    { name: "Промо-выставка", value: "promo-exhibition" },
  ];
  const ages = [0, 6, 12, 16, 18];
  const agesOptions = ages.map((age, index) => {
    return (
      <option key={index} value={age + "+"}>
        {age + "+"}
      </option>
    );
  });
  const eventOptions = EventTypeOptions.map((elements, index) => {
    return (
      <option key={index} value={elements.value}>
        {elements.name}
      </option>
    );
  });
  const dispatch = useAppDispatch();
  const [addEvent, { isError }] = useAddEventMutation();
  const [updateEvent, { isError: isErrorUpdate }] = useUpdateEventMutation();

  const handleAddEvent = async (event: CreateEventPayloadT) => {
    return await addEvent(event).unwrap();
  };

  const handleUpdateEvent = async (event: UpdateEventPayloadT) => {
    await updateEvent(event).unwrap();
  };

  type FormInputDataT = {
    label: string,
    type: InputType,
    children?: JSX.Element | JSX.Element[],
  }

  const dictionary: Record<string, FormInputDataT> = {
    eventName: {
      label: "Название",
      type: 'text',
    },
    description: {
      label: "Описание",
      type: 'textarea',
    },
    age: {
      label: "Возраст",
      type: 'select',
      children: agesOptions,
    },
    eventType: {
      label: "Тип события",
      type: 'select',
      children: eventOptions,
    },

  };

  const translate = (key: string) => {
    return dictionary[key] || key;
  };

  const formConfig: FormikConfig<formType> = {
    initialValues: {
      eventName: defaultData ? defaultData.name : "",
      description: defaultData ? defaultData.description : "",
      age: defaultData ? defaultData.ageLimit || "0+" : "0+",
      eventType: defaultData ? defaultData.type : "promo-exhibition",
    },
    onSubmit: async (values, form) => {
      let event: CreateEventPayloadT = {
        date: new Date().toISOString(),
        description: values.description,
        name: values.eventName,
        type: values.eventType,
        prices: [
          {
            criterion: "VIP",
            price: 200,
          },
        ],
        ageLimit: values.age,
      };
      if (id) {
        let updateEvent: UpdateEventPayloadT = {
          id: id,
          date: new Date().toISOString(),
          description: values.description,
          name: values.eventName,
          type: values.eventType,
          ageLimit: values.age,
        };
        handleUpdateEvent(updateEvent);
      } else {
        const newEvent = await handleAddEvent(event);
        navigate(`/expo/${newEvent.id}`);
      }
      form.setSubmitting(false);
      dispatch(setEvent(values));
      setEditing(false);

    },
  };
  const schemaConfig: Yup.ObjectShape = {
    eventName: Yup.string().required("Обязательное поле!"),
    description: Yup.string().required("Обязательное поле!"),
    age: Yup.string().required("Обязательное поле!"),
    eventType: Yup.string().required("Обязательное поле!"),
  };

  useEffect(() => {
    if (!id) setEditing(true);
  }, [id]);
  const [editing, setEditing] = useState(false);

  const toggleEditing = () => {
    setEditing(!editing);
  };

  return (
    <FormContainer schemaConfig={schemaConfig} formConfig={formConfig}>
      {(formik) => (
        <div className={styles.fillForm_container}>
          <div className={styles.asd}>
            <h2>{`Основная информация`}</h2>
            <div style={{ display: "flex", gap: 15 }}>
              {editing && (
                <CustomBtn
                  type="submit"
                  disabled={
                    !editing ||
                    formik.isSubmitting ||
                    Object.keys(formik.errors).length > 0
                  }
                >
                  {editing ? "Сохранить" : "Изменить"}
                </CustomBtn>
              )}
              {id && (
                <CustomBtn type="button" onClick={toggleEditing}>
                  {editing ? "Отмена" : "Редактировать"}
                </CustomBtn>
              )}
            </div>
          </div>
          <div className={styles.form}>
            <div className={styles.form_info}>
              <div className={styles.left}>
                {
                  Object.entries(dictionary).map(([key, value], index) => (
                    index <= 1 &&
                    <FormInput
                      name={key}
                      label={value.label}
                      type={value.type}
                      children={value.children}
                      disabled={!editing}
                    />
                  ))
                }
              </div>
              <div className={styles.right}>
                {
                  Object.entries(dictionary).map(([key, value], index) => (
                    index >= 2 &&
                    <FormInput
                      name={key}
                      label={value.label}
                      type={value.type}
                      children={value.children}
                      disabled={!editing}
                    />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      )}
    </FormContainer>
  );
};
