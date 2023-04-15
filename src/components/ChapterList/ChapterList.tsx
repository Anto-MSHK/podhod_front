import React, { useState } from 'react'
import styles from './ChapterList.module.css'
import { exhibitsT } from '../../app/Types/ExhibitsT'
import { CustomBtn } from '../CustomBtn/CustomBtn'
import { Button, Modal } from 'reactstrap'
import { ChapterForm } from '../ChapterForm/ChapterForm'
import { useDeleteChapterMutation } from '../../app/services/ChapterApi'
import ChapterItem from '../ChapterItem/ChapterItem'
import editIcon from '../../assets/icons/editIcon.svg'

type ChapterListT = {
    showpiece: exhibitsT
    eventId: string
}

export const ChapterList: React.FC<ChapterListT> = ({ showpiece, eventId }) => {

    const [modal, setModal] = useState(false);
    const [isChapterShown, setIsChapterShow] = useState(false)
    const toggle = () => setModal(!modal);
    

    return (
        <div className={styles.chapter_card_container}>
            <div className={styles.chapter_card_title}>
                <h2>
                    {showpiece.name}
                </h2>
                <div className={styles.btn_container}>
                    
                    <CustomBtn className={styles.tool__btn}
                        onClick={() => setModal(true)}
                        icon={editIcon}
                    >
                        <p className="min">Добавить раздел</p>
                    </CustomBtn>
                </div>
            </div>
                <div className={styles.chapters_container}>
                    
                    {
                        
                    
                        showpiece?.chapters && showpiece.chapters.map((chapter, index) => (
                            <ChapterItem key={chapter.id + index} chapter = {chapter} showpieceId={showpiece.id } eventId = {eventId}/>))
                    
                    }
                 </div>
                 

                
            
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
        </div>
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
