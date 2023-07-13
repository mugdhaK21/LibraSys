import { Col, message, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetReports } from "../../../apicalls/reports";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";

function Reports() {
  const [reports, setReports] = React.useState(null);

  const dispatch = useDispatch();
  const getReports = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetReports();
      dispatch(HideLoading());
      if (response.success) {
        setReports(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getReports();
  }, []);
  return (
    <div>
      <Row gutter={[16, 16]}>
        {/* Books */}
        <Col span={6}>
          <div className="shadow p-2">
            <h1 className="txt-secondary txt-xl font-bold uppercase">
              Books
            </h1>
            <hr />

            <div className="flex justify-between mt-1">
              <h1 className="txt-md">Total Books</h1>
              <h1>{reports?.books?.booksCount}</h1>
            </div>
            <div className="flex justify-between mt-1">
              <h1 className="txt-md">Total Copies</h1>
              <h1>{reports?.books?.totalBooksCopiesCount}</h1>
            </div>

            <div className="flex justify-between mt-1">
              <h1 className="txt-md">Available Copies</h1>
              <h1>{reports?.books?.availableBooksCopiesCount}</h1>
            </div>

            <div className="flex justify-between mt-1">
              <h1 className="txt-md">Issued Copies</h1>
              <h1>{reports?.books?.issuesBooksCopiesCount}</h1>
            </div>
          </div>
        </Col>

        {/* Users */}
        <Col span={6}>
          <div className="shadow p-2">
            <h1 className="txt-secondary txt-xl font-bold uppercase">
              Users
            </h1>
            <hr />

            <div className="flex justify-between mt-1">
              <h1 className="txt-md">Total Users</h1>
              <h1>{reports?.users?.usersCount}</h1>
            </div>
            <div className="flex justify-between mt-1">
              <h1 className="txt-md">Patrons</h1>
              <h1>{reports?.users?.patronsCount}</h1>
            </div>

            <div className="flex justify-between mt-1">
              <h1 className="txt-md">Librarians</h1>
              <h1>{reports?.users?.librariansCount}</h1>
            </div>

            <div className="flex justify-between mt-1">
              <h1 className="txt-md">Admins</h1>
              <h1>{reports?.users?.adminsCount}</h1>
            </div>
          </div>
        </Col>

        {/* Issues */}
        <Col span={6}>
          <div className="shadow p-2">
            <h1 className="txt-secondary txt-xl font-bold uppercase">
              Issues
            </h1>
            <hr />

            <div className="flex justify-between mt-1">
              <h1 className="txt-md">Total Issues</h1>
              <h1>{reports?.issues?.issuesCount}</h1>
            </div>
            <div className="flex justify-between mt-1">
              <h1 className="txt-md">Returned Issues</h1>
              <h1>{reports?.issues?.returnedIssuesCount}</h1>
            </div>

            <div className="flex justify-between mt-1">
              <h1 className="txt-md">Pending Issues</h1>
              <h1>{reports?.issues?.pendingIssuesCount}</h1>
            </div>

            <div className="flex justify-between mt-1">
              <h1 className="txt-md">Overdue Issues</h1>
              <h1>{reports?.issues?.overdueIssuesCount || 0}</h1>
            </div>
          </div>
        </Col>

        {/* Revenue */}
        <Col span={6}>
          <div className="shadow p-2">
            <h1 className="txt-secondary txt-xl font-bold uppercase">
              Revenue
            </h1>
            <hr />
            <div className="flex justify-between mt-1">
              <h1 className="txt-md">Total Revenue</h1>
              <h1>{reports?.revenue?.totalCollected}</h1>
            </div>
            <div className="flex justify-between mt-1">
              <h1 className="txt-md">Rent Collected</h1>
              <h1>{reports?.revenue?.rentCollected}</h1>
            </div>

            <div className="flex justify-between mt-1">
              <h1 className="txt-md">Penalty Collected</h1>
              <h1>{reports?.revenue?.fineCollected}</h1>
            </div>

            <div className="flex justify-between mt-1">
              <h1 className="txt-md">Rent Pending</h1>
              <h1>{reports?.revenue?.rentPending}</h1>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Reports;