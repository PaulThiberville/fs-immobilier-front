import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "../../../components/form";
import Input from "../../../components/Input";
import { Pop } from "../../../components/pop";
import { submitActions } from "../../../features/submit";
import { checkIsEmail } from "../../../utils/checkIsEmail";

export default function UserInfos() {
  const { name, email } = useSelector(state => state.submit);
  const dispatch = useDispatch();

  const checkUserValidity = () => {
    if (name.value <= 3 || checkIsEmail(email.value) === false)
      return dispatch(submitActions.setIsUserValid(false));
    dispatch(submitActions.setIsUserValid(true));
  };

  const onNameChanged = value => {
    if (value.length <= 3) {
      return dispatch(
        submitActions.setName({
          value,
          error: "Saisissez au moins 3 caracteres.",
        })
      );
    }
    return dispatch(
      submitActions.setName({
        value,
        error: "",
      })
    );
  };

  const onEmailChanged = value => {
    if (!checkIsEmail(value)) {
      return dispatch(
        submitActions.setEmail({
          value,
          error: "Saisissez un mail valide.",
        })
      );
    }
    return dispatch(
      submitActions.setEmail({
        value,
        error: "",
      })
    );
  };

  useEffect(() => {
    checkUserValidity();
  }, [name, email]);

  return (
    <Pop>
      <Form>
        <Input
          type="text"
          title={"Nom et prénom"}
          placeholder={"exemple: John Doe"}
          onChange={e => onNameChanged(e.target.value)}
          value={name.value}
          error={name.error}
        />
        <Input
          type="email"
          title="Email"
          placeholder="exemple: johndoe@mail.com"
          onChange={e => onEmailChanged(e.target.value)}
          value={email.value}
          error={email.error}
        />
      </Form>
    </Pop>
  );
}
