import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Large } from '../../stories/Button.stories';

export const TextBlock = (props: { buttonLabel: any; className: any; }) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>Text</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
         <input  style={{fontWeight: '600'}} type='text'/>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Добавить</Button>{' '}
          <Button color="secondary" onClick={toggle}>Отмена</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}


