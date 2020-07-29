import Button from "@pluralsight/ps-design-system-button";
import Form from "@pluralsight/ps-design-system-form";
import { PageWidthLayout } from "@pluralsight/ps-design-system-layout";
import Switch from "@pluralsight/ps-design-system-switch";
import * as Text from "@pluralsight/ps-design-system-text";
import TextInput from "@pluralsight/ps-design-system-textinput";
import { Formik, FormikErrors } from "formik";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { createNote, createTask } from "../../api/modules/notes";
import { NoteDto, TaskDto } from "../../api/modules/notes/dto/note.dto";
import { GENERIC_ERROR } from "../../messages";
import "./styles.css";

type NoteSchema = {
  name: string;
  content: string;
  allowChildren: boolean;
  progress: number;
};

export enum NoteFormEntityType {
  Notebook = "notebook", // root note
  Note = "note", // regular note
  Project = "project", // root task
  Task = "task", // regular task
}

export enum NoteFormAction {
  Create = "create",
  Update = "update",
}

type Props = {
  entityType: NoteFormEntityType;
  action: NoteFormAction;
};

const NoteForm = ({ entityType, action }: Props) => {
  const { state: entity } = useLocation<NoteDto | TaskDto>();
  const [error, setError] = useState<string>();

  const isNote =
    entityType === NoteFormEntityType.Note ||
    entityType === NoteFormEntityType.Notebook;

  const isAllowChildrenFixed =
    entityType === NoteFormEntityType.Notebook ||
    entityType === NoteFormEntityType.Project;

  const allowChildrenFixedValue = true;

  const isRoot = true;

  const initialValues: NoteSchema = {
    name: "",
    content: "",
    allowChildren: isAllowChildrenFixed ? allowChildrenFixedValue : true,
    progress: 0,
  };

  return (
    <Formik<NoteSchema>
      initialValues={initialValues}
      validate={(values) => {
        const errors: FormikErrors<NoteSchema> = {};
        if (!values.name) {
          errors.name = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const { name, content, allowChildren, progress } = values;

        const createNotePromise = createNote({
          name,
          content,
          isRoot,
          isFinal: !allowChildren,
        });

        const createTaskPromise = createTask({
          name,
          content,
          isRoot,
          isFinal: !allowChildren,
          progress,
        });

        const createPromise = isNote ? createNotePromise : createTaskPromise;

        createPromise
          .then(() => {
            setSubmitting(false);
          })
          .catch(() => setError(GENERIC_ERROR));
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        isSubmitting,
        setFieldValue,
      }) => {
        const isTouched = (prop: keyof NoteSchema) => !!touched[prop];
        const hasError = (prop: keyof NoteSchema) =>
          isTouched(prop) && !!errors[prop];
        const getError = (prop: keyof NoteSchema) =>
          hasError(prop) && errors[prop];

        return (
          <PageWidthLayout style={{ height: "100%" }}>
            <form onSubmit={handleSubmit}>
              <Form.VerticalLayout>
                <Text.Heading>
                  <h2>
                    {action === NoteFormAction.Create ? (
                      <>Create a {entityType}</>
                    ) : null}
                    {action === NoteFormAction.Update ? (
                      <>
                        Update {entityType}{" "}
                        <span className="entity-name">{entity.name}</span>
                      </>
                    ) : null}
                  </h2>
                </Text.Heading>
                <TextInput
                  name="name"
                  label="Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={hasError("name")}
                  subLabel={getError("name")}
                  value={values.name}
                />
                <TextInput
                  name="content"
                  label="Content"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.content}
                  error={hasError("content")}
                  subLabel={getError("content")}
                />
                {isAllowChildrenFixed ? null : (
                  <Switch
                    checked={values.allowChildren}
                    onClick={() => {
                      setFieldValue("allowChildren", !values.allowChildren);
                    }}
                  >
                    Allow children
                  </Switch>
                )}
                <Form.Divider />
                <Form.ButtonRow>
                  <Button type="submit" loading={isSubmitting}>
                    Save
                  </Button>
                  <Button
                    onClick={handleReset}
                    appearance={Button.appearances.secondary}
                  >
                    Reset
                  </Button>
                </Form.ButtonRow>
              </Form.VerticalLayout>
            </form>
          </PageWidthLayout>
        );
      }}
    </Formik>
  );
};

export default NoteForm;
