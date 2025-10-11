import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import UserLeftNav from "../components/UserLeftNav/UserLeftNav";
import styled from "styled-components";

const UserLayout = () => {
  return (
    <div>
      <Header />
      <Container>
        <Left>
          <UserLeftNav />
        </Left>
        <Right>
          <Outlet />
        </Right>
      </Container>
    </div>
  );
};

export default UserLayout;
const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Left = styled.div`
  flex: 2; /* Chiếm 2 phần */
`;

const Right = styled.div`
  flex: 7; /* Chiếm 7 phần */
  margin-top: 2rem;
`;
