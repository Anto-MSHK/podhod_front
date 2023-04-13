import React, { useState } from 'react'
import styles from './ChapterList.module.css'
import { exhibitsT } from '../../app/Types/ExhibitsT'
import { CustomBtn } from '../CustomBtn/CustomBtn'
import editIcon from '../../assets/icons/RedСheckMark.svg'
import { Modal } from 'reactstrap'
import { ChapterForm } from '../ChapterForm/ChapterForm'


type ChapterListT = {
    showpiece: exhibitsT
    eventId: string
}

export const ChapterList: React.FC<ChapterListT> = ({ showpiece, eventId }) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


    return (
        <div  className={styles.chapter_card_container}>
                 <div className={styles.chapter_card_title}>
                            <h2>
                                {showpiece.name}
                            </h2>
                            <div className={styles.add_block_btn_container}>
                                <p className="min">Добавить раздел</p>
                                <CustomBtn className={styles.tool__btn}
                                    onClick={()=> setModal(true)}
                                >
                                    <img src={editIcon} />
                                </CustomBtn>
                            </div>
                        </div>
            {
                showpiece?.chapters && showpiece.chapters.map((chapter, index) => (
                    <div className={styles.chapter_card_content}>
                   
                        <div className={styles.chapter_item_title}>
                            <div>
                                <h3>
                                    {chapter.title}
                                </h3>
                                <p>{chapter.description}</p>
                            </div>
                            <div className={styles.add_block_btn_container}>
                                <p className="min">Добавить блок</p>
                                <CustomBtn className={styles.tool__btn}>
                                    <img src={editIcon} />
                                </CustomBtn>
                            </div>

                        </div>
                        <div>
                            {
                                chapter.blocks.map((block, index) => (
                                    <div className={styles.item}>
                                        <div>{block.title}</div>
                                        {block.type}
                                        <div>
                                            {
                                                block.type === 'text'
                                                    ?
                                                    <>
                                                        <p>{block.textBlock.description}</p>
                                                        <p>{block.textBlock.withAudio}</p>
                                                    </>
                                                    :
                                                    <>
                                                        {
                                                            block.imgBlock.imgs.map((img, index) => (
                                                                <img src={img.path} />
                                                            ))
                                                        }

                                                    </>
                                            }

                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
            <Modal
                isOpen={modal}
                toggle={toggle}
                size={"xl"}
                contentClassName={styles.modalWrapper}
                className={styles.modal}
                backdropClassName={styles.modalModal}
            /* 	onClosed={() => {
                    setEditingExhibit(null);
                }} */
            >
                <ChapterForm eventId={eventId}  showPieceId={showpiece.id} />

            </Modal>
        </div>
    )
}


