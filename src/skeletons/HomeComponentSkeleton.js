import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import Skeleton from 'react-loading-skeleton';

export default function HomeComponentSkeleton() {
  return (
    <>
      <Skeleton height={320} />
      <div className="m-2">
        <Row>
          <Col sm={12} md={4} lg={3} key={1}>
            <Card className="skeleton-custom-card" key="s1">
              <Skeleton height="80px" />
              <Card.Body className="d-flex flex-column justify-content-between">
                <Skeleton count={3} height={38} />
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={4} lg={3} key={2}>
            <Card className="skeleton-custom-card" key="s2">
              <Skeleton height="80px" />
              <Card.Body className="d-flex flex-column justify-content-between">
                <Skeleton count={3} height={38} />
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={4} lg={3} key={3}>
            <Card className="skeleton-custom-card" key="s3">
              <Skeleton height="80px" />
              <Card.Body className="d-flex flex-column justify-content-between">
                <Skeleton count={3} height={38} />
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={4} lg={3} key={3}>
            <Card className="skeleton-custom-card" key="s4">
              <Skeleton height="80px" />
              <Card.Body className="d-flex flex-column justify-content-between">
                <Skeleton count={3} height={38} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
