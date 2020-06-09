import React from "react";
import { TableItem } from "@style/CustomStyle";
import styled from "styled-components";

const MilestonesItem = ({ milestone }) => {
  const { title, dueDate, description, linkIssues } = milestone;

  let openLinkIssuesCount = 0;
  let closedLinkIssuesCount = 0;
  linkIssues.forEach((linkIssue) => (linkIssue.bOpen ? openLinkIssuesCount++ : closedLinkIssuesCount++));
  const completeRatio = Math.floor((closedLinkIssuesCount / linkIssues.length) * 100);

  return (
    <TableItem>
      <MilestonesItemWrap>
        <div className="left-info">
          <div className="title">{title}</div>
          <div className="due-date">📅 Due by {dueDate}</div>
          <div className="description">{description}</div>
        </div>
        <div className="right-info">
          <ProgressBarBackround className="progress-bar">
            <ProgressBar {...{ completeRatio }} />
          </ProgressBarBackround>
          <div className="progress-text">
            <span>
              <b>{completeRatio}%</b> complete
            </span>
            <span>
              <b>{openLinkIssuesCount}</b> open
            </span>
            <span>
              <b>{closedLinkIssuesCount}</b> closed
            </span>
          </div>
          <div className="buttons-wrap">
            <button className="edit-btn">Edit</button>
            <button className="close-btn">Close</button>
            <button className="delete-btn">Delete</button>
          </div>
        </div>
      </MilestonesItemWrap>
    </TableItem>
  );
};

const MilestonesItemWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  .left-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .title {
      font-weight: 600;
      font-size: 20px;
      margin-bottom: 8px;
    }
    .due-date {
      margin-bottom: 8px;
    }
    .description {
      width: 400px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .right-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .progress-bar {
      margin-bottom: 10px;
    }
    .progress-text {
      margin-bottom: 10px;
      b {
        font-weight: 600;
      }
      & > * {
        margin-right: 20px;
      }
    }
    .buttons-wrap {
      .edit-btn,
      .close-btn {
        color: #00a8ff;
      }
      .delete-btn {
        color: #e84118;
      }
      & > * {
        margin-right: 20px;
        outline: none;
        font-family: "Noto Sans KR", sans-serif;
        font-size: 15px;
        cursor: pointer;
      }
    }
  }
`;

const ProgressBarBackround = styled.div`
  width: 400px;
  height: 13px;
  border-radius: 5px;
  background-color: #ecf0f1;
  position: relative;
`;

const ProgressBar = styled.div`
  width: ${(props) => props.completeRatio}%;
  height: 100%;
  border-radius: 5px;
  background-color: #2ecc71;
  position: absolute;
  top: 0;
  left: 0;
`;

export default MilestonesItem;
