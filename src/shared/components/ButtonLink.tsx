import Button from "@pluralsight/ps-design-system-button";
import React, { SyntheticEvent } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

type Props = RouteComponentProps & {
  [key: string]: any;
  onClick: Function;
  to: string;
};

const ButtonLink = withRouter(({ onClick, to, ...props }: Props) => (
  <Button
    {...props}
    onClick={(e: SyntheticEvent) => {
      e.preventDefault();
      onClick && onClick(e);
      props.history.push(to);
    }}
    href={to}
  />
));

export default ButtonLink;
