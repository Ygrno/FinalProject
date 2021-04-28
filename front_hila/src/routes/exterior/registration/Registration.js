import RegisterForm from './RegisterForm';

export const Registration = (props) => {
    return (
        <div>
            <h1>הרשמה </h1>
            <RegisterForm startSession={props.startSession} />
        </div>)
};


