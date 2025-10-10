import { useContext } from "react";
import styled from "styled-components";
import NavHoverFunction from "../function/NavHoverFunction";
import { IoEarthOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AppContext } from "../context/AppContext";
import { useMutation } from "@tanstack/react-query";
import { LogoutApi } from "../apis/logout.api";

const HeaderTopComponent = () => {
  const { setIsLogin, profile } = useContext(AppContext);
  const LogoutMutation = useMutation({
    mutationFn: LogoutApi,
    onSuccess: () => {
      setIsLogin(false);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleLogout = () => {
    LogoutMutation.mutate();
  };
  return (
    <HeaderTop>
      <NavHoverFunction
        reference={
          <HeaderTopList>
            <IoEarthOutline />
            <p>English</p>
            <MdKeyboardArrowDown />
          </HeaderTopList>
        }
        children={
          <>
            <StyledNavInfo>English</StyledNavInfo>
            <StyledNavInfo>Tiếng Việt</StyledNavInfo>
          </>
        }
      />
      <NavHoverFunction
        reference={
          <HeaderTopList>
            <img
              src="https://png.pngtree.com/png-clipart/20190516/original/pngtree-funny-cat-taking-selfie-couple-of-kitty-with-a-smile-stick-png-image_3776833.jpg"
              alt="avatar"
            />
            <p>{profile?.email}</p>
          </HeaderTopList>
        }
        children={
          <>
            <StyledNavInfo>My Account</StyledNavInfo>
            <StyledNavInfo>My Purchase</StyledNavInfo>
            <StyledNavInfo onClick={handleLogout}>Logout</StyledNavInfo>
          </>
        }
      />
    </HeaderTop>
  );
};

export default HeaderTopComponent;
const HeaderTop = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
`;

const HeaderTopList = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  p {
    font-size: 1.5rem;
  }

  svg {
    font-size: 2rem;
  }

  img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const StyledNavInfo = styled.p`
  font-size: 1.4rem;
  padding: 0.5rem 0;
  cursor: pointer;

  &:hover {
    color: #ee4d2d;
  }
`;
