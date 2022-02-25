import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }

  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: '', isValid: false };
};

const Login = () => {
  const ctx = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, emailDispatch] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });
  const [passwordState, passwordDispatch] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('validating form');
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);
    return () => {
      console.log('Clean up');
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = event => {
    emailDispatch({ type: 'USER_INPUT', val: event.target.value });
  };

  const passwordChangeHandler = event => {
    passwordDispatch({ type: 'USER_INPUT', val: event.target.value });
  };

  const validateEmailHandler = () => {
    emailDispatch({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    passwordDispatch({ type: 'INPUT_BLUR' });
  };

  const submitHandler = event => {
    event.preventDefault();
    if (formIsValid) return ctx.onLogin(emailState.value, passwordState.value);
    if (!emailIsValid) return emailRef.current.focus();
    if (!passwordIsValid) return passwordRef.current.focus();
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          type="email"
          isValid={emailState.isValid}
          value={emailState.value}
          id="email"
          label="Email"
          onBlur={validateEmailHandler}
          onChange={emailChangeHandler}
          ref={emailRef}
        />
        <Input
          type="password"
          isValid={passwordState.isValid}
          value={passwordState.value}
          id="password"
          label="Password"
          onBlur={validatePasswordHandler}
          onChange={passwordChangeHandler}
          ref={passwordRef}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
