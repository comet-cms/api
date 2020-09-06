/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */
import {SiObject} from "@element-ts/silicon";

export interface CCPropertyProps {
	ownerId: string;
	appId: string;
	blockId: string;
	name: string;
	value: string | number | boolean;
}

export class CCProperty extends SiObject<CCPropertyProps> {

	public constructor() {
		super("property");
	}

}
