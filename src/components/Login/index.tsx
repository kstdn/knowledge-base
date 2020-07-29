import Button from "@pluralsight/ps-design-system-button";
import Form from "@pluralsight/ps-design-system-form";
import { PageWidthLayout } from "@pluralsight/ps-design-system-layout";
import TextInput from "@pluralsight/ps-design-system-textinput";
import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/actions";

const Login = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      login({
        username,
        password,
      })
    );
  };

  return (
    <PageWidthLayout style={{ height: "100%" }}>
      <form onSubmit={handleSubmit}>
        <Form.VerticalLayout>
          <TextInput
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            label="Username"
          />
          <TextInput
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            label="Password"
          />
          <Form.ButtonRow>
            <Button type="submit">Login</Button>
          </Form.ButtonRow>
        </Form.VerticalLayout>
      </form>
    </PageWidthLayout>
  );
};

export default Login;
