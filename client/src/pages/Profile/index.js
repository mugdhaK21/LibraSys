import React from 'react'
import { Tabs } from "antd";
import Books from "./Books";
import Users from "./Users";
import { useSelector } from "react-redux";
import Reports from './Reports';
import BasicDetails from './BasicDetails';
import BorrowedBooks from './BorrowedBooks';
const TabPane = Tabs.TabPane;

export default function Profile() {
  const { user } = useSelector((state) => state.users);
  const role = user.role;

  return (
    <div>
       <Tabs defaultActiveKey="1">
      <TabPane tab="General" key="1">
          <BasicDetails />
        </TabPane>

        {role === "student" && (
             <TabPane tab="Books Borrowed" key="2">
             <BorrowedBooks />
           </TabPane>
        )} 

        {role !== "student" && (
          <TabPane tab="Books" key="3">
            <Books />
          </TabPane>
        )}
        {role !== "student" && (
          <TabPane tab="Students" key="4">
            <Users role="student" />
          </TabPane>
        )}
        {role === "admin" && (
          <TabPane tab="Librarians" key="5">
            <Users role="librarian" />
          </TabPane>
        )}
        {role === "admin" && (
          <TabPane tab="Admins" key="6">
            <Users role="admin" />
          </TabPane>
        )}
        {role === "admin" && (
          <TabPane tab="Reports" key="7">
            <Reports />
          </TabPane>
        )}
        </Tabs>
    </div>
  )
}
