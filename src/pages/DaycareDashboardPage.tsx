import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DaycareLayout from '../components/layouts/DaycareLayout';
import {
  DaycareOverview,
  DaycareMessagesPage,
  DaycareChildrenPage,
  DaycareStaffPage,
  DaycareSchedulePage,
  DaycareSettingsPage
} from './daycare';

const DaycareDashboardPage: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <DaycareLayout>
            <Routes>
              <Route index element={<DaycareOverview />} />
              <Route path="messages" element={<DaycareMessagesPage />} />
              <Route path="children" element={<DaycareChildrenPage />} />
              <Route path="staff" element={<DaycareStaffPage />} />
              <Route path="schedule" element={<DaycareSchedulePage />} />
              <Route path="settings" element={<DaycareSettingsPage />} />
            </Routes>
          </DaycareLayout>
        }
      />
    </Routes>
  );
};

export default DaycareDashboardPage;