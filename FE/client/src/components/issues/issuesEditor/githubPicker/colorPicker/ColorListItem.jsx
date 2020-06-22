import React from "react";
import styled from "styled-components";

const ColorListItem = (props) => {
  console.log(props);
  const { title, backgroundColor, color } = props;

  return (
    <ColorListItemWrap backgroundColor={backgroundColor} textColor={color}>
      {title}
    </ColorListItemWrap>
  );
};

const ColorListItemWrap = styled.div`
  height: 20px;
  padding: 0.15em 4px;
  margin-top: 3px;
  font-weight: 600;
  line-height: 15px;
  border-radius: 2px;
  margin-bottom: 3px;
  background-color: green;
  color: #fff;
  background-color: ${(props) => `${props.backgroundColor}`};
  color: ${(props) => `${props.textColor}`};
`;

export default ColorListItem;
