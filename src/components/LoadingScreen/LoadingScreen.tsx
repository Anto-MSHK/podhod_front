import React, {FC, useEffect} from "react";
import { Spinner } from "reactstrap";
import {inspect} from "util";
import styles from './LoadingScreen.module.css'

interface LoadingScreenI {
    isLoading: boolean;
}

export const LoadingScreen: FC<LoadingScreenI> = ({ isLoading }) => {

    useEffect(() => {
        if (!isLoading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isLoading]);

    return (
        <div className={styles.loading_screen}>
            {[...Array(5000)].map((_,index) => (
                <Spinner key={index}
                         type="grow"
                         className={styles.spinner}
                />
            ))}
        </div>
    );
};