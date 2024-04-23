import { type Client, type Message } from 'whatsapp-web.js';
import BaseCommand from '../BaseCommand.js';
import Game from '../../Structures/Game.js';

export default class RulesCommand extends BaseCommand {
	constructor(client: Client) {
		super(client, 'rules');
	}

	async execute(msg: Message, words: string[]) {
		const chat = await msg.getChat();
		const member = await msg.getContact();
		const game = this.games[chat.id.user];
		if (game) {
			if (words.length === 0) {
				return game.serializeRules();
			}
			if (words.length === 1) {
				return game.serializeRule(words[0]);
			}
			if (game.started) {
				return "The game has already started, so you can't set rules.";
			}

			if (game.queue[0].id === member.number) {
				const res = game.setRule(words);
				return res === true
					? `The rules have been updated!${game.serializeRules()}`
					: `Nothing has changed: ${res}`;
			}
			return "You didn't create this game, so you can't set rules.";
		}
		return 'No game found';
	}
}