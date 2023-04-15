import React, { useState } from 'react'
import styles from './ChapterItem.module.css'
import { CustomBtn } from '../CustomBtn/CustomBtn'
import { CardBody, CardTitle } from 'reactstrap'
import editIcon from '../../assets/icons/editIcon.svg'
import CustomCard from '../CustomCard/CustomCard'
import { ChapterT } from '../../app/Types/ChapterT'
import { useDeleteChapterMutation } from '../../app/services/ChapterApi'
import { BlockItem } from '../BlockItem/BlockItem'

type ChapterItemT = {
    chapter: ChapterT,
    showpieceId: string,
    eventId: string,
}

const ChapterItem: React.FC<ChapterItemT> = ({ chapter, showpieceId, eventId }) => {
    const [isChapterShown, setIsChapterShow] = useState(false)
    const [deleteChapter] = useDeleteChapterMutation()


    const handleDeleteChapter = async (id: string, showpieceId: string) => {
        try {
            const payload = await deleteChapter({ eventId, id, showpieceId }).unwrap()
            console.log(payload)
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <CustomCard className={styles.chapter_card_container} outline   >

            <div className={styles.card_title}>
                <CardTitle >
                    <h3>
                        {chapter.title}
                    </h3>
                    <p>{chapter.description}</p>
                </CardTitle>
                <div className={styles.btn_container}>
                    <CustomBtn className={styles.tool__btn} iconPosition='top' icon={editIcon} >
                        <p className="min">Добавить блок</p>
                    </CustomBtn>
                    <CustomBtn className={styles.tool__btn} onClick={() => handleDeleteChapter(String(chapter.id), showpieceId)} icon={editIcon}
                        iconPosition='right'
                    >
                        <p className="min">Удалить раздел</p>
                    </CustomBtn>
                    <CustomBtn onClick={() => setIsChapterShow(!isChapterShown)}>Открыть</CustomBtn>
                </div>
            </div>
            {
                isChapterShown
                    &&
                    <CardBody className={styles.card_body}>

                        {
                            chapter.blocks.map((block, index) => (
                                <BlockItem block={block}/>
                            ))
                        }

                    </CardBody>
            }
        </CustomCard>
    )
}

export default ChapterItem