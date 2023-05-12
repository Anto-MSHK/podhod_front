import React from 'react'
import styles from './BlockItem.module.css'
import { BlockT } from '../../app/Types/ChapterT'
import CustomCard from '../CustomCard/CustomCard'
import { CardBody, CardText, CardTitle } from 'reactstrap'

type BlockItemT = {
    block: BlockT
}

export const BlockItem: React.FC<BlockItemT> = ({block}) => {
    return (
        <CustomCard className={styles.item}>
            <CardTitle>
                <CardText tag={'h3'}>{block.title}</CardText>
                {block.type}
            </CardTitle>
        
            <CardBody>
                {
                    block.type === 'text'
                        ?
                        <>
                            <CardText tag={'p'}>{block.textBlock.description}</CardText>
                            <CardText tag={'p'}>{block.textBlock.withAudio}</CardText>
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
            </CardBody>
        </CustomCard>
    )
}
