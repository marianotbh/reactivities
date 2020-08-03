import React, { FC } from "react";
import { Item, Button, Segment, Icon } from "semantic-ui-react";
import { IActivity } from "../../app/models/activity";
import { Link } from "react-router-dom";

const ActivityItem: FC<IActivity> = ({ id, title, date, description, city, venue, category }) => {
	return (
		<Segment.Group>
			<Segment>
				<Item.Group>
					<Item>
						<Item.Image size="tiny" circular src="/assets/user.png" />
						<Item.Content>
							<Item.Header as="a">{title}</Item.Header>
							<Item.Description>Hosted by Bob</Item.Description>
						</Item.Content>
					</Item>
				</Item.Group>
			</Segment>
			<Segment>
				<Icon name="clock" /> {date}
				<Icon name="marker" /> {venue}, {city}
			</Segment>
			<Segment secondary>Attendees will go here</Segment>
			<Segment clearing>
				<span>{description}</span>
				<Button as={Link} to={`/details/${id}`} floated="right" content="View" color="blue" />
			</Segment>
		</Segment.Group>
	);
};

export default ActivityItem;
