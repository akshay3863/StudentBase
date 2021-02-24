import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Input from "../layout/Input";
import { useFirestore } from "react-redux-firebase";
function StudentForm() {
  let history = useHistory();
  const firestore = useFirestore();
  const { id } = useParams();
  const docRef = id ? firestore.collection("Student").doc(id) : null;
  const [Student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    standard: "",
    address1: "",
    address2: "",
  });
  const onChange = (event) => {
    setStudent({ ...Student, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (id) {
      loadStudent();
    }
  }, [id]);
  const loadStudent = async () => {
    try {
      const result = await docRef.get();
      if (result.exists) {
        setStudent(result.data());
      } else {
        alert("Student not exists");
      }
    } catch (error) {
      alert(`we face some issue ${error}`);
    }
  };
  const submit = async (e) => {
    e.preventDefault();
    if (id) {
      await docRef.update({
        ...Student,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    } else {
      firestore
        .collection("Student")
        .add({ ...Student, CreatedAt: firestore.FieldValue.serverTimestamp() });
    }
    history.push("/");
  };
  return (
    <div className="container">
      <div className="py-4">
        <div className="row">
          <div className="col-md-10 mx-auto">
            <div className="card card-body shadow">
              <form onSubmit={submit}>
                <div className="form-row form-group mb-4">
                  <h1 className="col-md-12">
                    {id ? "Update Form" : "Add Student Data Form"}
                  </h1>
                  <div className="col-md-6">
                    <Input
                      placeholder="Enter Student Name"
                      name="name"
                      value={Student.name}
                      onChange={onChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      placeholder="Enter Student E-mail"
                      name="email"
                      value={Student.email}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className="form-row form-group mb-4">
                  <div className="col-md-6">
                    <Input
                      placeholder="Enter Student Phone"
                      name="phone"
                      value={Student.phone}
                      onChange={onChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      placeholder="Enter Student Class"
                      name="standard"
                      value={Student.standard}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className="form-row form-group">
                  <div className="col-md-6">
                    <Input
                      placeholder="Enter Student Address Line 1"
                      name="address1"
                      value={Student.address1}
                      onChange={onChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      placeholder="Enter Student Line 2"
                      name="address2"
                      value={Student.address2}
                      onChange={onChange}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  {id ? "Update Data" : "Add Student"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentForm;
