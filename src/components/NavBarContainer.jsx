import styled from "styled-components";
import FlexBox from "./FlexBox";

const NavBarContainer = styled(FlexBox)`
  background-color: #131414;
  padding: ${({bpoint}) => bpoint === 'xs'? '16px': '25px 100px'} ;
`;

export default NavBarContainer;
