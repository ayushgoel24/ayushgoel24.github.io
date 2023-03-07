import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { profileToOtherProfileLinks } from '@config';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { email } from '@config';
import styled from 'styled-components';
import { theme, mixins, media, Section } from '@styles';
import { useLocation } from '@reach/router';
const { colors, fontSizes, fonts, navDelay, loaderDelay } = theme;

const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  ${media.tablet`padding-top: 150px;`};
  div {
    width: 100%;
  }
`;
const StyledOverline = styled.h1`
  color: ${colors.green};
  margin: 0 0 20px 3px;
  font-size: ${fontSizes.md};
  font-family: ${fonts.SFMono};
  font-weight: normal;
  ${media.desktop`font-size: ${fontSizes.sm};`};
  ${media.tablet`font-size: ${fontSizes.smish};`};
`;
const StyledTitle = styled.h2`
  font-size: 80px;
  line-height: 1.1;
  margin: 0;
  ${media.desktop`font-size: 70px;`};
  ${media.tablet`font-size: 60px;`};
  ${media.phablet`font-size: 50px;`};
  ${media.phone`font-size: 40px;`};
`;
const StyledSubtitle = styled.h3`
  font-size: 44px;
  line-height: 1.1;
  color: ${colors.slate};
  ${media.desktop`font-size: 70px;`};
  ${media.tablet`font-size: 60px;`};
  ${media.phablet`font-size: 50px;`};
  ${media.phone`font-size: 40px;`};
`;
const StyledDescription = styled.div`
  margin-top: 25px;
  width: 50%;
  max-width: 500px;
  a {
    ${mixins.inlineLink};
  }
`;
const StyledEmailLink = styled.a`
  ${mixins.bigButton};
  margin-top: 50px;
`;
const StyledProfileLinks = styled.a`
  ${mixins.bigButton};
  margin-top: 50px;
  margin-right: 10px;
  float: right;
`;

const Hero = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);

  const location = useLocation();
  const currentProfile = location.pathname.replaceAll('/', '');

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const { frontmatter, html } = data[0].node;

  const one = () => (
    <StyledOverline style={{ transitionDelay: '100ms' }}>{frontmatter.title}</StyledOverline>
  );
  const two = () => (
    <StyledTitle style={{ transitionDelay: '200ms' }}>{frontmatter.name}.</StyledTitle>
  );
  const three = () => (
    <StyledSubtitle style={{ transitionDelay: '300ms' }}>{frontmatter.subtitle}</StyledSubtitle>
  );
  const four = () => (
    <StyledDescription
      style={{ transitionDelay: '400ms' }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
  const five = () => (
    <div style={{ transitionDelay: '500ms' }}>
      <StyledEmailLink href={`mailto:${email}`}>{frontmatter.buttonText}</StyledEmailLink>
    </div>
  );

  const otherProfiles = []
  for (const [key, value] of Object.entries(profileToOtherProfileLinks)) {
    if (key !== currentProfile) {
      otherProfiles.push(<StyledProfileLinks href={`${value['link']}`}>{value['message']}</StyledProfileLinks>);
    }
  }
  
  // const six = () => (
  //   otherProfiles.map((profile, i) => (
  //     <div style={{ transitionDelay: '500ms' }}>
  //       <StyledEmailLink2 href={`${profile['link']}`}>{profile['message']}</StyledEmailLink2>
  //     </div>
  //   ))
  // );

  const six2 = () => (
    <div style={{ transitionDelay: '500ms' }}>
      {otherProfiles}
    </div>
  );

  const items = [one, two, three, four, five, six2];
  
  return (
    <StyledContainer>
      <TransitionGroup component={null}>
        
        {isMounted &&
          items.map((item, i) => (
            
            <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
              {item}
            </CSSTransition>
          ))}
      </TransitionGroup>
    </StyledContainer>
  );
};

Hero.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Hero;
