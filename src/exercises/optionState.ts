export interface OptionVisualState {
  /** Selected before the answer has been checked. */
  selected: boolean;
  checked: boolean;
  isChosen: boolean;
  isCorrectOption: boolean;
}

export function getOptionVisualState(
  optionId: string,
  correctOptionId: string,
  selectedOptionId: string | null,
  checked: boolean,
): OptionVisualState {
  const isChosen = selectedOptionId === optionId;

  return {
    selected: !checked && isChosen,
    checked,
    isChosen,
    isCorrectOption: optionId === correctOptionId,
  };
}
