import { error } from '@sveltejs/kit';

export function load({ params }) {
	if (params.gameId != null) {
        return {
            gameId: params.gameId
        }
    }

	error(404, 'Game not found');
} 