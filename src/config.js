module.exports = {
  siteTitle: 'Ayush Goel - My Home Page',
  siteDescription:
    'Ayush Goel:Robotics student at the University of Pennsylvania with extensive software engineering experience across global roles. Passionate about Robotics, Perception, Deep Learning, and fostering meaningful collaborations in tech.',
  siteKeywords:
    'Ayush Goel, Ayush, Goel, ayushgoel24, software engineer, robots, opencv, computer vision, unicommerce, robomuse, perception, sensors, university of pennsylvania, upenn, masters, grasp',
  siteUrl: 'https://ayushgoel24.github.io/',
  siteLanguage: 'en_US',
  googleAnalyticsID: 'G-DF08LZ480D',
  // googleVerification: 'DCl7VAf9tcz6eD9gb67NfkNnJ1PKRNcg8qQiwpbx9Lk',
  name: 'Ayush Goel',
  location: 'Philadelphia, Pennsylvania',
  email: 'ayush.goel2427@gmail.com',
  github: 'https://github.com/ayushgoel24',
  linkedin: 'https://www.linkedin.com/in/ayushsgoel/',
  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/ayushgoel24',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/ayushsgoel/',
    },
    {
      name: 'LeetCode',
      url: 'https://leetcode.com/AyushGoel24/',
    },
  ],

  profileToNavLinks: {
    '': [
      {
        name: 'About',
        url: '/#about',
      },
      {
        name: 'Experience',
        url: '/#jobs',
      },
      {
        name: 'Education',
        url: '/#education',
      },
      {
        name: 'Projects',
        url: '/#projects',
      },
      {
        name: 'Skills',
        url: '/#skills',
      },
      {
        name: 'Certifications',
        url: '/#certifications',
      },
      {
        name: 'Contact',
        url: '/#contact',
      },
    ],
    sde: [
      {
        name: 'About',
        url: '/sde/#about',
      },
      {
        name: 'Experience',
        url: '/sde/#jobs',
      },
      {
        name: 'Education',
        url: '/sde/#education',
      },
      {
        name: 'Projects',
        url: '/sde/#projects',
      },
      {
        name: 'Skills',
        url: '/sde/#skills',
      },
      {
        name: 'Certifications',
        url: '/sde/#certifications',
      },
      {
        name: 'Contact',
        url: '/sde/#contact',
      },
    ],
  },

  profileToResumeLink: {
    '': '/AyushGoel.pdf',
    sde: '/AyushGoel_SE.pdf',
  },

  profileToOtherProfileLinks: {
    '': {
      message: 'See my Perception profile',
      link: '/',
    },
    sde: {
      message: 'See my Software profile',
      link: '/sde',
    },
  },

  navHeight: 100,

  colors: {
    green: '#64ffda',
    navy: '#0a192f',
    darkNavy: '#020c1b',
  },

  // srConfig: (delay = 200) => ({
  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    // viewFactor: 0.25,
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
