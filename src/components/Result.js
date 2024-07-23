import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // 引入Bootstrap CSS

function Result() {
  return (
    <div className="p-5 mb-4 bg-light rounded-3">
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">提交成功！</h1>
        <div className="row">
          <div className="col">
            <p className="fs-4">Family的分配结果将于__月__日通过公众号发布，请耐性等待！</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
