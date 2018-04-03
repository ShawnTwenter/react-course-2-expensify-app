// Higher Order Component (HOC) - A component that renders another component
// Reuse code
// Render hijacking
// Prop manipulation
// Abstract state

import React from 'react';
import ReactDom from 'react-dom';


const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

// regular function not component..i.e. lowercase naming
const withAdminWarning = (WrappedComponent) => {
    // this is the HOC
    return (props) => (
        <div>
           {props.isAdmin && <p>This is private info please don't share</p>}
            <WrappedComponent {...props} />
        </div>
    );
};

const requireAuthentication = (WrappedComponent) => {
    // this is the HOC
    return (props) => (
        <div>
           {props.isAuthenticated ? (
               <WrappedComponent {...props} />
        ) : (
            <p>Please login to view the info</p>
        )}
        </div>
    );
};

// requireAuthentication


const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDom.render(<AdminInfo isAdmin={true} info="there are the details" />, document.getElementById('app'));
ReactDom.render(<AuthInfo isAuthenticated={true} info="there are the details" />, document.getElementById('app'));