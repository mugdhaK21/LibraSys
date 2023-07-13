import React, { useEffect } from "react";
import { Form, message } from "antd";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

export default function Register() {
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await RegisterUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        window.location.href = "/login";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="h-screen bg-primary flex items-center justify-center">
      <div className="auth-form bg-white p-3 rounded">
        <h1 className="txt-secondary txt-2xl font-bold mb-1 ">
          LIBRASYS - REGISTER
        </h1>
        <hr />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your Name ",
              },
            ]}
          >
            <input type="text" placeholder="Name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email",
              },
            ]}
          >
            <input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your Phone Number",
              },
            ]}
          >
            <input type="number" placeholder="Phone Number" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password",
              },
            ]}
          >
            <input type="password" placeholder="Password" />
          </Form.Item>

          <div className="txt-center mt-2 flex flex-col gap-1">
            <Button title="Register" type="submit" />
            <Link to="/login" className="txt-primary txt-small underline">
              Already have an account? Click Here to Login
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}