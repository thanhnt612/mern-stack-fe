import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTaskDetailApi } from "../../redux/reducer/taskReducer";

export default function Detail() {
  const { taskDetail } = useSelector((state) => state.taskReducer);
  console.log(taskDetail);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    const action = getTaskDetailApi(id);
    dispatch(action);
  }, [id]);
  return (
    <div>
      <h1>Hello {id}</h1>
    </div>
  );
}
