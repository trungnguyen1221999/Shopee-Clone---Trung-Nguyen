import { useFloating, offset } from "@floating-ui/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  reference: React.ReactNode; // phần tử hiển thị (ví dụ chữ "English")
};

const NavHoverFunction = ({ children, reference }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles } = useFloating({
    placement: "bottom-end", // dropdown xuất hiện bên dưới
    middleware: [
      offset({ mainAxis: 5, crossAxis: 0 }), // khoảng cách giữa reference và floating
    ],
  });

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <Wrapper
      ref={refs.setReference}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
    >
      {reference}

      <AnimatePresence>
        {isOpen && (
          <Floating
            ref={refs.setFloating}
            style={floatingStyles}
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {children}
          </Floating>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default NavHoverFunction;

// Styled Components
const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Floating = styled.div`
  position: absolute;
  top: 100%;
  left: 50%; /* mũi tên sẽ nằm giữa */
  transform: translateX(-50%);
  transform-origin: top center; /* scale từ vị trí mũi tên */
  min-width: 20rem;
  background-color: white;
  padding: 1rem 1.5rem;
  color: black;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  border-radius: 0.4rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  z-index: 10;

  p:hover {
    color: #ee4d2d;
  }
`;
