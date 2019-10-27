import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Dashboard from './Dashboard';
import ImportPersons from './ImportPersons';

export default () => (
    <Tabs>
      <TabList>
        <Tab>Dashboard</Tab>
        <Tab>Import</Tab>
      </TabList>
      <TabPanel>
        <Dashboard />
      </TabPanel>
      <TabPanel>
        <ImportPersons />
      </TabPanel>
    </Tabs>
  );