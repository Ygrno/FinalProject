import React from "react";
import PendingForm from "./PendingForm";
import { withRouter } from "react-router";


const Pending = (props) => {
    return (
        <div>
            <h1> שלוחם</h1>
            <PendingForm userSession={props.userSession} startSession={props.startSession} endSession={props.endSession} />
        </div>
    );
};

export default withRouter(Pending);
