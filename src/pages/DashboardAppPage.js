    import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Posts" total={100} icon={'fluent:news-20-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total User" total={1352831} color="info" icon={'mdi:account'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Donations" total={1723315} color="warning" icon={'mdi:hand-coin'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Issue Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid>


            <Grid item xs={12} md={6} lg={8}>
                <AppWebsiteVisits
                    title="Number of Posts"
                    // subheader="(+43%) than last year"
                    chartLabels={[
                        '01/01/2003',
                        '02/01/2003',
                        '03/01/2003',
                        '04/01/2003',
                        '05/01/2003',
                        '06/01/2003',
                        '07/01/2003',
                        '08/01/2003',
                        '09/01/2003',
                        '10/01/2003',
                        '11/01/2003',
                    ]}
                    chartData={[
                        {
                            name: 'Supporting Request',
                            type: 'column',
                            fill: 'solid',
                            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                        },
                        {
                            name: 'Sharing',
                            type: 'column',
                            fill: 'gradient',
                            data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                        },
                        {
                            name: 'Fundraising',
                            type: 'column',
                            fill: 'yellow',
                            data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                        }
                    ]}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <AppCurrentVisits
                    title="Post Categories"
                    chartData={[
                        {label: 'Sharing', value: 4344},
                        {label: 'Request Financial', value: 5435},
                        {label: 'Fundraising', value: 1443},
                    ]}
                    chartColors={[
                        theme.palette.primary.main,
                        theme.palette.info.main,
                        theme.palette.warning.main,
                    ]}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
                <AppConversionRates
                    title="User Groups"
                    // subheader="(+43%) than last year"
                    chartData={[
                        {label: 'Donors', value: 20},
                        {label: 'Beneficiaries', value: 10},
                        {label: 'Volunteers', value: 5},
                        {label: 'Charitable organizations', value: 2},
                        {label: 'Social enterprises', value: 2},
                        {label: 'Students', value: 36},
                        {label: 'Social Workers', value: 20},
                        {label: 'Other', value: 13},
                    ]}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <AppCurrentVisits
                    title="Donations by Payment Method"
                    chartData={[
                        {label: 'ZaloPay', value: 10},
                        {label: 'Paypal', value: 23},
                    ]}
                    chartColors={[
                        theme.palette.warning.main,
                        theme.palette.error.main,
                    ]}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
                <AppNewsUpdate
                    title="Most View Posts"
                    list={[...Array(5)].map((_, index) => ({
                        id: faker.datatype.uuid(),
                        title: faker.name.jobTitle(),
                        description: faker.name.jobTitle(),
                        image: `/assets/images/covers/cover_${index + 1}.jpg`,
                        postedAt: faker.date.recent(),
                    }))}
                />
            </Grid>

        <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
                title="Most Donation Posts"
                list={[...Array(5)].map((_, index) => ({
                    id: faker.datatype.uuid(),
                    title: faker.name.jobTitle(),
                    description: faker.name.jobTitle(),
                    image: `/assets/images/covers/cover_${index + 1}.jpg`,
                    postedAt: faker.date.recent(),
                }))}
            />
        </Grid>
        </Grid>
      </Container>
    </>
  );
}
