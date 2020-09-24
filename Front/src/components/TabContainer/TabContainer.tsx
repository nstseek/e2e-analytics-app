import React from 'react';
import './TabContainer.scss';
import { TabState } from '../Tabs';

interface Props {
  tabValue: TabState;
  actualValue: TabState;
}

const TabContainer: React.FC<Props> = (props) => {
  return (
    <div
      className='tab-container'
      hidden={props.tabValue !== props.actualValue}>
      {props.children}
    </div>
  );
};

export default TabContainer;
