import React from 'react';
import CardContainer from './CardContainer';
import CardContent from './CardContent';
import { DashboardData } from '../../../../models/dashboardsData';

const DataSourceCard: React.FC<DashboardData> = ({ ...props }) => {
  return (
    <CardContainer>
      <CardContent {...props} />
    </CardContainer>
  );
};

export default DataSourceCard;
