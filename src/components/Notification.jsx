import React from "react";

export const Notification = ({ message, type }) => {

    return (
        <div className="toast-container top-0 end-0 p-3">
            <div
                className={type === 'success' ? "toast align-items-center text-bg-success border-0" : "toast align-items-center text-bg-danger border-0"}
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div className="d-flex">
                    <div className="toast-body">
                        {message}
                    </div>
                    <button
                        type="button"
                        className="btn-close btn-close-white me-2 m-auto"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                    ></button>
                </div>
            </div>
        </div>
    );
};