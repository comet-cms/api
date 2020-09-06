/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */
import {SiObject} from "@element-ts/silicon";

export interface CCBlockProps {
	ownerId: string;
	appId: string;
	parentBlockId: string | undefined;
	name: string;
}

export class CCBlock extends SiObject<CCBlockProps> {

	public constructor() {
		super("block");
	}

}
