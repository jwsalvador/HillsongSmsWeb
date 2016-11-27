import React from 'react';
import {Link} from 'react-router';
import {Icon, Header} from 'semantic-ui-react';

const LinkIcon = ({route, name, header, children}) => {
  return (
    
    <Link to={route} className="link">
      <Header as='h2' icon>
        <Icon name={name} color="blue" className="link-icon"/>
        {header}
        <Header.Subheader>
          {children}
        </Header.Subheader>
      </Header>
    </Link>
  );
};

export default LinkIcon;