import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../Login";
import RootTable, { RootEntityType } from "../RootTable";
import NoteForm, { NoteFormAction, NoteFormEntityType } from "../NoteForm";
import TaskGraph from "../TaskGraph";
import "./styles.css";

function Main() {
  return (
    <div className="main-container">
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Redirect to="/notebooks" />
        </Route>
        <Route exact path="/notebooks">
          <RootTable type={RootEntityType.Notebook} />
        </Route>
        <Route exact path="/projects">
          <RootTable type={RootEntityType.Project} />
        </Route>
        <Route exact path="/create-notebook">
          <NoteForm
            entityType={NoteFormEntityType.Notebook}
            action={NoteFormAction.Create}
          />
        </Route>
        <Route exact path="/create-project">
          <NoteForm
            entityType={NoteFormEntityType.Project}
            action={NoteFormAction.Create}
          />
        </Route>
        <Route exact path="/update-notebook">
          <NoteForm
            entityType={NoteFormEntityType.Notebook}
            action={NoteFormAction.Update}
          />
        </Route>
        <Route exact path="/update-project">
          <NoteForm
            entityType={NoteFormEntityType.Project}
            action={NoteFormAction.Update}
          />
        </Route>
        <Route exact path="/create-note">
          <NoteForm
            entityType={NoteFormEntityType.Note}
            action={NoteFormAction.Create}
          />
        </Route>
        <Route exact path="/create-task">
          <NoteForm
            entityType={NoteFormEntityType.Task}
            action={NoteFormAction.Create}
          />
        </Route>
        <Route exact path="/update-note">
          <NoteForm
            entityType={NoteFormEntityType.Note}
            action={NoteFormAction.Update}
          />
        </Route>
        <Route exact path="/update-task">
          <NoteForm
            entityType={NoteFormEntityType.Task}
            action={NoteFormAction.Update}
          />
        </Route>
        <Route exact path="/task-graph">
          <TaskGraph />
        </Route>
      </Switch>
    </div>
  );
}

export default Main;
