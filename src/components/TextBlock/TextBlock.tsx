import React from "react";
import styles from "./TextBlock.module.css";
import Headphones from "../../assets/icons/Headphones.svg";
import { ButtonArt } from "../ButtonArt/ButtonArt";
const { useSpeechSynthesis } = require("react-speech-kit");

type TextBlockProps = {
	title: string;
	description: string;
};

export const TextBlock: React.FC<TextBlockProps> = ({
	title,
	description,
}) => {
	const { speak, cancel, speaking, voices, supported} = useSpeechSynthesis();

	const handleClick = () => {
        if (!supported) return console.log('Браузер не поддерживает speech-to-text')

        if (!speaking && voices.length) {
            speak({
                text: description,
                voice: voices[1],
            });
        } else cancel()
	};

	return (
		<div className={styles.textContainer}>
			<div className={styles.titleContainer}>
				<div className={styles.button_container} style={{outline: speaking && '5px solid green'}} >
					<ButtonArt className={styles.listen_btn}
                    onClick={() => handleClick()} 
                    icon={Headphones} 
                    />
				</div>
				<span className={styles.title}>{title}</span>
			</div>
			<div className={styles.description}>{description}</div>
		</div>
	);
};
