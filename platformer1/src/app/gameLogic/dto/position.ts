export class Position {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number) { }

    static default(): Position {
        return new Position(0, 0, 0, 0);
    }
}