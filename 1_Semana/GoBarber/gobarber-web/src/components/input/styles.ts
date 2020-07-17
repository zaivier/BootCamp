import styled, { css } from 'styled-components';
import { Tooltip } from '../Tooltip/index';

const ff9000 = '#ff9000';
const f4ede8 = '#f4ede8';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  align-items: center;
  display: flex;

  border: 2px solid #232129;
  color: #666360;

  & + div {
    margin-top: 8px;
  }
  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${props =>
    props.isFocused &&
    css`
      color: ${ff9000};
      border-color: ${ff9000};
    `}
  ${props =>
    props.isFilled &&
    css`
      color: ${ff9000};
    `}


  input {
    background: transparent;
    flex: 1;
    border: 0;
    color: ${f4ede8};

    &::placeholder: {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
