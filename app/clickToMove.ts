import type { Direction, Position } from "../core/mod.ts";
import type { Controller } from "./controllers.ts";

function directionTo(
  player: Position,
  target: Position,
): Direction | undefined {
  const dx = target.x - player.x;
  const dy = target.y - player.y;
  if (dx === 1 && dy === 0) return "right";
  if (dx === -1 && dy === 0) return "left";
  if (dx === 0 && dy === 1) return "down";
  if (dx === 0 && dy === -1) return "up";
  return undefined;
}

export const clickToMove: Controller = {
  label: "Click a neighboring tile",
  attach(session, board) {
    return board.onTileClick((at) => {
      const player = session.getState().puzzle.player;
      const direction = directionTo(player, at);
      if (direction) session.dispatch({ kind: "move", direction });
    });
  },
};
