/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */
import {SiObject} from "@element-ts/silicon";
import {HObject} from "@element-ts/hydrogen";

export interface CCAppProps {
	userId: string;
	name: string;
}

export class CCApp extends SiObject<CCAppProps> implements HObject {

	public constructor() {
		super("app");
	}

	public bond(): object {
		return {
			id: this.getId(),
			updatedAt: this.getUpdatedAt(),
			createdAt: this.getCreatedAt(),
			name: this.props.name,
			userId: this.props.userId
		};
	}

}
