import React from 'react';
import {Link} from 'react-router';
import {Icon, Header} from 'semantic-ui-react';

const LinkIcon = ({route, name, header}) => {
  return (
    <Link to={route} className="link">
      <Icon name={name} size="massive" color="blue" className="link-icon"/>
      <Header as="h3">{header}</Header>
    </Link>
  );
};

export default LinkIcon;