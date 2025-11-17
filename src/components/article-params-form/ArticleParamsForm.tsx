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
import clsx from 'clsx';

type Props = {
	articleSettings: ArticleStateType;
	setArticleSettings: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({
	articleSettings,
	setArticleSettings,
}: Props) => {
	const [isFormOpen, setFormOpen] = useState(false);
	const [articleDraft, setArticleDraft] =
		useState<ArticleStateType>(articleSettings);

	useEffect(() => {
		setArticleDraft(articleSettings);
	}, [articleSettings]);
	const handleApply = () => setArticleSettings(articleDraft);
	const handleReset = () => setArticleSettings(defaultArticleState);

	return (
		<>
			<ArrowButton
				isOpen={isFormOpen}
				onClick={() => setFormOpen(!isFormOpen)}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
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
							selected={articleDraft.fontFamilyOption}
							onChange={(option: OptionType) =>
								setArticleDraft((s) => ({ ...s, fontFamilyOption: option }))
							}
							title='Шрифт'
						/>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={articleDraft.fontSizeOption}
							onChange={(option) =>
								setArticleDraft((s) => ({ ...s, fontSizeOption: option }))
							}
							title='Размер шрифта'
						/>
						<Select
							options={fontColors}
							selected={articleDraft.fontColor}
							onChange={(option: OptionType) =>
								setArticleDraft((s) => ({ ...s, fontColor: option }))
							}
							title='Цвет шрифта'
						/>
					</div>
					<Select
						options={backgroundColors}
						selected={articleDraft.backgroundColor}
						onChange={(option: OptionType) =>
							setArticleDraft((s) => ({ ...s, backgroundColor: option }))
						}
						title='Фон'
					/>

					<Select
						options={contentWidthArr}
						selected={articleDraft.contentWidth}
						onChange={(option: OptionType) =>
							setArticleDraft((s) => ({ ...s, contentWidth: option }))
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
