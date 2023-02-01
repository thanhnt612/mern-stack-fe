import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createTaskApi,
  deleteTaskApi,
  getTaskApi,
  getTaskDetailApi,
  updateTaskApi,
} from "../../redux/reducer/taskReducer";

export default function Home() {
  useEffect(() => {
    const action = getTaskApi();
    dispatch(action);
  }, []);
  const { task } = useSelector((state) => state.taskReducer);
  const { taskDetail } = useSelector((state) => state.taskReducer);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newValue = value;
    const action = createTaskApi(newValue);
    dispatch(action);
  };
  const frm = useFormik({
    initialValues: {
      id: taskDetail._id,
      content: taskDetail.content,
    },
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      content: yup.string().required("Please fill in the form !"),
    }),
    onSubmit: (update) => {
      const action = updateTaskApi(update.id, update.content);
      dispatch(action);
    },
  });
  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card rounded-3">
                <div className="card-body p-4">
                  <h4 className="text-center my-3 pb-3">To Do App</h4>
                  <form
                    onSubmit={handleSubmit}
                    className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2"
                  >
                    <div className="col-12">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="content"
                          name="content"
                          value={value}
                          className="form-control"
                          placeholder="Enter a task here"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-success">
                        Add
                      </button>
                    </div>
                  </form>
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                    style={{ display: "none" }}
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            Edit
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          />
                        </div>
                        <form onSubmit={frm.handleSubmit}>
                          <div className="modal-body">
                            <div className="form-group mb-3">
                              <input
                                className="form-control"
                                name="content"
                                value={frm.values.content}
                                onChange={frm.handleChange}
                                onBlur={frm.handleBlur}
                              />
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn bg-danger text-white "
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="submit"
                              className="btn bg-primary text-white"
                            >
                              Update
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <table className="table mb-4 text-center">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>List</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    {task.map((item, index) => {
                      return (
                        <tbody>
                          <tr key={index}>
                            <td>{index}</td>
                            <td>{item.content}</td>
                            <td>
                              <button
                                type="submit"
                                className="btn btn-danger"
                                onClick={() => {
                                  dispatch(deleteTaskApi(item._id));
                                }}
                              >
                                Delete
                              </button>
                              <button
                                type="submit"
                                className="btn btn-primary ms-1"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => {
                                  dispatch(getTaskDetailApi(item._id));
                                }}
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
