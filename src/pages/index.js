import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Layout, Hero, About, Jobs, Education, Skills, Featured, Projects, Certifications, Contact } from '@components';
import styled from 'styled-components';
import { Main } from '@styles';

const StyledMainContainer = styled(Main)`
  counter-reset: section;
`;

const IndexPage = ({ location, data }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <Hero data={data.hero.edges} />
      <About data={data.about.edges} />
      <Jobs data={data.jobs.edges} />
      <Education data={data.education.edges} />
      <Featured data={data.featured.edges} />
      <Projects data={data.projects.edges} />
      <Skills data={data.skills.edges} />
      <Certifications data={data.certifications.edges} />
      <Contact data={data.contact.edges} />
    </StyledMainContainer>
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default IndexPage;

export const pageQuery = graphql`
  {
    hero: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/hero/default/" } }) {
      edges {
        node {
          frontmatter {
            title
            name
            subtitle
            buttonText
          }
          html
        }
      }
    }

    about: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/about/default/" } }) {
      edges {
        node {
          frontmatter {
            title
            avatar {
              childImageSharp {
                fluid(maxWidth: 700, quality: 90, traceSVG: { color: "#64ffda" }) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            skills
          }
          html
        }
      }
    }

    jobs: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/jobs/" }
        frontmatter: { showInExperience: { eq: true } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            company
            shortname
            location
            range
            url
            tech
            logo {
              childImageSharp {
                fluid(maxWidth: 700, quality: 90) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
          html
        }
      }
    }

    education: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/education/" }
        frontmatter: { showInEducation: { eq: true } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            school
            shortname
            programme
            score
            location
            range
            url
            logo{
              childImageSharp {
                fluid(maxWidth: 700, quality: 90) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
          html
        }
      }
    }

    featured: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/featured/default/" }
        frontmatter: { showInFeatured: { eq: true } }
      }
      sort: { fields: [frontmatter___position], order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            title
            cover {
              childImageSharp {
                fluid(maxWidth: 700, quality: 90, traceSVG: { color: "#64ffda" }) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            covergif
            tech
            github
            drive
            external
            youtube
            tags
          }
          html
        }
      }
    }

    projects: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/featured/default/" }
        frontmatter: { showInProjects: { eq: true }, showInFeatured: { eq: false } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            tech
            github
            external
          }
          html
        }
      }
    }

    certifications: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/certifications/default/" }
        frontmatter: { showInCertifications: { eq: true } }
      }
      sort: { fields: [frontmatter___priority], order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            course
            institute
            company
            github
            external
            tech
          }
          html
        }
      }
    }

    skills: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/skills/" }
        frontmatter: { showInSkills: { eq: true } }
      }
      sort: { fields: [frontmatter___priority], order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            name
            logo {
              childImageSharp {
                fluid(maxWidth: 700, quality: 90) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            container
          }
          html
        }
      }
    }

    contact: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/contact/" } }) {
      edges {
        node {
          frontmatter {
            title
            buttonText
          }
          html
        }
      }
    }
  }
`;
