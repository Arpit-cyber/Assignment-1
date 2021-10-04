import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import Skeleton from 'react-loading-skeleton';

const MOCK_ARRAY = [1,2,3,4,5,6,7,8];

export default function HomeComponentSkeleton() {
  return (
    <>
      <Skeleton height={320} />
      <div className="m-2">
        <Row>
          {
            MOCK_ARRAY.map((e) => (
              <Col sm={12} md={4} lg={3} key={e}>
                <Card className="skeleton-custom-card" key="s1">
                  <Skeleton height="300px" />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <Skeleton height={38} />
                    <Skeleton height={38} />
                    <Skeleton height={38} />
                  </Card.Body>
                </Card>
              </Col>
            ))
          }
        </Row>
      </div>
    </>
  );
}
