/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */
import {SiObject} from "@element-ts/silicon";
import {HObject} from "@element-ts/hydrogen";
import {CCToken} from "./token";

export interface CCUserProps {
	firstName: string;
	lastName: string;
	email: string;
	salt: Buffer;
	password: Buffer;
}

export class CCUser extends SiObject<CCUserProps> implements HObject {

	public constructor() {
		super("user");
	}

	public bond(): object {
		return {
			id: this.getId(),
			updatedAt: this.getUpdatedAt(),
			createdAt: this.getCreatedAt(),
			firstName: this.props.firstName,
			lastName: this.props.lastName,
			email: this.props.email
		};
	}

	public async generateToken(): Promise<CCToken> {

		const token = new CCToken();
		token.props.userId = this.getId();
		token.props.valid = true;
		await token.create();

		return token;

	}

}
