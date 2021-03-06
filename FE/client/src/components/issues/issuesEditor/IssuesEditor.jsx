import React from "react";
import styled from "styled-components";

const IssuesEditor = ({ children }) => {
  return (
    <IssuesEditorWrap>
      <IssuesEditorInner>{children}</IssuesEditorInner>
    </IssuesEditorWrap>
  );
};

const PickerWrap = styled.div`
  width: 25%;
`;

const IssuesEditorWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const IssuesEditorInner = styled.div`
  display: flex;
  width: 1012px;
  height: 500px;
`;

export default IssuesEditor;
