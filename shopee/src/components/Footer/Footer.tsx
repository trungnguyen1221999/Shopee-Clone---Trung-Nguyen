import styled from "styled-components";
import FooterData from "./FooterData";
import Container from "../Container";

const Footer = () => {
  return (
    <Wrap>
      <StyledContainer>
        <FooterTop>
          <p>{FooterData.copyright}</p>
          <CountryList>
            <p>Country & Region:</p>
            {FooterData.countries.map((country) => (
              <li key={country}>{country}</li>
            ))}
          </CountryList>
        </FooterTop>

        <FooterLinks>
          {FooterData.links.map((link) => (
            <a key={link.label} href={link.url}>
              {link.label}
            </a>
          ))}
        </FooterLinks>

        <CompanyInfo>
          <p className="company-name">{FooterData.company.name}</p>
          <p>{FooterData.company.address}</p>
          <p>{FooterData.company.customerCare}</p>
          <p>
            Responsible for Content Management:{" "}
            {FooterData.company.responsiblePerson}
          </p>
          <p>
            Business registration number: {FooterData.company.businessNumber}
          </p>
        </CompanyInfo>

        <Legacy>{FooterData.legacyCopyright}</Legacy>
      </StyledContainer>
    </Wrap>
  );
};

export default Footer;

// ---------------- Styled Components ----------------

const Wrap = styled.footer`
  background-color: ${({ theme }) => theme.colors.footer};
  p,
  a,
  li {
    color: #767676;
  }
`;
const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  p {
    font-size: ${({ theme }) => theme.fontSizes.medium};
  }
`;

const CountryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;

  p {
    font-size: ${({ theme }) => theme.fontSizes.medium};
    margin-right: 1rem;
  }
  li {
    position: relative;
    padding-right: 0.5rem;
    margin-right: 0.5rem; // khoảng cách giữa các country
    font-size: ${({ theme }) => theme.fontSizes.medium};
    display: flex;
    align-items: center;
    cursor: pointer;

    &::after {
      content: "";
      display: block;
      width: 0.5px; // độ dày gạch
      height: 2rem; // chiều cao cố định
      background-color: #767676;
      margin-left: 0.5rem; // khoảng cách chữ và gạch
    }

    &:last-child::after {
      display: none;
    }
  }
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 1.5rem;
  margin-top: 8rem;

  a {
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.fontSizes.base};
    cursor: pointer;
  }
`;

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  margin-top: 3rem;
  margin-bottom: 0.8rem;

  .company-name {
    margin-bottom: 2rem;
  }

  p {
    margin: 0;
    line-height: 1.2;
  }
`;

const Legacy = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: #767676;
  text-align: center;
  line-height: 1.2;
`;

const StyledContainer = styled(Container)`
  background-color: #f5f5f5;
`;
