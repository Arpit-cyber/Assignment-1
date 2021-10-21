import React from "react";
import { Col, Row } from "react-bootstrap";
import { BarChart, PieChart } from "../Charts";

export const AnalysisComponent = ({ dataForBarChart, dataForPieChart }) => {
  return (
    <div className="mh-5">
      <h5 className="centered-heading">Analysis Report</h5>
      <Row className="mb-3">
        <Col className="mt-10 d-flex justify-content-center">
          <BarChart
            data={dataForBarChart}
            title="Most Viewed Product"
            horizontalAxisTitle="Views"
            verticalAxisTitle="Products"
          />
        </Col>
        <Col className="mt-10 d-flex justify-content-center">
          <PieChart data={dataForPieChart} title="Most Ordered Product" />
        </Col>
      </Row>
    </div>
  );
};
