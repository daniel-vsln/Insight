import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Dashboard from './Dashboard';
import AddPerson from './AddPerson';
import Import from './Import';

export default () => (
    <Tabs>
      <TabList>
        <Tab>Dashboard</Tab>
        <Tab>Add Person</Tab>
        <Tab>Import</Tab>
      </TabList>
      <TabPanel>
        <Dashboard />
      </TabPanel>
      <TabPanel>
        <AddPerson />
      </TabPanel>
      <TabPanel>
        <Import />
      </TabPanel>
    </Tabs>
  );