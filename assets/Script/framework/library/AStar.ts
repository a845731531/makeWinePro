import { Tool } from "../manager/Tool";

export namespace astar {

    export class GridNode {
        public x: number; //列
        public y: number; //行
        public f: number; //代价 f = g+h
        public g: number; //起点到当前点代价
        public h: number; //当前点到终点估计代价
        public walkable: boolean = true;
        public parent: GridNode;
        public costMultiplier: number = 1.0;

        public constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
    }

    export class Grid {
        private _nodes: Array<any>; //GridNode数组
        private _numCols: number; //网格行列
        private _numRows: number;

        public onGridChanged: Function = null;

        public constructor() { }

        public setGridSize(numCols: number, numRows: number) {
            this._numCols = numCols;
            this._numRows = numRows;
            this._nodes = [];

            for (let i: number = 0; i < numCols; i++) {
                this._nodes[i] = [];
                for (let j: number = 0; j < numRows; j++) {
                    this._nodes[i][j] = new GridNode(i, j);
                }
            }
        }

        public validNode(x: number, y: number): boolean {
            if (x < 0 || x >= this.numCols) {
                return false;
            }
            if (y < 0 || y >= this.numRows) {
                return false;
            }
            if (x < 0 || x >= this.numCols) {
                return false;
            }
            if (y < 0 || y >= this.numRows) {
                return false;
            }

            return true;
        }

        public getNodes(): GridNode[] {
            return this._nodes;
        }

        public getNode(x: number, y: number): GridNode {
            return this._nodes[x][y];
        }

        public setWalkable(x: number, y: number, value: boolean) {
            this._nodes[x][y].walkable = value;
            if (this.onGridChanged != null) {
                this.onGridChanged()
            }
        }

        public setCostMultiplier(x: number, y: number, cost = 1.0) {
            this._nodes[x][y].costMultiplier = cost;
            if (this.onGridChanged != null) {
                this.onGridChanged()
            }
        }

        public getWalkable(x: number, y: number): boolean {
            return this._nodes[x][y].walkable;
        }

        public get numCols() {
            return this._numCols;
        }

        public get numRows() {
            return this._numRows;
        }
    }

    export class AStar {
        private _open: Array<any>; //待考察表
        private _closed: Array<any>; //已考察表
        private _grid: Grid = null; //网格
        private _endNode: GridNode; //终点Node
        private _startNode: GridNode; //起点Node
        private _path: any; //保存路径
        private _heuristic: Function; //寻路算法
        private _straightCost: number = 1.0; //上下左右走的代价
        private _diagCost: number = Math.SQRT2; //斜着走的代价 

        private _allowDiag: boolean = true; //是否允许斜着走 
        private _cachedPath: { [pathId: string]: GridNode[] } = {};

        public constructor() {
            //this._heuristic = this.manhattan;  
            //this._heuristic = this.euclidian;
            this._heuristic = this.diagonal;
            this._grid = new Grid();
            this._grid.onGridChanged = this.clearCachePath.bind(this);
        }

        //是否允许斜着走
        public allowDiag(allow: boolean): void {
            this._allowDiag = allow;
        }

        public getGrid(): Grid {
            return this._grid;
        }
        public clearCachePath(): void {
            this._cachedPath = {}
        }
        //到一个区域的路径, 区域默认不可达(否则直接找点就可以了)
        public findPathToArea(startPos: cc.Vec2, endArea: cc.Rect): number {
            let pathId = cc.js.formatStr("%d_%d-%d_%d_%d_%d", startPos.x, startPos.y, endArea.x, endArea.y, endArea.width, endArea.height);
            let cachedPath = this._cachedPath[pathId];

            if (cachedPath) {
                this._path = Tool.deepCopy(cachedPath);
                return this._path.length;
            }

            //周围一圈找最短路径
            var startX = Math.max(0, endArea.x - 1);
            var endX = Math.min(this._grid.numCols - 1, endArea.x + endArea.width);
            var startY = Math.max(0, endArea.y + 1);
            var endY = Math.min(this._grid.numRows - 1, endArea.y - endArea.height);
            // console.log("搜索障碍物", endArea.x, endArea.y)
            // console.log("障碍物周围的列范围", startX, endX)
            // console.log("障碍物周围的行范围", startY, endY)
            let minStep = Number.MAX_VALUE;
            let pathStep, endPos, minPath;
            for (var i = startX; i <= endX; i++) {
                for (var j = endY; j <= startY; j++) {
                    endPos = cc.v2(i, j)
                    var test: GridNode = this._grid.getNode(i, j);
                    if (endArea.contains(endPos) || !test.walkable) {
                        continue;
                    }
                    pathStep = this.findPath(startPos, endPos);
                    // console.log("格子：", i, j, "  步数：", pathStep)
                    if (pathStep > 0 && pathStep <= minStep) {
                        minStep = pathStep;
                        minPath = Tool.deepCopy(this._path)
                    }
                }
            }

            if (minStep < Number.MAX_VALUE) {
                this._path = Tool.deepCopy(minPath)
                this._cachedPath[pathId] = Tool.deepCopy(minPath)
                return minStep;
            }

            //周围一圈都不可达，找直线最近的
            let middlePos = cc.v2((startX + endX) / 2, (startY + endY) / 2)
            let towardDirection = startPos.sub(middlePos).normalize()
            let targetPos = cc.v2(Math.floor(middlePos.x + towardDirection.x), Math.floor(middlePos.y + towardDirection.y))
            let targetGrid = this._grid.getNode(targetPos.x, targetPos.y)
            while (targetGrid != null && !targetGrid.walkable) {
                targetPos = cc.v2(targetPos.x + towardDirection.x, targetPos.y + towardDirection.y)
                targetGrid = this._grid.getNode(Math.floor(targetPos.x), Math.floor(targetPos.y))
            }
            if (targetGrid != null) {
                return this.findPath(startPos, cc.v2(Math.floor(targetPos.x), Math.floor(targetPos.y)));
            }
        }
        //寻路,返回路径点长度，-1为未找到路径
        public findPath(startPos: cc.Vec2, endPos: cc.Vec2, shouldCache: boolean = false): number {
            let pathId = cc.js.formatStr("%d_%d-%d_%d", startPos.x, startPos.y, endPos.x, endPos.y);
            let cachedPath = this._cachedPath[pathId];
            if (cachedPath) {
                this._path = Tool.deepCopy(cachedPath);
                return this._path.length;
            }

            this._open = [];
            this._closed = [];

            this._startNode = this._grid.getNode(startPos.x, startPos.y);
            this._endNode = this._grid.getNode(endPos.x, endPos.y);
            if (!this._startNode || !this._endNode) {
                return -1;
            }

            this._startNode.g = 0;
            this._startNode.h = this._heuristic(this._startNode);
            this._startNode.f = this._startNode.g + this._startNode.h;

            let hasPath = this.search()
            if (hasPath) {
                this.buildPath();
                if (shouldCache) {
                    this._cachedPath[pathId] = Tool.deepCopy(this._path)
                }
                return this._path.length;
            } else {
                return -1;
            }
        }

