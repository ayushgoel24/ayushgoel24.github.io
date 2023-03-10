import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { FormattedIcon } from '@components/icons';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useLocation } from '@reach/router';
const { colors, fontSizes, fonts } = theme;


const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
`;
const StyledContent = styled.div`
  position: relative;
  grid-column: 1 / 7;
  grid-row: 1 / -1;
  ${media.thone`
    grid-column: 1 / -1;
    padding: 40px 40px 30px;
    z-index: 5;
  `};
  ${media.phablet`padding: 30px 25px 20px;`};
`;
const StyledLabel = styled.h4`
  font-size: ${fontSizes.smish};
  font-weight: normal;
  color: ${colors.green};
  font-family: ${fonts.SFMono};
  margin-top: 10px;
  padding-top: 0;
`;
const StyledProjectName = styled.h5`
  font-size: 28px;
  position: relative;
  z-index: 2;
  margin: 0 0 20px;
  color: ${colors.lightestSlate};
  ${media.tablet`font-size: 24px;`};
  ${media.thone`color: ${colors.white};`};
  a {
    ${media.tablet`display: block;`};
  }
`;
const StyledDescription = styled.div`
  ${mixins.boxShadow};
  position: relative;
  z-index: 2;
  padding: 25px;
  background-color: ${colors.lightNavy};
  color: ${colors.lightSlate};
  font-size: ${fontSizes.lg};
  border-radius: ${theme.borderRadius};
  ${media.thone`
    background-color: transparent;
    padding: 20px 0;
    box-shadow: none;
    &:hover {
      box-shadow: none;
    }
  `};
  p {
    margin: 0;
  }
  a {
    ${mixins.inlineLink};
  }
`;
const StyledTechList = styled.ul`
  position: relative;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 25px 0 10px;
  list-style: none;

  li {
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.smish};
    color: ${colors.green};
    margin-right: ${theme.margin};
    margin-bottom: 7px;
    white-space: nowrap;
    &:last-of-type {
      margin-right: 0;
    }
    ${media.thone`
      color: ${colors.green};
      margin-right: 10px;
    `};
  }
`;
const StyledLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 10px;
  margin-left: -10px;
  color: ${colors.lightestSlate};
  a {
    padding: 10px;
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;
const StyledFeaturedImg = styled(Img)`
  width: 100%;
  max-width: 100%;
  vertical-align: middle;
  border-radius: ${theme.borderRadius};
  position: relative;
  
  
  ${media.tablet`
    object-fit: cover;
    width: auto;
    height: 100%;
  `};
`;
const StyledImgContainer = styled.a`
  ${mixins.boxShadow};
  grid-column: 6 / -1;
  grid-row: 1 / -1;
  position: relative;
  z-index: 1;
  background-color: ${colors.green};
  border-radius: ${theme.radius + 1}px;
  transition: ${theme.transition};
  ${media.tablet`height: 100%;`};
  ${media.thone`
    grid-column: 1 / -1;
  `};
  &:hover,
  &:focus {
    
    &:before,
    ${StyledFeaturedImg} {
      
      filter: none;
    }
    img {
      
      filter: none;
    }
  }
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    transition: ${theme.transition};
    
  }
`;
const StyledProject = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  margin-bottom: 100px;
  ${media.thone`
    margin-bottom: 70px;
  `};
  &:last-of-type {
    margin-bottom: 0;
  }
  &:nth-of-type(odd) {
    ${StyledContent} {
      grid-column: 7 / -1;
      text-align: right;
      ${media.thone`
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
      `};
      ${media.phablet`padding: 30px 25px 20px;`};
    }
    ${StyledTechList} {
      justify-content: flex-end;
      li {
        margin-left: ${theme.margin};
        margin-right: 0;
      }
    }
    ${StyledLinkWrapper} {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;
    }
    ${StyledImgContainer} {
      grid-column: 1 / 8;
      ${media.tablet`height: 100%;`};
      ${media.thone`
        grid-column: 1 / -1;
        
      `};
    }
  }
`;

const StyledList = styled.ol`
  ${mixins.flexBetween};
  padding: 0;
  margin: 0;
  list-style: none;
`;
const StyledListItem = styled.li`
  margin: 0 10px;
  position: relative;
  font-size: ${fontSizes.smish};
  counter-increment: item 1;
  &:before {
    content: '0' counter(item) '.';
    text-align: right;
    color: ${colors.green};
    font-size: ${fontSizes.xs};
  }
`;
const StyledListLink = styled(Link)`
  padding: 12px 10px;
`;

