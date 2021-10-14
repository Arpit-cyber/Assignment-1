import React from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { isUserLoading$, user$ } from "../../store";
import "./profile.css";

export const UserProfile = () => {
  const currentUser = useSelector(user$);
  const isUserLoading = useSelector(isUserLoading$);

  const userInitials = currentUser?.name
    ?.split(" ")
    .slice(0, 2)
    .map((e) => e.substr(0, 1))
    .join("");

  const UserThumbnailSkeleton = () => (
    <>
      <Skeleton circle={true} height={250} width={250} />
      <Skeleton height={33} />
      <Skeleton height={26} />
    </>
  );

  const UserDetailsSkeleton = () => (
    <>
      <Skeleton height={27} />
      <div className="mv-20">
        <Skeleton height={37} className="mb-10" />
        <Skeleton height={37} className="mb-10" />
        <Skeleton height={18} className="mb-10" />
        <Skeleton height={37} className="mb-10" />
        <Skeleton height={37} className="mb-10" />
        <Skeleton height={37} className="mb-10" />
        <Skeleton height={18} className="mb-10" />
        <Skeleton height={37} className="mb-10" />
        <Skeleton height={37} className="mb-10" />
        <Skeleton height={37} className="mb-10" />
      </div>
      <Skeleton height={37} />
    </>
  );

  return (
    <div>
      <Row>
        <Col sm={0} md={1} />
        <Col sm={12} md={4} className="profile-image-wrapper">
          <div className="profile-thumbnail-container">
            {isUserLoading ? (
              <UserThumbnailSkeleton />
            ) : (
              <>
                <div className="profile-thumbnail">{userInitials}</div>
                <h3 className="user-name">{currentUser?.name}</h3>
                <p className="user-email">{currentUser?.email}</p>
              </>
            )}
          </div>
        </Col>
        <Col sm={12} md={6} className="content-wrapper">
          <div className="form-container">
            {isUserLoading ? (
              <UserDetailsSkeleton />
            ) : (
              <>
                <h4 className="form-heading">Profile Settings</h4>
                <Row className="field-group">
                  <Col sm={12} md={6} className="mb-10">
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      value={currentUser?.name?.split(" ")[0]}
                    />
                  </Col>
                  <Col sm={12} md={6} className="mb-10">
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      value={currentUser?.name?.split(" ")[1]}
                    />
                  </Col>
                  <Col sm={12} md={6} className="mb-10">
                    <Form.Control
                      type="email"
                      placeholder="Email Address"
                      value={currentUser?.email}
                    />
                  </Col>
                  <Col sm={12} md={6} className="mb-10">
                    <Form.Control type="text" placeholder="Phone Number" />
                  </Col>

                  <h6 className="mt-10">Billing Address</h6>
                  <Col sm={12} md={6} className="mb-10">
                    <Form.Control type="text" placeholder="Address Line 1" />
                  </Col>
                  <Col sm={12} md={6} className="mb-10">
                    <Form.Control type="text" placeholder="Address Line 2" />
                  </Col>
                  <Col sm={12} md={6} className="mb-10">
                    <Form.Control type="text" placeholder="City" />
                  </Col>
                  <Col sm={12} md={6} className="mb-10">
                    <Form.Control type="text" placeholder="State" />
                  </Col>
                  <Col sm={12} md={6} className="mb-10">
                    <Form.Control type="text" placeholder="ZipCode" />
                  </Col>

                  <h6 className="mt-10">Shipping Address</h6>
                  <Col sm={12} md={6} className="mb-10">
                    <Form.Control type="text" placeholder="Address Line 1" />
                  </Col>
                  <Col sm={12} md={6} className="mb-10">
                    <Form.Control type="text" placeholder="Address Line 2" />
                  </Col>
                  <Col sm={12} md={6} className="mb-10">
                    <Form.Control type="text" placeholder="City" />
                  </Col>
                  <Col sm={12} md={6} className="mb-10">
                    <Form.Control type="text" placeholder="State" />
                  </Col>
                  <Col sm={12} md={6} className="mb-10">
                    <Form.Control type="text" placeholder="ZipCode" />
                  </Col>
                </Row>

                <Button variant="success" className="setting-button mt-10">
                  Save Settings
                </Button>
              </>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};
