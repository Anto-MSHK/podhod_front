import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as Yup from "yup";
import { FormContainer } from '../Form/Form';
import { CustomBtn } from '../CustomBtn/CustomBtn';
import { FormInput } from '../Form/FormInput';
import styles from './TextBlockForm.module.css'
import { FormikConfig } from 'formik';
import { useAddBlockMutation } from '../../app/services/BlockApi';

type BlockFormType = {
  title: string,
  description: string,
  type: string,
}
interface TextBlockFormI {
  id: string
}
export const TextBlockForm: React.FC<TextBlockFormI> = ({id}) => {

  const [modal, setModal] = useState(true);
  const toggle = () => setModal(!modal);
  const [addBlock] = useAddBlockMutation()
  const formConfig: FormikConfig<BlockFormType> = {
		initialValues: {
      title: '',
      description: '',
      type: 'text',
		},
		onSubmit: (values, form) => {
       addBlock({
        chapterId: id,
        body: {
           title: values.title,
           type: 'text',
           content: {
            description: values.description,
           }
        }
      });
		},
	};

	const schemaConfig: Yup.ObjectShape = {
		title: Yup.string().required("Обязательное поле!"), 
	};



  return (
    <div>
     <Modal
				isOpen={true}
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
			/* 	onClosed={() => {
					setEditingExhibit(null);
				}} */
			>
				<FormContainer schemaConfig={schemaConfig} formConfig={formConfig}>
					{formik => (
						<>
							<ModalHeader
								style={{ backgroundColor: "#1E1E1E", color: "white" }}
							>
								Создать текстовый блок
							</ModalHeader>
							<ModalBody
								style={{ backgroundColor: "#1E1E1E ", color: "white" }}
							>
								<div>
									<div>
										<FormInput name="title" label="Название:" />
                    <FormInput name="description" label="Описание:" />
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
}


