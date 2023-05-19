import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as Yup from "yup";
import { FormContainer } from '../Form/Form';
import { CustomBtn } from '../CustomBtn/CustomBtn';
import { FormInput } from '../Form/FormInput';
import styles from './BlockForm.module.css'
import { FormikConfig } from 'formik';
//import { useAddBlockMutation } from '../../app/services/BlockApi';
import { CustomBtnGroup } from '../CustomBtnGroup/CustomBtnGroup';
import { group } from 'console';
import { useAddBlockMutation } from '../../app/services/ChapterApi';

type TextBlockFormType = {
  title: string,
  description: string,
  type: string,
}
interface BlockFormI {
	id: string
	modal:  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}
export const BlockForm: React.FC<BlockFormI> = ({id, modal}) => {

	
  const [addBlock] = useAddBlockMutation()
  const formConfig: FormikConfig<TextBlockFormType> = {
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

	const btnData = [
		{ name: "Текст", onClick: () =>  {} },
		{ name: "Картинка", onClick: () => {}},
		
	];


	const schemaConfig: Yup.ObjectShape = {
		title: Yup.string().required("Обязательное поле!"), 
	};



  return (
	
		
     <Modal
				isOpen={modal[0]}
				toggle={()=>{modal[1](prev=>!prev)}}
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
								style={{ backgroundColor: "#1E1E1E" }}
							>
								Создать текстовый блок
							</ModalHeader>
							
							<ModalBody
								style={{ backgroundColor: "#1E1E1E ", color: "white" }}
							>
								<div style={{ backgroundColor: "#1E1E1E "}}>
							<CustomBtnGroup    view="radio" data={btnData}  />
							</div>
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
								<CustomBtn onClick={()=>{modal[1](prev=>!prev)}}>Отменить</CustomBtn>
							</ModalFooter>
						</>
					)}
				</FormContainer>
			</Modal>
			
  );
}

