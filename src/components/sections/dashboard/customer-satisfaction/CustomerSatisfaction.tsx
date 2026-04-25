import { Divider, Paper, Stack, Typography } from '@mui/material';
import { useMemo, useRef, useState } from 'react';
import EChartsReactCore from 'echarts-for-react/lib/core';
import { customerSatisfaction } from 'data/customer-satisfaction';
import { getTotal, numberFormat } from 'helpers/utils';
import Pin from 'components/icons/Pin';
import LegendToggleButton from 'components/common/LegendToggleButton';
import CustomerSatisfactionChart from './CustomerSatisfactionChart';

const CustomerSatisfaction = () => {
  const chartRef = useRef<EChartsReactCore | null>(null);
  const [legend, setLegend] = useState({
    'last harvest': false,
    'current harvest': false,
  });

  const totalLastMonthSatisfaction = useMemo(
    () => getTotal(customerSatisfaction['last harvest']),
    [customerSatisfaction['last harvest']],
  );
  const totalThisMonthSatisfaction = useMemo(
    () => getTotal(customerSatisfaction['current harvest']),
    [customerSatisfaction['current harvest']],
  );

  const handleLegendToggle = (name: string) => {
    const key = name as keyof typeof legend;

    setLegend((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));

    if (chartRef.current) {
      const instance = chartRef.current.getEchartsInstance();
      instance.dispatchAction({
        type: 'legendToggleSelect',
        name: name,
      });
    }
  };

  return (
    <Paper sx={{ py: 3, px: 1.5 }}>
      <Typography variant="h4" color="primary.dark" mb={3}>
        Harvest Comparison
      </Typography>

      <CustomerSatisfactionChart
        chartRef={chartRef}
        data={customerSatisfaction}
        style={{ height: 182 }}
      />

      <Stack
        direction="row"
        justifyContent="center"
        divider={<Divider orientation="vertical" flexItem sx={{ height: 24 }} />}
        sx={{ borderTop: 1, borderColor: 'grey.A100', pt: 2 }}
        gap={2}
      >
        <LegendToggleButton
          name="last harvest"
          label="Last Harvest"
          svgIcon={Pin}
          color="info.main"
          value={`${numberFormat(totalLastMonthSatisfaction)} t`}
          legend={legend}
          onHandleLegendToggle={handleLegendToggle}
        />
        <LegendToggleButton
          name="current harvest"
          label="Current Harvest"
          svgIcon={Pin}
          color="success.dark"
          value={`${numberFormat(totalThisMonthSatisfaction)} t`}
          legend={legend}
          onHandleLegendToggle={handleLegendToggle}
        />
      </Stack>
    </Paper>
  );
};

export default CustomerSatisfaction;
