import React, { useRef, useEffect, useState } from "react";
import styles from "./EventMainForm.module.css";
import { MainInfoExpoForm } from "../../../components/FillForm/FillForm";
import ImagesGallery from "../../../components/ImagesGallery/ImagesGallery";
import { CreateEventPayloadT, EventT } from "../../../app/Types/EventsT";
import {
  useAddEventMutation,
  useFetchEventQuery,
} from "../../../app/services/EventsApi";
import { useAppDispatch } from "../../../app/hooks";
import { useParams } from "react-router-dom";

interface EventMainFormI {
  data: EventT | undefined;
}
export const EventMainForm: React.FC<EventMainFormI> = ({ data }) => {
  return (
    <div className={styles.main_page_form_wrapper}>
      <div>
        <MainInfoExpoForm defaultData={data} />
      </div>
    </div>
  );
};
