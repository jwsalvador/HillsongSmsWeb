import React from 'react';
import {List} from 'semantic-ui-react';

const HSList = ({data, state, itemHandler}) => {
  return (
    <List selection className="list__scroll">
      {data.map(d => {
        const isSelected = d._id === state.selected ? 'item__active' : '';
        return (
          <List.Item key={d._id} className={`padded ${isSelected}`} onClick={() => itemHandler(d)}>
            <List.Content>
              <List.Header>{d.key.toUpperCase()}</List.Header>
              <List.Description>{d.value.substring(0, 45).concat('...')}</List.Description>
            </List.Content>
          </List.Item>
        );
      })}
    </List>
  );
};

export default HSList;