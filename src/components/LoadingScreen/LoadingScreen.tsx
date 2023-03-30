import React, {FC, useEffect, useState} from "react";
import { Spinner } from "reactstrap";
import styles from './LoadingScreen.module.css'

interface LoadingScreenI {
    isLoading: boolean;
}

export const LoadingScreen: FC<LoadingScreenI> = ({ isLoading }) => {
    const [mounted, setMounted] = useState(true);

    useEffect(() => {
        return () => {
            setMounted(false);
        };
    }, []);

    useEffect(() => {
        if (isLoading && mounted) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isLoading, mounted]);

    return (
        <div className={styles.loading_screen}>
            {[...Array(165)].map((_,index) => (
                <Spinner key={index}
                         type="grow"
                         className={styles.spinner}
                />
            ))}
        </div>
    );
};