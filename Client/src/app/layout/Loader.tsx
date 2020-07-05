import React, { FC } from "react";
import { Dimmer, Loader as SemanticUILoader } from "semantic-ui-react";

type Props = {
	inverted?: boolean;
	content?: string;
};

const Loader: FC<Props> = ({ inverted = true, content = "" }) => {
	return (
		<Dimmer active inverted={inverted}>
			<SemanticUILoader content={content} />
		</Dimmer>
	);
};

export default Loader;
