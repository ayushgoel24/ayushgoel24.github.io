import React from 'react';
import PropTypes from 'prop-types';
import {
  IconAppStore,
  IconCodepen,
  IconDrive,
  IconExternal,
  IconFolder,
  IconFork,
  IconGitHub,
  IconInstagram,
  IconLeetCode,
  IconLinkedin,
  IconLoader,
  IconLocation,
  IconLogo,
  IconPlayStore,
  IconStar,
  IconTwitter,
  IconYoutube,
  IconZap,
} from '@components/icons';

const FormattedIcon = ({ name }) => {
  switch (name) {
    case 'AppStore':
      return <IconAppStore />;
    case 'Codepen':
      return <IconCodepen />;
    case 'Drive':
      return <IconDrive />;
    case 'External':
      return <IconExternal />;
    case 'Folder':
      return <IconFolder />;
    case 'Fork':
      return <IconFork />;
    case 'GitHub':
      return <IconGitHub />;
    case 'Instagram':
      return <IconInstagram />;
    case 'LeetCode':
      return <IconLeetCode />;
    case 'Linkedin':
      return <IconLinkedin />;
    case 'Loader':
      return <IconLoader />;
    case 'Location':
      return <IconLocation />;
    case 'Logo':
      return <IconLogo />;
    case 'PlayStore':
      return <IconPlayStore />;
    case 'Star':
      return <IconStar />;
    case 'Twitter':
      return <IconTwitter />;
    case 'Youtube':
      return <IconYoutube />;
    case 'Zap':
      return <IconZap />;
    default:
      return <IconExternal />;
  }
};

FormattedIcon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FormattedIcon;
