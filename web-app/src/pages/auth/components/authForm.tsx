import { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import { signin, signup } from '../../../store/auth/actions';
import { authActions } from '../../../store/auth/slice';

const AuthForm: React.FC = (props) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const isSingupSuccess = useAppSelector((state) => state.auth.isSingupSuccess);

  const [formType, setFormType] = useState<string>('signin');

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordConfInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const surnameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log('SIEMA WSZYSTKO ŚMIGA');
    console.log(token);
    console.log(localStorage.getItem('token'));
  }, [token]);

  useEffect(() => {
    if (isSingupSuccess) {
      console.log('elo zmieniamy');
      setFormType('signin');
      dispatch(authActions.signup({ isSingupSuccess: false }));
    }
  }, [isSingupSuccess, dispatch]);

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();
    if (formType === 'signin') {
      dispatch(
        signin(emailInputRef.current!.value, passwordInputRef.current!.value)
      );
    } else if (formType === 'signup') {
      dispatch(
        signup(
          nameInputRef.current!.value,
          surnameInputRef.current!.value,
          emailInputRef.current!.value,
          passwordInputRef.current!.value,
          passwordConfInputRef.current!.value,
          emailInputRef.current!.value
        )
      );
    }
  };

  const changeFormType = () => {
    setFormType((currentType) =>
      currentType === 'signin' ? 'signup' : 'signin'
    );
  };

  return (
    <div>
      <h2>{formType === 'signin' ? 'Zaloguj się' : 'Zarejestruj się'}</h2>
      <form onSubmit={submitForm}>
        <label htmlFor="email">
          <p>Email:</p>
          <input id="email" type="email" ref={emailInputRef} />
        </label>
        <label htmlFor="password">
          <p>Hasło:</p>
          <input id="password" type="password" ref={passwordInputRef} />
        </label>
        {formType === 'signup' && (
          <>
            <label htmlFor="passwordConf">
              <p>Powtórz hasło:</p>
              <input
                id="passwordConf"
                type="password"
                ref={passwordConfInputRef}
              />
            </label>
            <label htmlFor="firstName">
              <p>Imię:</p>
              <input id="firstName" type="text" ref={nameInputRef} />
            </label>
            <label htmlFor="surname">
              <p>Nazwisko:</p>
              <input id="surname" type="text" ref={surnameInputRef} />
            </label>
          </>
        )}
        <button type="submit">
          {formType === 'signin' ? 'Zaloguj się' : 'Zarejestruj się'}
        </button>
      </form>
      <p>
        {formType === 'signin'
          ? 'Jeszcze nie w stadzie?'
          : 'Należysz już do stada?'}
      </p>
      <button onClick={changeFormType}>
        {formType === 'signin' ? 'Zarejestuj się!' : 'Zaloguj się!'}
      </button>
    </div>
  );
};

export default AuthForm;
