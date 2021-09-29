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
                <Skeleton count={2} height={38} />
                <div className="d-flex flex-row justify-content-between">
                  <Skeleton count={2} height={38} width={38} />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={4} lg={3} key={2}>
            <Card className="skeleton-custom-card" key="s1">
              <Skeleton height="80px" />
              <Card.Body className="d-flex flex-column justify-content-between">
                <Skeleton count={2} height={38} />
                <div className="d-flex flex-row justify-content-between">
                  <Skeleton count={2} height={38} width={38} />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={4} lg={3} key={3}>
            <Card className="skeleton-custom-card" key="s1">
              <Skeleton height="80px" />
              <Card.Body className="d-flex flex-column justify-content-between">
                <Skeleton count={2} height={38} />
                <Skeleton height={38} />
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={4} lg={3} key={3}>
            <Card className="skeleton-custom-card" key="s1">
              <Skeleton height="80px" />
              <Card.Body className="d-flex flex-column justify-content-between">
                <Skeleton count={2} height={38} />
                <Skeleton height={38} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
