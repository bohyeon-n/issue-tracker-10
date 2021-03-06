import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

import TableHeader from "@components/table/TableHeader";
import MilestoneEditorHeader from "./MilestoneEditorHeader";
import MilestoneEditorButtons from "./MilestoneEditorButtons";

const MilestoneEditor = () => {
  const { id } = useParams();
  const { milestonesList } = useSelector(({ milestones }) => milestones);
  const [milestone] = id ? milestonesList.filter((milestone) => milestone.id === +id) : [id];

  const leftSideComponent = <MilestoneEditorHeader {...{ milestone }} />;

  return (
    <MilestoneEditorWrap>
      <MilestoneEditorInner>
        <TableHeader leftSideComponent={leftSideComponent} />
        <form>
          <div className="editor-item-wrap">
            <label className="editor-item-label" htmlFor="milestones-title">
              Title
            </label>
            <input type="text" id="milestones-title" placeholder="Title" defaultValue={milestone && milestone.title} />
          </div>
          <div className="editor-item-wrap">
            <label className="editor-item-label" htmlFor="milestones-due-date">
              Due Date (optional)
            </label>
            <TextField id="milestones-due-date" type="date" defaultValue={milestone && milestone.dueDate} />
          </div>
          <div className="editor-item-wrap">
            <label className="editor-item-label" htmlFor="milestones-description">
              Description (optional)
            </label>
            <textarea id="milestones-description" defaultValue={milestone && milestone.description} />
          </div>
        </form>
        <MilestoneEditorButtons {...{ milestone }} />
      </MilestoneEditorInner>
    </MilestoneEditorWrap>
  );
};

const MilestoneEditorWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #fff;
  margin-top: 10px;
`;

const MilestoneEditorInner = styled.div`
  box-sizing: border-box;
  background-color: #fff;
  width: 980px;
  form {
    padding-top: 20px;
    border-top: 1px solid #c2c2c2;
    border-bottom: 1px solid #c2c2c2;
  }
  .editor-item-label {
    letter-spacing: -0.03rem;
    font-weight: 600;
    margin-bottom: 8px;
  }
  .editor-item-wrap {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  #milestones-title,
  #milestones-due-date,
  #milestones-description {
    width: 400px;
    background-color: #fafbfc;
    border: 1px solid #d1d5da;
    border-radius: 3px;
    outline: none;
    box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
    padding: 4px 10px;
    height: 25px;
    font-size: 15px;
    font-family: "Noto Sans KR", sans-serif;
    box-sizing: content-box;
    :focus {
      background-color: #fff;
      border-color: #2188ff;
      outline: none;
      box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075), 0 0 0 0.2em rgba(3, 102, 214, 0.3);
    }
  }
  #milestones-description {
    width: 550px;
    margin: 0;
    min-height: 200px;
    max-width: 980px;
  }
  .MuiInput-underline {
    &::before,
    &::after {
      display: none;
    }
  }
`;

export default MilestoneEditor;
