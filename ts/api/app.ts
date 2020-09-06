/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {HEndpointBuilder, HEndpointGroup, HErrorStatusCode} from "@element-ts/hydrogen";
import {OStandardType} from "@element-ts/oxygen";
import {getUserFromRequest} from "./helpers";
import {CCApp} from "../structs/app";
import {SiQuery} from "@element-ts/silicon";

export const endpointApp = new HEndpointGroup();

endpointApp.add(HEndpointBuilder
	.post("/")
	.types({
		name: OStandardType.string
	})
	.listener(async (req, res) => {

		const body: {name: string} = req.getBody();
		const user = await getUserFromRequest(req, res);
		if (user === undefined) return;

		const app = new CCApp();
		app.props.userId = user.getId();
		app.props.name = body.name;
		await app.create();

		res.sendHObject(app);

	})
);

endpointApp.add(HEndpointBuilder
	.put("/")
	.types({
		name: OStandardType.string,
		id: OStandardType.string
	})
	.listener(async (req, res) => {

		const body: {name: string, id: string} = req.getBody();
		const user = await getUserFromRequest(req, res);
		if (user === undefined) return;

		const app = await SiQuery.getObjectForId(CCApp, body.id);
		if (!app) return res.err(HErrorStatusCode.NotFound, "An app could not be found for this id.");
		if (app.props.userId !== user.getId()) return res.err(HErrorStatusCode.UnAuthorized, "You do not own this app.");

		app.props.name = body.name;
		await app.update("name");

		res.sendHObject(app);

	})
);

endpointApp.add(HEndpointBuilder
	.delete("/")
	.types({
		id: OStandardType.string
	})
	.listener(async (req, res) => {

		const body: {id: string} = req.getBody();
		const user = await getUserFromRequest(req, res);
		if (user === undefined) return;

		const app = await SiQuery.getObjectForId(CCApp, body.id);
		if (!app) return res.err(HErrorStatusCode.NotFound, "An app could not be found for this id.");
		if (app.props.userId !== user.getId()) return res.err(HErrorStatusCode.UnAuthorized, "You do not own this app.");

		const old = app.bond();
		await app.delete();
		res.send(old);

	})
);

endpointApp.getDynamic(async (req, res) => {

	const user = await getUserFromRequest(req, res);
	if (!user) return;
	const id = req.getEndpoint();
	const app = await SiQuery.getObjectForId(CCApp, id);
	if (!app) return res.err(404, "App does not exist.");
	if (app.props.userId !== user.getId()) return res.err(HErrorStatusCode.UnAuthorized, "You do not own this app.");

	res.sendHObject(app);

});
