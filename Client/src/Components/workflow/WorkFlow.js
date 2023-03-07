import React from 'react'
import workflow from "../images/workflow.png"

const WorkFlow = () => {
  return (
    <>
    <section className="section collection">
    <div className="title">
        <span>Workflow</span>
        <h2>How our system works?</h2>
      </div>
    <div className="product container">
       <img src={workflow} alt="this is workflow"></img>
    </div>
    </section>
    </>
  )
}

export default WorkFlow
