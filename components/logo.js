import styled from 'styled-components';

const Logo = styled.img`
  @media only screen and (min-width: 768px) {
    width: 110px;
    margin: 0 auto;
  }
  @media only screen and (min-width: 320px) {
    width: 100px;
    margin: 0 auto;
  }
  display: block;
  max-width: 100%;
  height: auto;
`;

export default Logo;
