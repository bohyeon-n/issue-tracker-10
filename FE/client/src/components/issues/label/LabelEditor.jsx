import React, { useState, useCallback } from "react";

import { LabelSetWrap, Title, LabelName, Description, ColorPicker, RandomColorButton, ColorSelectTab, LabelSetButtons, SetButtons, CancelButton, SaveButton, ColorError } from "@style/CustomStyle";
import { BsArrowRepeat } from "react-icons/bs";

import debounce from "lodash.debounce";
import _ from "@util";

const LabelEditor = ({ type, format, setFormat, snapshot, setSnapShot, onCloseEditor, returnToFormat, updateEditor }) => {
  const { id, textColor, backgroundColor, description, labelName } = format;
  const [colorPickerValue, setColorPickerValue] = useState(_.changeRgbToHex(backgroundColor));
  const [colorPickerValueError, setColorPickerValueError] = useState(false);

  // debounce
  const debounceLabelName = debounce((value) => updateLabelName(value), 500);
  const debounceLabelColors = debounce((labelColors) => updateLabelColors(labelColors), 300);

  // pipeline
  const onClickCancel = () => _.pipe(returnToFormat, onCloseEditor)(snapshot);
  const onClickEditor = () => _.pipe(updateEditor, onCloseEditor)(format);
  const onClickRandomColor = () => _.pipe(_.createRandomRGBColor, _.isDarkColor, updateLabelColors)();
  const onChangeLabelName = (e) => _.pipe(setLabelName, debounceLabelName)(e.target.value);
  const onChangeLabelColors = (e) => _.pipe(setColorPickerInputValue, updateColorPickerInputValue, _.changeHexToRgb, _.isDarkColor, debounceLabelColors)(e.target.value);

  // randomColorPiker Button
  const updateLabelColors = (labelColors) => {
    if (!labelColors) {
      setColorPickerValueError(true);
      setFormat({ ...format, textColor: snapshot.textColor, backgroundColor: snapshot.backgroundColor });
    } else {
      const { r, g, b, textColor } = labelColors;
      const bgColor = "rgb(" + r + "," + g + "," + b + ")";
      setColorPickerValueError(false);
      setFormat({ ...format, textColor: textColor, backgroundColor: bgColor });
    }
  };

  // LabelName input
  const setLabelName = (value) => (value ? value : snapshot.labelName);
  const updateLabelName = (value) => setFormat({ ...format, labelName: setLabelName(value) });

  // Color Picker input

  const setColorPickerInputValue = (value) => (value ? value : "#");
  const updateColorPickerInputValue = (value) => {
    if (value !== "#") {
      setColorPickerValue(value);
      return value;
    } else {
      setColorPickerValue(value);
      return null;
    }
  };

  // Description input
  const updateDescription = (e) => setFormat({ ...format, description: e.target.value });

  // Editor button Active
  const judgeActiveButton = () => (colorPickerValueError ? true : false);

  return (
    <LabelSetWrap>
      <LabelName>
        <Title>Label name</Title>
        <input type="text" placeholder="Label name" onChange={onChangeLabelName} defaultValue={labelName} />
      </LabelName>
      <Description>
        <Title>Description</Title>
        <input type="text" placeholder="Description (optional)" defaultValue={description} onChange={updateDescription} />
      </Description>
      <ColorPicker>
        <Title>Color</Title>
        <ColorSelectTab>
          <RandomColorButton backgroundColor={backgroundColor} color={textColor} onClick={() => debounce(onClickRandomColor, 200)()}>
            <BsArrowRepeat />
          </RandomColorButton>
          {colorPickerValueError && <span>Unavailable Color</span>}
          <input type="text" className="colorInput" onChange={onChangeLabelColors} value={colorPickerValue} maxLength={7} />
        </ColorSelectTab>
      </ColorPicker>
      <LabelSetButtons>
        <SetButtons className="edit_buttons">
          <CancelButton onClick={onClickCancel}>Cancel</CancelButton>
          <SaveButton onClick={onClickEditor} disabled={judgeActiveButton()} blockButton={judgeActiveButton()}>
            {type === "Edit" ? "Save changes" : "Create label"}
          </SaveButton>
        </SetButtons>
      </LabelSetButtons>
    </LabelSetWrap>
  );
};

export default LabelEditor;
