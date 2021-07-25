/* eslint-disable radix */
/* eslint-disable no-param-reassign */
/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import ChartistGraph from 'react-chartist';
import {
  Card,
  Container,
  Row,
  Col
} from 'react-bootstrap';
import { callAPI } from 'API/callAPI';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [listOverview, setList] = useState();
  // eslint-disable-next-line no-unused-vars
  const [listDonor, setListDonor] = useState();
  const [topDonor, settopDonor] = useState();

  function Sort(arr) {
    const len = arr.length;
    for (let i = len - 1; i >= 0; i--) {
      for (let j = 1; j <= i; j++) {
        const a = parseInt(arr[j - 1].total);
        const b = parseInt(arr[j].total);
        if (a < b) {
          const temp = arr[j - 1];
          arr[j - 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
    return arr;
  }
  useEffect(() => {
    callAPI('number_overviews').then((data) => {
      setList(data);
    });
    callAPI('donors').then((data) => {
      if (data != null) {
        let sort = data;
        if (data.length > 0) {
          sort = Sort(sort);
          settopDonor(sort);
        }
        setListDonor(data);
      }
    });
  }, []);
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-badge text-warning" />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Number Of Current Student</p>
                      <Card.Title as="h4">
                        {listOverview && listOverview.current_students}
                        {' '}
                        students
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="fas fa-redo mr-1" />
                  <Link to="table/number_overwiew">Update Now</Link>
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-badge text-success" />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Number Of Current Alumni</p>
                      <Card.Title as="h4">{listOverview && listOverview.alumni}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="fas fa-redo mr-1" />
                  <Link to="table/number_overwiew">Update Now</Link>
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart-pie-35 text-danger" />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Rate of getting a job</p>
                      <Card.Title as="h4">
                        {listOverview && listOverview.percent_get_job}
                        %
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="fas fa-redo mr-1" />
                  <Link to="table/number_overwiew">Update Now</Link>
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-primary" />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total of student</p>
                      <Card.Title as="h4">
                        {listOverview && listOverview.total_students}
                        {' '}
                        students
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="fas fa-redo mr-1" />
                  <Link to="table/number_overwiew">Update Now</Link>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="9">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Donation</Card.Title>
                <p className="card-category">12 months performance</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={{
                      labels: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'June',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec',
                      ],
                      series: [
                        [100, 385, 490, 492, 554, 586, 698, 695, 700, 800, 815, 890],
                        [200, 152, 143, 240, 287, 335, 435, 437, 600, 570, 712, 850],
                        [130, 113, 67, 108, 190, 239, 307, 308, 400, 470, 500, 700],
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 900,
                      showArea: false,
                      height: '245px',
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        'screen and (max-width: 640px)',
                        {
                          axisX: {
                            labelInterpolationFnc(value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info" />
                  Partner
                  {' '}
                  <i className="fas fa-circle text-danger" />
                  Volunteer
                  {' '}
                  <i className="fas fa-circle text-warning" />
                  Other
                </div>
                <hr />
                <div className="stats">
                  <i className="fas fa-history" />
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="3">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={
                    require('assets/img/photo-1431578500526-4d9613015464.jpeg')
                      .default
                  }
                />
              </div>
              <Card.Body>
                <div className="author">
                  <a href="https://www.facebook.com/passerelles.numeriques">
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require('assets/img/faces/pn-logo.png').default}
                    />
                    {listDonor ? (
                      <h5 className="title">
                        <b>
                          Currently there are
                          {' '}
                          {listDonor && listDonor.length}
                          {' '}
                          sponsors
                        </b>
                      </h5>
                    ) : <div className="text-danger">There are currently no sponsors</div>}
                  </a>
                  {topDonor ? (
                    <div>
                      <h5 className="title"><b>TOP dornors</b></h5>
                      <p className="description text-left">
                        <b className="text-warning">TOP 1:</b>
                        {' '}
                        {topDonor[0].name}
                        {' '}
                        With:
                        {' '}
                        {new Intl.NumberFormat().format(topDonor[0].total)}
                        {' '}
                        VNĐ
                      </p>
                      <p className="description text-left">
                        <b className="text-danger text-left">TOP 2:</b>
                        {' '}
                        {topDonor[1].name}
                        {' '}
                        With:
                        {' '}
                        {new Intl.NumberFormat().format(topDonor[1].total)}
                        {' '}
                        VNĐ
                      </p>
                      <p className="description text-left">
                        <b className="text-primary text-left">TOP 3:</b>
                        {' '}
                        {topDonor[2].name}
                        {' '}
                        With:
                        {' '}
                        {new Intl.NumberFormat().format(topDonor[2].total)}
                        {' '}
                        VNĐ
                      </p>
                      <p className="description text-left">
                        <b className="text-left">TOP 4:</b>
                        {' '}
                        {topDonor[3].name}
                        {' '}
                        With:
                        {' '}
                        {new Intl.NumberFormat().format(topDonor[3].total)}
                        {' '}
                        VNĐ
                      </p>
                      <p className="description text-left">
                        <b className="text-left">TOP 5:</b>
                        {' '}
                        {topDonor[4].name}
                        {' '}
                        With:
                        {' '}
                        {new Intl.NumberFormat().format(topDonor[4].total)}
                        {' '}
                        VNĐ
                      </p>
                    </div>
                  ) : <div className="text-danger">No data in donor table!</div>}
                </div>

              </Card.Body>
              <hr />
              <br />
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Sponsorship Type</Card.Title>
                <p className="card-category">Type of sponsorship based on statistics</p>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: ['40%', '20%', '40%'],
                      series: [40, 20, 40],
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info" />
                  Cash
                  {' '}
                  <i className="fas fa-circle text-danger" />
                  In-kind
                  {' '}
                  <i className="fas fa-circle text-warning" />
                  Volunteers
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Sponsorship form through the months in 2020</Card.Title>
                <p className="card-category">Amount converted to million VND</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <ChartistGraph
                    data={{
                      labels: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'Mai',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec',
                      ],
                      series: [
                        [
                          54,
                          44,
                          32,
                          78,
                          55,
                          45,
                          32,
                          43,
                          56,
                          61,
                          75,
                          89,
                        ],
                        [
                          41,
                          24,
                          28,
                          58,
                          45,
                          35,
                          30,
                          36,
                          36,
                          41,
                          63,
                          69,
                        ],
                      ],
                    }}
                    type="Bar"
                    options={{
                      seriesBarDistance: 10,
                      axisX: {
                        showGrid: false,
                      },
                      height: '245px',
                    }}
                    responsiveOptions={[
                      [
                        'screen and (max-width: 640px)',
                        {
                          seriesBarDistance: 5,
                          axisX: {
                            labelInterpolationFnc(value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info" />
                  Cash
                  {' '}
                  <i className="fas fa-circle text-danger" />
                  In-Kind
                </div>
                <hr />
                <div className="stats">
                  <i className="fas fa-check" />
                  Sample data
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
