import { FaRegUser } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import PATH_CONST from "../../Constant/Path.Const";
import { FaBox } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import styled from "styled-components";

const UserLeftNav = () => {
  return (
    <NavContainer>
      <ProfileSection>
        <SVG to={PATH_CONST.PROFILE}>
          <FaRegUser />
        </SVG>
        <ProfileInfo>
          <UserName>7b63tl7vm2</UserName>
          <EditProfile to={PATH_CONST.PROFILE}>
            <span>
              <MdEdit />
            </span>
            <p>Edit Profile</p>
          </EditProfile>
        </ProfileInfo>
      </ProfileSection>

      <NavMenu>
        <NavItem>
          <Link to={PATH_CONST.PROFILE}>
            <FaRegUser />
            <p>My Account</p>
          </Link>
        </NavItem>
        <NavItem>
          <Link to={PATH_CONST.CHANGE_PASSWORD}>
            <TbLockPassword />
            <p>Change Password</p>
          </Link>
        </NavItem>
        <NavItem>
          <Link to={PATH_CONST.PURCHASE}>
            <FaBox />
            <p>My Purchases</p>
          </Link>
        </NavItem>
      </NavMenu>
    </NavContainer>
  );
};

export default UserLeftNav;
const NavContainer = styled.div`
  margin-top: 3rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 16px;

  svg {
    font-size: 2rem;
    color: #666;
  }
`;
const SVG = styled(Link)`
  border: 1px solid #666;
  border-radius: 50%;
  padding: 0.5rem;
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`;

const EditProfile = styled(Link)`
  display: flex;
  align-items: center;
  gap: 3px;
  cursor: pointer;
  font-size: 1.3rem;
  color: #777777;

  span {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 1.5rem;
  }
`;

const NavMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const NavItem = styled.li`
  a {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    color: #333;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s ease;

    svg {
      font-size: 18px;
      color: #0077cc;
    }

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  p {
    font-size: 1.3rem;
  }
`;