const Featured = ({ data }) => {
    const featuredProjects = data.filter(({ node }) => node);
  
    // For each of the node from the GRAPHQL query, we are extracting each of the featured project details
    // for every project we are adding each of them into `projectCategoryToProjectDetails` based on their tags
    const projectCategoryToProjectDetails = {};
    let allTags;
    allTags = new Set();
    allTags.add( "All" );

    projectCategoryToProjectDetails["All"] = [];
    featuredProjects.map(({ node }, i) => {
        const { frontmatter, html } = node;
        const { external, title, tech, github, cover, covergif, covers, covergifs, drive, youtube, tags } = frontmatter;
        projectCategoryToProjectDetails["All"].push({ node });
        tags && tags.map((tag, i) => {
            allTags.add( tag );
            if (!projectCategoryToProjectDetails[tag]) projectCategoryToProjectDetails[tag] = [];
            projectCategoryToProjectDetails[tag].push({ node });
        });
    });

    allTags = Array.from(allTags);

    const location = useLocation();
    let currentTag;

    if ( location.hash.includes( "?") ) {
        const queryParams = new URLSearchParams( "?" + location.hash.split('?')[1] );
        currentTag = queryParams.get( "tag" );
        if ( !currentTag ) {
            currentTag = "All";
        } 
    } else {
        currentTag = "All";
    }

    const selectedProjects = projectCategoryToProjectDetails[ currentTag ];

    const revealTitle = useRef(null);
    const revealProjects = useRef([]);
    useEffect(() => {
        sr.reveal(revealTitle.current, srConfig());
        revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
    }, []);

  return (
    <StyledContainer id="projects">
        <Heading ref={revealTitle}>Some Things I&apos;ve Built</Heading>

        {allTags && (
            <StyledList>
                { allTags.map( (tag, index) => (
                    // <StyledListLink to={ tag === "All" ? "/#projects" : "/#projects?tag=" + tag }>
                    //     { tag }
                    // </StyledListLink>
                    <StyledListLink to={ "/#projects?tag=" + tag }>
                        { tag }
                    </StyledListLink>
                ))}
            </StyledList>
        )}
    
      <div>
        {selectedProjects &&
          selectedProjects.map(({ node }, i) => {
            
            const { frontmatter, html } = node;
            const { external, title, tech, github, cover, covergif, covers, covergifs, drive, youtube, tags } = frontmatter;
            
            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
                <StyledContent>
                  <StyledLabel>Featured Project</StyledLabel>
                  <StyledProjectName>
                    {external ? (
                      <a
                        href={external}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        aria-label="External Link">
                        {title}
                      </a>
                    ) : (
                      title
                    )}
                  </StyledProjectName>
                  <StyledDescription dangerouslySetInnerHTML={{ __html: html }} />
                  {tech && (
                    <StyledTechList>
                      {tech.map((tech, i) => (
                        <li key={i}>{tech}</li>
                      ))}
                    </StyledTechList>
                  )}
                  <StyledLinkWrapper>
                    {github && (
                      <a
                        href={github}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        aria-label="GitHub Link">
                        <FormattedIcon name="GitHub" />
                      </a>
                    )}
                    {drive && (
                      <a
                        href={drive}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        aria-label="Google Drive Link">
                        <FormattedIcon name="Drive" />
                      </a>
                    )}
                    {external && (
                      <a
                        href={external}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        aria-label="External Link">
                        <FormattedIcon name="External" />
                      </a>
                    )}
                    {youtube && (
                      <a
                        href={youtube}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        aria-label="Youtube Link">
                        <FormattedIcon name="Youtube" />
                      </a>
                    )}
                  </StyledLinkWrapper>
                </StyledContent>

                <StyledImgContainer
                  href={external ? external : github ? github : '#'}
                  target="_blank"
                  rel="nofollow noopener noreferrer">
                    <StyledFeaturedImg fluid={cover && cover.childImageSharp.fluid} alt={title} />
                    {covergif && <img src={covergif ? covergif : null} alt="img" />}
                </StyledImgContainer>

                {/* <Carousel>

                  {covers && (
                    {covers.map((lnk, i) => (
                      <StyledFeaturedImg fluid={cover && cover.childImageSharp.fluid} alt={title} />
                    ))}
                    )}

                </Carousel> */}
                
              </StyledProject>
            );
          })}
      </div>
    </StyledContainer>
  );
};

Featured.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Featured;
