import React, { useState } from "react";
import styles from "./EventShowpiecesEdit.module.css";
import { FormInput } from "../Form/FormInput";
import { FormContainer } from "../Form/Form";
import * as Yup from "yup";
import { FormikConfig } from "formik";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CustomBtn } from "../CustomBtn/CustomBtn";
import {
  useFetchExhibitsQuery,
  useAddExhibitMutation,
  useDeleteExhibitMutation,
  useUpdateExhibitMutation,
} from "../../app/services/ExhibitsApi";
import { useAppDispatch } from "../../app/hooks";
import { setExhibit } from "../../app/Slices/ExhibitCreateSlice";
import {
  CreateExhibitPayloadT,
  UpdateExhibitPayloadT,
} from "../../app/Types/ExhibitsT";
import deleteIcon from "../../assets/icons/CrossInCircle.svg";
import { useParams } from "react-router-dom";
import { exhibitsT } from '../../app/Types/ExhibitsT';

interface formType {
  exhibitName: string;
  exhibitShort: string;
  exhibitDescription: string;
}

export const EventShowpiecesEdit = () => {
  const { id: eventId } = useParams();
  const [modal, setModal] = useState(false);
  const { data, isLoading } = useFetchExhibitsQuery(eventId);
  const [addExhibit] = useAddExhibitMutation();
  const [updateExhibit] = useUpdateExhibitMutation();
  const [deleteExhibit] = useDeleteExhibitMutation();
  const [editingExhibit, setEditingExhibit] = useState<any>(null);
  const dispatch = useAppDispatch();

  const toggle = () => setModal(!modal);

  const handleEditExhibit = (exhibit: exhibitsT) => {
    console.log(exhibit);
    setEditingExhibit(exhibit);
    toggle();
  };

  const handleAddExhibit = (values: formType) => {
    console.log("Submitting form...", values);
    let exhibit: CreateExhibitPayloadT = {
      date: new Date().toISOString(),
      name: values.exhibitName,
      short: values.exhibitShort,
      description: values.exhibitDescription,
    };
    dispatch(setExhibit(values));
    addExhibit({ body: exhibit, eventId: eventId as string });
    toggle();
  };

  const handleUpdateExhibit = (values: formType) => {
    console.log("Updating exhibit...", values);
    if (editingExhibit !== null) {
      let exhibit: UpdateExhibitPayloadT = {
        name: values.exhibitName,
        description: values.exhibitDescription,
        short: values.exhibitShort,
      };
      updateExhibit({ id: editingExhibit.id, body: exhibit, eventId: eventId as string});
      toggle();
    }
  };

  const handleDeleteExhibit = async (id: string) => {
    console.log("delete...");
    await deleteExhibit({ id, eventId: eventId as string}).unwrap();
  };

  const formConfig: FormikConfig<formType> = {
    initialValues: {
      exhibitName:
        editingExhibit && editingExhibit.id === null
          ? ""
          : editingExhibit && editingExhibit.name,
      exhibitShort:
        editingExhibit && editingExhibit.id === null
          ? ""
          : editingExhibit && editingExhibit.short,
      exhibitDescription:
        editingExhibit && editingExhibit.id === null
          ? ""
          : editingExhibit && editingExhibit.description,
    },
    onSubmit: (values, form) => {
      if (editingExhibit === null) {
        handleAddExhibit(values);
      } else {
        handleUpdateExhibit(values);
      }
    },
  };

  const schemaConfig: Yup.ObjectShape = {
    exhibitName: Yup.string().required("Обязательное поле!"),
    exhibitShort: Yup.string().required("Обязательное поле!"),
    exhibitDescription: Yup.string().required("Обязательное поле!"),
  };

  return (
    <div className={styles.main_page_form_wrapper}>
      <div>
        <CustomBtn
          onClick={() => {
            setModal(true);
          }}
        >
          Создать экспонат
        </CustomBtn>
      </div>
      <div>
        {!isLoading &&
          data &&
          data.map((el: exhibitsT) => {
            return (
              <div key = {el.id} className={styles.mainCreateExhibitWrapper}>
                <div
                  className={styles.exhibitsListWrapper}
                  onClick={() => handleEditExhibit(el)}
                >
                  <div>{el.name}</div>
                </div>
                <div
                  className={styles.exhibitsDeleteWrapper}
                  onClick={() => {
                    handleDeleteExhibit(el.id);
                  }}
                >
                  <img src={deleteIcon} />
                </div>
              </div>
            );
          })}
      </div>
      <Modal
        isOpen={modal}
        toggle={toggle}
        size={"xl"}
        contentClassName={styles.modalWrapper}
        style={{
          backgroundColor: "#1E1E1E",
          color: "white",
          borderRadius: 15,
          marginTop: "10%",
        }}
        backdropClassName={styles.modalModal}
        onClosed={() => {
          setEditingExhibit(null);
        }}
      >
        <FormContainer schemaConfig={schemaConfig} formConfig={formConfig}>
          {(formik) => (
            <>
              <ModalHeader
                style={{ backgroundColor: "#1E1E1E", color: "white" }}
              >
                {editingExhibit === null
                  ? "Создание экспоната"
                  : "Редактирование экспоната"}
              </ModalHeader>
              <ModalBody
                style={{ backgroundColor: "#1E1E1E ", color: "white" }}
              >
                <div>
                  <div>
                    <FormInput name="exhibitName" label="Название:" />
                    <FormInput name="exhibitShort" label="Короткое описание:" />
                    <FormInput
                      name="exhibitDescription"
                      label="Полное описание:"
                      type={"textarea"}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter
                style={{ backgroundColor: "#1E1E1E", color: "white" }}
              >
                <CustomBtn color="primary" type="submit">
                  Сохранить
                </CustomBtn>
                <CustomBtn onClick={toggle}>Отменить</CustomBtn>
              </ModalFooter>
            </>
          )}
        </FormContainer>
      </Modal>
    </div>
  );
};
