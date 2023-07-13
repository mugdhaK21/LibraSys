import React, { useEffect, useState } from "react";
import { Modal,message} from "antd";
import Button from "../../../components/Button";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from '../../../redux/loadersSlice';
import { EditIssue, IssueBook } from "../../../apicalls/issues";
import { GetUserById } from "../../../apicalls/users";
export default function IssueForm({open = false,
  setOpen,
  selectedBook,
  setSelectedBook,
  selectedIssue,
  getData,
  type,}) {

    const { user } = useSelector((state) => state.users);
    const [returnDate, setReturnDate] = React.useState(
      type === "edit" ? moment(selectedIssue.returnDate).format("YYYY-MM-DD") : ""
    );
    const [errorMessage, setErrorMessage] = React.useState("");
    const [validated, setValidated] = React.useState(false);
    const [studentData, setStudentData] = useState(null);
    const dispatch = useDispatch();
    const [studentId, setStudentId] = React.useState( type==="edit" ? selectedIssue.user._id : "");
    const validate = async () => {
      try {
        dispatch(ShowLoading());
        const response = await GetUserById(studentId);
        if (response.success) {
          if (response.data.role !== "student") {
            setValidated(false);
            setErrorMessage("This user is not a student");
            dispatch(HideLoading());
            return;
          } else {
            setStudentData(response.data);
            setValidated(true);
            setErrorMessage("");
          }
        } else {
          setValidated(false);
          setErrorMessage(response.message);
        }
        dispatch(HideLoading());
      } catch (error) {
        dispatch(HideLoading());
        setValidated(false);
        setErrorMessage(error.message);
      }
    };

    const onIssue =async()=>{
      try {
        dispatch(ShowLoading());
        let response = null;
        if (type !== "edit") {
          response = await IssueBook({
            book: selectedBook._id,
            user: studentData._id,
            issueDate: new Date(),
            returnDate,
            rent:
              moment(returnDate).diff(moment(), "days") *
              selectedBook?.rentPerDay,
            fine: 0,
            issuedBy: user._id,
          });
        } else {
          response = await EditIssue({
            book: selectedBook._id,
            user: studentData._id,
            issueDate: selectedIssue.issueDate,
            returnDate,
            rent:
              moment(returnDate).diff(moment(), "days") *
              selectedBook?.rentPerDay,
            fine: 0,
            issuedBy: user._id,
            _id: selectedIssue._id,
          });
        }
        dispatch(HideLoading());
        if (response.success) {
          message.success(response.message);
          getData();
          setStudentId("");
          setReturnDate("");
          setValidated(false);
          setErrorMessage("");
          setSelectedBook(null);
          setOpen(false);
        } else {
          message.error(response.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
      }
    }


    useEffect(() => {
      if (type === "edit") {
        validate();
      }
    }, [open]);

    return (
    <Modal
    title=""
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      centered
      >
<div className="flex flex-col gap-2">
<h1 className="txt-secondary font-bold txt-xl uppercase txt-center">
          {type === "edit" ? "Edit / Renew Issue" : "Issue Book"}
        </h1>


       <div>
       <span>Patron Id </span>
        <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Student Id"
           disabled={type === "edit"}
          />
       </div>
          
          <div>
          <span>Return Date </span>
          <input
           type="date"
           value={returnDate}
           onChange={(e)=> setReturnDate(e.target.value)}
           placeholder="Return Date"
           min={moment().format("YYYY-MM-DD")}
          >
          </input>
          </div>
          

          {errorMessage && <span className="error-message">{errorMessage}</span>}
          {
          validated && 
          <div className="bg-secondary txt-white">
            <h1 className="txt-sm">Student : {studentData.name}</h1>
            <h1>
              Number Of Days : {moment(returnDate).diff(moment(), "days")}
            </h1>
            <h1>Rent per Day : {selectedBook.rentPerDay}</h1>
            <h1>
              Rent :{" "}
              {moment(returnDate).diff(moment(), "days") *
                selectedBook?.rentPerDay}
            </h1>
          </div>
        }
          <div className="flex justify-end gap-2 w-100">
          <Button
            title="Cancel"
            variant="outlined"
            onClick={() => setOpen(false)}
          />
          
          
          {type === "add" && (
            <Button
              title="Validate"
              disabled={studentId === "" || returnDate === ""}
              onClick={validate}
            />
          )}
        
          {validated && (
            <Button
              title={type === "edit" ? "Edit" : "Issue"}
              onClick={onIssue}
              disabled={studentId === "" || returnDate === ""}
            />
          )}
          
        </div>
        </div>
        
      
    </Modal>
  )
}