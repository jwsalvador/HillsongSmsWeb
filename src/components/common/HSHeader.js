import React from 'react';
import {Header, Icon} from 'semantic-ui-react';
import {Link} from 'react-router';

const PageHeader = ({text}) => {
  return (
    <Header as="h1" className="header__margin-bottom">
      <Link to="/"><Icon name="arrow left"/></Link>
      {text}
    </Header>
  );
};

export {PageHeader};