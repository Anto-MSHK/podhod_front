import React, { useRef, useEffect, useState } from "react";
import styles from "./ExpoCreateMainForm.module.css";
import { MainInfoExpoForm } from "../../../components/FillForm/FillForm";
import ImagesGallery from "../../../components/ImagesGallery/imagesGallery";
import { CreateEventPayloadT, EventT } from "../../../app/Types/EventsT";
import {
    useAddEventMutation,
    useFetchEventQuery,
} from "../../../app/services/EventsApi";
import { useAppDispatch } from "../../../app/hooks";
import { useParams } from "react-router-dom";

interface ExpoMainPageI {
}
export const ExpoMainPage: React.FC<ExpoMainPageI> = () => {
    return (
        <div className={styles.main_page_form_wrapper}>
            <div>
                <MainInfoExpoForm />
            </div>
        </div>
    );
};
