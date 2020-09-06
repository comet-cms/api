/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */
import {SiObject} from "@element-ts/silicon";
import {HObject} from "@element-ts/hydrogen";

export interface CCToken {
	userId: string;
	valid: boolean;
}

export class CCToken extends SiObject<CCToken> implements HObject {

	public constructor() {
		super("token");
	}

	public bond(): object {
		return {
			id: this.getId(),
			userId: this.props.userId,
			valid: this.props.valid
		};
	}

}
