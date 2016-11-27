import React from 'react';
import {Divider, Header} from 'semantic-ui-react';

const Section = ({header, text, children, divider}) => {
  
  return (
    <div>
      { divider && <Divider section /> }
      <Header as="h4">{header}</Header>
      <p className="linebreak">{ text }</p>
      {children}
    </div>
  );
};

export default Section;