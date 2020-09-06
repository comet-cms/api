/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */
import {HErrorStatusCode, HRequest, HResponse} from "@element-ts/hydrogen";
import {CCUser} from "../structs/user";
import {SiQuery} from "@element-ts/silicon";
import {CCToken} from "../structs/token";

export async function getUserFromRequest(req: HRequest, res: HResponse): Promise<CCUser | undefined> {

	const authHeader = req.getHeaders()["authorization"];

	if (!authHeader) {
		res.err(HErrorStatusCode.UnAuthorized, "Authorization header not present.");
		return;
	}

	const bearer = authHeader.split(" ")[1];

	if (!bearer) {
		res.err(HErrorStatusCode.UnAuthorized, "Bearer token was undefined.");
		return;
	}

	const token = await SiQuery.getObjectForId(CCToken, bearer);

	if (!token) {
		res.err(HErrorStatusCode.UnAuthorized, "Invalid bearer token.");
		return;
	}

	if (token.props.valid !== true) {
		res.err(HErrorStatusCode.UnAuthorized, "Token not valid.");
		return;
	}

	if (!token.props.userId) {
		res.err(HErrorStatusCode.UnAuthorized, "Token does not have userId.");
		return;
	}

	const user = SiQuery.getObjectForId(CCUser, token.props.userId);

	if (!user) {
		res.err(HErrorStatusCode.UnAuthorized, "Token has invalid userId.");
		return;
	}

	return user;

}
