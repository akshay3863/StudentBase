import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../layout/Avatar";
import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import Loading from "../layout/Loading";
const Student = () => {
  const firestore = useFirestore();
  const Student = useSelector((state) => state.firestore.ordered.Student);

  useFirestoreConnect([
    {
      collection: "Student",
    },
  ]);
  if (!Student) {
    return <Loading />;
  }

  const deleteStudent = async (id) => {
    try {
      await firestore.collection("Student").doc(id).delete();
    } catch (error) {
      alert(`we face some issue ${error}`);
    }
  };
  return (
    <div className="container">
      <div className="py-4">
        <div className="row">
          {Student.map((Student) => (
            <div className="col-lg-3 col-md-6 mb-4" key={Student.id}>
              <div className="card shadow text-center py-4">
                <Avatar img={`https://i.pravatar.cc/150?img=${Student.id}`} />
                <div className="card-body">
                  <h5 className="card-title mb-0">{Student.name}</h5>
                  <p className="text-muted small">{Student.email}</p>
                  <Link
                    to={`/Student/${Student.id}`}
                    className="btn btn-primary btn-profile"
                  >
                    View Profile
                  </Link>
                  <button
                    className="btn btn-edit"
                    onClick={() => {
                      deleteStudent(Student.id);
                    }}
                  >
                    <span className="material-icons">delete_outline</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Student;
