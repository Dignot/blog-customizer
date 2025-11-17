import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { Text } from 'src/ui/text';
import { useEffect, useState } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';

type Props = {
	state: ArticleStateType;
	setState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({ state, setState }: Props) => {
	const [isOpen, setOpen] = useState(false);
	const [draft, setDraft] = useState<ArticleStateType>(state);

	useEffect(() => {
		setDraft(state);
	}, [state]);

	const handleApply = () => setState(draft);
	const handleReset = () => setState(defaultArticleState);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setOpen(!isOpen)} />
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						handleApply();
					}}>
					<Text size={31} align='left' as='h1' weight={800}>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>
					<div className={styles.formContainer}>
						<Select
							options={fontFamilyOptions}
							selected={draft.fontFamilyOption}
							onChange={(option: OptionType) =>
								setDraft((s) => ({ ...s, fontFamilyOption: option }))
							}
							title='Шрифт'
						/>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={draft.fontSizeOption}
							onChange={(option) =>
								setDraft((s) => ({ ...s, fontSizeOption: option }))
							}
							title='Размер шрифта'
						/>
						<Select
							options={fontColors}
							selected={draft.fontColor}
							onChange={(option: OptionType) =>
								setDraft((s) => ({ ...s, fontColor: option }))
							}
							title='Цвет шрифта'
						/>
					</div>
					<Select
						options={backgroundColors}
						selected={draft.backgroundColor}
						onChange={(option: OptionType) =>
							setDraft((s) => ({ ...s, backgroundColor: option }))
						}
						title='Фон'
					/>

					<Select
						options={contentWidthArr}
						selected={draft.contentWidth}
						onChange={(option: OptionType) =>
							setDraft((s) => ({ ...s, contentWidth: option }))
						}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
