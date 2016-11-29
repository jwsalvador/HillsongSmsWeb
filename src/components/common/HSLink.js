import React from 'react';
import {Link} from 'react-router';
import {Icon} from 'semantic-ui-react';

const HSLink = ({route, icon, label}) => {
  return (
    <Link style={{display: 'inline-block'}} className="left small" to={route}>
      {icon && <Icon color="grey" name={icon}/>}
      {label}
    </Link>
  );
};

export {HSLink};