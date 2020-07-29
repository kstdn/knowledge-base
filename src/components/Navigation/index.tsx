import Button from "@pluralsight/ps-design-system-button";
import {
  MenuIcon,
  NoteIcon,
  UserIcon,
  PlusIcon,
  DashboardIcon,
} from "@pluralsight/ps-design-system-icon";
import React, { useState } from "react";
import ButtonLink from "../../shared/components/ButtonLink";
import "./styles.css";

const Navigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`navigation-container ${open ? "open" : ""}`}>
      <Button
        className="toggle-button"
        onClick={() => setOpen((prev) => !prev)}
        size={Button.sizes.large}
        icon={<MenuIcon />}
        appearance={Button.appearances.flat}
        title="Toggle Menu"
      />
      <ButtonLink
        to={"login"}
        size={Button.sizes.large}
        className="navigation-button"
        appearance={Button.appearances.flat}
        icon={<UserIcon />}
        iconAlign={Button.iconAligns.right}
      >
        Login
      </ButtonLink>
      <ButtonLink
        to={"/notebooks"}
        size={Button.sizes.large}
        className="navigation-button"
        appearance={Button.appearances.flat}
        icon={<NoteIcon />}
        iconAlign={Button.iconAligns.right}
      >
        Notebooks
      </ButtonLink>
      <ButtonLink
        to={"/projects"}
        size={Button.sizes.large}
        className="navigation-button"
        appearance={Button.appearances.flat}
        icon={<DashboardIcon />}
        iconAlign={Button.iconAligns.right}
      >
        Projects
      </ButtonLink>
      <ButtonLink
        to={"create-note"}
        size={Button.sizes.large}
        className="navigation-button"
        appearance={Button.appearances.flat}
        icon={<PlusIcon />}
        iconAlign={Button.iconAligns.right}
      >
        Add Note
      </ButtonLink>
      <ButtonLink
        to={"create-task"}
        size={Button.sizes.large}
        className="navigation-button"
        appearance={Button.appearances.flat}
        icon={<PlusIcon />}
        iconAlign={Button.iconAligns.right}
      >
        Add Task
      </ButtonLink>
    </div>
  );
};

export default Navigation;
