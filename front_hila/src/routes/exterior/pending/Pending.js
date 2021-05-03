import React from "react";
import PendingForm from "./PendingForm";
import { withRouter } from "react-router";


const Pending = (props) => {
    return (
        <div>
            <PendingForm userSession={props.userSession} startSession={props.startSession} endSession={props.endSession} />
        </div>
    );
};

export default withRouter(Pending);