        //查找路径
        public search(): boolean {
            var node: GridNode = this._startNode;
            while (node != this._endNode) {
                var startX = Math.max(0, node.x - 1);
                var endX = Math.min(this._grid.numCols - 1, node.x + 1);
                var startY = Math.max(0, node.y - 1);
                var endY = Math.min(this._grid.numRows - 1, node.y + 1);

                for (var i = startX; i <= endX; i++) {
                    for (var j = startY; j <= endY; j++) {
                        //不让斜着走
                        if (!this._allowDiag) {
                            if (i != node.x && j != node.y) {
                                continue;
                            }
                        }

                        var test: GridNode = this._grid.getNode(i, j);
                        if (test == node ||
                            !test.walkable ||
                            !this._grid.getNode(node.x, test.y).walkable ||
                            !this._grid.getNode(test.x, node.y).walkable) {
                            continue;
                        }

                        var cost: number = this._straightCost;
                        if (!((node.x == test.x) || (node.y == test.y))) {
                            cost = this._diagCost;
                        }
                        var g = node.g + cost * test.costMultiplier;
                        var h = this._heuristic(test);
                        var f = g + h;
                        if (this.isOpen(test) || this.isClosed(test)) {
                            if (test.f > f) {
                                test.f = f;
                                test.g = g;
                                test.h = h;
                                test.parent = node;
                            }
                        } else {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = node;
                            this._open.push(test);
                        }
                    }
                }
                for (var o = 0; o < this._open.length; o++) { }
                this._closed.push(node);
                if (this._open.length == 0) {
                    // console.log("AStar >> no path found");
                    return false
                }

                let openLen = this._open.length;
                for (let m = 0; m < openLen; m++) {
                    for (let n = m + 1; n < openLen; n++) {
                        if (this._open[m].f > this._open[n].f) {
                            let temp = this._open[m];
                            this._open[m] = this._open[n];
                            this._open[n] = temp;
                        }
                    }
                }

                node = this._open.shift() as GridNode;
            }
            return true;
        }

        //获取路径
        private buildPath(): void {
            this._path = [];
            var node: GridNode = this._endNode;
            this._path.push({
                x: node.x,
                y: node.y
            });
            while (node != this._startNode) {
                node = node.parent;
                this._path.unshift({
                    x: node.x,
                    y: node.y
                });
            }
        }

        public get path() {
            return this._path;
        }

        //是否待检查
        private isOpen(node: GridNode): boolean {
            for (var i = 0; i < this._open.length; i++) {
                if (this._open[i] == node) {
                    return true;
                }
            }
            return false;
        }

        //是否已检查
        private isClosed(node: GridNode): boolean {
            for (var i = 0; i < this._closed.length; i++) {
                if (this._closed[i] == node) {
                    return true;
                }
            }
            return false;
        }

        //曼哈顿算法
        private manhattan(node: GridNode) {
            return Math.abs(node.x - this._endNode.x) * this._straightCost + Math.abs(node.y + this._endNode.y) * this._straightCost;
        }

        private euclidian(node: GridNode) {
            var dx = node.x - this._endNode.x;
            var dy = node.y - this._endNode.y;
            return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
        }

        private diagonal(node: GridNode) {
            var dx = Math.abs(node.x - this._endNode.x);
            var dy = Math.abs(node.y - this._endNode.y);
            var diag = Math.min(dx, dy);
            var straight = dx + dy;
            return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
        }

        public clear()
        {
            this._open = null
            this._closed = null
            this._grid = null
            this._endNode = null
            this._startNode = null
            this._path = null
            this._heuristic = null
            this._straightCost = null
            this._diagCost = null
            this._allowDiag = null
            this._cachedPath = null
        }

        public get visited() {
            return this._closed.concat(this._open);
        }
    }
}