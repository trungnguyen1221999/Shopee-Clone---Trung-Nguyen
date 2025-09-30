import styled from "styled-components";
import Container from "../Container";
import { IoEarthOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { useFloating } from "@floating-ui/react";
import { useState } from "react";
import { motion } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles } = useFloating({
    placement: "bottom-end", // dropdown xuất hiện bên dưới
  });

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <Wrap>
      <StyledContainer>
        {/* Header Top */}
        <HeaderTop>
          <HeaderTopList
            ref={refs.setReference}
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            isOpen={isOpen}
          >
            <IoEarthOutline />
            <p>English</p>
            <MdKeyboardArrowDown />

            {/* Dropdown */}
            {isOpen && (
              <Floating
                ref={refs.setFloating}
                style={floatingStyles}
                as={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p>English</p>
                <p>Tiếng Việt</p>
              </Floating>
            )}
          </HeaderTopList>

          <HeaderTopList>
            <img
              src="https://png.pngtree.com/png-clipart/20190516/original/pngtree-funny-cat-taking-selfie-couple-of-kitty-with-a-smile-stick-png-image_3776833.jpg"
              alt="avatar"
            />
            <p>Kai-Nguyen</p>
          </HeaderTopList>
        </HeaderTop>

        {/* Header Bottom */}
        <HeaderBottom>
          {/* Logo */}
          <svg className="logo" viewBox="0 0 192 65" fill="white">
            {/* SVG path ở đây */}
          </svg>

          {/* Search */}
          <div>
            <input type="text" placeholder="Free Delivery ..." />
            <div className="search">
              <CiSearch />
            </div>
          </div>

          {/* Cart */}
          <IoCartOutline className="cart" />
        </HeaderBottom>
      </StyledContainer>
    </Wrap>
  );
};

export default Header;

// Styled Components

const Wrap = styled.header`
  color: white;
  width: 100vw;
  background: linear-gradient(-180deg, #f53d2d, #f63) !important;
  padding: 1rem 0;
`;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

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

  // Mũi tên luôn nằm giữa chữ "English"
  &::after {
    content: "";
    position: absolute;
    bottom: 0; // ngay dưới chữ
    left: 50%; // căn giữa chữ
    z-index: 10;
    transform: translateX(-50%);
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
    border-bottom: 0.5rem solid white; // <--- đổi từ border-top sang border-bottom
    display: ${(props) => (props.isOpen ? "block" : "none")};
  }
`;

const HeaderBottom = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 12fr 1fr;
  align-items: center;
  gap: 2rem;
  margin-top: 1rem;

  .logo {
    width: 14rem;
    cursor: pointer;
    transition: transform 0.2s ease;
    &:hover {
      transform: scale(1.05);
    }
  }

  > div {
    display: flex;
    align-items: center;
    border: 3px solid white;
    border-radius: 0.5rem;
    overflow: hidden;
    background: white;

    input {
      flex: 1;
      border: none;
      outline: none;
      padding: 0.8rem 1.2rem;
      font-size: 1.4rem;
      color: #333;
      background: transparent;
    }

    .search {
      background: #ee4d2d;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.8rem 1.2rem;
      cursor: pointer;
      transition: opacity 0.2s ease;

      svg {
        color: white;
        font-size: 2rem;
      }

      &:hover {
        opacity: 0.9;
      }
    }
  }

  .cart {
    font-size: 3.2rem;
    cursor: pointer;
    transition: transform 0.2s ease, color 0.2s ease;
  }
`;

const Floating = styled.div`
  position: absolute;
  transform-origin: top center; // ← scale từ vị trí mũi tên

  top: 100%;
  min-width: 20rem;
  background-color: white;
  padding: 1rem 1.5rem;
  color: black;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  text-align: left;
  border-radius: 0.4rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  z-index: 10;

  p:hover {
    color: #ee4d2d;
  }
`;
