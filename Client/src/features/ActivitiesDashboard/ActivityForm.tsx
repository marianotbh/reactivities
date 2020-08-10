import React, { FC, useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { EditableActivity } from "../../app/models/Activity";
import { v4 as uuid } from "uuid";
import { ActivityStore } from "../../app/store/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../app/common/form/TextInput";
import TextAreaInput from "../../app/common/form/TextAreaInput";
import SelectInput from "../../app/common/form/SelectInput";
import { categories } from "../../app/common/options/categories";
import DateInput from "../../app/common/form/DateInput";
import { combineDateTime } from "../../app/common/utils/combineDateTime";
import {
  combineValidators,
  composeValidators,
  hasLengthGreaterThan,
  isRequired,
} from "revalidate";

const validate = combineValidators({
  title: isRequired({ message: "The event title is required" }),
  category: isRequired("Category"),
  description: composeValidators(
    isRequired("Description"),
    hasLengthGreaterThan(5)({
      message: "Description needs to be at least 5 characters",
    })
  )(),
  city: isRequired("City"),
  venue: isRequired("Venue"),
  date: isRequired("Date"),
  time: isRequired("Time"),
});

type Params = {
  id: string;
};

const ActivityForm: FC<RouteComponentProps<Params>> = ({ match, history }) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    loadActivity,
  } = activityStore;
  const [loading, setLoading] = useState(false);

  const [activity, setActivity] = useState<EditableActivity>({
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id)
        .then((activity) => setActivity({ ...activity, time: activity.date }))
        .finally(() => setLoading(false));
    }
  }, [loadActivity, match.params.id]);

  const handleSubmit = async (values: Record<string, any>) => {
    const submit = {
      id: activity.id ? activity.id : uuid(),
      title: values.title ?? "",
      description: values.description ?? "",
      category: values.category ?? "",
      city: values.city ?? "",
      venue: values.venue ?? "",
      date: combineDateTime(values.date, values.time),
    };

    if (typeof activity.id === "undefined") {
      const { id } = await createActivity(submit);
      history.push(`/details/${id}`);
    } else {
      await editActivity(submit);
      history.push(`/details/${activity.id}`);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            initialValues={activity}
            validate={validate}
            onSubmit={handleSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="title"
                  placeholder="Title"
                  value={activity.title}
                  component={TextInput}
                />
                <Field
                  name="description"
                  placeholder="Description"
                  rows={3}
                  value={activity.description}
                  component={TextAreaInput}
                />
                <Field
                  name="category"
                  options={categories}
                  placeholder="Category"
                  value={activity.category}
                  component={SelectInput}
                />
                <Form.Group widths="equal">
                  <Field
                    name="date"
                    placeholder="Date"
                    time={false}
                    value={activity.date}
                    component={DateInput}
                  />
                  <Field
                    name="time"
                    placeholder="Time"
                    date={false}
                    value={activity.date}
                    component={DateInput}
                  />
                </Form.Group>
                <Field
                  name="city"
                  placeholder="City"
                  value={activity.city}
                  component={TextInput}
                />
                <Field
                  name="venue"
                  placeholder="Venue"
                  value={activity.venue}
                  component={TextInput}
                />
                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  onClick={() => history.push(`/activities`)}
                  disabled={loading}
                  floated="right"
                  type="button"
                  content="Cancel"
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
