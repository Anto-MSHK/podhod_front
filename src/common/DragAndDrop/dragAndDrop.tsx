import React, { useState } from 'react';
import styles from './dragAndDrop.module.css'
import addFileIcon from '../icon/addFileIcon.svg'


interface IDragAndDrop {

}


const DragAndDrop: React.FC<IDragAndDrop> = (props) => {
    const [drag, setDrag] = useState(false)
    const [selectedFile, setSelectedFile] = useState<FileList | null>(null)

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDrag(true)
    }
    const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDrag(false)
    }
    const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        let files = structuredClone(e.dataTransfer.files)
        setDrag(false)
        console.log(files);
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        console.log(e.target.files);
        setSelectedFile(e.target.files)
    }

    return (
        <div className={styles.drag_and_drop_wrapper}


        >
            {
                drag
                    ?
                    <div className={styles.drag_and_drop_area}
                        onDragStart={e => dragStartHandler(e)}
                        onDragLeave={e => dragLeaveHandler(e)}
                        onDragOver={e => dragStartHandler(e)}
                        onDrop={e => dropHandler(e)}
                    >
                        Отпустите файл
                    </div>
                    :
                    <div className={styles.drag_and_drop_area}
                        onDragStart={e => dragStartHandler(e)}
                        onDragLeave={e => dragLeaveHandler(e)}
                        onDragOver={e => dragStartHandler(e)}
                    >
                        <input  type='file'
                        multiple
                        onChange={handleChange}
                        className={styles.file_input}
                        accept = "image/*,.png,.jpg,.web,"

                        />
                        <img className={styles.icon} src={addFileIcon} />
                        Клик или перенос

                    </div>
            }
        </div>

    );
};

export default DragAndDrop