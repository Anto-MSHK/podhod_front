import React, { useState } from 'react'
import styles from './ChapterList.module.css'
import { exhibitsT } from '../../app/Types/ExhibitsT'
import { CustomBtn } from '../CustomBtn/CustomBtn'
import { Button, ListGroup, Modal } from 'reactstrap'
import { ChapterForm } from '../ChapterForm/ChapterForm'
import { useDeleteChapterMutation } from '../../app/services/ChapterApi'
import ChapterItem from '../ChapterItem/ChapterItem'
import editIcon from '../../assets/icons/editIcon.svg'
import CustomCard from '../CustomCard/CustomCard'
import CustomListItem from '../CustomListItem/CustomListItem'

type ChapterListT = {
    showpiece: exhibitsT
    eventId: string
}

export const ChapterList: React.FC<ChapterListT> = ({ showpiece, eventId }) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


    return (
        <CustomListItem title={showpiece.name}
            dropdownItems={[{
                text: 'Добавить раздел',
                onClick: () => setModal(true)
            }]}
            className={styles.chapter_card_container}
        >
            <ListGroup className={styles.chapters_container}>
                {
                    showpiece?.chapters && showpiece.chapters.map((chapter, index) => (
                        <ChapterItem key={chapter.id + index} chapter={chapter} showpieceId={showpiece.id} eventId={eventId} />))

                }
            </ListGroup>
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
                <ChapterForm eventId={eventId} showPieceId={showpiece.id} />

            </Modal>
        </CustomListItem>
    )
}




{/* <div className={styles.chapter_card_content}>
                          <CustomBtn className={`${styles.chapter_item_title} ${styles.tool__btn}`}
                              onClick={() => setIsChapterShow(!isChapterShown)}
                          >
                              <div>
                                  <h3>
                                      {chapter.title}
                                  </h3>
                                  <p>{chapter.description}</p>
                              </div>
                              <div className={styles.btn_container}>
  
                                  <CustomBtn className={styles.tool__btn} iconPosition='right' icon={editIcon}>
                                      <p className="min">Добавить блок</p>
                                  </CustomBtn>
  
                                  <CustomBtn className={styles.tool__btn} onClick={() => handleDeleteChapter(String(chapter.id), showpiece.id)} icon={editIcon}
                                      iconPosition='right'
                                  >
                                      <p className="min">Удалить раздел</p>
                                  </CustomBtn>
                              </div>
                          </CustomBtn> */}
{/*  {
                              isChapterShown
                                  ?
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
                                  :
                                  null
                          }
                      </div>  */}