import React, { FC } from "react";
import { Segment, Button, Image, Header, Item } from "semantic-ui-react";
import { IActivity } from "../../app/models/activity";
import { observer } from "mobx-react-lite";

const activityImageStyle = {
	filter: "brightness(30%)"
};

const activityImageTextStyle = {
	position: "absolute",
	bottom: "5%",
	left: "5%",
	width: "100%",
	height: "auto",
	color: "white"
};

const DetailHeader: FC<IActivity> = ({ title, date, category }) => {
	return (
		<Segment.Group>
			<Segment basic attached="top" style={{ padding: "0" }}>
				<Image src={`/assets/categories/${category}.jpg`} fluid style={activityImageStyle} />
				<Segment style={activityImageTextStyle} basic>
					<Item.Group>
						<Item>
							<Item.Content>
								<Header size="huge" content={title} style={{ color: "white" }} />
								<p>{date}</p>
								<p>
									Hosted by <strong>Bob</strong>
								</p>
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
			</Segment>
			<Segment clearing attached="bottom">
				<Button color="teal">Join Activity</Button>
				<Button>Cancel attendance</Button>
				<Button color="orange" floated="right">
					Manage Event
				</Button>
			</Segment>
		</Segment.Group>
	);
};

export default observer(DetailHeader);
