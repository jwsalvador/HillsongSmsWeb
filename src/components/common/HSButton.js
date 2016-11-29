import React from 'react';
import cx from 'classnames';
import {Button} from 'semantic-ui-react';

const HSButton = ({handler, label, type, warning, basic }) => {
  return (
    <Button type={type} basic color={cx({red: warning}, {blue: basic})} className="right" onClick={handler}>{label}</Button>                
  );
};

export default HSButton;