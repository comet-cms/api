/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {HEndpointBuilder, HEndpointGroup, HErrorStatusCode} from "@element-ts/hydrogen";
import {OStandardType} from "@element-ts/oxygen";
import {CCUser, CCUserProps} from "../structs/user";
import {KrBcrypt} from "@element-ts/krypton";
import {SiQuery} from "@element-ts/silicon";

export const endpointUser = new HEndpointGroup();

endpointUser.add(HEndpointBuilder
	.post("/sign-up")
	.types({
		firstName: OStandardType.string,
		lastName: OStandardType.string,
		email: OStandardType.string,
		password: OStandardType.string
	})
	.listener(async (req, res) => {

		const body: {firstName: string, lastName: string, email: string, password: string} = req.getBody();

		const user = new CCUser();
		user.props.firstName = body.firstName;
		user.props.lastName = body.lastName;
		user.props.email = body.email;

		const {salt, password} = await KrBcrypt.createPassword(body.password);
		user.props.salt = salt;
		user.props.password = password;

		await user.create();
		const token = await user.generateToken();

		res.sendHObject(token);

	})
);


endpointUser.add(HEndpointBuilder
	.post("/sign-in")
	.types({
		email: OStandardType.string,
		password: OStandardType.string
	})
	.listener(async (req, res) => {

		const body: {email: string, password: string} = req.getBody();
		const query = new SiQuery<CCUser, CCUserProps>(CCUser, {email: body.email});
		const user = await query.getFirst();
		const errMsg = "Email or password incorrect.";
		if (user === undefined) return res.err(HErrorStatusCode.UnAuthorized, errMsg);
		if (!user.props.salt || !user.props.password) return res.err(HErrorStatusCode.Forbidden, "User has invalid authentication.");
		const validPassword = await KrBcrypt.verifyPassword(body.password, user.props.password, user.props.salt);
		if (!validPassword) return res.err(HErrorStatusCode.UnAuthorized, errMsg);
		const token = await user.generateToken();

		res.sendHObject(token);

	})
);
