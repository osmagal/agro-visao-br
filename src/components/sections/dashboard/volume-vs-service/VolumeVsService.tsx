import { Divider, Paper, Stack, Typography } from '@mui/material';
import { useMemo, useRef, useState } from 'react';
import EChartsReactCore from 'echarts-for-react/lib/core';
import { volumeVsService } from 'data/volume-vs-service';
import { getTotal, numberFormat } from 'helpers/utils';
import LegendToggleButton from 'components/common/LegendToggleButton';
import VolumeVsServiceChart from './VolumeVsServiceChart';

const VolumeVsService = () => {
  const chartRef = useRef<EChartsReactCore | null>(null);
  const [legend, setLegend] = useState({
    irrigated: false,
    rainfed: false,
  });

  const totalIrrigated = useMemo(() => getTotal(volumeVsService.irrigated), [volumeVsService.irrigated]);
  const totalRainfed = useMemo(
    () => getTotal(volumeVsService.rainfed),
    [volumeVsService.rainfed],
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
        name,
      });
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" color="primary.dark" mb={3}>
        Irrigated vs Rainfed
      </Typography>

      <VolumeVsServiceChart
        chartRef={chartRef}
        data={volumeVsService}
        style={{ height: 182 }}
        sx={{ pb: 1 }}
      />

      <Stack
        direction="row"
        justifyContent="center"
        divider={<Divider orientation="vertical" flexItem sx={{ height: 24 }} />}
        sx={{ borderTop: 1, borderColor: 'grey.A100', pt: 2 }}
        gap={2.5}
      >
        <LegendToggleButton
          name="irrigated"
          label="Irrigated"
          icon="codicon:circle-filled"
          value={`${numberFormat(totalIrrigated)} t`}
          color="info.main"
          legend={legend}
          onHandleLegendToggle={handleLegendToggle}
        />
        <LegendToggleButton
          name="rainfed"
          label="Rainfed"
          icon="codicon:circle-filled"
          value={`${numberFormat(totalRainfed)} t`}
          color="success.main"
          legend={legend}
          onHandleLegendToggle={handleLegendToggle}
        />
      </Stack>
    </Paper>
  );
};

export default VolumeVsService;
