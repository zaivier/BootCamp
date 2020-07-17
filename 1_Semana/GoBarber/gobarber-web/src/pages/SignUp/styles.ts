import styled from 'styled-components';
import { shade } from 'polished';
import sigupBackground from '../../asssets/sing-up-background.png';

const ff9000 = '#ff9000';
const f4ede8 = '#f4ede8';
export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  place-content: center;
  align-items: center;
  flex-direction: column;

  max-width: 700px;
  width: 100%;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    h1 {
      margin-bottom: 24px;
    }

    a {
      color: ${f4ede8};
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, f4ede8)};
      }
    }
  }

  > a {
    color: ${f4ede8};
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;
    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, f4ede8)};
    }
  }
`;

export const BackGround = styled.div`
  flex: 1;
  background: url(${sigupBackground}) no-repeat center;
  background-size: cover;
`;
