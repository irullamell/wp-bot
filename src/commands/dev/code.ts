import { Carbon } from 'carbon-now';

import pkg from 'whatsapp-web.js';
import util from 'util';

const carbon = new Carbon({
	lang: 'javascript',
});
const { Client, Location, Poll, List, Buttons, LocalAuth, MessageMedia } = pkg;
export const name = 'code';
export const args = true;
export const aliases: string[] = ['cnow', 'carbon'];
export const description = 'Create images of code provided';
export const category = 'Dev';
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	const code = args.join(' ');
	await carbon.generate(code, './src/commands/utils/code.png');
	const media = MessageMedia.fromFilePath('./src/commands/utils/code.png');
	return msg.reply(media);
}
