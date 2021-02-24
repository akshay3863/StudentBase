import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Avatar from "../layout/Avatar";
import { useFirestore } from "react-redux-firebase";
import Loading from "../layout/Loading";
function Stu() {
  const firestore = useFirestore();
  const { id } = useParams();
  const [Student, setStudent] = useState(null);

  const loadStudent = async () => {
    try {
      const docRef = firestore.collection("Student").doc(id);
      const result = await docRef.get();
      if (result.exists) {
        setStudent(result.data());
      } else {
        alert("User dose not  Exists");
      }
    } catch (error) {
      alert(`we found some ${error}`);
    }
  };

  useEffect(() => {
    loadStudent();
  }, []);

  if (!Student) {
    return <Loading />;
  }
  return (
    <div className="container">
      <div className="py-4">
        <div className="row">
          <div className="col-md-10 mx-auto">
            <div className="card card-body shadow">
              <div className="row">
                <div className="col-md-4">
                  <Avatar img={`https://i.pravatar.cc/150?img=${id}`} />
                </div>
                <div className="col-md-8">
                  <ul className="list-group">
                    <li className="d-flex justify-content-between align-items-center list-group-item list-group-item-action">
                      <h3 className="m-0">{Student.name}</h3>
                      <Link
                        className="btn btn-primary"
                        to={`/StudentForm/${id}`}
                      >
                        edit profile
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <p>Email: {Student.email}</p>
                      <p>Phone: {Student.phone}</p>
                      <p>Class: {Student.standard}</p>
                      <p>Address Line 1: {Student.address1}</p>
                      <p>Address Line 2: {Student.address2}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stu;
